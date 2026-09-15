import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, Crown, Loader2, RefreshCw, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fetchSuites, type SuiteWithPlans } from "@/lib/modules-api";
import { resolvePhosphorIcon } from "@/lib/icon-resolver";
import { formatIDR } from "@/lib/utils";

export function SuitePricingSection() {
  const [suites, setSuites] = useState<SuiteWithPlans[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const loadSuites = useCallback(async () => {
    setLoading(true);
    setFailed(false);
    try {
      const data = await fetchSuites();
      setSuites(data);
      setFailed(data.length === 0);
    } catch {
      setSuites([]);
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSuites();
  }, [loadSuites]);

  return (
    <section id="paket" className="mt-16 scroll-mt-24 border-t border-border pt-16">
      <div className="max-w-2xl">
        <Badge variant="outline" className="mb-4 rounded-full">
          Paket Suite
        </Badge>
        <h2 className="font-display text-3xl font-bold md:text-4xl">
          Satu paket untuk alur kerja yang saling terhubung
        </h2>
        <p className="mt-3 text-muted-foreground">
          Pilih suite berdasarkan area bisnis. Setiap paket menjelaskan jumlah modul, user, dan
          biaya tambahan secara terbuka.
        </p>
      </div>

      {loading ? (
        <div className="flex min-h-64 items-center justify-center">
          <Loader2 className="h-7 w-7 animate-spin text-primary" aria-label="Memuat paket" />
        </div>
      ) : failed ? (
        <div className="mt-10 flex min-h-48 flex-col items-center justify-center rounded-lg border border-border bg-muted/20 px-6 text-center">
          <p className="font-medium">Paket belum berhasil dimuat</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Periksa koneksi lalu coba mengambil data pricing kembali.
          </p>
          <Button variant="outline" className="mt-5" onClick={() => void loadSuites()}>
            <RefreshCw className="mr-2 h-4 w-4" /> Coba lagi
          </Button>
        </div>
      ) : (
        <div className="mt-10 space-y-14">
          {suites.map((suite) => {
            const suiteIcon = resolvePhosphorIcon(suite.icon);
            return (
              <div key={suite.key}>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <suiteIcon.Icon weight={suiteIcon.weight} className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold">{suite.name}</h3>
                    {suite.tagline && (
                      <p className="text-sm text-muted-foreground">{suite.tagline}</p>
                    )}
                  </div>
                </div>

                <div
                  className={`grid gap-5 ${
                    suite.plans.length === 1
                      ? "max-w-sm"
                      : suite.plans.length === 2
                        ? "max-w-3xl md:grid-cols-2"
                        : "lg:grid-cols-3"
                  }`}
                >
                  {suite.plans.map((plan, index) => {
                    const featured =
                      suite.plans.length > 1 && index === Math.floor(suite.plans.length / 2);
                    const unlimitedModules = plan.module_quota === -1 || plan.is_all_access;
                    const unlimitedSeats = plan.included_seats === -1;

                    return (
                      <motion.div
                        key={plan.key}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.35, delay: index * 0.06 }}
                      >
                        <Card
                          className={`relative flex h-full flex-col rounded-lg p-6 ${
                            featured
                              ? "border-2 border-primary bg-primary/[0.03] shadow-card"
                              : "border-border"
                          }`}
                        >
                          <div className="flex min-h-6 items-center justify-between gap-3">
                            {featured ? (
                              <Badge className="bg-primary text-primary-foreground">
                                <Star className="mr-1 h-3 w-3 fill-current" /> Paling populer
                              </Badge>
                            ) : (
                              <span />
                            )}
                            {plan.is_all_access && (
                              <Badge variant="outline" className="border-amber-300 text-amber-700">
                                <Crown className="mr-1 h-3 w-3" /> All access
                              </Badge>
                            )}
                          </div>

                          <h4 className="mt-5 font-display text-xl font-bold">{plan.name}</h4>
                          <p className="mt-1 min-h-10 text-sm text-muted-foreground">
                            {plan.description}
                          </p>
                          <div className="mt-5 border-y border-border py-5">
                            <span className="font-display text-3xl font-bold">
                              {formatIDR(plan.base_price)}
                            </span>
                            <span className="text-sm text-muted-foreground">/bulan</span>
                          </div>

                          <ul className="mt-5 flex-1 space-y-3">
                            <li className="flex gap-2 text-sm">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              {unlimitedModules
                                ? "Semua modul dalam suite"
                                : `${plan.module_quota} modul pilihan`}
                            </li>
                            <li className="flex gap-2 text-sm">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <span>
                                {unlimitedSeats
                                  ? "User tanpa batas"
                                  : `Termasuk hingga ${plan.included_seats} user`}
                                {plan.price_per_seat > 0 && (
                                  <span className="block text-xs text-muted-foreground">
                                    +{formatIDR(plan.price_per_seat)}/user tambahan
                                  </span>
                                )}
                              </span>
                            </li>
                            {(suite.modules ?? []).map((module) => (
                              <li
                                key={module.key}
                                className="flex gap-2 text-sm text-muted-foreground"
                              >
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                {module.name}
                              </li>
                            ))}
                          </ul>

                          <Button
                            asChild
                            variant={featured ? "default" : "outline"}
                            className={
                              featured ? "mt-7 bg-gradient-primary text-primary-foreground" : "mt-7"
                            }
                          >
                            <Link to="/onboarding">Pilih {plan.name}</Link>
                          </Button>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
