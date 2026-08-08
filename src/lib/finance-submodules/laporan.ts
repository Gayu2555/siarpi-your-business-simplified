import type { FinanceSubModuleDetail } from "./types";

export const laporan: FinanceSubModuleDetail = {
  id: "laporan",
  name: "Laporan Keuangan Standar",
  category: "Analitik & Pelaporan",
  tagline: "Akses Semua Laporan Keuangan Kunci Siap Unduh PDF & Excel",
  longDescription:
    "Kumpulkan seluruh laporan keuangan wajib perusahaan dalam satu paket. Mulai dari Neraca, Laporan Laba/Rugi, Laporan Arus Kas, Laporan Perubahan Ekuitas, hingga laporan analisis keuangan (ratio, cash flow trends). Semua laporan dapat diekspor ke PDF, Excel, & format presentasi siap akuntan/audit.",
  iconName: "FileText",
  keyBenefits: [
    "Neraca, Laporan Laba/Rugi & Laporan Arus Kas otomatis tersedia tiap akhir bulan",
    "Ekspor ke PDF, Excel, & PPT profesional",
    "Audit Trail & perbandingan data sumber tersertifikasi",
  ],
  features: [
    {
      title: "Neraca (Balance Sheet)",
      desc: "Laporan posisi keuangan aktiva, kewajiban, ekuitas.",
    },
    { title: "Laporan Laba/Rugi", desc: "Pendapatan, beban, & laba bersih periode berjalan." },
    { title: "Laporan Arus Kas", desc: "Cash flow dari aktivitas operasi, inve, & pendanaan." },
    {
      title: "Laporan Perubahan Ekuitas",
      desc: "Perubahan modal, laba ditahan, & distribusi dividen.",
    },
    {
      title: "Rekap Investasi & Pendanaan",
      desc: "Aktivitas beli aset & penanaman dana perusahaan.",
    },
  ],
  workflowSteps: [
    {
      step: "01",
      title: "Tutup Periode Akuntansi",
      desc: "Sistem menghitung ulang seluruh jurnal bulanan.",
    },
    {
      step: "02",
      title: "Generate Laporan Kunci",
      desc: "Neraca, Laporan Rugi, & Arus Kas dibuat otomatis.",
    },
    {
      step: "03",
      title: "Verifikasi & Approval",
      desc: "Disetujui oleh auditor / manajer keuangan.",
    },
    {
      step: "04",
      title: "Ekspor & Distribusi",
      desc: "File siap PDF/XLSX dikirim ke pemangku kepentingan.",
    },
  ],
  frontendPath: "app/pages/finance/laporan/*",
  backendPath: "siarpi-backend/finance/reporting/*",
  sampleStats: [
    { label: "Total Asstes", value: "Rp 2.750.000.000", note: "Akhir Bulan" },
    { label: "Total Liabilities", value: "Rp 1.480.000.000", note: "Akhir Bulan" },
    { label: "Equity", value: "Rp 1.270.000.000", note: "Akhir Bulan" },
    { label: "Net Profit", value: "Rp 180.000.000", note: "Bulan ini" },
  ],
  sampleRows: [
    {
      code: "FS-BS",
      title: "Neraca atau Balance Sheet",
      category: "Posisi Keuangan",
      amount: "Rp 2.750.000.000",
      status: "Final",
    },
    {
      code: "FS-IS",
      title: "Laporan Laba/Rugi",
      category: "Kinerja Keuangan",
      amount: "Rp 180.000.000",
      status: "Final",
    },
    {
      code: "FS-CF",
      title: "Laporan Arus Kas",
      category: "Likuiditas",
      amount: "Rp 95.000.000",
      status: "Final",
    },
    {
      code: "FS-EQ",
      title: "Laporan Perubahan Ekuitas",
      category: "Ekuitas",
      amount: "Rp 1.270.000.000",
      status: "Final",
    },
  ],
  faq: [
    {
      q: "Seberapa sering laporan ini dihasilkan?",
      a: "Laporan keuangan standar biasanya dihasilkan secara bulanan atau triwulanan.",
    },
    {
      q: "Apakah laporan sudah siap untuk audit eksternal?",
      a: "Ya, semua laporan disertai Audit Trail & source reference.",
    },
  ],
};
