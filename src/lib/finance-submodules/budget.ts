import type { FinanceSubModuleDetail } from "./types";

export const budget: FinanceSubModuleDetail = {
  id: "budget",
  name: "Perencanaan & Anggaran (Budgeting)",
  category: "Analitik & Pelaporan",
  tagline: "Rencanakan Anggaran Bisnis & Pantau Realisasi Real-Time",
  longDescription:
    "Sub-modul Budgeting memungkinkan Anda merencanakan alokasi dana untuk setiap departemen, proyek, dan akun COA. Sistem membandingkan anggaran rencana vs realisasi (Budget vs Actual), memberi variansi %, dan memberi peringatan ketika realisasi melebihi batas aman (alert threshold).",
  iconName: "PieChart",
  keyBenefits: [
    "Rencanakan anggaran per bulan, triwulan, atau tahun penuh",
    "Dashboard Budget vs Actual untuk semua departemen",
    "Alert otomatis saat belanja melebihi batas aman",
  ],
  features: [
    {
      title: "Budget Version Control",
      desc: "Buat versi anggaran (Revised, Initial, Forecast) & bandingkan.",
    },
    {
      title: "Realisasi vs Rencana",
      desc: "Lacak progres belanja tiap akun & departemen secara harian.",
    },
    {
      title: "Variance Analysis",
      desc: "Hitung % selisih anggaran vs realisasi dengan sinyal warna.",
    },
    { title: "Approval Budget Request", desc: "Ajukan penambahan anggaran via workflow approval." },
  ],
  workflowSteps: [
    {
      step: "01",
      title: "Rencanakan Anggaran Tahunan",
      desc: "Tentukan alokasi dana per departemen & akun COA.",
    },
    {
      step: "02",
      title: "Monitoring Realisasi",
      desc: "Dashboard live memperlihatkan belanja vs anggaran.",
    },
    {
      step: "03",
      title: "Analisis Variansi",
      desc: "Identifikasi departemen dengan overspending.",
    },
    {
      step: "04",
      title: "Adjust & Re-Forecast",
      desc: "Update anggaran jika terjadi perubahan rencana bisnis.",
    },
  ],
  frontendPath: "app/pages/finance/budget/*",
  backendPath: "siarpi-backend/finance/budget/*",
  sampleStats: [
    { label: "Anggaran Tahunan", value: "Rp 2.500.000.000", note: "FY 2026" },
    { label: "Realisasi Bulan Ini", value: "Rp 180.000.000", note: "7.2% dari total" },
    { label: "Departemen di Bawah Budget", value: "5/8 Unit", note: "Sehat" },
  ],
  sampleRows: [
    {
      code: "BDG-OPS-001",
      title: "Departemen Operasional",
      category: "COA 6000",
      amount: "Rp 45.000.000",
      status: "On Track",
    },
    {
      code: "BDG-MKT-002",
      title: "Departemen Marketing",
      category: "COA 6100",
      amount: "Rp 75.000.000",
      status: "Over Budget",
    },
    {
      code: "BDG-RND-003",
      title: "R&D / Inovasi",
      category: "COA 6200",
      amount: "Rp 60.000.000",
      status: "On Track",
    },
  ],
  faq: [
    {
      q: "Apakah bisa membuat laporan budget di format Excel?",
      a: "Ya! Semua anggaran dapat diekspor ke format XLSX siap presentasi.",
    },
    {
      q: "Bagaimana cara mengajukan revisi anggaran?",
      a: "Ajukan lewat menu Budget Request, lalu jalani workflow approval hirarki manajemen.",
    },
  ],
};
