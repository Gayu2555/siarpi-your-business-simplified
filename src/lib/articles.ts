export interface ArticleSection {
  id: string;
  heading: string;
  paragraphs: string[];
  callout?: { type: "info" | "warning" | "success"; text: string };
  bullets?: string[];
  keyTakeaway?: string;
}

export interface ArticleData {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  author: string;
  publishedDate: string;
  summary: string;
  sections: ArticleSection[];
  faq: { q: string; a: string }[];
}

export const articlesRegistry: Record<string, ArticleData> = {
  "transisi-pembukuan-digital": {
    slug: "transisi-pembukuan-digital",
    title:
      "Panduan Komprehensif Transisi dari Pembukuan Manual ke Sistem Digital Tanpa Selisih Data",
    subtitle:
      "Metodologi bertahap bagi pemilik usaha dan tim akuntansi untuk memindahkan pencatatan dari kwitansi fisik dan spreadsheet ke sistem otomatis tanpa mengganggu operasional harian.",
    category: "Panduan Pembukuan",
    readTime: "10 min read",
    author: "Tim Akuntansi & Produk Siarpi",
    publishedDate: "20 Juli 2026",
    summary:
      "Memindahkan sistem pembukuan dari kertas atau spreadsheet ke aplikasi otomatis sering kali menimbulkan kekhawatiran akan terjadinya selisih kas atau hilangnya histori data. Panduan ini membahas metodologi transisi aman melalui metode penetapan tanggal potong saldo dan uji coba sistem paralel.",
    sections: [
      {
        id: "latar-belakang",
        heading: "Mengapa Pembukuan Manual Mulai Menghambat Pertumbuhan Usaha?",
        paragraphs: [
          "Pada tahap awal berdirinya usaha, mencatat transaksi penjualan dan pengeluaran menggunakan buku tulis atau spreadsheet sederhana sudah cukup memadai. Namun, seiring dengan bertambahnya volume transaksi harian, jumlah karyawan, dan variasi barang jualan, sistem manual mulai menunjukkan keterbatasan yang signifikan.",
          "Masalah paling umum yang sering dialami pemilik usaha adalah keterlambatan dalam menyusun laporan keuangan bulanan. Pembuktian transaksi yang masih berbasis kertas kerap terselip atau rusak, sehingga staf akuntansi memerlukan waktu hingga berhari-hari hanya untuk melacak selisih angka antara fisik kasir dan catatan internal.",
          "Selain itu, pembukuan manual sangat rentan terhadap kesalahan manusia (human-error) saat memindahkan data kwitansi ke laporan akhir. Dampaknya, pemilik usaha tidak memiliki gambaran yang akurat mengenai laba bersih riil dan posisi kas usaha secara real-time.",
        ],
        callout: {
          type: "warning",
          text: "Studi evaluasi internal menunjukkan bahwa perusahaan yang masih mengandalkan rekap manual menyita rata-rata 12 hingga 18 jam kerja setiap bulan hanya untuk memverifikasi ulang dokumen fisik dan mencocokkan selisih transaksi.",
        },
        bullets: [
          "Risiko kesalahan pengetikan ulang data kwitansi fisik ke laporan keuangan.",
          "Ketidaksesuaian yang berulang antara saldo fisik kas tunai dengan rekening bank.",
          "Keterlambatan penyajian laporan Laba Rugi sehingga keputusan bisnis terlambat diambil.",
          "Ketidakmampuan melacak umur piutang pelanggan yang mengakibatkan krisis likuiditas.",
        ],
      },
      {
        id: "tahap-persiapan",
        heading: "Tahap 1: Mempersiapkan Saldo Awal dan Tanggal Potong (Cut-Off Date)",
        paragraphs: [
          "Kunci utama keberhasilan migrasi pembukuan adalah tidak terburu-buru memindahkan seluruh data historis berbulan-bulan yang lalu. Menginput ulang transaksi beberapa tahun terakhir secara manual ke sistem baru justru meningkatkan risiko kesalahan data dan menghabiskan sumber daya yang tidak perlu.",
          "Langkah terbaik adalah menetapkan satu tanggal potong saldo (cut-off date) yang jelas, misalnya pada hari terakhir di akhir bulan berjalan. Seluruh transaksi sebelum tanggal potong akan dirangkum ke dalam satu saldo awal yang tervalidasi.",
          "Sebelum memasukkan data ke sistem baru, pastikan tim keuangan Anda telah menginventarisir empat komponen utama: saldo kas tunai fisik, saldo rekening bank usaha, nilai total persediaan barang (stock opname), serta rincian sisa piutang pelanggan dan utang supplier yang masih berjalan.",
        ],
        keyTakeaway:
          "Tentukan tanggal potong saldo akhir bulan. Jangan mencoba menginput ulang seluruh data transaksi tahun-tahun sebelumnya pada hari pertama migrasi sistem.",
      },
      {
        id: "struktur-coa",
        heading: "Tahap 2: Menyusun Bagan Akun (Chart of Accounts / COA) yang Sederhana",
        paragraphs: [
          "Bagan akun (COA) adalah fondasi dari seluruh sistem akuntansi. Kesalahan yang sering terjadi pada usaha kecil adalah membuat daftar akun yang terlalu banyak dan rumit di awal penggunaan.",
          "Gunakan pengelompokan akun standar yang mencakup lima kategori utama: Aset (Kas, Bank, Piutang, Stok), Kewajiban (Utang Usaha, Utang Pajak), Ekuitas (Modal Disetor, Laba Ditahan), Pendapatan (Penjualan Barang/Jasa), dan Beban (Beban Gaji, Sewa, Operasional).",
          "Dengan struktur COA yang rapi dan konsisten, setiap pencatatan transaksi di kasir atau pembayaran faktur akan langsung terposting ke akun yang tepat tanpa perlu membingungkan staf operasional.",
        ],
      },
      {
        id: "eksekusi-migrasi",
        heading: "Tahap 3: Menjalankan Sistem Paralel Selama 14 Hari",
        paragraphs: [
          "Untuk menjamin keamanan dan menghilangkan rasa khawatir akan adanya selisih data, jalankan pencatatan secara berdampingan (paralel) selama dua minggu pertama.",
          "Selama masa transisi ini, setiap transaksi tetap dicatat di media lama sambil diinput ke dalam aplikasi Siarpi. Pada akhir minggu, lakukan perbandingan hasil antara kedua pencatatan tersebut. Metode ini terbukti efektif untuk membiasakan tim dengan alur kerja baru sekaligus memvalidasi ketepatan saldo.",
          "Jika dalam 14 hari pencatatan di sistem baru selalu menghasilkan angka yang konsisten dan seimbang dengan fisik kas, Anda dapat menghentikan pencatatan manual secara penuh.",
        ],
        bullets: [
          "Minggu 1: Pelatihan staf kasir dan admin untuk memasukkan transaksi harian.",
          "Minggu 2: Evaluasi hasil rekonsiliasi kas dan bank antara catatan lama dan baru.",
          "Minggu 3: Penghentian total catatan manual dan penguncian periode awal (lock period).",
        ],
      },
      {
        id: "evaluasi-laporan",
        heading: "Tahap 4: Membaca Laporan Keuangan Otomatis dan Penutupan Periode",
        paragraphs: [
          "Setelah proses migrasi selesai, keunggulan utama dari pembukuan digital adalah ketersediaan laporan keuangan secara instan. Anda tidak perlu lagi menunggu staf menyusun Neraca dan Laporan Laba Rugi di akhir bulan.",
          "Siarpi secara otomatis memperbarui saldo Aset, Kewajiban, dan Ekuitas setiap kali transaksi penjualan atau pengeluaran kas divalidasi. Hal ini memberikan visibilitas penuh bagi jajaran manajemen untuk mengambil keputusan bisnis berbasis data nyata.",
          "Fitur penutupan periode (period-lock) juga memastikan bahwa data transaksi bulan lalu yang sudah disahkan tidak dapat diubah secara tidak sengaja oleh staf, menjaga integritas audit pembukuan perusahaan Anda.",
        ],
      },
    ],
    faq: [
      {
        q: "Berapa lama waktu yang dibutuhkan untuk proses migrasi pembukuan?",
        a: "Untuk skala UMKM hingga usaha menengah, proses migrasi saldo awal dan penyesuaian alur kerja biasanya membutuhkan waktu antara 3 hingga 7 hari kerja.",
      },
      {
        q: "Apakah data transaksi lama di Excel bisa diimpor sekaligus?",
        a: "Bisa. Siarpi menyediakan template Excel standar untuk mengimpor daftar produk, daftar akun COA, data pelanggan, dan piutang berjalan secara massal.",
      },
      {
        q: "Bagaimana jika ada selisih kas tunai saat pertama kali migrasi?",
        a: "Selisih tersebut dikelompokkan ke dalam akun Penyesuaian Kas / Selisih Kasir pada tanggal potong saldo, sehingga periode baru dimulai dengan angka fisik yang benar-benar akurat.",
      },
    ],
  },
  "rumus-kas-usaha-harian": {
    slug: "rumus-kas-usaha-harian",
    title: "5 Indikator Finansial Penting Membaca Kesehatan Arus Kas Usaha Harian",
    subtitle:
      "Memahami perbedaan profit di atas kertas dengan ketersediaan uang tunai nyata, serta cara menghitung rasio likuiditas untuk mencegah krisis modal kerja.",
    category: "Tips Akuntansi",
    readTime: "8 min read",
    author: "Tim Akuntansi & Produk Siarpi",
    publishedDate: "18 Juli 2026",
    summary:
      "Banyak perusahaan yang mencatatkan pertumbuhan penjualan dan laba bersih di atas kertas namun mengalami kesulitan keuangan karena arus kas yang tersendat. Artikel ini mengurai lima indikator harian yang wajib dipantau pemilik usaha untuk menjaga likuiditas.",
    sections: [
      {
        id: "pentingnya-kas",
        heading: "Mengapa Profit Berbeda dengan Kelancaran Arus Kas?",
        paragraphs: [
          "Sebuah bisnis dapat mencatatkan penjualan bernilai besar dan membukukan laba di laporan laba rugi. Namun jika pembayaran dari pelanggan belum masuk ke rekening bank sementara tagihan operasional dan gaji karyawan sudah jatuh tempo, perusahaan tetap dapat mengalami krisis likuiditas.",
          "Perbedaan ini timbul karena pencatatan akuntansi berbasis akrual mengakui pendapatan saat faktur diterbitkan, bukan saat uang tunai diterima. Oleh karena itu, pengawasan terhadap saldo kas nyata harus dilakukan secara independen dari pencatatan omset harian.",
          "Pemilik usaha yang sukses selalu menempatkan ketersediaan arus kas operasional sebagai indikator utama kesehatan bisnis melebihi sekadar angka penjualan kotor.",
        ],
      },
      {
        id: "5-indikator",
        heading: "5 Indikator Kesehatan Arus Kas Harian",
        paragraphs: [
          "Berikut adalah lima indikator keuangan sederhana yang dapat dipantau setiap hari oleh pengelola usaha untuk memastikan arus kas tetap berada dalam zona aman:",
        ],
        bullets: [
          "Operating Cash Flow Margin: Persentase penerimaan kas bersih dibanding total omset harian. Menunjukkan seberapa efektif omset diubah menjadi uang tunai.",
          "Days Sales Outstanding (DSO): Rata-rata jumlah hari yang dibutuhkan untuk mencairkan piutang dari pelanggan sejak invoice dikirim.",
          "Cash Runway Ratio: Berapa bulan perusahaan dapat bertahan menutupi pengeluaran operasional menggunakan saldo kas saat ini jika tidak ada penjualan baru.",
          "Quick Ratio: Kemampuan aset lancar tunai dalam menutupi seluruh utang dan kewajiban jangka pendek yang akan jatuh tempo.",
          "Cash Conversion Cycle (CCC): Durasi sejak modal tunai dikeluarkan untuk membeli persediaan hingga persediaan tersebut terjual dan menghasilkan kas kembali.",
        ],
        callout: {
          type: "info",
          text: "Jika nilai Days Sales Outstanding (DSO) bisnis Anda melebihi 45 hari, ini menandakan bahwa terlalu banyak modal kerja Anda yang tertahan di pelanggan.",
        },
      },
      {
        id: "langkah-perbaikan",
        heading: "Langkah Praktis Memperbaiki Arus Kas yang Tersendat",
        paragraphs: [
          "Jika hasil evaluasi menunjukkan indikator arus kas berada di zona berbahaya, ada tiga langkah cepat yang dapat segera diterapkan:",
          "Pertama, berikan insentif potongan harga kecil (misalnya 2%) untuk pelanggan yang melunasi faktur sebelum jatuh tempo. Kedua, jadwalkan pembayaran utang supplier mendekati batas akhir jatuh tempo tanpa melanggar kesepakatan. Ketiga, kurangi penumpukan persediaan barang yang lambat terjual (slow-moving inventory).",
        ],
        keyTakeaway:
          "Disiplin menagih piutang yang hampir jatuh tempo jauh lebih efektif menambah arus kas dibanding terus memperbesar omset penjualan kredit.",
      },
    ],
    faq: [
      {
        q: "Seberapa sering pemilik usaha harus mengecek laporan arus kas?",
        a: "Pengecekan ringkasan saldo kas tunai dan rekening bank sebaiknya dilakukan setiap hari, sedangkan analisis komprehensif arus kas dilakukan secara mingguan.",
      },
      {
        q: "Berapa idealnya dana cadangan kas yang harus dimiliki perusahaan?",
        a: "Idealnya perusahaan memiliki cadangan kas operasional (cash runway) sebesar 3 hingga 6 bulan dari total pengeluaran rutin harian.",
      },
    ],
  },
  "otomatisasi-efaktur-ppn": {
    slug: "otomatisasi-efaktur-ppn",
    title: "Panduan Otomatisasi e-Faktur Pajak dan Rekonsiliasi PPN Perusahaan",
    subtitle:
      "Cara menyelaraskan pencatatan PPN Masukan dan PPN Keluaran agar siap diimpor ke aplikasi DJP Online tanpa selisih dan bebas dari denda keterlambatan.",
    category: "Pajak & Valuta",
    readTime: "9 min read",
    author: "Tim Pajak & Akuntansi Siarpi",
    publishedDate: "15 Juli 2026",
    summary:
      "Menyusun Faktur Pajak PPN dan mencocokkan bukti potong di akhir masa pajak sering kali menyita waktu tim akuntansi. Pelajari cara menyelaraskan data transaksi akuntansi dengan format impor e-Faktur DJP secara otomatis.",
    sections: [
      {
        id: "alur-pajak",
        heading: "Tantangan Rekonsiliasi Pajak PPN di Akhir Masa Pajak",
        paragraphs: [
          "Pengelolaan Pajak Pertambahan Nilai (PPN) Masukan dan PPN Keluaran memerlukan ketelitian tinggi. Adanya perbedaan tanggal pembuatan faktur penjualan dengan tanggal penerbitan faktur pajak sering kali memicu selisih saat pemeriksaan SPT Masa PPN.",
          "Selain itu, penginputan manual faktur pajak pembelian dari supplier satu per satu ke aplikasi e-Faktur DJP rapi berisiko terjadinya salah ketik nomor seri faktur pajak (NSFP) atau pembatalan faktur unilateral.",
          "Otomatisasi pencatatan pajak sejak pembuatan invoice penjualan membantu memastikan seluruh PPN Masukan yang dapat dikreditkan tercatat dengan benar dan siap diimpor.",
        ],
        callout: {
          type: "warning",
          text: "Keterlambatan dalam menerbitkan faktur pajak PPN dapat dikenakan sanksi denda administratif sesuai dengan ketentuan perpajakan yang berlaku di Indonesia.",
        },
      },
      {
        id: "langkah-otomatisasi",
        heading: "Langkah Menyusun Data e-Faktur Pajak yang Siap Impor",
        paragraphs: [
          "Untuk mempercepat proses pelaporan SPT Masa PPN, pastikan sistem pembukuan Anda terhubung dengan master data NPWP dan NIK pelanggan secara valid.",
          "Siarpi secara otomatis mengelompokkan nilai PPN Keluaran dari setiap faktur penjualan terverifikasi dan menghasilkan berkas ekspor CSV yang sesuai dengan spesifikasi resmi e-Faktur DJP Online.",
        ],
        bullets: [
          "Pengelompokan otomatis PPN Masukan yang dapat dikreditkan dan tidak dapat dikreditkan.",
          "Validasi kelengkapan data NPWP / NIK pembeli sebelum faktur diterbitkan.",
          "Ekspor berkas CSV faktur pajak keluaran secara massal tanpa perlu entri manual.",
        ],
      },
    ],
    faq: [
      {
        q: "Apakah format ekspor file CSV Siarpi sudah mendukung e-Faktur DJP terbaru?",
        a: "Ya, skema CSV yang dihasilkan otomatis mengikuti struktur skema impor resmi dari aplikasi e-Faktur DJP Online terbaru.",
      },
      {
        q: "Bagaimana jika ada pembatalan faktur penjualan di bulan berikutnya?",
        a: "Sistem akan membuat jurnal penyesuaian retur/batal faktur otomatis dan memperbarui draf nota retur pajak pada periode berjalan.",
      },
    ],
  },
};
