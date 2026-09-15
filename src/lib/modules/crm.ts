import type { ModuleDetail } from "./types";

export const crm: ModuleDetail = {
  tagline: "Kelola pelanggan & leads, tutup deal lebih cepat",
  longDescription:
    "Pipeline penjualan visual, otomatisasi follow-up, dan riwayat lengkap interaksi pelanggan.",
  keyBenefits: [
    "Pantau pipeline penjualan visual dari lead hingga closing",
    "Kelola aktivitas, tugas, email, dan jadwal follow-up sales",
    "Riwayat pelanggan 360 derajat dalam satu tampilan terpadu",
  ],
  features: [
    {
      title: "Database Pelanggan",
      desc: "Satukan perusahaan, pelanggan, dan kontak dalam data yang terstruktur.",
    },
    {
      title: "Customer 360 Derajat",
      desc: "Lihat profil, kontak, deal, tugas, dan komunikasi pelanggan dalam satu tampilan.",
    },
    {
      title: "Lead & Prospek",
      desc: "Kelola prospek baru dan ubah lead yang memenuhi syarat menjadi deal.",
    },
    {
      title: "Sales Pipeline",
      desc: "Pantau deal berdasarkan stage penjualan yang dapat disesuaikan.",
    },
    {
      title: "Status Won & Lost",
      desc: "Dokumentasikan hasil deal beserta alasan untuk evaluasi penjualan.",
    },
    {
      title: "Price Book",
      desc: "Susun daftar harga dan gunakan produk sebagai line item dalam deal.",
    },
    {
      title: "Tugas & Follow-Up",
      desc: "Buat tugas, status khusus, tenggat, dan pengingat tindak lanjut.",
    },
    {
      title: "Email & Catatan",
      desc: "Dokumentasikan komunikasi dan kirim email melalui koneksi Gmail atau Outlook.",
    },
    { title: "Jadwal Meeting", desc: "Buat agenda pertemuan yang terhubung dengan aktivitas CRM." },
    {
      title: "Target & Laporan Sales",
      desc: "Pantau target, aktivitas pipeline, dan performa penjualan tim.",
    },
  ],
  mockup: {
    title: "Sales Pipeline",
    subtitle: "Q2 2026",
    stats: [
      { label: "Total Deal", value: "Rp 2.4M", tone: "primary" },
      { label: "Closed", value: "Rp 680jt", tone: "accent" },
      { label: "Win Rate", value: "32%", tone: "muted" },
    ],
    rows: [
      { label: "PT Solusi Cepat", sub: "Negotiation", value: "Rp 180.000.000" },
      { label: "CV Mitra Bersama", sub: "Proposal", value: "Rp 95.000.000" },
      { label: "Toko Online Maju", sub: "Qualified", value: "Rp 45.000.000" },
    ],
  },
  testimonials: [
    {
      name: "Reza Pratama",
      role: "Sales Director",
      company: "PT Solusi B2B",
      rating: 5,
      quote: "Conversion rate naik 40% sejak pakai pipeline visual ini.",
    },
    {
      name: "Indah Sari",
      role: "Account Manager",
      company: "Digital Agency",
      rating: 5,
      quote: "Follow-up otomatis menghemat 2 jam per hari per sales.",
    },
  ],
  faq: [
    {
      q: "Apakah stage pipeline bisa disesuaikan?",
      a: "Ya. Pipeline dan stage penjualan dapat dikonfigurasi sesuai proses sales perusahaan.",
    },
    {
      q: "Apakah email dapat dikirim dari CRM?",
      a: "Ya. Pengiriman email tersedia melalui akun Gmail atau Outlook yang terhubung.",
    },
  ],
};
