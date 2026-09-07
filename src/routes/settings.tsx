import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { isAuthenticated, getStoredUser } from "@/lib/auth";
import { Header } from "@/components/site/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, SlidersHorizontal } from "lucide-react";

// Halaman ini SENGAJA tidak lagi ditautkan dari menu header: pengaturan akun
// yang sebenarnya ada di aplikasi utama, dan halaman ini dulu cuma bertuliskan
// "sedang dalam pengembangan" -- jalan buntu untuk setiap user yang membukanya.
//
// Route-nya dipertahankan supaya tautan/bookmark lama tidak jadi 404, tapi
// isinya sekarang mengarahkan ke tempat yang benar.
export const Route = createFileRoute("/settings")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login", search: { redirect: "/settings" } });
    }
    const user = getStoredUser();
    if (!user || !user.company_id) {
      throw redirect({ to: "/onboarding" });
    }
  },
  head: () => ({
    meta: [
      { title: "Pengaturan — Siarpi" },
      { name: "description", content: "Pengaturan akun dan preferensi Siarpi." },
      // Halaman utilitas, bukan konten yang perlu diindeks.
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-subtle">
      <Header />

      <main className="container mx-auto flex flex-1 items-center justify-center px-4 py-16 md:px-6">
        <Card className="w-full max-w-lg rounded-3xl border-border p-8 text-center shadow-card md:p-10">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <SlidersHorizontal className="h-6 w-6" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Pengaturan
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Pengaturan akun, profil, keamanan, dan preferensi perusahaan dikelola langsung di
            aplikasi utama Siarpi. Buka dashboard, lalu masuk ke aplikasi utama dari sana.
          </p>
          <Button
            asChild
            className="mt-8 w-full bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-glow"
          >
            <Link to="/dashboard" className="flex items-center justify-center gap-2">
              Ke Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Card>
      </main>
    </div>
  );
}
