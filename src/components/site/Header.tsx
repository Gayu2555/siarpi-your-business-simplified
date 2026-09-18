import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, LayoutDashboard, LogOut, ChevronDown } from "lucide-react";
import pageLogo from "@/assets/Page 1.png";
import {
  clearAuthToken,
  getDisplayName,
  getInitials,
  getStoredUser,
  isAuthenticated,
  type SiarpiUser,
} from "@/lib/auth";

const navLinks = [
  { to: "/", label: "Beranda" },
  { to: "/studi-kasus", label: "Studi Kasus" },
  { to: "/blog", label: "Blog" },
  { to: "/modular", label: "Pricing" },
  { to: "/komparasi", label: "Komparasi" },
  { to: "/roadmap", label: "Roadmap" },
] as const;

const SIARPI_WHATSAPP_URL =
  "https://wa.me/6281387895911?text=Halo%20Tim%20Siarpi%2C%20saya%20ingin%20berkonsultasi%20mengenai%20solusi%20Siarpi%20ERP%20untuk%20bisnis%20saya.%20Terima%20kasih!";

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.181 8.181 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.09-.39-.12-.56.12-.17.25-.64.81-.78.98-.15.17-.29.19-.54.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.18-.48-.3z" />
    </svg>
  );
}

function UserAvatar({ user, size = "sm" }: { user: SiarpiUser | null; size?: "sm" | "md" }) {
  const className = `${size === "md" ? "h-9 w-9" : "h-7 w-7"} shrink-0 rounded-full`;
  if (user?.avatar_url) {
    return <img src={user.avatar_url} alt="" className={`${className} object-cover`} />;
  }

  return (
    <span
      aria-hidden="true"
      className={`${className} flex items-center justify-center bg-gradient-primary text-xs font-semibold text-primary-foreground`}
    >
      {getInitials(user)}
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<SiarpiUser | null>(null);
  const navigate = useNavigate();

  // Cek auth setelah mount — hindari hydration mismatch (localStorage gak ada di server)
  useEffect(() => {
    setMounted(true);
    setLoggedIn(isAuthenticated());
    setUser(getStoredUser());
  }, []);

  function handleLogout() {
    clearAuthToken();
    setLoggedIn(false);
    setUser(null);
    setOpen(false);
    navigate({ to: "/" });
  }

  const showAccount = mounted && loggedIn;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="relative w-28 md:w-44 shrink-0">
          <Link to="/" className="absolute left-0 top-1/2 -translate-y-[36%]">
            <img src={pageLogo} alt="Siarpi Logo" className="w-28 object-contain md:w-44" />
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: true }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right side */}
        <div className="hidden items-center justify-end gap-3 min-w-[190px] md:flex">
          {/* WhatsApp Kami button */}
          <div className="h-5 w-px bg-border/80" />
          <a
            href={SIARPI_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-soft transition-all duration-200 hover:shadow-glow hover:brightness-105 active:scale-[0.98]"
            title="Hubungi kami via WhatsApp (+62 813-8789-5911)"
          >
            <WhatsAppIcon className="h-4 w-4 shrink-0 fill-current" />
            <span>WhatsApp kami</span>
          </a>
          {showAccount ? (
            <details className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3 transition-colors hover:bg-muted [&::-webkit-details-marker]:hidden">
                <UserAvatar user={user} />
                <span className="max-w-[120px] truncate text-sm font-medium">
                  {getDisplayName(user)}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-64 rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-lg">
                <div className="px-2 py-1.5 font-normal">
                  <div className="flex items-center gap-3 py-1">
                    <UserAvatar user={user} size="md" />
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-sm font-semibold text-foreground">
                        {getDisplayName(user)}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
                    </div>
                  </div>
                </div>
                <div className="my-1 h-px bg-border" />
                <Link
                  to="/dashboard"
                  className="flex items-center rounded-lg px-2 py-1.5 text-sm outline-none hover:bg-muted"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
                <div className="my-1 h-px bg-border" />
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center rounded-lg px-2 py-1.5 text-left text-sm text-destructive outline-none hover:bg-destructive/10"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Keluar
                </button>
              </div>
            </details>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Masuk</Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-glow"
              >
                <Link to="/register">Mulai Gratis</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}

            {showAccount ? (
              <div className="mt-2 border-t border-border pt-3">
                <div className="flex items-center gap-3 px-3 py-2">
                  <UserAvatar user={user} size="md" />
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-semibold">{getDisplayName(user)}</span>
                    <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
                >
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
                {/* Lihat catatan di menu desktop -- entri Pengaturan dihapus. */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4" /> Keluar
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
                >
                  Masuk
                </Link>
                <Button asChild className="mt-2 bg-gradient-primary text-primary-foreground">
                  <Link to="/register" onClick={() => setOpen(false)}>
                    Mulai Gratis
                  </Link>
                </Button>
              </>
            )}

            <div className="mt-2 border-t border-border pt-3">
              <a
                href={SIARPI_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:shadow-glow hover:brightness-105"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0 fill-current" />
                <span>WhatsApp kami</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
