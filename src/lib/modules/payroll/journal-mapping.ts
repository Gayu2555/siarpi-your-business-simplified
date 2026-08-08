import type { PayrollSubModuleDetail } from "./types";

export const journalMapping: PayrollSubModuleDetail = {
  id: "journal-mapping",
  name: "Mapping Akun Jurnal",
  category: "Integration",
  tagline: "Integrasi pemetaan akun COA penggajian ke modul Finance.",
  longDescription:
    "Sub-modul Mapping Akun Jurnal menghubungkan seluruh transaksi payroll ke modul Finance. Setiap komponen gaji — gaji pokok, tunjangan, pajak, BPJS, hingga potongan lainnya — dipetakan ke akun COA yang sesuai untuk pencatatan otomatis di Buku Besar.",
  iconName: "FileText",
  keyBenefits: [
    "Otomatis memetakan komponen payroll ke COA Finance",
    "Jurnal akuntansi otomatis terbuat setiap pay run",
    "Audit trail & reconciliation antar modul",
  ],
  features: [
    {
      title: "Mapping Komponen ke COA",
      desc: "Tentukan akun yang dipakai untuk tiap komponen gaji.",
    },
    {
      title: "Auto Generate Journal",
      desc: "Setiap pay run otomatis membuat jurnal GL di Finance.",
    },
    {
      title: "Reversal Support",
      desc: "Jika payroll di-reverse, jurnal juga akan ter-reverse otomatis.",
    },
    { title: "Audit Trail Lengkap", desc: "Lacak pencatatan jurnal dari tiap transaksi payroll." },
  ],
  workflowSteps: [
    { step: "01", title: "Mapping Akun Payroll", desc: "Pilih akun COA untuk tiap komponen gaji." },
    { step: "02", title: "Validasi Akun", desc: "Pastikan akun yang dipilih valid & seimbang." },
    {
      step: "03",
      title: "Pay Run Execution",
      desc: "Payroll berjalan & otomatis membuat journal entri.",
    },
    {
      step: "04",
      title: "Reconciliation",
      desc: "Pastikan total jurnal balance & sinkron ke Finance.",
    },
  ],
  frontendPath: "app/pages/payroll/config/journal/*",
  backendPath: "siarpi-backend/payroll/journal/*",
  sampleStats: [
    { label: "Akun COA Terhubung", value: "32 Akun", note: "Payroll Mapping" },
    { label: "Jurnal Otomatis Bulan Ini", value: "152 Entri", note: "Q2 2026" },
    { label: "Status Reconciliation", value: "99.7%", note: "Balanced" },
  ],
  sampleRows: [
    {
      code: "GL-PAY-01",
      title: "Gaji Pokok",
      category: "Expense",
      amount: "COA 6101",
      status: "Mapped",
    },
    {
      code: "GL-PAY-02",
      title: "Tunjangan",
      category: "Expense",
      amount: "COA 6102",
      status: "Mapped",
    },
    {
      code: "GL-PAY-03",
      title: "PPh21",
      category: "Liability",
      amount: "COA 2101",
      status: "Mapped",
    },
    {
      code: "GL-PAY-04",
      title: "BPJS Kesehatan",
      category: "Liability",
      amount: "COA 2102",
      status: "Mapped",
    },
  ],
  faq: [
    {
      q: "Apakah jurnal payroll langsung terlihat di Finance?",
      a: "Ya, setelah pay run selesai, jurnal entri otomatis muncul di Buku Besar Finance.",
    },
    {
      q: "Bisa ganti akun COA kapan saja?",
      a: "Ya, akun COA dapat diupdate kapan saja sebelum pay run berikutnya.",
    },
  ],
};
