import type { ModuleDetail } from "./types";

export const project: ModuleDetail = {
  tagline: "Kelola proyek tim dengan visual yang jelas",
  longDescription:
    "Atur tugas, deadline, dan kolaborasi tim dengan board kanban, gantt chart, dan timeline interaktif.",
  keyBenefits: [
    "Visualisasi progres proyek dengan Kanban & Gantt Chart",
    "Time tracking per tugas untuk efisiensi biaya & beban kerja",
    "Kolaborasi tim seamless tanpa meeting harian berlebih",
  ],
  features: [
    { title: "Kanban Board", desc: "Drag & drop tugas antar status, visual & intuitif." },
    { title: "Gantt Chart", desc: "Timeline proyek dengan dependency antar tugas." },
    { title: "Time Tracking", desc: "Catat jam kerja per tugas untuk billing & evaluasi." },
    { title: "Kolaborasi Tim", desc: "Komentar, mention, dan attachment di setiap tugas." },
  ],
  mockup: {
    title: "Proyek Aktif",
    subtitle: "8 proyek berjalan",
    stats: [
      { label: "On Track", value: "6", tone: "primary" },
      { label: "At Risk", value: "1", tone: "accent" },
      { label: "Delay", value: "1", tone: "muted" },
    ],
    rows: [
      { label: "Redesign Website", sub: "Due 30 Apr", value: "75%" },
      { label: "Mobile App v2", sub: "Due 15 Mei", value: "42%" },
      { label: "Marketing Campaign", sub: "Due 5 Mei", value: "90%" },
    ],
  },
  testimonials: [
    {
      name: "Arif Hidayat",
      role: "Project Manager",
      company: "Studio Kreatif",
      rating: 5,
      quote: "Tim 15 orang bisa sinkron tanpa meeting harian. Hemat waktu banget.",
    },
    {
      name: "Maya Putri",
      role: "Lead Designer",
      company: "Agensi Visual",
      rating: 5,
      quote: "Komentar langsung di tugas bikin feedback loop jadi cepat.",
    },
  ],
  faq: [
    {
      q: "Bisa integrasi dengan Slack?",
      a: "Ya, notifikasi tugas otomatis ke channel Slack pilihan.",
    },
    { q: "Apakah ada mobile app?", a: "Ya, tersedia di iOS & Android untuk update on-the-go." },
  ],
};
