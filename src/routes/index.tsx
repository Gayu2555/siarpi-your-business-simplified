import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { modules, formatIDR } from "@/lib/modules";
import {
  Sparkles, Check, Star, ArrowRight, Zap, Layers,
  RefreshCw, GraduationCap, CreditCard, Building2, Smartphone, QrCode,
  Palette, Puzzle, Quote, Users
} from "lucide-react";
import dashboardImg from "@/assets/dashboard-preview.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Siarpi — Kelola Bisnis Tanpa Ribet" },
      { name: "description", content: "All-in-One Management System untuk UMKM, Startup, dan Perusahaan Indonesia. Mulai dari Rp 99.000/bulan." },
      { property: "og:title", content: "Siarpi — Kelola Bisnis Tanpa Ribet" },
      { property: "og:description", content: "All-in-One Management System untuk UMKM, Startup, dan Perusahaan Indonesia." },
    ],
  }),
  component: LandingPage,
});

const benefits = [
  { icon: Layers, title: "All in One", desc: "Semua modul bisnis dalam satu sistem terintegrasi." },
  { icon: Zap, title: "Modular", desc: "Beli per fitur sesuai kebutuhan, hemat biaya." },
  { icon: RefreshCw, title: "Real-time Data", desc: "Sinkronisasi otomatis di semua perangkat." },
  { icon: GraduationCap, title: "Zero Training", desc: "Antarmuka intuitif, tim langsung bisa pakai." },
];

const plans = [
  {
    name: "Basic", price: 99000, popular: false,
    desc: "Cocok untuk UMKM yang baru mulai",
    features: ["3 modul pilihan", "Hingga 10 user", "Support email", "Update bulanan"],
  },
  {
    name: "Pro", price: 299000, popular: true,
    desc: "Untuk bisnis berkembang & startup",
    features: ["Semua modul inti", "Hingga 50 user", "Priority support", "API access", "Custom report"],
  },
  {
    name: "Enterprise", price: 799000, popular: false,
    desc: "Solusi penuh untuk perusahaan",
    features: ["Unlimited modul & user", "Dedicated manager", "SLA 99.9%", "On-premise option", "Custom integration"],
  },
];

const payments = [
  { icon: Building2, label: "Transfer Bank" },
  { icon: CreditCard, label: "Virtual Account" },
  { icon: QrCode, label: "QRIS" },
  { icon: Smartphone, label: "E-Wallet" },
];

function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-subtle">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="container relative mx-auto px-4 pt-12 pb-20 md:px-6 md:pt-20 md:pb-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
            {/* LEFT — copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge
                variant="secondary"
                className="mb-6 rounded-full border border-primary/20 bg-accent/60 px-4 py-1.5 text-xs font-medium text-accent-foreground"
              >
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                All-in-One Management System
              </Badge>

              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
                Kelola Bisnis
                <br />
                <span className="text-gradient-primary">Tanpa Ribet</span>
                <br />
                dengan Siarpi
              </h1>

              <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
                Desain rapih, profesional, dan mudah dimengerti — crew Anda bisa langsung pakai dengan{" "}
                <span className="font-semibold text-foreground">hampir nol training</span>. Beli modul sesuai kebutuhan, tambahkan kapan saja.
              </p>

              {/* Feature bullets */}
              <ul className="mt-8 space-y-4">
                {[
                  { icon: Palette, color: "amber", text: "Desain profesional & intuitif — mudah dimengerti siapa saja" },
                  { icon: GraduationCap, color: "emerald", text: "Hampir nol training — crew langsung bisa pakai" },
                  { icon: Puzzle, color: "blue", text: "Beli ketengan — pilih modul sesuai kebutuhan bisnis Anda" },
                ].map((b) => (
                  <li key={b.text} className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        b.color === "amber"
                          ? "bg-primary/15 text-primary"
                          : b.color === "emerald"
                            ? "bg-emerald-500/15 text-emerald-600"
                            : "bg-blue-500/15 text-blue-600"
                      }`}
                    >
                      <b.icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-foreground/80 md:text-base">{b.text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row">
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow"
                >
                  <Link to="/onboarding">
                    Mulai Sekarang <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/onboarding">Lihat Demo</Link>
                </Button>
              </div>
            </motion.div>

            {/* RIGHT — dashboard with floating cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute -inset-6 bg-gradient-primary opacity-25 blur-3xl" />

              <img
                src={dashboardImg}
                alt="Dashboard preview Siarpi"
                width={1600}
                height={1024}
                className="relative rounded-2xl border border-border shadow-elegant"
              />

              {/* Floating: Beli Ketengan (top-right) */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -top-4 -right-2 hidden rounded-2xl border border-border bg-background/95 px-4 py-2.5 shadow-elegant backdrop-blur sm:flex sm:items-center sm:gap-2"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Puzzle className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-semibold">Beli Ketengan</span>
              </motion.div>

              {/* Floating: Zero Training (bottom-left) */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.75 }}
                className="absolute -bottom-5 left-2 flex items-center gap-3 rounded-2xl border border-border bg-background/95 px-4 py-3 shadow-elegant backdrop-blur sm:left-6"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <div>
                  <div className="text-sm font-semibold leading-tight">Zero Training</div>
                  <div className="text-xs text-muted-foreground">Langsung bisa dipakai</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="container mx-auto px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 rounded-full">Modules</Badge>
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Semua yang bisnis Anda butuhkan
          </h2>
          <p className="mt-4 text-muted-foreground">
            Pilih modul yang Anda butuhkan, atau ambil semuanya dalam satu paket.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {modules.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <Link to="/modules/$moduleId" params={{ moduleId: m.id }}>
                <Card className="group flex h-full cursor-pointer flex-col items-center gap-3 rounded-2xl border-border p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-transform duration-300 group-hover:scale-110">
                    <m.icon className="h-6 w-6" />
                  </div>
                  <div className="font-display font-semibold">{m.name}</div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4 rounded-full">Kenapa Siarpi</Badge>
            <h2 className="font-display text-3xl font-bold md:text-5xl">
              Dirancang untuk bisnis Indonesia
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card className="h-full rounded-2xl border-border p-6 transition-shadow hover:shadow-card">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="container mx-auto px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 rounded-full">Harga</Badge>
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Pilih paket yang sesuai
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tanpa kartu kredit. Bayar dengan metode lokal Indonesia.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={plan.popular ? "lg:-translate-y-4" : ""}
            >
              <Card
                className={`relative flex h-full flex-col rounded-3xl p-8 transition-all ${
                  plan.popular
                    ? "border-2 border-primary bg-gradient-subtle shadow-elegant"
                    : "border-border hover:shadow-card"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary text-primary-foreground shadow-soft">
                    <Star className="mr-1 h-3 w-3 fill-current" /> Paling Populer
                  </Badge>
                )}
                <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.desc}</p>
                <div className="mt-6">
                  <span className="font-display text-4xl font-bold">{formatIDR(plan.price)}</span>
                  <span className="text-muted-foreground">/bulan</span>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`mt-8 ${plan.popular ? "bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-glow" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  <Link to="/onboarding">Mulai dengan {plan.name}</Link>
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Mau beli per modul saja?{" "}
          <Link to="/modular" className="font-medium text-primary hover:underline">
            Lihat harga ketengan →
          </Link>
        </div>
      </section>

      {/* PAYMENTS */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Bayar mudah <span className="text-gradient-primary">tanpa kartu kredit</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Semua metode pembayaran Indonesia didukung.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
            {payments.map((p) => (
              <Card key={p.label} className="flex flex-col items-center gap-3 rounded-2xl border-border p-6 transition-shadow hover:shadow-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
                  <p.icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">{p.label}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 md:px-6 md:py-28">
        <Card className="overflow-hidden rounded-3xl border-0 bg-gradient-primary p-12 text-center shadow-elegant md:p-16">
          <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-5xl">
            Siap kelola bisnis tanpa ribet?
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            Mulai gratis hari ini, tanpa kartu kredit.
          </p>
          <Button size="lg" asChild className="mt-8 bg-background text-foreground hover:bg-background/90">
            <Link to="/onboarding">
              Mulai Sekarang <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </Card>
      </section>

      <Footer />
    </div>
  );
}
