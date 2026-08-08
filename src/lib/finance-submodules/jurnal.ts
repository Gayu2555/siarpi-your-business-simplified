import type { FinanceSubModuleDetail } from "./types";

export const jurnal: FinanceSubModuleDetail = {
  id: "jurnal",
  name: "Jurnal & Buku Besar (General Ledger)",
  category: "Akuntansi Utama",
  tagline: "Otomatiskan Pencatatan Jurnal & Pantau Buku Besar Tanpa Selisih Rupiah",
  longDescription:
    "Modul Jurnal & Buku Besar Siarpi menangani seluruh siklus akuntansi perusahaan secara presisi. Dari entri jurnal umum, jurnal penyesuaian, jurnal penutup otomatis, hingga filtering Buku Besar per akun Chart of Accounts (COA) secara real-time.",
  iconName: "BookOpen",
  keyBenefits: [
    "Pencatatan berpasangan (Double-Entry) otomatis 100% akurat",
    "Filter Buku Besar instan per akun COA, tanggal, & cabang",
    "Posting otomatis dari invoice, kas/bank, & modul operasional",
  ],
  features: [
    {
      title: "Multi-Cost Center",
      desc: "Alokasikan jurnal ke divisi, proyek, atau cabang bisnis tertentu secara fleksibel.",
    },
    {
      title: "Jurnal Pembalik & Penyesuaian",
      desc: "Buat ayat penyesuaian otomatis di akhir periode akuntansi.",
    },
    {
      title: "Audit Trail Lapis Tiga",
      desc: "Lacak siapa yang mengedit atau memposting entri jurnal lengkap dengan timestamp.",
    },
    {
      title: "Import & Export Excel",
      desc: "Dukungan import data historis jurnal dari Excel/CSV tanpa ribet.",
    },
  ],
  workflowSteps: [
    {
      step: "01",
      title: "Input / Sync Transaksi",
      desc: "Transaksi otomatis tersinkron dari Sales, Purchase, atau Kas.",
    },
    {
      step: "02",
      title: "Validasi Keseimbangan Debit/Kredit",
      desc: "Sistem memastikan total Debit = Kredit secara real-time.",
    },
    {
      step: "03",
      title: "Posting ke Buku Besar",
      desc: "Entri langsung terupdate di Buku Besar & Neraca Saldo.",
    },
    {
      step: "04",
      title: "Tutup Buku Periode",
      desc: "Kunci periode akuntansi untuk mencegah perubahan data historis.",
    },
  ],
  frontendPath: "app/pages/finance/jurnal/*",
  backendPath: "siarpi-backend/finance/coa/*",
  sampleStats: [
    { label: "Total Entri Jurnal", value: "14.280", note: "Bulan ini" },
    { label: "Akun COA Aktif", value: "185 Akun", note: "Terstruktur" },
    { label: "Keseimbangan GL", value: "Rp 0 Selisih", note: "Balance 100%" },
  ],
  sampleRows: [
    {
      code: "JRN-2026-001",
      title: "Pendapatan Penjualan POS",
      category: "KAS/GL",
      amount: "Rp 24.500.000",
      status: "Posted",
    },
    {
      code: "JRN-2026-002",
      title: "Pembayaran Sewa Kantor",
      category: "BEBAN",
      amount: "Rp 15.000.000",
      status: "Posted",
    },
    {
      code: "JRN-2026-003",
      title: "Penyusutan Peralatan",
      category: "AKUMULASI",
      amount: "Rp 2.850.000",
      status: "Auto-System",
    },
    {
      code: "JRN-2026-004",
      title: "Penyesuaian Biaya Dibayar Dimuka",
      category: "MEMORIAL",
      amount: "Rp 4.200.000",
      status: "Posted",
    },
  ],
  faq: [
    {
      q: "Apakah jurnal diposting secara otomatis?",
      a: "Ya! Setiap transaksi kas, faktur, atau pembayaran akan langsung memposting jurnal ke Buku Besar secara otomatis.",
    },
    {
      q: "Apakah bisa membuat template jurnal rutin?",
      a: "Tentu. Anda bisa membuat template untuk transaksi berulang seperti sewa bulanan atau gaji.",
    },
  ],
};
