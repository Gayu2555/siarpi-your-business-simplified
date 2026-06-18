import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CheckCircle2, Clock, Sparkles, Circle, type LucideIcon } from "lucide-react";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Roadmap — Siarpi" },
      { name: "description", content: "Lihat apa yang sedang kami kerjakan dan rencana ke depan." },
    ],
  }),
  component: RoadmapPage,
});

type Status = "now" | "next" | "future";

const items: Record<Status, { title: string; desc: string; progress?: number }[]> = {
  now: [
    { title: "Payroll Automation", desc: "Hitung gaji & pajak otomatis sesuai regulasi PPh 21.", progress: 80 },
    { title: "Dashboard Analytics", desc: "Visualisasi KPI real-time untuk semua modul.", progress: 65 },
    { title: "Multi-cabang Support", desc: "Kelola beberapa lokasi dari satu akun.", progress: 40 },
  ],
  next: [
    { title: "Mobile App (iOS & Android)", desc: "Akses semua modul dari smartphone." },
    { title: "AI Reporting", desc: "Laporan otomatis dengan insight berbasis AI." },
    { title: "WhatsApp Integration", desc: "Notifikasi & approval langsung via WhatsApp." },
  ],
  future: [
    { title: "Integrasi Marketplace", desc: "Sync stok & order Tokopedia, Shopee, Tiktok." },
    { title: "Public API", desc: "Bangun integrasi sendiri dengan REST API." },
    { title: "AI Assistant", desc: "Asisten cerdas untuk operasional harian." },
  ],
};

// Data tab hanya berisi string (iconName), bukan komponen langsung — supaya
// aman dipakai di mana pun (termasuk kalau suatu saat lewat loader/SSR).
const tabs: { id: Status; label: string; iconName: string; color: string }[] = [
  { id: "now", label: "Now", iconName: "Clock", color: "bg-gradient-primary text-primary-foreground" },
  { id: "next", label: "Next", iconName: "Sparkles", color: "bg-accent text-accent-foreground" },
  { id: "future", label: "Future", iconName: "Circle", color: "bg-muted text-muted-foreground" },
];

// Resolve iconName (string) -> komponen Lucide. Dipanggil hanya saat render.
const TAB_ICON_MAP: Record<string, LucideIcon> = {
  Clock,
  Sparkles,
  Circle,
};

function RoadmapPage() {
  const [active, setActive] = useState<Status>("now");
  const list = items[active];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="container mx-auto flex-1 px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 rounded-full">Roadmap</Badge>
          <h1 className="font-display text-4xl font-bold md:text-5xl">
            Apa yang akan datang
          </h1>
          <p className="mt-4 text-muted-foreground">
            Transparansi penuh — lihat apa yang sedang kami kerjakan dan rencana ke depan.
          </p>
        </div>

        {/* Tabs */}
        <div className="mx-auto mt-10 flex max-w-md justify-center gap-2 rounded-full border border-border bg-muted/30 p-1.5">
          {tabs.map((t) => {
            const TabIcon = TAB_ICON_MAP[t.iconName] ?? Circle;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  active === t.id ? t.color + " shadow-soft" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <TabIcon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="mx-auto mt-12 max-w-3xl">
          <div className="relative space-y-6">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-border md:left-6" />
            {list.map((item, i) => (
              <motion.div
                key={item.title + active}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative pl-12 md:pl-16"
              >
                <div className={`absolute left-0 flex h-8 w-8 items-center justify-center rounded-full md:h-12 md:w-12 ${
                  active === "now" ? "bg-gradient-primary text-primary-foreground" :
                  active === "next" ? "bg-accent text-accent-foreground border-2 border-primary/30" :
                  "bg-muted text-muted-foreground border-2 border-border"
                }`}>
                  {active === "now" ? <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5" /> :
                   active === "next" ? <Sparkles className="h-4 w-4 md:h-5 md:w-5" /> :
                   <Circle className="h-4 w-4 md:h-5 md:w-5" />}
                </div>
                <Card className="rounded-2xl border-border p-6 transition-shadow hover:shadow-card">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <Badge variant="outline" className="rounded-full capitalize">{active}</Badge>
                  </div>
                  {item.progress !== undefined && (
                    <div className="mt-4">
                      <div className="mb-1.5 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{item.progress}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                        <motion.div
                          className="h-full bg-gradient-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}