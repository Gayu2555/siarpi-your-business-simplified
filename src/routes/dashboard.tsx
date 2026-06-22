import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { isAuthenticated, getStoredUser, getDisplayName } from "@/lib/auth";
import { guardOnboardingRoute } from "@/lib/onboarding-guard";
import { useEffect, useState } from "react";
import { fetchCompanyModules, type CompanyModulesResponse } from "@/lib/modules-api";
import { resolvePhosphorIcon } from "@/lib/icon-resolver";
import { Header } from "@/components/site/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Layers, Plus, Building2, ChevronDown, ExternalLink } from "lucide-react";
import { apiFetch } from "@/lib/api";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    await guardOnboardingRoute("/dashboard");
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

  const [modulesResponse, setModulesResponse] = useState<CompanyModulesResponse | null>(null);
  const [companyName, setCompanyName] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch company modules
    fetchCompanyModules()
      .then((res) => {
        if (!res) {
          setError("Gagal memuat data modul perusahaan.");
        } else {
          setModulesResponse(res);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Terjadi kesalahan saat memuat data.");
      })
      .finally(() => {
        setLoading(false);
      });

    // Fetch company name
    if (user?.company_id) {
      apiFetch<{ success: boolean; company?: { name: string } }>(`/companies/${user.company_id}`)
        .then(({ ok, data }) => {
          if (ok && data?.success && data.company) {
            setCompanyName(data.company.name);
          }
        })
        .catch((err) => {
          console.error("Gagal memuat detail perusahaan:", err);
        });
    }
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClose = () => setDropdownOpen(false);
    window.addEventListener("click", handleClose);
    return () => window.removeEventListener("click", handleClose);
  }, [dropdownOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-subtle">
      <Header />

      <main className="container mx-auto flex-1 px-4 py-10 md:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          {/* Welcoming Header */}
          <div className="mb-12">
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Selamat datang kembali{name ? `, ${name}` : ""}! 👋
            </h1>
            <p className="mt-2 text-muted-foreground">
              Kelola dan jalankan modul bisnis Siarpi Anda dari satu dashboard terpusat.
            </p>
          </div>

          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-6 text-center text-destructive">
              <p>{error}</p>
            </div>
          ) : (
            <div className="space-y-16">
              {/* Workspace Card & Active Modules Dropdown */}
              <Card className="relative overflow-hidden rounded-3xl border-border bg-card/60 p-8 shadow-soft backdrop-blur-md">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-indigo-500/5 blur-3xl" />
                
                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Building2 className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Workspace Perusahaan</span>
                        <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                          {companyName || "Perusahaan Aktif"}
                        </h2>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground max-w-xl">
                      Selamat datang di portal manajemen bisnis Siarpi. Gunakan menu dropdown di bawah untuk melihat modul aktif Anda, atau klik tombol masuk untuk beralih ke aplikasi utama.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-4">
                      <Button asChild size="default" className="rounded-xl bg-primary text-primary-foreground hover:shadow-glow transition-all duration-300">
                        <a 
                          href={typeof window !== 'undefined' && localStorage.getItem("siarpi_token") 
                            ? `https://app.siarpi.com/?token=${encodeURIComponent(localStorage.getItem("siarpi_token") || "")}`
                            : "https://app.siarpi.com"
                          } 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-2 font-semibold"
                        >
                          Masuk ke Dashboard Utama
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* Dropdown Modul Aktif */}
                  <div className="relative w-full md:w-auto md:min-w-[280px]" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDropdownOpen(!dropdownOpen);
                      }}
                      className="flex w-full items-center justify-between gap-3 rounded-2xl border border-border bg-background px-5 py-4 font-semibold text-foreground shadow-sm transition-all hover:border-primary/20 hover:shadow-soft active:scale-[0.98]"
                    >
                      <span className="flex items-center gap-2">
                        <Layers className="h-5 w-5 text-primary" />
                        Lihat Modul Aktif
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-bold">
                          {modulesResponse?.ownedModules.length ?? 0}
                        </Badge>
                        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
                      </div>
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 top-[105%] z-50 w-full min-w-[300px] overflow-hidden rounded-2xl border border-border bg-popover p-2 shadow-glow"
                        >
                          {modulesResponse?.ownedModules && modulesResponse.ownedModules.length > 0 ? (
                            <div className="space-y-1">
                              <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Modul Aktif Anda
                              </div>
                              {modulesResponse.ownedModules.map((m) => {
                                const { Icon, weight } = resolvePhosphorIcon(m.icon);
                                return (
                                  <div
                                    key={m.key}
                                    className="flex items-center gap-3 rounded-xl p-3 text-sm font-semibold text-foreground"
                                  >
                                    <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${m.bg_color || "bg-primary/10"} ${m.icon_color || "text-primary"}`}>
                                      <Icon weight={weight} className="h-4.5 w-4.5" />
                                    </span>
                                    <span>{m.name}</span>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="px-4 py-6 text-center text-xs text-muted-foreground">
                              Belum ada modul aktif
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </Card>

              {/* Available Modules Section */}
              {modulesResponse?.availableModules && modulesResponse.availableModules.length > 0 && (
                <div>
                  <div className="mb-6 flex items-center gap-2">
                    <Plus className="h-5 w-5 text-muted-foreground" />
                    <h2 className="font-display text-xl font-bold md:text-2xl text-muted-foreground">
                      Tambah Modul Lain
                    </h2>
                  </div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {modulesResponse.availableModules.map((m) => {
                      const { Icon, weight } = resolvePhosphorIcon(m.icon);
                      return (
                        <motion.div key={m.key} variants={itemVariants}>
                          <Card className="flex h-full flex-col overflow-hidden rounded-3xl border-border bg-card/60 p-6 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-soft opacity-80 hover:opacity-100">
                            <div className="flex items-start gap-4">
                              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${m.bg_color || "bg-primary/10"} ${m.icon_color || "text-primary"}`}>
                                <Icon weight={weight} className="h-6 w-6" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-display font-bold text-foreground text-lg">
                                  {m.name}
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                  {m.description}
                                </p>
                              </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                              <span className="text-sm font-semibold text-foreground">
                                Rp {m.price.toLocaleString("id-ID")}/bln
                              </span>
                              <Button asChild variant="outline" size="sm" className="rounded-xl border-primary/20 text-primary hover:bg-gradient-primary hover:text-primary-foreground">
                                <Link to="/modules/$moduleId" params={{ moduleId: m.key }}>
                                  Detail Modul
                                </Link>
                              </Button>
                            </div>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
