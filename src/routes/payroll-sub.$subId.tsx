import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getPayrollSubModule, payrollSubModules, type PayrollSubModuleDetail } from "@/lib/modules/payroll";
import { getModuleIcon } from "@/lib/modules";
import { ArrowLeft, Star, Check, ShieldCheck, Zap, Layers, Sparkles, HelpCircle } from "lucide-react";
import { BusinessSolutionsSection } from "@/components/modules/BusinessSolutionsSection";
import { ComparisonBeforeAfterSection } from "@/components/modules/ComparisonBeforeAfterSection";

export const Route = createFileRoute("/payroll-sub/$subId")({
  head: ({ params }) => {
    const d = getPayrollSubModule(params.subId);
    if (!d) {
      return { meta: [{ title: "Sub-Modul Payroll Tidak Ditemukan | Siarpi ERP" }] };
    }

    const metaTitle = `Software ${d.name} Payroll Terbaik Indonesia | ${d.tagline} | Siarpi ERP`;
    const metaDesc = `Kelola ${d.name.toLowerCase()} di Siarpi ERP: ${d.tagline}. ${d.longDescription.slice(0, 150)}. Coba gratis 14 hari tanpa kartu kredit!`;
    const canonicalUrl = `https://siarpi.com/payroll-sub/${d.id}`;
    const keywords = [
      `software payroll indonesia`,
      `aplikasi ${d.name.toLowerCase()} bisnis`,
      `software penggajian karyawan`,
      `aplikasi slip gaji online`,
      `sistem pph21 dan bpjs`,
      `modul ${d.id} payroll erp`,
      `siarpi payroll ${d.id}`,
      ...(d.features ? d.features.map((f) => f.title.toLowerCase()) : []),
    ].join(", ");

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `Siarpi ERP — Sub-Modul ${d.name}`,
      operatingSystem: "Web, Windows, macOS, Android, iOS",
      applicationCategory: "BusinessApplication",
      offers: {
        "@type": "Offer",
        price: "99000",
        priceCurrency: "IDR",
        availability: "https://schema.org/InStock",
      },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "1350" },
      description: metaDesc,
    };

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Beranda",
          item: "https://siarpi.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Modul Payroll",
          item: "https://siarpi.com/payroll",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: d.name,
          item: canonicalUrl,
        },
      ],
    };

    return {
      meta: [
        { title: metaTitle },
        { name: "description", content: metaDesc },
        { name: "keywords", content: keywords },
        { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
        { property: "og:title", content: metaTitle },
        { property: "og:description", content: metaDesc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonicalUrl },
        { property: "og:image", content: "https://siarpi.com/dashboard-preview.jpg" },
        { property: "og:site_name", content: "Siarpi Enterprise ERP" },
        { property: "og:locale", content: "id_ID" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: metaTitle },
        { name: "twitter:description", content: metaDesc },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLd),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbJsonLd),
        },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
    };
  },
  loader: async ({ params }) => {
    const d = getPayrollSubModule(params.subId);
    if (!d) throw notFound();
    return { detail: d };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="font-display text-4xl font-bold">Sub-Modul Payroll Tidak Ditemukan</h1>
        <p className="mt-3 text-muted-foreground">Sub-modul yang Anda cari belum tersedia.</p>
        <Button asChild className="mt-8 bg-gradient-primary text-primary-foreground">
          <Link to="/payroll">Kembali ke Modul Payroll</Link>
        </Button>
      </main>
      <Footer />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="container mx-auto py-20 text-center">
      <p className="text-muted-foreground">Terjadi kesalahan: {error.message}</p>
    </div>
  ),
  component: PayrollSubModulePage,
});

function PayrollSubModulePage() {
  const { detail: d } = Route.useLoaderData() as { detail: PayrollSubModuleDetail };
  const SubIcon = getModuleIcon(d.iconName || "Banknote");

  const related = payrollSubModules
    .filter((mod) => mod.id !== d.id)
    .slice(0, 4)
    .map((mod) => ({
      id: mod.id,
      name: mod.name,
      desc: mod.tagline,
      to: "/payroll-sub/$subId",
      params: { subId: mod.id },
    }));

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* HERO SECTION 2 COLUMNS */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background border-b border-border">
          <div className="absolute inset-0 bg-gradient-hero opacity-60" />
          <div className="container relative mx-auto px-4 py-16 md:px-6 md:py-20">
            <Link
              to="/payroll"
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Modul Utama Payroll
            </Link>

            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              {/* LEFT COLUMN: HERO HEADINGS & QUICK SUMMARY */}
              <div>
                <Badge variant="outline" className="mb-4 rounded-full border-primary/30 bg-primary/10 px-4 py-1 text-primary font-semibold">
                  {d.category || "Payroll Management"}
                </Badge>
                <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-foreground">
                  {d.name}
                </h1>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  {d.tagline}
                </p>

                {/* HIGHLIGHT BADGES */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 rounded-xl bg-card border border-border/80 px-3.5 py-2 text-xs font-semibold shadow-2xs">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    <span>Terintegrasi Bank & PPh21</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-card border border-border/80 px-3.5 py-2 text-xs font-semibold shadow-2xs">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <span>Kalkulasi Otomatis 1-Klik</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-card border border-border/80 px-3.5 py-2 text-xs font-semibold shadow-2xs">
                    <Layers className="h-4 w-4 text-sky-500" />
                    <span>Multi-Rekening Bank</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                  <Button size="lg" asChild className="w-full sm:w-auto bg-gradient-primary text-primary-foreground font-semibold shadow-lg">
                    <Link to="/onboarding">Coba Sub-Modul Ini Free</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                    <Link to="/komparasi">Pelajari Fitur Payroll</Link>
                  </Button>
                </div>
              </div>

              {/* RIGHT COLUMN: INTERACTIVE PREVIEW CARD */}
              <div className="relative flex justify-center lg:justify-end">
                <Card className="w-full max-w-lg rounded-3xl border border-border/80 bg-card p-6 md:p-8 shadow-xl backdrop-blur-md">
                  <div className="flex items-center justify-between border-b border-border/60 pb-5">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-md">
                        <SubIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold">{d.name}</h3>
                        <p className="text-xs text-muted-foreground">Siap Digunakan • Sub-Modul Payroll</p>
                      </div>
                    </div>
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 px-3 py-1 font-bold text-xs">
                      Active
                    </Badge>
                  </div>

                  {/* LONG DESCRIPTION SUMMARY INSIDE CARD */}
                  <div className="mt-5 space-y-4">
                    <div className="rounded-2xl bg-muted/40 p-4 border border-border/50">
                      <p className="text-[11px] font-bold text-primary uppercase tracking-wider">
                        Ikhtisar Operasional & Manfaat
                      </p>
                      <p className="mt-2 text-xs md:text-sm text-foreground/90 leading-relaxed">
                        {d.longDescription}
                      </p>
                    </div>

                    {/* SAMPLE STATS PREVIEW */}
                    <div className="grid grid-cols-2 gap-3">
                      {(d.sampleStats ?? []).slice(0, 2).map((st) => (
                        <div key={st.label} className="rounded-xl border border-border/60 bg-background p-3">
                          <p className="text-[11px] text-muted-foreground font-medium">{st.label}</p>
                          <p className="text-base font-bold text-foreground mt-0.5">{st.value}</p>
                          <p className="text-[10px] text-emerald-600 font-semibold">{st.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* KEY BENEFITS CARDS */}
        <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <Badge variant="outline" className="mb-4 rounded-full border-primary/30 bg-primary/5 px-4 py-1 text-primary font-semibold">
              Keunggulan Utama
            </Badge>
            <h2 className="font-display text-3xl font-bold md:text-5xl">
              Kenapa Pilih Siarpi ERP untuk {d.name}?
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Manfaat utama yang langsung dirasakan oleh tim penggajian, HR, dan manajemen perusahaan.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {(d?.keyBenefits ?? []).map((b, i) => (
              <Card key={i} className="flex h-full flex-col items-center justify-center rounded-3xl border border-border/80 bg-card p-8 shadow-soft text-center hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-md">
                  <Check className="h-7 w-7 stroke-[3]" />
                </div>
                <p className="font-display text-base font-semibold text-foreground leading-relaxed">{b}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="bg-muted/30 py-16 md:py-24 border-y border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <Badge variant="outline" className="mb-4 rounded-full border-primary/30 bg-primary/5 px-4 py-1 text-primary font-semibold">
                Fitur Unggulan
              </Badge>
              <h2 className="font-display text-3xl font-bold md:text-5xl">
                Fitur Kunci {d.name}
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {(d?.features ?? []).map((f) => (
                <Card key={f.title} className="h-full rounded-2xl border border-border/80 bg-card p-6 md:p-8 shadow-soft">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground">{f.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* WORKFLOW STEPS */}
        <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <Badge variant="outline" className="mb-4 rounded-full border-primary/30 bg-primary/5 px-4 py-1 text-primary font-semibold">
              Alur Kerja
            </Badge>
            <h2 className="font-display text-3xl font-bold md:text-5xl">Tahapan Proses {d.name}</h2>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {(d?.workflowSteps ?? []).map((step) => (
              <div key={step.step} className="flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-soft">
                <div>
                  <div className="mb-3 font-display text-2xl font-bold text-primary">
                    {step.step}
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STATS & SAMPLE DATA */}
        <section className="bg-muted/30 py-16 md:py-24 border-y border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* STATS */}
              <div>
                <h3 className="font-display text-2xl font-bold mb-6 text-foreground">Metrik & Statistik {d.name}</h3>
                <div className="grid gap-4">
                  {(d?.sampleStats ?? []).map((s) => (
                    <div key={s.label} className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
                      <div className="font-display text-xs font-semibold text-muted-foreground uppercase">{s.label}</div>
                      <div className="text-2xl font-bold text-foreground mt-1">{s.value}</div>
                      <div className="text-xs text-emerald-600 font-medium mt-1">{s.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SAMPLE ROWS */}
              <div>
                <h3 className="font-display text-2xl font-bold mb-6 text-foreground">Contoh Data & Status Real-Time</h3>
                <div className="space-y-3">
                  {(d?.sampleRows ?? []).map((r) => (
                    <Card key={r.code} className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-display font-bold text-foreground text-sm">{r.title}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{r.category} • {r.code}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-display font-bold text-foreground text-sm">{r.amount}</div>
                          <Badge variant="secondary" className="text-[10px] uppercase font-bold mt-1 bg-emerald-500/10 text-emerald-600">
                            {r.status}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <Badge variant="outline" className="mb-4 rounded-full border-primary/30 bg-primary/5 px-4 py-1 text-primary font-semibold">
              FAQ
            </Badge>
            <h2 className="font-display text-3xl font-bold md:text-5xl">
              Pertanyaan Umum {d.name}
            </h2>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            {(d?.faq ?? []).map((f, i) => (
              <details key={i} className="group rounded-2xl border border-border/80 bg-card p-6 shadow-2xs transition-all">
                <summary className="cursor-pointer font-display text-base font-bold text-foreground flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    {f.q}
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed pl-7">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* BUSINESS SOLUTIONS & COMPARISON */}
        <BusinessSolutionsSection />
        <ComparisonBeforeAfterSection moduleName={d.name} />

        {/* RELATED SECTION */}
        <section className="border-t border-border bg-muted/20 py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <h3 className="font-display text-2xl font-bold mb-8 text-foreground">Sub-Modul Payroll Lainnya</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((rm) => (
                <Link key={rm.id} to={rm.to} params={rm.params}>
                  <Card className="h-full flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 transition-all hover:border-primary/50 hover:shadow-card">
                    <div>
                      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Star className="h-5 w-5" />
                      </div>
                      <h4 className="font-display font-bold text-foreground text-sm">{rm.name}</h4>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{rm.desc}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BOTTOM */}
        <section className="bg-gradient-primary py-20 text-primary-foreground md:py-28">
          <div className="container mx-auto px-4 text-center md:px-6">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-3xl font-bold md:text-5xl">
                Mulai otomatisasi {d.name} hari ini
              </h2>
              <p className="mt-4 text-base opacity-90 md:text-lg">
                Uji coba gratis 14 hari tanpa kartu kredit. Batalkan kapan saja.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" asChild className="font-semibold shadow-lg">
                  <Link to="/onboarding">Daftar Coba Gratis</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Link to="/komparasi">Bandingkan Paket</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
