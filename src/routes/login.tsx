import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiUrl } from "@/lib/api";
import { setAuthToken, setStoredUser, type SiarpiUser } from "@/lib/auth";
import { verifyLogin2FA, type AuthResponse } from "@/lib/auth-api";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  Chrome,
  Smartphone,
  Building2,
  Shield,
  ShieldCheck,
} from "lucide-react";
import { z } from "zod";

// ── Route ────────────────────────────────────────────────────────────────────

const searchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/login")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Masuk — Siarpi" },
      { name: "description", content: "Masuk ke akun Siarpi Anda." },
    ],
  }),
  component: LoginPage,
});

// ── Helpers ───────────────────────────────────────────────────────────────────
// Auth helpers di-import dari @/lib/auth (single source of truth)

// ── SSO options ───────────────────────────────────────────────────────────────
//
// BELUM ADA satu pun yang terimplementasi -- onClick-nya dulu berisi
// `// TODO` kosong, jadi tombolnya bisa diklik dan TIDAK terjadi apa-apa.
// Di halaman login, tombol yang diam saat diklik terbaca sebagai aplikasi
// rusak, bukan fitur yang belum siap. Sampai alurnya benar-benar ada,
// tombolnya ditampilkan dalam keadaan nonaktif + label "Segera": desainnya
// tetap, tapi tidak lagi menjanjikan sesuatu yang tidak bisa ditepati.
//
// Kalau salah satunya sudah jalan, hapus `soon: true` pada entri itu dan
// isi handler-nya di `handleSsoClick`.
const ssoOptions: { id: string; label: string; icon: typeof Chrome; soon: boolean }[] = [
  {
    id: "google",
    label: "Lanjutkan dengan Google",
    icon: Chrome, // placeholder — swap with Google SVG kalau ada
    soon: true,
  },
  {
    id: "employee",
    label: "Masuk dengan ID Karyawan",
    icon: Building2,
    soon: true,
  },
  {
    id: "phone",
    label: "Masuk dengan Nomor Telepon",
    icon: Smartphone,
    soon: true,
  },
  {
    id: "saml",
    label: "Masuk dengan SAML SSO",
    icon: Shield,
    soon: true,
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

function LoginPage() {
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/login" });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Langkah kedua untuk akun ber-2FA. Selama pendingToken terisi, form
  // password diganti form kode — sesi BELUM terbit sampai kode benar.
  const [pendingToken, setPendingToken] = useState<string | null>(null);
  const [twoFactorCode, setTwoFactorCode] = useState("");

  const canSubmit = email.trim().length > 0 && password.length >= 6;

  // Satu-satunya tempat sesi disimpan & user dipindahkan, dipakai bareng oleh
  // login biasa dan login yang lewat 2FA.
  function completeLogin(data: AuthResponse) {
    if (!data.token) {
      setError("Server tidak mengirim token. Coba lagi atau hubungi support.");
      return;
    }

    setAuthToken(data.token);
    if (data.user) setStoredUser(data.user as SiarpiUser);

    // User dengan company_id sudah ada -> langsung dashboard.
    // User baru (belum pernah onboarding, company_id kosong) -> lanjutkan
    // ke onboarding dulu, kecuali ada `redirect` eksplisit dari query param
    // (misal user diarahkan ke /login dari halaman protected tertentu).
    const hasCompany = !!data.user?.company_id;
    const fallback = hasCompany ? "/dashboard" : "/onboarding";

    navigate({ to: (redirect as string) ?? fallback });
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(apiUrl("/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: AuthResponse | null = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        setError(data?.message ?? "Email atau password salah. Coba lagi.");
        return;
      }

      // Password benar TAPI akunnya pakai 2FA: backend membalas 200 dengan
      // success=true tanpa token/user, cuma pending_token berumur 5 menit.
      // Tanpa cabang ini, setAuthToken(undefined) akan menulis string
      // "undefined" ke localStorage — isAuthenticated() jadi true padahal
      // setiap request dijawab 401, dan user terjebak tanpa pesan apa pun.
      if (data.requires_2fa && data.pending_token) {
        setPendingToken(data.pending_token);
        setTwoFactorCode("");
        return;
      }

      completeLogin(data);
    } catch (err) {
      setError("Tidak bisa terhubung ke server. Cek koneksi Anda.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify2FA(e: React.FormEvent) {
    e.preventDefault();
    if (!pendingToken || twoFactorCode.trim().length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const { ok, data } = await verifyLogin2FA(pendingToken, twoFactorCode.trim());

      if (!ok || !data) {
        setError(data?.message ?? "Kode salah. Coba lagi.");
        // Sesi verifikasi cuma berlaku 5 menit; kalau sudah lewat, user
        // harus mulai dari password lagi daripada mengetik kode terus.
        if (data?.message?.toLowerCase().includes("kedaluwarsa")) {
          setPendingToken(null);
          setPassword("");
        }
        return;
      }

      completeLogin(data);
    } catch (err) {
      setError("Tidak bisa terhubung ke server. Cek koneksi Anda.");
    } finally {
      setLoading(false);
    }
  }

  function cancelTwoFactor() {
    setPendingToken(null);
    setTwoFactorCode("");
    setPassword("");
    setError(null);
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-subtle">
      {/* Card */}
      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-[420px]"
        >
          <Card className="rounded-3xl border-border p-8 shadow-elegant md:p-10">
            {pendingToken ? (
              /* ── Langkah 2: verifikasi 2FA ─────────────────────────────── */
              <>
                <div className="mb-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h1 className="font-display text-2xl font-bold md:text-3xl">
                    Verifikasi dua langkah
                  </h1>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Masukkan 6 digit kode dari aplikasi authenticator Anda. Bisa juga pakai salah
                    satu kode recovery.
                  </p>
                </div>

                <form onSubmit={handleVerify2FA} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="twofactor">Kode verifikasi</Label>
                    <Input
                      id="twofactor"
                      inputMode="text"
                      autoComplete="one-time-code"
                      autoFocus
                      placeholder="123456"
                      value={twoFactorCode}
                      onChange={(e) => setTwoFactorCode(e.target.value)}
                      className="rounded-xl text-center text-lg font-semibold tracking-[0.3em]"
                      required
                    />
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
                    >
                      {error}
                    </motion.p>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-glow"
                    disabled={loading || twoFactorCode.trim().length === 0}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                        Memverifikasi…
                      </span>
                    ) : (
                      <>
                        Verifikasi <ArrowRight className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <button
                    type="button"
                    onClick={cancelTwoFactor}
                    className="flex w-full items-center justify-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" /> Kembali, masuk dengan akun lain
                  </button>
                </form>
              </>
            ) : (
              <>
                {/* Heading */}
                <div className="mb-8">
                  <Badge
                    variant="secondary"
                    className="mb-4 rounded-full border border-primary/20 bg-accent/60 px-3 py-1 text-xs text-accent-foreground"
                  >
                    <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                    Selamat datang kembali
                  </Badge>
                  <h1 className="font-display text-2xl font-bold md:text-3xl">Masuk ke Siarpi</h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Kelola bisnis Anda dari satu tempat.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="nama@perusahaan.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-xl pl-9"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="/forgot-password"
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        Lupa password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPass ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

                  {/* Error */}
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
                    >
                      {error}
                    </motion.p>
                  )}

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-glow"
                    disabled={!canSubmit || loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                        Memverifikasi…
                      </span>
                    ) : (
                      <>
                        Masuk <ArrowRight className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs text-muted-foreground">atau</span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                {/* SSO options */}
                <div className="space-y-2.5">
                  {ssoOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={opt.soon}
                      title={opt.soon ? "Metode ini belum tersedia" : undefined}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/50 disabled:cursor-not-allowed disabled:bg-muted/30 disabled:text-muted-foreground disabled:hover:bg-muted/30"
                    >
                      <opt.icon className="h-4 w-4 text-muted-foreground" />
                      {opt.label}
                      {opt.soon && (
                        <span className="ml-1 rounded-full border border-border bg-background px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                          Segera
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Register link */}
                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Belum punya akun?{" "}
                  <Link to="/register" className="font-medium text-primary hover:underline">
                    Daftar gratis
                  </Link>
                </p>
              </>
            )}
          </Card>

          {/* Footer note */}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Dengan masuk, Anda menyetujui{" "}
            <Link to="/" className="underline hover:text-foreground">
              Kebijakan Privasi
            </Link>{" "}
            &{" "}
            <Link to="/" className="underline hover:text-foreground">
              Ketentuan Penggunaan
            </Link>{" "}
            Siarpi.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
