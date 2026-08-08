import type { ModuleDetail } from "./types";

export const crm: ModuleDetail = {
  tagline: "Kelola pelanggan & leads, tutup deal lebih cepat",
  longDescription:
    "Pipeline penjualan visual, otomatisasi follow-up, dan riwayat lengkap interaksi pelanggan.",
  keyBenefits: [
    "Pantau pipeline penjualan visual dari lead hingga closing",
    "Kirim follow-up otomatis via Email & WhatsApp",
    "Riwayat pelanggan 360° dalam satu tampilan terpadu",
  ],
  features: [
    { title: "Sales Pipeline", desc: "Visual deal stages dari lead hingga closing." },
    { title: "Email & WhatsApp", desc: "Kirim broadcast & follow-up langsung dari CRM." },
    { title: "Customer 360°", desc: "Riwayat pembelian, tiket, dan komunikasi dalam satu view." },
    { title: "Sales Analytics", desc: "Conversion rate, sales velocity, dan forecast." },
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
    { q: "Bisa kirim WhatsApp blast?", a: "Ya, terintegrasi dengan WhatsApp Business API." },
    { q: "Ada mobile app untuk sales?", a: "Ya, sales bisa update deal langsung dari lapangan." },
  ],
};
