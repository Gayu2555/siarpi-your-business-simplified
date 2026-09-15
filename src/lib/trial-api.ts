import { apiFetch } from "@/lib/api";

export type TrialState = "not_started" | "active" | "expired" | "converted" | "cancelled";

export interface TrialStatus {
  eligible: boolean;
  has_used_trial: boolean;
  is_active: boolean;
  status: TrialState;
  duration_days: number;
  days_remaining: number;
  started_at?: string;
  ends_at?: string;
}

interface TrialResponse {
  success: boolean;
  message?: string;
  data?: TrialStatus;
}

export async function getFreeTrialStatus(): Promise<{
  ok: boolean;
  status: number;
  data: TrialStatus | null;
  message?: string;
}> {
  const response = await apiFetch<TrialResponse>("/company/trial");
  return {
    ok: response.ok && !!response.data?.success,
    status: response.status,
    data: response.data?.data ?? null,
    message: response.data?.message,
  };
}

export async function startFreeTrial(): Promise<{
  ok: boolean;
  status: number;
  data: TrialStatus | null;
  message?: string;
}> {
  const response = await apiFetch<TrialResponse>("/company/trial/start", {
    method: "POST",
  });
  return {
    ok: response.ok && !!response.data?.success,
    status: response.status,
    data: response.data?.data ?? null,
    message: response.data?.message,
  };
}
