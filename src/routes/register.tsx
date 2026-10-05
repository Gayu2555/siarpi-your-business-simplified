import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/site/Header";
import { isAuthenticated, setAuthToken, setStoredUser } from "@/lib/auth";
import {
  registerUser,
  sendRegisterOtp,
  verifyRegisterOtp,
  type RegisterRequest,
} from "@/lib/auth-api";
import { Loader2, ArrowRight, Eye, EyeOff, Check } from "lucide-react";

export const Route = createFileRoute("/register")({
  beforeLoad: () => {
    // Sudah login -> tidak perlu register lagi, arahkan ke onboarding
    // (onboarding sendiri yang akan redirect ke /dashboard kalau company
    // sudah ada — lihat beforeLoad di routes/onboarding.tsx)
    if (isAuthenticated()) {
      throw redirect({ to: "/onboarding" });
    }
  },
  head: () => ({
    meta: [
      { title: "Daftar — Siarpi" },
      { name: "description", content: "Buat akun Siarpi gratis dalam hitungan menit." },
    ],
  }),
  component: RegisterPage,
});

// Field harus sinkron dengan validasi di backend auth.RegisterHandler:
// - email, password, username wajib
// - username: 3-50 karakter, alphanumeric + underscore (utils.ValidateUsername)
// - password: minimal 8 karakter, ada huruf & angka (utils.ValidatePassword)
// - first_name/last_name: huruf, spasi, hyphen, apostrophe saja (utils.ValidateName)

const USERNAME_PATTERN = /^[a-zA-Z0-9_]{3,50}$/;
const NAME_PATTERN = /^[a-zA-Z\s'-]*$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OTP_PATTERN = /^[0-9]{6}$/;

function RegisterPage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // OTP registrasi: email diverifikasi dulu sebelum form bisa disubmit.
  // Backend mengizinkan /auth/register untuk email yang lolos verify
  // selama 30 menit — lihat gate di auth/register.go.
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpError, setOtpError] = useState<string | null>(null);

  // Countdown 1 detik untuk tombol kirim ulang kode.
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => setResendCooldown((v) => v - 1), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Validasi client-side mirror dari backend, supaya user dapat feedback
  // instan tanpa harus round-trip ke server dulu.
  const usernameValid = username === "" || USERNAME_PATTERN.test(username);
  const firstNameValid = NAME_PATTERN.test(firstName);
  const lastNameValid = NAME_PATTERN.test(lastName);
  const passwordValid =
    password === "" ||
    (password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password));

  const emailValid = EMAIL_PATTERN.test(email.trim());

  // Submit baru boleh kalau email sudah lolos verifikasi OTP — backend
  // juga menolak register tanpa verifikasi, ini cuma feedback dini.
  const canSubmit =
    emailVerified &&
    firstName.trim() !== "" &&
    username.trim() !== "" &&
    usernameValid &&
    firstNameValid &&
    lastNameValid &&
    password !== "" &&
    passwordValid;

  // Ganti email setelah kode terkirim = kode lama tidak relevan lagi,
  // reset state OTP supaya user minta kode baru ke alamat yang benar.
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    if (otpSent) {
      setOtpSent(false);
      setOtpCode("");
      setOtpError(null);
      setResendCooldown(0);
    }
  }

  function handleChangeEmail() {
    setEmailVerified(false);
    setOtpSent(false);
    setOtpCode("");
    setOtpError(null);
    setResendCooldown(0);
  }

  async function handleSendOtp() {
    if (!emailValid || sendingOtp || resendCooldown > 0) return;
    setOtpError(null);
    setSendingOtp(true);
    try {
      const { ok, data } = await sendRegisterOtp(email.trim());
      if (!ok) {
        setOtpError(data?.message ?? "Gagal mengirim kode. Coba lagi.");
      } else {
        setOtpSent(true);
        setOtpCode("");
        setResendCooldown(60);
      }
    } catch (err) {
      setOtpError(err instanceof Error ? err.message : "Terjadi kesalahan tidak terduga.");
    } finally {
      setSendingOtp(false);
    }
  }

  async function handleVerifyOtp() {
    if (!OTP_PATTERN.test(otpCode) || verifyingOtp) return;
    setOtpError(null);
    setVerifyingOtp(true);
    try {
      const { ok, data } = await verifyRegisterOtp(email.trim(), otpCode);
      if (!ok) {
        setOtpError(data?.message ?? "Kode salah. Coba lagi.");
      } else {
        setEmailVerified(true);
      }
    } catch (err) {
      setOtpError(err instanceof Error ? err.message : "Terjadi kesalahan tidak terduga.");
    } finally {
      setVerifyingOtp(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setError(null);
    setSubmitting(true);

    const payload: RegisterRequest = {
      email: email.trim(),
      password,
      username: username.trim(),
      first_name: firstName.trim(),
      last_name: lastName.trim(),
    };

    try {
      const { ok, data } = await registerUser(payload);

      if (!ok || !data) {
        setError(data?.message ?? "Gagal mendaftar. Coba lagi.");
        setSubmitting(false);
        return;
      }

      // Backend mengembalikan token + user untuk auto-login setelah register.
      // Kalau karena suatu sebab token gagal di-generate (lihat catatan di
      // RegisterHandler), arahkan ke /login manual sebagai fallback.
      if (data.token && data.user) {
        setAuthToken(data.token);
        setStoredUser(data.user);
        navigate({ to: "/onboarding" });
      } else {
        navigate({ to: "/login" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan tidak terduga.");
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-subtle">
      <Header />

      <main className="container mx-auto flex flex-1 items-center justify-center px-4 py-12 md:px-6">
        <Card className="w-full max-w-md rounded-3xl border-border p-8 shadow-card md:p-10">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold md:text-3xl">Buat akun Siarpi</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Gratis untuk mulai. Tanpa kartu kredit.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="budi@perusahaan.com"
                  className="rounded-xl"
                  autoComplete="email"
                  disabled={emailVerified}
                />
                {emailVerified ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="shrink-0 rounded-xl"
                    onClick={handleChangeEmail}
                  >
                    Ganti
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    className="shrink-0 rounded-xl"
                    disabled={!emailValid || sendingOtp || resendCooldown > 0}
                    onClick={handleSendOtp}
                  >
                    {sendingOtp ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : resendCooldown > 0 ? (
                      `Kirim ulang (${resendCooldown})`
                    ) : otpSent ? (
                      "Kirim ulang"
                    ) : (
                      "Kirim Kode"
                    )}
                  </Button>
                )}
              </div>
              {emailVerified && (
                <p className="flex items-center gap-1 text-xs text-green-600">
                  <Check className="h-3.5 w-3.5" /> Email terverifikasi — lanjut isi data di bawah.
                </p>
              )}
            </div>

            {otpSent && !emailVerified && (
              <div className="space-y-2">
                <Label htmlFor="otp">Kode OTP</Label>
                <div className="flex gap-2">
                  <Input
                    id="otp"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="6 digit kode dari email"
                    className="rounded-xl tracking-widest"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="shrink-0 rounded-xl"
                    disabled={!OTP_PATTERN.test(otpCode) || verifyingOtp}
                    onClick={handleVerifyOtp}
                  >
                    {verifyingOtp ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verifikasi"}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Kode dikirim ke {email.trim()}, berlaku 5 menit.
                </p>
              </div>
            )}

            {otpError && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {otpError}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nama Depan</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Budi"
                  className="rounded-xl"
                  autoComplete="given-name"
                />
                {!firstNameValid && (
                  <p className="text-xs text-destructive">Hanya huruf, spasi, dan tanda hubung.</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nama Belakang</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Santoso"
                  className="rounded-xl"
                  autoComplete="family-name"
                />
                {!lastNameValid && (
                  <p className="text-xs text-destructive">Hanya huruf, spasi, dan tanda hubung.</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="budisantoso"
                className="rounded-xl"
                autoComplete="username"
              />
              {!usernameValid && (
                <p className="text-xs text-destructive">
                  3-50 karakter, hanya huruf, angka, dan underscore.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
                  className="rounded-xl pr-10"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {!passwordValid && (
                <p className="text-xs text-destructive">
                  Minimal 8 karakter, kombinasi huruf dan angka.
                </p>
              )}
            </div>

            {error && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={!canSubmit || submitting}
              className="w-full bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-glow"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" /> Mendaftar...
                </>
              ) : (
                <>
                  Daftar Sekarang <ArrowRight className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>

            {!emailVerified && (
              <p className="text-center text-xs text-muted-foreground">
                Verifikasi email dengan kode OTP dulu untuk bisa mendaftar.
              </p>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Masuk di sini
            </Link>
          </p>
        </Card>
      </main>
    </div>
  );
}
