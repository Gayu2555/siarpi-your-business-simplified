// ─────────────────────────────────────────────────────────────────────────────
// payment-api.ts — typed client untuk endpoint pembayaran Midtrans
// Mirror dari backend payments/core_handler.go
// ─────────────────────────────────────────────────────────────────────────────

import { apiFetch } from "@/lib/api";

export type PaymentMethod =
  | "qris"
  | "gopay"
  | "bsi"
  | "bni"
  | "bri"
  | "cimb"
  | "permata"
  | "mandiri";

export interface ChargeRequest {
  payment_method: PaymentMethod;
  order_id: string; // = checkout_id
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
  // Midtrans Snap untuk BSI VA
  redirect_url?: string;
  // Bank transfer VA
  bank?: string;
  va_number?: string;
  // Mandiri echannel
  biller_code?: string;
  bill_key?: string;
}

export interface StatusResponse {
  success: boolean;
  // Midtrans: status dibungkus di data.transaction_status
  data?: {
    transaction_status?: string;
    [key: string]: unknown;
  };
  // Midtrans juga mengirim ringkasan status internal di root selain detail
  // gateway di data. Polling membaca keduanya lewat resolveStatus.
  payment_status?: string;
}

/**
 * Samakan dua bentuk response status Midtrans menjadi satu string lowercase.
 * Detail transaksi tersedia di data.transaction_status; status internal juga
 * tersedia di payment_status pada root response.
 */
export function resolveStatus(resp: StatusResponse | null | undefined): string | null {
  if (!resp) return null;
  const raw = resp.data?.transaction_status ?? resp.payment_status;
  return typeof raw === "string" && raw.trim() ? raw.trim().toLowerCase() : null;
}

/** POST /payments/charge */
export async function chargePayment(
  payload: ChargeRequest,
): Promise<{ ok: boolean; data: ChargeResponse | null }> {
  const { ok, data } = await apiFetch<ChargeResponse>("/payments/charge", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return { ok: ok && !!data?.success, data };
}

/** GET /payments/status?order_id=xxx — dipakai untuk polling status pembayaran. */
export async function getPaymentStatus(
  orderId: string,
): Promise<{ ok: boolean; data: StatusResponse | null }> {
  const { ok, data } = await apiFetch<StatusResponse>(
    `/payments/status?order_id=${encodeURIComponent(orderId)}`,
  );
  return { ok: ok && !!data?.success, data };
}

/**
 * Status Midtrans yang dianggap "selesai, sukses" — settlement/capture.
 */
export const MIDTRANS_SUCCESS_STATUSES = ["settlement", "capture"];

/**
 * Status INTERNAL yang ditulis webhook Midtrans ke payment_transactions:
 * settlement/capture dipetakan menjadi "paid". Nilai ini dikenali selain
 * status mentah Midtrans supaya polling berhenti dengan benar.
 */
export const INTERNAL_SUCCESS_STATUSES = ["paid"];

export const SUCCESS_STATUSES = [...MIDTRANS_SUCCESS_STATUSES, ...INTERNAL_SUCCESS_STATUSES];

/**
 * Status yang dianggap "selesai, gagal" — berhenti polling. Cermin dari
 * resolveStatus di Callback.go: deny/cancel/expire/failure/failed.
 */
export const FAILED_STATUSES = ["deny", "cancel", "expire", "failure", "failed"];
