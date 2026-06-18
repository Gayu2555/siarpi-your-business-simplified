// ─────────────────────────────────────────────────────────────────────────────
// modules-api.ts — data fetching ONLY, no React components
// Safe to import in SSR/loader context.
// For icon rendering use @/lib/icon-resolver instead.
// ─────────────────────────────────────────────────────────────────────────────

import { apiFetch } from "@/lib/api";

// ── Types (mirror dari modules/models.go) ────────────────────────────────────

export interface ApiModule {
  key: string;
  suite_key?: string | null;
  name: string;
  label: string;
  description: string;
  /** Format: "i-ph-cube-fill" | "i-ph-storefront-fill" (Phosphor icon class) */
  icon: string;
  /** Tailwind class string: "bg-blue-100" */
  bg_color: string;
  /** Tailwind class string: "text-blue-600" */
  icon_color: string;
  /** Warna base: "blue" | "red" | "amber" dst */
  hover_color: string;
  route: string;
  price: number;
  is_core: boolean;
  is_listed: boolean;
}

export interface SubscriptionPlan {
  suite_key: string;
  key: string;
  name: string;
  description: string;
  base_price: number;
  included_seats: number;
  price_per_seat: number;
  module_quota: number;
  is_all_access: boolean;
  is_active: boolean;
}

export interface ProductSuite {
  key: string;
  name: string;
  tagline: string;
  icon: string;
  color: string;
  is_active: boolean;
  sort_order: number;
}

export interface SuiteWithPlans extends ProductSuite {
  plans: SubscriptionPlan[];
  modules: ApiModule[] | null;
}

// ── API calls ────────────────────────────────────────────────────────────────

/** GET /public/modules — katalog modul berbayar yang tersedia (is_listed=true) */
export async function fetchCatalogModules(): Promise<ApiModule[]> {
  const { ok, data } = await apiFetch<{ success: boolean; modules: ApiModule[] }>(
    "/public/modules"
  );
  if (!ok || !data?.success) return [];
  return data.modules ?? [];
}

/** GET /public/suites — semua suite beserta plan & modul (untuk pricing page) */
export async function fetchSuites(): Promise<SuiteWithPlans[]> {
  const { ok, data } = await apiFetch<{ success: boolean; suites: SuiteWithPlans[] }>(
    "/public/suites"
  );
  if (!ok || !data?.success) return [];
  return data.suites ?? [];
}

// ── Format helpers ────────────────────────────────────────────────────────────
export const formatIDR = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;
