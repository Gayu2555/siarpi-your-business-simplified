// Base URL untuk BelajarAPI / siarpi-backend.
//
// Bisa ditimpa lewat VITE_API_BASE_URL (mis. isi .env.local dengan
// VITE_API_BASE_URL=http://localhost:4000) supaya `npm run dev` tidak
// menembak database PRODUKSI -- yang sebelumnya terjadi karena nilai ini
// dipaku ke api.siarpi.com tanpa jalan keluar apa pun.
//
// Development memakai backend lokal agar route yang belum masuk deployment
// produksi tidak menyebabkan 404/CORS. Nilai eksplisit selalu diprioritaskan.
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "http://localhost:4000" : "https://api.siarpi.com");

export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export interface ApiFetchOptions extends RequestInit {
  /** Endpoint publik tidak perlu membawa token pengguna. */
  auth?: boolean;
}

// Generic fetch wrapper — auto attach Authorization header kalau ada token
export async function apiFetch<T = any>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<{ ok: boolean; status: number; data: T }> {
  const { auth = true, ...requestOptions } = options;
  const token = typeof window !== "undefined" ? localStorage.getItem("siarpi_token") : null;

  const headers = new Headers(requestOptions.headers);
  const isFormData =
    typeof FormData !== "undefined" && requestOptions.body instanceof FormData;

  if (requestOptions.body != null && !isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (auth && token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(apiUrl(path), {
    ...requestOptions,
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
