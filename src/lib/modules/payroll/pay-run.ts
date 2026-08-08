import type { PayrollSubModuleDetail } from "./types";

export const payRun: PayrollSubModuleDetail = {
  id: "pay-run",
  name: "Proses Hitung Gaji (Pay Run)",
  category: "Core Payroll",
  tagline:
    "Eksekusi pengolahan gaji massal (Gaji pokok + Tunjangan + Lembur - BPJS - PPh21 - Potongan/Kasbon).",
  longDescription:
    "Sub-modul Pay Run adalah inti dari seluruh proses penggajian. Eksekusi perhitungan gaji massal untuk seluruh karyawan sekaligus. Sistem otomatis menghitung gaji pokok, tunjangan tetap & variabel, jam lembur yang disetujui, hingga potongan BPJS, PPh21, dan kasbon.",
  iconName: "Calculator",
  keyBenefits: [
    "Hitung gaji massal dalam satu klik",
    "Komputasi otomatis PPh21, BPJS, dan potongan",
    "Rollback & re-simulate sebelum finalisasi",
  ],
  features: [
    {
      title: "Batch Processing Massal",
      desc: "Hitung gaji ribuan karyawan dalam hitungan hitungan menit.",
    },
    {
      title: "Pre-Calculation Simulation",
      desc: "Simulasi payroll sebelum finalisasi untuk cek akurasi.",
    },
    {
      title: "Rollback & Reprocess",
      desc: "Jika ada kesalahan, payroll bisa di-rollback & dihitung ulang.",
    },
    {
      title: "Audit Trail Payroll",
      desc: "Lacak siapa yang memproses & kapan payroll tersebut dibuat.",
    },
  ],
  workflowSteps: [
    {
      step: "01",
      title: "Tentukan Periode Gaji",
      desc: "Pilih bulan / periode payroll yang akan dijalankan.",
    },
    {
      step: "02",
      title: "Sync Attendance & Overtime",
      desc: "Ambil data kehadiran & jam lembur yang disetujui.",
    },
    {
      step: "03",
      title: "Hitung & Simulasi",
      desc: "Sistem menghitung semua komponen gaji secara otomatis.",
    },
    {
      step: "04",
      title: "Finalisasi Payroll",
      desc: "Setelah diverifikasi, payroll dikunci & siap dibayarkan.",
    },
  ],
  frontendPath: "app/pages/payroll/pay-run/*",
  backendPath: "siarpi-backend/payroll/payrun/*",
  sampleStats: [
    { label: "Karyawan di Proses", value: "152 Orang", note: "Q2 2026" },
    { label: "Total Gaji Bruto", value: "Rp 2.150.000.000", note: "Final" },
    { label: "Total Potongan", value: "Rp 414.000.000", note: "PPh21+BPJS+Kasbon" },
    { label: "Total Gaji Bersih", value: "Rp 1.736.000.000", note: "Netto" },
  ],
  sampleRows: [
    {
      code: "RUN-Q2-001",
      title: "Ani Wulandari (Staff HR)",
      category: "Gaji Pokok",
      amount: "Rp 8.500.000",
      status: "Final",
    },
    {
      code: "RUN-Q2-002",
      title: "Budi Santoso (Sr. Engineer)",
      category: "Tunjangan",
      amount: "Rp 2.000.000",
      status: "Final",
    },
    {
      code: "RUN-Q2-003",
      title: "Citra Lestari (Manager)",
      category: "Lembur",
      amount: "Rp 1.200.000",
      status: "Final",
    },
    {
      code: "RUN-Q2-004",
      title: "Rizky Pratama (Finance)",
      category: "Potongan Pajak",
      amount: "-Rp 450.000",
      status: "Final",
    },
  ],
  faq: [
    {
      q: "Berapa lama proses hitung gaji massal?",
      a: "Untuk 150 karyawan, proses biasanya selesai dalam 2-3 menit termasuk simulasi.",
    },
    {
      q: "Apakah bisa membatalkan payroll yang sudah diproses?",
      a: "Ya, fitur 'Reverse Payroll' memungkinkan pembatalan & reprocess tanpa kehilangan audit trail.",
    },
  ],
};
