import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/site/Header";
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Lupa Password — Siarpi" },
      { name: "description", content: "Pulihkan kata sandi akun Siarpi Anda." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setError(null);
    setSubmitting(true);

    try {
      // Simulasi/mock API call pemulihan password.
      // Di masa depan bisa dihubungkan ke POST /auth/forgot-password
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan. Coba lagi.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-subtle">
      <Header />

      <main className="container mx-auto flex flex-1 items-center justify-center px-4 py-12 md:px-6">
        <div className="w-full max-w-md">
          <Link
            to="/login"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke Halaman Masuk
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="rounded-3xl border-border p-8 shadow-card md:p-10">
              {success ? (
                <div className="text-center py-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <h1 className="font-display text-2xl font-bold">Email Terkirim</h1>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Kami telah mengirimkan instruksi pemulihan kata sandi ke email{" "}
                    <span className="font-semibold text-foreground">{email}</span>. Silakan periksa kotak masuk atau spam Anda.
                  </p>
                  <Button asChild className="mt-8 w-full bg-gradient-primary text-primary-foreground">
                    <Link to="/login">Masuk Kembali</Link>
                  </Button>
                </div>
              ) : (
                <>
                  <div className="text-center">
                    <h1 className="font-display text-2xl font-bold md:text-3xl">Lupa Password?</h1>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      Masukkan email yang terdaftar pada akun Anda. Kami akan mengirimkan instruksi untuk membuat password baru.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email Akun</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="nama@perusahaan.com"
                          className="rounded-xl pl-9"
                          required
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                        {error}
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={submitting || !email.trim()}
                      className="w-full bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-glow"
                    >
                      {submitting ? (
                        "Mengirim..."
                      ) : (
                        <>
                          Kirim Instruksi Pemulihan <ArrowRight className="ml-1 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
