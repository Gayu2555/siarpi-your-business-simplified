import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { modules, formatIDR, getModuleIcon } from "@/lib/modules";
import { moduleDetails, type Feature, type Testimonial, type ScreenshotBlock } from "@/lib/module-details";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, ArrowLeft, Check, Star, Quote } from "lucide-react";

export const Route = createFileRoute("/modules/$moduleId")({
  head: ({ params }) => {
    const m = modules.find((x) => x.id === params.moduleId);
    const d = moduleDetails[params.moduleId];
    if (!m || !d) {
      return { meta: [{ title: "Modul tidak ditemukan — Siarpi" }] };
    }
    return {
      meta: [
        { title: `${m.name} — Siarpi` },
        { name: "description", content: d.tagline },
        { property: "og:title", content: `${m.name} — ${d.tagline}` },
        { property: "og:description", content: d.longDescription },
      ],
    };
  },
  loader: ({ params }) => {
    const m = modules.find((x) => x.id === params.moduleId);
    const d = moduleDetails[params.moduleId];
    if (!m || !d) throw notFound();

    // PENTING: loader hanya boleh return plain data yang bisa di-serialize
    // (Seroval/TanStack Start SSR dehydration). `m` dari lib/modules berisi
    // field `iconName` (string) — itu aman. Jangan PERNAH return komponen
    // React (function/forward_ref) dari loader, termasuk tidak sengaja lewat
    // spread/destructure objek yang masih punya field komponen di dalamnya.
    return {
      module: {
        id: m.id,
        name: m.name,
        iconName: m.iconName,
        description: m.description,
        price: m.price,
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
  const { module: m, detail: d } = Route.useLoaderData();
  // Resolve iconName (string) -> komponen Lucide HANYA di sini (client render),
  // tidak pernah di loader.
  const Icon = getModuleIcon(m.iconName);

  // Recommend other modules (first 4 excluding current) — pakai `modules`
  // module-level (bukan loader data), jadi aman tetap akses .icon di sini
  // karena ini render langsung, tidak ikut proses dehydration loader.
  const related = modules.filter((x) => x.id !== m.id).slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* HERO */}
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-elegant">
                  <Icon className="h-7 w-7" />
                </div>
                <Badge variant="outline" className="mb-3 rounded-full">Modul {m.name}</Badge>
                <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                  {d.tagline}
                </h1>
                <p className="mt-5 text-base text-muted-foreground md:text-lg">
                  {d.longDescription}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <div>
                    <div className="font-display text-3xl font-bold">{formatIDR(m.price)}</div>
                    <div className="text-xs text-muted-foreground">per bulan</div>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      size="lg"
                      asChild
                      className="bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow"
                    >
                      <Link to="/onboarding">
                        Coba Gratis <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link to="/modular">Tambah ke Paket</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Mockup screenshot */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl" />
                <Card className="relative overflow-hidden rounded-2xl border-border bg-card p-0 shadow-elegant">
                  {/* Window chrome */}
                  <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
                    <span className="ml-3 text-xs text-muted-foreground">siarpi.app/{m.id}</span>
                  </div>

                  <div className="space-y-5 p-6">
                    <div>
                      <div className="font-display text-lg font-semibold">{d.mockup.title}</div>
                      <div className="text-xs text-muted-foreground">{d.mockup.subtitle}</div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {d.mockup.stats.map((s: ScreenshotBlock) => (
                        <div
                          key={s.label}
                          className={`rounded-xl p-3 ${
                            s.tone === "primary"
                              ? "bg-gradient-primary text-primary-foreground"
                              : s.tone === "accent"
                                ? "bg-accent text-accent-foreground"
                                : "bg-muted text-foreground"
                          }`}
                        >
                          <div className="text-[10px] opacity-80">{s.label}</div>
                          <div className="font-display text-lg font-bold">{s.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      {d.mockup.rows.map((r: { label: string; sub: string; value: string }) => (
                        <div
                          key={r.label}
                          className="flex items-center justify-between rounded-lg border border-border bg-background/50 px-3 py-2.5"
                        >
                          <div>
                            <div className="text-sm font-medium">{r.label}</div>
                            <div className="text-xs text-muted-foreground">{r.sub}</div>
                          </div>
                          <div className="text-sm font-semibold">{r.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="container mx-auto px-4 py-20 md:px-6 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4 rounded-full">Fitur Utama</Badge>
            <h2 className="font-display text-3xl font-bold md:text-5xl">
              Semua yang Anda butuhkan dari <span className="text-gradient-primary">{m.name}</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {d.features.map((f: Feature, i: number) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Card className="flex h-full gap-4 rounded-2xl border-border p-6 transition-shadow hover:shadow-card">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="bg-muted/30 py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4 rounded-full">Testimoni</Badge>
              <h2 className="font-display text-3xl font-bold md:text-5xl">
                Dipercaya oleh bisnis Indonesia
              </h2>
            </div>

            <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
              {d.testimonials.map((t: Testimonial, i: number) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
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
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-primary font-display font-bold text-primary-foreground">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{t.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {t.role} · {t.company}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 py-20 md:px-6 md:py-28">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <Badge variant="outline" className="mb-4 rounded-full">FAQ</Badge>
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Pertanyaan seputar {m.name}
              </h2>
            </div>
            <Accordion type="single" collapsible className="mt-10">
              {d.faq.map((item: { q: string; a: string }, i: number) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-medium">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* RELATED MODULES */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-2xl font-bold md:text-3xl">Modul lainnya</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Lengkapi {m.name} dengan modul pendukung
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
              {related.map((r) => {
                const RIcon = getModuleIcon(r.iconName);
                return (
                  <Link key={r.id} to="/modules/$moduleId" params={{ moduleId: r.id }}>
                    <Card className="group flex h-full flex-col items-center gap-3 rounded-2xl border-border p-5 text-center transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-transform group-hover:scale-110">
                        <RIcon className="h-5 w-5" />
                      </div>
                      <div className="text-sm font-semibold">{r.name}</div>
                      <div className="text-xs text-muted-foreground">{formatIDR(r.price)}/bln</div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-20 md:px-6">
          <Card className="overflow-hidden rounded-3xl border-0 bg-gradient-primary p-10 text-center shadow-elegant md:p-14">
            <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
              Siap mencoba {m.name}?
            </h2>
            <p className="mt-3 text-primary-foreground/80">
              Mulai gratis hari ini, tanpa kartu kredit.
            </p>
            <Button size="lg" asChild className="mt-7 bg-background text-foreground hover:bg-background/90">
              <Link to="/onboarding">
                Mulai Sekarang <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}