import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ConsultationCtaSection } from "@/components/site/ConsultationCtaSection";
import { modules, getModuleIcon } from "@/lib/modules";
import { formatIDR } from "@/lib/utils";
import { fetchCatalogModules, type ApiModule } from "@/lib/modules-api";
import { resolvePhosphorIcon } from "@/lib/icon-resolver";
import { moduleDetails, type ModuleDetail, type Testimonial } from "@/lib/module-details";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, ArrowLeft, Star, Quote } from "lucide-react";

// Modular Component Imports
import { ModuleHeroSection } from "@/components/modules/ModuleHeroSection";
import { ModuleMockupPreview } from "@/components/modules/ModuleMockupPreview";
import { FinanceSubModulesCarousel } from "@/components/modules/FinanceSubModulesCarousel";
import { ModuleSubModulesSection } from "@/components/modules/ModuleSubModulesSection";
import { ModuleFeaturesSection } from "@/components/modules/ModuleFeaturesSection";
import { BusinessSolutionsSection } from "@/components/modules/BusinessSolutionsSection";
import { ComparisonBeforeAfterSection } from "@/components/modules/ComparisonBeforeAfterSection";

export const Route = createFileRoute("/modules/$moduleId")({
  head: ({ params }) => {
    const m = modules.find((x) => x.id === params.moduleId);
    const d = moduleDetails[params.moduleId];
    if (!m || !d) {
      return { meta: [{ title: "Modul Tidak Ditemukan | Siarpi ERP" }] };
    }

    // High-converting Sales Copywriting & Targeted SEO Keywords
    const metaTitle = `Software ${m.name} Terbaik Indonesia | ${d.tagline} | Siarpi ERP`;
    const metaDesc = `Software ${m.name} Siarpi: ${d.tagline}. Otomatiskan pembukuan, laporan Laba/Rugi, arus kas real-time, piutang AR, hutang AP, pajak e-Faktur, & rekonsiliasi bank. Coba gratis 14 hari tanpa kartu kredit!`;
    const ogImage = d.mockup?.images?.[0] || d.mockup?.image || "/dashboard-preview.jpg";
    const keywords = [
      `software ${m.name.toLowerCase()} indonesia`,
      `aplikasi ${m.name.toLowerCase()} bisnis`,
      `software akuntansi`,
      `software akuntansi terbaik`,
      `software keuangan`,
      `software keuangan perusahaan`,
      `aplikasi keuangan usaha`,
      `aplikasi pembukuan usaha`,
      `software pembukuan gratis`,
      `program akuntansi indonesia`,
      `sistem akuntansi perusahaan`,
      `software neraca dan laba rugi`,
      `software kas dan bank`,
      `sistem erp indonesia`,
      `modul finance erp`,
      `laporan keuangan otomatis`,
      `rekonsiliasi bank otomatis`,
      `software piutang ar`,
      `software hutang ap`,
      `efaktur pajak otomatis`,
      `siarpi erp indonesia`,
    ].join(", ");

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `Siarpi ERP — Modul ${m.name}`,
      operatingSystem: "Web, Windows, macOS, Linux, Android, iOS",
      applicationCategory: "BusinessApplication",
      offers: {
        "@type": "Offer",
        price: String(m.price),
        priceCurrency: "IDR",
        availability: "https://schema.org/InStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "1280",
      },
      description: metaDesc,
    };

    return {
      meta: [
        { title: metaTitle },
        { name: "description", content: metaDesc },
        { name: "keywords", content: keywords },
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
    let apiMod: ApiModule | undefined;
    try {
      const catalog = await fetchCatalogModules();
      apiMod = catalog.find(
        (x) => x.key === params.moduleId || x.key === params.moduleId.toLowerCase(),
      );
    } catch {
      // Fallback silently if API is offline
    }

    const m = modules.find((x) => x.id === params.moduleId);
    const d = moduleDetails[params.moduleId];
    if (!m || !d) throw notFound();

    return {
      module: {
        id: m.id,
        name: apiMod?.name ?? apiMod?.label ?? m.name,
        iconName: apiMod?.icon ?? m.iconName,
        description: apiMod?.description ?? m.description,
        price: apiMod?.price ?? m.price,
      },
      detail: d,
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="font-display text-4xl font-bold">Modul tidak ditemukan</h1>
        <p className="mt-3 text-muted-foreground">Modul yang Anda cari belum tersedia.</p>
        <Button asChild className="mt-8 bg-gradient-primary text-primary-foreground">
          <Link to="/">Kembali ke beranda</Link>
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
  component: ModulePage,
});

function ModulePage() {
  const { module: m, detail: d } = Route.useLoaderData() as unknown as {
    module: {
      id: string;
      name: string;
      iconName: string;
      description: string;
      price: number;
    };
    detail: ModuleDetail;
  };

  const renderIcon = (iconName: string, className = "h-7 w-7") => {
    if (iconName && iconName.startsWith("i-ph-")) {
      const { Icon, weight } = resolvePhosphorIcon(iconName);
      return <Icon className={className} weight={weight} />;
    }
    const IconComp = getModuleIcon(iconName);
    return <IconComp className={className} />;
  };

  const related = modules.filter((x) => x.id !== m.id).slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-subtle">
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="container relative mx-auto px-4 py-16 md:px-6 md:py-24">
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Semua modul
            </Link>

            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <ModuleHeroSection module={m} detail={d} renderIcon={renderIcon} />
              <ModuleMockupPreview moduleName={m.name} moduleId={m.id} mockup={d.mockup} />
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <ModuleFeaturesSection moduleName={m.name} features={d.features} />

        {/* BUSINESS SOLUTIONS SECTION (Corporate Solusi Aspek Operasional & Keuangan) */}
        <BusinessSolutionsSection />

        {/* COMPARISON BEFORE & AFTER SECTION (Tanpa Siarpi vs Pakai Siarpi) */}
        <ComparisonBeforeAfterSection moduleName={m.name} />

        {/* SUB-MODULES SHOWCASE FOR HR, PAYROLL, FINANCE */}
        <ModuleSubModulesSection moduleId={m.id} moduleName={m.name} />

        {/* TESTIMONIALS SECTION */}
        <section className="bg-muted/30 py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-2xl text-center"
            >
              <Badge variant="outline" className="mb-4 rounded-full">
                Testimoni
              </Badge>
              <h2 className="font-display text-3xl font-bold md:text-5xl">
                Dipercaya oleh bisnis Indonesia
              </h2>
            </motion.div>

            <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
              {(d?.testimonials ?? []).map((t: Testimonial, i: number) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Card className="relative h-full rounded-2xl border-border p-8 shadow-soft">
                    <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/20" />
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, idx) => (
                        <Star key={idx} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="mt-4 text-base italic text-foreground/90">"{t.quote}"</p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary font-display font-bold text-primary-foreground">
                        {t.name[0]}
                      </div>
                      <div>
                        <div className="font-display text-sm font-semibold">{t.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {t.role} • {t.company}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="container mx-auto px-4 py-20 md:px-6 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <Badge variant="outline" className="mb-4 rounded-full">
              FAQ
            </Badge>
            <h2 className="font-display text-3xl font-bold md:text-5xl">
              Pertanyaan yang sering diajukan
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-12 max-w-3xl"
          >
            <Accordion type="single" collapsible className="w-full">
              {(d?.faq ?? []).map((f: { q: string; a: string }, i: number) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border">
                  <AccordionTrigger className="font-display text-left text-base font-semibold hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </section>

        {/* RELATED MODULES SECTION */}
        <section className="border-t border-border bg-muted/20 py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h3 className="font-display text-2xl font-bold">Modul lainnya untuk bisnis Anda</h3>
                <p className="text-sm text-muted-foreground">
                  Kombinasikan dengan modul ini untuk sistem yang utuh.
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/">Lihat Semua Modul</Link>
              </Button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((rm) => {
                const RelIcon = getModuleIcon(rm.iconName);
                return (
                  <Link key={rm.id} to="/modules/$moduleId" params={{ moduleId: rm.id }}>
                    <Card className="flex h-full flex-col justify-between rounded-xl border-border p-5 transition-all hover:border-primary/50 hover:shadow-card">
                      <div>
                        <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                          <RelIcon className="h-5 w-5" />
                        </div>
                        <h4 className="font-display font-semibold">{rm.name}</h4>
                        <p className="mt-1 text-xs text-muted-foreground">{rm.description}</p>
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                        <span className="font-display text-xs font-bold">
                          {formatIDR(rm.price)}
                        </span>
                        <span className="inline-flex items-center text-xs font-medium text-primary">
                          Detail <ArrowRight className="ml-1 h-3 w-3" />
                        </span>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* DISKUSIKAN DENGAN TIM SIARPI */}
        <ConsultationCtaSection context={m.name} />

        {/* CTA BOTTOM SECTION */}
        <section className="bg-gradient-primary py-20 text-primary-foreground md:py-28">
          <div className="container mx-auto px-4 text-center md:px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-3xl"
            >
              <h2 className="font-display text-3xl font-bold md:text-5xl">
                Mulai kelola {m.name} secara modern hari ini
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
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
