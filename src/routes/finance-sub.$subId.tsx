import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft, ArrowRight, Check
} from "lucide-react";
import { getModuleIcon, financeSubModules } from "@/lib/modules";
import { financeSubModuleDetails, type FinanceSubModuleDetail } from "@/lib/finance-submodule-details";
import { ComparisonBeforeAfterSection } from "@/components/modules/ComparisonBeforeAfterSection";

export const Route = createFileRoute("/finance-sub/$subId")({
  head: ({ params }) => {
    const d = financeSubModuleDetails[params.subId];
    if (!d) {
      return { meta: [{ title: "Sub-Modul Tidak Ditemukan | Siarpi ERP" }] };
    }

    // High-converting Sub-Module Specific SEO Copywriting
    const metaTitle = `Software ${d.name} Terbaik | ${d.tagline} | Siarpi ERP`;
    const metaDesc = `Software ${d.name} Siarpi: ${d.tagline}. ${d.longDescription} ${d.keyBenefits.join(". ")}. Coba gratis 14 hari tanpa kartu kredit!`;
    const ogImage = "/dashboard-preview.jpg";

    const customKeywords = [
      `software ${d.name.toLowerCase()} indonesia`,
      `aplikasi ${d.name.toLowerCase()} bisnis`,
      `software akuntansi`,
      `software akuntansi terbaik`,
      `software keuangan`,
      `software keuangan perusahaan`,
      `aplikasi keuangan usaha`,
      `aplikasi pembukuan usaha`,
      `software pembukuan gratis`,
      `program akuntansi indonesia`,
      `sistem akuntansi perusahaan`,
      `modul ${d.id} finance erp`,
      `software akuntansi ${d.category.toLowerCase()}`,
      `sistem erp indonesia`,
      `siarpi finance ${d.id}`,
      ...d.features.map((f) => f.title.toLowerCase()),
    ].join(", ");

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": `Siarpi ERP — ${d.name}`,
      "operatingSystem": "Web, Windows, macOS, Linux, Android, iOS",
      "applicationCategory": "BusinessApplication",
      "offers": {
        "@type": "Offer",
        "price": "99000",
        "priceCurrency": "IDR",
        "availability": "https://schema.org/InStock",
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "1280",
      },
      "description": metaDesc,
    };

    return {
      meta: [
        { title: metaTitle },
        { name: "description", content: metaDesc },
        { name: "keywords", content: customKeywords },
        { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
        { property: "og:title", content: metaTitle },
        { property: "og:description", content: metaDesc },
        { property: "og:type", content: "product" },
        { property: "og:image", content: ogImage },
        { property: "og:site_name", content: "Siarpi Enterprise ERP" },
        { property: "og:locale", content: "id_ID" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: metaTitle },
        { name: "twitter:description", content: metaDesc },
        { name: "twitter:image", content: ogImage },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLd),
        },
      ],
    };
  },
  loader: async ({ params }) => {
    const detail = financeSubModuleDetails[params.subId];
    if (!detail) throw notFound();

    return {
      detail,
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="font-display text-4xl font-bold">Sub-Modul Tidak Ditemukan</h1>
        <p className="mt-3 text-muted-foreground">Sub-modul yang Anda cari belum tersedia.</p>
        <Button asChild className="mt-8 bg-gradient-primary text-primary-foreground">
          <Link to="/modules/$moduleId" params={{ moduleId: "finance" }}>Kembali ke Modul Finance</Link>
        </Button>
      </main>
      <Footer />
    </div>
  ),
  component: SubModuleDetailPage,
});

function SubModuleDetailPage() {
  const { detail: d } = Route.useLoaderData() as { detail: FinanceSubModuleDetail };
  const SubIcon = getModuleIcon(d.iconName);

  // Other related sub-modules
  const relatedSubModules = financeSubModules.filter((s) => s.id !== d.id).slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-subtle border-b border-border/80">
          <div className="absolute inset-0 bg-gradient-hero opacity-80" />
          <div className="container relative mx-auto px-4 py-12 md:px-6 md:py-20">
            
            {/* Breadcrumb Navigation */}
            <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Beranda</Link>
              <span>/</span>
              <Link to="/modules/$moduleId" params={{ moduleId: "finance" }} className="hover:text-foreground transition-colors">Modul Finance</Link>
              <span>/</span>
              <span className="text-foreground font-semibold">{d.name}</span>
            </div>

            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              
              {/* Left Column: Title, Copywriting, Key Benefits & Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-7 space-y-6"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-lg">
                    <SubIcon className="h-7 w-7" />
                  </div>
                  <Badge variant="outline" className="rounded-full px-4 py-1.5 text-xs uppercase font-bold tracking-wider border-primary/30 text-primary bg-primary/10">
                    {d.category}
                  </Badge>
                </div>

                <div>
                  <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-5xl leading-[1.15]">
                    {d.name}
                  </h1>
                  <p className="mt-3 text-lg md:text-xl font-medium text-primary">
                    {d.tagline}
                  </p>
                </div>

                <p className="text-base text-muted-foreground leading-relaxed">
                  {d.longDescription}
                </p>

                {/* Key Benefits Checklist */}
                <div className="space-y-3 pt-2">
                  {d.keyBenefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3 text-sm font-medium text-foreground">
                      <div className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600 dark:bg-primary/20 dark:text-primary shadow-2xs">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Button size="lg" asChild className="bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow font-semibold">
                    <Link to="/onboarding">Coba Sub-Modul Ini <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/modules/$moduleId" params={{ moduleId: "finance" }}>
                      <ArrowLeft className="mr-1.5 h-4 w-4" /> Kembali ke Modul Finance
                    </Link>
                  </Button>
                </div>
              </motion.div>

              {/* Right Column: Live Interactive Demo Stat Cards & Data Demonstration */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="lg:col-span-5"
              >
                <Card className="relative overflow-hidden rounded-3xl border border-border/80 bg-card p-6 md:p-8 shadow-2xl backdrop-blur-md">
                  {/* Sample Stat Badges */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {d.sampleStats.map((st) => (
                      <div key={st.label} className="rounded-2xl border border-border/60 bg-muted/40 p-3 text-center">
                        <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{st.label}</div>
                        <div className="font-display text-base font-bold text-foreground mt-1">{st.value}</div>
                        <div className="text-[10px] text-primary font-semibold mt-0.5">{st.note}</div>
                      </div>
                    ))}
                  </div>

                  {/* Sample Rows Display */}
                  <div className="space-y-2.5">
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">Ringkasan Catatan Transaksi:</div>
                    {d.sampleRows.map((row) => (
                      <div key={row.code} className="flex items-center justify-between rounded-xl border border-border/60 bg-background/80 p-3 text-xs transition-all hover:bg-muted/30">
                        <div>
                          <div className="font-bold text-foreground">{row.title}</div>
                          <div className="text-[11px] text-muted-foreground flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-primary font-medium">{row.code}</span>
                            <span>•</span>
                            <span>{row.category}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-foreground">{row.amount}</div>
                          <span className="inline-flex items-center text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-md mt-0.5">
                            {row.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

            </div>
          </div>
        </section>

        {/* COMPARISON CASE SECTION (Tanpa Siarpi vs Dengan Siarpi) */}
        <ComparisonBeforeAfterSection moduleName={d.name} customComparisons={d.comparisons} />

        {/* WORKFLOW PROCESS (4-STEP STEPS) */}
        <section className="container mx-auto px-4 py-16 md:px-6 md:py-24 border-b border-border/80">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center mb-12"
          >
            <Badge variant="outline" className="mb-3 rounded-full">Alur Kerja Sistem</Badge>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Bagaimana <span className="text-gradient-primary">{d.name}</span> Bekerja
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Proses otomatis yang terstruktur dari hulu ke hilir untuk memastikan efisiensi & akurasi 100%.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {d.workflowSteps.map((wf, idx) => (
              <motion.div
                key={wf.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <Card className="relative h-full flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-6 shadow-soft transition-all hover:border-primary/50 hover:shadow-card">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground font-display font-extrabold text-lg shadow-md mb-5">
                      {wf.step}
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground">{wf.title}</h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{wf.desc}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="bg-muted/20 py-16 md:py-24 border-b border-border/80">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-3xl text-center mb-12"
            >
              <Badge variant="outline" className="mb-3 rounded-full">Daftar Fitur Lengkap</Badge>
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Fitur Unggulan {d.name}
              </h2>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {d.features.map((feat, idx) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  <Card className="flex gap-4 rounded-2xl border border-border/80 bg-card p-6 shadow-soft transition-all hover:border-primary/40">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold">
                      <Check className="h-5 w-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-foreground">{feat.title}</h3>
                      <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{feat.desc}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="container mx-auto px-4 py-16 md:px-6 md:py-24 border-b border-border/80">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center mb-10"
          >
            <Badge variant="outline" className="mb-3 rounded-full">FAQ Sub-Modul</Badge>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Pertanyaan Seputar {d.name}
            </h2>
          </motion.div>

          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {d.faq.map((item, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`} className="border-border/80">
                  <AccordionTrigger className="font-display text-left text-base font-bold hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* RELATED SUB-MODULES */}
        <section className="bg-muted/20 py-16 md:py-20 border-b border-border/80">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground">Sub-Modul Finance Lainnya</h3>
                <p className="text-xs text-muted-foreground">Kombinasikan sub-modul ini untuk ekosistem pembukuan yang sempurna.</p>
              </div>
              <Button variant="outline" asChild size="sm">
                <Link to="/modules/$moduleId" params={{ moduleId: "finance" }}>Lihat Semua 10 Sub-Modul</Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {relatedSubModules.map((rel) => {
                const RelSubIcon = getModuleIcon(rel.iconName);
                return (
                  <Link key={rel.id} to="/finance-sub/$subId" params={{ subId: rel.id }}>
                    <Card className="flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 transition-all hover:border-primary/50 hover:shadow-card hover:-translate-y-1">
                      <div>
                        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <RelSubIcon className="h-5 w-5" />
                        </div>
                        <Badge variant="secondary" className="mb-2 text-[10px] font-bold px-2 py-0.5">
                          {rel.category}
                        </Badge>
                        <h4 className="font-display font-bold text-base text-foreground">{rel.name}</h4>
                        <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">{rel.description}</p>
                      </div>
                      <div className="mt-4 border-t border-border/60 pt-3 flex items-center justify-between text-xs font-semibold text-primary">
                        <span>Lihat Detail Sub-Modul</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="bg-gradient-primary py-16 text-primary-foreground md:py-24">
          <div className="container mx-auto px-4 text-center md:px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-3xl space-y-5"
            >
              <h2 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl">
                Siap Menggunakan {d.name}?
              </h2>
              <p className="text-base md:text-lg opacity-90 leading-relaxed">
                Uji coba gratis 14 hari tanpa kartu kredit. Terintegrasi penuh dengan seluruh modul Siarpi ERP.
              </p>
              <div className="pt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" asChild className="font-bold shadow-lg">
                  <Link to="/onboarding">Mulai Coba Gratis 14 Hari</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                  <Link to="/modules/$moduleId" params={{ moduleId: "finance" }}>Lihat Modul Finance</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
