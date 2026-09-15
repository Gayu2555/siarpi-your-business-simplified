import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Blocks,
  Building2,
  CalendarDays,
  Check,
  Compass,
  Link2,
  ShieldCheck,
  Target,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ConsultationCtaSection } from "@/components/site/ConsultationCtaSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import dashboardImage from "@/assets/dashboard-preview.jpg";

export const Route = createFileRoute("/tentang")({
  head: () => ({
    meta: [
      { title: "Tentang Siarpi | PT. Siarpi Solusi Sinergi" },
      {
        name: "description",
        content:
          "Kenali PT. Siarpi Solusi Sinergi, perusahaan di balik Siarpi, Business Operating System modular yang mulai dibangun pada akhir 2025.",
      },
      {
        name: "keywords",
        content:
          "tentang Siarpi, PT Siarpi Solusi Sinergi, software ERP Indonesia, Business Operating System Indonesia",
      },
      { property: "og:title", content: "Tentang Siarpi | PT. Siarpi Solusi Sinergi" },
      {
        property: "og:description",
        content:
          "Siarpi dibangun untuk menyederhanakan operasional bisnis Indonesia melalui sistem yang modular dan saling terhubung.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/dashboard-preview.jpg" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "PT. Siarpi Solusi Sinergi",
          alternateName: "Siarpi",
          url: "https://siarpi.com",
          foundingDate: "2025",
          email: "contacts@siarpi.com",
          description:
            "Perusahaan teknologi Indonesia yang mengembangkan Business Operating System modular untuk operasional bisnis.",
        }),
      },
    ],
  }),
  component: AboutPage,
});

const missions = [
  "Menyederhanakan proses bisnis yang kompleks menjadi alur kerja yang mudah dipahami dan digunakan.",
  "Menyediakan sistem modular agar perusahaan dapat memulai dari kebutuhan utama dan berkembang secara bertahap.",
  "Menghubungkan data antar-divisi untuk mengurangi pekerjaan berulang dan mempercepat pengambilan keputusan.",
  "Membangun produk yang relevan dengan cara kerja, regulasi, dan kebutuhan operasional bisnis Indonesia.",
  "Menjaga keamanan, keandalan, dan akuntabilitas data sebagai dasar setiap pengembangan produk.",
];

const principles = [
  {
    icon: Compass,
    title: "Sederhana",
    description: "Teknologi harus mengurangi kerumitan, bukan memindahkannya ke pengguna.",
  },
  {
    icon: Link2,
    title: "Terhubung",
    description: "Data antar-tim perlu mengalir dalam satu konteks tanpa input berulang.",
  },
  {
    icon: Blocks,
    title: "Modular",
    description: "Bisnis dapat memakai yang dibutuhkan sekarang dan menambah kemampuan saat siap.",
  },
  {
    icon: ShieldCheck,
    title: "Dapat Dipercaya",
    description:
      "Setiap proses harus memiliki data, status, dan jejak aktivitas yang dapat ditelusuri.",
  },
];

function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="relative flex min-h-[min(680px,calc(100svh-96px))] items-center overflow-hidden border-b border-border">
          <img
            src={dashboardImage}
            alt="Tampilan Business Operating System Siarpi"
            className="absolute inset-0 h-full w-full object-cover object-top opacity-20"
            width={1600}
            height={1024}
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-background/80" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="container relative mx-auto px-4 py-20 md:px-6"
          >
            <Badge variant="outline" className="mb-6 rounded-full bg-background/80">
              PT. Siarpi Solusi Sinergi
            </Badge>
            <h1 className="max-w-4xl font-display text-5xl font-bold leading-tight md:text-7xl">
              Siarpi
            </h1>
            <p className="mt-5 max-w-3xl font-display text-2xl font-semibold leading-snug md:text-4xl">
              Satu sistem untuk membantu bisnis bekerja lebih terhubung.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Kami membangun Business Operating System yang menyatukan proses operasional, keuangan,
              dan pengelolaan tim tanpa memaksa perusahaan membeli sistem yang tidak mereka
              perlukan.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground">
                <Link to="/onboarding">
                  Mulai dengan Siarpi <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-background/80">
                <Link to="/modular">Lihat Pricing</Link>
              </Button>
            </div>
          </motion.div>
        </section>

        <section className="container mx-auto grid gap-12 px-4 py-20 md:px-6 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <Badge variant="outline" className="mb-4 rounded-full">
              Cerita Kami
            </Badge>
            <h2 className="font-display text-3xl font-bold md:text-5xl">
              Dibangun dari kebutuhan untuk menyatukan proses bisnis
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.08 }}
            className="space-y-5 text-base leading-8 text-muted-foreground"
          >
            <p>
              Siarpi adalah produk dari{" "}
              <strong className="text-foreground">PT. Siarpi Solusi Sinergi</strong>.
              Pengembangannya dimulai pada akhir 2025 dengan satu gagasan sederhana: perusahaan
              seharusnya tidak perlu berpindah-pindah sistem hanya untuk memahami kondisi bisnisnya
              sendiri.
            </p>
            <p>
              Banyak aktivitas penting masih berjalan dalam aplikasi terpisah, spreadsheet, dan
              percakapan yang sulit ditelusuri. Dampaknya bukan hanya pekerjaan menjadi lambat,
              tetapi data antar-divisi juga mudah berbeda dan keputusan terlambat diambil.
            </p>
            <p>
              Karena itu, Siarpi dibangun secara modular. Perusahaan dapat mulai dari Finance, HR,
              Payroll, Inventory, CRM, Procurement, Production, atau kebutuhan lain yang paling
              mendesak, kemudian menghubungkannya dalam satu sistem ketika bisnis berkembang.
            </p>
          </motion.div>
        </section>

        <section className="border-y border-border bg-muted/20">
          <div className="container mx-auto grid gap-10 px-4 py-20 md:px-6 md:py-28 lg:grid-cols-2 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              className="border-b border-border pb-10 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-16"
            >
              <div className="flex items-center gap-3 text-primary">
                <Target className="h-6 w-6" />
                <span className="text-sm font-semibold uppercase tracking-wider">Visi</span>
              </div>
              <h2 className="mt-6 font-display text-3xl font-bold leading-tight md:text-4xl">
                Menjadi Business Operating System yang membantu bisnis Indonesia tumbuh dengan
                proses yang lebih sederhana, terhubung, dan terukur.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.08 }}
            >
              <div className="flex items-center gap-3 text-primary">
                <Building2 className="h-6 w-6" />
                <span className="text-sm font-semibold uppercase tracking-wider">Misi</span>
              </div>
              <ol className="mt-7 space-y-5">
                {missions.map((mission, index) => (
                  <li key={mission} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/5 text-xs font-bold text-primary">
                      {index + 1}
                    </span>
                    <span className="pt-0.5 text-sm leading-6 text-foreground/80">{mission}</span>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20 md:px-6 md:py-28">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-4 rounded-full">
              Prinsip Produk
            </Badge>
            <h2 className="font-display text-3xl font-bold md:text-5xl">
              Cara kami membangun Siarpi
            </h2>
            <p className="mt-4 text-muted-foreground">
              Prinsip ini menjadi dasar saat kami menentukan fitur, alur kerja, dan keputusan teknis
              di dalam produk.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.06 }}
                className="bg-background p-6"
              >
                <principle.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-8 font-display text-lg font-semibold">{principle.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-20 md:px-6 md:pb-28">
          <div className="grid overflow-hidden rounded-lg border border-border lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col justify-center p-8 md:p-12">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <CalendarDays className="h-5 w-5" /> Akhir 2025
              </div>
              <h2 className="mt-5 font-display text-3xl font-bold">Awal perjalanan Siarpi</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Dari fondasi produk yang dimulai pada akhir 2025, Siarpi terus dikembangkan menuju
                sistem bisnis yang semakin lengkap tanpa meninggalkan prinsip modular dan mudah
                digunakan.
              </p>
              <div className="mt-7 flex items-center gap-2 text-sm font-medium">
                <Check className="h-4 w-4 text-primary" /> Dibangun dan dikembangkan untuk bisnis
                Indonesia
              </div>
            </div>
            <figure className="min-h-72 border-t border-border bg-muted/30 lg:border-l lg:border-t-0">
              <img
                src={dashboardImage}
                alt="Dashboard Siarpi yang menyatukan informasi bisnis"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top"
                width={1600}
                height={1024}
              />
            </figure>
          </div>
        </section>

        <ConsultationCtaSection context="transformasi sistem bisnis" />
      </main>

      <Footer />
    </div>
  );
}
