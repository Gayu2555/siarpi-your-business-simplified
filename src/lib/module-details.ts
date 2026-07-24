import dashboardFinanceImg from "@/assets/dashboard-finance.png";
import dashboardFinanceSidebarImg from "@/assets/dashboard-finance-sidebar.png";
import financeArImg from "@/assets/finance-ar.png";
import financeApImg from "@/assets/finance-ap.png";

// Detailed content for each module: features, screenshot mockup, testimonials.

export type Feature = { title: string; desc: string };
export type Testimonial = { name: string; role: string; company: string; quote: string; rating: number };
export type ScreenshotBlock = { label: string; value: string; tone: "primary" | "muted" | "accent" };

export type ModuleDetail = {
  tagline: string;
  longDescription: string;
  keyBenefits?: string[];
  features: Feature[];
  // Visual mockup data (rendered as styled cards or asset images)
  mockup: {
    title: string;
    subtitle: string;
    image?: string;
    images?: string[];
    stats: ScreenshotBlock[];
    rows: { label: string; sub: string; value: string }[];
  };
  testimonials: Testimonial[];
  faq: { q: string; a: string }[];
};

export const moduleDetails: Record<string, ModuleDetail> = {
  hr: {
    tagline: "Manajemen karyawan modern untuk tim yang berkembang",
    longDescription:
      "Kelola data karyawan, kontrak, cuti, dan rekrutmen dalam satu tempat. Otomatiskan tugas administratif HR dan fokus pada pengembangan tim.",
    keyBenefits: [
      "Kelola data karyawan, cuti, dan dokumen dalam satu klik",
      "Proses rekrutmen & onboarding lebih cepat dan terstruktur",
      "Evaluasi kinerja tim dengan KPI & 360° feedback"
    ],
    features: [
      { title: "Database Karyawan", desc: "Profil lengkap, kontrak, dokumen, dan riwayat dalam satu klik." },
      { title: "Manajemen Cuti", desc: "Pengajuan & approval cuti otomatis dengan saldo real-time." },
      { title: "Rekrutmen", desc: "Pipeline kandidat, jadwal interview, dan onboarding mulus." },
      { title: "Performance Review", desc: "Goal tracking, KPI, dan feedback 360°." },
    ],
    mockup: {
      title: "Karyawan Aktif",
      subtitle: "Update terakhir 2 menit lalu",
      stats: [
        { label: "Total", value: "248", tone: "primary" },
        { label: "Cuti Hari Ini", value: "12", tone: "accent" },
        { label: "Pending", value: "5", tone: "muted" },
      ],
      rows: [
        { label: "Andi Pratama", sub: "Engineering", value: "Aktif" },
        { label: "Siti Nurhaliza", sub: "Marketing", value: "Cuti" },
        { label: "Budi Santoso", sub: "Finance", value: "Aktif" },
      ],
    },
    testimonials: [
      {
        name: "Rina Wijaya", role: "HR Manager", company: "PT Maju Bersama", rating: 5,
        quote: "Onboarding karyawan baru sekarang cuma 1 hari. Dulu bisa seminggu lebih."
      },
      {
        name: "Doni Saputra", role: "Founder", company: "Kopi Kenangan Lokal", rating: 5,
        quote: "Tim kecil saya bisa kelola 50+ karyawan tanpa perlu admin HR khusus."
      },
    ],
    faq: [
      { q: "Apakah bisa import data karyawan dari Excel?", a: "Ya, mendukung import bulk via CSV/Excel template kami." },
      { q: "Apakah ada limit jumlah karyawan?", a: "Tergantung paket. Basic hingga 50, Pro hingga 500, Enterprise unlimited." },
    ],
  },
  payroll: {
    tagline: "Hitung gaji & pajak otomatis, bayar tepat waktu",
    longDescription:
      "Otomatiskan perhitungan gaji, BPJS, PPh 21, dan slip gaji. Transfer langsung ke rekening karyawan dengan satu klik.",
    keyBenefits: [
      "Perhitungan gaji, BPJS, & PPh 21 akurat otomatis",
      "Kirim slip gaji digital langsung ke smartphone karyawan",
      "Transfer penggajian massal cepat ke seluruh bank lokal"
    ],
    features: [
      { title: "Perhitungan Otomatis", desc: "Gaji pokok, tunjangan, lembur, potongan—semua otomatis." },
      { title: "Pajak PPh 21 & BPJS", desc: "Update tarif terbaru, hitung sesuai regulasi Indonesia." },
      { title: "Slip Gaji Digital", desc: "Karyawan terima slip via email/app, lengkap & rapi." },
      { title: "Bulk Transfer", desc: "Integrasi bank lokal, payroll selesai dalam menit." },
    ],
    mockup: {
      title: "Payroll Bulan Ini",
      subtitle: "Periode 1–30 April 2026",
      stats: [
        { label: "Total Gaji", value: "Rp 1.2M", tone: "primary" },
        { label: "PPh 21", value: "Rp 84jt", tone: "accent" },
        { label: "BPJS", value: "Rp 36jt", tone: "muted" },
      ],
      rows: [
        { label: "Andi Pratama", sub: "Engineering", value: "Rp 12.500.000" },
        { label: "Siti Nurhaliza", sub: "Marketing", value: "Rp 9.800.000" },
        { label: "Budi Santoso", sub: "Finance", value: "Rp 11.200.000" },
      ],
    },
    testimonials: [
      {
        name: "Linda Kusuma", role: "Finance Director", company: "PT Sinar Abadi", rating: 5,
        quote: "Payroll yang dulu makan 3 hari sekarang selesai 30 menit. Game changer."
      },
      {
        name: "Pak Hartono", role: "Owner", company: "UD Berkah Jaya", rating: 5,
        quote: "Pajak dan BPJS auto-hitung. Saya tidak perlu pusing soal compliance."
      },
    ],
    faq: [
      { q: "Apakah mendukung tarif PPh 21 terbaru?", a: "Ya, kami selalu update mengikuti regulasi DJP terbaru." },
      { q: "Bank apa saja yang didukung?", a: "BCA, Mandiri, BNI, BRI, CIMB, Permata, dan bank lainnya." },
    ],
  },
  finance: {
    tagline: "Kelola Keuangan & Pembukuan Bisnis Jadi Lebih Simpel, Bebas Pusing!",
    longDescription:
      "Gak perlu paham akuntansi rumit untuk punya laporan keuangan rapi. Semua transaksi, arus kas, pembayaran, hingga neraca dan laba rugi tercatat otomatis secara akurat & siap pakai kapan saja.",
    keyBenefits: [
      "Automasi pembukuan dan laporan keuangan real-time",
      "Kelola arus kas, piutang, dan hutang otomatis tanpa ribet",
      "Layanan support komprehensif tanpa biaya tambahan"
    ],
    features: [
      { title: "Pembukuan Serba Otomatis", desc: "Setiap transaksi otomatis tercatat di jurnal & buku besar tanpa perlu input manual berulang." },
      { title: "Arus Kas & Bank Real-Time", desc: "Pantau saldo kas masuk, keluar, dan transfer antar bank secara langsung dalam satu tampilan." },
      { title: "Laporan Keuangan Siap Pakai", desc: "Neraca, laba rugi, dan arus kas otomatis tersusun rapi, cocok untuk keputusan bisnis & audit." },
      { title: "Bebas Pusing Pajak & Valuta", desc: "Hitung PPN/PPh otomatis dan pantau kurs valuta asing BI real-time untuk transaksi internasional." },
    ],
    mockup: {
      title: "Tampilan Dashboard Finance Siarpi",
      subtitle: "Tampilan visual intuitif & siap pakai",
      image: dashboardFinanceImg,
      images: [
        dashboardFinanceImg,
        dashboardFinanceSidebarImg,
        financeArImg,
        financeApImg,
      ],
      stats: [
        { label: "Omset Q2", value: "Rp 4.8M", tone: "primary" },
        { label: "Laba Bersih", value: "Rp 1.2M", tone: "accent" },
        { label: "Valuta BI", value: "15+ Valuta", tone: "muted" },
      ],
      rows: [
        { label: "Pembukuan Ganda (GL)", sub: "Otomatis dari Kas & Invoice", value: "Real-time" },
        { label: "Kas & Bank Multi Rekening", sub: "BCA, Mandiri, BRI, Bank BI", value: "Tersinkron" },
        { label: "Faktur Piutang (AR) & Hutang (AP)", sub: "Lengkap Skedul Jatuh Tempo", value: "Teratur" },
        { label: "Laporan Neraca & Laba Rugi", sub: "Siap Cetak & Export", value: "Format Akurat" },
      ],
    },
    testimonials: [
      {
        name: "Bu Sarah", role: "Owner & CEO", company: "CV Mandiri Sejahtera", rating: 5,
        quote: "Sekarang pembukuan bisnis tidak pusing lagi. Laporan keuangan bulanan langsung jadi otomatis tanpa admin khusus!"
      },
      {
        name: "Pak Eko", role: "Finance Manager", company: "PT Dunia Digital", rating: 5,
        quote: "Tampilan dashboard-nya sangat ramah pengusaha. Fitur kas/bank dan kurs BI nya bikin kerjaan hemat jam-jaman!"
      },
    ],
    faq: [
      { q: "Apakah saya harus paham akuntansi untuk memakai modul ini?", a: "Sama sekali tidak! Siarpi dirancang sangat ramah pengguna. Jurnal dan laporan keuangan dibuat otomatis oleh sistem." },
      { q: "Apakah laporan sesuai standar akuntansi Indonesia?", a: "Ya, Neraca, Laba/Rugi, dan Arus Kas disusun otomatis mengikuti standar akuntansi Indonesia (PSAK & SAK ETAP)." },
      { q: "Apakah mendukung transaksi mata uang asing?", a: "Ya, terintegrasi langsung dengan API Kurs Transaksi & JISDOR Bank Indonesia real-time." },
      { q: "Bisa dipadukan dengan modul POS / Sales?", a: "Tentu! Setiap penjualan di POS atau Invoice akan otomatis memposting entri kas & piutang ke modul Finance." },
    ],
  },
  inventory: {
    tagline: "Stok real-time dari gudang ke kasir",
    longDescription:
      "Lacak stok antar gudang, otomatisasi reorder, dan kurangi kerugian akibat kehabisan stok atau overstock.",
    keyBenefits: [
      "Pantau stok barang real-time di semua cabang & gudang",
      "Notifikasi otomatis saat stok menipis (auto reorder)",
      "Stock opname kilat dengan barcode scanner"
    ],
    features: [
      { title: "Multi Gudang", desc: "Kelola stok di banyak lokasi dengan transfer mudah." },
      { title: "Auto Reorder", desc: "Notifikasi otomatis saat stok mendekati batas minimum." },
      { title: "Barcode & SKU", desc: "Scan barcode untuk input/output cepat & akurat." },
      { title: "Stock Opname", desc: "Audit fisik vs sistem dengan selisih otomatis." },
    ],
    mockup: {
      title: "Stok Real-time",
      subtitle: "3 gudang aktif",
      stats: [
        { label: "Total SKU", value: "1.284", tone: "primary" },
        { label: "Low Stock", value: "23", tone: "accent" },
        { label: "Out", value: "4", tone: "muted" },
      ],
      rows: [
        { label: "Kopi Arabika 250g", sub: "SKU-A001", value: "428 pcs" },
        { label: "Kopi Robusta 500g", sub: "SKU-R002", value: "12 pcs" },
        { label: "Mug Keramik", sub: "SKU-M003", value: "0 pcs" },
      ],
    },
    testimonials: [
      {
        name: "Pak Joko", role: "Warehouse Manager", company: "Toko Sembako Berkah", rating: 5,
        quote: "Tidak ada lagi kehabisan stok mendadak. Reorder otomatis sangat membantu."
      },
      {
        name: "Mbak Dewi", role: "Owner", company: "Boutique Anggun", rating: 5,
        quote: "Stock opname yang dulu 2 hari sekarang cuma 2 jam."
      },
    ],
    faq: [
      { q: "Bisa konek ke marketplace?", a: "Ya, sinkronisasi dengan Tokopedia, Shopee, dan Lazada." },
      { q: "Mendukung barcode scanner?", a: "Ya, USB scanner & kamera HP via aplikasi mobile." },
    ],
  },
  project: {
    tagline: "Kelola proyek tim dengan visual yang jelas",
    longDescription:
      "Atur tugas, deadline, dan kolaborasi tim dengan board kanban, gantt chart, dan timeline interaktif.",
    keyBenefits: [
      "Visualisasi progres proyek dengan Kanban & Gantt Chart",
      "Time tracking per tugas untuk efisiensi biaya & beban kerja",
      "Kolaborasi tim seamless tanpa meeting harian berlebih"
    ],
    features: [
      { title: "Kanban Board", desc: "Drag & drop tugas antar status, visual & intuitif." },
      { title: "Gantt Chart", desc: "Timeline proyek dengan dependency antar tugas." },
      { title: "Time Tracking", desc: "Catat jam kerja per tugas untuk billing & evaluasi." },
      { title: "Kolaborasi Tim", desc: "Komentar, mention, dan attachment di setiap tugas." },
    ],
    mockup: {
      title: "Proyek Aktif",
      subtitle: "8 proyek berjalan",
      stats: [
        { label: "On Track", value: "6", tone: "primary" },
        { label: "At Risk", value: "1", tone: "accent" },
        { label: "Delay", value: "1", tone: "muted" },
      ],
      rows: [
        { label: "Redesign Website", sub: "Due 30 Apr", value: "75%" },
        { label: "Mobile App v2", sub: "Due 15 Mei", value: "42%" },
        { label: "Marketing Campaign", sub: "Due 5 Mei", value: "90%" },
      ],
    },
    testimonials: [
      {
        name: "Arif Hidayat", role: "Project Manager", company: "Studio Kreatif", rating: 5,
        quote: "Tim 15 orang bisa sinkron tanpa meeting harian. Hemat waktu banget."
      },
      {
        name: "Maya Putri", role: "Lead Designer", company: "Agensi Visual", rating: 5,
        quote: "Komentar langsung di tugas bikin feedback loop jadi cepat."
      },
    ],
    faq: [
      { q: "Bisa integrasi dengan Slack?", a: "Ya, notifikasi tugas otomatis ke channel Slack pilihan." },
      { q: "Apakah ada mobile app?", a: "Ya, tersedia di iOS & Android untuk update on-the-go." },
    ],
  },
  crm: {
    tagline: "Kelola pelanggan & leads, tutup deal lebih cepat",
    longDescription:
      "Pipeline penjualan visual, otomatisasi follow-up, dan riwayat lengkap interaksi pelanggan.",
    keyBenefits: [
      "Pantau pipeline penjualan visual dari lead hingga closing",
      "Kirim follow-up otomatis via Email & WhatsApp",
      "Riwayat pelanggan 360° dalam satu tampilan terpadu"
    ],
    features: [
      { title: "Sales Pipeline", desc: "Visual deal stages dari lead hingga closing." },
      { title: "Email & WhatsApp", desc: "Kirim broadcast & follow-up langsung dari CRM." },
      { title: "Customer 360°", desc: "Riwayat pembelian, tiket, dan komunikasi dalam satu view." },
      { title: "Sales Analytics", desc: "Conversion rate, sales velocity, dan forecast." },
    ],
    mockup: {
      title: "Sales Pipeline",
      subtitle: "Q2 2026",
      stats: [
        { label: "Total Deal", value: "Rp 2.4M", tone: "primary" },
        { label: "Closed", value: "Rp 680jt", tone: "accent" },
        { label: "Win Rate", value: "32%", tone: "muted" },
      ],
      rows: [
        { label: "PT Solusi Cepat", sub: "Negotiation", value: "Rp 180.000.000" },
        { label: "CV Mitra Bersama", sub: "Proposal", value: "Rp 95.000.000" },
        { label: "Toko Online Maju", sub: "Qualified", value: "Rp 45.000.000" },
      ],
    },
    testimonials: [
      {
        name: "Reza Pratama", role: "Sales Director", company: "PT Solusi B2B", rating: 5,
        quote: "Conversion rate naik 40% sejak pakai pipeline visual ini."
      },
      {
        name: "Indah Sari", role: "Account Manager", company: "Digital Agency", rating: 5,
        quote: "Follow-up otomatis menghemat 2 jam per hari per sales."
      },
    ],
    faq: [
      { q: "Bisa kirim WhatsApp blast?", a: "Ya, terintegrasi dengan WhatsApp Business API." },
      { q: "Ada mobile app untuk sales?", a: "Ya, sales bisa update deal langsung dari lapangan." },
    ],
  },
  absensi: {
    tagline: "Kehadiran karyawan akurat, dari mana saja",
    longDescription:
      "Absensi via face recognition, GPS, atau QR code. Cocok untuk WFO, WFH, dan tim lapangan.",
    keyBenefits: [
      "Absensi akurat anti-titip absen dengan Face Recognition AI",
      "Validasi lokasi kerja karyawan dengan GPS Geofencing",
      "Perhitungan jam kerja, shift, & lembur otomatis"
    ],
    features: [
      { title: "Face Recognition", desc: "Selfie + AI untuk verifikasi identitas anti-titip absen." },
      { title: "GPS & Geofence", desc: "Validasi lokasi sesuai area kerja yang ditentukan." },
      { title: "Shift & Roster", desc: "Atur jadwal shift kompleks dengan rotasi otomatis." },
      { title: "Lembur Otomatis", desc: "Hitung overtime sesuai aturan perusahaan." },
    ],
    mockup: {
      title: "Absensi Hari Ini",
      subtitle: "Senin, 20 April 2026",
      stats: [
        { label: "Hadir", value: "224", tone: "primary" },
        { label: "Telat", value: "8", tone: "accent" },
        { label: "Absen", value: "16", tone: "muted" },
      ],
      rows: [
        { label: "Andi Pratama", sub: "Check-in 08:02", value: "Hadir" },
        { label: "Siti Nurhaliza", sub: "Check-in 08:45", value: "Telat" },
        { label: "Budi Santoso", sub: "WFH", value: "Hadir" },
      ],
    },
    testimonials: [
      {
        name: "Pak Hasan", role: "HRD", company: "PT Konstruksi Maju", rating: 5,
        quote: "Tim lapangan di 5 site bisa absen tanpa ribet, datanya langsung ke HQ."
      },
      {
        name: "Bu Yanti", role: "Manager Operasional", company: "Cafe Chain", rating: 5,
        quote: "Tidak ada lagi titip absen. Face recognition akurat banget."
      },
    ],
    faq: [
      { q: "Apakah bisa offline?", a: "Ya, data tersimpan lokal & sync saat online." },
      { q: "Bagaimana dengan WFH?", a: "Mendukung absensi WFH dengan validasi foto & timestamp." },
    ],
  },
  invoice: {
    tagline: "Tagih pelanggan otomatis, terima bayaran cepat",
    longDescription:
      "Buat invoice profesional dalam hitungan detik, kirim via email/WhatsApp, dan terima pembayaran via transfer/QRIS/VA.",
    keyBenefits: [
      "Buat & kirim invoice profesional via WhatsApp/Email 1 klik",
      "Terima pembayaran instan via QRIS, Virtual Account, & Bank",
      "Reminder penagihan otomatis untuk piutang tepat waktu"
    ],
    features: [
      { title: "Template Cantik", desc: "Invoice profesional dengan logo & branding Anda." },
      { title: "Recurring Invoice", desc: "Tagihan berlangganan otomatis tiap periode." },
      { title: "Payment Link", desc: "Pelanggan bayar via QRIS/VA langsung dari invoice." },
      { title: "Reminder Otomatis", desc: "Follow-up tagihan jatuh tempo via email & WA." },
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
        name: "Pak Anton", role: "Owner", company: "Konsultan IT", rating: 5,
        quote: "Cashflow lebih lancar karena reminder otomatis. Klien bayar lebih cepat."
      },
      {
        name: "Mbak Lia", role: "Admin", company: "PT Distribusi", rating: 5,
        quote: "Buat invoice 50 klien sekarang cuma 10 menit."
      },
    ],
    faq: [
      { q: "Bisa kirim invoice via WhatsApp?", a: "Ya, satu klik untuk kirim PDF + payment link via WA." },
      { q: "Mendukung mata uang asing?", a: "Ya, multi-currency dengan kurs auto-update." },
    ],
  },
  pos: {
    tagline: "Kasir modern untuk toko & resto Anda",
    longDescription:
      "POS yang ringan, cepat, dan terintegrasi dengan inventory & finance. Cocok untuk retail, F&B, dan jasa.",
    keyBenefits: [
      "Transaksi kasir kilat dengan scan barcode & multi-pembayaran",
      "Stok otomatis terpotong & jurnal keuangan langsung tercatat",
      "Struk cetak thermal / struk digital via Email & WhatsApp"
    ],
    features: [
      { title: "Transaksi Cepat", desc: "Scan barcode, hitung total, terima bayar dalam detik." },
      { title: "Multi Pembayaran", desc: "Cash, debit, kredit, QRIS, e-wallet—semua didukung." },
      { title: "Cetak Struk", desc: "Print thermal atau kirim struk digital via email/WA." },
      { title: "Laporan Penjualan", desc: "Per jam, per produk, per kasir—real-time." },
    ],
    mockup: {
      title: "Penjualan Hari Ini",
      subtitle: "Cabang Sudirman • Live",
      stats: [
        { label: "Omzet", value: "Rp 8.4jt", tone: "primary" },
        { label: "Transaksi", value: "142", tone: "accent" },
        { label: "Avg", value: "Rp 59rb", tone: "muted" },
      ],
      rows: [
        { label: "Order #00142", sub: "QRIS • 12:34", value: "Rp 87.000" },
        { label: "Order #00141", sub: "Cash • 12:30", value: "Rp 45.000" },
        { label: "Order #00140", sub: "Debit • 12:28", value: "Rp 124.000" },
      ],
    },
    testimonials: [
      {
        name: "Pak Bambang", role: "Owner", company: "Warung Bakso Mantap", rating: 5,
        quote: "Antrian lebih cepat, pelanggan happy. Omzet naik 20%."
      },
      {
        name: "Ko Andi", role: "Manager", company: "Toko Elektronik", rating: 5,
        quote: "Stok update otomatis tiap transaksi. Tidak ada lagi selisih."
      },
    ],
    faq: [
      { q: "Butuh hardware khusus?", a: "Cukup tablet/laptop. Printer & scanner opsional." },
      { q: "Bisa offline saat internet mati?", a: "Ya, transaksi tetap jalan dan sync saat online." },
    ],
  },
  analytics: {
    tagline: "Insight bisnis dari data, bukan dari tebakan",
    longDescription:
      "Dashboard interaktif yang menggabungkan data dari semua modul. Buat keputusan berbasis data dengan cepat.",
    keyBenefits: [
      "Dashboard bisnis terpadu dari seluruh operasi modul",
      "Analisis tren penjualan, profitabilitas, & performa tim",
      "Export laporan cepat ke PDF/Excel siap presentasi"
    ],
    features: [
      { title: "Custom Dashboard", desc: "Drag & drop widget, susun sesuai kebutuhan tim." },
      { title: "Real-time KPI", desc: "Metrik penting selalu update tanpa refresh." },
      { title: "Forecast & Trend", desc: "Prediksi berbasis AI dari data historis." },
      { title: "Export & Share", desc: "PDF, Excel, atau share link untuk presentasi." },
    ],
    mockup: {
      title: "Business Overview",
      subtitle: "Real-time • 30 hari terakhir",
      stats: [
        { label: "Revenue", value: "Rp 2.8M", tone: "primary" },
        { label: "Growth", value: "+18%", tone: "accent" },
        { label: "Customer", value: "1.247", tone: "muted" },
      ],
      rows: [
        { label: "Top Product", sub: "Kopi Arabika 250g", value: "428 unit" },
        { label: "Top Channel", sub: "Marketplace", value: "Rp 1.2M" },
        { label: "Top Region", sub: "Jakarta", value: "32%" },
      ],
    },
    testimonials: [
      {
        name: "Pak Wira", role: "CEO", company: "Startup Retail", rating: 5,
        quote: "Akhirnya satu dashboard untuk semua. Meeting eksekutif jadi efisien."
      },
      {
        name: "Bu Tina", role: "Marketing Lead", company: "Brand Lokal", rating: 5,
        quote: "Forecast akurat membantu kami plan inventory & campaign."
      },
    ],
    faq: [
      { q: "Bisa connect data dari sistem lain?", a: "Ya, via API atau import CSV/Excel." },
      { q: "Apakah aman?", a: "Data terenkripsi end-to-end, sesuai standar ISO 27001." },
    ],
  },
};
