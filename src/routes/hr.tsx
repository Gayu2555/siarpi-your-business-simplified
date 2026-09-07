import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  Users,
  Clock,
  Calendar,
  Banknote,
  UserCheck,
  MapPin,
  ClipboardList,
  Award,
  Building2,
  Briefcase,
  Network,
} from "lucide-react";
import { ArrowLeft, ArrowRight, Check, Star, Quote } from "lucide-react";
import { BusinessSolutionsSection } from "@/components/modules/BusinessSolutionsSection";
import { ComparisonBeforeAfterSection } from "@/components/modules/ComparisonBeforeAfterSection";
import { ModuleSubModulesSection } from "@/components/modules/ModuleSubModulesSection";



const hrSubFeatures = [
  {
    id: "karyawan",
    name: "Daftar Karyawan",
    desc: "Kelola database SDM terpusat, filter departemen, pelacakan status kontrak/tetap, dan pencarian kilat.",
    icon: UserCheck,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    id: "absensi",
    name: "Absensi & Presensi",
    desc: "Catat kehadiran real-time, waktu Clock In/Out akurat, bukti foto selfie, dan pemantauan keterlambatan.",
    icon: Clock,
    color: "bg-sky-500/10 text-sky-600",
  },
  {
    id: "cuti",
    name: "Cuti & Izin",
    desc: "Otomatisasi pengajuan cuti/izin karyawan, alur persetujuan supervisor, & pemotongan kuota instan.",
    icon: Calendar,
    color: "bg-green-500/10 text-green-600",
  },
  {
    id: "lembur",
    name: "Lembur & Overtime",
    desc: "Pengajuan lembur transparan, persetujuan atasan bertingkat, dan kalkulasi kompensasi otomatis.",
    icon: Banknote,
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    id: "shift",
    name: "Shift Kerja",
    desc: "Master alokasi jam kerja fleksibel (Pagi, Siang, Malam, Flexi) & penugasan roster massal per tim.",
    icon: Clock,
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    id: "reimbursement",
    name: "Reimbursement",
    desc: "Klaim biaya operasional/dinas paperless dengan unggah nota kuitansi & approval bertingkat.",
    icon: Banknote,
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    id: "departemen",
    name: "Departemen & Divisi",
    desc: "Pengelolaan struktur departemen perusahaan, alokasi kepala divisi, & pemetaan pusat biaya.",
    icon: Building2,
    color: "bg-indigo-500/10 text-indigo-600",
  },
  {
    id: "jabatan",
    name: "Jabatan & Tingkatan Posisi",
    desc: "Standardisasi level manajemen, tingkatan posisi, jenjang karir, dan tanggung jawab pekerjaan.",
    icon: Briefcase,
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    id: "hierarki",
    name: "Hierarki & Org Chart",
    desc: "Visualisasi interaktif bagan struktur organisasi, pemetaan Atasan-Bawahan, & rantai komando.",
    icon: Network,
    color: "bg-rose-500/10 text-rose-600",
  },
];

const testimonials = [
  {
    name: "Sari Wulandari",
    role: "HR Manager",
    company: "PT. TechInovasi Solusindo",
    quote:
      "Siarpi HR mengotomatisasi penggajian dan absensi kami. Proses lembur sekarang hanya butuh 2 menit!",
    rating: 5,
  },
  {
    name: "Andi Pratama",
    role: "Finance & Admin Supervisor",
    company: "CV. Mitra Distribusi",
    quote:
      "Integrasi payroll otomatis ke modul Finance sangat membantu. Tidak ada lagi selisih atau kesalahan hitung.",
    rating: 5,
  },
];

export const Route = createFileRoute("/hr")({
  head: () => {
    const metaTitle = "Software Manajemen SDM & HR Terbaik Indonesia | Siarpi ERP";
    const metaDesc = "Otomatiskan absensi karyawan, penggajian, cuti, shift kerja, dan reimbursement dengan software HR modern Siarpi ERP. Solusi komprehensif untuk perusahaan Indonesia.";
    const canonicalUrl = "https://siarpi.com/hr";
    const keywords = "software hr Indonesia, sistem manajemen sdm, aplikasi absensi karyawan, sistem payroll otomatis, software cuti karyawan, aplikasi gaji online, sistem shift kerja, erp hr Indonesia";

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Siarpi ERP — Modul Manajemen SDM & HR",
      operatingSystem: "Web, Windows, macOS, Linux, Android, iOS",
      applicationCategory: "BusinessApplication",
      offers: {
        "@type": "Offer",
        price: "99000",
        priceCurrency: "IDR",
        availability: "https://schema.org/InStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "1540",
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
        { property: "og:url", content: canonicalUrl },
        { property: "og:image", content: "https://siarpi.com/dashboard-preview.jpg" },
        { property: "og:site_name", content: "Siarpi Enterprise ERP" },
        { property: "og:locale", content: "id_ID" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: metaTitle },
        { name: "twitter:description", content: metaDesc },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLd),
        },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
    };
  },
  component: HrLandingPage,
});

function HrLandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-subtle">
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="container relative mx-auto px-4 py-16 md:px-6 md:py-24">
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Semua modul
            </Link>

            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="outline" className="mb-4 rounded-full">
                  Manajemen SDM
                </Badge>
                <h1 className="font-display text-4xl font-bold md:text-5xl lg:text-6xl">
                  Manajemen SDM & Kepala Dapet Gaji Tepat
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-foreground/80">
                  Otomatiskan absensi karyawan, penggajian, cuti, shift kerja, dan reimbursement
                  dalam satu sistem ERP yang terpadu dengan modul Finance Siarpi.
                </p>
                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                  <Button size="lg" asChild className="font-semibold shadow-lg">
                    <Link to="/onboarding">Coba Gratis 14 Hari</Link>
                  </Button>
                  <Button variant="outline" size="lg">
                    <Link to="/komparasi">Bandingkan Paket</Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative"
              >
                <img
                  src="/dashboard-preview.jpg"
                  alt="Dashboard HR Siarpi ERP"
                  className="relative z-10 rounded-3xl border border-border shadow-strong"
                />
                <div className="absolute -bottom-6 -left-6 z-0 h-full w-full rounded-3xl bg-gradient-primary opacity-10 blur-xl filter" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* KEY BENEFITS SECTION */}
        <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <Badge variant="outline" className="mb-4 rounded-full">
              Keunggulan
            </Badge>
            <h2 className="font-display text-3xl font-bold md:text-5xl">
              Semua Kebutuhan HR dalam Satu Platform
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Dari rekrutmen hingga penggajian, otomatiskan seluruh siklus hidup karyawan tanpa
              kesalahan manual.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: UserCheck,
                title: "Manajemen Data Karyawan Lengkap",
                desc: "Simpan biodata, kontrak, riwayat kerja, dan dokumen karyawan terpusat.",
              },
              {
                icon: Clock,
                title: "Absensi Real-Time Berbasis GPS",
                desc: "Clock in/out dengan foto selfie dan geofencing untuk akurasi lokasi.",
              },
              {
                icon: Banknote,
                title: "Payroll Terotomatis & Presisi",
                desc: "Hitung gaji otomatis termasuk lembur, pajak, dan BPJS tanpa kesalahan.",
              },
            ].map((b, i) => {
              const IconComp = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Card className="flex h-full flex-col items-center rounded-2xl border-border p-8 shadow-soft">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-xl font-bold">{b.title}</h3>
                    <p className="mt-2 text-center text-sm text-muted-foreground">{b.desc}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* HR SUB-MODULES CAROUSEL SHOWCASE */}
        <ModuleSubModulesSection moduleId="hr" moduleName="Human Resource" />

        {/* BUSINESS SOLUTIONS SECTION */}
        <BusinessSolutionsSection />

        {/* COMPARISON SECTION */}
        <ComparisonBeforeAfterSection moduleName="HR" />

        {/* TESTIMONIALS */}
        <section className="bg-muted/30 py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-2xl text-center"
            >
              <Badge variant="outline" className="mb-4 rounded-full">
                Testimoni
              </Badge>
              <h2 className="font-display text-3xl font-bold md:text-5xl">
                Dipercaya oleh perusahaan di seluruh Indonesia
              </h2>
            </motion.div>

            <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Card className="relative h-full rounded-2xl border-border p-8 shadow-soft">
                    <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/20" />
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, idx) => (
                        <Star key={idx} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="mt-4 text-base italic text-foreground/90">"{t.quote}"</p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary font-display font-bold text-primary-foreground">
                        {t.name[0]}
                      </div>
                      <div>
                        <div className="font-display text-sm font-semibold">{t.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {t.role} • {t.company}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="container mx-auto px-4 py-20 md:px-6 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <Badge variant="outline" className="mb-4 rounded-full">
              FAQ
            </Badge>
            <h2 className="font-display text-3xl font-bold md:text-5xl">
              Pertanyaan yang Sering Ditanyakan
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto max-w-3xl"
          >
            <details className="mb-4 rounded-xl border border-border/50 p-6 [&_svg]:mb-0 [&_svg]:h-5 [&_svg]:w-5">
              <summary className="cursor-pointer font-display text-base font-semibold">
                Apakah data karyawan aman?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Ya. Semua data karyawan kami enkripsi AES-256 dan kami melakukan backup rutin. Kami
                juga mematuhi standar ISO 27001.
              </p>
            </details>
            <details className="mb-4 rounded-xl border border-border/50 p-6 [&_svg]:mb-0 [&_svg]:h-5 [&_svg]:w-5">
              <summary className="cursor-pointer font-display text-base font-semibold">
                Bisakah melakukan integrasi dengan sistem akuntansi?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Ya. Modul Payroll kami terintegrasi langsung dengan modul Finance Siarpi, sehingga
                penggajian otomatis terposting ke Buku Besar.
              </p>
            </details>
            <details className="mb-4 rounded-xl border border-border/50 p-6 [&_svg]:mb-0 [&_svg]:h-5 [&_svg]:w-5">
              <summary className="cursor-pointer font-display text-base font-semibold">
                Apakah bisa tahu karyawan terlalu sering absen terlambat?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Ya. Sistem mendeteksi keterlambatan otomatis berdasarkan shift masing-masing
                karyawan, lengkap laporan statistik.
              </p>
            </details>
          </motion.div>
        </section>

        {/* RELATED MODULES */}
        <section className="border-t border-border bg-muted/20 py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h3 className="font-display text-2xl font-bold">Modul lainnya untuk bisnis Anda</h3>
                <p className="text-sm text-muted-foreground">
                  Kombinasikan dengan modul ini untuk sistem yang utuh.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Placeholder for related modules like Finance, Inventory, CRM, etc. */}
            </div>
          </div>
        </section>

        {/* CTA BOTTOM */}
        <section className="bg-gradient-primary py-20 text-primary-foreground md:py-28">
          <div className="container mx-auto px-4 text-center md:px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-3xl"
            >
              <h2 className="font-display text-3xl font-bold md:text-5xl">
                Mulai kelola SDM & HR secara modern hari ini
              </h2>
              <p className="mt-4 text-base opacity-90 md:text-lg">
                Uji coba gratis 14 hari tanpa kartu kredit. Batalkan kapan saja.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" asChild className="font-semibold shadow-lg">
                  <Link to="/onboarding">Daftar Coba Gratis</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Link to="/komparasi">Bandingkan Paket</Link>
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

// Tanpa export default: file route yang mengekspor apa pun selain `Route`
// membatalkan code-splitting TanStack Router, jadi komponen halaman ini ikut
// terbawa ke bundel utama. Komponennya sudah dipakai lewat `component:` di atas.
