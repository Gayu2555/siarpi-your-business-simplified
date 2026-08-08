import type { ModuleDetail } from "./types";

export const absensi: ModuleDetail = {
  tagline: "Kehadiran karyawan akurat, dari mana saja",
  longDescription:
    "Absensi via face recognition, GPS, atau QR code. Cocok untuk WFO, WFH, dan tim lapangan.",
  keyBenefits: [
    "Absensi akurat anti-titip absen dengan Face Recognition AI",
    "Validasi lokasi kerja karyawan dengan GPS Geofencing",
    "Perhitungan jam kerja, shift, & lembur otomatis",
  ],
  features: [
    { title: "Face Recognition", desc: "Selfie + AI untuk verifikasi identitas anti-titip absen." },
    { title: "GPS & Geofence", desc: "Validasi lokasi sesuai area kerja yang ditentukan." },
    { title: "Shift & Roster", desc: "Atur jadwal shift kompleks dengan rotasi otomatis." },
    { title: "Lembur Otomatis", desc: "Hitung overtime sesuai aturan perusahaan." },
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
    { q: "Apakah bisa offline?", a: "Ya, data tersimpan lokal & sync saat online." },
    { q: "Bagaimana dengan WFH?", a: "Mendukung absensi WFH dengan validasi foto & timestamp." },
  ],
};
