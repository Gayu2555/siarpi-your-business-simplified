export interface FinanceSubModuleDetail {
  id: string;
  name: string;
  category: string;
  tagline: string;
  longDescription: string;
  iconName: string;
  keyBenefits: string[];
  features: { title: string; desc: string }[];
  workflowSteps: { step: string; title: string; desc: string }[];
  frontendPath: string;
  backendPath: string;
  sampleStats: { label: string; value: string; note: string }[];
  sampleRows: { code: string; title: string; category: string; amount: string; status: string }[];
  comparisons?: { beforeTitle: string; beforeDesc: string; afterTitle: string; afterDesc: string }[];
  faq: { q: string; a: string }[];
}

export const financeSubModuleDetails: Record<string, FinanceSubModuleDetail> = {
  jurnal: {
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
      "Posting otomatis dari invoice, kas/bank, & modul operasional"
    ],
    features: [
      { title: "Multi-Cost Center", desc: "Alokasikan jurnal ke divisi, proyek, atau cabang bisnis tertentu secara fleksibel." },
      { title: "Jurnal Pembalik & Penyesuaian", desc: "Buat ayat penyesuaian otomatis di akhir periode akuntansi." },
      { title: "Audit Trail Lapis Tiga", desc: "Lacak siapa yang mengedit atau memposting entri jurnal lengkap dengan timestamp." },
      { title: "Import & Export Excel", desc: "Dukungan import data historis jurnal dari Excel/CSV tanpa ribet." }
    ],
    workflowSteps: [
      { step: "01", title: "Input / Sync Transaksi", desc: "Transaksi otomatis tersinkron dari Sales, Purchase, atau Kas." },
      { step: "02", title: "Validasi Keseimbangan Debit/Kredit", desc: "Sistem memastikan total Debit = Kredit secara real-time." },
      { step: "03", title: "Posting ke Buku Besar", desc: "Entri langsung terupdate di Buku Besar & Neraca Saldo." },
      { step: "04", title: "Tutup Buku Periode", desc: "Kunci periode akuntansi untuk mencegah perubahan data historis." }
    ],
    frontendPath: "app/pages/finance/jurnal/*",
    backendPath: "siarpi-backend/finance/coa/*",
    sampleStats: [
      { label: "Total Entri Jurnal", value: "14.280", note: "Bulan ini" },
      { label: "Akun COA Aktif", value: "185 Akun", note: "Terstruktur" },
      { label: "Keseimbangan GL", value: "Rp 0 Selisih", note: "Balance 100%" }
    ],
    sampleRows: [
      { code: "JRN-2026-001", title: "Pendapatan Penjualan POS", category: "KAS/GL", amount: "Rp 24.500.000", status: "Posted" },
      { code: "JRN-2026-002", title: "Pembayaran Sewa Kantor", category: "BEBAN", amount: "Rp 15.000.000", status: "Posted" },
      { code: "JRN-2026-003", title: "Penyusutan Peralatan", category: "AKUMULASI", amount: "Rp 2.850.000", status: "Auto-System" },
      { code: "JRN-2026-004", title: "Penyesuaian Biaya Dibayar Dimuka", category: "MEMORIAL", amount: "Rp 4.200.000", status: "Posted" }
    ],
    faq: [
      { q: "Apakah jurnal diposting secara otomatis?", a: "Ya! Setiap transaksi kas, faktur, atau pembayaran akan langsung memposting jurnal ke Buku Besar secara otomatis." },
      { q: "Apakah bisa membuat template jurnal rutin?", a: "Tentu. Anda bisa membuat template untuk transaksi berulang seperti sewa bulanan atau gaji." }
    ]
  },
  "kas-bank": {
    id: "kas-bank",
    name: "Kas & Bank",
    category: "Operasional Transaksi",
    tagline: "Kelola Aliran Kas Masuk, Kas Keluar, & Rekonsiliasi Bank Tanpa Selisih",
    longDescription:
      "Sub-modul Kas & Bank memberikan kontrol penuh atas likuiditas perusahaan. Pantau saldo Kas Kecil (Petty Cash), rekening bank utama, transfer antar bank, dan rekonsiliasi otomatis dengan mutasi bank.",
    iconName: "Building2",
    keyBenefits: [
      "Pantau saldo kas & rekening bank multi-cabang secara real-time",
      "Rekonsiliasi otomatis matching mutasi bank vs pencatatan internal",
      "Otorisasi bertingkat untuk pengeluaran kas bernilai besar"
    ],
    features: [
      { title: "Manajemen Multi-Rekening", desc: "Kelola puluhan rekening BCA, Mandiri, BRI, BNI, dan bank internasional dalam 1 tempat." },
      { title: "Transfer Antar Rekening", desc: "Catat perpindahan dana antar bank internal secara otomatis berpasangan." },
      { title: "Petty Cash Control", desc: "Kelola kas kecil operasional dengan batasan saldo & bukti kwitansi digital." },
      { title: "Histori Mutation Log", desc: "Rekaman mutasi kas masuk/keluar terpisah per sumber transaksi." }
    ],
    workflowSteps: [
      { step: "01", title: "Penerimaan / Pengeluaran", desc: "Input voucher kas atau sync transaksi pembayaran." },
      { step: "02", title: "Approval Manajer", desc: "Verifikasi pengeluaran kas sesuai batas wewenang." },
      { step: "03", title: "Auto-Posting Kas/Bank", desc: "Saldo bank dan jurnal GL diperbarui seketika." },
      { step: "04", title: "Rekonsiliasi Bulanan", desc: "Cocokkan dengan rekening koran bank tanpa selisih." }
    ],
    frontendPath: "app/pages/finance/kas-bank/*",
    backendPath: "siarpi-backend/finance/cashbank/*",
    sampleStats: [
      { label: "Total Likuiditas Kas", value: "Rp 850.400.000", note: "5 Rekening Bank" },
      { label: "Kas Kecil (Petty Cash)", value: "Rp 12.500.000", note: "Terverifikasi" },
      { label: "Rekonsiliasi Bank", value: "99.8%", note: "Matched" }
    ],
    sampleRows: [
      { code: "CB-OUT-089", title: "Bayar Tagihan Listrik & Internet", category: "BCA Utama", amount: "Rp 8.450.000", status: "Approved" },
      { code: "CB-IN-104", title: "Penerimaan Pelunasan Invoice PT ABC", category: "Mandiri Giro", amount: "Rp 45.000.000", status: "Verified" },
      { code: "CB-TRF-012", title: "Transfer Kas Utama ke Petty Cash", category: "Internal Transfer", amount: "Rp 5.000.000", status: "Completed" }
    ],
    faq: [
      { q: "Apakah mendukung rekonsiliasi file CSV dari bank?", a: "Ya! Anda dapat mengunggah mutasi format CSV dari M-Banking BCA, Mandiri, dll." },
      { q: "Bagaimana dengan pengeluaran kas kecil?", a: "Siarpi mendukung metode Imprest maupun Fluctuating Fund untuk Petty Cash." }
    ]
  },
  "piutang-ar": {
    id: "piutang-ar",
    name: "Faktur Penjualan & Piutang (AR)",
    category: "Operasional Transaksi",
    tagline: "Percepat Pelunasan Tagihan Klien & Cegah Piutang Macet Secara Otomatis",
    longDescription:
      "Kelola penerbitan AR Invoice, pemantauan tanggal jatuh tempo, kirim pengingat pembayaran otomatis, hingga analisis umur piutang (AR Aging) untuk menjaga arus kas perusahaan tetap sehat.",
    iconName: "Receipt",
    keyBenefits: [
      "Kirim invoice digital profesional lengkap dengan QRIS & link bayar",
      "Analisis Umur Piutang (AR Aging Schedule) 30, 60, 90+ hari",
      "Notifikasi pengingat otomatis sebelum & saat jatuh tempo"
    ],
    features: [
      { title: "Penerbitan AR Invoice", desc: "Buat faktur penjualan dengan PPN/PPh terhitung otomatis." },
      { title: "Penerimaan Pelunasan AR", desc: "Catat pembayaran parsial atau lunas dari pelanggan." },
      { title: "Retur Penjualan & Credit Note", desc: "Penerbitan nota kredit otomatis memotong sisa tagihan piutang." },
      { title: "Kredit Limit Pelanggan", desc: "Cegah transaksi baru jika pelanggan melampaui batas kredit." }
    ],
    workflowSteps: [
      { step: "01", title: "Terbitkan AR Invoice", desc: "Faktur dibuat otomatis dari Sales Order atau manual." },
      { step: "02", title: "Kirim ke Pelanggan", desc: "Kirim PDF Invoice via WhatsApp & Email dengan QR Code." },
      { step: "03", title: "Notifikasi Jatuh Tempo", desc: "Sistem mengingatkan pelanggan secara otomatis." },
      { step: "04", title: "Penerimaan & Matching", desc: "Pelunasan memotong saldo AR dan mengupdate Kas." }
    ],
    frontendPath: "app/pages/finance/piutang/*",
    backendPath: "siarpi-backend/finance/ar/*",
    sampleStats: [
      { label: "Total Piutang Aktif", value: "Rp 340.000.000", note: "18 Pelanggan" },
      { label: "Belum Jatuh Tempo", value: "Rp 280.000.000", note: "< 30 Hari" },
      { label: "Piutang Berisiko", value: "Rp 15.000.000", note: "> 60 Hari" }
    ],
    sampleRows: [
      { code: "INV-2026-088", title: "PT Teknologi Nusantara", category: "Sales Invoice", amount: "Rp 88.000.000", status: "Unpaid" },
      { code: "INV-2026-074", title: "CV Karsa Bersama", category: "Partial Payment", amount: "Rp 35.000.000", status: "Partial" },
      { code: "INV-2026-061", title: "PT Mitra Sejahtera", category: "Sales Invoice", amount: "Rp 120.000.000", status: "Paid" }
    ],
    faq: [
      { q: "Apakah ada fitur reminder tagihan otomatis?", a: "Ya! Pengingat otomatis dapat dikirimkan melalui WhatsApp / Email." },
      { q: "Bisakah mengatur diskon pembayaran cepat (Early Bird)?", a: "Tentu, mendukung term pembayaran seperti 2/10 n/30." }
    ]
  },
  "hutang-ap": {
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
      "Kelola tagihan berulang & langganan rutin secara otomatis"
    ],
    features: [
      { title: "Purchase Invoice (AP)", desc: "Catat faktur tagihan dari vendor lengkap dengan pajak PPh 23 / PPN." },
      { title: "Jadwal AP Aging", desc: "Monitor jatuh tempo tagihan supplier 30/60/90 hari." },
      { title: "Retur Pembelian & Debit Note", desc: "Potong tagihan AP saat ada barang retur ke supplier." },
      { title: "Otorisasi Pembayaran Tagihan", desc: "Sistem persetujuan berjenjang sebelum transfer pembayaran." }
    ],
    workflowSteps: [
      { step: "01", title: "Terima Tagihan Vendor", desc: "Input AP Invoice hasil verifikasi Surat Jalan & PO." },
      { step: "02", title: "Match & Verifikasi", desc: "Sistem mencocokkan harga & jumlah barang." },
      { step: "03", title: "Jadwalkan Pembayaran", desc: "Pilih tanggal bayar paling optimal untuk cashflow." },
      { step: "04", title: "Eksekusi Bayar & Cutoff", desc: "Catat pembayaran keluar & potong saldo AP." }
    ],
    frontendPath: "app/pages/finance/hutang/*",
    backendPath: "siarpi-backend/finance/ap/*",
    sampleStats: [
      { label: "Total Hutang Dagang", value: "Rp 195.000.000", note: "12 Vendor" },
      { label: "Jatuh Tempo Minggu Ini", value: "Rp 42.000.000", note: "4 Tagihan" },
      { label: "Hemat Diskon Waktu", value: "Rp 6.800.000", note: "Bulan Ini" }
    ],
    sampleRows: [
      { code: "AP-2026-041", title: "PT Supplier Utama Bahan", category: "Purchase AP", amount: "Rp 65.000.000", status: "Scheduled" },
      { code: "AP-2026-039", title: "CV Logistik Mitra Cepat", category: "Freight Invoice", amount: "Rp 14.500.000", status: "Pending" },
      { code: "AP-2026-032", title: "PT Global IT Solution", category: "Software Sub", amount: "Rp 22.000.000", status: "Paid" }
    ],
    faq: [
      { q: "Apakah mendukung pencatatan PPh 23 pemotongan vendor?", a: "Ya! PPh 23 otomatis terpotong saat pembuatan voucher pembayaran AP." },
      { q: "Bisa melihat riwayat transaksi per supplier?", a: "Bisa, tersedia Buku Pembantu Hutang per vendor secara detail." }
    ]
  },
  "aset-tetap": {
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
      "Pencatatan nilai buku (Book Value) & akumulasi penyusutan akurat"
    ],
    features: [
      { title: "Registrasi & Barcode Aset", desc: "Daftarkan aset baru lengkap dengan kategori, lokasi, & kode QR/Barcode." },
      { title: "Penyusutan Massal (Auto Depreciator)", desc: "Proses depresiasi bulanan seluruh aset dalam satu klik." },
      { title: "Revaluasi & Impairment", desc: "Penyesuaian nilai pasar aset sesuai hasil penilai independen." },
      { title: "Pelepasan & Penjualan Aset", desc: "Hitung laba/rugi pelepasan aset secara otomatis." }
    ],
    workflowSteps: [
      { step: "01", title: "Registrasi Perolehan", desc: "Catat tanggal beli, harga perolehan, & umur ekonomis." },
      { step: "02", title: "Penentuan Metode Depresiasi", desc: "Pilih Garis Lurus atau Saldo Menurun." },
      { step: "03", title: "Jurnal Depresiasi Otomatis", desc: "Sistem memposting biaya penyusutan bulanan." },
      { step: "04", title: "Pelepasan / Cut-off Aset", desc: "Pencatatan saat aset dijual atau di-write off." }
    ],
    frontendPath: "app/pages/finance/aset/*",
    backendPath: "siarpi-backend/finance/asset/*",
    sampleStats: [
      { label: "Total Aset Perusahaan", value: "Rp 1.450.000.000", note: "42 Unit Aset" },
      { label: "Akumulasi Penyusutan", value: "Rp 320.000.000", note: "Hingga Saat Ini" },
      { label: "Nilai Buku Bersih", value: "Rp 1.130.000.000", note: "Net Book Value" }
    ],
    sampleRows: [
      { code: "AST-2024-001", title: "Mobil Operasional Toyota Avanza", category: "Kendaraan", amount: "Rp 210.000.000", status: "Active" },
      { code: "AST-2025-014", title: "Server Rack Dell PowerEdge", category: "Elektronik", amount: "Rp 65.000.000", status: "Active" },
      { code: "AST-2023-005", title: "Mesin Produksi Packaging", category: "Mesin Pabrik", amount: "Rp 450.000.000", status: "Active" }
    ],
    faq: [
      { q: "Apakah metode penyusutan sesuai aturan perpajakan Indonesia?", a: "Ya! Mendukung penggolongan Kelompok 1, 2, 3, 4, serta Bangunan sesuai regulasi Pajak." },
      { q: "Bagaimana jika aset rusak sebelum umur ekonomis habis?", a: "Anda dapat memilih fitur Pelepasan Aset (Disposal) dengan pengakuan rugi penyusutan." }
    ]
  },
  pajak: {
    id: "pajak",
    name: "Manajemen Pajak (Taxation)",
    category: "Pajak & Valuta",
    tagline: "Otomatisasi Hitung PPN & PPh, Rekonsiliasi Pajak, & Siap Export e-Faktur",
    longDescription:
      "Sub-modul Pajak Siarpi menyederhanakan kewajiban perpajakan bisnis Anda. Kelola PPN Masukan & Keluaran, pembuatan bukti potong PPh 21, 23, 4(2), rekonsiliasi SPT, dan persiapan file CSV/JSON siap impor ke e-Faktur DJP.",
    iconName: "Percent",
    keyBenefits: [
      "Rekonsiliasi PPN Masukan vs Keluaran otomatis tanpa selisih",
      "Pembuatan Bukti Potong PPh 23 / PPh 4(2) instan saat transaksi",
      "Format data sesuai regulasi e-Faktur & DJP Online terbaru"
    ],
    features: [
      { title: "Faktur Pajak PPN", desc: "Penerbitan nomor Seri Faktur Pajak (NSFP) & validasi format." },
      { title: "Bukti Potong PPh", desc: "Cetak bukti potong PPh 23/26 & PPh Final Pasal 4 ayat 2." },
      { title: "Rekonsiliasi Pajak vs GL", desc: "Cocokkan akun utang pajak di Buku Besar dengan rekap SPT." },
      { title: "Export Siap e-Faktur", desc: "Unduh CSV format standar e-Faktur DJP dalam hitungan detik." }
    ],
    workflowSteps: [
      { step: "01", title: "Recording Pajak Transaksi", desc: "Pajak terhitung otomatis saat transaksi diajukan." },
      { step: "02", title: "Penerbitan Faktur / Bukpot", desc: "Generate nomor seri faktur & lembar bukti potong." },
      { step: "03", title: "Rekonsiliasi Masa Pajak", desc: "Verifikasi PPN Masukan vs Keluaran bulanan." },
      { step: "04", title: "Export CSV e-Faktur / SPT", desc: "File siap diunggah ke portal e-Faktur DJP Online." }
    ],
    frontendPath: "app/pages/finance/pajak/*",
    backendPath: "siarpi-backend/finance/pajak/*",
    sampleStats: [
      { label: "PPN Keluaran Masa Ini", value: "Rp 98.400.000", note: "Terfaktur" },
      { label: "PPN Masukan Masa Ini", value: "Rp 64.200.000", note: "Dapat Dikreditkan" },
      { label: "PPN Kurang Bayar", value: "Rp 34.200.000", note: "Siap Setor" }
    ],
    sampleRows: [
      { code: "TAX-PPN-044", title: "Faktur Pajak Keluaran PT ABC", category: "PPN 11%", amount: "Rp 14.300.000", status: "Verified" },
      { code: "TAX-PPH-019", title: "Bukti Potong PPh 23 Jasa Konsultan", category: "PPh 23 (2%)", amount: "Rp 1.200.000", status: "Generated" },
      { code: "TAX-PPN-038", title: "Faktur Pajak Masukan PT Supplier", category: "PPN Masukan", amount: "Rp 8.700.000", status: "Credited" }
    ],
    faq: [
      { q: "Apakah tarif PPN otomatis mengikuti aturan 11% / 12%?", a: "Ya! Tarif pajak dapat dikonfigurasi dan otomatis menyesuaikan regulasi pemerintah." },
      { q: "Apakah bisa langsung ekspor ke e-Faktur?", a: "Bisa, format CSV sesuai dengan skema impor e-Faktur DJP terbaru." }
    ]
  },
  "kurs-valuta": {
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
      "Hitung otomatis Laba/Rugi Selisih Kurs (Realized & Unrealized Gain/Loss)"
    ],
    features: [
      { title: "Auto Sync BI JISDOR", desc: "Pembaruan otomatis data kurs Bank Indonesia setiap hari kerja." },
      { title: "Support 10+ Mata Uang Utama", desc: "Kelola USD, EUR, SGD, JPY, GBP, AUD, CNY, MYR, SAR, HKD." },
      { title: "Revaluasi Saldo Valas", desc: "Penyesuaian saldo akun valas pada akhir periode akuntansi." },
      { title: "Grafik Tren & Historis", desc: "Visualisasi pergerakan nilai tukar mata uang interaktif." }
    ],
    workflowSteps: [
      { step: "01", title: "Fetch Kurs BI Real-Time", desc: "Sistem menarik data kurs terbaru dari API Bank Indonesia." },
      { step: "02", title: "Transaksi Valas", desc: "Input invoice / kas dalam valuta asing (misal USD)." },
      { step: "03", title: "Konversi ke IDR", desc: "Sistem mencatat nilai ekivalen Rupiah pada saat transaksi." },
      { step: "04", title: "Posting Selisih Kurs", desc: "Hitung laba/rugi selisih kurs saat pelunasan / revaluasi." }
    ],
    frontendPath: "app/pages/finance/kurs/*",
    backendPath: "siarpi-backend/kurs/*",
    sampleStats: [
      { label: "USD/IDR BI JISDOR", value: "Rp 16.245", note: "Update Hari Ini" },
      { label: "SGD/IDR Transaksi", value: "Rp 12.180", note: "Bank Indonesia" },
      { label: "Laba Selisih Kurs", value: "Rp 14.800.000", note: "Unrealized Gain" }
    ],
    sampleRows: [
      { code: "USD", title: "Dolar Amerika Serikat", category: "Mata Uang Utama", amount: "16.245 IDR", status: "Live BI" },
      { code: "SGD", title: "Dolar Singapura", category: "Regional Asia", amount: "12.180 IDR", status: "Live BI" },
      { code: "EUR", title: "Euro Eropa", category: "Global Currency", amount: "17.450 IDR", status: "Live BI" },
      { code: "JPY", title: "Yen Jepang (100 JPY)", category: "East Asia", amount: "10.420 IDR", status: "Live BI" }
    ],
    faq: [
      { q: "Dari mana sumber data kurs valuta asing?", a: "Langsung dari API resmi Bank Indonesia (JISDOR & Kurs Transaksi)." },
      { q: "Apakah mendukung penginputan kurs manual?", a: "Ya, Anda tetap bisa memasukkan kurs negosiasi kustom jika ada kesepakatan khusus." }
    ]
  },
  budget: {
    id: "budget",
    name: "Anggaran vs Realisasi (Budget vs Actual)",
    category: "Laporan & Planning",
    tagline: "Perencanaan Anggaran Presisi & Monitoring Selisih Realisasi Real-Time",
    longDescription:
      "Kendalikan pengeluaran bisnis dengan fitur Anggaran vs Realisasi. Tetapkan budget bulanan atau tahunan per akun COA & divisi, lalu pantau persentase penyerapan anggaran secara real-time untuk mencegah pembengkakan biaya.",
    iconName: "PieChart",
    keyBenefits: [
      "Monitoring selisih anggaran (Variance Analysis) secara langsung",
      "Peringatan dini (Early Warning System) saat penyerapan budget mendekati 90%",
      "Perencanaan fleksibel per bulan, kuartal, atau tahunan"
    ],
    features: [
      { title: "Penganggaran Per COA", desc: "Tentukan plafon batas anggaran untuk setiap akun beban & pendapatan." },
      { title: "Variance Analysis", desc: "Tampilan visual perbandingan Budget vs Actual lengkap dengan persentase." },
      { title: "Persetujuan Anggaran Tambahan", desc: "Alur revisi budget jika terjadi perubahan kebutuhan operasional." },
      { title: "Laporan Per Kategori Divisi", desc: "Filter penyerapan budget per departemen atau proyek." }
    ],
    workflowSteps: [
      { step: "01", title: "Penyusunan Plan Budget", desc: "Input target anggaran per akun di awal periode." },
      { step: "02", title: "Posting Transaksi Realisasi", desc: "Setiap transaksi otomatis memotong saldo budget." },
      { step: "03", title: "Real-time Monitoring", desc: "Pantau persentase penyerapan via dashboard." },
      { step: "04", title: "Evaluasi Variance", desc: "Analisis hemat / boros anggaran di akhir bulan." }
    ],
    frontendPath: "app/pages/finance/budget/*",
    backendPath: "siarpi-backend/finance/budget/*",
    sampleStats: [
      { label: "Total Budget Q2", value: "Rp 1.200.000.000", note: "Target Plafon" },
      { label: "Realisasi Biaya", value: "Rp 840.000.000", note: "70.0% Terpakai" },
      { label: "Sisa Anggaran", value: "Rp 360.000.000", note: "Hemat 30%" }
    ],
    sampleRows: [
      { code: "BDG-MKT", title: "Beban Pemasaran & Iklan", category: "Marketing", amount: "Rp 150.000.000", status: "78% Used" },
      { code: "BDG-OPS", title: "Beban Operasional Kantor", category: "General Ops", amount: "Rp 85.000.000", status: "62% Used" },
      { code: "BDG-IT", title: "Beban Infrastruktur IT & Server", category: "Technology", amount: "Rp 40.000.000", status: "91% Alert" }
    ],
    faq: [
      { q: "Apa yang terjadi jika transaksi melebihi budget?", a: "Sistem dapat dikonfigurasi untuk memblokir transaksi (Strict) atau mengirim notifikasi ke manajer (Warn)." },
      { q: "Apakah budget bisa di-carry over ke bulan berikutnya?", a: "Bisa, tersedia opsi Carry-Over sisa anggaran ke periode selanjutnya." }
    ]
  },
  laporan: {
    id: "laporan",
    name: "Laporan Keuangan (Financial Reports)",
    category: "Laporan & Planning",
    tagline: "Laporan Laba/Rugi, Neraca, & Arus Kas Otomatis Sesuai Standar Akuntansi",
    longDescription:
      "Penyusunan laporan keuangan komprehensif dalam satu klik. Dapatkan Laporan Neraca (Balance Sheet), Laba/Rugi (Profit & Loss), Arus Kas (Cash Flow), dan Neraca Saldo (Trial Balance) yang siap dicetak atau diekspor ke PDF/Excel.",
    iconName: "FileSpreadsheet",
    keyBenefits: [
      "Laporan tersusun otomatis dari data transaksi GL tanpa input manual",
      "Sesuai standar akuntansi keuangan Indonesia (PSAK & SAK ETAP)",
      "Export instan ke format PDF profesional & Microsoft Excel"
    ],
    features: [
      { title: "Laporan Neraca (Balance Sheet)", desc: "Aset, Kewajiban, dan Ekuitas tersusun seimbang." },
      { title: "Laporan Laba/Rugi (Profit & Loss)", desc: "Breakdown pendapatan, HPP, beban operasional, & laba bersih." },
      { title: "Laporan Arus Kas (Cash Flow)", desc: "Metode langsung / tidak langsung: Operasi, Investasi, & Pendanaan." },
      { title: "Neraca Saldo (Trial Balance)", desc: "Pengecekan saldo debit & kredit seluruh akun sebelum tutup buku." }
    ],
    workflowSteps: [
      { step: "01", title: "Pilih Jenis Laporan", desc: "Pilih Neraca, Laba Rugi, Arus Kas, atau Trial Balance." },
      { step: "02", title: "Tentukan Periode & Cabang", desc: "Filter bulanan, tahunan, atau komparatif antar periode." },
      { step: "03", title: "Generate Laporan Instan", desc: "Sistem menyusun laporan berstruktur akuntansi." },
      { step: "04", title: "Cetak & Export PDF/Excel", desc: "Unduh file siap dipresentasikan ke jajaran manajemen / auditor." }
    ],
    frontendPath: "app/pages/finance/report/*",
    backendPath: "siarpi-backend/finance/report/*",
    sampleStats: [
      { label: "Pendapatan Bersih", value: "Rp 2.450.000.000", note: "Bulan Ini" },
      { label: "Laba Bersih (Net Profit)", value: "Rp 680.000.000", note: "Margin 27.7%" },
      { label: "Total Aset Neraca", value: "Rp 5.800.000.000", note: "Balance 100%" }
    ],
    sampleRows: [
      { code: "REP-PL", title: "Laporan Laba Rugi Komprehensif", category: "Financial", amount: "Laba Rp 680 Jt", status: "Ready" },
      { code: "REP-BS", title: "Laporan Neraca Keuangan", category: "Balance Sheet", amount: "Aset Rp 5.8 M", status: "Ready" },
      { code: "REP-CF", title: "Laporan Arus Kas (Cash Flow)", category: "Cash Flow", amount: "Surplus Kas", status: "Ready" },
      { code: "REP-TB", title: "Neraca Saldo (Trial Balance)", category: "Verification", amount: "Balance 100%", status: "Ready" }
    ],
    faq: [
      { q: "Apakah bisa membandingkan laporan bulan ini dengan bulan lalu?", a: "Ya! Fitur Komparatif memungkinkan perbandingan 2 atau lebih periode berdampingan." },
      { q: "Apakah laporan bisa difilter per cabang / unit bisnis?", a: "Bisa, mendukung multi-cabang dan konsolidasi keseluruhan bisnis." }
    ]
  },
  pengaturan: {
    id: "pengaturan",
    name: "Pengaturan Keuangan & COA",
    category: "Akuntansi Utama",
    tagline: "Konfigurasi Bagan Akun (COA), Penomoran Dokumen, & Kunci Periode",
    longDescription:
      "Pusat kendali konfigurasi modul Finance Siarpi. Atur struktur Bagan Akun (Chart of Accounts / COA), format penomoran dokumen transaksi otomatis, penguncian periode akuntansi, saldo awal, dan preferensi mata uang.",
    iconName: "Settings",
    keyBenefits: [
      "Fleksibilitas penuh mengatur struktur COA sesuai kebutuhan bisnis",
      "Penomoran otomatis invoice & voucher transaksi dengan penyesuaian format",
      "Fitur Lock Period untuk mencegah perubahan data laporan yang sudah diaudit"
    ],
    features: [
      { title: "Chart of Accounts (COA)", desc: "Tambah, edit, & kelompokkan akun Aset, Kewajiban, Ekuitas, Pendapatan, & Beban." },
      { title: "Auto Document Numbering", desc: "Format kode penomoran otomatis dengan prefix tahun/bulan (misal: INV/2026/04/001)." },
      { title: "Kunci Periode (Lock Period)", desc: "Kunci transaksi bulan lalu agar tidak dapat diubah oleh staf." },
      { title: "Setup Saldo Awal", desc: "Input saldo awal akun & piutang/hutang saat migrasi ke Siarpi." }
    ],
    workflowSteps: [
      { step: "01", title: "Setup COA Master", desc: "Kelola bagan akun induk dan sub-akun pendukung." },
      { step: "02", title: "Konfigurasi Auto-Number", desc: "Set aturan penomoran voucher transaksi." },
      { step: "03", title: "Input Saldo Awal", desc: "Masukkan saldo awal periode berjalan." },
      { step: "04", title: "Setting Kunci Periode", desc: "Aktifkan penguncian tanggal untuk keutuhan data." }
    ],
    frontendPath: "app/pages/finance/pengaturan/*",
    backendPath: "siarpi-backend/finance/settings/*",
    sampleStats: [
      { label: "Bagan Akun (COA)", value: "185 Master Akun", note: "Terstruktur" },
      { label: "Status Periode", value: "Maret 2026 Locked", note: "Data Aman" },
      { label: "Prefix Dokumen", value: "12 Template", note: "Otomatis" }
    ],
    sampleRows: [
      { code: "COA-1000", title: "Kas & Bank (Asset)", category: "Master COA", amount: "Sub-Akun: 6", status: "Active" },
      { code: "CFG-NUM", title: "Penomoran Invoice & Voucher", category: "Auto-Number", amount: "Prefix Custom", status: "Active" },
      { code: "CFG-LOCK", title: "Penguncian Periode Transaksi", category: "Security", amount: "Locked < Apr", status: "Active" }
    ],
    faq: [
      { q: "Bisakah mengimpor struktur COA dari sistem lama?", a: "Sangat bisa! Siarpi menyediakan template Excel untuk impor massal COA." },
      { q: "Siapa saja yang bisa membuka penguncian periode?", a: "Hanya pengguna bertipe Administrator / Manager Finance yang memiliki wewenang unlock." }
    ]
  }
};
