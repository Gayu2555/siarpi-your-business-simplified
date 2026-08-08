import type { FinanceSubModuleDetail } from "./types";

export const hutangAp: FinanceSubModuleDetail = {
  id: "hutang-ap",
  name: "Faktur Pembelian & Hutang (AP)",
  category: "Operasional Transaksi",
  tagline: "Atur Pembayaran Vendor Tepat Waktu & Maksimalkan Diskon Pembelian",
  longDescription:
    "Kontrol seluruh kewajiban pembayaran ke supplier dan vendor. Pantau skedul AP Aging, syarat pembayaran (payment terms), verifikasi faktur tagihan vendor vs PO, hingga eksekusi pembayaran tepat waktu.",
  iconName: "CreditCard",
  keyBenefits: [
    "Jadwal pembayaran AP terstruktur untuk mengoptimalkan arus kas",
    "Pencocokan 3-Arah (3-Way Matching): PO, Laporan Penerimaan, & Invoice",
    "Kelola tagihan berulang & langganan rutin secara otomatis",
  ],
  features: [
    {
      title: "Purchase Invoice (AP)",
      desc: "Catat faktur tagihan dari vendor lengkap dengan pajak PPh 23 / PPN.",
    },
    { title: "Jadwal AP Aging", desc: "Monitor jatuh tempo tagihan supplier 30/60/90 hari." },
    {
      title: "Retur Pembelian & Debit Note",
      desc: "Potong tagihan AP saat ada barang retur ke supplier.",
    },
    {
      title: "Otorisasi Pembayaran Tagihan",
      desc: "Sistem persetujuan berjenjang sebelum transfer pembayaran.",
    },
  ],
  workflowSteps: [
    {
      step: "01",
      title: "Terima Tagihan Vendor",
      desc: "Input AP Invoice hasil verifikasi Surat Jalan & PO.",
    },
    { step: "02", title: "Match & Verifikasi", desc: "Sistem mencocokkan harga & jumlah barang." },
    {
      step: "03",
      title: "Jadwalkan Pembayaran",
      desc: "Pilih tanggal bayar paling optimal untuk cashflow.",
    },
    {
      step: "04",
      title: "Eksekusi Bayar & Cutoff",
      desc: "Catat pembayaran keluar & potong saldo AP.",
    },
  ],
  frontendPath: "app/pages/finance/hutang/*",
  backendPath: "siarpi-backend/finance/ap/*",
  sampleStats: [
    { label: "Total Hutang Dagang", value: "Rp 195.000.000", note: "12 Vendor" },
    { label: "Jatuh Tempo Minggu Ini", value: "Rp 42.000.000", note: "4 Tagihan" },
    { label: "Hemat Diskon Waktu", value: "Rp 6.800.000", note: "Bulan Ini" },
  ],
  sampleRows: [
    {
      code: "AP-2026-041",
      title: "PT Supplier Utama Bahan",
      category: "Purchase AP",
      amount: "Rp 65.000.000",
      status: "Scheduled",
    },
    {
      code: "AP-2026-039",
      title: "CV Logistik Mitra Cepat",
      category: "Freight Invoice",
      amount: "Rp 14.500.000",
      status: "Pending",
    },
    {
      code: "AP-2026-032",
      title: "PT Global IT Solution",
      category: "Software Sub",
      amount: "Rp 22.000.000",
      status: "Paid",
    },
  ],
  faq: [
    {
      q: "Apakah mendukung pencatatan PPh 23 pemotongan vendor?",
      a: "Ya! PPh 23 otomatis terpotong saat pembuatan voucher pembayaran AP.",
    },
    {
      q: "Bisa melihat riwayat transaksi per supplier?",
      a: "Bisa, tersedia Buku Pembantu Hutang per vendor secara detail.",
    },
  ],
};
