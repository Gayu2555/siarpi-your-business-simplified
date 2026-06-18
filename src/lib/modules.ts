import {
  Users, Wallet, LineChart, Package, Briefcase,
  HeartHandshake, Clock, FileText, ShoppingCart, BarChart3,
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

const ICON_MAP: Record<string, LucideIcon> = {
  Users,
  Wallet,
  LineChart,
  Package,
  Briefcase,
  HeartHandshake,
  Clock,
  FileText,
  ShoppingCart,
  BarChart3,
};

export const modules = [
  { id: "hr", name: "HR", iconName: "Users", description: "Manajemen karyawan & rekrutmen", price: 49000 },
  { id: "payroll", name: "Payroll", iconName: "Wallet", description: "Gaji otomatis & pajak", price: 79000 },
  { id: "finance", name: "Finance", iconName: "LineChart", description: "Akuntansi & laporan keuangan", price: 99000 },
  { id: "inventory", name: "Inventory", iconName: "Package", description: "Stok barang real-time", price: 69000 },
  { id: "project", name: "Project", iconName: "Briefcase", description: "Manajemen proyek tim", price: 59000 },
  { id: "crm", name: "CRM", iconName: "HeartHandshake", description: "Kelola pelanggan & leads", price: 69000 },
  { id: "absensi", name: "Absensi", iconName: "Clock", description: "Kehadiran & shift", price: 39000 },
  { id: "invoice", name: "Invoice", iconName: "FileText", description: "Tagihan & pembayaran", price: 49000 },
  { id: "pos", name: "POS", iconName: "ShoppingCart", description: "Point of sale toko", price: 79000 },
  { id: "analytics", name: "Analytics", iconName: "BarChart3", description: "Dashboard & insight", price: 89000 },
] as const;

export type ModuleItem = (typeof modules)[number];

/**
 * Resolve iconName (string) -> komponen Lucide.
 * Panggil HANYA saat render (di dalam component function), JANGAN PERNAH
 * simpan hasilnya ke loader return value, useState yang di-dehydrate, dll.
 */
export function getModuleIcon(iconName: string): LucideIcon {
  return ICON_MAP[iconName] ?? Package;
}

export const formatIDR = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;