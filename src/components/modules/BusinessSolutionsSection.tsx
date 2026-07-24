import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Check, ShieldCheck, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import imageFinanceImg from "@/assets/image-finance.png";
import financeArImg from "@/assets/finance-ar.png";
import financeApImg from "@/assets/finance-ap.png";

export function BusinessSolutionsSection() {
  const [activeTab, setActiveTab] = useState<"core" | "strategic">("core");
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const images = [
    { src: imageFinanceImg, alt: "Overview Solusi Finance — image-finance.png" },
    { src: financeArImg, alt: "Piutang Usaha (AR) — finance-ar.png" },
    { src: financeApImg, alt: "Hutang Usaha (AP) — finance-ap.png" },
  ];

  const handlePrevImg = () => {
    setCurrentImgIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImg = () => {
    setCurrentImgIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-gradient-to-b from-muted/20 via-background to-muted/20 py-16 md:py-24 border-y border-border/80 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 2-Column Layout: Left Header & Controls (Col 5), Right Image Asset Area (Col 7) */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Left-Aligned Header, Tabs & Key Insights */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 text-left space-y-5 max-w-lg"
          >
            <Badge variant="outline" className="rounded-full border-primary/30 text-primary font-semibold bg-primary/5 px-3.5 py-1">
              Solusi Terpadu Siarpi
            </Badge>

            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl leading-[1.15]">
              Solusi Terbaik Aspek <span className="text-gradient-primary">Operasional & Keuangan</span>
            </h2>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Siarpi menyediakan berbagai solusi dari hulu ke hilir—mulai dari pembukuan, akuntansi, pajak, kas/bank, hingga operasional bisnis Anda.
            </p>

            {/* Pill Tabs Switcher */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-1.5 p-1.5 bg-card/80 backdrop-blur-md rounded-2xl border border-border/80 shadow-xs">
                <button
                  onClick={() => setActiveTab("core")}
                  className={`px-5 py-2 text-xs font-bold rounded-xl transition-all duration-300 flex items-center gap-2 ${
                    activeTab === "core"
                      ? "bg-gradient-primary text-primary-foreground shadow-sm scale-[1.02]"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50 font-semibold"
                  }`}
                >
                  <Zap className="h-3.5 w-3.5" />
                  Fitur Core
                </button>
                <button
                  onClick={() => setActiveTab("strategic")}
                  className={`px-5 py-2 text-xs font-bold rounded-xl transition-all duration-300 flex items-center gap-2 ${
                    activeTab === "strategic"
                      ? "bg-gradient-primary text-primary-foreground shadow-sm scale-[1.02]"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50 font-semibold"
                  }`}
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Fitur Strategic
                </button>
              </div>
            </div>

            {/* Dynamic Content Details depending on Active Tab */}
            <AnimatePresence mode="wait">
              {activeTab === "core" ? (
                <motion.div
                  key="core-details"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3 pt-2"
                >
                  <div className="flex items-center gap-3 text-xs font-medium text-foreground/90">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600 shadow-2xs">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                    <span>Automasi posting jurnal dari transaksi Kas, Bank, & Invoice</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-medium text-foreground/90">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600 shadow-2xs">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                    <span>Rekonsiliasi kas & mutasi bank tanpa selisih & anti-error</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-medium text-foreground/90">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600 shadow-2xs">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                    <span>Tutup buku bulanan 10x lebih cepat secara otomatis</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="strategic-details"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3 pt-2"
                >
                  <div className="flex items-center gap-3 text-xs font-medium text-foreground/90">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-2xs">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                    <span>Monitoring variance Budget vs Actual real-time per akun COA</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-medium text-foreground/90">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-2xs">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                    <span>Integrasi PPN/PPh e-Faktur & Kurs BI JISDOR multi-currency</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-medium text-foreground/90">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-2xs">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                    <span>Konsolidasi multi-cabang & multi-unit bisnis terpadu</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Compact Metric Highlight Pill */}
            <div className="pt-2 flex items-center gap-4 text-xs text-muted-foreground border-t border-border/60">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600 font-extrabold font-display dark:bg-primary/20 dark:text-primary text-sm shadow-xs">
                {activeTab === "core" ? "99.9%" : "100%"}
              </div>
              <div>
                <p className="font-bold text-foreground">
                  {activeTab === "core" ? "Akurasi Pembukuan & Uptime System" : "Standar Akuntansi & Compliance"}
                </p>
                <p className="text-[11px] text-muted-foreground">Tersinkronisasi otomatis secara real-time</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean Minimal Slider Carousel (Hanya Minimal Dots) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="relative group overflow-hidden rounded-3xl border border-border/80 bg-card/80 p-2.5 shadow-2xl backdrop-blur-md transition-all duration-500 hover:shadow-primary/10">
              <div className="absolute -inset-4 bg-gradient-primary opacity-15 blur-3xl pointer-events-none" />
              
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImgIdx}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  src={images[currentImgIdx].src}
                  alt={images[currentImgIdx].alt}
                  className="w-full h-auto object-cover rounded-2xl shadow-sm transition-transform duration-500 group-hover:scale-[1.01]"
                  loading="eager"
                />
              </AnimatePresence>

              {/* Slider Arrow Navigation Controls */}
              <button
                onClick={handlePrevImg}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/85 text-foreground border border-border/80 shadow-md backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground hover:border-primary active:scale-95"
                aria-label="Foto Sebelumnya"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={handleNextImg}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/85 text-foreground border border-border/80 shadow-md backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground hover:border-primary active:scale-95"
                aria-label="Foto Berikutnya"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Minimal Dot Indicators Only */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-background/85 backdrop-blur-md border border-border/70 shadow-sm">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImgIdx(idx)}
                    className={`h-2 rounded-full transition-all ${
                      currentImgIdx === idx ? "w-6 bg-primary" : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground"
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
