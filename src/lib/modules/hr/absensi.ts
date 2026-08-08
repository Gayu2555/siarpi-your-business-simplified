import type { HrSubModuleDetail } from "./types";

export const absensi: HrSubModuleDetail = {
  id: "absensi",
  name: "Absensi Karyawan",
  category: "HR Core",
  tagline: "Log kehadiran harian, Clock In/Out, foto selfie, GPS geofencing, keterlambatan.",
  longDescription:
    "Sub-modul Absensi merekam seluruh aktivitas kehadiran karyawan secara akurat. Dukungan Clock In/Out via aplikasi mobile dengan verifikasi foto selfie dan koordinat GPS geofencing. Sistem otomatis mendeteksi keterlambatan, izin, dan absen tidak valid.",
  iconName: "Clock",
  keyBenefits: [
    "Clock In/Out via mobile dengan verifikasi biometrik foto",
    "Geofencing lokasi kantor & area kerja",
    "Deteksi otomatis keterlambatan & pulang cepat",
  ],
  features: [
    {
      title: "Clock In/Out dengan Selfie",
      desc: "Verifikasi wajah dan timestamp untuk kehadiran otentik.",
    },
    {
      title: "GPS Geofencing",
      desc: "Batas wilayah absen hanya di area kantor yang didefinisikan.",
    },
    { title: "Laporan Keterlambatan", desc: "Auto-generate laporan keterlambatan + sanksi." },
    {
      title: "Izin & Cuti Real-time",
      desc: "Update status kehadiran otomatis saat ada permohonan cuti.",
    },
  ],
  workflowSteps: [
    {
      step: "01",
      title: "Clock In Pagi",
      desc: "Presensi pagi via aplikasi mobile dengan selfie & GPS.",
    },
    { step: "02", title: "Pantau Aktivitas", desc: "Sistem mencatat aktivitas kerja & break." },
    {
      step: "03",
      title: "Clock Out Sore",
      desc: "Hari kerja otomatis terhitung setelah Clock Out.",
    },
    {
      step: "04",
      title: "Generate Laporan",
      desc: "Laporan kehadiran terbaru siap dilihat manajer.",
    },
  ],
  frontendPath: "app/pages/hr/absensi/*",
  backendPath: "siarpi-backend/hr/attendance/*",
  sampleStats: [
    { label: "Rata-Rata Kehadiran", value: "96.8%", note: "Bulan Ini" },
    { label: "Keterlambatan", value: "12 Kasus", note: "2.1% dari total" },
    { label: "Absen Online Hari Ini", value: "89 Orang", note: "92% participation" },
  ],
  sampleRows: [
    {
      code: "ATT-134",
      title: "Ani Wulandari",
      category: "Clock In",
      amount: "08:15 (Terlambat)",
      status: "Present",
    },
    {
      code: "ATT-135",
      title: "Budi Santoso",
      category: "Clock In",
      amount: "08:05",
      status: "Present",
    },
    {
      code: "ATT-136",
      title: "Rizky Pratama",
      category: "Clock In",
      amount: "08:02",
      status: "Present",
    },
  ],
  faq: [
    {
      q: "Apakah absen bisa dilakukan offline?",
      a: "Sementara data lokasi tersedia, Clock In membutuhkan koneksi internet.",
    },
    {
      q: "Bagaimana jika lupa Clock In?",
      a: "Hanya admin yang dapat melakukan Clock In atas nama karyawan dengan bukti.",
    },
  ],
};
