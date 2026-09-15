import type { ModuleDetail } from "./types";

export const procurement: ModuleDetail = {
  tagline: "Pengadaan transparan dari permintaan sampai barang diterima",
  longDescription:
    "Satukan permintaan pembelian, tender vendor, purchase order, penerimaan, dan evaluasi pemasok dalam proses yang tertib dan mudah diaudit.",
  keyBenefits: [
    "Kontrol permintaan pembelian melalui alur persetujuan",
    "Bandingkan penawaran vendor secara lebih objektif",
    "Hubungkan purchase order dengan penerimaan dan pemeriksaan barang",
  ],
  features: [
    {
      title: "Purchase Request",
      desc: "Catat kebutuhan pembelian lengkap dengan item, jumlah, dan alasan permintaan.",
    },
    {
      title: "Approval Bertahap",
      desc: "Kelola submit, persetujuan, penolakan, dan pembatalan secara terdokumentasi.",
    },
    {
      title: "Request for Quotation",
      desc: "Undang dan kelola penawaran beberapa vendor untuk kebutuhan yang sama.",
    },
    {
      title: "Perbandingan Penawaran",
      desc: "Bandingkan harga dan penawaran sebelum menentukan vendor pemenang.",
    },
    {
      title: "Purchase Order",
      desc: "Konversi permintaan atau hasil tender menjadi pesanan pembelian resmi.",
    },
    {
      title: "Penerimaan Barang",
      desc: "Cocokkan barang yang diterima dengan purchase order dan jumlah aktual.",
    },
    {
      title: "Quality Control",
      desc: "Dokumentasikan hasil pemeriksaan kualitas saat proses penerimaan.",
    },
    {
      title: "Database Vendor",
      desc: "Kelola informasi pemasok yang digunakan dalam proses pengadaan.",
    },
    {
      title: "Penilaian Vendor",
      desc: "Evaluasi performa vendor berdasarkan hasil penerimaan barang.",
    },
    {
      title: "Laporan Pengadaan",
      desc: "Pantau nilai pembelian, aktivitas vendor, dan pola pengeluaran pengadaan.",
    },
  ],
  mockup: {
    title: "Procure-to-Receive",
    subtitle: "Permintaan, tender, PO, dan penerimaan",
    stats: [
      { label: "PR Menunggu", value: "12", tone: "primary" },
      { label: "RFQ Aktif", value: "7", tone: "accent" },
      { label: "PO Bulan Ini", value: "48", tone: "muted" },
    ],
    rows: [
      { label: "PR-2026-0148", sub: "Bahan baku produksi", value: "Menunggu Approval" },
      { label: "RFQ-2026-0063", sub: "3 vendor mengajukan", value: "Evaluasi" },
      { label: "PO-2026-0219", sub: "PT Mitra Industri", value: "Dikirim" },
    ],
  },
  testimonials: [],
  faq: [
    {
      q: "Bisakah PR dikonversi menjadi RFQ atau PO?",
      a: "Ya. Permintaan yang disetujui dapat dilanjutkan ke tender RFQ atau langsung menjadi purchase order.",
    },
    {
      q: "Bagaimana penilaian vendor dihitung?",
      a: "Penilaian menggunakan data penerimaan dan hasil quality control agar evaluasi memiliki dasar operasional.",
    },
  ],
};
