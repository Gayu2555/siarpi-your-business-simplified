import type { ModuleDetail } from "./types";

export const inventory: ModuleDetail = {
  tagline: "Stok real-time dari gudang ke kasir",
  longDescription:
    "Lacak stok antar gudang, otomatisasi reorder, dan kurangi kerugian akibat kehabisan stok atau overstock.",
  keyBenefits: [
    "Pantau stok barang real-time di semua cabang & gudang",
    "Notifikasi otomatis saat stok menipis (auto reorder)",
    "Stock opname kilat dengan barcode scanner",
  ],
  features: [
    {
      title: "Master Produk",
      desc: "Kelola identitas, kategori, SKU, dan informasi dasar setiap barang.",
    },
    {
      title: "Stok Real-Time",
      desc: "Pantau jumlah dan posisi persediaan berdasarkan transaksi yang tercatat.",
    },
    {
      title: "Multi Gudang & Bin",
      desc: "Kelola stok di beberapa gudang hingga lokasi penyimpanan yang lebih spesifik.",
    },
    {
      title: "Transfer Antar-Gudang",
      desc: "Pindahkan persediaan antar lokasi dengan riwayat pergerakan yang jelas.",
    },
    { title: "Penerimaan Barang", desc: "Catat barang masuk beserta jumlah aktual yang diterima." },
    {
      title: "Penyesuaian Stok",
      desc: "Koreksi selisih persediaan dengan alasan dan jejak perubahan.",
    },
    {
      title: "Stock Opname",
      desc: "Bandingkan stok fisik dengan sistem dan dokumentasikan hasil hitung.",
    },
    {
      title: "Pelacakan Kedaluwarsa",
      desc: "Pantau tanggal kedaluwarsa untuk membantu prioritas penggunaan stok.",
    },
    { title: "Forecast & Restock", desc: "Tinjau kebutuhan stok dan rekomendasi pengadaan ulang." },
    {
      title: "Laporan Persediaan",
      desc: "Analisis posisi stok serta riwayat barang masuk, keluar, dan berpindah.",
    },
  ],
  mockup: {
    title: "Stok Real-time",
    subtitle: "3 gudang aktif",
    stats: [
      { label: "Total SKU", value: "1.284", tone: "primary" },
      { label: "Low Stock", value: "23", tone: "accent" },
      { label: "Out", value: "4", tone: "muted" },
    ],
    rows: [
      { label: "Kopi Arabika 250g", sub: "SKU-A001", value: "428 pcs" },
      { label: "Kopi Robusta 500g", sub: "SKU-R002", value: "12 pcs" },
      { label: "Mug Keramik", sub: "SKU-M003", value: "0 pcs" },
    ],
  },
  testimonials: [
    {
      name: "Pak Joko",
      role: "Warehouse Manager",
      company: "Toko Sembako Berkah",
      rating: 5,
      quote: "Tidak ada lagi kehabisan stok mendadak. Reorder otomatis sangat membantu.",
    },
    {
      name: "Mbak Dewi",
      role: "Owner",
      company: "Boutique Anggun",
      rating: 5,
      quote: "Stock opname yang dulu 2 hari sekarang cuma 2 jam.",
    },
  ],
  faq: [
    {
      q: "Apakah dapat mengelola lebih dari satu gudang?",
      a: "Ya. Stok dapat dipantau per gudang dan lokasi penyimpanan, termasuk transfer antar-gudang.",
    },
    {
      q: "Apakah tersedia stock opname?",
      a: "Ya. Tim dapat mencatat hasil hitung fisik dan meninjau selisih terhadap stok sistem.",
    },
  ],
};
