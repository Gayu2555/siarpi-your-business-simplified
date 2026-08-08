import type { FinanceSubModuleDetail } from "./types";

export const kursValuta: FinanceSubModuleDetail = {
  id: "kurs-valuta",
  name: "Kurs Valuta Asing & Multi-Currency",
  category: "Pajak & Valuta",
  tagline: "Integrasi Real-Time Bank Indonesia JISDOR & Otomatisasi Selisih Kurs",
  longDescription:
    "Sub-modul Kurs & Multi-Currency mengotomatiskan pencatatan transaksi valuta asing. Terintegrasi langsung dengan API Kurs Transaksi & JISDOR Bank Indonesia untuk 10+ mata uang utama (USD, SGD, EUR, JPY, GBP, AUD, CNY, MYR, SAR, HKD), lengkap dengan penghitungan laba/rugi selisih kurs otomatis.",
  iconName: "Globe",
  keyBenefits: [
    "Sync otomatis Kurs Transaksi & JISDOR Bank Indonesia harian",
    "Kalkulator konversi valuta asing real-time",
    "Hitung otomatis Laba/Rugi Selisih Kurs (Realized & Unrealized Gain/Loss)",
  ],
  features: [
    {
      title: "Auto Sync BI JISDOR",
      desc: "Pembaruan otomatis data kurs Bank Indonesia setiap hari kerja.",
    },
    {
      title: "Support 10+ Mata Uang Utama",
      desc: "Kelola USD, EUR, SGD, JPY, GBP, AUD, CNY, MYR, SAR, HKD.",
    },
    {
      title: "Revaluasi Saldo Valas",
      desc: "Penyesuaian saldo akun valas pada akhir periode akuntansi.",
    },
    {
      title: "Grafik Tren & Historis",
      desc: "Visualisasi pergerakan nilai tukar mata uang interaktif.",
    },
  ],
  workflowSteps: [
    {
      step: "01",
      title: "Fetch Kurs BI Real-Time",
      desc: "Sistem menarik data kurs terbaru dari API Bank Indonesia.",
    },
    {
      step: "02",
      title: "Transaksi Valas",
      desc: "Input invoice / kas dalam valuta asing (misal USD).",
    },
    {
      step: "03",
      title: "Konversi ke IDR",
      desc: "Sistem mencatat nilai ekivalen Rupiah pada saat transaksi.",
    },
    {
      step: "04",
      title: "Posting Selisih Kurs",
      desc: "Hitung laba/rugi selisih kurs saat pelunasan / revaluasi.",
    },
  ],
  frontendPath: "app/pages/finance/kurs/*",
  backendPath: "siarpi-backend/kurs/*",
  sampleStats: [
    { label: "USD/IDR BI JISDOR", value: "Rp 16.245", note: "Update Hari Ini" },
    { label: "SGD/IDR Transaksi", value: "Rp 12.180", note: "Bank Indonesia" },
    { label: "Laba Selisih Kurs", value: "Rp 14.800.000", note: "Unrealized Gain" },
  ],
  sampleRows: [
    {
      code: "USD",
      title: "Dolar Amerika Serikat",
      category: "Mata Uang Utama",
      amount: "16.245 IDR",
      status: "Live BI",
    },
    {
      code: "SGD",
      title: "Dolar Singapura",
      category: "Regional Asia",
      amount: "12.180 IDR",
      status: "Live BI",
    },
    {
      code: "EUR",
      title: "Euro Eropa",
      category: "Global Currency",
      amount: "17.450 IDR",
      status: "Live BI",
    },
    {
      code: "JPY",
      title: "Yen Jepang (100 JPY)",
      category: "East Asia",
      amount: "10.420 IDR",
      status: "Live BI",
    },
  ],
  faq: [
    {
      q: "Dari mana sumber data kurs valuta asing?",
      a: "Langsung dari API resmi Bank Indonesia (JISDOR & Kurs Transaksi).",
    },
    {
      q: "Apakah mendukung penginputan kurs manual?",
      a: "Ya, Anda tetap bisa memasukkan kurs negosiasi kustom jika ada kesepakatan khusus.",
    },
  ],
};
