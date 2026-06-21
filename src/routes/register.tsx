import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/site/Header";
import { isAuthenticated, setAuthToken, setStoredUser } from "@/lib/auth";
import { registerUser, type RegisterRequest } from "@/lib/auth-api";
import { Loader2, ArrowRight, Eye, EyeOff } from "lucide-react";

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

    // Validasi client-side mirror dari backend, supaya user dapat feedback
    // instan tanpa harus round-trip ke server dulu.
    const usernameValid = username === "" || USERNAME_PATTERN.test(username);
    const firstNameValid = NAME_PATTERN.test(firstName);
    const lastNameValid = NAME_PATTERN.test(lastName);
    const passwordValid = password === "" || (password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password));

    const canSubmit =
        firstName.trim() !== "" &&
        username.trim() !== "" &&
        usernameValid &&
        firstNameValid &&
        lastNameValid &&
        email.trim() !== "" &&
        password !== "" &&
        passwordValid;

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
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="budi@perusahaan.com"
                                className="rounded-xl"
                                autoComplete="email"
                            />
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