import type { ModuleDetail } from "./types";

export const production: ModuleDetail = {
  tagline: "Produksi lebih terencana, biaya dan hasil tetap terkendali",
  longDescription:
    "Kelola formula produk, kebutuhan material, aktivitas work center, hasil produksi, dan biaya dalam satu alur yang dapat ditelusuri.",
  keyBenefits: [
    "Rencanakan kebutuhan bahan langsung dari Bill of Materials",
    "Pantau progres setiap pesanan dan operasi produksi",
    "Ukur biaya, kualitas, scrap, dan efektivitas work center",
  ],
  features: [
    {
      title: "Bill of Materials Bertingkat",
      desc: "Susun komponen dan sub-rakitan untuk setiap produk secara terstruktur.",
    },
    {
      title: "Kebutuhan & Ketersediaan Bahan",
      desc: "Periksa kebutuhan material dan kesiapan stok sebelum produksi dimulai.",
    },
    {
      title: "BOM Explosion & Used-In",
      desc: "Telusuri seluruh turunan komponen serta produk yang menggunakan suatu material.",
    },
    {
      title: "Kalkulasi Biaya Produksi",
      desc: "Hitung biaya material dan riwayat perubahan biaya untuk evaluasi HPP.",
    },
    {
      title: "Pesanan Produksi",
      desc: "Buat, jadwalkan, dan pantau status pesanan dari rencana hingga selesai.",
    },
    {
      title: "Konsumsi Material",
      desc: "Catat pemakaian bahan aktual dan pergerakan stok selama proses produksi.",
    },
    {
      title: "Pencatatan Barang Jadi",
      desc: "Catat hasil produksi dan penerimaan barang jadi ke persediaan.",
    },
    {
      title: "Work Center & Antrean Kerja",
      desc: "Kelola kapasitas, jadwal, kalender, dan urutan pekerjaan setiap pusat kerja.",
    },
    {
      title: "Operasi & Quality Check",
      desc: "Mulai atau selesaikan operasi dan dokumentasikan pemeriksaan kualitas.",
    },
    {
      title: "Scrap & Pembongkaran",
      desc: "Kelola material terbuang serta pembongkaran produk jadi dengan jejak transaksi.",
    },
    {
      title: "Analisis OEE",
      desc: "Ukur availability, performance, dan quality untuk menilai efektivitas produksi.",
    },
    {
      title: "Laporan Produksi",
      desc: "Tinjau konsumsi bahan, hasil jadi, biaya, dan performa operasional.",
    },
  ],
  mockup: {
    title: "Kendali Produksi",
    subtitle: "Pesanan, material, dan work center dalam satu tampilan",
    stats: [
      { label: "Order Aktif", value: "18", tone: "primary" },
      { label: "Selesai", value: "94%", tone: "accent" },
      { label: "OEE", value: "87%", tone: "muted" },
    ],
    rows: [
      { label: "MO-2026-0184", sub: "Meja Kerja Oak", value: "Dalam Proses" },
      { label: "MO-2026-0183", sub: "Kursi Ergonomis", value: "Quality Check" },
      { label: "MO-2026-0182", sub: "Rak Modular", value: "Selesai" },
    ],
  },
  testimonials: [],
  faq: [
    {
      q: "Apakah Production dapat memakai data stok?",
      a: "Ya. Material, gudang, konsumsi bahan, dan hasil jadi dirancang terhubung dengan alur persediaan.",
    },
    {
      q: "Apakah biaya produksi dapat dihitung dari BOM?",
      a: "Ya. Sistem menyediakan cost rollup untuk menghitung biaya berdasarkan struktur material.",
    },
  ],
};
