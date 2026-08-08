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
    { title: "Multi Gudang", desc: "Kelola stok di banyak lokasi dengan transfer mudah." },
    { title: "Auto Reorder", desc: "Notifikasi otomatis saat stok mendekati batas minimum." },
    { title: "Barcode & SKU", desc: "Scan barcode untuk input/output cepat & akurat." },
    { title: "Stock Opname", desc: "Audit fisik vs sistem dengan selisih otomatis." },
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
      q: "Bisa konek ke marketplace?",
      a: "Ya, sinkronisasi dengan Tokopedia, Shopee, dan Lazada.",
    },
    { q: "Mendukung barcode scanner?", a: "Ya, USB scanner & kamera HP via aplikasi mobile." },
  ],
};
