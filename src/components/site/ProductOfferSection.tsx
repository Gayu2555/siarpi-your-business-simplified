import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, GraduationCap, Puzzle, QrCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// ─────────────────────────────────────────────────────────────────────────────
// Pengganti blok "testimoni pelanggan" yang sebelumnya memakai nama fiktif.
// Setiap butir menunjuk mekanisme produk yang bisa diverifikasi di aplikasi:
//   - trial all-access 14 hari tanpa kartu kredit & berakhir otomatis
//     (routes/onboarding.tsx + POST /company/trial/start, routes/terms.tsx §04)
//   - harga disusun per modul sebelum checkout (routes/modular.tsx)
//   - kanal bayar QRIS + Virtual Account, modul aktif setelah settlement
//     (payments/CoreHandler.go: checkout_id dipakai webhook untuk aktivasi)
//   - konsultasi penyusunan modul lewat WhatsApp/email (ConsultationCtaSection)
// Tidak ada angka jumlah pelanggan, rating agregat, atau klaim hasil.
// ─────────────────────────────────────────────────────────────────────────────

interface ProductOfferSectionProps {
  /** Nama modul untuk copy yang lebih spesifik, mis. "HR" atau "Payroll". */
  moduleName?: string;
}

export function ProductOfferSection({ moduleName }: ProductOfferSectionProps) {
  const scope = moduleName ? `modul ${moduleName}` : "Siarpi";

  const items = [
    {
      Icon: Check,
      title: "Aktif penuh selama 14 hari",
      desc: `Semua fitur ${scope} kebuka selama masa coba, tanpa kartu kredit. Habis 14 hari berhenti sendiri, tidak ada tagihan diam-diam.`,
    },
    {
      Icon: Puzzle,
      title: "Bayar per modul",
      desc: "Ambil satu modul dulu, tambah yang lain kapan pun. Total biayanya kelihatan sebelum kamu bayar.",
    },
    {
      Icon: QrCode,
      title: "QRIS & Virtual Account",
      desc: "Bayar pakai QRIS dari aplikasi bank atau e-wallet favoritmu. Begitu lunas, modulmu langsung aktif.",
    },
    {
      Icon: GraduationCap,
      title: "Dibantu memilih modul",
      desc: "Belum yakin mulai dari mana? Ceritakan bisnismu lewat WhatsApp atau email, tim kami bantu pilihkan kombinasi modulnya.",
    },
  ];

  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <Badge variant="outline" className="mb-4 rounded-full bg-background">
            <Check className="mr-1 h-3 w-3" /> Yang Kamu Dapatkan
          </Badge>
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Coba dulu {scope}, <span className="text-gradient-primary">baru bayar</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Empat hal yang langsung kamu rasakan sejak hari pertama.
          </p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="flex h-full items-start gap-4 rounded-2xl border-border p-6 transition-shadow hover:shadow-card">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
                  <item.Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            asChild
            className="bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow"
          >
            <Link to="/onboarding">
              Mulai trial 14 hari <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="bg-background">
            <Link to="/modular">Susun modul &amp; lihat harga</Link>
          </Button>
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Tanpa kartu kredit. Trial berakhir otomatis.
        </p>
      </div>
    </section>
  );
}
