import type { ArticleData } from "@/lib/articles";

export const readinessArticles: Record<string, ArticleData> = {
  "5-tanda-usaha-butuh-software-akuntansi": {
    slug: "5-tanda-usaha-butuh-software-akuntansi",
    title: "5 Tanda Usaha Kamu Sudah Mulai Membutuhkan Software Akuntansi",
    subtitle:
      "Kenali saat spreadsheet, catatan manual, dan aplikasi yang terpisah mulai menghambat arus kas, penagihan, kontrol stok, serta keputusan bisnis.",
    category: "Software Akuntansi",
    readTime: "8 menit baca",
    author: "Tim Finance Siarpi",
    publishedDate: "15 September 2026",
    summary:
      "Software akuntansi mulai dibutuhkan ketika masalah pencatatan terjadi berulang dan memengaruhi uang, pelanggan, persediaan, atau keputusan. Lima tanda berikut membantu pemilik usaha menentukan apakah sudah waktunya beralih, proses apa yang harus diprioritaskan, dan hasil apa yang perlu diukur.",
    sections: [
      {
        id: "uang-ada-laba-tidak-jelas",
        heading: "1. Saldo Bank Terlihat, tetapi Laba dan Arus Kas Tidak Jelas",
        paragraphs: [
          "Saldo rekening hanya menunjukkan jumlah uang pada satu waktu. Angka tersebut belum menjelaskan berapa yang berasal dari pendapatan, uang muka, pinjaman, kewajiban pajak, atau dana yang harus segera dibayarkan kepada pemasok.",
          "Jika pemilik usaha harus bertanya ke banyak orang atau membuka beberapa file untuk mengetahui laba, piutang, hutang, dan kebutuhan kas minggu depan, pencatatan sudah tidak cukup mendukung keputusan harian.",
        ],
        bullets: [
          "Laba baru diketahui beberapa minggu setelah bulan berakhir.",
          "Pengeluaran pribadi dan usaha masih sering tercampur.",
          "Perusahaan terlihat untung tetapi terus kekurangan kas.",
          "Tidak ada proyeksi pembayaran pelanggan dan kewajiban terdekat.",
        ],
        keyTakeaway:
          "Software yang tepat harus menghubungkan transaksi dengan laporan, bukan sekadar menjadi tempat mengetik pemasukan dan pengeluaran.",
      },
      {
        id: "rekap-memakan-waktu",
        heading: "2. Rekap dan Rekonsiliasi Memakan Waktu Berhari-hari",
        paragraphs: [
          "Ketika data penjualan, pembelian, kas, dan bank berada pada file berbeda, tim harus menyalin transaksi dan mencari selisih secara manual. Semakin tinggi volume transaksi, semakin besar pula risiko salah nominal, tanggal, akun, atau duplikasi.",
          "Tanda paling jelas adalah pekerjaan finance selalu menumpuk menjelang akhir bulan. Tim sibuk memperbaiki data lama sehingga tidak sempat menganalisis margin, biaya, dan arus kas.",
        ],
        bullets: [
          "Transaksi yang sama dimasukkan ke lebih dari satu file atau aplikasi.",
          "Mutasi bank dicocokkan satu per satu tanpa status yang jelas.",
          "Perubahan formula spreadsheet dapat mengubah laporan tanpa jejak audit.",
          "Tutup buku sering tertunda karena dokumen pendukung belum ditemukan.",
        ],
        callout: {
          type: "warning",
          text: "Menambah staf untuk menyalin data hanya meningkatkan kapasitas kerja manual. Ukur berapa jam yang dihabiskan untuk input ulang dan koreksi sebelum memilih solusi.",
        },
      },
      {
        id: "invoice-piutang-terlewat",
        heading: "3. Invoice dan Piutang Mulai Terlewat",
        paragraphs: [
          "Penjualan belum menjadi kas sampai pelanggan membayar. Jika invoice dibuat dari template terpisah dan jatuh tempo dipantau secara manual, tagihan mudah terlambat dikirim, salah nominal, atau tidak segera ditindaklanjuti.",
          "Software akuntansi dapat membantu menghubungkan invoice dengan piutang, pembayaran, credit note, dan laporan umur piutang. Namun, perusahaan tetap perlu menetapkan termin, penanggung jawab penagihan, serta prosedur eskalasi.",
        ],
        bullets: [
          "Status invoice harus ditanyakan melalui chat kepada staf tertentu.",
          "Pelanggan pernah menerima invoice terlambat atau versi yang salah.",
          "Tidak ada daftar piutang berdasarkan umur dan tingkat risiko.",
          "Pembayaran masuk belum langsung dikenali sebagai pelunasan invoice.",
        ],
      },
      {
        id: "stok-dan-keuangan-berbeda",
        heading: "4. Stok, Penjualan, dan Laporan Keuangan Sering Berbeda",
        paragraphs: [
          "Bisnis yang menjual barang membutuhkan hubungan yang konsisten antara pembelian, penerimaan, perpindahan, penjualan, retur, stok, dan harga pokok. Jika setiap bagian memakai catatan sendiri, laporan laba dapat terlihat baik walaupun stok hilang atau biaya barang belum tercatat benar.",
          "Perbedaan kecil yang terjadi terus-menerus biasanya menunjukkan masalah pada waktu pencatatan, satuan, retur, transfer, atau master produk. Sistem perlu memberikan jejak transaksi agar tim dapat menemukan penyebab, bukan sekadar menyesuaikan saldo.",
        ],
        bullets: [
          "Jumlah stok sistem tidak dapat dipercaya tanpa hitung fisik ulang.",
          "Harga pokok dihitung manual setelah penjualan terjadi.",
          "Transfer dan retur antar-lokasi sulit ditelusuri.",
          "Finance dan gudang memiliki versi nilai persediaan yang berbeda.",
        ],
      },
      {
        id: "pertumbuhan-menambah-kekacauan",
        heading: "5. Pertumbuhan Justru Menambah Kekacauan Administrasi",
        paragraphs: [
          "Proses manual mungkin cukup untuk puluhan transaksi, tetapi tidak selalu bertahan ketika pelanggan, produk, rekening, cabang, atau pengguna bertambah. Jika pertumbuhan omzet selalu harus diikuti pertumbuhan pekerjaan administrasi dengan kecepatan yang sama, proses bisnis belum scalable.",
          "Software akuntansi mulai memberikan nilai ketika membantu perusahaan memproses volume lebih tinggi dengan kontrol yang tetap konsisten, hak akses yang jelas, dan laporan yang tersedia tanpa menunggu rekap manual.",
        ],
        bullets: [
          "Pemilik menjadi satu-satunya orang yang memahami seluruh angka.",
          "Cabang baru membuat konsolidasi semakin lambat.",
          "Akses file sulit dibatasi berdasarkan tanggung jawab.",
          "Keputusan harga dan pembelian dibuat dari data yang sudah terlambat.",
        ],
        keyTakeaway:
          "Sistem dibutuhkan sebelum pekerjaan manual mulai membatasi penjualan, pelayanan pelanggan, dan kemampuan membuka cabang baru.",
      },
      {
        id: "sebelum-memilih-software",
        heading: "Apa yang Harus Disiapkan Sebelum Memilih Software?",
        paragraphs: [
          "Jangan langsung memindahkan semua data. Pilih tiga masalah dengan dampak terbesar, tetapkan angka awalnya, lalu gunakan angka tersebut sebagai target implementasi. Contohnya adalah lama tutup buku, nilai piutang lewat jatuh tempo, jumlah koreksi, atau persentase akurasi stok.",
        ],
        bullets: [
          "Pisahkan rekening dan transaksi pribadi dari transaksi usaha.",
          "Rapikan daftar akun, pelanggan, pemasok, produk, pajak, serta saldo awal.",
          "Tetapkan siapa yang membuat, memeriksa, dan menyetujui transaksi.",
          "Uji alur penjualan sampai pembayaran dan pembelian sampai pelunasan.",
          "Bandingkan laporan hasil sistem dengan dokumen yang telah disetujui.",
        ],
        callout: {
          type: "info",
          text: "Mulailah dari proses yang memengaruhi kas dan keputusan. Fitur tambahan dapat diaktifkan setelah fondasi transaksi dan master data stabil.",
        },
      },
    ],
    siarpiOffer: {
      heading: "Coba Jalankan Pembukuan Usaha Kamu di Siarpi",
      description:
        "Gunakan trial 14 hari untuk menguji transaksi penjualan, pembelian, kas, piutang, hutang, dan laporan. Mulai dari Finance, lalu hubungkan Invoice, Inventory, atau Procurement ketika dibutuhkan.",
      bullets: [
        "Pilih modul sesuai masalah usaha saat ini.",
        "Uji semua modul selama 14 hari tanpa kartu kredit.",
        "Diskusikan migrasi data dan penawaran dengan tim Siarpi.",
      ],
    },
    faq: [
      {
        q: "Apakah usaha kecil sudah perlu memakai software akuntansi?",
        a: "Ukuran bukan satu-satunya penentu. Software mulai relevan ketika transaksi sulit ditelusuri, laporan terlambat, piutang terlewat, stok tidak akurat, atau waktu pemilik habis untuk rekap manual.",
      },
      {
        q: "Apakah software akuntansi dapat langsung memperbaiki laporan yang salah?",
        a: "Tidak otomatis. Perusahaan tetap harus membersihkan master data, memeriksa saldo awal, menetapkan aturan pencatatan, dan merekonsiliasi hasil migrasi. Sistem membantu menjaga proses setelah fondasinya benar.",
      },
      {
        q: "Data apa yang perlu disiapkan untuk mulai?",
        a: "Minimal siapkan daftar akun, pelanggan, pemasok, produk atau jasa, rekening, saldo kas dan bank, piutang, hutang, persediaan, aset, serta transaksi terbuka pada tanggal cut-off.",
      },
    ],
  },

  "5-tanda-perusahaan-butuh-software-hr": {
    slug: "5-tanda-perusahaan-butuh-software-hr",
    title: "5 Tanda Perusahaan Kamu Sudah Mulai Membutuhkan Software HR",
    subtitle:
      "Kenali saat spreadsheet dan proses manual mulai mengganggu akurasi data karyawan, attendance, payroll, layanan HR, serta kontrol perusahaan.",
    category: "HR & Payroll",
    readTime: "8 menit baca",
    author: "Tim HR Siarpi",
    publishedDate: "15 September 2026",
    summary:
      "Software HR mulai dibutuhkan ketika pekerjaan administratif berulang menyita waktu, data karyawan tidak konsisten, dan kesalahan mulai memengaruhi gaji atau pengalaman karyawan. Lima tanda berikut membantu perusahaan menentukan proses HR mana yang perlu didigitalisasi terlebih dahulu.",
    sections: [
      {
        id: "data-karyawan-tersebar",
        heading: "1. Data Karyawan Tersebar di Banyak File dan Chat",
        paragraphs: [
          "Data identitas, kontrak, jabatan, atasan, rekening, dokumen, dan riwayat kerja sering disimpan oleh orang berbeda. Ketika perubahan tidak memiliki satu sumber resmi, HR dapat memakai informasi lama untuk surat, payroll, benefit, atau pelaporan.",
          "Software HR dibutuhkan ketika perusahaan memerlukan profil karyawan terpusat, hak akses berdasarkan peran, riwayat perubahan, serta proses persetujuan untuk data sensitif.",
        ],
        bullets: [
          "HR memiliki beberapa versi daftar karyawan aktif.",
          "Kontrak atau dokumen penting sulit ditemukan saat dibutuhkan.",
          "Perubahan jabatan, lokasi, atau atasan tidak memiliki histori yang jelas.",
          "Data pribadi dikirim melalui chat atau file yang aksesnya terlalu luas.",
        ],
        keyTakeaway:
          "Satu sumber data karyawan mengurangi input ulang, tetapi hak akses dan pemilik data tetap harus ditetapkan dengan jelas.",
      },
      {
        id: "attendance-cuti-manual",
        heading: "2. Attendance, Shift, Cuti, dan Lembur Direkap Manual",
        paragraphs: [
          "Masalah menjadi lebih kompleks ketika perusahaan memiliki banyak shift, cabang, hari kerja, atau tim lapangan. HR harus menggabungkan data mesin, formulir, chat, dan spreadsheet sebelum mengetahui siapa hadir, terlambat, lembur, atau cuti.",
          "Sistem yang tepat harus mengelola jadwal, pengajuan, approval, koreksi, dan cut-off secara konsisten. Data yang sudah disetujui kemudian dapat diteruskan ke payroll tanpa diketik ulang.",
        ],
        bullets: [
          "Jadwal shift sering berubah tanpa catatan persetujuan.",
          "Saldo cuti berbeda antara catatan HR dan karyawan.",
          "Koreksi attendance menumpuk menjelang payroll.",
          "Lembur disetujui melalui chat dan sulit diaudit.",
        ],
      },
      {
        id: "payroll-sering-dikoreksi",
        heading: "3. Payroll Selalu Membutuhkan Koreksi Berulang",
        paragraphs: [
          "Kesalahan payroll berdampak langsung pada kepercayaan karyawan. Penyebabnya sering bukan rumus gaji semata, melainkan data attendance terlambat, perubahan komponen tanpa tanggal efektif, karyawan baru atau resign, pinjaman, benefit, dan approval yang tidak terhubung.",
          "Software HR dan payroll mulai diperlukan ketika tim membutuhkan cut-off, versioning, validasi, approval, simulasi, slip gaji, dan rekonsiliasi yang dapat ditelusuri.",
        ],
        bullets: [
          "HR membuat banyak salinan file payroll setiap bulan.",
          "Perubahan gaji tidak selalu memiliki tanggal efektif dan persetujuan.",
          "Selisih baru diketahui setelah slip gaji diterbitkan.",
          "Finance menerima angka payroll tanpa rincian rekonsiliasi yang memadai.",
        ],
        callout: {
          type: "warning",
          text: "Jangan langsung mengotomatisasi payroll tanpa validasi. Jalankan simulasi paralel dan periksa kasus karyawan baru, resign, prorata, lembur, THR, BPJS, pajak, serta potongan.",
        },
      },
      {
        id: "layanan-hr-lambat",
        heading: "4. Karyawan Selalu Bergantung pada HR untuk Hal Sederhana",
        paragraphs: [
          "Jika karyawan harus menghubungi HR untuk mengecek sisa cuti, jadwal, slip gaji, status pengajuan, atau memperbarui data pribadi, tim HR akan dipenuhi pertanyaan berulang. Waktu untuk engagement, pengembangan, dan perencanaan tenaga kerja menjadi berkurang.",
          "Employee self-service membantu karyawan melakukan tindakan sesuai haknya, sementara approval dan perubahan tetap tercatat. Keberhasilan fitur ini bergantung pada antarmuka yang mudah digunakan dan akses mobile yang sesuai pola kerja.",
        ],
        bullets: [
          "Pertanyaan status pengajuan memenuhi chat HR setiap hari.",
          "Slip gaji atau surat harus dikirim satu per satu.",
          "Atasan sulit melihat jadwal dan ketersediaan anggota tim.",
          "Karyawan tidak mengetahui kebijakan dan dokumen mana yang berlaku.",
        ],
      },
      {
        id: "pertumbuhan-melemahkan-kontrol",
        heading: "5. Penambahan Karyawan atau Cabang Melemahkan Kontrol",
        paragraphs: [
          "Proses yang cukup untuk satu kantor dapat gagal ketika perusahaan membuka lokasi baru, menambah shift, atau merekrut banyak karyawan. Onboarding terlambat, akun belum siap, kontrak terlewat, struktur pelaporan tidak jelas, dan akses mantan karyawan tidak segera dicabut.",
          "Software HR memberikan nilai ketika perjalanan karyawan dari recruitment, onboarding, perubahan jabatan, performance, hingga offboarding dapat dijalankan dengan pemilik tugas, tenggat, dan jejak audit yang jelas.",
        ],
        bullets: [
          "Onboarding bergantung pada checklist pribadi staf HR.",
          "Departemen dan reporting line sering berbeda antar-dokumen.",
          "Masa berlaku kontrak atau probation terlewat.",
          "Offboarding tidak otomatis memicu pengembalian aset dan pencabutan akses.",
        ],
        keyTakeaway:
          "Software HR sebaiknya diterapkan sebelum pertumbuhan membuat kontrol data, payroll, dan akses semakin sulit dipulihkan.",
      },
      {
        id: "mulai-dari-proses-prioritas",
        heading: "Mulai dari Proses HR yang Paling Berisiko",
        paragraphs: [
          "Tidak semua perusahaan harus mengaktifkan seluruh modul sekaligus. Petakan frekuensi masalah, dampak terhadap karyawan dan uang, jumlah pekerjaan manual, serta kesiapan data. Pilih ruang lingkup awal yang dapat diuji dan diukur.",
        ],
        bullets: [
          "Rapikan data karyawan, struktur organisasi, jabatan, lokasi, dan status kontrak.",
          "Dokumentasikan jadwal, cuti, lembur, payroll, dan approval yang berlaku.",
          "Tetapkan hak akses untuk HR, atasan, finance, dan karyawan.",
          "Uji satu perjalanan lengkap dari onboarding hingga payroll atau offboarding.",
          "Pantau waktu proses, jumlah koreksi, adopsi ESS, dan pertanyaan berulang.",
        ],
        callout: {
          type: "info",
          text: "Core HR yang bersih menjadi fondasi. Attendance, payroll, performance, dan modul lain akan sulit dipercaya jika data karyawan serta struktur organisasi belum konsisten.",
        },
      },
    ],
    siarpiOffer: {
      heading: "Uji Proses HR Perusahaan Kamu di Siarpi",
      description:
        "Gunakan trial 14 hari untuk mencoba data karyawan, departemen, jabatan, onboarding, kontrak, jadwal, cuti, dan konfigurasi HR, lalu hubungkan Absensi, Employee Portal, atau Payroll sesuai prioritas.",
      bullets: [
        "Mulai dari modul HR yang paling mendesak.",
        "Uji semua modul selama 14 hari tanpa kartu kredit.",
        "Diskusikan migrasi dan implementasi bersama tim Siarpi.",
      ],
    },
    faq: [
      {
        q: "Berapa jumlah karyawan minimum sebelum memakai software HR?",
        a: "Tidak ada angka universal. Kompleksitas shift, cabang, payroll, approval, dan risiko data lebih menentukan daripada jumlah karyawan. Perusahaan kecil dengan tenaga lapangan atau pola kerja kompleks dapat membutuhkannya lebih awal.",
      },
      {
        q: "Haruskah HR, attendance, dan payroll langsung diterapkan bersamaan?",
        a: "Tidak selalu. Bangun core HR dan master data yang bersih, lalu prioritaskan proses dengan risiko terbesar. Namun, desain integrasi dan sumber data resminya harus ditentukan sejak awal.",
      },
      {
        q: "Apa yang harus diuji saat trial software HR?",
        a: "Uji onboarding, perubahan data bertanggal efektif, shift lintas hari, cuti, koreksi attendance, approval, payroll sampel, hak akses, audit log, employee self-service, dan offboarding menggunakan skenario perusahaan Anda.",
      },
    ],
  },
};
