import type { ModuleDetail } from "./types";

export const pos: ModuleDetail = {
  tagline: "Kasir modern untuk toko & resto Anda",
  longDescription:
    "POS yang ringan, cepat, dan terintegrasi dengan inventory & finance. Cocok untuk retail, F&B, dan jasa.",
  keyBenefits: [
    "Transaksi kasir kilat dengan scan barcode & multi-pembayaran",
    "Stok otomatis terpotong & jurnal keuangan langsung tercatat",
    "Struk cetak thermal / struk digital via Email & WhatsApp",
  ],
  features: [
    { title: "Transaksi Cepat", desc: "Scan barcode, hitung total, terima bayar dalam detik." },
    { title: "Multi Pembayaran", desc: "Cash, debit, kredit, QRIS, e-wallet—semua didukung." },
    { title: "Cetak Struk", desc: "Print thermal atau kirim struk digital via email/WA." },
    { title: "Laporan Penjualan", desc: "Per jam, per produk, per kasir—real-time." },
  ],
  mockup: {
    title: "Penjualan Hari Ini",
    subtitle: "Cabang Sudirman • Live",
    stats: [
      { label: "Omzet", value: "Rp 8.4jt", tone: "primary" },
      { label: "Transaksi", value: "142", tone: "accent" },
      { label: "Avg", value: "Rp 59rb", tone: "muted" },
    ],
    rows: [
      { label: "Order #00142", sub: "QRIS • 12:34", value: "Rp 87.000" },
      { label: "Order #00141", sub: "Cash • 12:30", value: "Rp 45.000" },
      { label: "Order #00140", sub: "Debit • 12:28", value: "Rp 124.000" },
    ],
  },
  testimonials: [
    {
      name: "Pak Bambang",
      role: "Owner",
      company: "Warung Bakso Mantap",
      rating: 5,
      quote: "Antrian lebih cepat, pelanggan happy. Omzet naik 20%.",
    },
    {
      name: "Ko Andi",
      role: "Manager",
      company: "Toko Elektronik",
      rating: 5,
      quote: "Stok update otomatis tiap transaksi. Tidak ada lagi selisih.",
    },
  ],
  faq: [
    { q: "Butuh hardware khusus?", a: "Cukup tablet/laptop. Printer & scanner opsional." },
    { q: "Bisa offline saat internet mati?", a: "Ya, transaksi tetap jalan dan sync saat online." },
  ],
};
