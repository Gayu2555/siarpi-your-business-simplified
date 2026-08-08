import { useState, useRef, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Check, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { financeSubModules, getModuleIcon } from "@/lib/modules";

export function FinanceSubModulesCarousel() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredSubModules = useMemo(() => {
    if (activeCategory === "Semua") return financeSubModules;
    return financeSubModules.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const scrollCarousel = (direction: "left" | "right") => {
    const container = carouselRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.85;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative bg-gradient-to-b from-background via-muted/30 to-background py-20 md:py-32 border-y border-border overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <Badge
            variant="outline"
            className="mb-4 rounded-full border-primary/30 bg-primary/5 px-4 py-1 text-primary font-semibold"
          >
            Ekosistem Akuntansi Terpadu
          </Badge>
          <h2 className="font-display text-3xl font-bold md:text-5xl lg:text-6xl tracking-tight">
            10 Sub-Modul Mandiri dalam{" "}
            <span className="text-gradient-primary">Satu Platform Finance</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            Setiap sub-modul dirancang khusus untuk menangani spesialisasi keuangan perusahaan Anda
            secara otomatis, efisien, dan tanpa ribet.
          </p>

          {/* Category Tabs Filter */}
          <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
            {[
              "Semua",
              "Akuntansi Utama",
              "Operasional Transaksi",
              "Pajak & Valuta",
              "Laporan & Planning",
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  if (carouselRef.current) carouselRef.current.scrollLeft = 0;
                }}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeCategory === cat
                    ? "bg-gradient-primary text-primary-foreground shadow-md scale-105"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border/80 hover:bg-muted/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Carousel Navigation Bar */}
        <div className="mt-12 flex items-center justify-between px-2">
          <div className="text-xs font-semibold text-muted-foreground">
            Menampilkan{" "}
            <span className="text-foreground font-bold">{filteredSubModules.length}</span> Sub-Modul{" "}
            {activeCategory !== "Semua" ? `kategori "${activeCategory}"` : ""}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCarousel("left")}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card shadow-xs transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary active:scale-95"
              aria-label="Sebelumnya"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card shadow-xs transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary active:scale-95"
              aria-label="Berikutnya"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Corporate Carousel Track */}
        <div
          ref={carouselRef}
          className="mt-6 flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-8 pt-3"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredSubModules.map((sub, i) => {
            const SubIcon = getModuleIcon(sub.iconName);
            return (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="snap-start shrink-0 w-[88vw] sm:w-[420px] lg:w-[460px]"
              >
                <Link to="/finance-sub/$subId" params={{ subId: sub.id }} className="group">
                  <Card className="relative flex h-full flex-col justify-between rounded-3xl border border-border/80 bg-card/95 p-8 md:p-9 shadow-soft backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:-translate-y-1.5">
                    <div>
                      {/* Top Header Badge & Large Icon */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-md transition-transform duration-300 group-hover:scale-110">
                          <SubIcon className="h-7 w-7" />
                        </div>
                        <Badge
                          variant="secondary"
                          className="px-3 py-1 text-xs uppercase font-bold tracking-wider rounded-lg bg-primary/10 text-primary"
                        >
                          {sub.category}
                        </Badge>
                      </div>

                      {/* Sub Module Title & Sales Description */}
                      <h3 className="font-display text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {sub.name}
                      </h3>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                        {sub.description}
                      </p>

                      {/* Sub Features Checklist */}
                      <div className="mt-6 space-y-3 border-t border-border/60 pt-5">
                        {sub.subFeatures.map((sf) => (
                          <div
                            key={sf}
                            className="flex items-center gap-3 text-xs font-medium text-foreground/90"
                          >
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600 shadow-2xs">
                              <Check className="h-3.5 w-3.5 stroke-[3]" />
                            </div>
                            <span>{sf}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Corporate Status */}
                    <div className="mt-8 border-t border-border/40 pt-4 flex items-center justify-between">
                      <span className="text-xs font-bold text-primary flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                        Terintegrasi Penuh <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground flex items-center gap-1 transition-colors">
                        Selengkapnya{" "}
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
