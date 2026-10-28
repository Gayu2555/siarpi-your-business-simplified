import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Crown, Loader2, RefreshCw, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fetchSuites, type ApiModule, type SuiteWithPlans } from "@/lib/modules-api";
import { getModulePricingFeatures } from "@/lib/modules/pricing-feature-highlights";
import { resolvePhosphorIcon } from "@/lib/icon-resolver";
import { formatIDR } from "@/lib/utils";

/**
 * CTA "Lihat N fitur lainnya" ke halaman modul. `remaining` dihitung dari daftar
 * lengkap di pricing-feature-highlights.ts dikurangi yang sudah tampil di kartu,
 * jadi angkanya jujur: kalau semuanya sudah muat di checklist, labelnya turun
 * jadi "Lihat detail modul".
 *
 * Tujuannya dipilih per bentuk rute di sini -- bukan disimpan sebagai string di
 * file data -- supaya `to` tetap literal dan router ikut memastikan rutenya ada.
 * HR dan Payroll punya halaman modul sendiri (/hr, /payroll) yang lebih lengkap
 * (sub-modul + screenshot); sisanya lewat halaman generik /modules/$moduleId.
 *
 * Dirender di dalam panel checklist yang sudah menjorok, jadi tidak perlu
 * margin kiri lagi di sini.
 */
function ModuleDetailCta({ moduleKey, remaining }: { moduleKey: string; remaining: number }) {
  const key = moduleKey.trim().toLowerCase();
  const label = remaining > 0 ? `Lihat ${remaining} fitur lainnya` : "Lihat detail modul";
  const className =
    "inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:underline";

  if (key === "hr") {
    return (
      <Link to="/hr" className={className}>
        {label} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    );
  }
  if (key === "payroll") {
    return (
      <Link to="/payroll" className={className}>
        {label} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    );
  }
  return (
    <Link to="/modules/$moduleId" params={{ moduleId: key }} className={className}>
      {label} <ArrowRight className="h-3.5 w-3.5" />
    </Link>
  );
}

/**
 * Bentuk modul yang dipakai baris checklist kartu pricing.
 *
 * Katalog menyimpan ikon sebagai string Phosphor ("i-ph-users-fill") plus
 * warna (bg_color/icon_color), jadi fieldnya dibuat opsional: modul yang
 * tidak ketemu di katalog (key plan yang lintas suite) tetap bisa dirender.
 */
type PricingModule = {
  key: string;
  name: string;
  icon?: string | null;
  bg_color?: string | null;
  icon_color?: string | null;
};

/** Ubah modul katalog (ApiModule) ke bentuk yang dipakai kartu pricing. */
function toPricingModule(module: ApiModule): PricingModule {
  return {
    key: module.key,
    name: module.name,
    icon: module.icon,
    bg_color: module.bg_color,
    icon_color: module.icon_color,
  };
}

/**
 * Logo modul di baris checklist.
 *
 * Modul yang punya entri katalog dapat logo aslinya (ikon + warna katalog).
 * Modul tanpa entri katalog (key plan yang tidak ketemu) tetap pakai
 * centang, supaya barisnya tidak pernah kosong.
 */
function ModuleLogo({ module }: { module: PricingModule }) {
  if (!module.icon) {
    return <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />;
  }
  const { Icon, weight } = resolvePhosphorIcon(module.icon);
  return (
    <span
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
        module.bg_color || "bg-primary/10"
      } ${module.icon_color || "text-primary"}`}
    >
      <Icon weight={weight} className="h-4 w-4" />
    </span>
  );
}

/**
 * Satu modul di checklist kartu pricing. Defaultnya TERTUTUP: cuma logo + nama modul +
 * chevron, supaya kartu tidak memanjang saat ada 5+ modul.
 *
 * Begitu dibuka (klik baris nama, bisa ditutup lagi): maksimal
 * PRICING_FEATURE_LIMIT fitur teratas sebagai checklist, lalu CTA yang membawa
 * sisa fiturnya ke halaman modul. Modul yang copy-nya belum ditulis tetap satu
 * baris centang biasa tanpa tombol, jadi tidak pernah ada panel kosong.
 */
function ModuleFeatureRow({ module }: { module: PricingModule }) {
  const features = getModulePricingFeatures(module.key);
  const [open, setOpen] = useState(false);

  if (!features) {
    return (
      <li className="flex gap-3 text-sm">
        <ModuleLogo module={module} />
        {module.name}
      </li>
    );
  }

  const panelId = `fitur-${module.key.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={panelId}
        className="-mx-1 flex w-[calc(100%+0.5rem)] items-center justify-between gap-3 rounded px-1 py-0.5 text-left transition-colors hover:text-foreground"
      >
        <span className="flex items-center gap-3 text-sm">
          <ModuleLogo module={module} />
          {module.name}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div id={panelId} className="mt-2.5 space-y-2.5 border-l border-border pl-7 pb-1">
          <ul className="space-y-2.5">
            {features.visible.map((feature) => (
              <li key={feature} className="flex gap-2.5 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <ModuleDetailCta moduleKey={module.key} remaining={features.remaining} />
        </div>
      )}
    </li>
  );
}

export function SuitePricingSection() {
  const [suites, setSuites] = useState<SuiteWithPlans[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const loadSuites = useCallback(async (options?: { silent?: boolean }) => {
    const silent = options?.silent === true;
    if (!silent) setLoading(true);
    setFailed(false);
    try {
      const data = await fetchSuites();
      // Refetch diam-diam: kalau server balas kosong (mis. lagi restart),
      // jangan hapus kartu yang sudah tampil.
      if (silent && data.length === 0) return;
      setSuites(data);
      setFailed(data.length === 0);
    } catch {
      // Refetch diam-diam (tab regained focus) tidak boleh menghapus kartu yang
      // sudah tampil -- kalau request-nya yang gagal, pertahankan data lama.
      if (!silent) {
        setSuites([]);
        setFailed(true);
      }
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSuites();
  }, [loadSuites]);

  // Kuota karyawan / harga bundle diubah dari Platform Admin (tab lain). Kalau
  // user balik ke tab ini, ambil ulang data supaya kartu tidak nampilin angka
  // lama -- tanpa perlu reload halaman.
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") void loadSuites({ silent: true });
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
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
          karyawan secara terbuka.
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
            // Guard defensif: respons API bisa mengirim `plans: null` untuk
            // suite tanpa plan aktif (slice nil di Go -> JSON null), dan
            // plans.length di bawah dulu bikin /modular crash.
            const plans = suite.plans ?? [];
            // Suite tanpa bundle aktif DIHAPUS seluruhnya, bukan cuma
            // dikosongkan: judul suite-nya juga tidak perlu tampil kalau tidak
            // ada paket yang bisa dibeli.
            if (plans.length === 0) return null;
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
                    plans.length === 1
                      ? "max-w-sm"
                      : plans.length === 2
                        ? "max-w-3xl md:grid-cols-2"
                        : "lg:grid-cols-3"
                  }`}
                >
                  {plans.map((plan, index) => {
                    const featured = plans.length > 1 && index === Math.floor(plans.length / 2);
                    const unlimitedModules = plan.module_quota === -1 || plan.is_all_access;
                    const unlimitedSeats = plan.included_seats === -1;
                    // Suite "talents" ber-scope employee: kursinya = data
                    // karyawan, jadi labelnya TIDAK boleh ditulis "user".
                    // Suite business/commerce ber-scope user, dan jatah
                    // karyawannya berdiri sendiri (plan.included_employees).
                    const isEmployeeScope = suite.seat_scope === "employee";
                    const seatNoun = isEmployeeScope ? "karyawan" : "user";
                    // Jatah karyawan eksplisit (bundle user-scope). Untuk
                    // suite employee, jatah karyawan sudah tercermin di
                    // included_seats -- jangan ditampilkan dua kali.
                    // Pengecekan "typeof === number" (bukan "!== null")
                    // supaya backend lama yang belum mengirim field ini
                    // tidak bikin kartu menulis "undefined karyawan".
                    const employeeQuota =
                      !isEmployeeScope && typeof plan.included_employees === "number"
                        ? plan.included_employees
                        : null;
                    // Modul yang BENERAN termasuk di plan ini: whitelist
                    // backend (plan.module_keys), dicocokkan ke modul suite
                    // untuk namanya. Key yang tidak ketemu (mis. lintas suite)
                    // tampil apa adanya daripada hilang diam-diam.
                    const includedModules = (plan.module_keys ?? [])
                      .map((key) => {
                        const found = suite.modules?.find((m) => m.key === key);
                        return found ? toPricingModule(found) : { key, name: key };
                      })
                      .filter((m, i, arr) => arr.findIndex((x) => x.key === m.key) === i);
                    // Semua modul suite (mode all-access) juga dinormalisasi
                    // ke bentuk yang sama supaya barisnya konsisten.
                    const suiteModules = (suite.modules ?? []).map(toPricingModule);
                    // Aturan tampil (lihat modul engine di modules/service.go):
                    // - unlimited (all-access/kuota -1): semua modul suite.
                    // - sisanya: hitungan = ISI checklist (plan.module_keys),
                    //   bukan angka kuota. Kuota sebagai jatah hitung sudah
                    //   dihapus dari engine -- satu-satunya angka jujur adalah
                    //   yang dicentang.
                    const quotaCountText = unlimitedModules
                      ? null
                      : `${includedModules.length} modul pilihan`;
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

                          {/* Modul jadi isi utama kartu: jumlah modul di paling atas,
                              daftar modul (dengan logo) menyusul, baru jatah
                              user/karyawan di bawahnya. Harga add-on tidak
                              ditampilkan di kartu -- biaya tambahan user dan
                              karyawan dihitung di halaman checkout. */}
                          <ul className="mt-5 flex-1 space-y-5">
                            <li className="flex gap-3 text-sm">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              {unlimitedModules ? "Semua modul dalam suite" : quotaCountText}
                            </li>
                            {(unlimitedModules ? suiteModules : includedModules).map((module) => (
                              <ModuleFeatureRow key={module.key} module={module} />
                            ))}
                          </ul>

                          <ul className="mt-5 space-y-3 border-t border-border pt-5">
                            <li className="flex gap-3 text-sm">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              {unlimitedSeats
                                ? `${seatNoun} tanpa batas`
                                : `Termasuk hingga ${plan.included_seats} ${seatNoun}`}
                            </li>
                            {employeeQuota !== null && (
                              <li className="flex gap-3 text-sm">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                {employeeQuota === -1
                                  ? "Karyawan tanpa batas"
                                  : `Termasuk hingga ${employeeQuota} karyawan`}
                              </li>
                            )}
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
