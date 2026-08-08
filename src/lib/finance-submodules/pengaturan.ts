import type { FinanceSubModuleDetail } from "./types";

export const pengaturan: FinanceSubModuleDetail = {
  id: "pengaturan",
  name: "Pengaturan Akuntansi & Master Data",
  category: "Administrasi Sistem",
  tagline: "Konfigurasi Akun COA, Tahun Akuntansi, & Parameter Akuntansi Global",
  longDescription:
    "Sub-modul Pengaturan akuntansi adalah pusat kontrol master data keuangan perusahaan. Kelola Chart of Accounts (COA), penentuan tahun akuntansi & periode buku, aturan otorisasi (approval workflow), serta templat jurnal standar dan parameter pajak global.",
  iconName: "Settings",
  keyBenefits: [
    "Konfigurasi Chart of Accounts fleksibel sesuai standar akuntansi",
    "Penetapan tahun buku & periode buku yang dapat dikunci",
    "Aturan otorisasi pengeluaran & persetujuan otomatis per level",
  ],
  features: [
    {
      title: "Chart of Accounts (COA)",
      desc: "Buat, edit, & kelola akun akuntansi sesuai standar PSAK.",
    },
    {
      title: "Periode Buku & Tahun Akuntansi",
      desc: "Atur periode terbuka/tutup & kuncian akhir tahun.",
    },
    { title: "Template Jurnal", desc: "Buat templat ayat jurnal rutin untuk otomatisasi bulanan." },
    {
      title: "Parameter Pajak Global",
      desc: "Atur tarif PPN, PPh 23, PPh 4(2), & lokasi penempatan usaha.",
    },
    {
      title: "Approval Workflow",
      desc: "Definisikan aturan otorisasi tiap departemen & nilai ambang.",
    },
  ],
  workflowSteps: [
    {
      step: "01",
      title: "Setup COA Awal",
      desc: "Import/define seluruh akun Chart of Accounts perusahaan.",
    },
    {
      step: "02",
      title: "Atur Periode Buku",
      desc: "Buka/tutup periode bulanan & tentukan tahun buku.",
    },
    {
      step: "03",
      title: "Konfigurasi Pajak",
      desc: "Masukkan tarif PPN, PPh, & daftar lokasi PKP.",
    },
    {
      step: "04",
      title: "Otorisasi Default Workflow",
      desc: "Atur aturan otorisasi otomatis untuk pengajuan.",
    },
  ],
  frontendPath: "app/pages/finance/settings/*",
  backendPath: "siarpi-backend/finance/settings/*",
  sampleStats: [
    { label: "Jumlah Akun COA Aktif", value: "185 Akun", note: "Terdaftar" },
    { label: "Tahun Buku", value: "Jan 2026 – Des 2026", note: "Aktif" },
    { label: "Pajak Terdaftar", value: "PPN 11%, PPh 23 2%", note: "Dikonfigurasi" },
    { label: "Approval Ruleset", value: "12 Ruleset", note: "Aktif" },
  ],
  sampleRows: [
    {
      code: "COA-1100",
      title: "Kas & Setara Kas",
      category: "Aset Lancar",
      amount: "– Akun Utama",
      status: "Active",
    },
    {
      code: "COA-4000",
      title: "Pendapatan Penjualan",
      category: "Pendapatan",
      amount: "– Akun Utama",
      status: "Active",
    },
    {
      code: "COA-6000",
      title: "Belanja Operasional",
      category: "Beban",
      amount: "– Akun Utama",
      status: "Active",
    },
    {
      code: "COA-8000",
      title: "Ekuitas Pemilik",
      category: "Ekuitas",
      amount: "– Akun Utama",
      status: "Active",
    },
  ],
  faq: [
    {
      q: "Bisakah kami menambahkan akun COA baru kapan saja?",
      a: "Ya, akun baru dapat didefinisikan kapan saja sebelum posting transaksi.",
    },
    {
      q: "Bagaimana cara mengamankan akhir tahun buku?",
      a: "Gunakan fitur 'Lock Year' pada modul Pengaturan > Tahun Akuntansi.",
    },
  ],
};
