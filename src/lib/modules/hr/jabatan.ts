import type { HrSubModuleDetail } from "./types";

export const jabatan: HrSubModuleDetail = {
  id: "jabatan",
  name: "Jabatan & Tingkatan Posisi",
  category: "Struktur Posisi",
  tagline: "Standardisasi level manajemen, tingkatan posisi, jenjang karir, dan tanggung jawab pekerjaan.",
  longDescription:
    "Sub-modul Jabatan berfungsi merumuskan kerangka posisi (job level) dalam organisasi. Dari staf operasional hingga jajaran direksi, setiap posisi memiliki standar komponen gaji pokok, tunjangan jabatan, dan batas wewenang persetujuan.",
  iconName: "UserCheck",
  keyBenefits: [
    "Matriks jenjang karir (grade Level 1 hingga C-Level) yang terstruktur",
    "Batas wewenang persetujuan dokumen & limit pengeluaran otomatis",
    "Integrasi standar gaji pokok & tunjangan jabatan",
  ],
  features: [
    {
      title: "Master Job Grade",
      desc: "Atur tingkatan hirarki posisi (Entry Level, Junior, Senior, Lead, Manager).",
    },
    {
      title: "Deskripsi Pekerjaan (Job Description)",
      desc: "Simpan KPI dan standar kompetensi tiap jabatan.",
    },
    {
      title: "Matriks Tunjangan Posisi",
      desc: "Tentukan tunjangan otomatis yang berhak diterima oleh tingkatan jabatan.",
    },
  ],
  workflowSteps: [
    { step: "01", title: "Definisikan Posisi", desc: "Buat nama jabatan & pilih level jabatannya." },
    { step: "02", title: "Set Standar Gaji", desc: "Tentukan rentang gaji & tunjangan jabatan." },
    { step: "03", title: "Tetapkan ke Staf", desc: "Hubungkan posisi dengan karyawan aktif." },
  ],
  frontendPath: "app/pages/HumanResource/jabatan.vue",
  backendPath: "siarpi-backend/hr/jabatan/*",
  sampleStats: [
    { label: "Jumlah Posisi", value: "24 Jabatan", note: "Terbagi dalam 5 Grade Level" },
    { label: "Level Tertinggi", value: "Executive Director", note: "Grade 1" },
  ],
  sampleRows: [
    {
      code: "JAB-MGR",
      title: "Senior Accounting Manager",
      category: "Managerial",
      amount: "Grade 2",
      status: "Aktif",
    },
  ],
  faq: [
    {
      q: "Apakah riwayat promosi jabatan karyawan akan tersimpan?",
      a: "Ya, setiap perubahan jabatan karyawan akan otomatis mengupdate riwayat karir karyawan.",
    },
  ],
};
