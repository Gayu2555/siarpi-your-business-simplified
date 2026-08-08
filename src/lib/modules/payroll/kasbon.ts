import type { PayrollSubModuleDetail } from "./types";

export const kasbon: PayrollSubModuleDetail = {
  id: "kasbon",
  name: "Pinjaman / Kasbon",
  category: "Deductions",
  tagline: "Pengajuan pinjaman karyawan & potongan otomatis di payroll.",
  longDescription:
    "Sub-modul Kasbon mengelola seluruh proses peminjaman dana dari perusahaan ke karyawan. Setiap kasbon yang disetujui akan otomatis dipotong di slip gaji selanjutnya dengan jadwal cicilan yang fleksibel.",
  iconName: "Banknote",
  keyBenefits: [
    "Ajukan kasbon kapan saja via aplikasi",
    "Auto-deduct di slip gaji sesuai jadwal cicilan",
    "Tracking sisa cicilan real-time",
  ],
  features: [
    { title: "Form Pengajuan Kasbon", desc: "Ajukan pinjaman dengan jumlah & tujuan yang jelas." },
    { title: "Approval Workflow", desc: "Proses persetujuan otomatis ke atasan & HR." },
    { title: "Auto-Deduct di Payroll", desc: "Potongan otomatis di slip gaji sesuai jadwal." },
    { title: "Dashboard Tracking", desc: "Pantau sisa uang & progres cicilan tiap karyawan." },
  ],
  workflowSteps: [
    { step: "01", title: "Ajukan Pinjaman", desc: "Isi formulir dengan jumlah & tujuan kasbon." },
    { step: "02", title: "Review & Approve", desc: "Atasan & HR meninjau dan menyetujui." },
    { step: "03", title: "Transfer Dana", desc: "Dana langsung dikirim ke rekening karyawan." },
    {
      step: "04",
      title: "Auto-Potong Slip",
      desc: "Potongan otomatis diperhitungkan tiap bulan di gaji.",
    },
  ],
  frontendPath: "app/pages/payroll/kasbon/*",
  backendPath: "siarpi-backend/payroll/loan/*",
  sampleStats: [
    { label: "Total Pinjaman Aktif", value: "42 Kasbon", note: "152 Karyawan" },
    { label: "Total Utang Karyawan", value: "Rp 185.000.000", note: "Masih terbayang" },
    { label: "Cicilan Bulan Ini", value: "Rp 32.400.000", note: "Auto-deduct" },
  ],
  sampleRows: [
    {
      code: "LOAN-014",
      title: "Ani Wulandari",
      category: "KPR Kendaraan",
      amount: "Rp 50.000.000 x 24 bulan",
      status: "Active",
    },
    {
      code: "LOAN-015",
      title: "Budi Santoso",
      category: "Renovasi Rumah",
      amount: "Rp 80.000.000 x 36 bulan",
      status: "Active",
    },
    {
      code: "LOAN-016",
      title: "Citra Lestari",
      category: "Biaya Pendidikan",
      amount: "Rp 25.000.000 x 12 bulan",
      status: "Paid Off",
    },
  ],
  faq: [
    {
      q: "Apakah ada bunga untuk kasbon?",
      a: "Kebijakan kasbon tidak dikenakan bunga, hanya berupa potongan sesuai jadwal cicilan.",
    },
    {
      q: "Bagaimana jika karyawan keluar sebelum lunas?",
      a: "Sisa kasbon akan otomatis dipotong dari settlement final di slip terakhir.",
    },
  ],
};
