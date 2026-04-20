import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { modules, formatIDR } from "@/lib/modules";
import { Plus, Check, ShoppingCart, Trash2, ArrowRight, X } from "lucide-react";

export const Route = createFileRoute("/modular")({
  head: () => ({
    meta: [
      { title: "Beli Ketengan — Siarpi" },
      { name: "description", content: "Pilih modul satuan sesuai kebutuhan. Tanpa paket wajib." },
    ],
  }),
  component: ModularPage,
});

function ModularPage() {
  const [cart, setCart] = useState<string[]>([]);
  const [openCart, setOpenCart] = useState(false);

  const toggle = (id: string) =>
    setCart((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const remove = (id: string) => setCart((p) => p.filter((x) => x !== id));

  const total = cart.reduce((s, id) => s + (modules.find((m) => m.id === id)?.price ?? 0), 0);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="container mx-auto flex-1 px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 rounded-full">Modular Pricing</Badge>
          <h1 className="font-display text-4xl font-bold md:text-5xl">
            Beli <span className="text-gradient-primary">Ketengan</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            Tidak wajib beli paket. Pilih modul yang Anda butuhkan, bayar sesuai pakai.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Modules grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {modules.map((m, i) => {
              const inCart = cart.includes(m.id);
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <Card className={`flex h-full flex-col rounded-2xl p-6 transition-all ${
                    inCart ? "border-2 border-primary bg-accent/30 shadow-soft" : "border-border hover:shadow-card"
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
                        <m.icon className="h-6 w-6" />
                      </div>
                      {inCart && (
                        <Badge className="bg-primary text-primary-foreground">
                          <Check className="mr-1 h-3 w-3" /> Dipilih
                        </Badge>
                      )}
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold">{m.name}</h3>
                    <p className="mt-1 flex-1 text-sm text-muted-foreground">{m.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <span className="font-display text-xl font-bold">{formatIDR(m.price)}</span>
                        <span className="text-xs text-muted-foreground">/bulan</span>
                      </div>
                      <Button
                        size="sm"
                        variant={inCart ? "outline" : "default"}
                        onClick={() => toggle(m.id)}
                        className={inCart ? "" : "bg-gradient-primary text-primary-foreground"}
                      >
                        {inCart ? <><X className="mr-1 h-3 w-3" /> Hapus</> : <><Plus className="mr-1 h-3 w-3" /> Tambah</>}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Cart sidebar (desktop) */}
          <aside className="hidden lg:block">
            <Card className="sticky top-24 rounded-2xl border-border p-6 shadow-card">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                <h3 className="font-display text-lg font-semibold">Keranjang</h3>
                <Badge variant="secondary" className="ml-auto rounded-full">{cart.length}</Badge>
              </div>
              <div className="mt-5 space-y-3">
                {cart.length === 0 ? (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    Belum ada modul dipilih.
                  </p>
                ) : (
                  cart.map((id) => {
                    const m = modules.find((x) => x.id === id);
                    if (!m) return null;
                    return (
                      <div key={id} className="flex items-center gap-3 rounded-xl bg-muted/40 p-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-background">
                          <m.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{m.name}</div>
                          <div className="text-xs text-muted-foreground">{formatIDR(m.price)}/bln</div>
                        </div>
                        <button onClick={() => remove(id)} className="text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
              <div className="mt-6 border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="font-display text-2xl font-bold">{formatIDR(total)}</span>
                </div>
                <div className="mt-1 text-right text-xs text-muted-foreground">per bulan</div>
              </div>
              <Button
                asChild
                disabled={cart.length === 0}
                className="mt-6 w-full bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-glow disabled:opacity-50"
              >
                <Link to="/onboarding">
                  Lanjut Pembayaran <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </Card>
          </aside>
        </div>
      </main>

      {/* Mobile cart FAB + sheet */}
      <button
        onClick={() => setOpenCart(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-elegant lg:hidden"
      >
        <ShoppingCart className="h-4 w-4" />
        {cart.length} • {formatIDR(total)}
      </button>

      <AnimatePresence>
        {openCart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenCart(false)}
              className="fixed inset-0 z-50 bg-black/40 lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-3xl bg-background p-6 shadow-elegant lg:hidden"
            >
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-muted" />
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold">Keranjang ({cart.length})</h3>
                <button onClick={() => setOpenCart(false)}><X className="h-5 w-5" /></button>
              </div>
              <div className="mt-4 space-y-3">
                {cart.length === 0 ? (
                  <p className="py-8 text-center text-sm text-muted-foreground">Belum ada modul dipilih.</p>
                ) : cart.map((id) => {
                  const m = modules.find((x) => x.id === id);
                  if (!m) return null;
                  return (
                    <div key={id} className="flex items-center gap-3 rounded-xl bg-muted/40 p-3">
                      <m.icon className="h-5 w-5" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{m.name}</div>
                        <div className="text-xs text-muted-foreground">{formatIDR(m.price)}/bln</div>
                      </div>
                      <button onClick={() => remove(id)}><Trash2 className="h-4 w-4 text-muted-foreground" /></button>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm text-muted-foreground">Total / bulan</span>
                <span className="font-display text-2xl font-bold">{formatIDR(total)}</span>
              </div>
              <Button
                asChild
                disabled={cart.length === 0}
                className="mt-4 w-full bg-gradient-primary text-primary-foreground"
              >
                <Link to="/onboarding">Lanjut Pembayaran <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
