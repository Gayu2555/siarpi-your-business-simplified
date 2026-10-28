import type { ModuleDetail } from "./types";

// Copy halaman /modules/production. Sama seperti kartu pricing: setiap baris
// harus bisa dibuka buktinya di produk (lihat pricing-feature-highlights.ts).
// Nama status, nomor dokumen, dan judul halaman di bawah sengaja mengikuti yang
// benar-benar tampil di aplikasi (Dashboard Produksi, Manufacturing Orders).
export const production: ModuleDetail = {
  tagline: "Resep terukur, bahan cukup, HPP selalu tahu angkanya",
  longDescription:
    "Siarpi Production menyambungkan BoM bertingkat, kesiapan bahan, jalannya pesanan di setiap pusat kerja, pemeriksaan mutu, sampai biaya tenaga kerja dan overhead. Hasilnya: harga pokok produksi tiap batch terhitung sendiri dan terbukukan rapi, bukan dihitung manual di spreadsheet setiap akhir bulan.",
  keyBenefits: [
    "BoM bertingkat dibuat dalam satu form, semua level tersimpan sekaligus",
    "HPP per unit terhitung dari bahan, tenaga kerja, dan biaya pusat kerja",
    "Bahan keluar dan barang jadi masuk langsung terbukukan, tanpa entri ulang",
  ],
  features: [
    {
      title: "BoM Bertingkat (Multi-Level)",
      category: "Perencanaan & Resep",
      iconName: "ClipboardList",
      desc: "Susun produk → sub-assembly → bahan baku dalam satu form. Semua level tersimpan sekaligus, sub-rakitan dibuat lebih dulu.",
      bullets: [
        "Beberapa level resep diisi dalam satu form, bukan satu-satu",
        "Level paling bawah disusun lebih dulu dalam satu transaksi",
        "Struktur yang berputar kembali ke produknya ditolak otomatis",
      ],
    },
    {
      title: "Versi & Status BoM",
      category: "Perencanaan & Resep",
      iconName: "GitBranch",
      desc: "Setiap perubahan menjadi versi baru. BoM lama tidak pernah tertimpa, order yang sedang jalan tetap memakai resep asalnya.",
      bullets: [
        "Perubahan apa pun menjadi versi baru, BoM lama tetap tersimpan",
        "Hanya BoM berstatus aktif yang bisa dipakai membuat pesanan",
        "Order yang sedang jalan tetap memakai resep saat ia dibuat",
      ],
    },
    {
      title: "BoM Kit untuk Produk Paket",
      category: "Perencanaan & Resep",
      iconName: "Boxes",
      desc: "Paket penjualan yang tidak perlu dirakit di lantai produksi: faktur terbit, komponen langsung terpotong dari stok.",
      bullets: [
        "Paket dijual tanpa proses perakitan di lantai produksi",
        "Faktur terbit, komponen langsung terpotong dari stok",
        "Komponen keluar dengan harga pokoknya masing-masing",
      ],
    },
    {
      title: "Ledakan BoM & Where-Used",
      category: "Perencanaan & Resep",
      iconName: "Search",
      desc: "Total kebutuhan bahan lintas level untuk N unit produksi, dibalik pun bisa: bahan ini dipakai produk apa saja.",
      bullets: [
        "Total kebutuhan bahan lintas level untuk N unit produksi",
        "Satu bahan yang muncul di banyak level dijumlah jadi satu angka",
        "Dibalik: lihat produk mana saja yang memakai suatu bahan",
      ],
    },
    {
      title: "Cek Kesiapan Bahan",
      category: "Bahan & Gudang",
      iconName: "PackageCheck",
      desc: "Sebelum pesanan dibuat, sistem menghitung bahan mana yang kurang dan berapa kekurangan tiap level resepnya.",
      bullets: [
        "Kekurangan bahan dihitung sebelum pesanan produksi dibuat",
        "Hasilnya per level resep, lengkap dengan stok yang tersedia",
        "Kesiapan komponen ikut tampil di daftar pesanan produksi",
      ],
    },
    {
      title: "Konsumsi Bahan Terbukukan",
      category: "Bahan & Gudang",
      iconName: "ArrowLeftRight",
      desc: "Bahan keluar dari gudang mengikuti FEFO/FIFO, tercatat sebagai Barang Dalam Proses, jurnal terbentuk bersamaan.",
      bullets: [
        "Bahan keluar mengikuti FEFO/FIFO dari gudang bahan baku",
        "Persediaan berkurang, barang dalam proses bertambah, jurnal jalan",
        "Pemakaian tercatat per pesanan, jadi selisih bahan mudah ditelusuri",
      ],
    },
    {
      title: "Pembongkaran (Unbuild)",
      category: "Bahan & Gudang",
      iconName: "Undo2",
      desc: "Bongkar stok barang jadi kembali menjadi komponen, dari gudang asal ke gudang tujuan berbeda, selisih nilainya ikut terbukukan.",
      bullets: [
        "Bongkar stok barang jadi kembali menjadi komponennya",
        "Gudang asal dan gudang tujuan boleh berbeda",
        "Selisih nilai pembongkaran otomatis menjadi jurnal",
      ],
    },
    {
      title: "Pesanan Produksi dengan Alur Jelas",
      category: "Produksi Harian",
      iconName: "Factory",
      desc: "Draft, Dikonfirmasi, Sedang Berlangsung, Untuk Ditutup, Selesai. Batal? Stok dan jurnal dibalik otomatis.",
      bullets: [
        "Draft, Dikonfirmasi, Sedang Berlangsung, Untuk Ditutup, Selesai",
        "Komponen, operasi, dan tarif kerja dikunci saat pesanan dibuat",
        "Dibatalkan? Stok dan jurnal dibalik dalam satu transaksi",
      ],
    },
    {
      title: "Penerimaan Barang Jadi",
      category: "Produksi Harian",
      iconName: "PackagePlus",
      desc: "Hasil produksi masuk persediaan lengkap dengan HPP per unit; order baru bisa ditutup kalau operasi dan hasil jadi sudah lengkap.",
      bullets: [
        "Hasil produksi masuk persediaan dengan HPP per unit",
        "Unit cacat dicatat terpisah dan tidak dihitung sebagai hasil baik",
        "Order ditutup setelah semua operasi dan barang jadi lengkap",
      ],
    },
    {
      title: "Scrap & Pembuangan Barang Gagal",
      category: "Produksi Harian",
      iconName: "Trash2",
      desc: "Bahan terbuang atau hasil gagal dicatat beserta alasan dan apakah masih bisa diselamatkan; nilainya menjadi beban produksi.",
      bullets: [
        "Dicatat dengan alasan dan status masih layak atau tidak",
        "Bisa dipisahkan ke gudang scrap tersendiri",
        "Nilainya jadi beban produksi, tidak menggelembungkan HPP",
      ],
    },
    {
      title: "Subkontrak: Kerjakan di Vendor",
      category: "Produksi Harian",
      iconName: "Truck",
      desc: "Tandai BoM sebagai subkontrak, kirim komponennya dari gudang sendiri lewat pesanan produksi, lalu terima hasil jadinya.",
      bullets: [
        "Tandai BoM sebagai subkontrak beserta komponen yang dikirim",
        "Komponen keluar dari gudang sendiri lewat pesanan produksinya",
        "Penerimaan hasil jadi memotong komponen yang sudah dikirim",
      ],
    },
    {
      title: "Pusat Kerja: Kapasitas & Biaya per Jam",
      category: "Pusat Kerja & Jadwal",
      iconName: "Cog",
      desc: "Tiap mesin atau tim punya kapasitas per jam, biaya per jam, biaya per karyawan, serta waktu setup dan pembersihannya.",
      bullets: [
        "Kapasitas per jam, biaya per jam, dan biaya per karyawan",
        "Kapasitas dan waktu setup bisa dibedakan per produk",
        "Bisa ditautkan ke pusat kerja pengganti saat kapasitas penuh",
      ],
    },
    {
      title: "Kalender Kerja & Antrean Jadwal",
      category: "Pusat Kerja & Jadwal",
      iconName: "CalendarDays",
      desc: "Jam tersedia tiap pusat kerja mengikuti kalender kerja; antrean pekerjaan diurut ulang dan bentroknya dicek saat operasi dimulai.",
      bullets: [
        "Jam tersedia diambil dari kalender kerja tiap pusat kerja",
        "Antrean pekerjaan diurut ulang mengikuti prioritas hari itu",
        "Bentrok jadwal dicek saat operasi benar-benar dimulai",
      ],
    },
    {
      title: "Kontrol Mutu di Tiap Operasi",
      category: "Mutu & Analisis",
      iconName: "BadgeCheck",
      desc: "Titik pemeriksaan wajib dinilai sebelum operasi ditutup. Produk cacat dicatat jumlahnya dan alasannya.",
      bullets: [
        "Titik pemeriksaan harus dinilai sebelum operasi dinyatakan selesai",
        "Jumlah dan alasan produk cacat dicatat per operasi",
        "Melewati gate mutu wajib disertai alasan tertulis",
      ],
    },
    {
      title: "Analisis OEE per Pusat Kerja",
      category: "Mutu & Analisis",
      iconName: "Activity",
      desc: "Skor OEE dengan pecahan waktu produktif, kegagalan peralatan, setup/pembersihan, dan efisiensi berkurang — lengkap dengan trennya.",
      bullets: [
        "Skor OEE dihitung dari eksekusi operasi, bukan angka manual",
        "Pecahan waktu produktif, kegagalan peralatan, setup, dan efisiensi berkurang",
        "Difilter per pusat kerja dan per rentang tanggal",
      ],
    },
    {
      title: "Roll-Up Biaya Bahan",
      category: "Biaya & HPP",
      iconName: "Calculator",
      desc: "Harga pokok menumpuk dari daun sampai puncak resep, termasuk susut tiap level — HPP tidak lagi dikira-kira.",
      bullets: [
        "Harga pokok menumpuk dari daun sampai puncak resep",
        "Susut (scrap %) tiap level memperbesar kebutuhan dan biayanya",
        "Jadi estimasi biaya bahan sebelum produksi dimulai",
      ],
    },
    {
      title: "Biaya Tenaga Kerja dari Data Karyawan",
      category: "Biaya & HPP",
      iconName: "Users",
      desc: "Tarif per jam diambil dari gaji karyawan saat order dibuat dan dikunci di situ — naik gaji tidak mengubah histori biaya.",
      bullets: [
        "Tarif per jam diambil dari data gaji, tidak diketik ulang",
        "Tarif dikunci saat pesanan dibuat supaya histori tidak berubah",
        "Alokasinya ke produksi terbukukan saat barang jadi diterima",
      ],
    },
    {
      title: "Riwayat Biaya & Efisiensi",
      category: "Biaya & HPP",
      iconName: "TrendingUp",
      desc: "Bandingkan waktu rencana vs aktual tiap pusat kerja, dan telusuri perubahan HPP sebuah produk dari waktu ke waktu.",
      bullets: [
        "Tiap penerimaan barang jadi meninggalkan jejak HPP per unit",
        "Pecahan bahan, tenaga kerja, dan overhead tersimpan per peristiwa",
        "Tren HPP per produk bisa dibandingkan antar pesanan",
      ],
    },
  ],
  mockup: {
    title: "Dashboard Produksi",
    subtitle: "Ringkasan BoM dan pesanan produksi",
    stats: [
      { label: "Sedang Berjalan", value: "7", tone: "primary" },
      { label: "Total BoM", value: "24", tone: "accent" },
      { label: "OEE", value: "87%", tone: "muted" },
    ],
    rows: [
      {
        label: "Meja Kerja Oak",
        sub: "PO-PROD-2026-0184 · BoM v3 · 6 operasi",
        value: "Sedang Berlangsung",
      },
      {
        label: "Kursi Ergonomis",
        sub: "PO-PROD-2026-0183 · mutu 98%",
        value: "Untuk Ditutup",
      },
      {
        label: "Rak Modular",
        sub: "PO-PROD-2026-0182 · HPP Rp 486.500/unit",
        value: "Selesai",
      },
    ],
  },
  testimonials: [],
  faq: [
    {
      q: "Apakah Bill of Materials benar-benar bisa bertingkat?",
      a: "Ya. Satu form BoM bisa memuat beberapa level sekaligus — produk jadi, sub-assembly, sampai bahan baku. Saat disimpan, sistem menyusun level paling bawah lebih dulu dalam satu transaksi, lalu menolak struktur yang berputar kembali ke produknya sendiri. Setiap level juga menyimpan versinya sendiri.",
    },
    {
      q: "Dari mana biaya produksi per unit dihitung?",
      a: "Dari tiga komponen yang sudah ada datanya: bahan (roll-up BoM berikut susut tiap level, dinilai dengan harga pokok persediaan saat ini), tenaga kerja (tarif per jam karyawan yang diambil dari data SDM dan dikunci saat order dibuat), serta pusat kerja (biaya per jam dan per karyawan, termasuk waktu setup dan pembersihan).",
    },
    {
      q: "Apakah jurnalnya otomatis?",
      a: "Ya. Konsumsi bahan memindahkannya dari Persediaan ke Barang Dalam Proses, dan penerimaan barang jadi mengembalikannya ke Persediaan. Scrap, pembongkaran, dan selisih nilainya juga terbukukan. Kalau salah satu langkah gagal dicatat, seluruh transaksi dibatalkan — tidak ada stok bergerak tanpa jejak pembukuan.",
    },
    {
      q: "Bagaimana kalau sebagian pekerjaan kami serahkan ke vendor?",
      a: "Tandai BoM-nya sebagai subkontrak. Pesanan produksinya lalu dipakai untuk mengirim komponen dari gudang Anda ke vendor, dan penerimaan barang jadinya memotong stok komponen tersebut secara otomatis. Komponen yang dikirim dan hasil yang diterima sama-sama tercatat.",
    },
    {
      q: "Untuk produk paket, harus dirakit dulu?",
      a: "Tidak. BoM jenis kit cukup dijual apa adanya: saat faktur terbit, komponen-komponennya terpotong dari stok dan nilainya langsung menjadi harga pokok penjualan. Kalau paketnya perlu dibongkar jadi satuan, ada order pembongkaran untuk itu.",
    },
    {
      q: "Apakah bisa membatasi siapa yang boleh mengubah resep atau membatalkan order?",
      a: "Bisa. Hak akses dipisah per aksi — mengelola BoM, menjalankan pesanan produksi, mencatat konsumsi bahan, menerima barang jadi, sampai pembongkaran dan pembuangan. Produksi juga terhubung ke modul SDM, Inventory, dan Finance, jadi datanya tidak perlu diketik dua kali.",
    },
  ],
};
