import type { ModuleDetail } from "./types";

export const employeePortal: ModuleDetail = {
  tagline: "Layanan mandiri karyawan dalam satu portal",
  longDescription:
    "Berikan akses personal bagi karyawan untuk melihat jadwal, kehadiran, cuti, reimbursement, payslip, dan kasbon tanpa proses administrasi berulang.",
  keyBenefits: [
    "Kurangi pertanyaan administratif yang berulang ke tim HR",
    "Berikan visibilitas status pengajuan kepada setiap karyawan",
    "Satukan informasi kerja dan dokumen personal secara aman",
  ],
  features: [
    {
      title: "Dashboard Pribadi",
      desc: "Ringkasan informasi kerja dan aktivitas penting untuk setiap karyawan.",
    },
    {
      title: "Profil Karyawan",
      desc: "Akses informasi personal dan pekerjaan dalam tampilan yang terpusat.",
    },
    { title: "Jadwal Kerja", desc: "Lihat jadwal, shift, serta kalender kerja yang berlaku." },
    {
      title: "Absensi Mandiri",
      desc: "Lakukan clock-in dan clock-out serta tinjau riwayat kehadiran.",
    },
    {
      title: "Pengajuan Cuti",
      desc: "Ajukan cuti, pantau status, dan lihat sisa kuota secara langsung.",
    },
    {
      title: "Kalender Cuti Tim",
      desc: "Lihat jadwal cuti rekan kerja untuk membantu koordinasi tim.",
    },
    { title: "Reimbursement", desc: "Ajukan penggantian biaya dan pantau proses persetujuannya." },
    {
      title: "Payslip Digital",
      desc: "Akses slip gaji pribadi untuk setiap periode payroll yang tersedia.",
    },
    {
      title: "Kasbon & Cicilan",
      desc: "Tinjau informasi pinjaman karyawan, saldo, dan jadwal cicilan.",
    },
  ],
  mockup: {
    title: "Employee Self-Service",
    subtitle: "Informasi pribadi, jadwal, dan pengajuan",
    stats: [
      { label: "Hadir Bulan Ini", value: "21 hari", tone: "primary" },
      { label: "Sisa Cuti", value: "8 hari", tone: "accent" },
      { label: "Pengajuan", value: "2 aktif", tone: "muted" },
    ],
    rows: [
      { label: "Jadwal Hari Ini", sub: "Shift reguler", value: "08.00 - 17.00" },
      { label: "Cuti Tahunan", sub: "Menunggu atasan", value: "Diproses" },
      { label: "Payslip Agustus", sub: "Periode 2026", value: "Tersedia" },
    ],
  },
  testimonials: [],
  faq: [
    {
      q: "Apakah karyawan hanya melihat datanya sendiri?",
      a: "Ya. Portal dirancang sebagai akses personal untuk informasi dan pengajuan milik karyawan tersebut.",
    },
    {
      q: "Apakah portal terhubung ke HR dan Payroll?",
      a: "Ya. Jadwal, cuti, kehadiran, payslip, reimbursement, dan kasbon menggunakan data dari proses terkait.",
    },
  ],
};
