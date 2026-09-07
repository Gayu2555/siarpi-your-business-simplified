// Base URL untuk BelajarAPI / siarpi-backend.
//
// Bisa ditimpa lewat VITE_API_BASE_URL (mis. isi .env.local dengan
// VITE_API_BASE_URL=http://localhost:4000) supaya `npm run dev` tidak
// menembak database PRODUKSI -- yang sebelumnya terjadi karena nilai ini
// dipaku ke api.siarpi.com tanpa jalan keluar apa pun.
//
// Default-nya tetap produksi supaya deploy yang tidak menyetel env var ini
// berperilaku persis seperti sebelumnya.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.siarpi.com";

export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

// Generic fetch wrapper — auto attach Authorization header kalau ada token
export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {},
): Promise<{ ok: boolean; status: number; data: T }> {
  const token = typeof window !== "undefined" ? localStorage.getItem("siarpi_token") : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers ?? {}),
  };

  const res = await fetch(apiUrl(path), {
    ...options,
    headers,
  });

  if (res.status === 401 && typeof window !== "undefined") {
    localStorage.removeItem("siarpi_token");
    localStorage.removeItem("siarpi_user");
  }

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    // response kosong / bukan JSON
  }

  return { ok: res.ok, status: res.status, data };
}
