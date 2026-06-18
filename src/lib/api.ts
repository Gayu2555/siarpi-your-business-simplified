// Base URL untuk BelajarAPI / siarpi-backend
export const API_BASE_URL = "https://api.siarpi.com";

export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

// Generic fetch wrapper — auto attach Authorization header kalau ada token
export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<{ ok: boolean; status: number; data: T }> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("siarpi_token") : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers ?? {}),
  };

  const res = await fetch(apiUrl(path), {
    ...options,
    headers,
  });

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    // response kosong / bukan JSON
  }

  return { ok: res.ok, status: res.status, data };
}