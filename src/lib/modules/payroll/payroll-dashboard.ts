import type { PayrollSubModuleDetail } from "./types";

export const payrollDashboard: PayrollSubModuleDetail = {
  id: "payroll",
  name: "Dashboard & Ringkasan Payroll",
  category: "Pusat Analitik & Penggajian",
  tagline: "Eksekutif dashboard estimasi pengeluaran gaji bulanan, statistik penggajian, & tren akumulasi tunjangan.",
  longDescription:
    "Sub-modul Dashboard Payroll memberikan visibilitas penuh bagi manajemen dan tim HR Finance untuk memantau total alokasi pengeluaran gaji perusahaan, perbandingan biaya antar-divisi, serta status kelancaran pembayaran gaji karyawan secara real-time.",
  iconName: "BarChart3",
  keyBenefits: [
    "Ringkasan grafik pengeluaran gaji bulanan & tahunan secara interaktif",
    "Analisis variansi biaya payroll vs anggaran perusahaan (budgeting)",
    "Notifikasi langsung untuk status approval Pay Run & jatuh tempo pembayaran",
  ],
  features: [
    {
      title: "Real-time Financial Summary",
      desc: "Lihat total gaji bersih (take home pay), total potongan pajak, dan iuran BPJS dalam satu tampilan.",
    },
    {
      title: "Breakdown Biaya per Divisi",
      desc: "Visualisasi distribusi anggaran gaji per departemen untuk efisiensi biaya operasional.",
    },
    {
      title: "Indikator Kepatuhan (Compliance Audit)",
      desc: "Pantau kepatuhan pelaporan PPh21 dan penyetoran BPJS secara periodik.",
    },
  ],
  workflowSteps: [
    { step: "01", title: "Pantau Estimasi", desc: "Sistem mengalkulasi estimasi beban gaji bulan berjalan." },
    { step: "02", title: "Review Tren Biaya", desc: "Bandingkan grafik pengeluaran dengan bulan sebelumnya." },
    { step: "03", title: "Eksekusi Pay Run", desc: "Jalankan pembayaran gaji setelah analisis disetujui." },
  ],
  frontendPath: "app/pages/payroll/index.vue",
  backendPath: "siarpi-backend/payroll/dashboard/*",
  sampleStats: [
    { label: "Total Payroll (Bulan Ini)", value: "Rp 245.800.000", note: "128 Karyawan" },
    { label: "Estimasi PPh21 TER", value: "Rp 18.450.000", note: "Otomatis terhitung" },
  ],
  sampleRows: [
    {
      code: "PAY-2026-08",
      title: "Penggajian Periode Agustus 2026",
      category: "Pay Run Utama",
      amount: "Rp 245.8M",
      status: "Ready",
    },
  ],
  faq: [
    {
      q: "Apakah data grafik dashboard payroll bisa diekspor ke Excel / PDF?",
      a: "Bisa, Anda dapat mengunduh laporan eksekutif penggajian kapan saja dalam format spreadsheet atau PDF.",
    },
  ],
};
