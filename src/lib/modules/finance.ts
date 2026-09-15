import type { ModuleDetail } from "./types";
import {
  dashboardFinanceImg,
  dashboardFinanceSidebarImg,
  financeArImg,
  financeApImg,
} from "./assets";

export const finance: ModuleDetail = {
  tagline: "Kelola Keuangan & Pembukuan Bisnis Jadi Lebih Simpel, Bebas Pusing!",
  longDescription:
    "Gak perlu paham akuntansi rumit untuk punya laporan keuangan rapi. Semua transaksi, arus kas, pembayaran, hingga neraca dan laba rugi tercatat otomatis secara akurat & siap pakai kapan saja.",
  keyBenefits: [
    "Automasi pembukuan dan laporan keuangan real-time",
    "Kelola arus kas, piutang, dan hutang otomatis tanpa ribet",
    "Layanan support komprehensif tanpa biaya tambahan",
  ],
  features: [
    {
      title: "Pembukuan Serba Otomatis",
      desc: "Setiap transaksi otomatis tercatat di jurnal & buku besar tanpa perlu input manual berulang.",
    },
    {
      title: "Arus Kas & Bank Real-Time",
      desc: "Pantau saldo kas masuk, keluar, dan transfer antar bank secara langsung dalam satu tampilan.",
    },
    {
      title: "Laporan Keuangan Siap Pakai",
      desc: "Neraca, laba rugi, dan arus kas otomatis tersusun rapi, cocok untuk keputusan bisnis & audit.",
    },
    {
      title: "Bebas Pusing Pajak & Valuta",
      desc: "Hitung PPN/PPh otomatis dan pantau kurs valuta asing BI real-time untuk transaksi internasional.",
    },
    {
      title: "Chart of Accounts Fleksibel",
      desc: "Susun akun keuangan, saldo awal, penomoran, dan periode pembukuan sesuai kebutuhan bisnis.",
    },
    {
      title: "Jurnal & Buku Besar",
      desc: "Kelola jurnal umum, penyesuaian, pembalik, buku besar, dan neraca saldo.",
    },
    {
      title: "Piutang & Hutang Usaha",
      desc: "Pantau invoice, pembayaran, retur, uang muka, aging, dan subledger pelanggan atau vendor.",
    },
    {
      title: "Budget & Cost Center",
      desc: "Bandingkan anggaran dengan realisasi berdasarkan akun dan pusat biaya.",
    },
    {
      title: "Manajemen Aset Tetap",
      desc: "Kelola perolehan, mutasi, depresiasi, revaluasi, impairment, hingga pelepasan aset.",
    },
    {
      title: "Rekonsiliasi Keuangan",
      desc: "Cocokkan kas, bank, dan pencatatan pajak untuk menemukan selisih lebih cepat.",
    },
  ],
  mockup: {
    title: "Tampilan Dashboard Finance Siarpi",
    subtitle: "Tampilan visual intuitif & siap pakai",
    image: dashboardFinanceImg,
    images: [dashboardFinanceImg, dashboardFinanceSidebarImg, financeArImg, financeApImg],
    stats: [
      { label: "Omset Q2", value: "Rp 4.8M", tone: "primary" },
      { label: "Laba Bersih", value: "Rp 1.2M", tone: "accent" },
      { label: "Valuta BI", value: "15+ Valuta", tone: "muted" },
    ],
    rows: [
      { label: "Pembukuan Ganda (GL)", sub: "Otomatis dari Kas & Invoice", value: "Real-time" },
      {
        label: "Kas & Bank Multi Rekening",
        sub: "BCA, Mandiri, BRI, Bank BI",
        value: "Tersinkron",
      },
      {
        label: "Faktur Piutang (AR) & Hutang (AP)",
        sub: "Lengkap Skedul Jatuh Tempo",
        value: "Teratur",
      },
      { label: "Laporan Neraca & Laba Rugi", sub: "Siap Cetak & Export", value: "Format Akurat" },
    ],
  },
  testimonials: [
    {
      name: "Bu Sarah",
      role: "Owner & CEO",
      company: "CV Mandiri Sejahtera",
      rating: 5,
      quote:
        "Sekarang pembukuan bisnis tidak pusing lagi. Laporan keuangan bulanan langsung jadi otomatis tanpa admin khusus!",
    },
    {
      name: "Pak Eko",
      role: "Finance Manager",
      company: "PT Dunia Digital",
      rating: 5,
      quote:
        "Tampilan dashboard-nya sangat ramah pengusaha. Fitur kas/bank dan kurs BI nya bikin kerjaan hemat jam-jaman!",
    },
  ],
  faq: [
    {
      q: "Apakah saya harus paham akuntansi untuk memakai modul ini?",
      a: "Sama sekali tidak! Siarpi dirancang sangat ramah pengguna. Jurnal dan laporan keuangan dibuat otomatis oleh sistem.",
    },
    {
      q: "Apakah laporan sesuai standar akuntansi Indonesia?",
      a: "Ya, Neraca, Laba/Rugi, dan Arus Kas disusun otomatis mengikuti standar akuntansi Indonesia (PSAK & SAK ETAP).",
    },
    {
      q: "Apakah mendukung transaksi mata uang asing?",
      a: "Ya, terintegrasi langsung dengan API Kurs Transaksi & JISDOR Bank Indonesia real-time.",
    },
    {
      q: "Bisa dipadukan dengan alur Sales dan Invoice?",
      a: "Tentu. Setiap invoice penjualan dapat terhubung ke pencatatan kas dan piutang di modul Finance.",
    },
  ],
};
