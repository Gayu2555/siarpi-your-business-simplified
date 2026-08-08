import type { PayrollSubModuleDetail } from "./types";

export const payslips: PayrollSubModuleDetail = {
  id: "payslips",
  name: "Slip Gaji",
  category: "Core Payroll",
  tagline: "Daftar slip gaji yang telah diproses & tombol cetak/distribusi.",
  longDescription:
    "Sub-modul Slip Gaji menyajikan seluruh dokumen slip gaji digital yang telah diproses dari payroll run. Setiap slip berisi rincian lengkap komponen penerimaan dan potongan, serta siap diekspor ke PDF atau dikirimkan langsung ke karyawan.",
  iconName: "Receipt",
  keyBenefits: [
    "Akses slip gaji semua karyawan dalam satu lokasi",
    "Export ke PDF professional siap tanda tangan",
    "Kirim langsung ke karyawan via portal self-service",
  ],
  features: [
    {
      title: "Preview Slip Interaktif",
      desc: "Lihat rincian gaji tiap karyawan tanpa harus mengekspor.",
    },
    {
      title: "Export PDF Siap Tanda Tangan",
      desc: "Format PDF profesional yang siap untuk penandatanganan digital.",
    },
    { title: "Bulk Download & Email", desc: "Kirimkan slip gaji ke seluruh karyawan otomatis." },
    { title: "Version Control", desc: "Setiap slip memiliki versi & riwayat perubahannya." },
  ],
  workflowSteps: [
    { step: "01", title: "Pilih Periode Payroll", desc: "Pilih slip gaji dari pay run tertentu." },
    { step: "02", title: "Preview & Validasi", desc: "Periksa data karyawan & komponen gaji." },
    { step: "03", title: "Generate PDF", desc: "Ekspor slip gaji ke format PDF." },
    {
      step: "04",
      title: "Distribusi ke Karyawan",
      desc: "Kirimkan slip langsung ke dashboard karyawan.",
    },
  ],
  frontendPath: "app/pages/payroll/payslips/*",
  backendPath: "siarpi-backend/payroll/payslips/*",
  sampleStats: [
    { label: "Total Slip Gaji", value: "152 Dokumen", note: "Q2 2026" },
    { label: "Belum Didownload", value: "13 Karyawan", note: "Pengingat aktif" },
    { label: "Rata-Rata Ukuran PDF", value: "284 KB", note: "Optimal" },
  ],
  sampleRows: [
    {
      code: "SLIP-Q2-044",
      title: "Ani Wulandari",
      category: "HRD – Supervisor",
      amount: "Netto Rp 7.800.000",
      status: "Generated",
    },
    {
      code: "SLIP-Q2-045",
      title: "Budi Santoso",
      category: "Sr. Engineer",
      amount: "Netto Rp 15.200.000",
      status: "Sent",
    },
    {
      code: "SLIP-Q2-046",
      title: "Citra Lestari",
      category: "Marketing Manager",
      amount: "Netto Rp 12.450.000",
      status: "Viewed",
    },
  ],
  faq: [
    { q: "Apakah slip gaji bisa dicetak?", a: "Ya, semua slip bisa diekspor ke PDF siap print." },
    {
      q: "Apakah karyawan bisa melihat slip di portal sendiri?",
      a: "Ya, karyawan bisa mengakses slip gaji pribadi di Employee Self-Service (ESS) portal.",
    },
  ],
};
