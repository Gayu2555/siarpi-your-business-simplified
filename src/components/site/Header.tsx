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
  { to: "/modular", label: "Beli Ketengan" },
  { to: "/komparasi", label: "Komparasi" },
  { to: "/roadmap", label: "Roadmap" },
] as const;

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
          </nav>
        </div>
      )}
    </header>
  );
}
