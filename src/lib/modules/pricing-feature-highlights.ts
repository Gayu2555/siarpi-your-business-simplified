// ─────────────────────────────────────────────────────────────────────────────
// pricing-feature-highlights.ts — daftar fitur tiap modul yang dipakai di kartu
// pricing (SuitePricingSection).
//
// Cara pakainya: 5 baris TERATAS ditampilkan sebagai checklist di dalam panel,
// sisanya tidak ditulis di kartu tapi dihitung dan ditawarkan lewat tombol CTA
// ("Lihat 8 fitur lainnya"). Jadi urutan array ini penting: yang paling menjual
// ditaruh duluan, dan kartu tidak akan pernah memanjang walau daftarnya panjang.
//
// Aturan copy:
// 1. BAHASA JUALAN, BUKAN BAHASA TEKNIS. Tidak ada nama tabel, endpoint,
//    permission, atau istilah implementasi. Yang dibaca calon pembeli adalah
//    akibatnya buat pekerjaan mereka: "kuota cuti langsung terpotong", bukan
//    "durasi granularitas per jam dengan carry-forward expiry".
// 2. SATU BARIS SATU MANFAAT, ~30-60 karakter, satu tarikan napas.
// 3. SETIAP BARIS HARUS BISA DIBUKTIKAN DI PRODUK. Jangan tulis klaim yang
//    mekanismenya belum ada (mis. selfie, GPS/geofencing, face recognition,
//    auto-transfer ke bank, impor mutasi bank, integrasi e-Faktur/DJP, MRP,
//    price list vendor) — panel ini dibaca orang sebelum bayar.
// 4. Modul yang tidak punya entri di sini tampil sebagai baris nama biasa tanpa
//    tombol, jadi menambah modul baru tidak wajib di sini.
// 5. KEY harus persis sama dengan `key` modul di katalog (huruf kecil). Kalau
//    key di katalog beda (mis. "produksi" bukan "production"), ganti key-nya.
//
// CATALOG 27/10 (verify langsung GET /public/modules + /public/suites): modul
// berbayar yang tampil di kartu = absensi, crm, employee_portal, finance, hr,
// inventory, invoice, payroll, procurement, production. Kesepuluhnya sudah punya
// entri di file ini, jadi tidak ada baris modul yang jatuh jadi teks polos.
// Catatan penting buat yang nulis copy: `invoice` dan `inventory` adalah LABEL
// KOMERSIAL di katalog, bukan gerbang teknis terpisah — backend saat ini
// meng-gate seluruh /finance/* dengan satu key "finance". Jadi kedua entri itu
// menceritakan kemampuan yang benar-benar ada di produk, bukan modul yang
// berdiri sendiri; jangan sampai ada baris yang menyiratkan "beli Invoice,
// pakai tanpa Finance".
//
// Tujuan CTA tidak disimpan di file ini: halaman modul punya bentuk rute yang
// beda (/hr, /payroll, dan /modules/$moduleId), jadi Link-nya dirender di
// SuitePricingSection supaya `to` tetap literal dan router ikut menjaganya.
// Semua key di file ini juga sudah punya halaman statis di lib/modules/index.ts
// (moduleDetails), jadi CTA tidak ada yang mati ke "Modul Tidak Ditemukan".
// ─────────────────────────────────────────────────────────────────────────────

/** Jumlah baris fitur yang muat di checklist kartu pricing. */
export const PRICING_FEATURE_LIMIT = 5;

export const modulePricingFeatures: Record<string, string[]> = {
  hr: [
    "Cuti dan izin diajukan sendiri, kuota langsung terpotong",
    "Persetujuan naik otomatis ke atasan yang berwenang",
    "Klaim biaya tinggal unggah bukti, cair bareng gaji",
    "Data karyawan & dokumen lengkap, angka sensitif tersamar",
    "Onboarding rapi, offboarding tertib sampai serah terima aset",
    "Aturan cuti mengikuti kebijakan perusahaan sendiri",
    "Rekam jejak karyawan: kenaikan gaji, surat peringatan, sertifikat",
    "Peta kemampuan karyawan dibanding syarat tiap jabatan",
    "Calon pengganti posisi kunci sudah terpantau dari sekarang",
    "Bagan organisasi dan siapa melapor ke siapa tertata",
    "Lembur diajukan, disetujui, lalu terbawa ke perhitungan gaji",
    "Barang perusahaan tercatat dipegang siapa dan kapan kembali",
    "Laporan SDM siap saat manajemen minta data",
  ],

  payroll: [
    "Gaji, lembur, THR, dan potongan dihitung sekali jalan",
    "PPh 21 sesuai tarif terbaru, bukti potong dibuat otomatis",
    "Gaji dituntaskan, pembukuan langsung tercatat",
    "Kasbon terpotong tiap periode sampai lunas",
    "BPJS karyawan dan perusahaan terhitung jelas",
    "THR proporsional menurut masa kerja, ada pengingatnya",
    "Potongan khas perusahaan: koperasi, iuran, denda internal",
    "Yang tidak masuk kerja terpotong proporsional dan adil",
    "Slip gaji rapi dengan kop dan tanda tangan perusahaan",
    "Penuntasan gaji butuh wewenang; kurang limit, naik ke atasan",
    "Rekap pajak per periode dan per tahun siap tinggal unduh",
  ],

  absensi: [
    "Clock in dan out dicatat langsung oleh karyawan",
    "Lembur disetujui dulu, dihitung kemudian",
    "Kalender kerja, hari libur, dan shift diatur sekali",
    "Lupa absen ada jalur koreksi dan atasannya ikut dikabari",
    "Rekap kehadiran bulanan siap dipakai untuk gaji",
    "Yang belum absen terpantau otomatis, tanpa menyisir daftar",
    "Jadwal berubah mendadak cukup dicatat sebagai penyesuaian",
  ],

  employee_portal: [
    "Cuti, izin, klaim, dan kasbon diajukan dari satu tempat",
    "Sisa kuota cuti, slip gaji, dan jadwal kerja selalu terlihat",
    "Kalender cuti tim supaya jadwal tidak saling bentrok",
    "Absen dan lihat riwayat jam kerja sendiri",
    "Ajukan pembetulan absensi tanpa perlu lewat HR",
    "Tiap orang hanya bisa melihat datanya sendiri",
  ],

  finance: [
    "Faktur terbit, stok keluar dan HPP langsung terbukukan",
    "Laba rugi, neraca, dan arus kas dihitung dari jurnal",
    "Tutup buku per bulan, dikunci dengan jejak alasan buka ulang",
    "Umur piutang dan hutang per pelanggan dan vendor terpantau",
    "Satu pembayaran bisa dialokasikan ke banyak faktur",
    "Bagan akun siap pakai dari templat PSAK, satu klik",
    "Jurnal manual wajib disetujui sesuai batas nominal",
    "Saldo awal piutang, hutang, dan stok, tanpa ketik ulang faktur",
    "Rekonsiliasi bank, biaya admin dan bunga jadi jurnal",
    "Transaksi mata uang asing, selisih kurs terbukukan otomatis",
    "Stok per gudang dan rak, barang kadaluwarsa keluar duluan",
    "Stock opname, selisih hitung langsung masuk pembukuan",
    "Aset tetap: penyusutan, revaluasi, sampai penjualan aset",
    "Bukti potong PPh dan berkas Coretax BPA1/BPMP siap unggah",
    "Anggaran dibandingkan realisasi langsung dari jurnal",
    "Retur penjualan: credit note, refund, atau barang pengganti",
    "Cetak faktur dengan logo, rekening, dan tanda tangan sendiri",
  ],

  production: [
    "BoM bertingkat: produk → sub-assembly → bahan baku",
    "Semua level dibuat & dihitung biayanya dari satu form BoM",
    "Rakit barang jadi atau bongkar kembali jadi komponen",
    "Biaya produksi per unit terhitung otomatis dari tiap order",
    "Pecahan kebutuhan bahan tiap level, siap jadi daftar beli",
    "Bahan terpakai dan barang jadi langsung masuk pembukuan",
    "Cek kecukupan bahan sebelum order produksi dibuat",
    "Bongkar stok dari gudang A, komponen masuk gudang B",
    "Versi resep baru dibuat, yang lama tidak ditimpa",
    "Resep diedit, order yang sedang jalan tidak ikut berubah",
    "Batalkan order, stok dan jurnal terbalik otomatis",
    "Produk paket terjual, komponennya terpotong sendiri",
    "Kerjakan di vendor, bahan dikirim dari gudang kita",
    "Titik pemeriksaan mutu per operasi, cacat tercatat",
    "Mesin dan tim lengkap dengan kapasitas dan biaya per jam",
    "Biaya tenaga kerja diambil dari tarif per jam karyawan",
    "Analisis OEE per mesin dan riwayat HPP per produk",
  ],

  procurement: [
    "Permintaan beli bertahap: ajukan, setujui, lanjut jadi PO",
    "Persetujuan naik otomatis ke atasan sesuai batas nominal",
    "Tender ke beberapa pemasok, penghematan terukur",
    "Barang diterima menambah stok, tagihan tak bisa melebihinya",
    "Barang rusak atau ditolak otomatis jadi draft retur",
    "Skor pemasok dari ketepatan waktu dan kualitas barang",
    "Laporan belanja per departemen dan pemasok teratas",
    "PO dengan mata uang asing, diskon, pajak, dan lampiran",
    "PO lunas otomatis begitu sudah ditagih penuh",
  ],

  crm: [
    "Prospek jadi pelanggan dan sales order sekali klik",
    "Tahap pipeline disusun ulang mengikuti cara sales bekerja",
    "Deal menang otomatis berlanjut jadi sales order",
    "Deal kalah dicatat beserta alasannya, evaluasi lebih jujur",
    "Dashboard sales: pipeline jalan dan nilainya terbaca sekarang",
    "Semua percakapan dan tugas follow-up tercatat per prospek",
    "Item dan jumlah yang dijual dicatat lengkap di tiap deal",
    "Daftar harga per pelanggan, harga jual tidak lagi beda-beda",
    "Target per orang per bulan, pencapaian tiap sales terpantau",
    "Riwayat tagihan pelanggan bisa dibuka dari halaman CRM",
  ],

  inventory: [
    "Stok per gudang dan per rak, mutasi tiap barang terlacak",
    "Barang mau kedaluwarsa keluar duluan, stok lama berikutnya",
    "Stok minimum dipantau, hampir habis ada pengingatnya",
    "Proyeksi stok dari rencana pembelian dan penjualan berjalan",
    "Batch dan tanggal kedaluwarsa terpantau saat ambil barang",
    "Stock opname: selisih hasil hitung langsung masuk pembukuan",
    "Transfer dan penyesuaian stok antar gudang tercatat rapi",
    "Saldo awal stok tinggal diimpor dari dokumen lama",
    "Nilai persediaan rata-rata tertimbang, tercatat otomatis",
    "Retur pembelian dan penjualan nyambung ke pergerakan stok",
  ],

  invoice: [
    "Faktur dibuat dari sales order, beberapa SO bisa digabung",
    "Tayang setelah disetujui, sebatas wewenang penyetuju",
    "Faktur salah? Batalkan, jurnal dan stok ikut dibalik",
    "Satu pembayaran bisa dialokasikan ke banyak faktur sekaligus",
    "Umur piutang per pelanggan: lancar sampai lewat 90 hari",
    "Uang muka tercatat, sisa tagihan tetap terpantau",
    "Retur penjualan: credit note, refund, atau barang pengganti",
    "Faktur Pajak ikut terbit bersama faktur penjualannya",
    "Cetak faktur dengan logo, rekening, dan NPWP perusahaan",
    "Tagihan vendor dilampiri dan dicocokkan ke barang diterima",
    "Faktur mata uang asing memakai kurs saat transaksi",
  ],
};

/**
 * Potong daftar fitur untuk kartu pricing: `visible` maksimal
 * PRICING_FEATURE_LIMIT baris, `remaining` sisa fitur yang baru terbaca setelah
 * pengunjung membuka halaman modul.
 */
export function getModulePricingFeatures(
  moduleKey: string,
): { visible: string[]; remaining: number } | undefined {
  const all = modulePricingFeatures[moduleKey.trim().toLowerCase()];
  if (!all) return undefined;
  return {
    visible: all.slice(0, PRICING_FEATURE_LIMIT),
    remaining: Math.max(all.length - PRICING_FEATURE_LIMIT, 0),
  };
}
