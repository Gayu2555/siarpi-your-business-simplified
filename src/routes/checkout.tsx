import { createFileRoute, useNavigate, useSearch, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/site/Header";
import { resolvePhosphorIcon } from "@/lib/icon-resolver";
import { formatIDR } from "@/lib/modules-api";
import { isAuthenticated, getStoredUser } from "@/lib/auth";
import { getCheckout, type Checkout } from "@/lib/checkout-api";
import { ArrowRight, ArrowLeft, Loader2, ShieldCheck } from "lucide-react";

import { guardOnboardingRoute } from "@/lib/onboarding-guard";

const searchSchema = z.object({
    id: z.string(),
});

export const Route = createFileRoute("/checkout")({
    validateSearch: searchSchema,
    beforeLoad: async ({ search }) => {
        await guardOnboardingRoute("/checkout", search.id);
    },
    head: () => ({
        meta: [
            { title: "Checkout — Siarpi" },
            { name: "description", content: "Tinjau pesanan modul Anda sebelum membayar." },
        ],
    }),
    component: CheckoutPage,
});

function CheckoutPage() {
    const navigate = useNavigate();
    const { id } = useSearch({ from: "/checkout" });

    const [checkout, setCheckout] = useState<Checkout | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getCheckout(id)
            .then(({ ok, data }) => {
                if (!ok || !data?.checkout) {
                    setError(data?.message ?? "Checkout tidak ditemukan.");
                    return;
                }
                // Checkout sudah pernah dibayar -> tidak perlu bayar lagi
                if (data.checkout.status === "paid") {
                    navigate({ to: "/dashboard" });
                    return;
                }
                setCheckout(data.checkout);
            })
            .catch(() => setError("Gagal memuat data checkout."))
            .finally(() => setLoading(false));
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="flex min-h-screen flex-col bg-gradient-subtle">
                <Header />
                <main className="flex flex-1 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </main>
            </div>
        );
    }

    if (error || !checkout) {
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

    const user = getStoredUser();

    return (
        <div className="flex min-h-screen flex-col bg-gradient-subtle">
            <Header />

            <main className="container mx-auto flex-1 px-4 py-10 md:px-6 md:py-16">
                <div className="mx-auto max-w-2xl">
                    <Link
                        to="/onboarding"
                        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" /> Ubah pilihan modul
                    </Link>

                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                        <Card className="rounded-3xl border-border p-8 shadow-card md:p-10">
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="rounded-full">
                                    Checkout #{checkout.id}
                                </Badge>
                            </div>
                            <h1 className="mt-4 font-display text-2xl font-bold md:text-3xl">
                                Tinjau pesanan Anda
                            </h1>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {user ? `Untuk akun ${user.email}. ` : ""}
                                Pastikan modul yang dipilih sudah sesuai sebelum lanjut ke pembayaran.
                            </p>

                            <div className="mt-8 space-y-3">
                                {checkout.items.map((item) => {
                                    const { Icon, weight } = resolvePhosphorIcon("i-ph-package-fill");
                                    return (
                                        <div
                                            key={item.module_key}
                                            className="flex items-center justify-between rounded-xl border border-border bg-background/50 px-4 py-3"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                                                    <Icon weight={weight} className="h-4 w-4" />
                                                </div>
                                                <span className="text-sm font-medium">{item.module_name}</span>
                                            </div>
                                            <span className="text-sm font-semibold">{formatIDR(item.price)}/bln</span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-6 space-y-2 border-t border-border pt-6">
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span>{formatIDR(checkout.subtotal)}</span>
                                </div>
                                <div className="flex items-center justify-between text-lg font-bold">
                                    <span>Total per bulan</span>
                                    <span className="font-display text-2xl text-primary">{formatIDR(checkout.total)}</span>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-2 rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground">
                                <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
                                Modul baru aktif otomatis begitu pembayaran dikonfirmasi.
                            </div>

                            <Button
                                onClick={() => navigate({ to: "/payment", search: { checkout_id: checkout.id } })}
                                className="mt-8 w-full bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-glow"
                                size="lg"
                            >
                                Lanjut ke Pembayaran <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                        </Card>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}