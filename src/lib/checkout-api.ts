// ─────────────────────────────────────────────────────────────────────────────
// checkout-api.ts — typed client untuk POST/GET /checkout
// Mirror dari backend checkout/handler.go
// ─────────────────────────────────────────────────────────────────────────────

import { apiFetch } from "@/lib/api";

export interface CheckoutItem {
    module_key: string;
    module_name: string;
    price: number;
}

export interface Checkout {
    id: string;
    company_id: string;
    user_id: string;
    status: "pending" | "paid" | "expired" | "cancelled";
    subtotal: number;
    total: number;
    payment_method?: string;
    items: CheckoutItem[];
    expires_at: string;
    paid_at?: string;
    created_at: string;
}

export interface CheckoutResponse {
    success: boolean;
    message: string;
    checkout?: Checkout;
}

export interface CreateCheckoutRequest {
    company_id: string;
    user_id: string;
    module_keys: string[];
}

/** POST /checkout — buat pending order dari modul yang dipilih saat onboarding. */
export async function createCheckout(
    payload: CreateCheckoutRequest
): Promise<{ ok: boolean; data: CheckoutResponse | null }> {
    const { ok, data } = await apiFetch<CheckoutResponse>("/checkout", {
        method: "POST",
        body: JSON.stringify(payload),
    });
    return { ok: ok && !!data?.success, data };
}

/** GET /checkout/{id} */
export async function getCheckout(
    checkoutId: string
): Promise<{ ok: boolean; data: CheckoutResponse | null }> {
    const { ok, data } = await apiFetch<CheckoutResponse>(`/checkout/${checkoutId}`);
    return { ok: ok && !!data?.success, data };
}

/** PATCH /checkout/{id}/payment-method */
export async function selectPaymentMethod(
    checkoutId: string,
    paymentMethod: string
): Promise<{ ok: boolean; data: CheckoutResponse | null }> {
    const { ok, data } = await apiFetch<CheckoutResponse>(`/checkout/${checkoutId}/payment-method`, {
        method: "PATCH",
        body: JSON.stringify({ payment_method: paymentMethod }),
    });
    return { ok: ok && !!data?.success, data };
}