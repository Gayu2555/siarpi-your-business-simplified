import type { HrSubModuleDetail } from "./types";

export const karyawan: HrSubModuleDetail = {
  id: "karyawan",
  name: "Daftar Karyawan",
  category: "HR Core",
  tagline: "Data tabel karyawan, pencarian, filter departemen, status aktif/nonaktif.",
  longDescription:
    "Modul Daftar Karyawan Siarpi menyimpan seluruh informasi pegawai dalam satu tempat terpusat. Dari identitas diri, riwayat pendidikan & pekerjaan, dokumen resmi, hingga akun bank/gaji. Dukungan pencarian, filter departemen, dan status aktif/nonaktif untuk pengelolaan tim yang efisien.",
  iconName: "Users",
  keyBenefits: [
    "Pencarian karyawan instan dengan filter dinamis",
    "Manajemen status aktif/nonaktif otomatis",
    "Riwayat kerja & pendidikan terpusat per karyawan",
  ],
  features: [
    {
      title: "Pencarian & Filter Canggih",
      desc: "Cari karyawan by nama, NIK, departemen, atau jabatan.",
    },
    { title: "Import Data Massal", desc: "Upload data karyawan via Excel/CSV." },
    { title: "Riwayat Kerja Lengkap", desc: "Catat masa kerja, promosi, dan perubahan jabatan." },
    {
      title: "Dokumen Digital",
      desc: "Simpan scan KTP, NPWP, kontrak, dan ijazah di satu galeri.",
    },
  ],
  workflowSteps: [
    {
      step: "01",
      title: "Isi Data Pribadi",
      desc: "Masukkan nama, NIK, tanggal lahir, kontak, alamat.",
    },
    { step: "02", title: "Upload Dokumen", desc: "Upload KTP, NPWP, kontrak kerja, ijazah." },
    {
      step: "03",
      title: "Atur Departemen & Jabatan",
      desc: "Mapping ke departemen & struktur organisasi.",
    },
    {
      step: "04",
      title: "Aktifkan Akun",
      desc: "Generate email & login sistem, ubah status jadi aktif.",
    },
  ],
  frontendPath: "app/pages/hr/karyawan/*",
  backendPath: "siarpi-backend/hr/employee/*",
  sampleStats: [
    { label: "Total Karyawan", value: "147 Orang", note: "85% Aktif" },
    { label: "Departemen", value: "12 Unit", note: "Terdaftar" },
    { label: "Kontrak PKWT", value: "94 Orang", note: "25 tahun <" },
  ],
  sampleRows: [
    {
      code: "KRY-001",
      title: "Ani Wulandari",
      category: "HR Core",
      amount: "HRD – Supervisor",
      status: "Aktif",
    },
    {
      code: "KRY-002",
      title: "Budi Santoso",
      category: "Engineering",
      amount: "DEV – Senior",
      status: "Aktif",
    },
    {
      code: "KRY-003",
      title: "Citra Lestari",
      category: "Marketing",
      amount: "MKT – Manager",
      status: "Non-Aktif",
    },
  ],
  faq: [
    {
      q: "Apakah karyawan kontrak bisa diinput?",
      a: "Ya, kami mendukung berbagai jenis status kerja (PKWT, PKWTT, Magang, Probation).",
    },
    {
      q: "Apakah bisa mengekspor daftar karyawan?",
      a: "Ya, dapat di-export ke format Excel, CSV, atau PDF.",
    },
  ],
};
