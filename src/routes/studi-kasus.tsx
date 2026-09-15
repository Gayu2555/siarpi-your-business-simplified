import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Sparkles,
  ChevronRight,
  Sliders,
  DollarSign,
  Layers,
  Store,
  Building2,
  Factory,
  AlertCircle,
} from "lucide-react";
import { modules } from "@/lib/modules";
import { fetchCatalogModules } from "@/lib/modules-api";
import { formatIDR } from "@/lib/utils";

export const Route = createFileRoute("/studi-kasus")({
  head: () => ({
    meta: [
      { title: "Panduan Implementasi: Bagaimana Siarpi Digunakan untuk Bisnis Kamu | Siarpi Blog" },
      {
        name: "description",
        content:
          "Panduan interaktif cara menerapkan Siarpi untuk berbagai jenis & skala bisnis. Pilih skala usaha kamu (UMKM, SMB, Enterprise) dan dapatkan rekomendasi modul, alur kerja, & kalkulasi penghematannya.",
      },
      {
        name: "keywords",
        content:
          "panduan siarpi, cara menggunakan siarpi, implementasi erp umkm, cara pembukuan bisnis, modul finance siarpi, kalkulator efisiensi bisnis, panduan erp indonesia",
      },
    ],
  }),
  loader: async () => {
    try {
      return { catalogModules: await fetchCatalogModules() };
    } catch {
      return { catalogModules: [] };
    }
  },
  component: InteractiveGuidePage,
});

interface ScaleGuide {
  id: "umkm" | "smb" | "enterprise";
  tabLabel: string;
  badgeText: string;
  heroTitle: string;
  overviewText: string;
  targetAudience: string[];
  workflowChanges: { process: string; before: string; after: string }[];
  readinessChecklist: string[];
  recommendedModules: { id: string; name: string; reason: string }[];
  implementationSteps: { step: string; title: string; desc: string }[];
  keyOutcomes: { metric: string; label: string; desc: string }[];
  commonMistakes: string[];
}

const scaleGuidesData: Record<"umkm" | "smb" | "enterprise", ScaleGuide> = {
  umkm: {
    id: "umkm",
    tabLabel: "Usaha Kecil & UMKM",
    badgeText: "Skala: 1 - 15 Karyawan",
    heroTitle: "Siarpi untuk UMKM: Pembukuan Kategori Praktis Tanpa Perlu Paham Akuntansi Rumit",
    overviewText:
      "Bagi pemilik usaha kecil, kedai, toko retail, atau jasa mandiri, tantangan terbesar adalah kehabisan waktu untuk mencatat transaksi harian. Siarpi memotong proses manual ini sehingga pembukuan dan laporan keuangan terbentuk secara otomatis dari setiap transaksi penjualan dan pengeluaran.",
    targetAudience: [
      "Kedai Kopi & Restoran / Kafe",
      "Toko Retail & Fashion Boutique",
      "Jasa Konsultan / Freelance / Agensi Kecil",
      "Toko Kelontong & Distributor Lokal",
    ],
    workflowChanges: [
      {
        process: "Pencatatan transaksi",
        before: "Nota dan pengeluaran direkap ulang ke spreadsheet pada akhir hari.",
        after: "Dokumen transaksi dicatat pada alur yang sama dan siap masuk laporan.",
      },
      {
        process: "Kontrol persediaan",
        before: "Jumlah stok diketahui setelah hitung fisik atau saat barang mulai habis.",
        after: "Mutasi masuk, keluar, dan penyesuaian stok dapat ditelusuri per produk.",
      },
      {
        process: "Pemantauan kas",
        before: "Saldo usaha bercampur dengan catatan pribadi dan sulit direkonsiliasi.",
        after: "Kas dan rekening usaha dipisahkan sehingga posisi saldo lebih mudah diperiksa.",
      },
    ],
    readinessChecklist: [
      "Daftar produk, satuan, dan stok awal",
      "Saldo awal kas serta rekening usaha",
      "Daftar pelanggan dan pemasok aktif",
      "Satu penanggung jawab administrasi",
    ],
    recommendedModules: [
      {
        id: "finance",
        name: "Modul Finance",
        reason:
          "Otomatisasi catatan kas harian, laporan laba rugi, dan saldo bank tanpa buat jurnal manual.",
      },
      {
        id: "inventory",
        name: "Modul Inventory",
        reason: "Pantau stok bahan/barang jualan agar tahu kapan harus stok ulang.",
      },
    ],
    implementationSteps: [
      {
        step: "01",
        title: "Daftar Akun & Pilih Modul Wajib",
        desc: "Cukup aktifkan modul Finance dan Inventory sesuai kebutuhan usaha.",
      },
      {
        step: "02",
        title: "Input Saldo Kas & Stok Barang",
        desc: "Masukkan saldo awal dan daftar produk jualan kamu (bisa via Excel).",
      },
      {
        step: "03",
        title: "Mulai Transaksi Harian",
        desc: "Catat penjualan harian agar pergerakan stok dan saldo kas selalu terpantau.",
      },
      {
        step: "04",
        title: "Cek Laporan Laba Rugi",
        desc: "Di akhir hari/bulan, langsung lihat total omset & keuntungan bersih tanpa lembur.",
      },
    ],
    keyOutcomes: [
      {
        metric: "5 Menit",
        label: "Rekap Operasional Harian",
        desc: "Dulu 2 jam bongkar kuitansi kertas",
      },
      {
        metric: "100%",
        label: "Transaksi Lebih Terlacak",
        desc: "Setiap rupiah masuk & keluar tercatat",
      },
      {
        metric: "15 Jam",
        label: "Hemat Waktu Per Minggu",
        desc: "Waktu lebih bisa dipakai kembangkan usaha",
      },
    ],
    commonMistakes: [
      "Mencampur adukkan keuangan pribadi dengan uang kas usaha",
      "Tidak mencatat pengeluaran kecil seperti parkir atau beli perlengkapan",
      "Menunda pencatatan stok sampai barang kehabisan di tengah jualan",
    ],
  },
  smb: {
    id: "smb",
    tabLabel: "Perusahaan Menengah (SMB)",
    badgeText: "Skala: 15 - 100 Karyawan",
    heroTitle: "Siarpi untuk SMB: Kontrol Alur Piutang, Hutang Supplier, & Multi-Cabang Terpadu",
    overviewText:
      "Ketika bisnis berkembang memiliki puluhan karyawan, beberapa gudang, atau transaksi kredit dengan vendor, koordinasi manual mulai kewalahan. Siarpi menyatukan pencatatan piutang pelanggan (AR), hutang supplier (AP), payroll karyawan, dan pengawasan anggaran per divisi.",
    targetAudience: [
      "Distributor & Grosir Multi-Cabang",
      "Perusahaan Jasa & Agensi Kreatif",
      "Klinik Kesehatan & Jaringan Apotek",
      "Pabrik Pengolahan & Kontraktor",
    ],
    workflowChanges: [
      {
        process: "Piutang dan hutang",
        before: "Jatuh tempo dipantau dari file berbeda oleh tiap admin atau cabang.",
        after: "Faktur terbuka, umur tagihan, dan pembayaran terlihat dalam satu alur.",
      },
      {
        process: "Persetujuan biaya",
        before: "Permintaan dan persetujuan pengeluaran tersebar di email atau percakapan.",
        after: "Status dokumen dan pihak yang menyetujui dapat dilacak secara berjenjang.",
      },
      {
        process: "Penggajian",
        before: "Absensi, komponen gaji, dan potongan disalin antar-file setiap periode.",
        after: "Data tenaga kerja menjadi referensi konsisten untuk proses payroll.",
      },
    ],
    readinessChecklist: [
      "Daftar karyawan beserta struktur organisasi",
      "Saldo faktur piutang dan hutang berjalan",
      "Bagan akun serta rekening bank perusahaan",
      "Matriks otorisasi per nominal atau divisi",
    ],
    recommendedModules: [
      {
        id: "finance",
        name: "Modul Finance (AR/AP & Bank)",
        reason: "Kelola jatuh tempo faktur piutang toko & pembayaran tagihan supplier.",
      },
      {
        id: "payroll",
        name: "Modul Payroll",
        reason: "Hitung gaji, lembur, BPJS, & PPh 21 puluhan karyawan otomatis.",
      },
      {
        id: "hr",
        name: "Modul HR & Absensi",
        reason: "Kelola data staf, pengajuan cuti, & absensi GPS mobile.",
      },
      {
        id: "inventory",
        name: "Modul Multi-Gudang",
        reason: "Lacak perpindahan barang antar gudang & cabang real-time.",
      },
    ],
    implementationSteps: [
      {
        step: "01",
        title: "Setup Struktur COA & Divisi",
        desc: "Atur bagan akun akuntansi & pengelompokkan tim/departemen.",
      },
      {
        step: "02",
        title: "Impor Data Faktur AR/AP & Karyawan",
        desc: "Masukkan piutang berjalan & daftar staf ke dalam sistem.",
      },
      {
        step: "03",
        title: "Aktifkan Otorisasi Berjenjang",
        desc: "Tentukan manajer yang berhak menyetujui pengeluaran kas besar.",
      },
      {
        step: "04",
        title: "Pantau Dashboard Konsolidasi",
        desc: "Monitoring arus kas, umur piutang, dan pencapaian target anggaran.",
      },
    ],
    keyOutcomes: [
      {
        metric: "80%",
        label: "Penurunan Piutang Macet",
        desc: "Notifikasi pengingat otomatis ke pelanggan",
      },
      {
        metric: "30 Menit",
        label: "Proses Gaji Bulanan",
        desc: "Dulu 3 hari hitung Excel satu per satu",
      },
      {
        metric: "Real-time",
        label: "Monitoring Kas Multi-Bank",
        desc: "Tidak ada saldo mengendap tanpa izin",
      },
    ],
    commonMistakes: [
      "Tidak ada sistem pengingat untuk faktur piutang yang hampir jatuh tempo",
      "Proses persetujuan (approval) pembayaran masih dilakukan lewat chat manual",
      "Stok di gudang utama dan cabang sering berbeda tanpa rekap teratur",
    ],
  },
  enterprise: {
    id: "enterprise",
    tabLabel: "Enterprise & Holding",
    badgeText: "Skala: 100+ Karyawan & Multi-Holding",
    heroTitle:
      "Siarpi untuk Enterprise: Konsolidasi Multi-Anak Perusahaan, Valas BI, & Tax Compliance",
    overviewText:
      "Untuk grup perusahaan dengan banyak anak usaha, operasional impor-ekspor valuta asing, dan standar audit ketat, Siarpi menyediakan arsitektur pembukuan yang andal. Mendukung integrasi API Kurs Bank Indonesia JISDOR, pajak e-Faktur DJP, dan konsolidasi finansial holding.",
    targetAudience: [
      "Holding Company & Grup Anak Perusahaan",
      "Pabrik Manufaktur & Ekspor-Impor",
      "Jaringan Logistik & Transportasi Nasional",
      "Pengembang Properti & Konstruksi Skala Besar",
    ],
    workflowChanges: [
      {
        process: "Konsolidasi entitas",
        before: "Laporan anak usaha diseragamkan manual sebelum dapat digabungkan.",
        after: "Mapping akun dan unit bisnis menjadi dasar konsolidasi yang konsisten.",
      },
      {
        process: "Kontrol anggaran",
        before: "Realisasi biaya baru terlihat setelah laporan periodik dikompilasi.",
        after: "Anggaran dan aktual dapat dibandingkan per unit, proyek, atau pusat biaya.",
      },
      {
        process: "Audit dan tutup buku",
        before: "Perubahan data setelah closing sulit diketahui dan ditelusuri sumbernya.",
        after: "Periode, akses, dan jejak perubahan membantu proses review serta audit.",
      },
    ],
    readinessChecklist: [
      "Struktur legal seluruh entitas dan unit bisnis",
      "Mapping chart of accounts antar-perusahaan",
      "Kebijakan closing, pajak, dan mata uang",
      "Pemilik proses serta approver lintas unit",
    ],
    recommendedModules: [
      {
        id: "finance",
        name: "Modul Finance Enterprise",
        reason: "Konsolidasi laporan holding, multi-currency BI JISDOR, & e-Faktur DJP.",
      },
      {
        id: "project",
        name: "Modul Project & Budgeting",
        reason: "Monitoring variance budget vs actual per unit bisnis & proyek.",
      },
      {
        id: "payroll",
        name: "Modul Payroll Enterprise",
        reason: "Transfer penggajian massal ratusan/ribuan staf via integrasi bank.",
      },
      {
        id: "analytics",
        name: "Modul Executive Analytics",
        reason: "Visualisasi laporan kesehatan finansial holding untuk direksi.",
      },
    ],
    implementationSteps: [
      {
        step: "01",
        title: "Mappping Konsolidasi Anak Usaha",
        desc: "Petakan struktur elimasi antar-perusahaan (intercompany transactions).",
      },
      {
        step: "02",
        title: "Integrasi API Kurs & e-Faktur",
        desc: "Koneksikan kurs valas harian BI JISDOR & skema ekspor CSV e-Faktur.",
      },
      {
        step: "03",
        title: "Deployment Multi-Unit Bisnis",
        desc: "Training tim akuntansi per unit dengan hak akses terisolasi.",
      },
      {
        step: "04",
        title: "Tutup Buku Kwartalan & Audit",
        desc: "Cetak Neraca Konsolidasi & Laba Rugi Holding siap audit.",
      },
    ],
    keyOutcomes: [
      {
        metric: "3 Hari",
        label: "Konsolidasi Laporan Holding",
        desc: "Sebelumnya memakan waktu 3 minggu",
      },
      {
        metric: "100%",
        label: "Kepatuhan Tax e-Faktur",
        desc: "Sesuai standar DJP & PSAK Indonesia",
      },
      {
        metric: "Real-time",
        label: "Multi-Currency BI JISDOR",
        desc: "Auto hitung realized/unrealized gain loss",
      },
    ],
    commonMistakes: [
      "Membuat laporan konsolidasi holding secara manual yang rentan salah rumus",
      "Menghitung selisih kurs valuta asing tanpa acuan data BI JISDOR resmi",
      "Tidak ada kuncian periode (lock period) setelah laporan disahkan auditor",
    ],
  },
};

const implementationFaqs = [
  {
    question: "Apakah semua modul harus diaktifkan sejak awal?",
    answer:
      "Tidak. Mulai dari proses yang paling mendesak, siapkan data dasarnya, lalu aktifkan modul lain secara bertahap ketika alur pertama sudah stabil.",
  },
  {
    question: "Apakah data spreadsheet lama bisa tetap digunakan?",
    answer:
      "Bisa sebagai sumber migrasi. Data perlu dibersihkan dan dipetakan terlebih dahulu agar kode, saldo awal, serta relasi pelanggan atau pemasok tidak ganda.",
  },
  {
    question: "Siapa yang sebaiknya menjadi penanggung jawab implementasi?",
    answer:
      "Tunjuk satu process owner dari sisi bisnis yang memahami alur harian dan dapat mengambil keputusan. Untuk perusahaan lebih besar, libatkan owner per fungsi dan satu koordinator lintas divisi.",
  },
  {
    question: "Berapa lama sampai sistem dapat dipakai operasional?",
    answer:
      "Durasi bergantung pada jumlah data, kompleksitas approval, dan jumlah unit. Implementasi bertahap biasanya lebih terukur karena setiap fase dapat diuji sebelum cakupannya diperluas.",
  },
];

// TIDAK di-export: file route yang mengekspor apa pun selain `Route` membuat
// TanStack Router membatalkan code-splitting untuk halaman ini, sehingga
// komponennya ikut masuk bundel utama. Komponen ini hanya dipakai oleh
// `component:` di atas.
function InteractiveGuidePage() {
  const { catalogModules } = Route.useLoaderData();
  const [activeScale, setActiveScale] = useState<"umkm" | "smb" | "enterprise">("umkm");

  // Interactive Calculator State
  const [numStaff, setNumStaff] = useState<number>(10);
  const [numHoursManual, setNumHoursManual] = useState<number>(12);

  const guide = scaleGuidesData[activeScale];

  const modulePrices = useMemo(() => {
    const prices = new Map<string, number>(modules.map((module) => [module.id, module.price]));

    for (const module of catalogModules) {
      prices.set(module.key.toLowerCase(), module.price);
    }

    return prices;
  }, [catalogModules]);

  // Calculated estimates
  const calculatedHoursSavedPerWeek = useMemo(() => {
    return Math.round(numStaff * numHoursManual * 0.75);
  }, [numHoursManual, numStaff]);

  const calculatedMonthlySavingsIDR = useMemo(() => {
    // Estimasi penghematan biaya jam kerja / lembur (asumsi biaya waktu Rp45.000/jam)
    const hoursSavedMonthly = calculatedHoursSavedPerWeek * 4;
    return hoursSavedMonthly * 45000;
  }, [calculatedHoursSavedPerWeek]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* ARTICLE HEADER & METADATA */}
        <section className="bg-gradient-to-b from-muted/30 via-background to-background py-12 md:py-20 border-b border-border/80">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl space-y-6 text-center">
              {/* Blog Category & Read Time Badge */}
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Badge
                  variant="outline"
                  className="rounded-full border-primary/30 text-primary font-semibold bg-primary/5 px-3.5 py-1 text-xs"
                >
                  Panduan & Strategi Bisnis
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> 10 menit baca • Diperbarui September 2026
                </span>
              </div>

              <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15]">
                Bagaimana Siarpi Dapat Digunakan untuk Bisnis Kamu?
              </h1>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Panduan praktis interaktif untuk memahami penerapan modul, alur kerja harian, serta
                estimasi efisiensi sesuai dengan jenis dan skala usaha kamu.
              </p>

              {/* Author Info */}
              <div className="pt-2 flex items-center justify-center gap-3 text-xs text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary font-bold text-primary-foreground">
                  S
                </div>
                <span>
                  Ditulis oleh{" "}
                  <strong className="text-foreground font-semibold">Tim Produk Siarpi</strong>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE SCALE SELECTOR TABS */}
        <section className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border/80 py-4 shadow-2xs">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-center gap-2 flex-wrap max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-2 hidden sm:inline">
                Pilih Skala Bisnis:
              </span>
              {(["umkm", "smb", "enterprise"] as const).map((scaleKey) => {
                const item = scaleGuidesData[scaleKey];
                return (
                  <button
                    key={scaleKey}
                    onClick={() => setActiveScale(scaleKey)}
                    className={`px-5 py-2.5 text-xs font-bold rounded-2xl transition-all duration-300 flex items-center gap-2 ${
                      activeScale === scaleKey
                        ? "bg-gradient-primary text-primary-foreground shadow-md scale-105"
                        : "bg-card text-muted-foreground hover:text-foreground border border-border/80 hover:bg-muted/50"
                    }`}
                  >
                    {scaleKey === "umkm" && <Store className="h-4 w-4" />}
                    {scaleKey === "smb" && <Building2 className="h-4 w-4" />}
                    {scaleKey === "enterprise" && <Factory className="h-4 w-4" />}
                    {item.tabLabel}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* DYNAMIC ARTICLE CONTENT FOR SELECTED SCALE */}
        <section className="container mx-auto px-4 py-12 md:px-6 md:py-20">
          <div className="mx-auto max-w-4xl space-y-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="space-y-14"
              >
                {/* 1. OVERVIEW & TARGET AUDIENCE */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="secondary"
                      className="px-3 py-1 font-semibold text-xs bg-primary/10 text-primary"
                    >
                      {guide.badgeText}
                    </Badge>
                  </div>

                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-snug">
                    {guide.heroTitle}
                  </h2>

                  <p className="text-base text-muted-foreground leading-relaxed">
                    {guide.overviewText}
                  </p>

                  {/* Target Audience Tags */}
                  <div className="rounded-2xl border border-border/80 bg-muted/30 p-5 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                      <Layers className="h-4 w-4 text-primary" /> Contoh Jenis Usaha Cocok:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {guide.targetAudience.map((target) => (
                        <span
                          key={target}
                          className="inline-flex items-center text-xs font-medium bg-card px-3.5 py-1.5 rounded-xl border border-border/80 text-foreground shadow-2xs"
                        >
                          ✓ {target}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. RECOMMENDED MODULES */}
                <div className="space-y-6 pt-4 border-t border-border/60">
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                      Modul Siarpi yang Direkomendasikan
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">
                      Kamu hanya perlu mengaktifkan modul yang memang dibutuhkan tanpa bayar paket
                      mahal.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {guide.recommendedModules.map((mod) => {
                      const price = modulePrices.get(mod.id);

                      return (
                        <Card
                          key={mod.id}
                          className="rounded-2xl border border-border/80 bg-card p-5 space-y-3 flex flex-col justify-between shadow-soft hover:border-primary/40 transition-all"
                        >
                          <div className="space-y-2">
                            <Badge variant="outline" className="text-[10px] font-bold uppercase">
                              Rekomendasi modul
                            </Badge>
                            <h4 className="font-display font-bold text-base text-foreground">
                              {mod.name}
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {mod.reason}
                            </p>
                          </div>
                          <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                            <span className="font-display text-xs font-bold text-foreground">
                              {price == null ? "Hubungi sales" : `${formatIDR(price)}/bln`}
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              asChild
                              className="text-xs text-primary p-0 h-auto font-semibold"
                            >
                              <Link to="/modules/$moduleId" params={{ moduleId: mod.id }}>
                                Detail <ChevronRight className="h-3.5 w-3.5" />
                              </Link>
                            </Button>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                {/* 3. STEP BY STEP IMPLEMENTATION */}
                <div className="space-y-6 pt-4 border-t border-border/60">
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                      Alur Penerapan Langkah-demi-Langkah
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">
                      Bagaimana tim kamu mulai menggunakan Siarpi dari hari pertama hingga pembukuan
                      berjalan sendiri.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {guide.implementationSteps.map((step) => (
                      <div
                        key={step.step}
                        className="rounded-2xl border border-border/80 bg-card p-5 space-y-2 relative overflow-hidden shadow-2xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground font-display font-extrabold text-xs shadow-xs">
                            {step.step}
                          </span>
                          <h4 className="font-display font-bold text-sm text-foreground">
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed pl-11">
                          {step.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. BEFORE AND AFTER WORKFLOW */}
                <div className="space-y-6 border-t border-border/60 pt-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground md:text-2xl">
                      Perubahan Alur Kerja yang Diharapkan
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                      Gambaran proses sebelum implementasi dan kondisi operasional yang dituju.
                    </p>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-border/80 bg-card">
                    <div className="hidden grid-cols-[160px_1fr_1fr] gap-4 border-b border-border/80 bg-muted/40 px-5 py-3 text-[11px] font-bold uppercase text-muted-foreground sm:grid">
                      <span>Proses</span>
                      <span>Sebelum</span>
                      <span>Dengan Siarpi</span>
                    </div>
                    {guide.workflowChanges.map((workflow) => (
                      <div
                        key={workflow.process}
                        className="grid gap-4 border-b border-border/60 px-5 py-5 last:border-b-0 sm:grid-cols-[160px_1fr_1fr]"
                      >
                        <div className="text-sm font-semibold text-foreground">
                          {workflow.process}
                        </div>
                        <div className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                          <span>{workflow.before}</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs leading-relaxed text-foreground">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                          <span>{workflow.after}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. DATA READINESS */}
                <div className="space-y-5 border-y border-border/60 bg-muted/25 px-5 py-6 sm:px-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground">
                        Data yang Perlu Disiapkan
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Checklist awal agar konfigurasi dan migrasi data lebih terarah.
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {guide.readinessChecklist.map((item) => (
                      <div key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. KEY OUTCOMES */}
                <div className="space-y-6 pt-4 border-t border-border/60">
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                      Hasil yang Langsung Dirasakan
                    </h3>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    {guide.keyOutcomes.map((out, idx) => (
                      <Card
                        key={idx}
                        className="rounded-2xl border border-border/80 bg-card p-5 text-center space-y-1 shadow-soft"
                      >
                        <div className="font-display text-2xl md:text-3xl font-extrabold text-primary">
                          {out.metric}
                        </div>
                        <div className="font-bold text-xs text-foreground">{out.label}</div>
                        <p className="text-[11px] text-muted-foreground leading-tight pt-1">
                          {out.desc}
                        </p>
                      </Card>
                    ))}
                  </div>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    Angka di atas merupakan sasaran ilustratif berdasarkan skenario proses. Hasil
                    aktual bergantung pada kualitas data, disiplin penggunaan, dan kompleksitas
                    operasional perusahaan.
                  </p>
                </div>

                {/* 7. COMMON MISTAKES TO AVOID */}
                <div className="rounded-2xl border border-rose-200/80 bg-rose-50/40 dark:border-rose-950/60 dark:bg-rose-950/20 p-6 space-y-3">
                  <div className="font-display font-bold text-sm text-rose-700 dark:text-rose-400 uppercase tracking-wider flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" /> Kesalahan Umum yang Sering Terjadi (Dan Cara
                    Menghindarinya):
                  </div>
                  <ul className="space-y-2 text-xs text-foreground/90 leading-relaxed">
                    {guide.commonMistakes.map((mistake, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-rose-500 font-bold">✕</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* INTERACTIVE ESTIMATION CALCULATOR WIDGET */}
            <div className="pt-8 border-t border-border/80">
              <Card className="rounded-3xl border border-border/80 bg-card p-6 md:p-10 shadow-2xl space-y-6">
                <div className="space-y-2 text-center max-w-2xl mx-auto">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3.5 py-1 rounded-full">
                    <Calculator className="h-4 w-4" /> Kalkulator Efisiensi Interaktif
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    Hitung Berapa Jam & Biaya yang Bisa Kamu Hemat
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Geser parameter di bawah untuk melihat estimasi waktu lembur & biaya admin yang
                    bisa dihemat dengan Siarpi.
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 items-center pt-4">
                  {/* Slider Controls */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-foreground mb-2">
                        <span>Jumlah Karyawan / Staf Admin:</span>
                        <span className="text-primary font-mono text-sm">{numStaff} Staf</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={numStaff}
                        onChange={(e) => setNumStaff(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-foreground mb-2">
                        <span>Jam Rekap Manual per Staf/Minggu:</span>
                        <span className="text-primary font-mono text-sm">
                          {numHoursManual} Jam / Minggu
                        </span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="40"
                        value={numHoursManual}
                        onChange={(e) => setNumHoursManual(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                    </div>
                  </div>

                  {/* Calculated Results Panel */}
                  <div className="rounded-2xl border border-border/80 bg-muted/40 p-6 text-center space-y-4 shadow-inner">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Estimasi Waktu Dihemat:
                      </span>
                      <div className="font-display text-3xl font-extrabold text-primary mt-1">
                        ~{calculatedHoursSavedPerWeek} Jam / Minggu
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Waktu lembur & rekap manual berkurang 75%
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border/60">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Estimasi Hemat Biaya Operasional:
                      </span>
                      <div className="font-display text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                        ± {formatIDR(calculatedMonthlySavingsIDR)} / Bulan
                      </div>
                    </div>
                  </div>
                </div>
                <p className="border-t border-border/60 pt-4 text-[11px] leading-relaxed text-muted-foreground">
                  Estimasi memakai asumsi pengurangan pekerjaan manual sebesar 75%, empat minggu
                  kerja per bulan, dan biaya waktu Rp45.000 per jam. Gunakan hasil sebagai bahan
                  perencanaan awal, bukan jaminan penghematan.
                </p>
              </Card>
            </div>

            {/* IMPLEMENTATION FAQ */}
            <div className="space-y-6 border-t border-border/80 pt-8">
              <div className="max-w-2xl">
                <Badge variant="outline" className="mb-3 rounded-full">
                  Persiapan Implementasi
                </Badge>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  Pertanyaan yang Sering Muncul Sebelum Mulai
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Jawaban singkat untuk menyusun langkah awal tanpa mengganggu operasional berjalan.
                </p>
              </div>

              <Accordion
                type="single"
                collapsible
                className="overflow-hidden rounded-2xl border border-border/80 bg-card px-5"
              >
                {implementationFaqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`implementation-faq-${index}`}>
                    <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* RELATED ARTICLES GRID */}
            <div className="pt-8 space-y-6">
              <h3 className="font-display text-xl font-bold text-foreground">
                Artikel & Panduan Terkait Lainnya
              </h3>

              <div className="grid gap-4 sm:grid-cols-3">
                <Link
                  to="/artikel/$slug"
                  params={{ slug: "transisi-pembukuan-digital" }}
                  className="group"
                >
                  <Card className="rounded-2xl border border-border/80 bg-card p-5 space-y-3 shadow-soft hover:border-primary/40 transition-all flex flex-col justify-between h-full">
                    <div className="space-y-2">
                      <Badge variant="secondary" className="text-[10px] font-bold">
                        Panduan Pembukuan
                      </Badge>
                      <h4 className="font-display font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                        Cara Transisi dari Catatan Buku Tulis ke Pembukuan Digital
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        Langkah mudah memindahkan data tanpa takut selisih pencatatan.
                      </p>
                    </div>
                    <div className="text-xs font-semibold text-primary flex items-center gap-1 pt-2 border-t border-border/60">
                      Baca Artikel{" "}
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>

                <Link
                  to="/artikel/$slug"
                  params={{ slug: "rumus-kas-usaha-harian" }}
                  className="group"
                >
                  <Card className="rounded-2xl border border-border/80 bg-card p-5 space-y-3 shadow-soft hover:border-primary/40 transition-all flex flex-col justify-between h-full">
                    <div className="space-y-2">
                      <Badge variant="secondary" className="text-[10px] font-bold">
                        Tips Akuntansi
                      </Badge>
                      <h4 className="font-display font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                        5 Indikator Penting Membaca Kesehatan Kas Usaha Harian
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        Memahami arus kas masuk vs keluar dengan cara sederhana.
                      </p>
                    </div>
                    <div className="text-xs font-semibold text-primary flex items-center gap-1 pt-2 border-t border-border/60">
                      Baca Artikel{" "}
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>

                <Link
                  to="/artikel/$slug"
                  params={{ slug: "otomatisasi-efaktur-ppn" }}
                  className="group"
                >
                  <Card className="rounded-2xl border border-border/80 bg-card p-5 space-y-3 shadow-soft hover:border-primary/40 transition-all flex flex-col justify-between h-full">
                    <div className="space-y-2">
                      <Badge variant="secondary" className="text-[10px] font-bold">
                        Pajak & Valuta
                      </Badge>
                      <h4 className="font-display font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                        Panduan Otomatisasi e-Faktur & Rekonsiliasi PPN
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        Menyiapkan laporan pajak tanpa rasa panik di akhir bulan.
                      </p>
                    </div>
                    <div className="text-xs font-semibold text-primary flex items-center gap-1 pt-2 border-t border-border/60">
                      Baca Artikel{" "}
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="bg-gradient-primary py-16 text-primary-foreground md:py-24">
          <div className="container mx-auto px-4 text-center md:px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-3xl space-y-5"
            >
              <h2 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl">
                Coba Siarpi untuk Bisnis Kamu Hari Ini
              </h2>
              <p className="text-base md:text-lg opacity-90 leading-relaxed">
                Mulai uji coba gratis 14 hari tanpa kartu kredit. Cukup pilih modul yang kamu
                butuhkan.
              </p>
              <div className="pt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" asChild className="font-bold shadow-lg">
                  <Link to="/onboarding">Daftar Coba Gratis 14 Hari</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Link to="/modular">Lihat Pilihan Modul (Beli Ketengan)</Link>
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
