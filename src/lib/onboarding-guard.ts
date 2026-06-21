import { redirect } from "@tanstack/react-router";
import { isAuthenticated } from "./auth";
import { getOnboardingStatus } from "./company-api";

export async function guardOnboardingRoute(
  currentPath: "/onboarding" | "/checkout" | "/payment" | "/dashboard",
  searchId?: string
) {
  if (typeof window === "undefined") {
    return;
  }

  if (!isAuthenticated()) {
    throw redirect({ to: "/login", search: { redirect: currentPath } });
  }

  const { ok, data } = await getOnboardingStatus();
  if (!ok || !data) {
    // Fallback aman jika API gagal merespons, biarkan user melanjutkan
    return;
  }

  // 1. Belum punya perusahaan -> wajib ke onboarding
  if (!data.has_company) {
    if (currentPath !== "/onboarding") {
      throw redirect({ to: "/onboarding" });
    }
    return;
  }

  // 2. Sudah punya perusahaan
  // - Dashboard selalu boleh diakses
  if (currentPath === "/dashboard") {
    return;
  }

  // - Onboarding boleh diakses untuk mendaftar modul baru
  if (currentPath === "/onboarding") {
    return;
  }

  // - Checkout & Payment boleh diakses jika sesuai dengan pending checkout
  if (data.has_pending_checkout && data.pending_checkout_id) {
    if (currentPath === "/checkout" && searchId === data.pending_checkout_id) {
      return;
    }
    if (currentPath === "/payment" && searchId === data.pending_checkout_id) {
      return;
    }
    // Jika mencoba akses checkout/payment dengan ID lain/kosong, redirect ke yang benar
    if (currentPath === "/checkout" || currentPath === "/payment") {
      throw redirect({ to: "/checkout", search: { id: data.pending_checkout_id } });
    }
  }
}
