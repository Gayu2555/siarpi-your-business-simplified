import type { HrSubModuleDetail } from "./types";

export const payrollDashboard: HrSubModuleDetail = {
  id: "payroll",
  name: "Dashboard Payroll",
  category: "Payroll",
  tagline: "Summary total pengeluaran gaji bulanan & grafik estimasi.",
  longDescription:
    "Dashboard Payroll memberikan gambaran real-time atas seluruh pengeluaran gaji bulanan perusahaan. Lihat rincian total gaji, pajak, BPJS, potongan, serta gambaran tren biaya gaji dari waktu ke waktu.",
  iconName: "BarChart3",
  keyBenefits: [
    "Ringkasan pengeluaran gaji bulanan real-time",
    "Grafik tren biaya gaji & komparasi tahun ke tahun",
    "Peringatan dini (alert) atas outlier atau anggaran overflow",
  ],
  features: [
    {
      title: "Komponsasi Total Real-time",
      desc: "Lihat total pengeluaran gaji & komponen utamanya di satu tampilan.",
    },
    {
      title: "Grafik Tren Bulanan",
      desc: "Visualisasi tren gaji karyawan, tambahan, dan potongan.",
    },
    {
      title: "Estimasi Payday",
      desc: "Alokasikan perkiraan biaya untuk siklus payroll berikutnya.",
    },
    {
      title: "Alert Anggaran",
      desc: "Notifikasi otomatis bila payroll melebihi budget yang ditetapkan.",
    },
  ],
  workflowSteps: [
    {
      step: "01",
      title: "Monitoring Total Gaji",
      desc: "Dashboard menampilkan agregat gaji yang harus dibayarkan.",
    },
    {
      step: "02",
      title: "Analisis Komponen",
      desc: "Pecahkan biaya gaji per departemen, per jenis, & per variabel.",
    },
    {
      step: "03",
      title: "Estimasi Berikutnya",
      desc: "Memprediksi biaya payroll berikutnya berdasarkan data historis.",
    },
    {
      step: "04",
      title: "Alert Budget Overflow",
      desc: "Memberi tahu jika perkiraan payroll melebihi threshold yang ditetapkan.",
    },
  ],
  frontendPath: "app/pages/payroll/dashboard/*",
  backendPath: "siarpi-backend/payroll/dashboard/*",
  sampleStats: [
    { label: "Total Gaji Bulan Ini", value: "Rp 2.150.000.000", note: "152 Karyawan" },
    { label: "Pajak (PPh21)", value: "Rp 280.000.000", note: "13% dari total" },
    { label: "Potongan & BPJS", value: "Rp 134.000.000", note: "6.2% dari total" },
    { label: "Estimasi Bulan Depan", value: "Rp 2.210.000.000", note: "+2.8% proyeksi" },
  ],
  sampleRows: [
    {
      code: "PAY-001",
      title: "Total Gaji Kotor",
      category: "Brutto",
      amount: "Rp 2.150.000.000",
      status: "Final",
    },
    {
      code: "PAY-002",
      title: "Potongan PPh21",
      category: "Pajak",
      amount: "-Rp 280.000.000",
      status: "Final",
    },
    {
      code: "PAY-003",
      title: "Potongan BPJS",
      category: "BPJS",
      amount: "-Rp 95.000.000",
      status: "Final",
    },
    {
      code: "PAY-004",
      title: "Gaji Bersih Dibayarkan",
      category: "Netto",
      amount: "Rp 1.775.000.000",
      status: "Final",
    },
  ],
  faq: [
    {
      q: "Apakah dashboard ini real-time?",
      a: "Ya, dashboard selalu ter-update saat transaksi baru diposting ke payroll engine.",
    },
    {
      q: "Apakah bisa filter per departemen?",
      a: "Ya, Anda dapat memfilter biaya gaji per departemen, grade level, atau status kontrak.",
    },
  ],
};
