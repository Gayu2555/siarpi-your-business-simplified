import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Linkedin, Mail } from "lucide-react";
import pageLogo from "@/assets/Page 1.png";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            {/* Logo Siarpi ukuran lebih kecil dari header */}
            <div className="relative h-9 w-24 shrink-0 md:h-11 md:w-32">
              <Link to="/" className="absolute left-0 top-1/2 -translate-y-[36%] inline-block">
                <img src={pageLogo} alt="Siarpi Logo" className="w-24 object-contain md:w-32" />
              </Link>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              All-in-One Management System untuk bisnis Indonesia. Kelola tanpa ribet.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold">Produk</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-foreground">
                  Modules
                </Link>
              </li>
              <li>
                <Link to="/studi-kasus" className="hover:text-foreground">
                  Studi Kasus
                </Link>
              </li>
              <li>
                <Link to="/komparasi" className="hover:text-foreground">
                  Komparasi
                </Link>
              </li>
              <li>
                <Link to="/modular" className="hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/roadmap" className="hover:text-foreground">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold">Perusahaan</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/tentang" className="hover:text-foreground">
                  Tentang Siarpi
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-foreground">
                  Blog & Edukasi
                </Link>
              </li>
              <li>
                <Link to="/modular" className="hover:text-foreground">
                  Beli Ketengan
                </Link>
              </li>
              <li>
                <Link to="/onboarding" className="hover:text-foreground">
                  Coba Demo Gratis
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-foreground">
                  Ketentuan Layanan
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold">Kontak</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>contacts@siarpi.com</li>
              <li>Jakarta, Indonesia</li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="rounded-lg border border-border p-2 hover:bg-accent"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="rounded-lg border border-border p-2 hover:bg-accent"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="rounded-lg border border-border p-2 hover:bg-accent"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:contacts@siarpi.com"
                aria-label="Email"
                className="rounded-lg border border-border p-2 hover:bg-accent"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>&copy; {new Date().getFullYear()} Siarpi. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link to="/tentang" className="transition-colors hover:text-foreground">
              Tentang Kami
            </Link>
            <span>•</span>
            <Link to="/terms" className="transition-colors hover:text-foreground">
              Ketentuan Layanan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
