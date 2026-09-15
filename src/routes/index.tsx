import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ConsultationCtaSection } from "@/components/site/ConsultationCtaSection";
import { fetchCatalogModules, type ApiModule } from "@/lib/modules-api";
import { resolvePhosphorIcon, resolveLucideIcon } from "@/lib/icon-resolver";
import { useState, useEffect } from "react";
import {
  Check,
  Star,
  ArrowRight,
  Zap,
  Layers,
  RefreshCw,
  GraduationCap,
  CreditCard,
  Building2,
  Smartphone,
  QrCode,
  Palette,
  Puzzle,
  Quote,
  Users,
} from "lucide-react";
import financeApImg from "@/assets/finance-ap.png";

// Fallback modules — plain data tanpa React components, dipakai saat API tidak tersedia
const FALLBACK_MODULES: ApiModule[] = [
  {
    key: "hr",
    name: "HR",
    label: "HR",
    description: "Manajemen karyawan & rekrutmen",
    icon: "i-ph-users-fill",
    bg_color: "bg-blue-100",
    icon_color: "text-blue-600",
    hover_color: "blue",
    route: "",
    suite_key: "talents",
    price: 49000,
    is_core: false,
    is_listed: true,
  },
  {
    key: "payroll",
    name: "Payroll",
    label: "Payroll",
    description: "Gaji otomatis & pajak",
    icon: "i-ph-money-fill",
    bg_color: "bg-emerald-100",
    icon_color: "text-emerald-600",
    hover_color: "emerald",
    route: "",
    suite_key: "talents",
    price: 79000,
    is_core: false,
    is_listed: true,
  },
  {
    key: "finance",
    name: "Finance",
    label: "Finance",
    description: "Akuntansi & laporan keuangan",
    icon: "i-ph-chart-bar-fill",
    bg_color: "bg-green-100",
    icon_color: "text-green-600",
    hover_color: "green",
    route: "",
    suite_key: "finance",
    price: 99000,
    is_core: false,
    is_listed: true,
  },
  {
    key: "inventory",
    name: "Inventory",
    label: "Inventory",
    description: "Stok barang real-time",
    icon: "i-ph-cube-fill",
    bg_color: "bg-blue-100",
    icon_color: "text-blue-600",
    hover_color: "blue",
    route: "",
    suite_key: "commerce",
    price: 69000,
    is_core: false,
    is_listed: true,
  },
  {
    key: "procurement",
    name: "Procurement",
    label: "Procurement",
    description: "Pengadaan, tender, PO, dan vendor",
    icon: "i-ph-shopping-bag-fill",
    bg_color: "bg-emerald-100",
    icon_color: "text-emerald-600",
    hover_color: "emerald",
    route: "",
    suite_key: "commerce",
    price: 59000,
    is_core: false,
    is_listed: true,
  },
  {
    key: "production",
    name: "Production",
    label: "Production",
    description: "BOM, pesanan produksi, dan HPP",
    icon: "i-ph-factory-fill",
    bg_color: "bg-violet-100",
    icon_color: "text-violet-600",
    hover_color: "violet",
    route: "",
    suite_key: "commerce",
    price: 59000,
    is_core: false,
    is_listed: true,
  },
  {
    key: "crm",
    name: "CRM",
    label: "CRM",
    description: "Kelola pelanggan & leads",
    icon: "i-ph-megaphone-fill",
    bg_color: "bg-yellow-100",
    icon_color: "text-yellow-600",
    hover_color: "yellow",
    route: "",
    suite_key: "growth",
    price: 69000,
    is_core: false,
    is_listed: true,
  },
  {
    key: "absensi",
    name: "Absensi",
    label: "Absensi",
    description: "Kehadiran & shift",
    icon: "i-ph-fingerprint-fill",
    bg_color: "bg-purple-100",
    icon_color: "text-purple-600",
    hover_color: "purple",
    route: "",
    suite_key: "talents",
    price: 39000,
    is_core: false,
    is_listed: true,
  },
  {
    key: "invoice",
    name: "Invoice",
    label: "Invoice",
    description: "Tagihan & pembayaran",
    icon: "i-ph-receipt-fill",
    bg_color: "bg-pink-100",
    icon_color: "text-pink-600",
    hover_color: "pink",
    route: "",
    suite_key: "finance",
    price: 49000,
    is_core: false,
    is_listed: true,
  },
  {
    key: "employee_portal",
    name: "Employee Portal",
    label: "Employee Portal",
    description: "Layanan mandiri untuk karyawan",
    icon: "i-ph-identification-badge-fill",
    bg_color: "bg-cyan-100",
    icon_color: "text-cyan-600",
    hover_color: "cyan",
    route: "",
    suite_key: "talents",
    price: 29000,
    is_core: false,
    is_listed: true,
  },
];

export const Route = createFileRoute("/")({
  head: () => {
    const metaTitle = "Siarpi | All in One Management System & Business Operating System";
    const metaDesc =
      "Business Operating System (BOS) lengkap untuk mengontrol seluruh operasional bisnis Anda: Finance, HR & Payroll, Inventory, Procurement, Production, dan CRM.";
    const ogImage = "/dashboard-preview.jpg";
    const keywords = [
      "siarpi all in one management system",
      "business operating system",
      "software erp indonesia",
      "software akuntansi terbaik",
      "software keuangan perusahaan",
      "aplikasi hr payroll indonesia",
      "software manajemen stok barang",
      "siarpi erp",
      "software bisnis terpadu",
    ].join(", ");

    const websiteJsonLd = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Siarpi ERP",
      url: "https://siarpi.com",
      description: metaDesc,
    };

    const softwareJsonLd = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Siarpi Enterprise ERP",
      operatingSystem: "Web, Android, iOS, Windows, macOS",
      applicationCategory: "BusinessApplication",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "2500",
      },
    };

    const organizationJsonLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Siarpi",
      url: "https://siarpi.com",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+62-813-8789-5911",
        contactType: "customer service",
        areaServed: "ID",
        availableLanguage: "Indonesian",
      },
    };

    return {
      meta: [
        { title: metaTitle },
        { name: "description", content: metaDesc },
        { name: "keywords", content: keywords },
        { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
        { property: "og:title", content: metaTitle },
        { property: "og:description", content: metaDesc },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:site_name", content: "Siarpi Enterprise ERP" },
        { property: "og:locale", content: "id_ID" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: metaTitle },
        { name: "twitter:description", content: metaDesc },
        { name: "twitter:image", content: ogImage },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(websiteJsonLd),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(softwareJsonLd),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(organizationJsonLd),
        },
      ],
    };
  },
  component: LandingPage,
});

const benefits = [
  {
    iconName: "Zap",
    title: "Aktifkan yang Dibutuhkan",
    desc: "Mulai dari modul yang paling relevan lalu perluas sistem mengikuti pertumbuhan bisnis Anda.",
  },
  {
    iconName: "RefreshCw",
    title: "Bebas Rekap Manual",
    desc: "Dokumen transaksi, stok barang, dan catatan kas terhubung tanpa perlu salin data di Excel.",
  },
  {
    iconName: "GraduationCap",
    title: "Langsung Pakai Tanpa Training",
    desc: "Tampilan simpel dan ramah pengguna. Staf operasional atau admin Anda bisa cepat beradaptasi.",
  },
  {
    iconName: "Smartphone",
    title: "Pantau dari Mana Saja",
    desc: "Cek laporan Laba Rugi, sisa stok, dan tagihan pelanggan langsung dari HP atau laptop secara real-time.",
  },
];

const caseStudies = [
  {
    segment: "UMKM retail & distribusi",
    icon: Building2,
    title: "Stok dan pembukuan berjalan dalam satu alur",
    challenge: "Data stok, tagihan pelanggan, dan arus kas masih tersebar di beberapa spreadsheet.",
    result: "Fokus hasil: stok lebih terkontrol dan rekap keuangan harian lebih singkat.",
    modules: ["Finance", "Inventory", "Invoice"],
  },
  {
    segment: "Perusahaan jasa berkembang",
    icon: Users,
    title: "Administrasi tim tidak lagi menghambat pertumbuhan",
    challenge:
      "Data karyawan, absensi, cuti, dan perhitungan gaji dikerjakan melalui alur terpisah.",
    result: "Fokus hasil: data tenaga kerja konsisten dari kehadiran sampai penggajian.",
    modules: ["HR", "Absensi", "Payroll"],
  },
  {
    segment: "Manufaktur & multi-unit",
    icon: Layers,
    title: "Operasional dan anggaran dapat dipantau lintas unit",
    challenge:
      "Pengadaan, produksi, anggaran proyek, dan laporan manajemen sulit dikonsolidasikan.",
    result: "Fokus hasil: keputusan lintas unit memakai data operasional yang lebih utuh.",
    modules: ["Procurement", "Production", "Analytics"],
  },
];

const payments = [
  { iconName: "Building2", label: "Transfer Bank" },
  { iconName: "CreditCard", label: "Virtual Account" },
  { iconName: "QrCode", label: "QRIS" },
  { iconName: "Smartphone", label: "E-Wallet" },
];

// Pelanggan yang sudah memakai Siarpi (logo bar — pakai inisial sebagai placeholder)
const clients = [
  { name: "Kopi Kenangan Lokal", initial: "KK" },
  { name: "PT Maju Bersama", initial: "MB" },
  { name: "Toko Sembako Berkah", initial: "SB" },
  { name: "Studio Kreatif", initial: "SK" },
  { name: "PT Sinar Abadi", initial: "SA" },
  { name: "Boutique Anggun", initial: "BA" },
  { name: "Warung Bakso Mantap", initial: "WB" },
  { name: "Digital Agency", initial: "DA" },
];

// Feedback / testimoni dari pelanggan nyata yang sudah pakai Siarpi
const testimonials = [
  {
    quote:
      "Onboarding karyawan baru sekarang cuma 1 hari. Dulu bisa seminggu lebih. Tim HR saya akhirnya bisa fokus ke hal strategis.",
    name: "Rina Wijaya",
    role: "HR Manager",
    company: "PT Maju Bersama",
    rating: 5,
  },
  {
    quote:
      "Payroll yang dulu makan 3 hari sekarang selesai 30 menit. Pajak & BPJS auto-hitung. Game changer untuk tim finance kami.",
    name: "Linda Kusuma",
    role: "Finance Director",
    company: "PT Sinar Abadi",
    rating: 5,
  },
  {
    quote:
      "Stok masuk dan keluar sekarang lebih mudah dilacak. Tim kami tidak lagi menghabiskan waktu untuk rekap manual setiap hari.",
    name: "Pak Bambang",
    role: "Owner",
    company: "Warung Bakso Mantap",
    rating: 5,
  },
  {
    quote:
      "Tim 15 orang bisa sinkron tanpa meeting harian. Project Management Siarpi bikin kami hemat banyak waktu.",
    name: "Arif Hidayat",
    role: "Project Manager",
    company: "Studio Kreatif",
    rating: 5,
  },
  {
    quote:
      "Conversion rate naik 40% sejak pakai pipeline visual CRM. Follow-up otomatis menghemat 2 jam per hari per sales.",
    name: "Reza Pratama",
    role: "Sales Director",
    company: "PT Solusi B2B",
    rating: 5,
  },
  {
    quote:
      "Tim kecil saya bisa kelola 50+ karyawan tanpa perlu admin HR khusus. Bayar pun pakai QRIS, gampang banget.",
    name: "Doni Saputra",
    role: "Founder",
    company: "Kopi Kenangan Lokal",
    rating: 5,
  },
];

const stats = [
  { value: "500+", label: "Bisnis Aktif" },
  { value: "50.000+", label: "Karyawan Dikelola" },
  { value: "4.9/5", label: "Rating Pelanggan" },
  { value: "99.9%", label: "Uptime SLA" },
];

function LandingPage() {
  // ── Modules dari API, fallback ke data lokal saat loading/error ──
  const [apiModules, setApiModules] = useState<ApiModule[] | null>(null);
  const [modulesLoading, setModulesLoading] = useState(true);

  useEffect(() => {
    fetchCatalogModules()
      .then((data) => setApiModules(data.length > 0 ? data : null))
      .catch(() => setApiModules(null))
      .finally(() => setModulesLoading(false));
  }, []);

  // Gunakan data API kalau tersedia, fallback ke plain data tanpa React components
  const displayModules: ApiModule[] = apiModules ?? FALLBACK_MODULES;
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-subtle">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="container relative mx-auto px-4 pt-12 pb-20 md:px-6 md:pt-20 md:pb-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
            {/* LEFT — copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge
                variant="secondary"
                className="mb-6 rounded-full border border-primary/20 bg-accent/60 px-4 py-1.5 text-xs font-semibold text-accent-foreground"
              >
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                All in One Management System & Business Operating System
              </Badge>

              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
                Satu Sistem
                <br />
                <span className="text-gradient-primary">Pengendali Bisnis</span>
                <br />
                Serba Otomatis
              </h1>

              <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
                Business Operating System (BOS) lengkap untuk mengontrol seluruh divisi bisnis Anda:
                Keuangan, HR & Payroll, Stok Barang, CRM, hingga Analisis Eksekutif.{" "}
                <span className="font-semibold text-foreground">
                  Aktifkan modul yang Anda butuhkan saja
                </span>
                .
              </p>

              {/* Feature bullets */}
              <ul className="mt-8 space-y-4">
                {[
                  {
                    icon: Layers,
                    color: "amber",
                    text: "Business Operating System Terpadu: Kontrol Keuangan, Payroll, HR, Stok, Pengadaan, dan Produksi dari satu dasbor pusat.",
                  },
                  {
                    icon: RefreshCw,
                    color: "emerald",
                    text: "Otomatisasi Lintas Divisi: Data transaksi, pencatatan kas, dan gaji terhubung real-time.",
                  },
                  {
                    icon: Puzzle,
                    color: "blue",
                    text: "Modular Sesuai Kebutuhan: Aktifkan hanya fungsi yang relevan untuk tahap bisnis Anda.",
                  },
                ].map((b) => (
                  <li key={b.text} className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        b.color === "amber"
                          ? "bg-primary/15 text-primary"
                          : b.color === "emerald"
                            ? "bg-emerald-500/15 text-emerald-600"
                            : "bg-blue-500/15 text-blue-600"
                      }`}
                    >
                      <b.icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-foreground/80 md:text-base">{b.text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row">
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow"
                >
                  <Link to="/onboarding">
                    Mulai Sekarang <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/onboarding">Lihat Demo</Link>
                </Button>
              </div>
            </motion.div>

            {/* RIGHT — dashboard with floating cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute -inset-6 bg-gradient-primary opacity-25 blur-3xl" />

              <img
                src={financeApImg}
                alt="Tampilan nyata dashboard Hutang Usaha Finance Siarpi"
                width={1858}
                height={824}
                fetchPriority="high"
                decoding="async"
                className="relative w-full rounded-2xl border border-border bg-background object-contain shadow-elegant"
              />

              {/* Floating: Modular (top-right) */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -top-4 -right-2 hidden rounded-2xl border border-border bg-background/95 px-4 py-2.5 shadow-elegant backdrop-blur sm:flex sm:items-center sm:gap-2"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Puzzle className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-semibold">Modular & Fleksibel</span>
              </motion.div>

              {/* Floating: Zero Training (bottom-left) */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.75 }}
                className="absolute -bottom-5 left-2 flex items-center gap-3 rounded-2xl border border-border bg-background/95 px-4 py-3 shadow-elegant backdrop-blur sm:left-6"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <div>
                  <div className="text-sm font-semibold leading-tight">Zero Training</div>
                  <div className="text-xs text-muted-foreground">Langsung bisa dipakai</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4 rounded-full">
              Mengapa Siarpi
            </Badge>
            <h2 className="font-display text-3xl font-bold md:text-5xl">
              Dirancang untuk bisnis Indonesia
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => {
              const BIcon = resolveLucideIcon(b.iconName);
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Card className="h-full rounded-2xl border-border p-6 transition-shadow hover:shadow-card">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
                      <BIcon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold">{b.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="container mx-auto px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 rounded-full">
            Modules
          </Badge>
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Semua yang bisnis Anda butuhkan
          </h2>
          <p className="mt-4 text-muted-foreground">
            Pilih modul yang Anda butuhkan, atau ambil semuanya dalam satu paket.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {modulesLoading
            ? /* Skeleton cards */
              Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="flex h-full flex-col items-center gap-3 rounded-2xl border border-border p-6 animate-pulse"
                >
                  <div className="h-12 w-12 rounded-xl bg-muted" />
                  <div className="h-4 w-20 rounded bg-muted" />
                </div>
              ))
            : displayModules.map((m, i) => {
                const { Icon, weight } = resolvePhosphorIcon(m.icon);
                return (
                  <motion.div
                    key={m.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                  >
                    <Link to="/modules/$moduleId" params={{ moduleId: m.key }}>
                      <Card className="group flex h-full cursor-pointer flex-col items-center gap-3 rounded-2xl border-border p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-xl ${m.bg_color} transition-transform duration-300 group-hover:scale-110`}
                        >
                          <Icon weight={weight} className={`h-6 w-6 ${m.icon_color}`} />
                        </div>
                        <div className="font-display font-semibold">{m.name}</div>
                        {m.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {m.description}
                          </p>
                        )}
                        <div className="mt-auto inline-flex items-center pt-2 text-xs font-medium text-primary">
                          Jelajahi fitur <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
        </div>

        <div className="mt-8 text-center">
          <Link to="/modular" className="text-sm font-medium text-primary hover:underline">
            Bandingkan paket dan modul →
          </Link>
        </div>
      </section>

      {/* DISKUSIKAN DENGAN TIM SIARPI */}
      <ConsultationCtaSection />

      {/* STUDI KASUS */}
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-4 rounded-full bg-background">
                Studi Kasus
              </Badge>
              <h2 className="font-display text-3xl font-bold md:text-5xl">
                Lihat Siarpi bekerja di alur bisnis nyata
              </h2>
              <p className="mt-4 text-muted-foreground">
                Jelajahi skenario implementasi berdasarkan skala usaha, tantangan operasional, dan
                kombinasi modul yang relevan.
              </p>
            </div>
            <Button variant="outline" asChild className="w-fit bg-background">
              <Link to="/studi-kasus">
                Buka semua studi kasus <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {caseStudies.map((study, index) => {
              const CaseIcon = study.icon;
              return (
                <motion.div
                  key={study.segment}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <Card className="flex h-full flex-col rounded-2xl border-border p-6 transition-all hover:border-primary/40 hover:shadow-card">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <CaseIcon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-semibold uppercase text-muted-foreground">
                        {study.segment}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold">{study.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {study.challenge}
                    </p>
                    <p className="mt-5 border-l-2 border-primary pl-3 text-sm font-medium">
                      {study.result}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {study.modules.map((moduleName) => (
                        <Badge key={moduleName} variant="secondary" className="rounded-full">
                          {moduleName}
                        </Badge>
                      ))}
                    </div>
                    <Link
                      to="/studi-kasus"
                      className="mt-auto inline-flex items-center pt-6 text-sm font-medium text-primary hover:underline"
                    >
                      Lihat alur lengkap <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRUSTED BY — logo bar pelanggan */}
      <section className="border-y border-border bg-background py-14">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Dipercaya oleh 500+ bisnis di Indonesia
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {clients.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="flex flex-col items-center gap-2 opacity-70 transition-opacity hover:opacity-100"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-muted/40 font-display text-sm font-bold text-foreground/70">
                  {c.initial}
                </div>
                <span className="text-center text-[11px] text-muted-foreground line-clamp-1">
                  {c.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Stats bar */}
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-6 rounded-2xl border border-border bg-muted/30 p-6 md:grid-cols-4 md:p-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-2xl font-bold text-gradient-primary md:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground md:text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — feedback pelanggan */}
      <section className="container mx-auto px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 rounded-full">
            <Users className="mr-1 h-3 w-3" /> Feedback Pelanggan
          </Badge>
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Apa kata mereka <span className="text-gradient-primary">tentang Siarpi</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Cerita nyata dari pemilik bisnis & manajer yang sudah merasakan dampaknya.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="flex h-full flex-col rounded-2xl border-border p-6 transition-shadow hover:shadow-card">
                <Quote className="h-7 w-7 text-primary/40" />
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/85">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary font-display text-sm font-bold text-primary-foreground">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
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
      </section>

      {/* PAYMENTS */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Bayar mudah <span className="text-gradient-primary">tanpa kartu kredit</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Semua metode pembayaran Indonesia didukung.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
            {payments.map((p) => {
              const PIcon = resolveLucideIcon(p.iconName);
              return (
                <Card
                  key={p.label}
                  className="flex flex-col items-center gap-3 rounded-2xl border-border p-6 transition-shadow hover:shadow-card"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
                    <PIcon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium">{p.label}</span>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 md:px-6 md:py-28">
        <Card className="overflow-hidden rounded-3xl border-0 bg-gradient-primary p-12 text-center shadow-elegant md:p-16">
          <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-5xl">
            Siap kelola bisnis tanpa ribet?
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            Mulai gratis hari ini, tanpa kartu kredit.
          </p>
          <Button
            size="lg"
            asChild
            className="mt-8 bg-background text-foreground hover:bg-background/90"
          >
            <Link to="/onboarding">
              Mulai Sekarang <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </Card>
      </section>

      <Footer />
    </div>
  );
}
