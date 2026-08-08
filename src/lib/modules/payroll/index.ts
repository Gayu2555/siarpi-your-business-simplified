export type { PayrollSubModuleDetail, PayrollFeature } from "./types";

export { payRun } from "./pay-run";
export { payslips } from "./payslips";
export { kasbon } from "./kasbon";
export { taxBpjsConfig } from "./pengaturan";
export { journalMapping } from "./journal-mapping";

export { payrollSubModules, getPayrollSubModule, getPayrollSubModuleByName } from "./registry";

export const payroll = {
  id: "payroll",
  name: "Payroll & Penggajian",
  tagline: "Hitung gaji otomatis, PPh21, BPJS, kasbon, & slip gaji digital.",
  longDescription:
    "Proses penggajian massal otomatis tanpa selisih. Perhitungan akurat PPh21, BPJS Kesehatan & Ketenagakerjaan, pinjaman kasbon, dan pemotongan otomatis.",
  iconName: "Banknote",
  keyBenefits: [
    "Kalkulasi gaji massal (Pay Run) 100% otomatis & presisi",
    "Potongan PPh21, BPJS, & Kasbon terhitung akurat",
    "Jurnal penggajian terintegrasi ke modul Finance",
  ],
  features: [
    {
      title: "Pay Run Massal Otomatis",
      desc: "Eksekusi hitung gaji seluruh karyawan dalam satu klik tanpa rumus excel rumit.",
    },
    {
      title: "Hitung PPh21 & BPJS Presisi",
      desc: "Perhitungan skema pajak PPh21 progresif dan iuran BPJS terupdate.",
    },
    {
      title: "Pinjaman & Kasbon Karyawan",
      desc: "Pengajuan pinjaman dengan skema cicilan & pemotongan gaji otomatis.",
    },
    {
      title: "Slip Gaji Digital (PDF/Email)",
      desc: "Cetak slip gaji siap pakai atau kirimkan via portal karyawan.",
    },
  ],
  mockup: {
    title: "Dashboard Payroll & Penggajian",
    subtitle: "Ringkasan total beban gaji, statistik PPh21, BPJS, & slip gaji",
    image: "/dashboard-preview.jpg",
  },
  testimonials: [
    {
      name: "Dewi Lestari",
      role: "Finance Manager",
      company: "PT Global Manufacturing",
      rating: 5,
      quote:
        "Sistem payroll Siarpi mengurangi waktu kami dari 5 hari jadi 2 jam. Benar-benar revolusioner!",
    },
  ],
  faq: [
    {
      q: "Apakah PPh21 terhitung otomatis?",
      a: "Ya! Sistem otomatis menghitung tarif PPh21 progresif dan PTKP masing-masing karyawan.",
    },
    {
      q: "Apakah ada jurnal otomatis ke modul Finance?",
      a: "Ya, setiap kali Pay Run disetujui, jurnal beban gaji & kewajiban pajak terposting otomatis.",
    },
  ],
};
