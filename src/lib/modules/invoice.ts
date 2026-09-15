import type { ModuleDetail } from "./types";

export const invoice: ModuleDetail = {
  tagline: "Kelola invoice dan tagihan tanpa kehilangan jatuh tempo",
  longDescription:
    "Buat invoice penjualan dan tagihan pembelian, kelola pembayaran, retur, uang muka, serta pantau posisi piutang dan hutang dalam satu alur.",
  keyBenefits: [
    "Buat invoice penjualan dan tagihan pembelian dengan data yang konsisten",
    "Pantau status pembayaran dan tanggal jatuh tempo",
    "Tinjau aging piutang dan hutang untuk menjaga arus kas",
  ],
  features: [
    {
      title: "Invoice Penjualan",
      desc: "Buat tagihan pelanggan dengan item, jumlah, harga, pajak, dan diskon.",
    },
    {
      title: "Tagihan Pembelian",
      desc: "Catat kewajiban kepada vendor beserta detail transaksi dan jatuh tempo.",
    },
    {
      title: "Draft & Finalisasi",
      desc: "Siapkan transaksi sebagai draft sebelum diterbitkan menjadi dokumen resmi.",
    },
    {
      title: "Pelanggan & Vendor",
      desc: "Gunakan data pihak terkait secara konsisten pada setiap transaksi.",
    },
    {
      title: "Pajak & Diskon",
      desc: "Terapkan komponen pajak dan diskon pada item atau dokumen transaksi.",
    },
    {
      title: "Uang Muka",
      desc: "Catat down payment pelanggan atau vendor dan hubungkan ke transaksi terkait.",
    },
    {
      title: "Penerimaan Pembayaran",
      desc: "Catat pembayaran piutang dan perbarui saldo invoice pelanggan.",
    },
    { title: "Pembayaran Vendor", desc: "Kelola pelunasan hutang berdasarkan tagihan pembelian." },
    {
      title: "Retur & Koreksi",
      desc: "Dokumentasikan retur penjualan maupun pembelian yang memengaruhi saldo.",
    },
    {
      title: "Status & Jatuh Tempo",
      desc: "Pantau transaksi lunas, belum lunas, dan melewati jatuh tempo.",
    },
    {
      title: "Aging Piutang & Hutang",
      desc: "Kelompokkan saldo berdasarkan umur untuk menentukan prioritas tindak lanjut.",
    },
  ],
  mockup: {
    title: "Invoice Bulan Ini",
    subtitle: "Total 84 invoice terkirim",
    stats: [
      { label: "Lunas", value: "62", tone: "primary" },
      { label: "Pending", value: "18", tone: "accent" },
      { label: "Overdue", value: "4", tone: "muted" },
    ],
    rows: [
      { label: "INV-2026-0084", sub: "PT Solusi Cepat", value: "Rp 12.500.000" },
      { label: "INV-2026-0083", sub: "CV Mitra Jaya", value: "Rp 4.200.000" },
      { label: "INV-2026-0082", sub: "Toko Online Sukses", value: "Rp 8.900.000" },
    ],
  },
  testimonials: [
    {
      name: "Pak Anton",
      role: "Owner",
      company: "Konsultan IT",
      rating: 5,
      quote: "Cashflow lebih lancar karena reminder otomatis. Klien bayar lebih cepat.",
    },
    {
      name: "Mbak Lia",
      role: "Admin",
      company: "PT Distribusi",
      rating: 5,
      quote: "Buat invoice 50 klien sekarang cuma 10 menit.",
    },
  ],
  faq: [
    {
      q: "Apakah Invoice mendukung transaksi penjualan dan pembelian?",
      a: "Ya. Modul mencakup invoice pelanggan serta pencatatan tagihan dari vendor.",
    },
    {
      q: "Apakah pembayaran dapat dilacak?",
      a: "Ya. Pembayaran dicatat terhadap invoice sehingga status dan sisa saldo dapat dipantau.",
    },
  ],
};
