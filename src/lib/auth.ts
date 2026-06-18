// ─────────────────────────────────────────────────────────────────────────────
// Centralized auth helpers — single source of truth untuk token & user data.
// Dipakai oleh: routes/login.tsx, routes/__root.tsx, routes/onboarding.tsx,
// components/site/Header.tsx, dan halaman lain yang butuh status login.
// ─────────────────────────────────────────────────────────────────────────────

const TOKEN_KEY = "siarpi_token";
const USER_KEY = "siarpi_user";

// Bentuk models.User dari backend (field yang relevan di frontend)
export interface SiarpiUser {
  id: string;
  company_id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  avatar_url?: string;
  is_active: boolean;
  is_verified: boolean;
}

// ── Token ─────────────────────────────────────────────────────────────────────

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

// ── User data ─────────────────────────────────────────────────────────────────

export function getStoredUser(): SiarpiUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SiarpiUser;
  } catch {
    return null;
  }
}

export function setStoredUser(user: SiarpiUser) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// ── Display helpers ──────────────────────────────────────────────────────────

export function getDisplayName(user: SiarpiUser | null): string {
  if (!user) return "";
  const full = `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim();
  return full || user.username || user.email;
}

export function getInitials(user: SiarpiUser | null): string {
  if (!user) return "?";
  const first = user.first_name?.[0] ?? "";
  const last = user.last_name?.[0] ?? "";
  const initials = `${first}${last}`.trim();
  if (initials) return initials.toUpperCase();
  return (user.username?.[0] ?? user.email?.[0] ?? "?").toUpperCase();
}