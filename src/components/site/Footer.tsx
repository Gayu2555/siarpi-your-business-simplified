import { Link } from "@tanstack/react-router";
import { Sparkles, Instagram, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold">Siarpi</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              All-in-One Management System untuk bisnis Indonesia. Kelola tanpa ribet.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold">Produk</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground">Modules</Link></li>
              <li><Link to="/modular" className="hover:text-foreground">Beli Ketengan</Link></li>
              <li><Link to="/roadmap" className="hover:text-foreground">Roadmap</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold">Harga</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground">Paket</Link></li>
              <li><Link to="/modular" className="hover:text-foreground">Modular</Link></li>
              <li><Link to="/onboarding" className="hover:text-foreground">Demo</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold">Kontak</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>halo@siarpi.id</li>
              <li>+62 21 1234 5678</li>
              <li>Jakarta, Indonesia</li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a href="#" aria-label="Instagram" className="rounded-lg border border-border p-2 hover:bg-accent"><Instagram className="h-4 w-4" /></a>
              <a href="#" aria-label="Twitter" className="rounded-lg border border-border p-2 hover:bg-accent"><Twitter className="h-4 w-4" /></a>
              <a href="#" aria-label="LinkedIn" className="rounded-lg border border-border p-2 hover:bg-accent"><Linkedin className="h-4 w-4" /></a>
              <a href="#" aria-label="Email" className="rounded-lg border border-border p-2 hover:bg-accent"><Mail className="h-4 w-4" /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Siarpi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
