import type { ArticleData } from "@/lib/articles";

export const salesArticles: Record<string, ArticleData> = {
  "harga-software-erp-indonesia-2026": {
    slug: "harga-software-erp-indonesia-2026",
    title: "Harga Software ERP di Indonesia 2026: Cara Menghitung Biaya Sebenarnya",
    subtitle:
      "Panduan menghitung lisensi, implementasi, migrasi, integrasi, pelatihan, dan biaya operasi agar proposal ERP dapat dibandingkan secara adil.",
    category: "Harga & Investasi ERP",
    readTime: "10 menit baca",
    author: "Tim Solusi Bisnis Siarpi",
    publishedDate: "13 September 2026",
    summary:
      "Harga ERP bukan hanya biaya langganan per bulan. Gunakan total cost of ownership tiga tahun untuk menangkap biaya implementasi, migrasi data, integrasi, pelatihan, dukungan, dan perubahan kebutuhan setelah sistem berjalan.",
    sections: [
      {
        id: "komponen-biaya-erp",
        heading: "Enam Komponen Biaya ERP yang Harus Masuk Anggaran",
        paragraphs: [
          "Proposal ERP sering menonjolkan biaya lisensi karena angkanya paling mudah dibandingkan. Padahal, ruang lingkup implementasi dan kondisi data lama dapat mengubah investasi awal secara signifikan.",
        ],
        bullets: [
          "Lisensi atau langganan berdasarkan pengguna, modul, transaksi, lokasi, atau kombinasi beberapa metrik.",
          "Analisis proses, konfigurasi, dan implementasi oleh vendor atau partner.",
          "Pembersihan, pemetaan, migrasi, dan validasi master data serta saldo awal.",
          "Integrasi dengan bank, marketplace, aplikasi lama, mesin absensi, pajak, atau layanan pihak ketiga.",
          "Pelatihan pengguna, dokumentasi SOP, pendampingan go-live, dan manajemen perubahan.",
          "Dukungan, penambahan kapasitas, perubahan konfigurasi, upgrade, dan pengembangan setelah go-live.",
        ],
      },
      {
        id: "rumus-tco-tiga-tahun",
        heading: "Gunakan TCO Tiga Tahun, Bukan Harga Bulanan",
        paragraphs: [
          "Hitung total cost of ownership dengan menjumlahkan seluruh biaya tahun pertama, biaya berulang tahun kedua dan ketiga, biaya internal tim proyek, serta cadangan perubahan ruang lingkup. Kurangi manfaat yang benar-benar dapat diukur hanya jika asumsi dan pemilik targetnya jelas.",
          "Minta seluruh vendor mengisi format perbandingan yang sama. Pisahkan biaya wajib, opsional, berbasis pemakaian, dan biaya yang baru muncul saat batas tertentu terlewati.",
        ],
        callout: {
          type: "warning",
          text: "Proposal paling murah dapat menjadi paling mahal jika banyak proses inti membutuhkan kustomisasi atau biaya integrasi tidak dijelaskan sejak awal.",
        },
      },
      {
        id: "pertanyaan-untuk-vendor",
        heading: "Pertanyaan Harga yang Wajib Dijawab Vendor",
        paragraphs: [
          "Pastikan jawaban vendor menjadi bagian dari proposal atau kontrak. Pernyataan lisan sulit dipakai ketika ruang lingkup diperdebatkan setelah proyek berjalan.",
        ],
        bullets: [
          "Apa satuan penagihan dan kapan biaya akan naik?",
          "Apakah penyimpanan, backup, API, notifikasi, dan lingkungan uji termasuk?",
          "Berapa banyak migrasi data, laporan, workflow, dan integrasi yang masuk ruang lingkup?",
          "Apa definisi perubahan minor, change request, dan pekerjaan di luar scope?",
          "Apakah dukungan go-live, SLA, dan pembaruan versi dikenakan biaya tambahan?",
          "Bagaimana perusahaan mengambil seluruh datanya jika kontrak berakhir?",
        ],
      },
      {
        id: "modular-atau-suite",
        heading: "Kapan Model Modular Lebih Efisien?",
        paragraphs: [
          "Model modular menarik ketika masalah bisnis terkonsentrasi pada beberapa fungsi dan perusahaan belum siap mengubah seluruh operasi sekaligus. Tim dapat memulai dari area dengan dampak jelas, mengukur hasil, kemudian menambah modul berdasarkan prioritas.",
          "Suite penuh lebih masuk akal jika proses lintas divisi sudah matang, sponsor eksekutif kuat, anggaran perubahan tersedia, dan manfaat integrasi menyeluruh lebih besar daripada risiko implementasi besar.",
        ],
        keyTakeaway:
          "Pilih model komersial yang mengikuti urutan perubahan bisnis Anda, bukan memaksa perusahaan membayar fungsi yang belum siap digunakan.",
      },
      {
        id: "membandingkan-proposal",
        heading: "Contoh Scorecard untuk Membandingkan Proposal",
        paragraphs: [
          "Berikan skor satu sampai lima untuk setiap aspek dan lampirkan buktinya. Jangan menyatukan seluruh biaya menjadi satu angka sebelum tim memahami apa yang termasuk dan tidak termasuk.",
        ],
        bullets: [
          "TCO tiga tahun dan transparansi biaya: 25 persen.",
          "Kecocokan proses prioritas: 30 persen.",
          "Kualitas implementasi dan migrasi: 20 persen.",
          "Keamanan, SLA, dan dukungan: 15 persen.",
          "Fleksibilitas berkembang: 10 persen.",
        ],
      },
    ],
    siarpiOffer: {
      heading: "Bandingkan Biaya Siarpi dengan Ruang Lingkup yang Sama",
      description:
        "Pilih modul yang benar-benar digunakan dan lihat estimasi biayanya. Tim Siarpi dapat membantu menyusun kombinasi modul serta penawaran berdasarkan alur kerja perusahaan Anda.",
      bullets: [
        "Harga dan modul dapat dipilih secara bertahap.",
        "Trial 14 hari untuk menguji kecocokan proses.",
        "Konsultasi kebutuhan dan penawaran tanpa komitmen.",
      ],
    },
    faq: [
      {
        q: "Mengapa harga ERP tidak selalu ditampilkan terbuka?",
        a: "Ruang lingkup, jumlah pengguna, modul, migrasi, integrasi, dan tingkat penyesuaian berbeda antarperusahaan. Mintalah rincian tertulis agar angka dapat dibandingkan dengan basis yang sama.",
      },
      {
        q: "Apakah sebaiknya langsung membeli semua modul?",
        a: "Tidak selalu. Mulai dari proses paling bernilai sering mengurangi risiko. Namun, tetap rancang arsitektur dan master data lintas modul sejak awal agar ekspansi berikutnya tidak memerlukan migrasi ulang.",
      },
    ],
  },

  "erp-modular-vs-suite": {
    slug: "erp-modular-vs-suite",
    title: "ERP Modular vs Suite Lengkap: Mana yang Lebih Tepat untuk Bisnis Anda?",
    subtitle:
      "Perbandingan ruang lingkup, waktu implementasi, integrasi, biaya, dan risiko agar strategi adopsi ERP mengikuti kesiapan organisasi.",
    category: "Strategi ERP",
    readTime: "9 menit baca",
    author: "Tim Transformasi Bisnis Siarpi",
    publishedDate: "11 September 2026",
    summary:
      "ERP modular memungkinkan perusahaan memulai dari fungsi prioritas, sedangkan suite lengkap mengejar standardisasi lintas divisi sejak awal. Keputusan terbaik bergantung pada tingkat urgensi, keterkaitan proses, kualitas data, sponsor manajemen, dan kapasitas tim perubahan.",
    sections: [
      {
        id: "perbedaan-pendekatan",
        heading: "Dua Pendekatan, Dua Jenis Risiko",
        paragraphs: [
          "Pendekatan modular membagi transformasi menjadi beberapa gelombang. Perusahaan dapat mengaktifkan finance, inventory, CRM, HR, atau modul lain sesuai masalah yang paling mendesak. Nilai dapat muncul lebih cepat, tetapi fondasi integrasi dan master data tetap harus dirancang sejak awal.",
          "Pendekatan suite mengimplementasikan cakupan lebih luas dalam satu program. Standardisasi dapat dicapai lebih cepat setelah go-live, tetapi ketergantungan antar-tim, kebutuhan migrasi, dan beban perubahan menjadi lebih besar.",
        ],
      },
      {
        id: "kelebihan-modular",
        heading: "Kapan ERP Modular Menjadi Pilihan Kuat",
        paragraphs: [
          "ERP modular cocok ketika perusahaan memiliki satu atau dua masalah prioritas, anggaran bertahap, atau tim operasional yang tidak dapat menjalani perubahan besar sekaligus.",
        ],
        bullets: [
          "Waktu menuju manfaat pertama cenderung lebih singkat.",
          "Ruang lingkup dan beban pelatihan lebih terkendali.",
          "Investasi dapat mengikuti hasil dan tahap pertumbuhan.",
          "Tim dapat memperbaiki metode implementasi sebelum gelombang berikutnya.",
        ],
        callout: {
          type: "info",
          text: "Modular bukan berarti aplikasi terpisah-pisah. Pastikan modul memakai identitas, master data, hak akses, dan audit trail yang konsisten.",
        },
      },
      {
        id: "kelebihan-suite",
        heading: "Kapan Suite Lengkap Lebih Rasional",
        paragraphs: [
          "Suite lengkap lebih cocok ketika masalah utama justru berasal dari fragmentasi antar-divisi dan perusahaan telah memiliki pemilik proses, sponsor direksi, data yang cukup siap, serta kapasitas program yang kuat.",
        ],
        bullets: [
          "Standardisasi proses lintas fungsi dirancang dalam satu program.",
          "Ketergantungan dan integrasi antar-modul dapat diuji sebelum go-live bersama.",
          "Pelaporan manajemen memiliki fondasi data terpadu sejak awal.",
          "Organisasi dapat mengganti banyak sistem lama dalam jadwal yang terkoordinasi.",
        ],
      },
      {
        id: "lima-pertanyaan-keputusan",
        heading: "Lima Pertanyaan untuk Menentukan Pendekatan",
        paragraphs: [
          "Jawaban yang jujur terhadap pertanyaan berikut lebih berguna daripada mengikuti tren implementasi perusahaan lain.",
        ],
        bullets: [
          "Apakah masalah prioritas dapat diselesaikan tanpa mengubah seluruh divisi?",
          "Apakah master pelanggan, produk, akun, karyawan, dan vendor sudah konsisten?",
          "Berapa banyak pemilik proses yang benar-benar tersedia untuk proyek?",
          "Apakah integrasi sementara aman dan ekonomis selama implementasi bertahap?",
          "Berapa besar gangguan operasi yang sanggup ditanggung perusahaan saat go-live?",
        ],
        keyTakeaway:
          "Jika kesiapan organisasi rendah tetapi urgensi tinggi, implementasi modular dengan arsitektur jangka panjang biasanya lebih terkendali.",
      },
      {
        id: "strategi-hibrida",
        heading: "Strategi Hibrida: Fondasi Bersama, Implementasi Bertahap",
        paragraphs: [
          "Banyak perusahaan memperoleh hasil terbaik dengan merancang fondasi data, keamanan, integrasi, dan target proses secara menyeluruh, lalu mengaktifkan modul dalam beberapa gelombang. Cara ini menjaga arah arsitektur tanpa memaksakan perubahan serentak.",
          "Tetapkan metrik setiap gelombang, misalnya waktu tutup buku, akurasi stok, siklus purchase order, conversion rate, atau waktu proses payroll. Gelombang berikutnya dimulai setelah stabilitas dan target minimum tercapai.",
        ],
      },
    ],
    siarpiOffer: {
      heading: "Mulai Modular, Tetap Siap Bertumbuh",
      description:
        "Siarpi memungkinkan perusahaan memulai dari fungsi prioritas dan menambah modul ketika manfaat tahap sebelumnya sudah terbukti, dengan pengalaman pengguna yang tetap terpadu.",
      bullets: [
        "Mulai dari finance, inventory, CRM, HR, payroll, atau modul pilihan.",
        "Kurangi beban perubahan dengan implementasi bertahap.",
        "Uji seluruh modul gratis selama 14 hari.",
      ],
    },
    faq: [
      {
        q: "Apakah ERP modular akan menyulitkan integrasi?",
        a: "Tidak jika modul dibangun di atas platform dan master data yang sama. Risiko muncul ketika perusahaan membeli aplikasi terpisah tanpa desain identitas, data, API, dan audit yang konsisten.",
      },
      {
        q: "Berapa lama jarak ideal antar-gelombang implementasi?",
        a: "Tidak ada angka universal. Gunakan indikator stabilitas, kualitas data, tingkat adopsi, dan tercapainya target proses sebagai gerbang sebelum menambah ruang lingkup.",
      },
    ],
  },

  "checklist-memilih-software-erp": {
    slug: "checklist-memilih-software-erp",
    title: "Checklist Memilih Software ERP: 25 Pertanyaan Sebelum Tanda Tangan Kontrak",
    subtitle:
      "Daftar pemeriksaan untuk demo, keamanan, implementasi, migrasi, dukungan, harga, dan exit plan agar risiko tersembunyi muncul sebelum pembelian.",
    category: "Panduan Memilih ERP",
    readTime: "11 menit baca",
    author: "Tim Solusi Bisnis Siarpi",
    publishedDate: "9 September 2026",
    summary:
      "Keputusan ERP harus membuktikan kecocokan proses, keamanan, biaya total, kemampuan implementasi, dan kepemilikan data. Gunakan 25 pertanyaan ini sebagai agenda evaluasi bersama pengguna operasional, finance, IT, dan manajemen.",
    sections: [
      {
        id: "proses-dan-produk",
        heading: "1. Proses dan Kemampuan Produk",
        paragraphs: [
          "Minta jawaban dalam bentuk demo atau dokumen produk. Hindari keputusan yang hanya berdasarkan daftar fitur dan presentasi penjualan.",
        ],
        bullets: [
          "Apakah lima alur transaksi terpenting kami dapat berjalan tanpa workaround manual?",
          "Fungsi mana yang standar, perlu konfigurasi, perlu kustomisasi, atau belum tersedia?",
          "Bagaimana approval, delegasi, pembatalan, koreksi, dan audit trail bekerja?",
          "Apakah laporan dapat dilacak kembali hingga dokumen sumber?",
          "Bagaimana produk menangani pertumbuhan pengguna, cabang, gudang, entitas, dan transaksi?",
        ],
      },
      {
        id: "data-integrasi-keamanan",
        heading: "2. Data, Integrasi, dan Keamanan",
        paragraphs: [
          "ERP menyimpan data paling sensitif perusahaan. Tim perlu memahami kontrol akses, lokasi data, pemulihan, serta cara sistem bertukar data sebelum kontrak ditandatangani.",
        ],
        bullets: [
          "Siapa pemilik data dan bagaimana cara mengekspor seluruh data dalam format terbuka?",
          "Bagaimana role, permission, pemisahan tugas, MFA, dan pencatatan aktivitas diterapkan?",
          "Apa kebijakan backup, retensi, recovery time, dan recovery point?",
          "Apakah API terdokumentasi dan adakah batas atau biaya pemakaiannya?",
          "Bagaimana insiden keamanan diberitahukan dan siapa yang bertanggung jawab?",
        ],
        callout: {
          type: "warning",
          text: "Jangan menunda pembahasan exit plan. Portabilitas data harus jelas saat hubungan masih baik, bukan setelah kontrak berakhir.",
        },
      },
      {
        id: "implementasi-migrasi",
        heading: "3. Implementasi dan Migrasi",
        paragraphs: [
          "Kualitas implementasi sering lebih menentukan daripada jumlah fitur. Evaluasi tim pelaksana, metode kerja, tanggung jawab internal, dan definisi selesai pada setiap tahap.",
        ],
        bullets: [
          "Siapa project manager dan konsultan yang benar-benar mengerjakan proyek kami?",
          "Apa deliverable, jadwal, dependency, acceptance criteria, dan proses eskalasinya?",
          "Berapa kali migrasi percobaan, rekonsiliasi, dan user acceptance test dilakukan?",
          "Siapa yang membersihkan data lama dan siapa yang menyetujui hasil migrasi?",
          "Apa rencana cut-over, rollback, hypercare, dan dukungan pada hari go-live?",
        ],
      },
      {
        id: "biaya-kontrak-dukungan",
        heading: "4. Biaya, Kontrak, dan Dukungan",
        paragraphs: [
          "Bandingkan total biaya tiga tahun dengan asumsi pertumbuhan yang sama. Pastikan layanan penting tidak tersembunyi sebagai add-on setelah keputusan dibuat.",
        ],
        bullets: [
          "Apa seluruh biaya wajib untuk lisensi, implementasi, migrasi, integrasi, training, support, dan storage?",
          "Apa pemicu kenaikan biaya dan bagaimana mekanisme perubahan harga?",
          "Apa SLA berdasarkan tingkat dampak dan jam operasional bisnis kami?",
          "Bagaimana change request dihitung, disetujui, dan dibatasi?",
          "Apa ketentuan pembaruan, penghentian, pengembalian data, dan bantuan transisi?",
        ],
      },
      {
        id: "adopsi-dan-vendor",
        heading: "5. Adopsi Pengguna dan Kredibilitas Vendor",
        paragraphs: [
          "Sistem tidak menghasilkan manfaat jika pengguna kembali ke spreadsheet. Nilai kemampuan vendor dalam melatih, mendampingi, dan merespons masalah setelah proyek selesai.",
        ],
        bullets: [
          "Apakah antarmuka dapat diuji langsung oleh pengguna akhir sebelum pembelian?",
          "Materi pelatihan, dokumentasi, dan bantuan dalam aplikasi apa yang tersedia?",
          "Metrik adopsi apa yang dipantau setelah go-live?",
          "Apakah vendor dapat memberikan referensi pelanggan dengan profil proses serupa?",
          "Bagaimana roadmap produk, frekuensi rilis, dan kebijakan penghentian fitur disampaikan?",
        ],
        keyTakeaway:
          "Beri skor hanya pada jawaban yang memiliki bukti. Catat asumsi, pengecualian, dan pemilik tindak lanjut untuk setiap gap.",
      },
    ],
    siarpiOffer: {
      heading: "Gunakan Checklist Ini untuk Menguji Siarpi",
      description:
        "Bawa proses dan pertanyaan perusahaan Anda ke sesi demo Siarpi. Kami akan menunjukkan alurnya secara langsung dan menjelaskan gap, ruang lingkup, serta pilihan modul dengan terbuka.",
      bullets: [
        "Demo berdasarkan skenario bisnis Anda.",
        "Pilihan modul dan harga yang transparan.",
        "Trial 14 hari sebelum mengambil keputusan.",
      ],
    },
    faq: [
      {
        q: "Siapa saja yang perlu terlibat dalam pemilihan ERP?",
        a: "Libatkan sponsor eksekutif, pemilik proses, pengguna harian, finance, IT atau keamanan, dan procurement. Tim kecil tetapi lintas fungsi lebih efektif daripada keputusan satu departemen.",
      },
      {
        q: "Apakah proof of concept selalu diperlukan?",
        a: "Proof of concept layak dilakukan untuk proses berisiko tinggi, integrasi kompleks, volume besar, atau kebutuhan yang belum dapat dibuktikan melalui demo standar.",
      },
    ],
  },

  "tanda-bisnis-butuh-erp": {
    slug: "tanda-bisnis-butuh-erp",
    title: "10 Tanda Bisnis Anda Sudah Membutuhkan ERP",
    subtitle:
      "Kenali gejala operasional yang menunjukkan spreadsheet dan aplikasi terpisah mulai menghambat pertumbuhan, kontrol, dan pelayanan pelanggan.",
    category: "Transformasi Digital",
    readTime: "8 menit baca",
    author: "Tim Transformasi Bisnis Siarpi",
    publishedDate: "7 September 2026",
    summary:
      "ERP menjadi relevan ketika masalah data dan proses terjadi berulang, melintasi divisi, dan mulai memengaruhi kas, stok, keputusan, atau pelanggan. Sepuluh tanda berikut membantu membedakan gangguan sesaat dari kebutuhan sistem yang nyata.",
    sections: [
      {
        id: "data-tidak-konsisten",
        heading: "1-3. Data Tidak Konsisten dan Laporan Terlambat",
        paragraphs: [
          "Masalah pertama biasanya terlihat pada data, bukan pada aplikasi. Tim menghabiskan waktu menyatukan versi file, memperbaiki formula, dan mencari angka yang benar sebelum dapat mengambil keputusan.",
        ],
        bullets: [
          "Departemen memiliki angka penjualan, stok, atau piutang yang berbeda untuk periode yang sama.",
          "Tutup buku dan laporan manajemen terlambat karena rekonsiliasi manual berulang.",
          "Keputusan penting dibuat dari data lama karena laporan real-time tidak tersedia.",
        ],
      },
      {
        id: "transaksi-berulang",
        heading: "4-6. Transaksi Disalin dan Sulit Ditelusuri",
        paragraphs: [
          "Ketika satu kejadian bisnis harus diketik ulang ke beberapa aplikasi, risiko salah nominal, pelanggan, produk, pajak, dan tanggal meningkat. Koreksi menjadi mahal karena tim tidak mengetahui sumber perubahan.",
        ],
        bullets: [
          "Pesanan, pengiriman, invoice, dan jurnal dimasukkan ulang oleh tim berbeda.",
          "Approval berlangsung lewat chat dan sulit dibuktikan saat audit.",
          "Tidak ada jejak yang jelas tentang siapa mengubah transaksi dan alasannya.",
        ],
        callout: {
          type: "warning",
          text: "Menambah orang untuk menyalin data biasanya hanya memperbesar kapasitas kesalahan. Periksa akar masalah proses sebelum menambah headcount administratif.",
        },
      },
      {
        id: "stok-dan-pelanggan",
        heading: "7-8. Stok Tidak Akurat dan Pelanggan Terdampak",
        paragraphs: [
          "Masalah internal berubah menjadi masalah komersial ketika janji kepada pelanggan tidak lagi didukung oleh data ketersediaan, kapasitas, harga, dan status pemenuhan yang dapat dipercaya.",
        ],
        bullets: [
          "Stok sistem sering berbeda dari fisik atau transfer antar-lokasi tidak terlihat tepat waktu.",
          "Sales sulit memberi status pesanan dan pelanggan harus menghubungi beberapa orang untuk mendapat jawaban.",
        ],
      },
      {
        id: "pertumbuhan-terhambat",
        heading: "9-10. Pertumbuhan Menambah Kekacauan dan Kontrol Melemah",
        paragraphs: [
          "Proses yang tampak cukup untuk satu cabang dapat runtuh saat volume, lokasi, produk, atau jumlah karyawan bertambah. Kontrol manual tidak lagi mengikuti kompleksitas organisasi.",
        ],
        bullets: [
          "Pembukaan cabang atau peningkatan transaksi membuat beban administrasi tumbuh hampir sebanding dengan omzet.",
          "Hak akses terlalu luas, pemisahan tugas lemah, atau data sensitif tersebar pada file pribadi.",
        ],
      },
      {
        id: "langkah-berikutnya",
        heading: "Apa yang Harus Dilakukan Setelah Mengenali Tandanya?",
        paragraphs: [
          "Jangan langsung membeli sistem. Petakan tiga proses yang paling sering gagal, hitung dampak waktu atau uangnya, tentukan pemilik proses, dan rapikan master data minimum. Setelah itu, uji vendor menggunakan transaksi nyata dari awal hingga akhir.",
          "Mulai dari ruang lingkup yang cukup kecil untuk dikendalikan tetapi cukup penting untuk menghasilkan manfaat terukur. Tetapkan baseline sebelum implementasi agar peningkatan dapat dibuktikan setelah go-live.",
        ],
        bullets: [
          "Dokumentasikan masalah, frekuensi, dampak, dan pemiliknya.",
          "Pilih dua atau tiga KPI yang akan berubah setelah implementasi.",
          "Tetapkan kebutuhan wajib, kebutuhan baik untuk dimiliki, dan kebutuhan masa depan.",
          "Shortlist vendor dan jalankan demo berbasis skenario.",
          "Susun rencana data, adopsi pengguna, cut-over, dan dukungan.",
        ],
        keyTakeaway:
          "ERP bukan obat untuk proses yang tidak memiliki pemilik. Sistem akan memperkuat proses yang jelas dan memperlihatkan proses yang belum disepakati.",
      },
    ],
    siarpiOffer: {
      heading: "Buktikan Kebutuhan ERP lewat Trial Siarpi",
      description:
        "Pilih satu proses yang paling bermasalah, jalankan dengan data uji di Siarpi, lalu bandingkan waktu, visibilitas, dan kontrolnya dengan cara kerja saat ini.",
      bullets: [
        "Semua modul dapat diuji selama masa trial.",
        "Tidak membutuhkan kartu kredit untuk memulai.",
        "Tim Siarpi siap membantu menentukan titik awal.",
      ],
    },
    faq: [
      {
        q: "Apakah bisnis kecil terlalu dini memakai ERP?",
        a: "Tidak selalu. Yang menentukan bukan hanya ukuran, tetapi kompleksitas transaksi, jumlah lokasi, keterkaitan proses, kebutuhan kontrol, dan biaya kesalahan. Pendekatan modular dapat menjaga ruang lingkup tetap proporsional.",
      },
      {
        q: "Apakah ERP dapat memperbaiki proses yang berantakan secara otomatis?",
        a: "Tidak. Perusahaan tetap perlu menentukan pemilik proses, aturan, master data, dan indikator hasil. ERP membantu menjalankan dan mengawasi proses yang sudah disepakati.",
      },
    ],
  },
};
