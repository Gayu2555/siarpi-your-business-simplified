import type { FinanceSubModuleDetail } from "./types";

export const kasBank: FinanceSubModuleDetail = {
  id: "kas-bank",
  name: "Kas & Bank",
  category: "Operasional Transaksi",
  tagline: "Kelola Aliran Kas Masuk, Kas Keluar, & Rekonsiliasi Bank Tanpa Selisih",
  longDescription:
    "Sub-modul Kas & Bank memberikan kontrol penuh atas likuiditas perusahaan. Pantau saldo Kas Kecil (Petty Cash), rekening bank utama, transfer antar bank, dan rekonsiliasi otomatis dengan mutasi bank.",
  iconName: "Building2",
  keyBenefits: [
    "Pantau saldo kas & rekening bank multi-cabang secara real-time",
    "Rekonsiliasi otomatis matching mutasi bank vs pencatatan internal",
    "Otorisasi bertingkat untuk pengeluaran kas bernilai besar",
  ],
  features: [
    {
      title: "Manajemen Multi-Rekening",
      desc: "Kelola puluhan rekening BCA, Mandiri, BRI, BNI, dan bank internasional dalam 1 tempat.",
    },
    {
      title: "Transfer Antar Rekening",
      desc: "Catat perpindahan dana antar bank internal secara otomatis berpasangan.",
    },
    {
      title: "Petty Cash Control",
      desc: "Kelola kas kecil operasional dengan batasan saldo & bukti kwitansi digital.",
    },
    {
      title: "Histori Mutation Log",
      desc: "Rekaman mutasi kas masuk/keluar terpisah per sumber transaksi.",
    },
  ],
  workflowSteps: [
    {
      step: "01",
      title: "Penerimaan / Pengeluaran",
      desc: "Input voucher kas atau sync transaksi pembayaran.",
    },
    {
      step: "02",
      title: "Approval Manajer",
      desc: "Verifikasi pengeluaran kas sesuai batas wewenang.",
    },
    {
      step: "03",
      title: "Auto-Posting Kas/Bank",
      desc: "Saldo bank dan jurnal GL diperbarui seketika.",
    },
    {
      step: "04",
      title: "Rekonsiliasi Bulanan",
      desc: "Cocokkan dengan rekening koran bank tanpa selisih.",
    },
  ],
  frontendPath: "app/pages/finance/kas-bank/*",
  backendPath: "siarpi-backend/finance/cashbank/*",
  sampleStats: [
    { label: "Total Likuiditas Kas", value: "Rp 850.400.000", note: "5 Rekening Bank" },
    { label: "Kas Kecil (Petty Cash)", value: "Rp 12.500.000", note: "Terverifikasi" },
    { label: "Rekonsiliasi Bank", value: "99.8%", note: "Matched" },
  ],
  sampleRows: [
    {
      code: "CB-OUT-089",
      title: "Bayar Tagihan Listrik & Internet",
      category: "BCA Utama",
      amount: "Rp 8.450.000",
      status: "Approved",
    },
    {
      code: "CB-IN-104",
      title: "Penerimaan Pelunasan Invoice PT ABC",
      category: "Mandiri Giro",
      amount: "Rp 45.000.000",
      status: "Verified",
    },
    {
      code: "CB-TRF-012",
      title: "Transfer Kas Utama ke Petty Cash",
      category: "Internal Transfer",
      amount: "Rp 5.000.000",
      status: "Completed",
    },
  ],
  faq: [
    {
      q: "Apakah mendukung rekonsiliasi file CSV dari bank?",
      a: "Ya! Anda dapat mengunggah mutasi format CSV dari M-Banking BCA, Mandiri, dll.",
    },
    {
      q: "Bagaimana dengan pengeluaran kas kecil?",
      a: "Siarpi mendukung metode Imprest maupun Fluctuating Fund untuk Petty Cash.",
    },
  ],
};
