// ─────────────────────────────────────────────────────────────────────────────
// blog-api.ts — klien untuk Blog CMS (MongoDB Atlas).
// Mirror dari backend blog/models.go & blog/handlers.go.
//
// Hanya endpoint PUBLIK yang dipakai di sini:
//   GET /public/blogs         -> daftar artikel published (paginasi + cari)
//   GET /public/blogs/{slug}  -> satu artikel published
// Endpoint /platform-admin/blogs milik dashboard admin, bukan landing page.
// ─────────────────────────────────────────────────────────────────────────────

import { API_BASE_URL, apiFetch } from "@/lib/api";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  /** Kosong pada hasil List — backend membuangnya lewat projection. */
  content_markdown?: string;
  thumbnail_url: string;
  thumbnail_alt: string;
  tags: string[] | null;
  status: "draft" | "published" | "archived";
  author_id: string;
  author_email: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface BlogListResult {
  posts: BlogPost[];
  totalItems: number;
  page: number;
  pageSize: number;
}

interface ListEnvelope {
  success: boolean;
  posts: BlogPost[] | null;
  total_items: number;
  page: number;
  page_size: number;
}

interface PostEnvelope {
  success: boolean;
  post?: BlogPost;
}

/**
 * Gambar dari backend disimpan sebagai path RELATIF ("/blog/files/blog-xxx")
 * karena disajikan oleh API, bukan oleh landing page. Untuk `og:image` dan
 * JSON-LD, URL WAJIB absolut — crawler tidak menebak host-nya.
 */
export function absoluteMediaUrl(path: string | undefined | null): string {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** GET /public/blogs — daftar artikel yang sudah terbit. */
export async function fetchPublishedPosts(options: {
  page?: number;
  pageSize?: number;
  q?: string;
}): Promise<BlogListResult> {
  const params = new URLSearchParams();
  params.set("page", String(options.page ?? 1));
  params.set("page_size", String(options.pageSize ?? 12));
  if (options.q?.trim()) params.set("q", options.q.trim());

  const { ok, data } = await apiFetch<ListEnvelope>(`/public/blogs?${params.toString()}`);
  if (!ok || !data?.success) {
    // Blog mati TIDAK boleh menjatuhkan halaman — indeks tetap tampil dengan
    // artikel bawaan, dan pembaca melihat daftar kosong, bukan error 500.
    return { posts: [], totalItems: 0, page: options.page ?? 1, pageSize: options.pageSize ?? 12 };
  }
  return {
    posts: data.posts ?? [],
    totalItems: data.total_items ?? 0,
    page: data.page ?? 1,
    pageSize: data.page_size ?? 12,
  };
}

/** GET /public/blogs/{slug} — null kalau tidak ada / belum terbit. */
export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  const { ok, data } = await apiFetch<PostEnvelope>(`/public/blogs/${encodeURIComponent(slug)}`);
  if (!ok || !data?.success || !data.post) return null;
  return data.post;
}

// ── Turunan tampilan ─────────────────────────────────────────────────────────

/** Perkiraan waktu baca, 200 kata/menit, minimal 1 menit. */
export function estimateReadingMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** "20 Juli 2026" — sama seperti format publishedDate artikel bawaan. */
export function formatPostDate(iso: string | undefined): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

const INDONESIAN_MONTHS = [
  "januari",
  "februari",
  "maret",
  "april",
  "mei",
  "juni",
  "juli",
  "agustus",
  "september",
  "oktober",
  "november",
  "desember",
];

/**
 * "20 Juli 2026" -> "2026-07-20T00:00:00.000Z".
 *
 * Artikel bawaan di lib/articles.ts menyimpan tanggal sebagai teks Indonesia,
 * sementara `datePublished` di JSON-LD dan `article:published_time` menuntut
 * ISO 8601. Tanpa konversi ini, 3 artikel lama kehilangan sinyal tanggal di
 * hasil pencarian. Mengembalikan undefined kalau formatnya tidak dikenali —
 * lebih baik tanpa tanggal daripada tanggal ngawur.
 */
export function parseIndonesianDate(value: string): string | undefined {
  const match = /^(\d{1,2})\s+([A-Za-zÀ-ÿ]+)\s+(\d{4})$/.exec(value.trim());
  if (!match) return undefined;
  const [, day, monthName, year] = match;
  const monthIndex = INDONESIAN_MONTHS.indexOf(monthName!.toLowerCase());
  if (monthIndex < 0) return undefined;
  return new Date(Date.UTC(Number(year), monthIndex, Number(day))).toISOString();
}

/**
 * Ambil heading level-2 dari Markdown untuk daftar isi.
 * Baris di dalam blok kode (```) diabaikan supaya komentar "## " di contoh
 * kode tidak ikut jadi heading.
 */
export function extractHeadings(markdown: string): { id: string; heading: string }[] {
  const headings: { id: string; heading: string }[] = [];
  let insideFence = false;

  for (const line of markdown.split("\n")) {
    if (line.trimStart().startsWith("```")) {
      insideFence = !insideFence;
      continue;
    }
    if (insideFence) continue;

    const match = /^##\s+(.+?)\s*$/.exec(line);
    if (match?.[1]) {
      headings.push({ id: slugifyHeading(match[1]), heading: match[1] });
    }
  }
  return headings;
}

/** Harus sama persis dengan id yang dipasang renderer supaya anchor-nya nyambung. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
