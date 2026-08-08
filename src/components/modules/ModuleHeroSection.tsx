import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check } from "lucide-react";
import { formatIDR } from "@/lib/utils";

interface ModuleHeroSectionProps {
  module: {
    id: string;
    name: string;
    iconName: string;
    description: string;
    price: number;
  };
  detail: {
    tagline: string;
    longDescription: string;
    keyBenefits?: string[];
  };
  renderIcon: (iconName: string, className?: string) => React.ReactNode;
}

export function ModuleHeroSection({ module: m, detail: d, renderIcon }: ModuleHeroSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Side-by-Side Flex for Icon Box & Modul Badge */}
      <div className="mb-6 flex items-center gap-3.5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-md">
          {renderIcon(m.iconName, "h-6 w-6")}
        </div>
        <Badge
          variant="outline"
          className="rounded-full px-3.5 py-1 text-xs font-semibold border-primary/30 text-primary bg-primary/5"
        >
          Modul {m.name}
        </Badge>
      </div>

      <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
        {d.tagline}
      </h1>
      <p className="mt-5 text-base text-muted-foreground md:text-lg">{d.longDescription}</p>

      {/* Point-Point Selling Checklist (Maksimal 3 Poin) */}
      {d.keyBenefits && d.keyBenefits.length > 0 && (
        <div className="mt-6 space-y-3.5">
          {d.keyBenefits.slice(0, 3).map((benefit: string) => (
            <div key={benefit} className="flex items-center gap-3">
              <div className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full border border-sky-400 bg-sky-50 text-sky-500 shadow-2xs">
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              </div>
              <span className="text-sm font-medium text-foreground/90 leading-snug">{benefit}</span>
            </div>
          ))}
        </div>
      )}

      {/* Pricing & Call-to-Action Buttons */}
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
  );
}
