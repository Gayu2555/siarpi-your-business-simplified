import type { HrSubModuleDetail } from "./types";

export const hierarki: HrSubModuleDetail = {
  id: "hierarki",
  name: "Hierarki & Org Chart",
  category: "Visualisasi Struktur",
  tagline: "Visualisasi interaktif bagan struktur organisasi, pemetaan Atasan-Bawahan, & rantai komando.",
  longDescription:
    "Sub-modul Hierarki menampilkan bagan organisasi perusahaan (Organization Chart) secara visual dan interaktif. Memudahkan pemetaan rantai komando, jalur eskalasi persetujuan, dan hubungan pelaporan kerja.",
  iconName: "UserCheck",
  keyBenefits: [
    "Visualisasi bagan organisasi otomatis dari data atasan-bawahan",
    "Pencarian posisi & pohon navigasi tim interaktif",
    "Memastikan alur persetujuan dokumen (approval chain) tepat sasaran",
  ],
  features: [
    {
      title: "Interactive Org Chart Tree",
      desc: "Lihat dan zoom bagan organisasi dengan foto profil & info singkat tiap karyawan.",
    },
    {
      title: "Peta Atasan & Bawahan",
      desc: "Atur pelaporan langsung (Direct Report) dan pelaporan matriks (Dotted-line).",
    },
    {
      title: "Ekspor Bagan Organisasi",
      desc: "Cetak atau unduh bagan organisasi dalam format gambar/PDF berkualitas tinggi.",
    },
  ],
  workflowSteps: [
    { step: "01", title: "Pilih Atasan Direct", desc: "Tentukan supervisor / atasan langsung karyawan." },
    { step: "02", title: "Generate Org Chart", desc: "Sistem membentuk struktur pohon hierarki secara otomatis." },
    { step: "03", title: "Evaluasi Alur Approval", desc: "Gunakan data hierarki sebagai acuan alur persetujuan." },
  ],
  frontendPath: "app/pages/HumanResource/hierarki.vue",
  backendPath: "siarpi-backend/hr/hierarki/*",
  sampleStats: [
    { label: "Kedalaman Hirarki", value: "4 Tingkat", note: "Dari CEO hingga Staf" },
    { label: "Total Direct Reports", value: "128 Karyawan", note: "Terhubung sempurna" },
  ],
  sampleRows: [
    {
      code: "TREE-01",
      title: "Divisi Keuangan & Akuntansi",
      category: "Finance Tree",
      amount: "4 Level",
      status: "Verified",
    },
  ],
  faq: [
    {
      q: "Apakah bagan organisasi terupdate secara otomatis saat ada karyawan baru?",
      a: "Ya, begitu atasan langsung ditetapkan pada profil karyawan, bagan organisasi langsung diperbarui.",
    },
  ],
};
