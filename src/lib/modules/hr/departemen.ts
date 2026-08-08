import type { HrSubModuleDetail } from "./types";

export const departemen: HrSubModuleDetail = {
  id: "departemen",
  name: "Departemen & Divisi Perusahaan",
  category: "Struktur Organisasi",
  tagline: "Pengelolaan struktur departemen perusahaan, alokasi kepala divisi, & pemetaan pusat biaya.",
  longDescription:
    "Sub-modul Departemen mengelola tata kelola struktur organisasi internal perusahaan. Memungkinkan pemisahan divisi operasional, penetapan pimpinan unit kerja, serta alokasi cost-center untuk kemudahan pelaporan akuntansi.",
  iconName: "UserCheck",
  keyBenefits: [
    "Pengelompokan karyawan berdasar divisi & cabang usaha",
    "Penetapan Kepala Departemen / Head of Department (HOD) untuk approval",
    "Analisis jumlah personil & beban anggaran gaji per departemen",
  ],
  features: [
    {
      title: "Pusat Biaya (Cost Center)",
      desc: "Hubungkan departemen dengan kode akun biaya di modul Keuangan.",
    },
    {
      title: "Manajemen Kepala Divisi",
      desc: "Tentukan atasan langsung penerima delegasi persetujuan cuti & lembur.",
    },
    {
      title: "Multicabang & Unit Usaha",
      desc: "Dukungan struktur departemen bertingkat untuk entitas bisnis bercabang.",
    },
  ],
  workflowSteps: [
    { step: "01", title: "Buat Departemen", desc: "Tentukan nama divisi, kode, & deskripsi unit." },
    { step: "02", title: "Tunjuk Pimpinan", desc: "Pilih karyawan yang menjadi Manager/Supervisor." },
    { step: "03", title: "Alokasikan Staf", desc: "Tempatkan karyawan ke departemen terkait." },
  ],
  frontendPath: "app/pages/HumanResource/departemen.vue",
  backendPath: "siarpi-backend/hr/departemen/*",
  sampleStats: [
    { label: "Total Departemen", value: "12 Divisi", note: "Termasuk Cabang Utama" },
    { label: "Departemen Terbesar", value: "Operasional & Logistik", note: "45 Personil" },
  ],
  sampleRows: [
    {
      code: "DEP-FIN",
      title: "Finance & Accounting",
      category: "Support",
      amount: "8 Anggota",
      status: "Aktif",
    },
    {
      code: "DEP-MKT",
      title: "Digital Marketing & Sales",
      category: "Core Business",
      amount: "14 Anggota",
      status: "Aktif",
    },
  ],
  faq: [
    {
      q: "Apakah satu karyawan bisa berada di dua departemen?",
      a: "Setiap karyawan memiliki departemen utama, tetapi dapat ditugaskan pada projek antar-divisi.",
    },
  ],
};
