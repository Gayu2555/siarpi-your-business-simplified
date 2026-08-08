import type { FinanceSubModuleDetail } from "./types";

export const asetTetap: FinanceSubModuleDetail = {
  id: "aset-tetap",
  name: "Aset Tetap (Fixed Assets)",
  category: "Operasional Transaksi",
  tagline: "Otomatiskan Penyusutan Aset Perusahaan & Lacak Nilai Buku Real-Time",
  longDescription:
    "Kelola seluruh siklus hidup aset tetap perusahaan: perolehan awal, penentuan umur ekonomis, perhitungan penyusutan bulanan otomatis (Metode Garis Lurus & Saldo Menurun), revaluasi nilai, hingga pelepasan aset (disposal).",
  iconName: "Box",
  keyBenefits: [
    "Perhitungan penyusutan otomatis setiap akhir bulan tanpa hitung manual",
    "Metode Garis Lurus (Straight Line) & Saldo Menurun (Declining Balance)",
    "Pencatatan nilai buku (Book Value) & akumulasi penyusutan akurat",
  ],
  features: [
    {
      title: "Registrasi & Barcode Aset",
      desc: "Daftarkan aset baru lengkap dengan kategori, lokasi, & kode QR/Barcode.",
    },
    {
      title: "Penyusutan Massal (Auto Depreciator)",
      desc: "Proses depresiasi bulanan seluruh aset dalam satu klik.",
    },
    {
      title: "Revaluasi & Impairment",
      desc: "Penyesuaian nilai pasar aset sesuai hasil penilai independen.",
    },
    {
      title: "Pelepasan & Penjualan Aset",
      desc: "Hitung laba/rugi pelepasan aset secara otomatis.",
    },
  ],
  workflowSteps: [
    {
      step: "01",
      title: "Registrasi Perolehan",
      desc: "Catat tanggal beli, harga perolehan, & umur ekonomis.",
    },
    {
      step: "02",
      title: "Penentuan Metode Depresiasi",
      desc: "Pilih Garis Lurus atau Saldo Menurun.",
    },
    {
      step: "03",
      title: "Jurnal Depresiasi Otomatis",
      desc: "Sistem memosting biaya penyusutan bulanan.",
    },
    {
      step: "04",
      title: "Pelepasan / Cut-off Aset",
      desc: "Pencatatan saat aset dijual atau di-write off.",
    },
  ],
  frontendPath: "app/pages/finance/aset/*",
  backendPath: "siarpi-backend/finance/asset/*",
  sampleStats: [
    { label: "Total Aset Perusahaan", value: "Rp 1.450.000.000", note: "42 Unit Aset" },
    { label: "Akumulasi Penyusutan", value: "Rp 320.000.000", note: "Hingga Saat Ini" },
    { label: "Nilai Buku Bersih", value: "Rp 1.130.000.000", note: "Net Book Value" },
  ],
  sampleRows: [
    {
      code: "AST-2024-001",
      title: "Mobil Operasional Toyota Avanza",
      category: "Kendaraan",
      amount: "Rp 210.000.000",
      status: "Active",
    },
    {
      code: "AST-2025-014",
      title: "Server Rack Dell PowerEdge",
      category: "Elektronik",
      amount: "Rp 65.000.000",
      status: "Active",
    },
    {
      code: "AST-2023-005",
      title: "Mesin Produksi Packaging",
      category: "Mesin Pabrik",
      amount: "Rp 450.000.000",
      status: "Active",
    },
  ],
  faq: [
    {
      q: "Apakah metode penyusutan sesuai aturan perpajakan Indonesia?",
      a: "Ya! Mendukung penggolongan Kelompok 1, 2, 3, 4, serta Bangunan sesuai regulasi Pajak.",
    },
    {
      q: "Bagaimana jika aset rusak sebelum umur ekonomis habis?",
      a: "Anda dapat memilih fitur Pelepasan Aset (Disposal) dengan pengakuan rugi penyusutan.",
    },
  ],
};
