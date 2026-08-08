import type { PayrollSubModuleDetail } from "./types";

export const jenisPotongan: PayrollSubModuleDetail = {
  id: "jenis-potongan",
  name: "Manajemen Jenis Potongan",
  category: "Potongan & Gaji",
  tagline: "Konfigurasi beragam jenis potongan fleksibel (keterlambatan, kasbon, & iuran sukarela).",
  longDescription:
    "Sub-modul Jenis Potongan memfasilitasi perusahaan dalam membuat skema pemotongan gaji kustom yang transparan, baik bertipe persentase maupun nominal tetap, yang langsung terintegrasi saat penggajian massal.",
  iconName: "Receipt",
  keyBenefits: [
    "Dukungan rumus kalkulasi potongan dinamis (Nominal tetap atau % Gaji)",
    "Kategorisasi pemotongan wajib (BPJS/Pajak) vs potongan sukarela (Koperasi/Denda)",
    "Pencatatan riwayat pemotongan terperinci di setiap slip gaji karyawan",
  ],
  features: [
    {
      title: "Master Kategori Potongan",
      desc: "Buat kategori potongan baru seperti Denda Telat, Koperasi, Pinjaman, dan Iuran Sosial.",
    },
    {
      title: "Kalkulasi Otomatis",
      desc: "Otomatisasi pemotongan berdasar parameter jumlah jam/hari terlambat dari modul Absensi.",
    },
    {
      title: "Pengecualian Per Karyawan",
      desc: "Set perlakuan khusus atau bebas potongan untuk level manajemen/jabatan tertentu.",
    },
  ],
  workflowSteps: [
    { step: "01", title: "Definisikan Potongan", desc: "Tentukan nama, tipe, & persentase potongan." },
    { step: "02", title: "Hubungkan ke Absensi", desc: "Pasang trigger denda otomatis jika karyawan telat." },
    { step: "03", title: "Kalkulasi Pay Run", desc: "Sistem memotong nilai gaji secara otomatis saat penggajian." },
  ],
  frontendPath: "app/pages/payroll/jenis-potongan.vue",
  backendPath: "siarpi-backend/payroll/jenis-potongan/*",
  sampleStats: [
    { label: "Jenis Potongan Aktif", value: "8 Skema", note: "Termasuk BPJS & Denda" },
    { label: "Total Dipotong (Bln Ini)", value: "Rp 14.2M", note: "Otomatis diproses" },
  ],
  sampleRows: [
    {
      code: "POT-001",
      title: "Denda Keterlambatan > 15 Mnt",
      category: "Kedisiplinan",
      amount: "Rp 50.000 /kejadian",
      status: "Aktif",
    },
    {
      code: "POT-002",
      title: "Simpanan Wajib Koperasi",
      category: "Sukarela",
      amount: "Rp 100.000 /bulan",
      status: "Aktif",
    },
  ],
  faq: [
    {
      q: "Apakah potongan bisa di-set sementara untuk bulan tertentu?",
      a: "Bisa, Anda dapat mengaktifkan atau menonaktifkan skema potongan kapan saja.",
    },
  ],
};
