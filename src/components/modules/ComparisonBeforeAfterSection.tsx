import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { XCircle, CheckCircle2, ArrowRight } from "lucide-react";

interface ComparisonItem {
  beforeTitle: string;
  beforeDesc: string;
  afterTitle: string;
  afterDesc: string;
}

interface ComparisonBeforeAfterSectionProps {
  moduleName?: string;
  customComparisons?: ComparisonItem[];
}

const defaultComparisons: ComparisonItem[] = [
  {
    beforeTitle: "Lembur Buka Nota & Cari Selisih di Excel",
    beforeDesc: "Staf harus mengumpulkan tumpukan kwitansi fisik di akhir bulan dan menginput ulang satu per satu. Saat angka tidak cocok, harus melacak selisih jam-jaman sampai malam.",
    afterTitle: "Pembukuan Rapi & Otomatis Tanpa Pusing",
    afterDesc: "Semua transaksi kas, invoice, dan pembayaran langsung tercatat otomatis. Laporan keuangan seimbang secara real-time tanpa perlu entri ulang.",
  },
  {
    beforeTitle: "Tagihan Klien Tercecer & Uang Terhambat",
    beforeDesc: "Lupa menagih faktur yang sudah lewat jatuh tempo karena tidak ada pengingat. Uang usaha tertahan lama di pelanggan, bikin arus kas operasional tersendat.",
    afterTitle: "Tagihan Terbayar Tepat Waktu, Kas Aman",
    afterDesc: "Pengingat tagihan terkirim otomatis sebelum jatuh tempo. Pelanggan bayar lebih cepat, arus kas perusahaan tetap sehat dan lancar.",
  },
  {
    beforeTitle: "Rekonsiliasi Bank Penuh Tebakan",
    beforeDesc: "Bingung mencocokkan mutasi rekening bank dengan pencatatan internal kasir. Selisih angka sering baru ketahuan saat audit atau akhir tahun.",
    afterTitle: "Kas & Rekening Bank Terbaca Transparan",
    afterDesc: "Pencatatan kas dan mutasi bank terhubung secara langsung. Setiap rupiah uang masuk dan keluar terlihat jelas sumber dan tujuannya.",
  },
];

export function ComparisonBeforeAfterSection({
  moduleName,
  customComparisons,
}: ComparisonBeforeAfterSectionProps) {
  const comparisons = customComparisons || defaultComparisons;

  return (
    <section className="bg-gradient-to-b from-background via-muted/20 to-background py-16 md:py-24 border-b border-border/80">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center mb-12 space-y-3"
        >
          <Badge variant="outline" className="rounded-full border-primary/30 text-primary font-semibold bg-primary/5 px-3.5 py-1">
            Studi Kasus Nyata
          </Badge>

          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Bandingkan: Manual vs <span className="text-gradient-primary">Pakai Siarpi</span>
          </h2>

          <p className="text-base text-muted-foreground leading-relaxed">
            Lihat bagaimana Siarpi membantu pemilik usaha menghemat waktu, mencegah kebocoran uang, dan membuat kerja tim jauh lebih tenang.
          </p>
        </motion.div>

        {/* Comparison Grid */}
        <div className="space-y-6 max-w-5xl mx-auto">
          {comparisons.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <Card className="overflow-hidden rounded-3xl border border-border/80 bg-card shadow-soft p-6 md:p-8">
                <div className="grid gap-6 md:grid-cols-12 md:items-center">
                  
                  {/* Left Column: Tanpa Siarpi (Cara Manual) */}
                  <div className="md:col-span-5 space-y-3 rounded-2xl border border-rose-200/60 bg-rose-50/40 p-5 dark:border-rose-950/40 dark:bg-rose-950/20">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                        <XCircle className="h-4 w-4" /> Tanpa Siarpi (Cara Lama)
                      </span>
                    </div>
                    <h3 className="font-display text-base font-bold text-foreground">
                      {item.beforeTitle}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.beforeDesc}
                    </p>
                  </div>

                  {/* Middle Arrow Connector */}
                  <div className="hidden md:flex md:col-span-2 items-center justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary shadow-xs">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Right Column: Dengan Siarpi (Praktis) */}
                  <div className="md:col-span-5 space-y-3 rounded-2xl border border-emerald-300/70 bg-emerald-50/50 p-5 dark:border-emerald-900/60 dark:bg-emerald-950/30">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4" /> Praktis Dengan Siarpi
                      </span>
                    </div>
                    <h3 className="font-display text-base font-bold text-foreground">
                      {item.afterTitle}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.afterDesc}
                    </p>
                  </div>

                </div>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
