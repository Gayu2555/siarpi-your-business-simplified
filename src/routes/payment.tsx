import { createFileRoute, useNavigate, useSearch, Link, redirect } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/site/Header";
import { formatIDR } from "@/lib/modules-api";
import { isAuthenticated, getStoredUser } from "@/lib/auth";
import { getCheckout, selectPaymentMethod, type Checkout } from "@/lib/checkout-api";
import {
    chargePayment, getPaymentStatus, SUCCESS_STATUSES, FAILED_STATUSES,
    type ChargeResponse, type PaymentMethod,
} from "@/lib/payment-api";
import {
    QrCode, Smartphone, Building2, Loader2, CheckCircle2, XCircle,
    ArrowLeft, Copy, Check,
} from "lucide-react";

import { guardOnboardingRoute } from "@/lib/onboarding-guard";

const searchSchema = z.object({
    checkout_id: z.string(),
});

export const Route = createFileRoute("/payment")({
    validateSearch: searchSchema,
    beforeLoad: async ({ search }) => {
        await guardOnboardingRoute("/payment", search.checkout_id);
    },
    head: () => ({
        meta: [
            { title: "Pembayaran — Siarpi" },
            { name: "description", content: "Selesaikan pembayaran untuk mengaktifkan modul." },
        ],
    }),
    component: PaymentPage,
});

const methods: { id: PaymentMethod; label: string; icon: typeof QrCode; group: "instant" | "va" }[] = [
    { id: "qris", label: "QRIS", icon: QrCode, group: "instant" },
    { id: "gopay", label: "GoPay", icon: Smartphone, group: "instant" },
    { id: "bca", label: "BCA Virtual Account", icon: Building2, group: "va" },
    { id: "bni", label: "BNI Virtual Account", icon: Building2, group: "va" },
    { id: "bri", label: "BRI Virtual Account", icon: Building2, group: "va" },
    { id: "permata", label: "Permata Virtual Account", icon: Building2, group: "va" },
];

type Phase = "select" | "processing" | "awaiting" | "success" | "failed";

function PaymentPage() {
    const navigate = useNavigate();
    const { checkout_id } = useSearch({ from: "/payment" });

    const [checkout, setCheckout] = useState<Checkout | null>(null);
    const [loadingCheckout, setLoadingCheckout] = useState(true);
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
    const [phase, setPhase] = useState<Phase>("select");
    const [chargeResult, setChargeResult] = useState<ChargeResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        getCheckout(checkout_id)
            .then(({ ok, data }) => {
                if (!ok || !data?.checkout) {
                    setError(data?.message ?? "Checkout tidak ditemukan.");
                    return;
                }
                if (data.checkout.status === "paid") {
                    navigate({ to: "/dashboard" });
                    return;
                }
                setCheckout(data.checkout);
            })
            .catch(() => setError("Gagal memuat data checkout."))
            .finally(() => setLoadingCheckout(false));
    }, [checkout_id, navigate]);

    // Bersihkan polling interval saat unmount
    useEffect(() => {
        return () => {
            if (pollRef.current) clearInterval(pollRef.current);
        };
    }, []);

    function startPolling(orderId: string) {
        pollRef.current = setInterval(async () => {
            const { ok, data } = await getPaymentStatus(orderId);
            if (!ok || !data?.data?.transaction_status) return;

            const status = data.data.transaction_status;

            if (SUCCESS_STATUSES.includes(status)) {
                if (pollRef.current) clearInterval(pollRef.current);
                setPhase("success");
            } else if (FAILED_STATUSES.includes(status)) {
                if (pollRef.current) clearInterval(pollRef.current);
                setPhase("failed");
                setError("Pembayaran tidak berhasil diselesaikan. Silakan coba lagi.");
            }
            // status masih "pending" -> lanjut polling
        }, 4000);
    }

    async function handlePay() {
        if (!selectedMethod || !checkout) return;

        setError(null);
        setPhase("processing");

        try {
            await selectPaymentMethod(checkout.id, selectedMethod);

            const user = getStoredUser();
            const { ok, data } = await chargePayment({
                payment_method: selectedMethod,
                order_id: checkout.id,
                checkout_id: checkout.id,
                gross_amount: Math.round(checkout.total),
                customer: user ? { first_name: user.first_name, email: user.email } : undefined,
            });

            if (!ok || !data) {
                setPhase("failed");
                setError(data?.message ?? "Gagal memproses pembayaran. Coba lagi.");
                return;
            }

            setChargeResult(data);

            // QRIS/GoPay/VA semua butuh aksi user di luar (scan QR / bayar di app
            // bank), jadi status awal selalu "pending" -> mulai polling.
            setPhase("awaiting");
            startPolling(checkout.id);
        } catch (err) {
            setPhase("failed");
            setError(err instanceof Error ? err.message : "Terjadi kesalahan tidak terduga.");
        }
    }

    function copyVA(va: string) {
        navigator.clipboard.writeText(va);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    if (loadingCheckout) {
        return (
            <div className="flex min-h-screen flex-col bg-gradient-subtle">
                <Header />
                <main className="flex flex-1 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </main>
            </div>
        );
    }

    if (error && !checkout) {
        return (
            <div className="flex min-h-screen flex-col bg-gradient-subtle">
                <Header />
                <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
                    <h1 className="font-display text-2xl font-bold">Checkout tidak ditemukan</h1>
                    <p className="mt-2 text-muted-foreground">{error}</p>
                    <Button asChild className="mt-6 bg-gradient-primary text-primary-foreground">
                        <Link to="/onboarding">Kembali ke Onboarding</Link>
                    </Button>
                </main>
            </div>
        );
    }

    if (!checkout) return null;

    return (
        <div className="flex min-h-screen flex-col bg-gradient-subtle">
            <Header />

            <main className="container mx-auto flex-1 px-4 py-10 md:px-6 md:py-16">
                <div className="mx-auto max-w-xl">
                    {phase === "select" && (
                        <Link
                            to="/checkout"
                            search={{ id: checkout.id }}
                            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4" /> Kembali ke ringkasan
                        </Link>
                    )}

                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                        <Card className="rounded-3xl border-border p-8 shadow-card md:p-10">
                            {/* ── SELECT ───────────────────────────────────────────── */}
                            {phase === "select" && (
                                <>
                                    <Badge variant="secondary" className="rounded-full">Pembayaran</Badge>
                                    <h1 className="mt-4 font-display text-2xl font-bold md:text-3xl">
                                        Pilih metode pembayaran
                                    </h1>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Total tagihan: <span className="font-semibold text-foreground">{formatIDR(checkout.total)}/bulan</span>
                                    </p>

                                    <div className="mt-6 space-y-2">
                                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Instan</p>
                                        <div className="grid gap-2 sm:grid-cols-2">
                                            {methods.filter((m) => m.group === "instant").map((m) => (
                                                <button
                                                    key={m.id}
                                                    type="button"
                                                    onClick={() => setSelectedMethod(m.id)}
                                                    className={`flex items-center gap-3 rounded-xl border-2 p-3.5 text-left transition-all ${selectedMethod === m.id
                                                        ? "border-primary bg-accent/50"
                                                        : "border-border hover:border-primary/40"
                                                        }`}
                                                >
                                                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${selectedMethod === m.id ? "bg-gradient-primary text-primary-foreground" : "bg-muted"
                                                        }`}>
                                                        <m.icon className="h-4 w-4" />
                                                    </div>
                                                    <span className="text-sm font-medium">{m.label}</span>
                                                </button>
                                            ))}
                                        </div>

                                        <p className="pt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                            Virtual Account
                                        </p>
                                        <div className="grid gap-2 sm:grid-cols-2">
                                            {methods.filter((m) => m.group === "va").map((m) => (
                                                <button
                                                    key={m.id}
                                                    type="button"
                                                    onClick={() => setSelectedMethod(m.id)}
                                                    className={`flex items-center gap-3 rounded-xl border-2 p-3.5 text-left transition-all ${selectedMethod === m.id
                                                        ? "border-primary bg-accent/50"
                                                        : "border-border hover:border-primary/40"
                                                        }`}
                                                >
                                                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${selectedMethod === m.id ? "bg-gradient-primary text-primary-foreground" : "bg-muted"
                                                        }`}>
                                                        <m.icon className="h-4 w-4" />
                                                    </div>
                                                    <span className="text-sm font-medium">{m.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                                            {error}
                                        </div>
                                    )}

                                    <Button
                                        onClick={handlePay}
                                        disabled={!selectedMethod}
                                        className="mt-8 w-full bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-glow"
                                        size="lg"
                                    >
                                        Bayar {formatIDR(checkout.total)}
                                    </Button>
                                </>
                            )}

                            {/* ── PROCESSING ───────────────────────────────────────── */}
                            {phase === "processing" && (
                                <div className="flex flex-col items-center py-10 text-center">
                                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                                    <p className="mt-4 text-sm text-muted-foreground">Menyiapkan pembayaran...</p>
                                </div>
                            )}

                            {/* ── AWAITING (QR / VA number ditampilkan) ──────────────── */}
                            {phase === "awaiting" && chargeResult && (
                                <div className="text-center">
                                    <Badge variant="secondary" className="rounded-full">Menunggu Pembayaran</Badge>
                                    <h1 className="mt-4 font-display text-xl font-bold">
                                        {chargeResult.qr_code_url ? "Scan QR Code" : "Transfer ke Virtual Account"}
                                    </h1>

                                    {chargeResult.qr_code_url && (
                                        <img
                                            src={chargeResult.qr_code_url}
                                            alt="QRIS Code"
                                            className="mx-auto mt-6 h-56 w-56 rounded-2xl border border-border"
                                        />
                                    )}

                                    {chargeResult.va_number && (
                                        <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-5">
                                            <p className="text-xs text-muted-foreground">
                                                {chargeResult.bank?.toUpperCase() ?? "Virtual Account"} Number
                                            </p>
                                            <div className="mt-2 flex items-center justify-center gap-2">
                                                <span className="font-display text-2xl font-bold tracking-wider">
                                                    {chargeResult.va_number}
                                                </span>
                                                <button
                                                    onClick={() => copyVA(chargeResult.va_number!)}
                                                    className="rounded-lg border border-border p-1.5 hover:bg-muted"
                                                >
                                                    {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {chargeResult.bill_key && chargeResult.biller_code && (
                                        <div className="mt-6 grid grid-cols-2 gap-3">
                                            <div className="rounded-2xl border border-border bg-muted/40 p-4">
                                                <p className="text-xs text-muted-foreground">Biller Code</p>
                                                <p className="font-display text-lg font-bold">{chargeResult.biller_code}</p>
                                            </div>
                                            <div className="rounded-2xl border border-border bg-muted/40 p-4">
                                                <p className="text-xs text-muted-foreground">Bill Key</p>
                                                <p className="font-display text-lg font-bold">{chargeResult.bill_key}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Menunggu konfirmasi pembayaran...
                                    </div>

                                    <p className="mt-2 text-xs text-muted-foreground">
                                        Halaman ini akan otomatis update setelah pembayaran terkonfirmasi.
                                    </p>
                                </div>
                            )}

                            {/* ── SUCCESS ──────────────────────────────────────────── */}
                            {phase === "success" && (
                                <div className="flex flex-col items-center py-6 text-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                        <CheckCircle2 className="h-9 w-9 text-primary" />
                                    </div>
                                    <h1 className="mt-5 font-display text-2xl font-bold">Pembayaran berhasil!</h1>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Modul Anda sudah aktif. Selamat menggunakan Siarpi.
                                    </p>
                                    <Button
                                        asChild
                                        className="mt-8 w-full bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-glow"
                                        size="lg"
                                    >
                                        <Link to="/dashboard">Buka Dashboard</Link>
                                    </Button>
                                </div>
                            )}

                            {/* ── FAILED ───────────────────────────────────────────── */}
                            {phase === "failed" && (
                                <div className="flex flex-col items-center py-6 text-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                                        <XCircle className="h-9 w-9 text-destructive" />
                                    </div>
                                    <h1 className="mt-5 font-display text-2xl font-bold">Pembayaran gagal</h1>
                                    <p className="mt-2 text-sm text-muted-foreground">{error}</p>
                                    <Button
                                        onClick={() => {
                                            setPhase("select");
                                            setError(null);
                                            setChargeResult(null);
                                        }}
                                        className="mt-8 w-full bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-glow"
                                        size="lg"
                                    >
                                        Coba Lagi
                                    </Button>
                                </div>
                            )}
                        </Card>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}