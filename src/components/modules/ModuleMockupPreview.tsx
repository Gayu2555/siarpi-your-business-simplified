import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ScreenshotBlock } from "@/lib/module-details";

interface ModuleMockupPreviewProps {
  moduleName: string;
  moduleId: string;
  mockup: {
    title: string;
    subtitle: string;
    image?: string;
    images?: string[];
    stats: ScreenshotBlock[];
    rows: { label: string; sub: string; value: string }[];
  };
}

export function ModuleMockupPreview({ moduleName, moduleId, mockup }: ModuleMockupPreviewProps) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const images = mockup.images || [];

  const handlePrev = () => {
    setActiveImgIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveImgIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="relative"
    >
      <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl" />

      {images.length > 0 ? (
        <div className="relative group overflow-hidden rounded-2xl border border-border/80 bg-card/70 p-2 shadow-2xl backdrop-blur-md transition-all duration-300 hover:shadow-primary/10">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImgIdx}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              src={images[activeImgIdx]}
              alt={`Preview Modul ${moduleName} — Siarpi`}
              className="w-full h-auto object-cover rounded-xl shadow-xs"
              loading="eager"
            />
          </AnimatePresence>

          {/* Slider Carousel Navigation Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-background/85 text-foreground border border-border/80 shadow-md backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground hover:border-primary active:scale-95"
                aria-label="Foto Sebelumnya"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-background/85 text-foreground border border-border/80 shadow-md backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground hover:border-primary active:scale-95"
                aria-label="Foto Berikutnya"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Minimal Dot Indicators Only */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/85 backdrop-blur-md border border-border/70 shadow-sm">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIdx(idx)}
                    className={`h-2 rounded-full transition-all ${
                      activeImgIdx === idx
                        ? "w-6 bg-primary"
                        : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground"
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      ) : mockup.image ? (
        <div className="relative group overflow-hidden rounded-2xl border border-border/80 bg-card/70 p-2 shadow-2xl backdrop-blur-md">
          <img
            src={mockup.image}
            alt={`Preview Modul ${moduleName} — Siarpi`}
            className="w-full h-auto object-cover rounded-xl"
            loading="eager"
          />
        </div>
      ) : (
        <Card className="relative overflow-hidden rounded-2xl border-border bg-card p-0 shadow-elegant">
          <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
            <span className="ml-3 text-xs text-muted-foreground">siarpi.app/{moduleId}</span>
          </div>

          <div className="space-y-5 p-6">
            <div>
              <div className="font-display text-lg font-semibold">{mockup.title}</div>
              <div className="text-xs text-muted-foreground">{mockup.subtitle}</div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {mockup.stats.map((s: ScreenshotBlock) => (
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
              {mockup.rows.map((r: { label: string; sub: string; value: string }) => (
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
      )}
    </motion.div>
  );
}
