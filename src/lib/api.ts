// Seluruh build memakai API production secara default. Environment khusus
// tetap dapat memilih endpoint lain secara eksplisit melalui VITE_API_BASE_URL.
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/+$/, "") || "https://api.siarpi.com";

export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export interface ApiFetchOptions extends RequestInit {
  /** Endpoint publik tidak perlu membawa token pengguna. */
  auth?: boolean;
}

// Generic fetch wrapper — auto attach Authorization header kalau ada token.
// Default T = any disengaja: sebagian pemanggil tidak menentukan tipe dan
// mengandalkan optional chaining di data; memaksa unknown akan mematahkan
// 20+ call site tanpa menambah keamanan.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function apiFetch<T = any>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<{ ok: boolean; status: number; data: T }> {
  const { auth = true, ...requestOptions } = options;
  const token = typeof window !== "undefined" ? localStorage.getItem("siarpi_token") : null;

  const headers = new Headers(requestOptions.headers);
  const isFormData = typeof FormData !== "undefined" && requestOptions.body instanceof FormData;

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

  let data: T | null = null;
  try {
    data = await res.json();
  } catch {
    // response kosong / bukan JSON
  }
  return { ok: res.ok, status: res.status, data: data as T };
}
