import type { HrSubModuleDetail } from "./types";

export const reimbursement: HrSubModuleDetail = {
  id: "reimbursement",
  name: "Reimbursement & Klaim Biaya",
  category: "HR Operations",
  tagline: "Pengajuan dan persetujuan klaim biaya operasional / dinas karyawan secara paperless.",
  longDescription:
    "Sub-modul Reimbursement mengelola alur klaim pengeluaran karyawan mulai dari pengunggahan bukti nota, verifikasi oleh atasan & HR, hingga pencairan tunjangan yang otomatis terhubung ke jurnal keuangan.",
  iconName: "Receipt",
  keyBenefits: [
    "Pengajuan klaim via hp dengan foto bukti kuitansi",
    "Alur persetujuan (approval flow) bertingkat berdasar limit nominal",
    "Pencairan otomatis terdaftar di modul Finance & Payroll",
  ],
  features: [
    {
      title: "Upload Bukti Kuitansi",
      desc: "Foto nota / kuitansi langsung dari aplikasi dengan ekstraksi data otomatis.",
    },
    {
      title: "Persetujuan Multi-Tier",
      desc: "Skema approval bertingkat sesuai struktur organisasi dan batasan nominal.",
    },
    {
      title: "Kategori Klaim Kustom",
      desc: "Atur kategori klaim seperti Transportasi, Perjalanan Dinas, Kesehatan, & Operasional.",
    },
    {
      title: "Integrasi Pencairan Gaji",
      desc: "Opsi pencairan langsung ke rekening karyawan bersamaan dengan Pay Run bulanan.",
    },
  ],
  workflowSteps: [
    { step: "01", title: "Foto & Input Klaim", desc: "Karyawan mengunggah nota & mengisi nominal." },
    { step: "02", title: "Verifikasi Atasan", desc: "Supervisor memeriksa & menyetujui klaim." },
    { step: "03", title: "Approval Finance", desc: "Finance mengecek validitas bukti transaksi." },
    { step: "04", title: "Pencairan Biaya", desc: "Dana ditransfer atau digabungkan ke slip gaji." },
  ],
  frontendPath: "app/pages/hr/reimbursement/*",
  backendPath: "siarpi-backend/hr/reimbursement/*",
  sampleStats: [
    { label: "Klaim Bulan Ini", value: "34 Pengajuan", note: "Total Rp 18.4M" },
    { label: "Disetujui", value: "28 Klaim", note: "Siap dicairkan" },
    { label: "Menunggu Approval", value: "6 Klaim", note: "In Review" },
  ],
  sampleRows: [
    {
      code: "REIM-2026-089",
      title: "Bensin & Tol Dinas Bandung",
      category: "Transportasi",
      amount: "Rp 650.000",
      status: "Approved",
    },
    {
      code: "REIM-2026-090",
      title: "Jamuan Client Marketing",
      category: "Operasional",
      amount: "Rp 1.200.000",
      status: "Pending Approval",
    },
  ],
  faq: [
    {
      q: "Apakah kuitansi harus asli diserahkan?",
      a: "Foto nota digital sudah memadai untuk verifikasi awal, arsip nota fisik bisa disesuaikan kebijakan perusahaan.",
    },
    {
      q: "Bisa dicairkan lewat transfer langsung?",
      a: "Bisa, pembayaran klaim mendukung transfer kas/bank terpisah maupun digabung di slip gaji.",
    },
  ],
};
