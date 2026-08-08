import type { PayrollSubModuleDetail } from "./types";

export const taxBpjsConfig: PayrollSubModuleDetail = {
  id: "pengaturan",
  name: "Pengaturan Pajak & BPJS",
  category: "Configuration",
  tagline: "Setting persentase BPJS Kesehatan, BPJS Ketenagakerjaan, dan skema PPh21.",
  longDescription:
    "Sub-modul Konfigurasi Pajak & BPJS adalah pusat kontrol tarif dan parameter perpajakan serta premi BPJS. Atur persentase PPh21 (PTKP, tax allowance), BPJS Kesehatan (5% pekerja + 5% pekerodoman), BPJS Ketenagakerjaan (TPU & JK), hingga aturan tambahan seperti iuran pensiun.",
  iconName: "Shield",
  keyBenefits: [
    "Konfigurasi tarif PPh21 sesuai PTKP & golongan",
    "Atur persentase iuran BPJS Kesehatan & Ketenagakerjaan",
    "Dukungan aturan pensiun & deductions khusus",
  ],
  features: [
    {
      title: "Skema PPh21 Dinamis",
      desc: "Pilih antara tarif progresif & flat sesuai kebijakan perpajakan.",
    },
    {
      title: "Persentase BPJS Real-time",
      desc: "Update otomatis tarif iuran BPJS dari konfigurasi terbaru.",
    },
    { title: "Master PTKP", desc: "Kelola penambahian keluarga, anak, & tanggungan lainnya." },
    { title: "Iuran Pensiun Tambahan", desc: "Atur kalkontribusi untuk program pensiun karyawan." },
  ],
  workflowSteps: [
    {
      step: "01",
      title: "Atur Skema PPh21",
      desc: "Pilih metode tarif & konfigurasi PTKP masing-masing.",
    },
    {
      step: "02",
      title: "Set Persentase BPJS",
      desc: "Isi prosentase iuran kesehatan & ketenagakerjaan.",
    },
    {
      step: "03",
      title: "Mapping ke Akun COA",
      desc: "Pemetaan otomatis ke akun biaya & liabilitas di Finance.",
    },
    {
      step: "04",
      title: "Test Run Simulation",
      desc: "Uji validitas konfigurasi dengan simulasi payroll.",
    },
  ],
  frontendPath: "app/pages/payroll/config/tax/*",
  backendPath: "siarpi-backend/payroll/config/tax/*",
  sampleStats: [
    { label: "PPh21 Terkonfigurasi", value: "Tarif Progresif 5-30%", note: "PTKP Terbaru" },
    { label: "BPJS Kesehatan", value: "5% + 5%", note: "Pekerja + Pekerodong" },
    { label: "BPJS Ketenagakerjaan", value: "JT 1.2% + 1.2%", note: "TPU + Jaminan Pensiun" },
    { label: "Total Deduction Standard", value: "12 Ruleset", note: "Aktif" },
  ],
  sampleRows: [
    {
      code: "TAX-PPH21",
      title: "Tarif PPh21 Progresif",
      category: "Income Tax",
      amount: "5%-30%",
      status: "Active",
    },
    {
      code: "TAX-BPJS-KES",
      title: "BPJS Kesehatan",
      category: "Health Insurance",
      amount: "5% + 5%",
      status: "Active",
    },
    {
      code: "TAX-BPJS-TK",
      title: "BPJS Ketenagakerjaan",
      category: "Employment Insurance",
      amount: "1.2% + 1.2%",
      status: "Active",
    },
  ],
  faq: [
    {
      q: "Apakah konfigurasi ini bisa diexport?",
      a: "Ya, semua konfigurasi pajak & BPJS dapat diekspor ke format backup JSON.",
    },
    {
      q: "Apakah otomatis update tarif BPJS regulasi terbaru?",
      a: "Ya, kami mendukung notifikasi update otomatis dari DJP & BPJS.",
    },
  ],
};
