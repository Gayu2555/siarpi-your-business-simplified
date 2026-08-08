import type { PayrollSubModuleDetail } from "./types";

export const configuration: PayrollSubModuleDetail = {
  id: "configuration",
  name: "Kustomisasi Template Slip Gaji",
  category: "Pengaturan & Layout",
  tagline: "Atur tata letak slip gaji, logo perusahaan, catatan direksi, dan rincian komponen tunjangan.",
  longDescription:
    "Sub-modul Kustomisasi Slip Gaji memberikan kebebasan bagi divisi HR & Finance untuk merancang tampilan slip gaji digital perusahaan, menambahkan watermark, menyembunyikan komponen tertentu, serta menyisipkan pesan motivasi bulanan.",
  iconName: "Receipt",
  keyBenefits: [
    "Desain slip gaji profesional yang mencerminkan identitas (branding) perusahaan",
    "Pengaturan visibilitas komponen (tampilkan/sembunyikan tunjangan khusus)",
    "Keamanan dokumen PDF dengan password terenkripsi tanggal lahir / NIK karyawan",
  ],
  features: [
    {
      title: "Visual Template Builder",
      desc: "Pilih dari berbagai layout slip gaji modern yang sesuai kebutuhan perusahaan.",
    },
    {
      title: "Proteksi PDF Berpassword",
      desc: "Amankan slip gaji PDF yang dikirimkan via email dengan enkripsi kata sandi.",
    },
    {
      title: "Dynamic Footer Note",
      desc: "Tambahkan pengumuman resmi perusahaan atau pesan kebersamaan di bagian bawah slip.",
    },
  ],
  workflowSteps: [
    { step: "01", title: "Pilih Desain", desc: "Tentukan layout & skema warna slip gaji." },
    { step: "02", title: "Upload Logo & TTD", desc: "Sematkan logo resmi & tanda tangan digital." },
    { step: "03", title: "Atur Proteksi", desc: "Aktifkan enkripsi password PDF karyawan." },
  ],
  frontendPath: "app/pages/payroll/configuration.vue",
  backendPath: "siarpi-backend/payroll/configuration/*",
  sampleStats: [
    { label: "Template Aktif", value: "Standard Corporate", note: "Digunakan 100% karyawan" },
    { label: "Keamanan PDF", value: "Enkripsi NIK Active", note: "Password-protected" },
  ],
  sampleRows: [
    {
      code: "TPL-01",
      title: "Corporate Classic Layout",
      category: "Formal",
      amount: "Default",
      status: "Aktif",
    },
  ],
  faq: [
    {
      q: "Apakah slip gaji bisa dikirimkan secara otomatis via WhatsApp / Email?",
      a: "Ya, setelah Pay Run disetujui, slip gaji akan terdistribusi sesuai metode pilihan Anda.",
    },
  ],
};
