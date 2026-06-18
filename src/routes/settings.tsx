import { createFileRoute, redirect } from "@tanstack/react-router";
import { isAuthenticated, getStoredUser } from "@/lib/auth";

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
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Pengaturan
          </h1>
          <p className="mt-3 text-muted-foreground">
            Halaman pengaturan sedang dalam pengembangan.
          </p>
        </div>
      </main>
    </div>
  );
}
