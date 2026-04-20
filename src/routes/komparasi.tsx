import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, X, TrendingDown, Sparkles, Zap, Shield, ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatIDR } from "@/lib/modules";

export const Route = createFileRoute("/komparasi")({
  head: () => ({
    meta: [
      { title: "Komparasi Harga — Siarpi vs Aplikasi Terpisah" },
      {
        name: "description",
        content:
          "Bandingkan harga Siarpi all-in-one dengan kombinasi aplikasi terpisah seperti BambooHR, Gusto, QuickBooks, dan lainnya. Hemat hingga 80% biaya bulanan.",
      },
      { property: "og:title", content: "Komparasi Harga — Siarpi vs Aplikasi Terpisah" },
      {
        property: "og:description",
        content: "Hitung berapa banyak yang bisa Anda hemat dengan beralih ke Siarpi.",
      },
    ],
  }),
  component: KomparasiPage,
});

// Competitor apps with realistic IDR pricing per user/month for SMB plans
const competitors = [
  { category: "HR", name: "BambooHR", price: 175000, siarpiPrice: 49000 },
  { category: "Payroll", name: "Gusto / Talenta", price: 220000, siarpiPrice: 79000 },
  { category: "Finance", name: "QuickBooks Online", price: 285000, siarpiPrice: 99000 },
  { category: "Inventory", name: "Zoho Inventory", price: 195000, siarpiPrice: 69000 },
  { category: "Project", name: "Asana / Monday", price: 165000, siarpiPrice: 59000 },
  { category: "CRM", name: "HubSpot / Salesforce", price: 320000, siarpiPrice: 69000 },
  { category: "Absensi", name: "Jibble / Hadirr", price: 95000, siarpiPrice: 39000 },
  { category: "Invoice", name: "Xero / FreshBooks", price: 185000, siarpiPrice: 49000 },
  { category: "POS", name: "Moka / Square", price: 249000, siarpiPrice: 79000 },
  { category: "Analytics", name: "Tableau / Power BI", price: 215000, siarpiPrice: 89000 },
];

const totalCompetitor = competitors.reduce((s, c) => s + c.price, 0);
const totalSiarpi = competitors.reduce((s, c) => s + c.siarpiPrice, 0);
const savings = totalCompetitor - totalSiarpi;
const savingsPercent = Math.round((savings / totalCompetitor) * 100);

const featureMatrix = [
  { feature: "Semua modul dalam 1 platform", siarpi: true, others: false },
  { feature: "Data tersinkron antar modul", siarpi: true, others: false },
  { feature: "Bayar per modul (ketengan)", siarpi: true, others: false },
  { feature: "Bahasa & support Indonesia", siarpi: true, others: false },
  { feature: "Pajak PPh 21 & BPJS otomatis", siarpi: true, others: false },
  { feature: "1 login untuk semua tools", siarpi: true, others: false },
  { feature: "Training kompleks per app", siarpi: false, others: true },
  { feature: "Banyak vendor & kontrak", siarpi: false, others: true },
];

function KomparasiPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="border-b border-border/50 bg-gradient-to-b from-primary/5 via-background to-background py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <TrendingDown className="h-4 w-4" />
              Hemat hingga {savingsPercent}% biaya bulanan
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight lg:text-6xl">
              Siarpi vs <span className="text-gradient-primary">Aplikasi Terpisah</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground lg:text-xl">
              Lihat berapa yang Anda bayar jika menggunakan banyak aplikasi terpisah,
              dibandingkan satu Siarpi yang sudah lengkap.
            </p>
          </motion.div>

          {/* Big number summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3"
          >
            <Card className="border-destructive/20 bg-destructive/5 p-6">
              <div className="text-sm font-medium text-muted-foreground">Aplikasi Terpisah</div>
              <div className="mt-2 font-display text-3xl font-bold text-destructive lg:text-4xl">
                {formatIDR(totalCompetitor)}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">/bulan untuk 10 tools</div>
            </Card>
            <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 p-6 shadow-soft">
              <div className="text-sm font-medium text-primary">Dengan Siarpi</div>
              <div className="mt-2 font-display text-3xl font-bold text-primary lg:text-4xl">
                {formatIDR(totalSiarpi)}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">/bulan, semua modul</div>
            </Card>
            <Card className="border-emerald-500/30 bg-emerald-500/5 p-6">
              <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Penghematan Anda
              </div>
              <div className="mt-2 font-display text-3xl font-bold text-emerald-600 dark:text-emerald-400 lg:text-4xl">
                {formatIDR(savings)}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">/bulan ({savingsPercent}% lebih murah)</div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Per-module comparison table */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold lg:text-4xl">
              Perbandingan Per Modul
            </h2>
            <p className="mt-4 text-muted-foreground">
              Harga rata-rata aplikasi populer untuk paket UKM (per pengguna/bulan).
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 border-b border-border bg-muted/40 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <div className="col-span-4">Kategori</div>
              <div className="col-span-4">Aplikasi Lain</div>
              <div className="col-span-2 text-right">Mereka</div>
              <div className="col-span-2 text-right">Siarpi</div>
            </div>

            {competitors.map((row, i) => (
              <motion.div
                key={row.category}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="grid grid-cols-12 items-center gap-4 border-b border-border px-6 py-4 last:border-0 hover:bg-muted/30"
              >
                <div className="col-span-4 font-semibold">{row.category}</div>
                <div className="col-span-4 text-sm text-muted-foreground">{row.name}</div>
                <div className="col-span-2 text-right text-sm text-muted-foreground line-through">
                  {formatIDR(row.price)}
                </div>
                <div className="col-span-2 text-right font-semibold text-primary">
                  {formatIDR(row.siarpiPrice)}
                </div>
              </motion.div>
            ))}

            {/* Total */}
            <div className="grid grid-cols-12 items-center gap-4 bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-5">
              <div className="col-span-4 font-display text-lg font-bold">TOTAL / Bulan</div>
              <div className="col-span-4 text-sm text-muted-foreground">10 tools terpisah</div>
              <div className="col-span-2 text-right text-sm text-destructive line-through">
                {formatIDR(totalCompetitor)}
              </div>
              <div className="col-span-2 text-right font-display text-lg font-bold text-primary">
                {formatIDR(totalSiarpi)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature matrix */}
      <section className="border-t border-border/50 bg-muted/20 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold lg:text-4xl">
              Lebih dari Sekedar Harga
            </h2>
            <p className="mt-4 text-muted-foreground">
              Yang Anda dapatkan dengan Siarpi vs menggabungkan banyak app.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            <div className="grid grid-cols-12 border-b border-border bg-muted/40 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <div className="col-span-6">Fitur</div>
              <div className="col-span-3 text-center">Siarpi</div>
              <div className="col-span-3 text-center">Aplikasi Terpisah</div>
            </div>
            {featureMatrix.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-12 items-center border-b border-border px-6 py-4 last:border-0"
              >
                <div className="col-span-6 text-sm">{row.feature}</div>
                <div className="col-span-3 flex justify-center">
                  {row.siarpi ? (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-4 w-4" />
                    </div>
                  ) : (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <X className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <div className="col-span-3 flex justify-center">
                  {row.others ? (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <Check className="h-4 w-4" />
                    </div>
                  ) : (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                      <X className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {[
              { icon: Zap, title: "Setup 1 Hari", desc: "Tidak perlu integrasi rumit antar 10 vendor berbeda." },
              { icon: Shield, title: "1 Vendor, 1 Tagihan", desc: "Tidak ada lagi 10 invoice & 10 customer support." },
              { icon: Sparkles, title: "Data Mengalir Otomatis", desc: "Absensi → Payroll → Finance, semua tersambung." },
            ].map((b) => (
              <Card key={b.title} className="p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/50 bg-gradient-to-br from-primary/10 via-background to-background py-20">
        <div className="container mx-auto px-4 text-center md:px-6">
          <h2 className="font-display text-3xl font-bold lg:text-4xl">
            Siap hemat {formatIDR(savings)}/bulan?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Coba Siarpi 14 hari gratis. Tanpa kartu kredit, tanpa kontrak panjang.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild className="bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-glow">
              <Link to="/onboarding">
                Mulai Gratis Sekarang <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/modular">Lihat Modul Ketengan</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
