import type { ModuleDetail } from "./types";

export const absensi: ModuleDetail = {
  tagline: "Kehadiran karyawan akurat, dari mana saja",
  longDescription:
    "Catat waktu kerja, lokasi, jadwal, koreksi kehadiran, dan lembur dalam alur yang terhubung untuk tim kantor maupun lapangan.",
  keyBenefits: [
    "Catat clock-in dan clock-out dengan bukti kehadiran",
    "Kelola jadwal, shift, koreksi, dan lembur secara terpusat",
    "Dapatkan rekap kehadiran bulanan yang siap ditinjau",
  ],
  features: [
    { title: "Clock-In & Clock-Out", desc: "Catat waktu mulai dan selesai kerja setiap karyawan." },
    {
      title: "Bukti & Lokasi Kehadiran",
      desc: "Simpan informasi pendukung kehadiran untuk membantu proses verifikasi.",
    },
    {
      title: "Jadwal & Shift",
      desc: "Atur kalender kerja, jadwal, shift, dan penugasan karyawan.",
    },
    {
      title: "Override Jadwal",
      desc: "Tangani perubahan jadwal tertentu tanpa mengubah pola utama.",
    },
    {
      title: "Koreksi Kehadiran",
      desc: "Ajukan dan proses koreksi data waktu kerja yang tidak sesuai.",
    },
    {
      title: "Manajemen Lembur",
      desc: "Kelola aturan, pengajuan, penugasan, dan persetujuan lembur.",
    },
    {
      title: "Rekap Bulanan",
      desc: "Tinjau kehadiran, keterlambatan, dan waktu kerja dalam periode bulanan.",
    },
    {
      title: "Laporan Absensi",
      desc: "Gunakan laporan untuk evaluasi kedisiplinan dan kebutuhan payroll.",
    },
  ],
  mockup: {
    title: "Absensi Hari Ini",
    subtitle: "Senin, 20 April 2026",
    stats: [
      { label: "Hadir", value: "224", tone: "primary" },
      { label: "Telat", value: "8", tone: "accent" },
      { label: "Absen", value: "16", tone: "muted" },
    ],
    rows: [
      { label: "Andi Pratama", sub: "Check-in 08:02", value: "Hadir" },
      { label: "Siti Nurhaliza", sub: "Check-in 08:45", value: "Telat" },
      { label: "Budi Santoso", sub: "WFH", value: "Hadir" },
    ],
  },
  testimonials: [
    {
      name: "Pak Hasan",
      role: "HRD",
      company: "PT Konstruksi Maju",
      rating: 5,
      quote: "Tim lapangan di 5 site bisa absen tanpa ribet, datanya langsung ke HQ.",
    },
    {
      name: "Bu Yanti",
      role: "Manager Operasional",
      company: "Cafe Chain",
      rating: 5,
      quote: "Tidak ada lagi titip absen. Face recognition akurat banget.",
    },
  ],
  faq: [
    {
      q: "Apakah kesalahan absensi dapat diperbaiki?",
      a: "Ya. Karyawan atau admin dapat menggunakan alur koreksi yang kemudian ditinjau oleh pihak berwenang.",
    },
    {
      q: "Apakah data dapat digunakan Payroll?",
      a: "Ya. Rekap kehadiran disediakan sebagai referensi dalam proses penggajian.",
    },
  ],
};
