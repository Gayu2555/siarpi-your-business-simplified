import {
  Users,
  Wallet,
  LineChart,
  Package,
  HeartHandshake,
  Clock,
  FileText,
  Factory,
  ShoppingBag,
  ContactRound,
  type LucideIcon,
} from "lucide-react";

// PENTING: array `modules` di bawah HANYA berisi data plain (string, number).
// Field icon disimpan sebagai `iconName` (string), BUKAN komponen React
// langsung. Ini krusial karena:
//   1. modules.$moduleId.tsx route punya `loader` yang nge-return data dari
//      array ini ke client lewat TanStack Start SSR dehydration (Seroval).
//   2. Seroval TIDAK BISA serialize komponen React (function/forward_ref).
//      Kalau field ini berupa komponen, app akan crash dengan:
//      "Seroval Error ... value: Symbol(react.forward_ref)"
// Resolve iconName -> komponen HANYA dilakukan saat render lewat getModuleIcon(),
// tidak pernah disimpan ke loader/state yang ikut proses dehydration.

export const ICON_MAP: Record<string, LucideIcon> = {
  Users,
  Wallet,
  LineChart,
  Package,
  HeartHandshake,
  Clock,
  FileText,
  Factory,
  ShoppingBag,
  ContactRound,
};

export const modules = [
  {
    id: "hr",
    name: "HR",
    iconName: "Users",
    description: "Manajemen karyawan & rekrutmen",
    price: 49000,
  },
  {
    id: "payroll",
    name: "Payroll",
    iconName: "Wallet",
    description: "Gaji otomatis & pajak",
    price: 79000,
  },
  {
    id: "finance",
    name: "Finance & Akuntansi",
    iconName: "LineChart",
    description: "Akuntansi ganda, jurnal, kas/bank, pajak, aset & kurs BI",
    price: 99000,
  },
  {
    id: "inventory",
    name: "Inventory",
    iconName: "Package",
    description: "Stok barang real-time",
    price: 69000,
  },
  {
    id: "procurement",
    name: "Procurement",
    iconName: "ShoppingBag",
    description: "Pengadaan, tender, PO, dan vendor",
    price: 59000,
  },
  {
    id: "production",
    name: "Production",
    iconName: "Factory",
    description: "BOM, pesanan produksi, dan HPP",
    price: 59000,
  },
  {
    id: "crm",
    name: "CRM",
    iconName: "HeartHandshake",
    description: "Kelola pelanggan & leads",
    price: 69000,
  },
  {
    id: "absensi",
    name: "Absensi",
    iconName: "Clock",
    description: "Kehadiran & shift",
    price: 39000,
  },
  {
    id: "invoice",
    name: "Invoice",
    iconName: "FileText",
    description: "Tagihan & pembayaran",
    price: 49000,
  },
  {
    id: "employee_portal",
    name: "Employee Portal",
    iconName: "ContactRound",
    description: "Layanan mandiri untuk karyawan",
    price: 29000,
  },
] as const;

export type ModuleItem = (typeof modules)[number];

export interface FinanceSubModule {
  id: string;
  name: string;
  iconName: string;
  category: "Akuntansi Utama" | "Operasional Transaksi" | "Pajak & Valuta" | "Laporan & Planning";
  description: string;
  frontendPath: string;
  backendPath: string;
  subFeatures: string[];
}

export const financeSubModules: FinanceSubModule[] = [
  {
    id: "jurnal",
    name: "Jurnal & Buku Besar (General Ledger)",
    iconName: "BookOpen",
    category: "Akuntansi Utama",
    description:
      "Pencatatan entri jurnal umum, penyesuaian, penutup, dan mutasi Buku Besar per Chart of Accounts (COA).",
    frontendPath: "app/pages/finance/jurnal/*",
    backendPath: "siarpi-backend/finance/coa/*",
    subFeatures: [
      "Jurnal Umum & Template",
      "Multi-Cost Center",
      "Filtering Buku Besar Real-time",
      "Jurnal Pembalik Otomatis",
    ],
  },
  {
    id: "kas-bank",
    name: "Kas & Bank",
    iconName: "Building2",
    category: "Operasional Transaksi",
    description:
      "Pengelolaan kas masuk, kas keluar, transfer antar rekening bank, dan posting otomatis ke GL.",
    frontendPath: "app/pages/finance/kas-bank/*",
    backendPath: "siarpi-backend/finance/cashbank/*",
    subFeatures: [
      "Kas Masuk & Kas Keluar",
      "Transfer Antar Rekening",
      "Auto-posting ke Buku Besar",
      "Histori Mutation Log",
    ],
  },
  {
    id: "piutang-ar",
    name: "Faktur Penjualan & Piutang (AR)",
    iconName: "Receipt",
    category: "Operasional Transaksi",
    description:
      "Penerbitan faktur penjualan (AR Invoice), penerimaan pembayaran piutang, dan analisis AR Aging.",
    frontendPath: "app/pages/finance/piutang/*",
    backendPath: "siarpi-backend/finance/ar/*",
    subFeatures: [
      "Faktur Penjualan (AR)",
      "Penerimaan Pembayaran Piutang",
      "Analisis AR Aging",
      "Retur Penjualan",
    ],
  },
  {
    id: "hutang-ap",
    name: "Faktur Pembelian & Hutang (AP)",
    iconName: "CreditCard",
    category: "Operasional Transaksi",
    description:
      "Pencatatan faktur pembelian (AP Invoice), pembayaran ke vendor/supplier, dan jadwal jatuh tempo AP Aging.",
    frontendPath: "app/pages/finance/hutang/*",
    backendPath: "siarpi-backend/finance/ap/*",
    subFeatures: [
      "Purchase Invoice (AP)",
      "Pembayaran Vendor",
      "Jadwal AP Aging",
      "Retur Pembelian",
    ],
  },
  {
    id: "aset-tetap",
    name: "Aset Tetap (Fixed Assets)",
    iconName: "Box",
    category: "Operasional Transaksi",
    description:
      "Manajemen siklus hidup aset: perolehan, penyusutan otomatis (Garis Lurus & Saldo Menurun), revaluasi, impairment, dan pelepasan.",
    frontendPath: "app/pages/finance/aset/*",
    backendPath: "siarpi-backend/finance/asset/*",
    subFeatures: [
      "Pencatatan Perolehan Aset",
      "Penyusutan Massal & Single",
      "Revaluasi & Impairment",
      "Pelepasan & Mutasi Aset",
    ],
  },
  {
    id: "pajak",
    name: "Manajemen Pajak (Taxation)",
    iconName: "Percent",
    category: "Pajak & Valuta",
    description:
      "Pengelolaan PPN Masukan/Keluaran, Bukti Potong PPh 21/23/4(2), rekonsiliasi pajak, dan persiapan e-Faktur.",
    frontendPath: "app/pages/finance/pajak/*",
    backendPath: "siarpi-backend/finance/pajak/*",
    subFeatures: [
      "Faktur Pajak PPN",
      "Bukti Potong PPh",
      "Rekonsiliasi Pajak DJP",
      "Pembayaran Pajak",
    ],
  },
  {
    id: "kurs-valuta",
    name: "Kurs Valuta Asing & Multi-Currency",
    iconName: "Globe",
    category: "Pajak & Valuta",
    description:
      "Integrasi real-time Bank Indonesia JISDOR & Kurs Transaksi (USD, SGD, EUR, JPY, GBP, AUD, CNY, MYR, SAR, HKD), grafik tren & detail dinamis per negara.",
    frontendPath: "app/pages/finance/kurs/*",
    backendPath: "siarpi-backend/kurs/*",
    subFeatures: [
      "Real-time BI JISDOR & Kurs Transaksi",
      "Support Multi-Currency",
      "Detail Dinamis Per Negara",
      "Kalkulator Konversi Real-time",
    ],
  },
  {
    id: "budget",
    name: "Anggaran vs Realisasi (Budget vs Actual)",
    iconName: "PieChart",
    category: "Laporan & Planning",
    description:
      "Perencanaan anggaran bulanan/tahunan dan monitoring variance realisasi vs anggaran berdasarkan entri Buku Besar.",
    frontendPath: "app/pages/finance/budget/*",
    backendPath: "siarpi-backend/finance/budget/*",
    subFeatures: [
      "Penganggaran Per Akun COA",
      "Analisis Variance (Selisih)",
      "Mode Bulanan & Tahunan",
      "Insight Realisasi Real-time",
    ],
  },
  {
    id: "laporan",
    name: "Laporan Keuangan (Financial Reports)",
    iconName: "FileSpreadsheet",
    category: "Laporan & Planning",
    description:
      "Penyusunan laporan standar akuntansi: Neraca (Balance Sheet), Laporan Laba/Rugi (Profit & Loss), Arus Kas (Cash Flow), dan Neraca Saldo (Trial Balance).",
    frontendPath: "app/pages/finance/report/*",
    backendPath: "siarpi-backend/finance/report/*",
    subFeatures: [
      "Neraca (Balance Sheet)",
      "Laporan Laba/Rugi",
      "Laporan Arus Kas",
      "Trial Balance / Neraca Saldo",
    ],
  },
  {
    id: "pengaturan",
    name: "Pengaturan Keuangan & COA",
    iconName: "Settings",
    category: "Akuntansi Utama",
    description:
      "Kelola Chart of Accounts (COA), Penomoran Dokumen Otomatis, Penguncian Periode Akuntansi, Saldo Awal, dan Konfigurasi Mata Uang.",
    frontendPath: "app/pages/finance/pengaturan/*",
    backendPath: "siarpi-backend/finance/settings/*",
    subFeatures: [
      "Chart of Accounts (COA)",
      "Penomoran Dokumen",
      "Kunci Periode Akuntansi",
      "Saldo Awal & Sync Kurs BI",
    ],
  },
];

export function getFinanceSubModule(id: string): FinanceSubModule | undefined {
  return financeSubModules.find((item) => item.id === id);
}

/**
 * Resolve iconName (string) -> komponen Lucide.
 * Panggil HANYA saat render (di dalam component function), JANGAN PERNAH
 * simpan hasilnya ke loader return value, useState yang di-dehydrate, dll.
 */
export function getModuleIcon(iconName: string): LucideIcon {
  return ICON_MAP[iconName] ?? Package;
}
