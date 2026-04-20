import type { ReactElement } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, X, TrendingDown, Sparkles, Zap, Shield, ArrowRight, Minus } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatIDR } from "@/lib/modules";

export const Route = createFileRoute("/komparasi")({
  head: () => ({
    meta: [
      { title: "Komparasi — Siarpi vs Odoo, Zoho, SAP, NetSuite" },
      {
        name: "description",
        content:
          "Bandingkan Siarpi dengan ERP global seperti Odoo, Zoho One, SAP Business One, Oracle NetSuite, dan Microsoft Dynamics 365. Harga, fitur, dan kemudahan pakai.",
      },
      { property: "og:title", content: "Komparasi — Siarpi vs ERP Global" },
      {
        property: "og:description",
        content: "Lihat kenapa UKM Indonesia memilih Siarpi dibanding Odoo, Zoho, SAP, dan NetSuite.",
      },
    ],
  }),
  component: KomparasiPage,
});

// ============================================================
// Brand logos (inline SVG so they render crisp on every device).
// Colors are brand-accurate but kept compact.
// ============================================================
type LogoProps = { className?: string };

const SiarpiLogo = ({ className }: LogoProps) => (
  <div className={`flex items-center gap-1.5 ${className ?? ""}`}>
    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-primary">
      <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
    </div>
    <span className="font-display text-sm font-bold tracking-tight">Siarpi</span>
  </div>
);

const OdooLogo = ({ className }: LogoProps) => (
  <div className={`flex items-center gap-1.5 ${className ?? ""}`}>
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <circle cx="8" cy="12" r="6" fill="#714B67" />
      <circle cx="16" cy="12" r="6" fill="#8F8F8F" />
    </svg>
    <span className="text-sm font-bold" style={{ color: "#714B67" }}>Odoo</span>
  </div>
);

const ZohoLogo = ({ className }: LogoProps) => (
  <div className={`flex items-center gap-1.5 ${className ?? ""}`}>
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <rect width="24" height="24" rx="5" fill="#E42527" />
      <text x="12" y="17" textAnchor="middle" fill="white" fontSize="13" fontWeight="900" fontFamily="Arial">Z</text>
    </svg>
    <span className="text-sm font-bold" style={{ color: "#E42527" }}>Zoho One</span>
  </div>
);

const SapLogo = ({ className }: LogoProps) => (
  <div className={`flex items-center gap-1.5 ${className ?? ""}`}>
    <svg viewBox="0 0 60 24" className="h-6 w-14">
      <rect width="60" height="24" fill="#0FAAFF" />
      <text x="30" y="17" textAnchor="middle" fill="white" fontSize="13" fontWeight="900" fontFamily="Arial">SAP</text>
    </svg>
  </div>
);

const NetsuiteLogo = ({ className }: LogoProps) => (
  <div className={`flex items-center gap-1.5 ${className ?? ""}`}>
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <rect width="24" height="24" rx="4" fill="#1A1A1A" />
      <path d="M6 6h3l6 9V6h3v12h-3l-6-9v9H6z" fill="#FF6E00" />
    </svg>
    <span className="text-sm font-bold" style={{ color: "#FF6E00" }}>NetSuite</span>
  </div>
);

const DynamicsLogo = ({ className }: LogoProps) => (
  <div className={`flex items-center gap-1.5 ${className ?? ""}`}>
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <rect x="2" y="2" width="9" height="9" fill="#F25022" />
      <rect x="13" y="2" width="9" height="9" fill="#7FBA00" />
      <rect x="2" y="13" width="9" height="9" fill="#00A4EF" />
      <rect x="13" y="13" width="9" height="9" fill="#FFB900" />
    </svg>
    <span className="text-sm font-bold text-foreground">Dynamics 365</span>
  </div>
);

// ============================================================
// Comparison data — realistic monthly IDR for ~25 user SMB
// (estimasi pasar Indonesia, paket entry/standard)
// ============================================================
type Cell = boolean | "partial" | string;
type Competitor = {
  key: string;
  Logo: (p: LogoProps) => ReactElement;
  setup: string;
  monthly: string;
  monthlyValue: number;
};

const siarpiMonthly = 690000;

const competitors: Competitor[] = [
  { key: "siarpi", Logo: SiarpiLogo, setup: "1 hari", monthly: formatIDR(siarpiMonthly), monthlyValue: siarpiMonthly },
  { key: "odoo", Logo: OdooLogo, setup: "2–4 minggu", monthly: "Rp 4–8 jt", monthlyValue: 6000000 },
  { key: "zoho", Logo: ZohoLogo, setup: "1–2 minggu", monthly: "Rp 5–10 jt", monthlyValue: 7500000 },
  { key: "sap", Logo: SapLogo, setup: "2–4 bulan", monthly: "Rp 25–60 jt", monthlyValue: 40000000 },
  { key: "netsuite", Logo: NetsuiteLogo, setup: "3–6 bulan", monthly: "Rp 35–80 jt", monthlyValue: 55000000 },
  { key: "dynamics", Logo: DynamicsLogo, setup: "2–5 bulan", monthly: "Rp 20–50 jt", monthlyValue: 35000000 },
];

type FeatureRow = {
  feature: string;
  values: Record<string, Cell>;
};

const rows: FeatureRow[] = [
  {
    feature: "Bahasa Indonesia native",
    values: { siarpi: true, odoo: "partial", zoho: "partial", sap: false, netsuite: false, dynamics: "partial" },
  },
  {
    feature: "Pajak PPh 21 & BPJS otomatis",
    values: { siarpi: true, odoo: false, zoho: false, sap: "partial", netsuite: false, dynamics: false },
  },
  {
    feature: "QRIS & e-Faktur built-in",
    values: { siarpi: true, odoo: false, zoho: false, sap: false, netsuite: false, dynamics: false },
  },
  {
    feature: "Beli per modul (ketengan)",
    values: { siarpi: true, odoo: true, zoho: false, sap: false, netsuite: false, dynamics: "partial" },
  },
  {
    feature: "Tanpa konsultan / partner",
    values: { siarpi: true, odoo: false, zoho: "partial", sap: false, netsuite: false, dynamics: false },
  },
  {
    feature: "Setup < 1 hari",
    values: { siarpi: true, odoo: false, zoho: false, sap: false, netsuite: false, dynamics: false },
  },
  {
    feature: "Support tim lokal Indonesia",
    values: { siarpi: true, odoo: "partial", zoho: "partial", sap: "partial", netsuite: false, dynamics: "partial" },
  },
  {
    feature: "Trial gratis tanpa kartu kredit",
    values: { siarpi: true, odoo: true, zoho: true, sap: false, netsuite: false, dynamics: false },
  },
  {
    feature: "UI modern & mobile-first",
    values: { siarpi: true, odoo: "partial", zoho: true, sap: false, netsuite: false, dynamics: "partial" },
  },
  {
    feature: "Cocok untuk UKM Indonesia",
    values: { siarpi: true, odoo: "partial", zoho: "partial", sap: false, netsuite: false, dynamics: false },
  },
];

function CellIcon({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-primary">
        <Check className="h-4 w-4" strokeWidth={3} />
      </div>
    );
  }
  if (value === "partial") {
    return (
      <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
        <Minus className="h-4 w-4" strokeWidth={3} />
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <X className="h-4 w-4" strokeWidth={3} />
      </div>
    );
  }
  return <span className="text-xs text-muted-foreground">{value}</span>;
}

function KomparasiPage() {
  const cheapestCompetitor = Math.min(...competitors.filter((c) => c.key !== "siarpi").map((c) => c.monthlyValue));
  const savingsVsCheapest = cheapestCompetitor - siarpiMonthly;
  const savingsPercent = Math.round((savingsVsCheapest / cheapestCompetitor) * 100);

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
              Hingga {savingsPercent}% lebih hemat dari ERP global
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight lg:text-6xl">
              Siarpi vs <span className="text-gradient-primary">Odoo, Zoho, SAP & NetSuite</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground lg:text-xl">
              Perbandingan jujur antara Siarpi dengan ERP & business suite global yang
              banyak dipakai perusahaan besar.
            </p>
          </motion.div>

          {/* Logo bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-4 rounded-2xl border border-border bg-card/50 px-6 py-5 shadow-soft backdrop-blur"
          >
            <SiarpiLogo />
            <span className="text-muted-foreground">vs</span>
            <OdooLogo />
            <ZohoLogo />
            <SapLogo />
            <NetsuiteLogo />
            <DynamicsLogo />
          </motion.div>
        </div>
      </section>

      {/* Pricing comparison cards */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold lg:text-4xl">
              Estimasi Harga & Setup
            </h2>
            <p className="mt-4 text-muted-foreground">
              Untuk perusahaan ~25 pengguna. Termasuk biaya lisensi & implementasi rata-rata.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {competitors.map((c, i) => {
              const isSiarpi = c.key === "siarpi";
              return (
                <motion.div
                  key={c.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Card
                    className={`relative h-full p-6 ${
                      isSiarpi
                        ? "border-primary/40 bg-gradient-to-br from-primary/10 to-primary/5 shadow-soft"
                        : ""
                    }`}
                  >
                    {isSiarpi && (
                      <div className="absolute -top-3 left-6 rounded-full bg-gradient-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-soft">
                        REKOMENDASI
                      </div>
                    )}
                    <c.Logo />
                    <div className="mt-6">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">Estimasi/bulan</div>
                      <div
                        className={`mt-1 font-display text-2xl font-bold ${
                          isSiarpi ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {c.monthly}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm">
                      <span className="text-muted-foreground">Setup time</span>
                      <span className={`font-semibold ${isSiarpi ? "text-primary" : ""}`}>{c.setup}</span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature matrix */}
      <section className="border-t border-border/50 bg-muted/20 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold lg:text-4xl">
              Perbandingan Fitur
            </h2>
            <p className="mt-4 text-muted-foreground">
              Yang paling penting untuk bisnis Indonesia.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="h-2.5 w-2.5" strokeWidth={4} />
                </span>
                Tersedia
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
                  <Minus className="h-2.5 w-2.5" strokeWidth={4} />
                </span>
                Sebagian / butuh add-on
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <X className="h-2.5 w-2.5" strokeWidth={4} />
                </span>
                Tidak ada
              </span>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-6xl overflow-x-auto">
            <div className="min-w-[900px] overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              {/* Header row */}
              <div className="grid grid-cols-12 items-center gap-2 border-b border-border bg-muted/40 px-4 py-4">
                <div className="col-span-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Fitur
                </div>
                {competitors.map((c) => (
                  <div key={c.key} className="col-span-1 flex justify-center md:col-span-1.5">
                    <c.Logo />
                  </div>
                ))}
              </div>

              {rows.map((row, idx) => (
                <motion.div
                  key={row.feature}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: idx * 0.03 }}
                  className="grid grid-cols-12 items-center gap-2 border-b border-border px-4 py-4 last:border-0 hover:bg-muted/30"
                >
                  <div className="col-span-3 text-sm font-medium">{row.feature}</div>
                  {competitors.map((c) => (
                    <div key={c.key} className="col-span-1 md:col-span-1.5">
                      <CellIcon value={row.values[c.key]} />
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold lg:text-4xl">
              Kenapa UKM Pilih Siarpi?
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {[
              { icon: Zap, title: "Setup 1 Hari", desc: "Bukan 3 bulan dengan konsultan mahal seperti SAP/NetSuite." },
              { icon: Shield, title: "Compliance Lokal", desc: "PPh 21, BPJS, e-Faktur, QRIS — bawaan, bukan add-on." },
              { icon: Sparkles, title: "Bahasa & Support ID", desc: "Tim support orang Indonesia, paham bisnis lokal." },
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
            Siap pindah dari ERP yang ribet?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Coba Siarpi 14 hari gratis. Tanpa konsultan, tanpa kontrak panjang, tanpa kartu kredit.
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
