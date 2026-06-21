// ─────────────────────────────────────────────────────────────────────────────
// company-api.ts — typed client untuk POST /companies
// Mirror dari backend company/handler.go (CreateCompanyRequest, CompanyResponse)
// ─────────────────────────────────────────────────────────────────────────────

import { apiFetch } from "@/lib/api";

export interface Company {
  id: string;
  code: string;
  name: string;
  legal_name?: string;
  email?: string;
  phone?: string;
  website?: string;
  logo_url?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  currency_code: string;
  timezone: string;
  fiscal_year_start?: string;
  business_type?: string;
  employee_count?: number;
  industry?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Field di sini harus sinkron dengan company.CreateCompanyRequest di backend
// (lihat migration_add_onboarding_columns.sql untuk business_type/
// employee_count/industry — sudah punya kolom permanen, tidak perlu lagi
// disimpan hanya di localStorage).
export interface CreateCompanyRequest {
  user_id: string;
  code: string;
  name: string;
  legal_name?: string;
  tax_id?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  currency_code?: string;
  timezone?: string;
  business_type?: string;
  employee_count?: number;
  industry?: string;
}

export interface CompanyResponse {
  success: boolean;
  message: string;
  company?: Company;
  token?: string;
}

/** POST /companies — buat company baru, otomatis mengaitkan user_id sebagai pemilik. */
export async function createCompany(
  payload: CreateCompanyRequest
): Promise<{ ok: boolean; data: CompanyResponse | null }> {
  const { ok, data } = await apiFetch<CompanyResponse>("/companies", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return { ok: ok && !!data?.success, data };
}

// ── Onboarding metadata cadangan (opsional) ──────────────────────────────────
// Sejak business_type/employee_count/industry sudah punya kolom permanen di
// backend, helper ini sekarang murni cadangan sisi-client (misal untuk
// prefill form kalau onboarding sempat gagal di tengah jalan), bukan
// satu-satunya tempat penyimpanan lagi.
const ONBOARDING_META_KEY = "siarpi_onboarding_meta";

export interface OnboardingMeta {
  bizType: string;
  employees: string;
  industry: string;
}

export function saveOnboardingMeta(meta: OnboardingMeta) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ONBOARDING_META_KEY, JSON.stringify(meta));
}

export function getOnboardingMeta(): OnboardingMeta | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ONBOARDING_META_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as OnboardingMeta;
  } catch {
    return null;
  }
}

/** Generate company code dari nama perusahaan, contoh: "PT Maju Sejahtera" -> "PTMAJUSEJ" + suffix acak. */
export function generateCompanyCode(name: string): string {
  const base = name
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 8) || "COMPANY";
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${base}${suffix}`;
}

export interface OnboardingStatus {
  success: boolean;
  has_company: boolean;
  has_active_modules: boolean;
  has_pending_checkout: boolean;
  pending_checkout_id: string;
  company_id?: string;
}

/** GET /onboarding-status — cek status onboarding user saat ini */
export async function getOnboardingStatus(): Promise<{ ok: boolean; data: OnboardingStatus | null }> {
  const { ok, data } = await apiFetch<OnboardingStatus>("/onboarding-status");
  return { ok: ok && !!data?.success, data };
}