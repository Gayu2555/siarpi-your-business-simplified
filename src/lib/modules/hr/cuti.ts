import type { HrSubModuleDetail } from "./types";

export const cuti: HrSubModuleDetail = {
  id: "cuti",
  name: "Pengajuan Cuti & Izin",
  category: "HR Management",
  tagline: "Alur permohonan cuti/izin karyawan beserta persetujuan supervisor.",
  longDescription:
    "Sub-modul Cuti & Izin menggestion seluruh proses pengajuan cuti tahunan, sakit, khusus, hingga izin pribadi. Sistem alur persetujuan otomatis menuju supervisor langsung, lengkap notifikasi real-time, dan tracking jatah sisa cuti yang selalu akurat.",
  iconName: "Calendar",
  keyBenefits: [
    "Alur persetujuan otomatis ke supervisor langsung",
    "Tracking kuota cuti tersisa real-time",
    "Notifikasi via email, WhatsApp, dan dalam aplikasi",
  ],
  features: [
    { title: "Multi-Jenis Cuti", desc: "Cuti tahunan, sakit, khusus, melahirkan, dll." },
    {
      title: "Approval Workflow Berjenjang",
      desc: "Atur aturan approval sesuai struktur organisasi.",
    },
    {
      title: "Integrasi Kalender Libur",
      desc: "Libur nasional & custom otomatis tidak termasuk cuti.",
    },
    {
      title: "Laporan Statistik Cuti",
      desc: "Analisis penggunaan cuti tiap departemen dan tren tahunan.",
    },
  ],
  workflowSteps: [
    {
      step: "01",
      title: "Ajukan Cuti",
      desc: "Karyawan isi formulir cuti dengan tanggal & alasan.",
    },
    {
      step: "02",
      title: "Cek Kuota Tersedia",
      desc: "Sistem otomatis validasi jatah cuti yang tersisa.",
    },
    {
      step: "03",
      title: "Approval Supervisor",
      desc: "Notifikasi dikirim ke atasan langsung untuk persetujuan.",
    },
    {
      step: "04",
      title: "Update Kalender",
      desc: "Kalender kehadiran & payroll otomatis terupdate.",
    },
  ],
  frontendPath: "app/pages/hr/cuti/*",
  backendPath: "siarpi-backend/hr/leave/*",
  sampleStats: [
    { label: "Rata-Rata Cuti Dipakai", value: "12 Hari", note: "dari 18 kuota" },
    { label: "Permohonan Bulan Ini", value: "34 Pengajuan", note: "85% disetujui" },
    { label: "Sisa Cuti Tahunan", value: "156 Orang", note: "Rata-rata 6 hari" },
  ],
  sampleRows: [
    {
      code: "CUTI-044",
      title: "Budi Santoso (Cuti Sakit)",
      category: "Medical Leave",
      amount: "3 hari",
      status: "Approved",
    },
    {
      code: "CUTI-043",
      title: "Citra Lestari (Cuti Tahunan)",
      category: "Annual Leave",
      amount: "5 hari",
      status: "Pending",
    },
    {
      code: "CUTI-042",
      title: "Rizky Pratama (Izin Pribadi)",
      category: "Personal Leave",
      amount: "1 hari",
      status: "Rejected",
    },
  ],
  faq: [
    {
      q: "Berapa lama proses approval cuti?",
      a: "Rata-rata 2-4 jam kerja, tergantung kebijakan perusahaan.",
    },
    {
      q: "Apakah cuti tahunan otomatis expires?",
      a: "Ya, sesuai kebijakan, cuti tahunan yang tidak dipakai akan hangus pada akhir tahun.",
    },
  ],
};
