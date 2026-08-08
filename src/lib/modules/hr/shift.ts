import type { HrSubModuleDetail } from "./types";

export const shift: HrSubModuleDetail = {
  id: "shift",
  name: "Shift Kerja",
  category: "Konfigurasi HR",
  tagline: "Master jam kerja (Pagi, Siang, Malam, Flexi).",
  longDescription:
    "Sub-modul Shift Kerja memungkinkan Anda untuk mendefinisikan pola jam kerja yang berlaku di perusahaan. Dukungan shift Pagi, Siang, Malam, maupun Flexi Time. Setiap shift dapat dikonfigurasi untuk Jam masuk, jam keluar, lunch break, tolerance delay, dan aturan cut-off.",
  iconName: "Clock",
  keyBenefits: [
    "Template shift siap pakai (Pagi, Siang, Malam, Flexi)",
    "Atur tolerance & grace period absensi otomatis",
    "Integrasi otomatis ke attendance & payroll",
  ],
  features: [
    {
      title: "Template Shift Siap Pakai",
      desc: "Gunakan preset shift atau buat custom shift baru.",
    },
    {
      title: "Tolerance & Grace Period",
      desc: "Atur batas toleransi keterlambatan untuk tiap shift.",
    },
    { title: "Shift Berulang", desc: "Definisikan pola shift mingguan/bulanan untuk tim shift." },
    {
      title: "Flexi Time Mode",
      desc: "Mode kerja fleksibel dengan core hours & jam kerja minimal.",
    },
  ],
  workflowSteps: [
    {
      step: "01",
      title: "Pilih Template Shift",
      desc: "Pilih antara Pagi, Siang, Malam, atau Flexi.",
    },
    {
      step: "02",
      title: "Atur Jam & Tolerance",
      desc: "Tentukan jam masuk, keluar, dan grace period.",
    },
    {
      step: "03",
      title: "Assign ke Departemen",
      desc: "Mapp shift ke departemen atau karyawan tertentu.",
    },
    {
      step: "04",
      title: "Aktifkan Secara Otomatis",
      desc: "Shift langsung berpengaruh pada absensi hari itu.",
    },
  ],
  frontendPath: "app/pages/hr/config/shift/*",
  backendPath: "siarpi-backend/hr/config/shift/*",
  sampleStats: [
    { label: "Jenis Shift Terdaftar", value: "7 Shift", note: "Pagi, Siang, Malam, Flexi" },
    { label: "Karyawan di Shift Rotasi", value: "48 Orang", note: "Engineering & Support" },
    { label: "Tingkat Kepatuhan Shift", value: "92.4%", note: "Konsisten" },
  ],
  sampleRows: [
    {
      code: "SHF-PAGI",
      title: "Shift Pagi 08:00-17:00",
      category: "Standard",
      amount: "Lunch 1h, Tolerance 15m",
      status: "Active",
    },
    {
      code: "SHF-SIANG",
      title: "Shift Siang 14:00-23:00",
      category: "Support",
      amount: "Lunch 1h, Tolerance 20m",
      status: "Active",
    },
    {
      code: "SHF-MALAM",
      title: "Shift Malam 22:00-07:00",
      category: "Night Ops",
      amount: "Meal Break, Transport",
      status: "Active",
    },
  ],
  faq: [
    {
      q: "Bisa ganti shift secara massal?",
      a: "Ya, fitur Bulk Assignment memungkinkan mengganti shift untuk banyak karyawan sekaligus.",
    },
    {
      q: "Apakah ada notifikasi jika ada perubahan shift?",
      a: "Ya. Karyawan akan menerima notifikasi via email dan notifikasi dalam aplikasi.",
    },
  ],
};
