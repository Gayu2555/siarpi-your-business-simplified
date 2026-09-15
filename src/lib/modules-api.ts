// ─────────────────────────────────────────────────────────────────────────────
// modules-api.ts — data fetching ONLY, no React components
// Safe to import in SSR/loader context.
// For icon rendering use @/lib/icon-resolver instead.
// ─────────────────────────────────────────────────────────────────────────────

import { apiFetch } from "@/lib/api";

const PUBLIC_CATALOG_TIMEOUT_MS = 5_000;
const UNRELEASED_MODULE_KEYS = new Set(["pos"]);

export function isReleasedModule(moduleKey: string): boolean {
  return !UNRELEASED_MODULE_KEYS.has(moduleKey.trim().toLowerCase());
}

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
    "/public/modules",
    { auth: false, signal: AbortSignal.timeout(PUBLIC_CATALOG_TIMEOUT_MS) },
  );
  if (!ok || !data?.success) return [];
  return (data.modules ?? []).filter((module) => isReleasedModule(module.key));
}

/** GET /public/suites — semua suite beserta plan & modul (untuk pricing page) */
export async function fetchSuites(): Promise<SuiteWithPlans[]> {
  const { ok, data } = await apiFetch<{ success: boolean; suites: SuiteWithPlans[] }>(
    "/public/suites",
    { auth: false, signal: AbortSignal.timeout(PUBLIC_CATALOG_TIMEOUT_MS) },
  );
  if (!ok || !data?.success) return [];
  return (data.suites ?? []).map((suite) => ({
    ...suite,
    modules: suite.modules?.filter((module) => isReleasedModule(module.key)) ?? null,
  }));
}

export interface ModuleWithStatus extends ApiModule {
  status: string; // "active" | "available" | "pending_payment"
  included_in_plan: boolean;
}

export interface CompanyModulesResponse {
  hasActiveDashboard: boolean;
  ownedModules: ModuleWithStatus[];
  availableModules: ModuleWithStatus[];
  pendingModuleKeys: string[];
}

/** GET /company/modules — ambil modul yang dimiliki company dan modul yang tersedia */
export async function fetchCompanyModules(): Promise<CompanyModulesResponse | null> {
  const token = typeof window !== "undefined" ? localStorage.getItem("siarpi_token") : null;
  if (!token) return null;

  const { ok, status, data } = await apiFetch<{ success: boolean; data: CompanyModulesResponse }>(
    "/company/modules",
  );
  if (!ok || status === 401 || !data?.success) return null;
  return {
    ...data.data,
    ownedModules: data.data.ownedModules.filter((module) => isReleasedModule(module.key)),
    availableModules: data.data.availableModules.filter((module) => isReleasedModule(module.key)),
    pendingModuleKeys: data.data.pendingModuleKeys.filter(isReleasedModule),
  };
}
