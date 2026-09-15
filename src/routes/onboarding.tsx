import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/site/Header";
import { resolvePhosphorIcon } from "@/lib/icon-resolver";
import { formatIDR } from "@/lib/utils";
import { isAuthenticated, getStoredUser, setAuthToken, setStoredUser } from "@/lib/auth";
import {
  createCompany,
  generateCompanyCode,
  saveOnboardingMeta,
  getOnboardingStatus,
  type CreateCompanyRequest,
} from "@/lib/company-api";
import { useEffect } from "react";
import { createCheckout } from "@/lib/checkout-api";
import { startFreeTrial } from "@/lib/trial-api";
import {
  Building2,
  Rocket,
  Briefcase,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Loader2,
  ShieldCheck,
  CalendarClock,
} from "lucide-react";

import { guardOnboardingRoute } from "@/lib/onboarding-guard";

export const Route = createFileRoute("/onboarding")({
  beforeLoad: async () => {
    await guardOnboardingRoute("/onboarding");
  },
  head: () => ({
    meta: [
      { title: "Onboarding — Siarpi" },
      { name: "description", content: "Setup akun Siarpi dalam beberapa langkah cepat." },
    ],
  }),
  component: OnboardingPage,
});

// ── Static data ───────────────────────────────────────────────────────────────

const businessTypes = [
  { id: "umkm", name: "UMKM", icon: Briefcase, desc: "Usaha mikro & kecil" },
  { id: "startup", name: "Startup", icon: Rocket, desc: "Tim berkembang & inovatif" },
  { id: "perusahaan", name: "Perusahaan", icon: Building2, desc: "Skala menengah-besar" },
];

// Plain data — tidak menyimpan React components agar aman untuk SSR serialization
const modules = [
  {
    id: "hr",
    name: "HR",
    description: "Manajemen karyawan & rekrutmen",
    icon: "i-ph-users-fill",
    price: 49000,
  },
  {
    id: "payroll",
    name: "Payroll",
    description: "Gaji otomatis & pajak",
    icon: "i-ph-money-fill",
    price: 79000,
  },
  {
    id: "finance",
    name: "Finance",
    description: "Akuntansi & laporan keuangan",
    icon: "i-ph-chart-bar-fill",
    price: 99000,
  },
  {
    id: "inventory",
    name: "Inventory",
    description: "Stok barang real-time",
    icon: "i-ph-cube-fill",
    price: 69000,
  },
  {
    id: "project",
    name: "Project",
    description: "Manajemen proyek tim",
    icon: "i-ph-columns-fill",
    price: 59000,
  },
  {
    id: "crm",
    name: "CRM",
    description: "Kelola pelanggan & leads",
    icon: "i-ph-megaphone-fill",
    price: 69000,
  },
  {
    id: "absensi",
    name: "Absensi",
    description: "Kehadiran & shift",
    icon: "i-ph-fingerprint-fill",
    price: 39000,
  },
  {
    id: "invoice",
    name: "Invoice",
    description: "Tagihan & pembayaran",
    icon: "i-ph-receipt-fill",
    price: 49000,
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Dashboard & insight",
    icon: "i-ph-chart-line-fill",
    price: 89000,
  },
];

const industries = [
  "Retail",
  "F&B (Makanan & Minuman)",
  "Teknologi",
  "Manufaktur",
  "Jasa Konsultasi",
  "Konstruksi",
  "Kesehatan",
  "Pendidikan",
  "Logistik & Transportasi",
  "Pertanian",
  "Lainnya",
];

// ── Component ─────────────────────────────────────────────────────────────────
// Onboarding mengumpulkan profil perusahaan dan kebutuhan modul. Pada langkah
// terakhir owner dapat memulai trial all-access tanpa pembayaran, atau masuk
// ke checkout bila memang ingin langsung berlangganan.

function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [existingCompanyId, setExistingCompanyId] = useState<string | null>(null);

  // Step 1 — profil perusahaan
  const [companyName, setCompanyName] = useState("");
  const [bizType, setBizType] = useState<string>("");
  const [employees, setEmployees] = useState("");
  const [industry, setIndustry] = useState("");

  // Step 2 — pilih modul
  const [selectedModules, setSelectedModules] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("siarpi_cart");
      if (saved) {
        localStorage.removeItem("siarpi_cart");
        const savedModules = JSON.parse(saved);
        return Array.isArray(savedModules)
          ? savedModules.filter(
              (moduleKey: unknown): moduleKey is string =>
                typeof moduleKey === "string" && moduleKey.toLowerCase() !== "pos",
            )
          : [];
      }
    } catch (e) {
      // ignore
    }
    return [];
  });

  // Submit state
  const [submitMode, setSubmitMode] = useState<"trial" | "checkout" | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const submitting = submitMode !== null;

  useEffect(() => {
    getOnboardingStatus()
      .then(({ ok, data }) => {
        if (ok && data) {
          if (data.has_company && data.company_id) {
            setExistingCompanyId(data.company_id);
            setStep(2); // Langsung lompat ke step 2 jika sudah ada perusahaan
          }
        }
      })
      .catch((err) => {
        console.error("Gagal mengambil status onboarding:", err);
      })
      .finally(() => {
        setLoadingStatus(false);
      });
  }, []);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const totalPrice = selectedModules.reduce((sum, id) => {
    const m = modules.find((x) => x.id === id);
    return sum + (m?.price ?? 0);
  }, 0);

  const recommendedPlan =
    totalPrice > 500000 ? "Enterprise" : totalPrice > 200000 ? "Pro" : "Basic";

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const next = () => setStep((s) => Math.min(s + 1, totalSteps));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const canNext =
    (step === 1 && companyName.trim() && bizType && employees && industry) ||
    (step === 2 && selectedModules.length > 0) ||
    step === 3;

  async function ensureCompany() {
    const user = getStoredUser();
    if (!user) {
      throw new Error("Sesi login tidak ditemukan. Silakan login ulang.");
    }

    if (existingCompanyId) {
      return { companyId: existingCompanyId, user };
    }

    saveOnboardingMeta({ bizType, employees, industry });
    const companyPayload: CreateCompanyRequest = {
      user_id: user.id,
      code: generateCompanyCode(companyName),
      name: companyName.trim(),
      country: "Indonesia",
      currency_code: "IDR",
      timezone: "Asia/Jakarta",
      business_type: bizType,
      employee_count: parseInt(employees, 10) || 0,
      industry,
    };

    const { ok, data } = await createCompany(companyPayload);
    if (!ok || !data?.company) {
      throw new Error(data?.message ?? "Gagal membuat perusahaan. Coba lagi.");
    }

    if (data.token) setAuthToken(data.token);
    setStoredUser({ ...user, company_id: data.company.id });
    setExistingCompanyId(data.company.id);
    return { companyId: data.company.id, user };
  }

  async function handleStartTrial() {
    setSubmitError(null);
    setSubmitMode("trial");

    try {
      await ensureCompany();
      const result = await startFreeTrial();
      if (!result.ok || !result.data?.is_active) {
        throw new Error(result.message ?? "Trial tidak dapat diaktifkan. Coba lagi.");
      }
      navigate({ to: "/dashboard" });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Terjadi kesalahan tidak terduga.");
    } finally {
      setSubmitMode(null);
    }
  }

  async function handleCheckout() {
    setSubmitError(null);
    setSubmitMode("checkout");

    try {
      const { companyId, user } = await ensureCompany();

      const { ok: checkoutOk, data: checkoutData } = await createCheckout({
        company_id: companyId,
        user_id: user.id,
        module_keys: selectedModules,
      });

      if (!checkoutOk || !checkoutData?.checkout) {
        throw new Error(checkoutData?.message ?? "Gagal membuat checkout. Coba lagi.");
      }

      navigate({ to: "/checkout", search: { id: checkoutData.checkout.id } });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Terjadi kesalahan tidak terduga.");
    } finally {
      setSubmitMode(null);
    }
  }

  if (loadingStatus) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-subtle">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-subtle">
      <Header />

      <main className="container mx-auto flex-1 px-4 py-10 md:px-6 md:py-16">
        <div className="mx-auto max-w-3xl">
          {/* Progress */}
          <div className="mb-10">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="font-medium">
                Langkah {step} dari {totalSteps}
              </span>
              <span className="text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full bg-gradient-primary"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          <Card className="rounded-3xl border-border p-8 shadow-card md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* STEP 1 — Profil Perusahaan */}
                {step === 1 && (
                  <>
                    <h2 className="font-display text-2xl font-bold md:text-3xl">
                      Ceritakan tentang bisnis Anda
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      Informasi dasar untuk setup akun perusahaan Anda.
                    </p>

                    <div className="mt-8 space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="company">Nama Perusahaan</Label>
                        <Input
                          id="company"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="PT Maju Sejahtera"
                          className="rounded-xl"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Jenis Perusahaan</Label>
                        <div className="grid gap-3 md:grid-cols-3">
                          {businessTypes.map((t) => (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => setBizType(t.id)}
                              className={`group flex flex-col items-start gap-3 rounded-2xl border-2 p-5 text-left transition-all ${
                                bizType === t.id
                                  ? "border-primary bg-accent/50 shadow-soft"
                                  : "border-border hover:border-primary/40"
                              }`}
                            >
                              <div
                                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                                  bizType === t.id
                                    ? "bg-gradient-primary text-primary-foreground"
                                    : "bg-muted"
                                }`}
                              >
                                <t.icon className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="font-display font-semibold">{t.name}</div>
                                <div className="text-xs text-muted-foreground">{t.desc}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="employees">Jumlah Karyawan</Label>
                          <Input
                            id="employees"
                            type="number"
                            min="1"
                            value={employees}
                            onChange={(e) => setEmployees(e.target.value)}
                            placeholder="25"
                            className="rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="industry">Kategori Industri</Label>
                          <select
                            id="industry"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            <option value="" disabled>
                              Pilih industri
                            </option>
                            {industries.map((ind) => (
                              <option key={ind} value={ind}>
                                {ind}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* STEP 2 — Pilih Modul */}
                {step === 2 && (
                  <>
                    <h2 className="font-display text-2xl font-bold md:text-3xl">
                      Modul apa yang Anda butuhkan?
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      Pilih lebih dari satu. Bisa diubah nanti.
                    </p>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {modules.map((m) => {
                        const active = selectedModules.includes(m.id);
                        const { Icon, weight } = resolvePhosphorIcon(m.icon);
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => toggleModule(m.id)}
                            className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                              active
                                ? "border-primary bg-accent/50"
                                : "border-border hover:border-primary/40"
                            }`}
                          >
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                                active ? "bg-gradient-primary text-primary-foreground" : "bg-muted"
                              }`}
                            >
                              <Icon weight={weight} className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{m.name}</div>
                              <div className="text-xs text-muted-foreground">{m.description}</div>
                            </div>
                            <div
                              className={`flex h-5 w-5 items-center justify-center rounded-md border-2 ${
                                active ? "border-primary bg-primary" : "border-border"
                              }`}
                            >
                              {active && <Check className="h-3 w-3 text-primary-foreground" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* STEP 3 — Rekomendasi & Konfirmasi */}
                {step === 3 && (
                  <>
                    <Badge className="rounded-full bg-primary text-primary-foreground">
                      14 hari gratis
                    </Badge>
                    <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl">
                      Coba seluruh Siarpi lebih dulu
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      Semua modul aktif selama 14 hari. Tidak perlu kartu kredit dan tidak ada
                      tagihan otomatis saat trial berakhir.
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {[
                        [ShieldCheck, "Tanpa kartu kredit"],
                        [Sparkles, "Semua modul terbuka"],
                        [CalendarClock, "Berakhir otomatis"],
                      ].map(([Icon, label]) => (
                        <div
                          key={label as string}
                          className="flex items-center gap-3 rounded-xl border border-border bg-background p-3 text-sm font-medium"
                        >
                          <Icon className="h-5 w-5 text-primary" />
                          {label as string}
                        </div>
                      ))}
                    </div>

                    <Card className="mt-6 rounded-2xl border border-border bg-muted/30 p-6 shadow-none">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-muted-foreground">Paket disarankan</div>
                          <div className="font-display text-2xl font-bold">{recommendedPlan}</div>
                        </div>
                        <Badge className="bg-gradient-primary text-primary-foreground">
                          Best Match
                        </Badge>
                      </div>
                      <div className="mt-6">
                        <div className="text-sm text-muted-foreground">Estimasi setelah trial</div>
                        <div className="mt-1">
                          <span className="font-display text-4xl font-bold">
                            {formatIDR(totalPrice)}
                          </span>
                          <span className="text-muted-foreground">/bulan</span>
                        </div>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {selectedModules.map((id) => {
                          const m = modules.find((x) => x.id === id);
                          if (!m) return null;
                          const { Icon, weight } = resolvePhosphorIcon(m.icon);
                          return (
                            <Badge
                              key={id}
                              variant="outline"
                              className="rounded-full border-primary/30 bg-background"
                            >
                              <Icon weight={weight} className="mr-1 h-3 w-3" /> {m.name}
                            </Badge>
                          );
                        })}
                      </div>
                    </Card>

                    {submitError && (
                      <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                        {submitError}
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Nav */}
            <div className="mt-10 flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={back}
                disabled={(existingCompanyId ? step <= 2 : step === 1) || submitting}
              >
                <ArrowLeft className="mr-1 h-4 w-4" /> Kembali
              </Button>
              {step < totalSteps ? (
                <Button
                  onClick={next}
                  disabled={!canNext}
                  className="bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-glow"
                >
                  Lanjut <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <div className="flex flex-col-reverse gap-2 sm:flex-row">
                  <Button
                    variant="outline"
                    onClick={handleCheckout}
                    disabled={!canNext || submitting}
                  >
                    {submitMode === "checkout" && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
                    Langsung berlangganan
                  </Button>
                  <Button
                    onClick={handleStartTrial}
                    disabled={!canNext || submitting}
                    className="bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-glow"
                  >
                    {submitMode === "trial" ? (
                      <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                    ) : (
                      <Rocket className="mr-1 h-4 w-4" />
                    )}
                    Mulai trial 14 hari
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
