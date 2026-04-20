import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/site/Header";
import { modules, formatIDR } from "@/lib/modules";
import {
  Building2, Rocket, Briefcase, Check, ArrowRight, ArrowLeft,
  CreditCard, QrCode, Smartphone, Sparkles
} from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Onboarding — Siarpi" },
      { name: "description", content: "Setup akun Siarpi dalam 5 langkah cepat." },
    ],
  }),
  component: OnboardingPage,
});

const businessTypes = [
  { id: "umkm", name: "UMKM", icon: Briefcase, desc: "Usaha mikro & kecil" },
  { id: "startup", name: "Startup", icon: Rocket, desc: "Tim berkembang & inovatif" },
  { id: "perusahaan", name: "Perusahaan", icon: Building2, desc: "Skala menengah-besar" },
];

const paymentMethods = [
  { id: "bank", name: "Transfer Bank", icon: Building2 },
  { id: "va", name: "Virtual Account", icon: CreditCard },
  { id: "qris", name: "QRIS", icon: QrCode },
  { id: "ewallet", name: "E-Wallet", icon: Smartphone },
];

function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [bizType, setBizType] = useState<string>("");
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [companyName, setCompanyName] = useState("");
  const [employees, setEmployees] = useState("");
  const [industry, setIndustry] = useState("");
  const [payment, setPayment] = useState<string>("");

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const totalPrice = selectedModules.reduce((sum, id) => {
    const m = modules.find((x) => x.id === id);
    return sum + (m?.price ?? 0);
  }, 0);

  const recommendedPlan = totalPrice > 500000 ? "Enterprise" : totalPrice > 200000 ? "Pro" : "Basic";

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const next = () => setStep((s) => Math.min(s + 1, totalSteps));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const canNext =
    (step === 1 && bizType) ||
    (step === 2 && selectedModules.length > 0) ||
    (step === 3 && companyName && employees && industry) ||
    step === 4 ||
    (step === 5 && payment);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-subtle">
      <Header />

      <main className="container mx-auto flex-1 px-4 py-10 md:px-6 md:py-16">
        <div className="mx-auto max-w-3xl">
          {/* Progress */}
          <div className="mb-10">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="font-medium">Langkah {step} dari {totalSteps}</span>
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
                {/* STEP 1 */}
                {step === 1 && (
                  <>
                    <h2 className="font-display text-2xl font-bold md:text-3xl">Apa kebutuhan bisnis Anda?</h2>
                    <p className="mt-2 text-muted-foreground">Pilih kategori yang paling cocok.</p>
                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                      {businessTypes.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setBizType(t.id)}
                          className={`group flex flex-col items-start gap-3 rounded-2xl border-2 p-6 text-left transition-all ${
                            bizType === t.id
                              ? "border-primary bg-accent/50 shadow-soft"
                              : "border-border hover:border-primary/40"
                          }`}
                        >
                          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${bizType === t.id ? "bg-gradient-primary text-primary-foreground" : "bg-muted"}`}>
                            <t.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-display font-semibold">{t.name}</div>
                            <div className="text-xs text-muted-foreground">{t.desc}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <>
                    <h2 className="font-display text-2xl font-bold md:text-3xl">Modul apa yang Anda butuhkan?</h2>
                    <p className="mt-2 text-muted-foreground">Pilih lebih dari satu. Bisa diubah nanti.</p>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {modules.map((m) => {
                        const active = selectedModules.includes(m.id);
                        return (
                          <button
                            key={m.id}
                            onClick={() => toggleModule(m.id)}
                            className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                              active
                                ? "border-primary bg-accent/50"
                                : "border-border hover:border-primary/40"
                            }`}
                          >
                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${active ? "bg-gradient-primary text-primary-foreground" : "bg-muted"}`}>
                              <m.icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{m.name}</div>
                              <div className="text-xs text-muted-foreground">{m.description}</div>
                            </div>
                            <div className={`flex h-5 w-5 items-center justify-center rounded-md border-2 ${active ? "border-primary bg-primary" : "border-border"}`}>
                              {active && <Check className="h-3 w-3 text-primary-foreground" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <>
                    <h2 className="font-display text-2xl font-bold md:text-3xl">Setup awal perusahaan</h2>
                    <p className="mt-2 text-muted-foreground">Beberapa info dasar untuk akun Anda.</p>
                    <div className="mt-8 space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="company">Nama Perusahaan</Label>
                        <Input id="company" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="PT Maju Sejahtera" className="rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="employees">Jumlah Karyawan</Label>
                        <Input id="employees" type="number" value={employees} onChange={(e) => setEmployees(e.target.value)} placeholder="25" className="rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industri</Label>
                        <Input id="industry" value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="Retail, F&B, Tech, dll" className="rounded-xl" />
                      </div>
                    </div>
                  </>
                )}

                {/* STEP 4 */}
                {step === 4 && (
                  <>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <Badge variant="secondary" className="rounded-full">AI Recommendation</Badge>
                    </div>
                    <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl">Rekomendasi paket untuk Anda</h2>
                    <p className="mt-2 text-muted-foreground">
                      Berdasarkan {selectedModules.length} modul dipilih untuk bisnis {bizType.toUpperCase()}.
                    </p>

                    <Card className="mt-6 rounded-2xl border-2 border-primary bg-gradient-subtle p-6 shadow-soft">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-muted-foreground">Paket disarankan</div>
                          <div className="font-display text-2xl font-bold">{recommendedPlan}</div>
                        </div>
                        <Badge className="bg-gradient-primary text-primary-foreground">Best Match</Badge>
                      </div>
                      <div className="mt-6">
                        <div className="text-sm text-muted-foreground">Estimasi total</div>
                        <div className="mt-1">
                          <span className="font-display text-4xl font-bold">{formatIDR(totalPrice)}</span>
                          <span className="text-muted-foreground">/bulan</span>
                        </div>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {selectedModules.map((id) => {
                          const m = modules.find((x) => x.id === id);
                          if (!m) return null;
                          return (
                            <Badge key={id} variant="outline" className="rounded-full border-primary/30 bg-background">
                              <m.icon className="mr-1 h-3 w-3" /> {m.name}
                            </Badge>
                          );
                        })}
                      </div>
                    </Card>
                  </>
                )}

                {/* STEP 5 */}
                {step === 5 && (
                  <>
                    <h2 className="font-display text-2xl font-bold md:text-3xl">Pilih metode pembayaran</h2>
                    <p className="mt-2 text-muted-foreground">Tanpa kartu kredit. Semua metode lokal didukung.</p>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {paymentMethods.map((p) => {
                        const active = payment === p.id;
                        return (
                          <button
                            key={p.id}
                            onClick={() => setPayment(p.id)}
                            className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                              active ? "border-primary bg-accent/50" : "border-border hover:border-primary/40"
                            }`}
                          >
                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${active ? "bg-gradient-primary text-primary-foreground" : "bg-muted"}`}>
                              <p.icon className="h-5 w-5" />
                            </div>
                            <span className="font-medium">{p.name}</span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-6 rounded-xl bg-muted/50 p-4 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Total tagihan</span>
                        <span className="font-display text-xl font-bold">{formatIDR(totalPrice)}/bulan</span>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Nav */}
            <div className="mt-10 flex items-center justify-between">
              <Button variant="ghost" onClick={back} disabled={step === 1}>
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
                <Button
                  asChild
                  disabled={!canNext}
                  className="bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-glow"
                >
                  <Link to="/">Aktifkan Sekarang</Link>
                </Button>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
