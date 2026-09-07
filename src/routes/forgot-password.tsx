import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/site/Header";
import { requestPasswordReset, resetPassword } from "@/lib/auth-api";
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
} from "lucide-react";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Lupa Password — Siarpi" },
      { name: "description", content: "Pulihkan kata sandi akun Siarpi Anda." },
    ],
  }),
  component: ForgotPasswordPage,
});

// Alurnya mengikuti backend apa adanya (auth/password.go):
//   1. POST /auth/forgot-password  -> OTP 6 digit dikirim ke email, berlaku 10 menit
//   2. POST /auth/reset-password   -> tukar OTP + password baru (minimal 6 karakter)
// Halaman ini SEBELUMNYA cuma setTimeout(1500) lalu menampilkan "Email
// Terkirim" tanpa memanggil apa pun — user yang lupa password menunggu email
// yang tidak pernah dikirim.
type Step = "email" | "otp" | "done";

const MIN_PASSWORD_LENGTH = 6;

function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function handleRequestOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setError(null);
    setNotice(null);
    setSubmitting(true);

    try {
      const { ok, data } = await requestPasswordReset(email.trim());
      if (!ok) {
        setError(data?.message ?? "Gagal mengirim kode. Coba lagi.");
        return;
      }
      // Backend sengaja tidak membocorkan apakah email terdaftar, jadi
      // teksnya pun tidak boleh memastikan email itu ada.
      setStep("otp");
    } catch {
      setError("Tidak bisa terhubung ke server. Cek koneksi Anda.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResend() {
    setError(null);
    setNotice(null);
    setResending(true);
    try {
      const { ok, data } = await requestPasswordReset(email.trim());
      setNotice(ok ? "Kode baru sudah dikirim ulang." : (data?.message ?? "Gagal mengirim ulang."));
    } catch {
      setError("Tidak bisa terhubung ke server. Cek koneksi Anda.");
    } finally {
      setResending(false);
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();

    setError(null);
    setNotice(null);

    // Dicek di sini supaya user tidak menghabiskan OTP untuk kesalahan ketik
    // yang bisa ditangkap sebelum request dikirim.
    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      setError(`Password baru minimal ${MIN_PASSWORD_LENGTH} karakter.`);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Konfirmasi password tidak sama.");
      return;
    }

    setSubmitting(true);
    try {
      const { ok, data } = await resetPassword(email.trim(), otp.trim(), newPassword);
      if (!ok) {
        setError(data?.message ?? "Kode salah atau sudah kedaluwarsa.");
        return;
      }
      setStep("done");
    } catch {
      setError("Tidak bisa terhubung ke server. Cek koneksi Anda.");
    } finally {
      setSubmitting(false);
    }
  }

  const canReset =
    otp.trim().length > 0 && newPassword.length > 0 && confirmPassword.length > 0 && !submitting;

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
              {/* ── Selesai ────────────────────────────────────────────────── */}
              {step === "done" && (
                <div className="py-4 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <h1 className="font-display text-2xl font-bold">Password Diperbarui</h1>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Kata sandi akun <span className="font-semibold text-foreground">{email}</span>{" "}
                    berhasil diganti. Silakan masuk dengan password baru Anda.
                  </p>
                  <Button
                    onClick={() => navigate({ to: "/login" })}
                    className="mt-8 w-full bg-gradient-primary text-primary-foreground"
                  >
                    Masuk Sekarang
                  </Button>
                </div>
              )}

              {/* ── Langkah 1: minta OTP ───────────────────────────────────── */}
              {step === "email" && (
                <>
                  <div className="text-center">
                    <h1 className="font-display text-2xl font-bold md:text-3xl">Lupa Password?</h1>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Masukkan email yang terdaftar pada akun Anda. Kami akan mengirimkan kode
                      verifikasi untuk membuat password baru.
                    </p>
                  </div>

                  <form onSubmit={handleRequestOtp} className="mt-8 space-y-5">
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
                          Kirim Kode Verifikasi <ArrowRight className="ml-1 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </>
              )}

              {/* ── Langkah 2: OTP + password baru ─────────────────────────── */}
              {step === "otp" && (
                <>
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <KeyRound className="h-6 w-6" />
                    </div>
                    <h1 className="font-display text-2xl font-bold md:text-3xl">
                      Buat Password Baru
                    </h1>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Jika <span className="font-semibold text-foreground">{email}</span> terdaftar,
                      kode 6 digit sudah kami kirim ke sana. Kode berlaku 10 menit.
                    </p>
                  </div>

                  <form onSubmit={handleResetPassword} className="mt-8 space-y-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="otp">Kode Verifikasi</Label>
                      <Input
                        id="otp"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        autoFocus
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="123456"
                        className="rounded-xl text-center text-lg font-semibold tracking-[0.3em]"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="new-password">Password Baru</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="new-password"
                          type={showPass ? "text" : "password"}
                          autoComplete="new-password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Minimal 6 karakter"
                          className="rounded-xl pl-9 pr-10"
                          required
                        />
                        <button
                          type="button"
                          tabIndex={-1}
                          onClick={() => setShowPass((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="confirm-password">Ulangi Password Baru</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="confirm-password"
                          type={showPass ? "text" : "password"}
                          autoComplete="new-password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Ketik ulang password baru"
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
                    {notice && (
                      <div className="rounded-xl border border-primary/30 bg-primary/10 p-3 text-sm text-foreground">
                        {notice}
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={!canReset}
                      className="w-full bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-glow"
                    >
                      {submitting ? (
                        "Menyimpan..."
                      ) : (
                        <>
                          Simpan Password Baru <ArrowRight className="ml-1 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    <div className="flex items-center justify-between text-sm">
                      <button
                        type="button"
                        onClick={() => {
                          setStep("email");
                          setOtp("");
                          setError(null);
                          setNotice(null);
                        }}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Ganti email
                      </button>
                      <button
                        type="button"
                        onClick={handleResend}
                        disabled={resending}
                        className="font-medium text-primary hover:underline disabled:opacity-60"
                      >
                        {resending ? "Mengirim ulang..." : "Kirim ulang kode"}
                      </button>
                    </div>
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
