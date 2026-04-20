import {
  Users, Wallet, LineChart, Package, Briefcase,
  HeartHandshake, Clock, FileText, ShoppingCart, BarChart3
} from "lucide-react";

export const modules = [
  { id: "hr", name: "HR", icon: Users, description: "Manajemen karyawan & rekrutmen", price: 49000 },
  { id: "payroll", name: "Payroll", icon: Wallet, description: "Gaji otomatis & pajak", price: 79000 },
  { id: "finance", name: "Finance", icon: LineChart, description: "Akuntansi & laporan keuangan", price: 99000 },
  { id: "inventory", name: "Inventory", icon: Package, description: "Stok barang real-time", price: 69000 },
  { id: "project", name: "Project", icon: Briefcase, description: "Manajemen proyek tim", price: 59000 },
  { id: "crm", name: "CRM", icon: HeartHandshake, description: "Kelola pelanggan & leads", price: 69000 },
  { id: "absensi", name: "Absensi", icon: Clock, description: "Kehadiran & shift", price: 39000 },
  { id: "invoice", name: "Invoice", icon: FileText, description: "Tagihan & pembayaran", price: 49000 },
  { id: "pos", name: "POS", icon: ShoppingCart, description: "Point of sale toko", price: 79000 },
  { id: "analytics", name: "Analytics", icon: BarChart3, description: "Dashboard & insight", price: 89000 },
] as const;

export type ModuleItem = (typeof modules)[number];

export const formatIDR = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;
