import type { ArticleData } from "@/lib/articles";

export const additionalArticles: Record<string, ArticleData> = {
  "sop-stock-opname-multi-gudang": {
    slug: "sop-stock-opname-multi-gudang",
    title: "SOP Stock Opname Multi-Gudang: Dari Persiapan hingga Rekonsiliasi Selisih",
    subtitle:
      "Panduan praktis menyiapkan hitung fisik, membagi tanggung jawab tim, dan menindaklanjuti selisih stok tanpa menghentikan operasional lebih lama dari yang diperlukan.",
    category: "Inventory & Operasional",
    readTime: "9 menit baca",
    author: "Tim Operasional Siarpi",
    publishedDate: "12 September 2026",
    summary:
      "Stock opname yang baik bukan sekadar menghitung barang. Pelajari cara menetapkan cut-off, membagi area, mencatat hasil, menyelidiki selisih, dan mengunci tindak lanjut untuk banyak gudang.",
    sections: [
      {
        id: "tujuan-stock-opname",
        heading: "Tentukan Tujuan dan Ruang Lingkup Sebelum Menghitung",
        paragraphs: [
          "Stock opname dapat dilakukan untuk pemeriksaan rutin, perpindahan penanggung jawab, persiapan audit, atau investigasi selisih tertentu. Tujuan ini menentukan apakah seluruh produk harus dihitung atau cukup memakai cycle count pada kategori berisiko tinggi.",
          "Untuk operasi multi-gudang, tetapkan lokasi, zona rak, kategori barang, dan periode transaksi yang masuk ke pemeriksaan. Hindari satu daftar besar tanpa pemilik area karena barang dapat terhitung dua kali atau justru terlewat.",
        ],
        bullets: [
          "Tentukan gudang dan zona yang masuk ruang lingkup.",
          "Pisahkan barang rusak, retur, titipan, dan barang dalam perjalanan.",
          "Tetapkan waktu mulai, waktu selesai, serta penanggung jawab setiap area.",
          "Pilih full count atau cycle count berdasarkan risiko dan kapasitas tim.",
        ],
        keyTakeaway:
          "Ruang lingkup yang jelas lebih penting daripada menambah jumlah penghitung tanpa pembagian area.",
      },
      {
        id: "cut-off-dan-dokumen",
        heading: "Siapkan Cut-Off dan Dokumen Pergerakan Barang",
        paragraphs: [
          "Tetapkan batas waktu terakhir penerimaan, pengeluaran, dan transfer antar-gudang sebelum penghitungan dimulai. Transaksi setelah cut-off perlu ditahan atau dicatat pada daftar terpisah agar posisi sistem dapat direkonsiliasi dengan waktu hitung fisik.",
          "Pastikan dokumen yang belum diposting telah diperiksa, termasuk penerimaan tanpa purchase order, transfer yang belum diterima gudang tujuan, retur pelanggan, dan barang yang sudah dikirim tetapi belum dikurangi dari stok.",
        ],
        callout: {
          type: "warning",
          text: "Selisih sering berasal dari perbedaan waktu pencatatan, bukan kehilangan barang. Catat semua pergerakan setelah cut-off sebelum membuat jurnal penyesuaian.",
        },
      },
      {
        id: "pelaksanaan-hitung-fisik",
        heading: "Laksanakan Hitung Fisik dengan Prinsip Blind Count",
        paragraphs: [
          "Pada blind count, petugas menerima daftar lokasi dan barang tanpa melihat kuantitas menurut sistem. Metode ini mengurangi kecenderungan menyesuaikan hasil fisik dengan angka yang sudah diketahui.",
          "Gunakan dua peran terpisah bila memungkinkan: penghitung menyebutkan hasil, sedangkan pencatat memasukkan jumlah dan kondisi barang. Produk bernilai tinggi atau memiliki selisih besar perlu dihitung ulang oleh tim berbeda.",
        ],
        bullets: [
          "Hitung berdasarkan urutan lokasi agar tidak berpindah secara acak.",
          "Tempel penanda pada area yang sudah selesai diperiksa.",
          "Catat satuan terkecil dan konversi kemasan secara konsisten.",
          "Ambil bukti foto untuk barang rusak atau lokasi yang tidak sesuai.",
        ],
      },
      {
        id: "rekonsiliasi-selisih",
        heading: "Kelompokkan Selisih Sebelum Melakukan Penyesuaian",
        paragraphs: [
          "Jangan langsung menghapus selisih dengan satu transaksi penyesuaian. Kelompokkan penyebabnya menjadi kesalahan satuan, transaksi terlambat, salah lokasi, kerusakan, kehilangan, atau kesalahan master data.",
          "Setelah penyebab diperiksa, mintakan persetujuan sesuai batas nominal perusahaan. Catat alasan, bukti, pemeriksa, dan waktu persetujuan agar perubahan kuantitas dapat diaudit kembali.",
        ],
        callout: {
          type: "success",
          text: "Selesainya stock opname bukan saat angka fisik dimasukkan, tetapi saat setiap selisih memiliki penyebab dan tindak lanjut yang jelas.",
        },
      },
      {
        id: "jadwal-cycle-count",
        heading: "Bangun Jadwal Cycle Count Berbasis Risiko",
        paragraphs: [
          "Setelah stock opname besar selesai, gunakan hasilnya untuk menentukan frekuensi pemeriksaan berikutnya. Barang bernilai tinggi, cepat bergerak, atau sering berselisih perlu dihitung lebih sering dibanding produk stabil.",
          "Pantau persentase akurasi stok, jumlah koreksi, nilai selisih, dan penyebab dominan per gudang. Tren tersebut membantu manajemen memperbaiki proses penerimaan, penyimpanan, dan pengeluaran barang.",
        ],
      },
    ],
    faq: [
      {
        q: "Apakah gudang harus berhenti beroperasi selama stock opname?",
        a: "Tidak selalu. Operasional dapat dibagi per zona atau memakai cycle count, tetapi seluruh transaksi selama periode hitung harus dipisahkan dan direkonsiliasi terhadap waktu cut-off.",
      },
      {
        q: "Siapa yang menyetujui penyesuaian stok?",
        a: "Gunakan matriks kewenangan berdasarkan nilai dan penyebab selisih. Selisih material sebaiknya ditinjau oleh pemilik gudang dan fungsi keuangan atau kontrol internal.",
      },
    ],
  },

  "checklist-payroll-bulanan": {
    slug: "checklist-payroll-bulanan",
    title: "Checklist Payroll Bulanan: Cut-Off, Validasi, Pembayaran, dan Rekonsiliasi",
    subtitle:
      "SOP periodik untuk menyatukan data karyawan, absensi, komponen pendapatan, potongan, persetujuan, dan bukti pembayaran dalam satu proses yang dapat ditelusuri.",
    category: "HR & Payroll",
    readTime: "10 menit baca",
    author: "Tim HR & Payroll Siarpi",
    publishedDate: "10 September 2026",
    summary:
      "Kurangi koreksi slip gaji dengan kalender cut-off yang jelas, pembagian tanggung jawab, validasi berlapis, dan rekonsiliasi setelah pembayaran.",
    sections: [
      {
        id: "kalender-cut-off",
        heading: "Mulai dari Kalender Cut-Off yang Dipahami Semua Tim",
        paragraphs: [
          "Payroll sering terlambat bukan karena perhitungannya rumit, melainkan karena data perubahan karyawan datang setelah proses dimulai. Susun kalender yang memuat batas absensi, lembur, perubahan rekening, komponen variabel, approval, dan tanggal pembayaran.",
          "Bagikan kalender kepada HR, atasan, finance, dan karyawan. Perubahan setelah batas waktu harus mengikuti prosedur koreksi yang jelas, bukan dimasukkan diam-diam ke periode yang sedang dihitung.",
        ],
        bullets: [
          "Cut-off absensi, cuti, dan lembur.",
          "Batas perubahan gaji, tunjangan, potongan, dan rekening bank.",
          "Tanggal review atasan dan persetujuan final.",
          "Tanggal pembayaran serta penerbitan slip gaji.",
        ],
      },
      {
        id: "validasi-master-karyawan",
        heading: "Validasi Master Karyawan Sebelum Menghitung",
        paragraphs: [
          "Pastikan status aktif, tanggal bergabung atau berhenti, departemen, lokasi kerja, rekening, dan struktur kompensasi sudah benar. Satu perubahan master yang terlambat dapat memengaruhi banyak komponen pada hasil akhir.",
          "Batasi hak mengubah komponen sensitif dan simpan riwayat perubahan. Penginput data dan pemberi persetujuan idealnya merupakan peran yang berbeda untuk mengurangi risiko kesalahan maupun perubahan tanpa otorisasi.",
        ],
        callout: {
          type: "info",
          text: "Gunakan daftar perubahan periode sebagai kontrol: karyawan baru, resign, promosi, mutasi, perubahan rekening, dan perubahan komponen gaji.",
        },
      },
      {
        id: "rekonsiliasi-input",
        heading: "Rekonsiliasi Absensi dan Komponen Variabel",
        paragraphs: [
          "Bandingkan ringkasan hari kerja, ketidakhadiran, lembur, dan cuti dengan data sumber sebelum payroll dikunci. Jangan hanya memeriksa total nominal; cari juga anomali seperti jam lembur ekstrem, potongan ganda, atau komponen yang hilang.",
          "Komponen sekali bayar seperti bonus, insentif, reimbursement, dan koreksi periode lalu perlu diberi label serta referensi dokumen agar mudah dijelaskan kepada karyawan.",
        ],
        keyTakeaway:
          "Validasi berbasis pengecualian lebih efektif daripada membaca seluruh slip satu per satu dengan perlakuan yang sama.",
      },
      {
        id: "review-dan-pembayaran",
        heading: "Gunakan Review Berlapis Sebelum Pembayaran",
        paragraphs: [
          "Buat ringkasan perbandingan dengan periode sebelumnya: jumlah karyawan, total pendapatan, total potongan, dan nilai bersih. Perubahan material harus memiliki penjelasan sebelum file pembayaran dibuat.",
          "Setelah disetujui, kunci hasil payroll, buat instruksi pembayaran, dan simpan referensi batch. Hindari menghitung ulang setelah pembayaran tanpa membuat versi koreksi yang dapat ditelusuri.",
        ],
        bullets: [
          "Review anomali per karyawan dan per departemen.",
          "Approval total payroll sesuai matriks kewenangan.",
          "Validasi nama, rekening, dan nominal pada file pembayaran.",
          "Distribusi slip hanya kepada penerima yang berhak.",
        ],
      },
      {
        id: "pasca-payroll",
        heading: "Tutup Periode dengan Rekonsiliasi dan Daftar Koreksi",
        paragraphs: [
          "Cocokkan nilai payroll yang disetujui dengan pembayaran berhasil, pembayaran gagal, jurnal, dan kewajiban terkait. Daftar kegagalan transfer harus ditindaklanjuti tanpa membuka kembali seluruh batch.",
          "Simpan catatan koreksi untuk periode berikutnya dan lakukan evaluasi singkat terhadap sumber keterlambatan. Tujuannya adalah mengurangi pekerjaan ulang pada siklus berikut, bukan sekadar menyelesaikan bulan berjalan.",
        ],
        callout: {
          type: "warning",
          text: "Perhitungan pajak, iuran, dan kewajiban ketenagakerjaan harus mengikuti kebijakan perusahaan serta ketentuan yang berlaku. Lakukan review profesional bila diperlukan.",
        },
      },
    ],
    faq: [
      {
        q: "Bagaimana menangani perubahan setelah payroll dikunci?",
        a: "Catat sebagai koreksi terpisah dengan alasan, pemberi persetujuan, dan periode penerapan. Hindari mengubah batch yang sudah dibayar karena akan memutus jejak rekonsiliasi.",
      },
      {
        q: "Apakah HR dan finance harus memakai akses yang sama?",
        a: "Tidak. Pisahkan akses master karyawan, perhitungan, approval, pembayaran, dan jurnal sesuai tanggung jawab masing-masing fungsi.",
      },
    ],
  },

  "membangun-pipeline-crm-b2b": {
    slug: "membangun-pipeline-crm-b2b",
    title: "Cara Membangun Pipeline CRM B2B yang Konsisten dari Lead hingga Handover",
    subtitle:
      "Panduan mendefinisikan tahapan penjualan, kriteria perpindahan, kepemilikan lead, ritme follow-up, dan serah terima pelanggan tanpa kehilangan konteks.",
    category: "CRM & Penjualan",
    readTime: "8 menit baca",
    author: "Tim CRM Siarpi",
    publishedDate: "8 September 2026",
    summary:
      "Pipeline yang efektif harus menjelaskan tindakan berikutnya, bukan hanya menyimpan status. Susun tahapan, SLA follow-up, data wajib, dan handover yang dapat dipakai seluruh tim penjualan.",
    sections: [
      {
        id: "pipeline-bukan-daftar-status",
        heading: "Pipeline Bukan Sekadar Daftar Status",
        paragraphs: [
          "Pipeline membantu tim memahami posisi setiap peluang, siapa pemiliknya, nilai potensial, dan tindakan berikutnya. Jika satu tahap tidak memiliki kriteria masuk dan keluar, anggota tim akan menggunakannya dengan interpretasi berbeda.",
          "Mulailah dari perjalanan pembelian pelanggan, bukan struktur internal perusahaan. Tahap yang baik mewakili kemajuan keputusan pelanggan dan memiliki bukti yang dapat diperiksa.",
        ],
        callout: {
          type: "info",
          text: "Gunakan tahap sesedikit mungkin. Lima sampai tujuh tahap yang jelas biasanya lebih mudah dipatuhi daripada belasan status yang tumpang tindih.",
        },
      },
      {
        id: "definisi-tahap",
        heading: "Definisikan Kriteria Masuk dan Keluar Setiap Tahap",
        paragraphs: [
          "Contoh alur dasar dapat dimulai dari Lead Baru, Terkualifikasi, Discovery, Proposal, Negosiasi, lalu Menang atau Kalah. Sesuaikan istilah dengan proses bisnis, tetapi jangan memindahkan peluang hanya karena sales merasa pembicaraan berjalan baik.",
        ],
        bullets: [
          "Lead Baru: identitas dan sumber lead sudah tercatat.",
          "Terkualifikasi: kebutuhan, kewenangan, dan perkiraan waktu telah dikonfirmasi.",
          "Discovery: masalah bisnis dan kriteria keberhasilan telah disepakati.",
          "Proposal: ruang lingkup, harga, serta masa berlaku penawaran sudah dikirim.",
          "Negosiasi: isu komersial atau legal yang tersisa memiliki pemilik dan tenggat.",
        ],
        keyTakeaway:
          "Setiap perpindahan tahap harus meninggalkan bukti dan next action, bukan hanya perubahan label.",
      },
      {
        id: "ownership-dan-sla",
        heading: "Tetapkan Ownership dan SLA Follow-Up",
        paragraphs: [
          "Setiap lead harus memiliki satu pemilik utama walaupun melibatkan presales, manajer, atau tim produk. Ownership tunggal mencegah asumsi bahwa orang lain sedang menindaklanjuti pelanggan.",
          "Tentukan target waktu respons berdasarkan sumber dan prioritas lead. Lead inbound berniat tinggi dapat memerlukan respons lebih cepat dibanding prospek hasil kampanye edukasi. Gunakan pengingat saat aktivitas berikutnya belum dijadwalkan.",
        ],
      },
      {
        id: "data-wajib-dan-aktivitas",
        heading: "Catat Data yang Membantu Keputusan",
        paragraphs: [
          "CRM akan gagal bila diperlakukan sebagai tempat menyalin seluruh percakapan. Prioritaskan data yang membantu tindak lanjut: kebutuhan, pihak pengambil keputusan, nilai peluang, risiko, kompetitor, tanggal target, dan aktivitas berikutnya.",
          "Catatan panggilan, email, rapat, proposal, serta perubahan nilai perlu tersusun kronologis agar manajer dapat membantu tanpa meminta sales menceritakan ulang seluruh riwayat.",
        ],
        bullets: [
          "Kontak utama dan perannya dalam keputusan.",
          "Masalah bisnis serta dampaknya bagi pelanggan.",
          "Nilai dan probabilitas berdasarkan tahap yang terdefinisi.",
          "Next action lengkap dengan pemilik dan tanggal.",
          "Alasan kalah yang konsisten untuk evaluasi.",
        ],
      },
      {
        id: "handover-dan-review",
        heading: "Tutup Siklus dengan Handover dan Review Pipeline",
        paragraphs: [
          "Peluang yang menang harus diteruskan ke tim implementasi atau layanan dengan konteks lengkap: ruang lingkup yang dijual, komitmen khusus, pemangku kepentingan, tanggal target, dan risiko yang sudah diketahui.",
          "Lakukan review pipeline secara berkala untuk menghapus peluang stagnan, memperbarui next action, dan memeriksa distribusi nilai antar-tahap. Review berfokus pada keputusan dan bantuan yang dibutuhkan, bukan sekadar meminta pembaruan status.",
        ],
        callout: {
          type: "success",
          text: "Pipeline yang sehat membuat perkiraan pendapatan lebih dapat dijelaskan karena setiap angka memiliki tahap, bukti, pemilik, dan tindakan berikutnya.",
        },
      },
    ],
    faq: [
      {
        q: "Apakah semua lead harus masuk pipeline penjualan?",
        a: "Tidak. Pisahkan kontak pemasaran yang belum terkualifikasi dari peluang aktif agar pipeline tetap mencerminkan pekerjaan penjualan yang nyata.",
      },
      {
        q: "Kapan peluang dianggap stagnan?",
        a: "Tetapkan ambang berdasarkan panjang siklus penjualan dan tahap. Peluang tanpa aktivitas atau next action melewati ambang harus ditinjau, dikembalikan ke nurturing, atau ditutup dengan alasan yang jelas.",
      },
    ],
  },
};
