import type { ModuleDetail } from "./types";

export const invoice: ModuleDetail = {
  tagline: "Tagih pelanggan otomatis, terima bayaran cepat",
  longDescription:
    "Buat invoice profesional dalam hitungan detik, kirim via email/WhatsApp, dan terima pembayaran via transfer/QRIS/VA.",
  keyBenefits: [
    "Buat & kirim invoice profesional via WhatsApp/Email 1 klik",
    "Terima pembayaran instan via QRIS, Virtual Account, & Bank",
    "Reminder penagihan otomatis untuk piutang tepat waktu",
  ],
  features: [
    { title: "Template Cantik", desc: "Invoice profesional dengan logo & branding Anda." },
    { title: "Recurring Invoice", desc: "Tagihan berlangganan otomatis tiap periode." },
    { title: "Payment Link", desc: "Pelanggan bayar via QRIS/VA langsung dari invoice." },
    { title: "Reminder Otomatis", desc: "Follow-up tagihan jatuh tempo via email & WA." },
  ],
  mockup: {
    title: "Invoice Bulan Ini",
    subtitle: "Total 84 invoice terkirim",
    stats: [
      { label: "Lunas", value: "62", tone: "primary" },
      { label: "Pending", value: "18", tone: "accent" },
      { label: "Overdue", value: "4", tone: "muted" },
    ],
    rows: [
      { label: "INV-2026-0084", sub: "PT Solusi Cepat", value: "Rp 12.500.000" },
      { label: "INV-2026-0083", sub: "CV Mitra Jaya", value: "Rp 4.200.000" },
      { label: "INV-2026-0082", sub: "Toko Online Sukses", value: "Rp 8.900.000" },
    ],
  },
  testimonials: [
    {
      name: "Pak Anton",
      role: "Owner",
      company: "Konsultan IT",
      rating: 5,
      quote: "Cashflow lebih lancar karena reminder otomatis. Klien bayar lebih cepat.",
    },
    {
      name: "Mbak Lia",
      role: "Admin",
      company: "PT Distribusi",
      rating: 5,
      quote: "Buat invoice 50 klien sekarang cuma 10 menit.",
    },
  ],
  faq: [
    {
      q: "Bisa kirim invoice via WhatsApp?",
      a: "Ya, satu klik untuk kirim PDF + payment link via WA.",
    },
    { q: "Mendukung mata uang asing?", a: "Ya, multi-currency dengan kurs auto-update." },
  ],
};
