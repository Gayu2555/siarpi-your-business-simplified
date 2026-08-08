import type { FinanceSubModuleDetail } from "./types";

export const pajak: FinanceSubModuleDetail = {
  id: "pajak",
  name: "Manajemen Pajak (Taxation)",
  category: "Pajak & Valuta",
  tagline: "Otomatisasi Hitung PPN & PPh, Rekonsiliasi Pajak, & Siap Export e-Faktur",
  longDescription:
    "Sub-modul Pajak Siarpi menyederhanakan kewajiban perpajakan bisnis Anda. Kelola PPN Masukan & Keluaran, pembuatan bukti potong PPh 21, 23, 4(2), rekonsiliasi SPT, dan persiapan file CSV/JSON siap impor ke e-Faktur DJP.",
  iconName: "Percent",
  keyBenefits: [
    "Rekonsiliasi PPN Masukan vs Keluaran otomatis tanpa selisih",
    "Pembuatan Bukti Potong PPh 23 / PPh 4(2) instan saat transaksi",
    "Format data sesuai regulasi e-Faktur & DJP Online terbaru",
  ],
  features: [
    {
      title: "Faktur Pajak PPN",
      desc: "Penerbitan nomor Seri Faktur Pajak (NSFP) & validasi format.",
    },
    { title: "Bukti Potong PPh", desc: "Cetak bukti potong PPh 23/26 & PPh Final Pasal 4 ayat 2." },
    {
      title: "Rekonsiliasi Pajak vs GL",
      desc: "Cocokkan akun utang pajak di Buku Besar dengan rekap SPT.",
    },
    {
      title: "Export Siap e-Faktur",
      desc: "Unduh CSV format standar e-Faktur DJP dalam hitungan detik.",
    },
  ],
  workflowSteps: [
    {
      step: "01",
      title: "Recording Pajak Transaksi",
      desc: "Pajak terhitung otomatis saat transaksi diajukan.",
    },
    {
      step: "02",
      title: "Penerbitan Faktur / Bukpot",
      desc: "Generate nomor seri faktur & lembar bukti potong.",
    },
    {
      step: "03",
      title: "Rekonsiliasi Masa Pajak",
      desc: "Verifikasi PPN Masukan vs Keluaran bulanan.",
    },
    {
      step: "04",
      title: "Export CSV e-Faktur / SPT",
      desc: "File siap diunggah ke portal e-Faktur DJP Online.",
    },
  ],
  frontendPath: "app/pages/finance/pajak/*",
  backendPath: "siarpi-backend/finance/pajak/*",
  sampleStats: [
    { label: "PPN Keluaran Masa Ini", value: "Rp 98.400.000", note: "Terfaktur" },
    { label: "PPN Masukan Masa Ini", value: "Rp 64.200.000", note: "Dapat Dikreditkan" },
    { label: "PPN Kurang Bayar", value: "Rp 34.200.000", note: "Siap Setor" },
  ],
  sampleRows: [
    {
      code: "TAX-PPN-044",
      title: "Faktur Pajak Keluaran PT ABC",
      category: "PPN 11%",
      amount: "Rp 14.300.000",
      status: "Verified",
    },
    {
      code: "TAX-PPH-019",
      title: "Bukti Potong PPh 23 Jasa Konsultan",
      category: "PPh 23 (2%)",
      amount: "Rp 1.200.000",
      status: "Generated",
    },
    {
      code: "TAX-PPN-038",
      title: "Faktur Pajak Masukan PT Supplier",
      category: "PPN Masukan",
      amount: "Rp 8.700.000",
      status: "Credited",
    },
  ],
  faq: [
    {
      q: "Apakah tarif PPN otomatis mengikuti aturan 11% / 12%?",
      a: "Ya! Tarif pajak dapat dikonfigurasi dan otomatis menyesuaikan regulasi pemerintah.",
    },
    {
      q: "Apakah bisa langsung ekspor ke e-Faktur?",
      a: "Bisa, format CSV sesuai dengan skema impor e-Faktur DJP terbaru.",
    },
  ],
};
