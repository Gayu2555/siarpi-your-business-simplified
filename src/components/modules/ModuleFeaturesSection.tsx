import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import type { Feature } from "@/lib/module-details";

interface ModuleFeaturesSectionProps {
  moduleName: string;
  features: Feature[];
}

export function ModuleFeaturesSection({ moduleName, features }: ModuleFeaturesSectionProps) {
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
          Semua yang Anda butuhkan dari <span className="text-gradient-primary">{moduleName}</span>
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
          Dari pekerjaan harian hingga kontrol dan pelaporan, setiap fitur tersusun dalam satu alur
          yang saling terhubung.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(features ?? []).map((f: Feature, i: number) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Card className="flex h-full gap-4 rounded-lg border-border p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-card">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
