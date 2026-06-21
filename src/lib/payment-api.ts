// ─────────────────────────────────────────────────────────────────────────────
// payment-api.ts — typed client untuk Midtrans Core API endpoints
// Mirror dari backend payments/core_handler.go
// ─────────────────────────────────────────────────────────────────────────────

import { apiFetch } from "@/lib/api";

export type PaymentMethod =
    | "qris" | "gopay" | "shopeepay"
    | "bca" | "bni" | "bri" | "cimb" | "permata" | "mandiri";

export interface ChargeRequest {
    payment_method: PaymentMethod;
    order_id: string;       // = checkout_id
    checkout_id: string;
    gross_amount: number;
    customer?: { first_name?: string; email?: string; phone?: string };
    callback_url?: string;
}

export interface ChargeResponse {
    success: boolean;
    message?: string;
    order_id?: string;
    transaction_id?: string;
    status?: string; // "pending" | "settlement" | "capture" | "deny" | "expire" | "cancel"
    gross_amount?: string;
    payment_method?: string;
    // QRIS / GoPay
    qr_code_url?: string;
    deeplink_url?: string;
    // Bank transfer VA
    bank?: string;
    va_number?: string;
    // Mandiri echannel
    biller_code?: string;
    bill_key?: string;
}

export interface StatusResponse {
    success: boolean;
    data?: {
        transaction_status?: string;
        [key: string]: unknown;
    };
}

/** POST /payments/charge */
export async function chargePayment(
    payload: ChargeRequest
): Promise<{ ok: boolean; data: ChargeResponse | null }> {
    const { ok, data } = await apiFetch<ChargeResponse>("/payments/charge", {
        method: "POST",
        body: JSON.stringify(payload),
    });
    return { ok: ok && !!data?.success, data };
}

/** GET /payments/status?order_id=xxx — dipakai untuk polling status pembayaran. */
export async function getPaymentStatus(
    orderId: string
): Promise<{ ok: boolean; data: StatusResponse | null }> {
    const { ok, data } = await apiFetch<StatusResponse>(`/payments/status?order_id=${encodeURIComponent(orderId)}`);
    return { ok: ok && !!data?.success, data };
}

/** Status Midtrans yang dianggap "selesai, sukses" */
export const SUCCESS_STATUSES = ["settlement", "capture"];
/** Status Midtrans yang dianggap "selesai, gagal" — berhenti polling */
export const FAILED_STATUSES = ["deny", "cancel", "expire", "failure"];