// ─────────────────────────────────────────────────────────────────────────────
// auth-api.ts — typed client untuk POST /auth/register dan /auth/login
// Mirror dari backend auth/handler.go (models.RegisterRequest, models.AuthResponse)
// ─────────────────────────────────────────────────────────────────────────────

import { apiFetch } from "@/lib/api";
import type { SiarpiUser } from "@/lib/auth";

// Field di sini harus sinkron dengan models.RegisterRequest di backend.
// company_id sengaja TIDAK dikirim — backend men-default-kan ke 1 kalau
// kosong, tapi flow kita: register dulu tanpa company, company dibuat
// belakangan di /onboarding lewat POST /companies.
export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: SiarpiUser;
  // Akun dengan 2FA aktif TIDAK mendapat token di /auth/login. Backend
  // membalas HTTP 200 dengan success=true TAPI hanya berisi dua field di
  // bawah — sesi baru terbit setelah OTP diverifikasi lewat
  // verifyLogin2FA(). Lihat auth/login.go:130-147.
  requires_2fa?: boolean;
  pending_token?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

/** POST /auth/register — buat akun baru. Backend auto-generate JWT (auto-login). */
export async function registerUser(
  payload: RegisterRequest,
): Promise<{ ok: boolean; data: AuthResponse | null }> {
  const { ok, data } = await apiFetch<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return { ok: ok && !!data?.success, data };
}

/** POST /auth/login */
export async function loginUser(
  payload: LoginRequest,
): Promise<{ ok: boolean; data: AuthResponse | null }> {
  const { ok, data } = await apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return { ok: ok && !!data?.success, data };
}

/**
 * POST /auth/2fa/login-verify — langkah kedua login untuk akun ber-2FA.
 * `code` menerima OTP dari authenticator MAUPUN kode recovery
 * (backend mencoba keduanya, lihat auth/twofactor.go).
 */
export async function verifyLogin2FA(
  pendingToken: string,
  code: string,
): Promise<{ ok: boolean; data: AuthResponse | null }> {
  const { ok, data } = await apiFetch<AuthResponse>("/auth/2fa/login-verify", {
    method: "POST",
    body: JSON.stringify({ pending_token: pendingToken, code }),
  });
  return { ok: ok && !!data?.success, data };
}

// ── Lupa password ────────────────────────────────────────────────────────────
// Backend memakai OTP 6 digit berlaku 10 menit yang dikirim ke email, lalu
// ditukar bersama password baru. Dua endpoint, dua langkah — halaman
// /forgot-password harus mengikuti keduanya, bukan cuma mengirim email.

export interface PasswordResponse {
  success: boolean;
  message: string;
}

/** POST /auth/forgot-password — kirim OTP ke email. */
export async function requestPasswordReset(
  email: string,
): Promise<{ ok: boolean; data: PasswordResponse | null }> {
  const { ok, data } = await apiFetch<PasswordResponse>("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  return { ok: ok && !!data?.success, data };
}

/** POST /auth/reset-password — tukar OTP + password baru. Minimal 6 karakter. */
export async function resetPassword(
  email: string,
  otp: string,
  newPassword: string,
): Promise<{ ok: boolean; data: PasswordResponse | null }> {
  const { ok, data } = await apiFetch<PasswordResponse>("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ email, otp, new_password: newPassword }),
  });
  return { ok: ok && !!data?.success, data };
}

// ── Handoff ke app.siarpi.com ────────────────────────────────────────────────
// JWT TIDAK BOLEH dioper lewat URL: URL ikut terekam di Referer header, log
// CDN, dan history browser, dan menghapusnya dari address bar setelah halaman
// dimuat tidak membatalkan jejak itu. Yang dioper sekarang cuma kode
// sekali-pakai berumur 60 detik; aplikasi tujuan yang menukarnya jadi JWT
// lewat POST. Lihat auth/handoff.go di backend.

export interface HandoffResponse {
  success: boolean;
  code?: string;
  expires_in?: number;
  message?: string;
}

/** POST /auth/handoff — minta kode sekali-pakai untuk pindah ke aplikasi utama. */
export async function createHandoffCode(): Promise<string | null> {
  const { ok, data } = await apiFetch<HandoffResponse>("/auth/handoff", { method: "POST" });
  if (!ok || !data?.success || !data.code) return null;
  return data.code;
}
