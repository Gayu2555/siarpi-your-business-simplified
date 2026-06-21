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
}

export interface LoginRequest {
    email: string;
    password: string;
}

/** POST /auth/register — buat akun baru. Backend auto-generate JWT (auto-login). */
export async function registerUser(
    payload: RegisterRequest
): Promise<{ ok: boolean; data: AuthResponse | null }> {
    const { ok, data } = await apiFetch<AuthResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
    });
    return { ok: ok && !!data?.success, data };
}

/** POST /auth/login */
export async function loginUser(
    payload: LoginRequest
): Promise<{ ok: boolean; data: AuthResponse | null }> {
    const { ok, data } = await apiFetch<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
    });
    return { ok: ok && !!data?.success, data };
}