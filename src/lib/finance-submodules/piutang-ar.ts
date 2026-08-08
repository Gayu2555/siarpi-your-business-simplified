import type { FinanceSubModuleDetail } from "./types";

export const piutangAr: FinanceSubModuleDetail = {
  id: "piutang-ar",
  name: "Faktur Penjualan & Piutang (AR)",
  category: "Operasional Transaksi",
  tagline: "Percepat Pelunasan Tagihan Klien & Cegah Piutang Macet Secara Otomatis",
  longDescription:
    "Kelola penerbitan AR Invoice, pemantauan tanggal jatuh tempo, kirim pengingat pembayaran otomatis, hingga analisis umur piutang (AR Aging) untuk menjaga arus kas perusahaan tetap sehat.",
  iconName: "Receipt",
  keyBenefits: [
    "Kirim invoice digital profesional lengkap dengan QRIS & link bayar",
    "Analisis Umur Piutang (AR Aging Schedule) 30, 60, 90+ hari",
    "Notifikasi pengingat otomatis sebelum & saat jatuh tempo",
  ],
  features: [
    {
      title: "Penerbitan AR Invoice",
      desc: "Buat faktur penjualan dengan PPN/PPh terhitung otomatis.",
    },
    {
      title: "Penerimaan Pelunasan AR",
      desc: "Catat pembayaran parsial atau lunas dari pelanggan.",
    },
    {
      title: "Retur Penjualan & Credit Note",
      desc: "Penerbitan nota kredit otomatis memotong sisa tagihan piutang.",
    },
    {
      title: "Kredit Limit Pelanggan",
      desc: "Cegah transaksi baru jika pelanggan melampaui batas kredit.",
    },
  ],
  workflowSteps: [
    {
      step: "01",
      title: "Terbitkan AR Invoice",
      desc: "Faktur dibuat otomatis dari Sales Order atau manual.",
    },
    {
      step: "02",
      title: "Kirim ke Pelanggan",
      desc: "Kirim PDF Invoice via WhatsApp & Email dengan QR Code.",
    },
    {
      step: "03",
      title: "Notifikasi Jatuh Tempo",
      desc: "Sistem mengingatkan pelanggan secara otomatis.",
    },
    {
      step: "04",
      title: "Penerimaan & Matching",
      desc: "Pelunasan memotong saldo AR dan mengupdate Kas.",
    },
  ],
  frontendPath: "app/pages/finance/piutang/*",
  backendPath: "siarpi-backend/finance/ar/*",
  sampleStats: [
    { label: "Total Piutang Aktif", value: "Rp 340.000.000", note: "18 Pelanggan" },
    { label: "Belum Jatuh Tempo", value: "Rp 280.000.000", note: "< 30 Hari" },
    { label: "Piutang Berisiko", value: "Rp 15.000.000", note: "> 60 Hari" },
  ],
  sampleRows: [
    {
      code: "INV-2026-088",
      title: "PT Teknologi Nusantara",
      category: "Sales Invoice",
      amount: "Rp 88.000.000",
      status: "Unpaid",
    },
    {
      code: "INV-2026-074",
      title: "CV Karsa Bersama",
      category: "Partial Payment",
      amount: "Rp 35.000.000",
      status: "Partial",
    },
    {
      code: "INV-2026-061",
      title: "PT Mitra Sejahtera",
      category: "Sales Invoice",
      amount: "Rp 120.000.000",
      status: "Paid",
    },
  ],
  faq: [
    {
      q: "Apakah ada fitur reminder tagihan otomatis?",
      a: "Ya! Pengingat otomatis dapat dikirimkan melalui WhatsApp / Email.",
    },
    {
      q: "Bisakah mengatur diskon pembayaran cepat (Early Bird)?",
      a: "Tentu, mendukung term pembayaran seperti 2/10 n/30.",
    },
  ],
};
