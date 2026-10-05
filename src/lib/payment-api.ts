// ─────────────────────────────────────────────────────────────────────────────
// payment-api.ts — typed client untuk Midtrans Core API endpoints
// Mirror dari backend payments/core_handler.go
// ─────────────────────────────────────────────────────────────────────────────

import { apiFetch } from "@/lib/api";

export type PaymentMethod =
  | "qris"
  | "gopay"
  | "shopeepay"
  | "bca"
  | "bni"
  | "bri"
  | "cimb"
  | "permata"
  | "danamon"
  | "maybank"
  | "bsm"
  | "doku"
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
  // Mayar: branch status di CoreHandler.go mengembalikan payment_status di
  // root, bukan di data. Tanpa field ini polling di payment.tsx diam-diam
  // selalu bail di `if (!ok || !data?.data?.transaction_status) return`.
  payment_status?: string;
}

/**
 * Status endpoint punya dua bentuk tergantung provider:
 *   - Midtrans → `{ success, data: { transaction_status } }`
 *   - Mayar    → `{ success, payment_status }`
 * Polling harus baca keduanya, kalau tidak payment kedua provider tidak akan
 * pernah terdeteksi sukses.
 */
export function resolveStatus(resp: StatusResponse | null | undefined): string | null {
  if (!resp) return null;
  const raw = resp.data?.transaction_status ?? resp.payment_status;
  return typeof raw === "string" && raw.trim() ? raw.trim().toLowerCase() : null;
}

/**
 * Detail pembayaran yang bisa ditampilkan langsung di halaman (QR / VA /
 * biller). Kalau semuanya kosong tapi ada deeplink, itu berarti gateway
 * menawarkan lewat hosted page — lihat hostedPaymentLink.
 */
export function hasInlinePaymentDetails(r: ChargeResponse | null): boolean {
  if (!r) return false;
  return Boolean(r.qr_code_url || r.va_number || (r.bill_key && r.biller_code));
}

/**
 * Link ke hosted payment page gateway. Hanya dipakai kalau TIDAK ada detail
 * inline: Mayar selalu mengembalikan `link` dan tidak pernah mengirim VA/QR.
 *
 * Midtrans juga mengisi deeplink_url, TAPI selalu berpasangan dengan
 * qr_code_url (lihat CoreHandler.go: case gopay/qris yang set keduanya),
 * jadi syarat "deeplink ada, detail inline tidak ada" hanya cocok untuk
 * Mayar — tidak akan salah_sortir QRIS/GoPay milik Midtrans.
 */
export function hostedPaymentLink(r: ChargeResponse | null): string | null {
  if (!r?.deeplink_url) return null;
  if (hasInlinePaymentDetails(r)) return null;
  return r.deeplink_url;
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
 * Status INTERNAL yang kita tulis sendiri ke payment_transactions: selalu
 * "paid", ditulis webhook provider mana pun (MayarCallback.go, DokuCallback.go,
 * Callback.go via resolveStatus yang memetakan settlement/capture -> paid).
 * Branch non-Midtrans di CoreHandler.go GetStatus membaca kolom status dari
 * DB, jadi "paid" harus dikenali supaya polling berhenti dengan benar.
 *
 * CATATAN: tidak ada status internal "settled" -- itu hanya ada di sisi
 * gateway DOKU ("SETTLED", dokuStatusIsPaid di CancelHandler.go) dan tidak
 * pernah ditulis ke database. Jangan ditambahkan ke sini.
 */
export const INTERNAL_SUCCESS_STATUSES = ["paid"];

export const SUCCESS_STATUSES = [...MIDTRANS_SUCCESS_STATUSES, ...INTERNAL_SUCCESS_STATUSES];

/**
 * Status yang dianggap "selesai, gagal" — berhenti polling. Cermin dari
 * resolveStatus di Callback.go: deny/cancel/expire/failure/failed.
 */
export const FAILED_STATUSES = ["deny", "cancel", "expire", "failure", "failed"];
