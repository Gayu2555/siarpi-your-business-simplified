import type { HrSubModuleDetail } from "./types";

export const lembur: HrSubModuleDetail = {
  id: "lembur",
  name: "Pengajuan Lembur",
  category: "Time & Attendance",
  tagline: "Pengajuan jam lembur dan alur persetujuan (approval) dari atasan.",
  longDescription:
    "Sub-modul Lembur memungkinkan karyawan untuk mengajukan jam kerja tambahan secara sistematis. Setiap permohonan lembur akan melewati alur persetujuan dari supervisor langsung hingga HR Manager. Setelah disetujui, sistem otomatis menghitung premi lembur sesuai aturan (tarif normal, weekend, hari libur).",
  iconName: "Banknote",
  keyBenefits: [
    "Alur persetujuan lembur berjenjang otomatis",
    "Kalkulasi premi lembur sesuai regulasi Ketenagakerjaan",
    "Integrasi langsung ke slip gaji payroll",
  ],
  features: [
    {
      title: "Form Pengajuan Lembur",
      desc: "Pilih tanggal, alasan, durasi, dan proyeks atau departemen.",
    },
    {
      title: "Approval dari Atasan",
      desc: "Supervisor langsung menerima notifikasi dan dapat approve/deny.",
    },
    {
      title: "Otomatis ke Payroll",
      desc: "Jam lembur yang disetujui langsung masuk ke perhitungan gaji.",
    },
    {
      title: "Aturan Tarif Fleksibel",
      desc: "Atur tarif lembur per level senioritas, departemen, atau hari kerja.",
    },
  ],
  workflowSteps: [
    {
      step: "01",
      title: "Ajukan Jam Lembur",
      desc: "Karyawan mengajukan lembur dengan tanggal & durasi.",
    },
    {
      step: "02",
      title: "Validasi Otomatis",
      desc: "Sistem cek batas jam lembur & konflik jadwal.",
    },
    {
      step: "03",
      title: "Approval Supervisor",
      desc: "Atasan langsung meninjau dan memberikan persetujuan.",
    },
    {
      step: "04",
      title: "Proses ke Payroll",
      desc: "Jam lembur otomatis masuk ke slip gaji karyawan.",
    },
  ],
  frontendPath: "app/pages/hr/lembur/*",
  backendPath: "siarpi-backend/hr/overtime/*",
  sampleStats: [
    { label: "Total Jam Lembur Bulan Ini", value: "2,450 Jam", note: "132 Pengajuan" },
    { label: "Rata-Rata Premi Lembur", value: "Rp 75.000", note: "per jam" },
    { label: "Disetujui", value: "89%", note: "dari total pengajuan" },
  ],
  sampleRows: [
    {
      code: "OVT-045",
      title: "Ani Wulandari - Project X",
      category: "Regular Overtime",
      amount: "3 jam @Rp 60.000",
      status: "Approved",
    },
    {
      code: "OVT-046",
      title: "Budi Santoso - Urgent Fix",
      category: "Weekend Overtime",
      amount: "2 jam @Rp 100.000",
      status: "Pending",
    },
    {
      code: "OVT-047",
      title: "Rizky Pratama - Deployment",
      category: "Holiday Overtime",
      amount: "4 jam @Rp 150.000",
      status: "Approved",
    },
  ],
  faq: [
    {
      q: "Berapa maksimal jam lembur per minggu?",
      a: "Sesuai aturan Ketenagakerjaan, maksimal 18 jam per minggu.",
    },
    {
      q: "Bagaimana jika supervisor tidak merespon?",
      a: "Sistem akan otomatis meneruskan ke level supervisor di atasnya.",
    },
  ],
};
