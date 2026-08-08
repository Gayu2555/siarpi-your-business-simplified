export type { HrSubModuleDetail, HrFeature, HrTestimonial } from "./types";

export { karyawan } from "./karyawan";
export { absensi } from "./absensi";
export { cuti } from "./cuti";
export { lembur } from "./lembur";
export { shift } from "./shift";
export { payrollDashboard } from "./payroll-dashboard";

export { hrSubModules, getHrSubModule, getHrSubModuleByName } from "./registry";

export const hr = {
  id: "hr",
  name: "Manajemen SDM & HR",
  tagline: "Otomatiskan absensi, penggajian, cuti, shift kerja, & reimbursement.",
  longDescription:
    "Solusi manajemen SDM terpadu dari pencatatan karyawan, presensi real-time, pengajuan cuti, jam lembur, hingga pembagian shift kerja yang efisien.",
  iconName: "Users",
  keyBenefits: [
    "Pencatatan data karyawan & biodata terpusat",
    "Presensi presisi real-time dengan selfie & koordinat GPS",
    "Paperless request cuti & approval bertingkat",
  ],
  features: [
    {
      title: "Daftar Karyawan Terpusat",
      desc: "Kelola database biodata, dokumen, dan riwayat karir karyawan.",
    },
    {
      title: "Presensi Real-Time & Selfie Proof",
      desc: "Pencatatan Clock In/Out transparan dilengkapi foto selfie & koordinat lokasi.",
    },
    {
      title: "Manajemen Cuti & Izin",
      desc: "Pengajuan dan persetujuan cuti paperless dengan sinkronisasi sisa kuota otomatis.",
    },
    {
      title: "Manajemen Shift & Lembur",
      desc: "Pengaturan roster jam kerja fleksibel dan pengajuan lembur terintegrasi.",
    },
  ],
  mockup: {
    title: "Dashboard Manajemen SDM & HR",
    subtitle: "Pantau tingkat kehadiran, pengajuan izin, & statistik SDM secara real-time",
    image: "/dashboard-preview.jpg",
  },
  testimonials: [
    {
      name: "Sari Wulandari",
      role: "HR Manager",
      company: "PT TechInovasi Solusindo",
      rating: 5,
      quote:
        "Siarpi HR mengotomatisasi penggajian dan absensi kami. Rekap kehadiran bulanan jadi jauh lebih cepat!",
    },
  ],
  faq: [
    {
      q: "Apakah data karyawan terjamin keamanannya?",
      a: "Ya, semua data karyawan dienkripsi AES-256 dan disimpan secara terpusat dengan akses keamanan bertingkat.",
    },
    {
      q: "Apakah modul HR bisa terhubung ke Payroll?",
      a: "Tentu! Data absensi, keterlambatan, dan lembur otomatis terhubung ke perhitungan penggajian.",
    },
  ],
};
