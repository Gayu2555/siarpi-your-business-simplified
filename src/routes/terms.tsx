import { createFileRoute } from "@tanstack/react-router";
import { FileText, Mail, Scale, ShieldCheck } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const EFFECTIVE_DATE = "17 September 2026";

const sections = [
  { id: "penerimaan", number: "01", title: "Penerimaan ketentuan" },
  { id: "layanan", number: "02", title: "Layanan Siarpi" },
  { id: "akun", number: "03", title: "Akun dan kewenangan" },
  { id: "trial", number: "04", title: "Uji coba gratis" },
  { id: "langganan", number: "05", title: "Langganan dan pembayaran" },
  { id: "penggunaan", number: "06", title: "Penggunaan yang diperbolehkan" },
  { id: "data", number: "07", title: "Data pelanggan" },
  { id: "keamanan", number: "08", title: "Keamanan dan ketersediaan" },
  { id: "kekayaan-intelektual", number: "09", title: "Kekayaan intelektual" },
  { id: "pihak-ketiga", number: "10", title: "Layanan pihak ketiga" },
  { id: "penghentian", number: "11", title: "Penangguhan dan penghentian" },
  { id: "jaminan", number: "12", title: "Penyangkalan jaminan" },
  { id: "tanggung-jawab", number: "13", title: "Batas tanggung jawab" },
  { id: "perubahan", number: "14", title: "Perubahan ketentuan" },
  { id: "hukum", number: "15", title: "Hukum dan penyelesaian sengketa" },
  { id: "kontak", number: "16", title: "Kontak" },
] as const;

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Ketentuan Layanan (Terms of Service) | Siarpi" },
      {
        name: "description",
        content:
          "Ketentuan penggunaan situs, aplikasi, modul, uji coba, dan layanan Siarpi yang disediakan oleh PT. Siarpi Solusi Sinergi.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Ketentuan Layanan Siarpi" },
      {
        property: "og:description",
        content: "Ketentuan yang mengatur penggunaan produk dan layanan Siarpi.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://siarpi.com/terms" },
    ],
    links: [{ rel: "canonical", href: "https://siarpi.com/terms" }],
  }),
  component: TermsPage,
});

function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-border py-10 first:border-t-0 first:pt-0"
    >
      <div className="mb-4 flex items-baseline gap-4">
        <span className="font-mono text-xs font-semibold text-primary">{number}</span>
        <h2 className="font-display text-xl font-semibold text-foreground md:text-2xl">{title}</h2>
      </div>
      <div className="space-y-4 pl-0 text-sm leading-7 text-muted-foreground md:pl-10 md:text-base">
        {children}
      </div>
    </section>
  );
}

function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <header className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 py-14 md:px-6 md:py-20">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <FileText className="h-4 w-4" />
              Dokumen legal
            </div>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
              Ketentuan Layanan
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              Ketentuan ini mengatur penggunaan situs, aplikasi, modul, dan layanan Siarpi yang
              disediakan oleh PT. Siarpi Solusi Sinergi.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <span>
                <strong className="font-medium text-foreground">Berlaku sejak:</strong>{" "}
                {EFFECTIVE_DATE}
              </span>
              <span>
                <strong className="font-medium text-foreground">Versi:</strong> 1.0
              </span>
            </div>
          </div>
        </header>

        <div className="container mx-auto grid gap-12 px-4 py-12 md:px-6 lg:grid-cols-[240px_minmax(0,760px)] lg:justify-center lg:py-16">
          <aside className="hidden lg:block">
            <nav aria-label="Daftar isi ketentuan" className="sticky top-24">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Daftar isi
              </p>
              <ol className="space-y-1 border-l border-border">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block border-l border-transparent py-1.5 pl-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article>
            <div className="mb-10 border-l-2 border-primary bg-muted/40 px-5 py-4 text-sm leading-6 text-muted-foreground">
              Dengan membuat akun, mengakses, atau menggunakan Layanan Siarpi, Anda menyatakan telah
              membaca, memahami, dan menyetujui Ketentuan Layanan ini. Jika Anda mewakili
              perusahaan, Anda menyatakan memiliki kewenangan untuk mengikat perusahaan tersebut.
            </div>

            <LegalSection {...sections[0]}>
              <p>
                Ketentuan ini merupakan perjanjian antara pengguna atau badan usaha yang Anda wakili
                ("Pelanggan") dan PT. Siarpi Solusi Sinergi ("Siarpi"). Jika Anda tidak menyetujui
                ketentuan ini, jangan mengakses atau menggunakan Layanan.
              </p>
              <p>
                Dokumen pemesanan, proposal, kontrak berlangganan, atau perjanjian tertulis lain
                yang disepakati kedua pihak dapat memuat ketentuan tambahan. Jika terjadi
                pertentangan, dokumen yang secara khusus ditandatangani kedua pihak berlaku untuk
                hal yang dipertentangkan tersebut.
              </p>
            </LegalSection>

            <LegalSection {...sections[1]}>
              <p>
                Siarpi menyediakan Business Operating System berbasis modul, termasuk namun tidak
                terbatas pada fungsi keuangan, sumber daya manusia, payroll, inventory, procurement,
                production, CRM, invoice, absensi, dan portal karyawan.
              </p>
              <p>
                Fitur yang tersedia bergantung pada paket, modul, entitlement, kapasitas pengguna,
                dan periode langganan Pelanggan. Siarpi dapat memperbaiki, memperbarui, atau
                mengubah fungsi Layanan selama tidak menghilangkan fungsi utama yang telah dibayar
                secara material tanpa pemberitahuan yang wajar.
              </p>
            </LegalSection>

            <LegalSection {...sections[2]}>
              <p>
                Pelanggan wajib memberikan informasi pendaftaran yang benar, lengkap, dan terkini.
                Pelanggan bertanggung jawab atas pengelolaan administrator, pengguna, peran,
                persetujuan, serta seluruh aktivitas yang dilakukan melalui akunnya.
              </p>
              <ul className="list-disc space-y-2 pl-5 marker:text-primary">
                <li>
                  Jaga kerahasiaan kata sandi, token, kode akses, dan perangkat yang digunakan.
                </li>
                <li>Jangan membagikan satu akun pribadi kepada lebih dari satu orang.</li>
                <li>Segera laporkan akses tidak sah atau dugaan insiden keamanan kepada Siarpi.</li>
                <li>Pastikan pengguna yang diundang memang berwenang mengakses data perusahaan.</li>
              </ul>
            </LegalSection>

            <LegalSection {...sections[3]}>
              <p>
                Siarpi dapat menyediakan uji coba gratis selama 14 hari atau periode lain yang
                ditampilkan saat pendaftaran. Uji coba diberikan untuk evaluasi internal dan dapat
                dibatasi berdasarkan modul, kapasitas, penyimpanan, atau fungsi tertentu.
              </p>
              <p>
                Uji coba berakhir otomatis pada akhir periode. Pelanggan tidak akan ditagih hanya
                karena masa uji coba berakhir, kecuali Pelanggan secara aktif memilih paket,
                memberikan instruksi pembayaran, atau menyetujui dokumen pemesanan. Setelah uji coba
                berakhir, akses dapat dibatasi sampai langganan diaktifkan.
              </p>
            </LegalSection>

            <LegalSection {...sections[4]}>
              <p>
                Harga, periode tagihan, batas pengguna, modul, pajak, dan ketentuan pembayaran
                mengikuti halaman checkout, invoice, proposal, atau dokumen pemesanan yang berlaku.
                Pelanggan wajib membayar tagihan secara penuh sebelum atau pada tanggal jatuh tempo.
              </p>
              <ul className="list-disc space-y-2 pl-5 marker:text-primary">
                <li>Harga dapat belum termasuk PPN atau pajak lain yang diwajibkan peraturan.</li>
                <li>
                  Perpanjangan otomatis hanya berlaku jika dinyatakan dan disetujui saat pemesanan.
                </li>
                <li>
                  Pembayaran yang telah diproses tidak dapat dikembalikan, kecuali diwajibkan hukum
                  atau disepakati tertulis.
                </li>
                <li>
                  Keterlambatan pembayaran dapat menyebabkan pembatasan atau penangguhan akses
                  setelah pemberitahuan yang wajar.
                </li>
              </ul>
            </LegalSection>

            <LegalSection {...sections[5]}>
              <p>
                Pelanggan hanya boleh menggunakan Layanan untuk kegiatan bisnis yang sah dan sesuai
                dokumentasi. Pelanggan dilarang menggunakan Layanan untuk:
              </p>
              <ul className="list-disc space-y-2 pl-5 marker:text-primary">
                <li>Melanggar hukum, hak privasi, atau hak kekayaan intelektual pihak lain.</li>
                <li>
                  Mengunggah malware, kode berbahaya, atau materi yang menipu dan melanggar hukum.
                </li>
                <li>
                  Menguji kerentanan, menembus keamanan, atau mengganggu kinerja sistem tanpa izin.
                </li>
                <li>
                  Menyalin, menjual kembali, melakukan reverse engineering, atau membuat layanan
                  turunan kecuali diizinkan tertulis atau oleh hukum.
                </li>
                <li>Menggunakan otomatisasi yang membebani infrastruktur secara tidak wajar.</li>
              </ul>
            </LegalSection>

            <LegalSection {...sections[6]}>
              <p>
                Pelanggan tetap memiliki hak atas data, dokumen, dan konten yang dimasukkan ke
                Layanan ("Data Pelanggan"). Pelanggan memberikan kepada Siarpi hak terbatas untuk
                menyimpan, memproses, mentransmisikan, membuat cadangan, dan menampilkan Data
                Pelanggan hanya sejauh diperlukan untuk menyediakan, mengamankan, mendukung, dan
                meningkatkan Layanan.
              </p>
              <p>
                Pelanggan bertanggung jawab atas dasar hukum pengumpulan data, akurasi data,
                pemberitahuan kepada subjek data, serta kewenangan untuk memproses data melalui
                Siarpi. Pengolahan data pribadi mengikuti Kebijakan Privasi Siarpi dan peraturan
                perlindungan data yang berlaku.
              </p>
            </LegalSection>

            <LegalSection {...sections[7]}>
              <p>
                Siarpi menerapkan langkah teknis dan organisasi yang wajar untuk menjaga Layanan.
                Pelanggan memahami bahwa tidak ada sistem elektronik yang sepenuhnya bebas risiko.
                Pelanggan tetap wajib menerapkan kontrol akses internal dan menyimpan salinan data
                penting sesuai kebutuhan bisnisnya.
              </p>
              <p>
                Pemeliharaan terjadwal, keadaan darurat, kegagalan jaringan, layanan pihak ketiga,
                atau keadaan di luar kendali wajar dapat memengaruhi ketersediaan. Jika terdapat
                komitmen tingkat layanan khusus, ketentuannya akan dicantumkan dalam perjanjian
                terpisah.
              </p>
            </LegalSection>

            <LegalSection {...sections[8]}>
              <p>
                Layanan, merek Siarpi, perangkat lunak, antarmuka, dokumentasi, desain, dan seluruh
                pengembangannya merupakan milik Siarpi atau pemberi lisensinya. Langganan memberikan
                hak terbatas, non-eksklusif, tidak dapat dialihkan, dan dapat dicabut untuk
                menggunakan Layanan selama periode aktif.
              </p>
              <p>
                Saran atau masukan yang diberikan kepada Siarpi dapat digunakan untuk meningkatkan
                produk tanpa kewajiban pembayaran, sepanjang tidak mengungkap informasi rahasia
                Pelanggan kepada pihak lain.
              </p>
            </LegalSection>

            <LegalSection {...sections[9]}>
              <p>
                Layanan dapat terhubung dengan bank, penyedia pembayaran, email, penyimpanan,
                analitik, atau layanan pihak ketiga. Penggunaan layanan tersebut tunduk pada
                ketentuan penyedianya. Siarpi tidak mengendalikan dan tidak bertanggung jawab atas
                gangguan, perubahan, atau tindakan pihak ketiga di luar kendali wajar Siarpi.
              </p>
            </LegalSection>

            <LegalSection {...sections[10]}>
              <p>
                Pelanggan dapat menghentikan langganan sesuai periode dan prosedur pada dokumen
                pemesanan. Siarpi dapat menangguhkan atau menghentikan akses jika terdapat
                pelanggaran material, tunggakan, risiko keamanan, permintaan otoritas, atau
                penggunaan yang merugikan sistem maupun pihak lain.
              </p>
              <p>
                Sebelum penghentian, Siarpi akan memberikan pemberitahuan dan kesempatan yang wajar
                untuk memperbaiki pelanggaran apabila keadaan memungkinkan. Hak akses dan periode
                pengambilan data setelah penghentian mengikuti paket, kebijakan retensi, dan
                perjanjian yang berlaku.
              </p>
            </LegalSection>

            <LegalSection {...sections[11]}>
              <p>
                Sejauh diizinkan hukum, Layanan disediakan sebagaimana tersedia. Siarpi tidak
                menjamin bahwa Layanan selalu bebas gangguan atau seluruh kesalahan dapat dicegah.
                Informasi, laporan, perhitungan, dan rekomendasi dari sistem tetap perlu ditinjau
                oleh personel yang berwenang sebelum digunakan untuk keputusan bisnis, pajak,
                ketenagakerjaan, hukum, atau keuangan.
              </p>
            </LegalSection>

            <LegalSection {...sections[12]}>
              <p>
                Sejauh diizinkan hukum, Siarpi tidak bertanggung jawab atas kerugian tidak langsung,
                kehilangan keuntungan, kehilangan peluang, atau kerusakan konsekuensial. Jumlah
                tanggung jawab agregat Siarpi yang timbul dari Layanan tidak akan melebihi jumlah
                yang dibayarkan Pelanggan kepada Siarpi untuk Layanan terkait dalam enam bulan
                sebelum peristiwa yang menimbulkan klaim.
              </p>
              <p>
                Batas ini tidak berlaku terhadap tanggung jawab yang tidak dapat dibatasi menurut
                hukum, termasuk akibat kesengajaan atau kelalaian berat apabila ditentukan demikian
                oleh putusan yang berkekuatan hukum tetap.
              </p>
            </LegalSection>

            <LegalSection {...sections[13]}>
              <p>
                Siarpi dapat memperbarui Ketentuan ini untuk mencerminkan perubahan produk, bisnis,
                keamanan, atau hukum. Perubahan material akan diberitahukan melalui aplikasi, email,
                atau situs sebelum berlaku. Penggunaan Layanan setelah tanggal berlaku dianggap
                sebagai penerimaan terhadap versi terbaru.
              </p>
            </LegalSection>

            <LegalSection {...sections[14]}>
              <p>
                Ketentuan ini diatur oleh hukum Republik Indonesia. Para pihak akan terlebih dahulu
                menyelesaikan perselisihan melalui musyawarah dengan iktikad baik selama 30 hari
                sejak pemberitahuan tertulis. Jika tidak tercapai penyelesaian, sengketa
                diselesaikan melalui pengadilan yang berwenang di wilayah domisili PT. Siarpi Solusi
                Sinergi, kecuali disepakati lain secara tertulis.
              </p>
            </LegalSection>

            <LegalSection {...sections[15]}>
              <p>Untuk pertanyaan, permintaan, atau pemberitahuan terkait Ketentuan Layanan:</p>
              <div className="mt-5 grid gap-4 border-y border-border py-5 sm:grid-cols-2">
                <div className="flex gap-3">
                  <Mail className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a
                      className="hover:text-foreground hover:underline"
                      href="mailto:contacts@siarpi.com"
                    >
                      contacts@siarpi.com
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Scale className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Penyedia layanan</p>
                    <p>PT. Siarpi Solusi Sinergi</p>
                    <p>Jakarta, Indonesia</p>
                  </div>
                </div>
              </div>
            </LegalSection>

            <div className="mt-8 flex items-start gap-3 border-t border-border pt-8 text-sm leading-6 text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p>
                Simpan salinan Ketentuan ini untuk referensi. Versi yang berlaku selalu tersedia di
                halaman ini.
              </p>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
