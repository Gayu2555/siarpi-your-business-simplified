import { createFileRoute, redirect } from "@tanstack/react-router";
import { isAuthenticated, getStoredUser, getDisplayName } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login", search: { redirect: "/dashboard" } });
    }
    const user = getStoredUser();
    if (!user || !user.company_id) {
      throw redirect({ to: "/onboarding" });
    }
  },
  head: () => ({
    meta: [
      { title: "Dashboard — Siarpi" },
      { name: "description", content: "Dashboard manajemen bisnis Siarpi." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const user = getStoredUser();
  const name = getDisplayName(user);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Selamat datang{name ? `, ${name}` : ""}! 👋
          </h1>
          <p className="mt-3 text-muted-foreground">
            Dashboard Siarpi sedang dalam pengembangan.
          </p>
        </div>
      </main>
    </div>
  );
}
