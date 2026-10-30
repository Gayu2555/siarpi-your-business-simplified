// ─────────────────────────────────────────────────────────────────────────────
// checkout-api.ts — typed client untuk POST/GET /checkout
// Mirror dari backend checkout/handler.go
// ─────────────────────────────────────────────────────────────────────────────

import { apiFetch } from "@/lib/api";

export interface CheckoutItem {
  module_key: string;
  module_name: string;
  price: number;
  /** Modul ini sudah termasuk harga paket (baris harga 0). */
  included_in_plan?: boolean;
  target_expires_at?: string;
}

/** Snapshot paket untuk checkout berbasis plan. */
export interface CheckoutPlan {
  suite_key: string;
  key: string;
  name: string;
  base_price: number;
  included_seats: number;
  included_employees?: number;
  is_all_access: boolean;
  /**
   * Potongan SEKALI di checkout ini untuk modul ketengan yang masih aktif
   * dan ikut dalam paket (backend: planModuleCredit). Bukan bagian harga
   * langganan — siklus recurring berikutnya menagih base_price penuh.
   */
  module_credit?: number;
  period_start: string;
  period_end: string;
}

export interface Checkout {
  id: string;
  company_id: string;
  user_id: string;
  status: "pending" | "paid" | "expired" | "cancelled";
  subtotal: number;
  service_fee: number;
  total: number;
  payment_method?: string;
  plan?: CheckoutPlan;
  items: CheckoutItem[];
  expires_at: string;
  paid_at?: string;
  created_at: string;
  /** Gateway untuk checkout aktif: selalu Midtrans. */
  payment_gateway?: string;
  /**
   * Batas metode tambahan dari backend. Kosong/tidak ada = tampilkan daftar
   * kanal Midtrans yang memang didukung UI.
   */
  payment_methods?: string[];
}

export interface CheckoutResponse {
  success: boolean;
  message: string;
  checkout?: Checkout;
}

export interface CreateCheckoutRequest {
  company_id: string;
  user_id: string;
  /** Checkout ketengan: daftar modul. Kosongkan untuk checkout paket. */
  module_keys?: string[];
  /** Checkout paket: isi suite_key + plan_key. */
  suite_key?: string;
  plan_key?: string;
}

/**
 * Pilihan paket yang dibawa dari kartu pricing ke /plan-checkout.
 * Disimpan di sessionStorage supaya login redirect (yang cuma membawa path)
 * tidak menghilangkan pilihan user.
 */
export interface PlanIntent {
  suite_key: string;
  plan_key: string;
  plan_name: string;
}

const PLAN_INTENT_KEY = "siarpi_plan_intent";

export function savePlanIntent(intent: PlanIntent) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PLAN_INTENT_KEY, JSON.stringify(intent));
}

export function readPlanIntent(): PlanIntent | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(PLAN_INTENT_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<PlanIntent>;
    if (!parsed.suite_key || !parsed.plan_key) return null;
    return {
      suite_key: parsed.suite_key,
      plan_key: parsed.plan_key,
      plan_name: parsed.plan_name ?? parsed.plan_key,
    };
  } catch {
    return null;
  }
}

export function clearPlanIntent() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(PLAN_INTENT_KEY);
}

/** POST /checkout — buat pending order dari modul yang dipilih saat onboarding. */
export async function createCheckout(
  payload: CreateCheckoutRequest,
): Promise<{ ok: boolean; data: CheckoutResponse | null }> {
  const { ok, data } = await apiFetch<CheckoutResponse>("/checkout", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return { ok: ok && !!data?.success, data };
}

/** GET /checkout/{id} */
export async function getCheckout(
  checkoutId: string,
): Promise<{ ok: boolean; data: CheckoutResponse | null }> {
  const { ok, data } = await apiFetch<CheckoutResponse>(`/checkout/${checkoutId}`);
  return { ok: ok && !!data?.success, data };
}

/** PATCH /checkout/{id}/payment-method */
export async function selectPaymentMethod(
  checkoutId: string,
  paymentMethod: string,
): Promise<{ ok: boolean; data: CheckoutResponse | null }> {
  const { ok, data } = await apiFetch<CheckoutResponse>(`/checkout/${checkoutId}/payment-method`, {
    method: "PATCH",
    body: JSON.stringify({ payment_method: paymentMethod }),
  });
  return { ok: ok && !!data?.success, data };
}
