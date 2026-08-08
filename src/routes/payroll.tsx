import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  Calculator,
  Banknote,
  Clock,
  Receipt,
  FileText,
  Shield,
  BarChart3,
  Users,
  Percent,
  Sliders,
  Link2,
} from "lucide-react";
import { ArrowRight } from "lucide-react";
import { BusinessSolutionsSection } from "@/components/modules/BusinessSolutionsSection";
import { ComparisonBeforeAfterSection } from "@/components/modules/ComparisonBeforeAfterSection";
import { ModuleSubModulesSection } from "@/components/modules/ModuleSubModulesSection";

export const Route = createFileRoute("/payroll")({
  head: () => {
    const metaTitle = "Software Payroll & Penggajian Otomatis Indonesia | Siarpi ERP";
    const metaDesc = "Otomatiskan perhitungan gaji karyawan, PPh21, BPJS, kasbon, dan slip gaji dengan software payroll modern Siarpi ERP. Integrasi otomatis ke modul Finance untuk journaling yang akurat.";
    const canonicalUrl = "https://siarpi.com/payroll";
    const keywords = "software payroll Indonesia, aplikasi gaji otomatis, sistem penggajian karyawan, software pph21 otomatis, aplikasi bpjs karyawan, slip gaji digital, sistem payroll erp indonesia, manajemen gaji online";

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Siarpi ERP — Modul Payroll & Penggajian",
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
        ratingCount: "1480",
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
  component: PayrollLandingPage,
});

const payrollFeatures = [
  {
    id: "payroll",
    name: "Dashboard & Ringkasan Payroll",
    desc: "Eksekutif dashboard estimasi pengeluaran gaji bulanan, statistik penggajian, & tren akumulasi tunjangan.",
    icon: BarChart3,
    color: "bg-indigo-500/10 text-indigo-600",
  },
  {
    id: "pay-run",
    name: "Proses Hitung Gaji (Pay Run)",
    desc: "Otomatisasi kalkulasi gaji massal (Gaji Pokok + Tunjangan + Lembur - BPJS - PPh21) dalam 1-klik.",
    icon: Calculator,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    id: "payslips",
    name: "Slip Gaji Digital & Cetak",
    desc: "Penerbitan slip gaji resmi digital, ekspor format PDF berpassword, serta pengiriman email massal.",
    icon: Receipt,
    color: "bg-green-500/10 text-green-600",
  },
  {
    id: "kasbon",
    name: "Pinjaman & Kasbon Karyawan",
    desc: "Pengajuan kasbon online, kelola plafon tenor pinjaman, & pemotongan cicilan otomatis di Pay Run.",
    icon: Banknote,
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    id: "jenis-potongan",
    name: "Manajemen Jenis Potongan",
    desc: "Konfigurasi beragam jenis potongan fleksibel (Denda keterlambatan, kasbon, & potongan sukarela).",
    icon: Percent,
    color: "bg-red-500/10 text-red-600",
  },
  {
    id: "configuration",
    name: "Kustomisasi Template Slip Gaji",
    desc: "Atur tata letak slip gaji, logo perusahaan, catatan direksi, dan rincian komponen tunjangan.",
    icon: Sliders,
    color: "bg-cyan-500/10 text-cyan-600",
  },
  {
    id: "pengaturan",
    name: "Pengaturan Pajak PPh21 & BPJS",
    desc: "Integrasi rumus tarif PPh21 TER (Tarif Efektif Rata-Rata) & persentase iuran BPJS Kesehatan / Ketenagakerjaan.",
    icon: Shield,
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    id: "journal-mapping",
    name: "Integrasi Jurnal Keuangan & COA",
    desc: "Pemetaan otomatis akun akuntansi (COA) untuk jurnal beban gaji, utang PPh21, & liabilitas ke modul Finance.",
    icon: Link2,
    color: "bg-emerald-500/10 text-emerald-600",
  },
];

const testimonials = [
  {
    name: "Dewi Lestari",
    role: "Finance Manager",
    company: "PT. Global Manufacturing",
    quote:
      "Sistem payroll Siarpi mengurangi waktu kami dari 5 hari keh 2 jam. Benar-benar revolusioner!",
    rating: 5,
  },
  {
    name: "Rizky Firmansyah",
    role: "CEO",
    company: "CV. Sumber Rejeki Makmur",
    quote:
      "Integrasi PPh21 & BPJS ke Kementerian Keuangan serta penyusunan jurnal otomatis benar-benar andal.",
    rating: 5,
  },
];



function PayrollLandingPage() {
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
                  Payroll
                </Badge>
                <h1 className="font-display text-4xl font-bold md:text-5xl lg:text-6xl">
                  Payroll Otomatis Tanpa Ribet & Akurat 100%
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-foreground/80">
                  Hitung gaji karyawan, termasuk tunjangan, lembur, PPh21, BPJS, dan kasbon — semua
                  otomatis. Integrasi langsung ke modul Finance untuk jurnal akuntansi tanpa
                  selisih.
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
                  alt="Dashboard Payroll Siarpi ERP"
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
              Payroll Akurat & Terintegrasi penuh
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Kelola penggajian karyawan dari awal sampai akhir proses, termasuk penghitungan pajak,
              BPJS, hingga penerbitan slip gaji.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Calculator,
                title: "Hitung Gaji 100% Otomatis",
                desc: "Komputasi gaji pokok, tunjangan, lembur, potongan BPJS, PPh21, & kasbon akurat.",
              },
              {
                icon: FileText,
                title: "Slip Gaji Digital Siap Cetak",
                desc: "Unduh atau kirimkan slip gaji langsung ke karyawan via WhatsApp / Email.",
              },
              {
                icon: Shield,
                title: "Compliance Pajak & BPJS",
                desc: "Patuh aturan pajak terbaru (PPh21, PPh26, PPN) dan regulasi BPJS.",
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

        {/* PAYROLL SUB-MODULES CAROUSEL SHOWCASE */}
        <ModuleSubModulesSection moduleId="payroll" moduleName="Payroll" />

        {/* BUSINESS SOLUTIONS SECTION */}
        <BusinessSolutionsSection />

        {/* COMPARISON SECTION */}
        <ComparisonBeforeAfterSection moduleName="Payroll" />

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
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, idx) => (
                        <svg
                          key={idx}
                          className="h-4 w-4 fill-primary text-primary"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.68-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.5 4.73L5.82 21z" />
                        </svg>
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
            <details className="mb-4 rounded-xl border border-border/50 p-6">
              <summary className="cursor-pointer font-display text-base font-semibold">
                Apakah bisa melakukan integrasi ke rekening bank langsung?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Ya. Kami mendukung ekspor file format BJB, BCA, Mandiri, BRI, dan BNI untuk transfer
                gaji massal ke rekening karyawan.
              </p>
            </details>
            <details className="mb-4 rounded-xl border border-border/50 p-6">
              <summary className="cursor-pointer font-display text-base font-semibold">
                Apakah PPh21 terhitung otomatis?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Ya. Sistem kami otomatis menghitung PPh21 sesuai tarif progresif dan memotong sesuai
                dengan konsep penghasilan bruto karyawan.
              </p>
            </details>
            <details className="mb-4 rounded-xl border border-border/50 p-6">
              <summary className="cursor-pointer font-display text-base font-semibold">
                Apakah bisa menggabungkan dengan modul Finance?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Ya. Setiap pay run otomatis membuat jurnal akuntansi di modul Finance, mencatat
                beban gaji ke akun COA yang sesuai.
              </p>
            </details>
          </motion.div>
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
                Mulai kelola gaji karyawan secara otomatis hari ini
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

export default PayrollLandingPage;
