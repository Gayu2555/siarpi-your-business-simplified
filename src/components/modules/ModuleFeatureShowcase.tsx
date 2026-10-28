import { useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getModuleIcon } from "@/lib/modules";
import type { Feature } from "@/lib/module-details";

interface ModuleFeatureShowcaseProps {
  moduleName: string;
  features: Feature[];
}

/**
 * Tampilan "kartu besar" untuk area fitur halaman modul — gaya yang sama dengan
 * showcase sub-modul HR/Payroll/Finance (ikon + badge kategori + deskripsi +
 * checklist), tapi tanpa tautan ke halaman sub-modul karena fitur di sini tidak
 * punya halaman sendiri. Jadi CTA-nya jujur: "Coba Gratis" ke /onboarding,
 * bukan "Pelajari Detail" ke rute yang tidak ada.
 *
 * Dipakai hanya kalau datanya memang lengkap (setiap fitur punya `bullets`);
 * modul lain tetap memakai grid biasa di ModuleFeaturesSection.
 */
export function ModuleFeatureShowcase({ moduleName, features }: ModuleFeatureShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const carouselRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    features.forEach((f) => {
      if (f.category) set.add(f.category);
    });
    return ["Semua", ...Array.from(set)];
  }, [features]);

  const filtered = useMemo(
    () => (activeCategory === "Semua" ? features : features.filter((f) => f.category === activeCategory)),
    [activeCategory, features],
  );

  const pickCategory = (cat: string) => {
    setActiveCategory(cat);
    if (carouselRef.current) carouselRef.current.scrollLeft = 0;
  };

  const scrollCarousel = (direction: "left" | "right") => {
    const container = carouselRef.current;
    if (!container) return;
    const amount = container.clientWidth * 0.85;
    container.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="container mx-auto px-4 py-20 md:px-6 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <Badge variant="outline" className="mb-4 rounded-full">
          Fitur Utama
        </Badge>
        <h2 className="font-display text-3xl font-bold md:text-5xl">
          Semua yang Anda butuhkan dari{" "}
          <span className="text-gradient-primary">{moduleName}</span>
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
          Setiap fitur bekerja di atas data yang sama — resep, stok, jam kerja, dan pembukuan
          saling terhubung, jadi tidak ada angka yang diketik dua kali.
        </p>

        {categories.length > 2 && (
          <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => pickCategory(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeCategory === cat
                    ? "bg-gradient-primary text-primary-foreground shadow-md scale-105"
                    : "bg-card text-muted-foreground border border-border/80 hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </motion.div>

      <div className="mt-12 flex items-center justify-between px-2">
        <div className="text-xs font-semibold text-muted-foreground">
          Menampilkan{" "}
          <span className="text-foreground font-bold">{filtered.length}</span> Fitur{" "}
          {activeCategory !== "Semua" ? `kategori "${activeCategory}"` : moduleName}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollCarousel("left")}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card shadow-xs transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary active:scale-95"
            aria-label="Fitur sebelumnya"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollCarousel("right")}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card shadow-xs transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary active:scale-95"
            aria-label="Fitur berikutnya"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="mt-6 flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-8 pt-3"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {filtered.map((f, i) => {
          const Icon = getModuleIcon(f.iconName || "Factory");
          const bullets = (f.bullets ?? []).slice(0, 3);

          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="snap-start shrink-0 w-[88vw] sm:w-[420px] lg:w-[460px]"
            >
              <Card className="flex h-full flex-col justify-between rounded-3xl border border-border/80 bg-card/95 p-8 md:p-9 shadow-soft backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:-translate-y-1.5">
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-md">
                      <Icon className="h-7 w-7" />
                    </div>
                    {f.category && (
                      <Badge
                        variant="secondary"
                        className="px-3 py-1 text-xs uppercase font-bold tracking-wider rounded-lg bg-primary/10 text-primary"
                      >
                        {f.category}
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-display text-2xl font-bold tracking-tight text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>

                  {bullets.length > 0 && (
                    <div className="mt-6 space-y-3 border-t border-border/60 pt-5">
                      {bullets.map((b) => (
                        <div key={b} className="flex items-start gap-3 text-xs font-medium text-foreground/90">
                          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600 shadow-2xs">
                            <Check className="h-3.5 w-3.5 stroke-[3]" />
                          </div>
                          <span className="leading-snug">{b}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-border/40 pt-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary opacity-90">
                    Bagian dari {moduleName} <Check className="h-3.5 w-3.5" />
                  </span>
                  <Link
                    to="/onboarding"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Coba Gratis <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
