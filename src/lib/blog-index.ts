// ─────────────────────────────────────────────────────────────────────────────
// blog-index.ts — menyatukan DUA sumber artikel jadi satu daftar.
//
//   1. articlesRegistry (lib/articles.ts) — artikel bawaan terstruktur,
//      formatnya terstruktur (section/callout/FAQ) dan sudah punya nilai SEO
//      di URL /artikel/{slug}. Sengaja TIDAK dimigrasikan.
//   2. Blog CMS di MongoDB Atlas — artikel Markdown yang ditulis lewat
//      dashboard admin.
//
// Keduanya hidup di path yang sama (/artikel/{slug}) supaya cuma ada satu
// jalur blog, dan halaman indeks menampilkannya bercampur, terurut tanggal.
// ─────────────────────────────────────────────────────────────────────────────

import { articlesRegistry } from "@/lib/articles";
import {
  absoluteMediaUrl,
  formatPostDate,
  parseIndonesianDate,
  type BlogPost,
} from "@/lib/blog-api";

export interface BlogIndexItem {
  slug: string;
  title: string;
  excerpt: string;
  /** URL absolut, atau "" kalau artikel tidak punya gambar. */
  thumbnailUrl: string;
  thumbnailAlt: string;
  tags: string[];
  /** ISO 8601, dipakai untuk urutan & JSON-LD. */
  publishedAt?: string;
  /** Sudah diformat untuk ditampilkan, mis. "20 Juli 2026". */
  displayDate: string;
  readTime: string;
  source: "cms" | "bawaan";
}

export function fromCmsPost(post: BlogPost): BlogIndexItem {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    thumbnailUrl: absoluteMediaUrl(post.thumbnail_url),
    thumbnailAlt: post.thumbnail_alt || post.title,
    tags: post.tags ?? [],
    publishedAt: post.published_at,
    displayDate: formatPostDate(post.published_at ?? post.created_at),
    readTime: "",
    source: "cms",
  };
}

export function builtInArticles(): BlogIndexItem[] {
  return Object.values(articlesRegistry).map((article) => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.summary,
    thumbnailUrl: "",
    thumbnailAlt: article.title,
    tags: [article.category],
    publishedAt: parseIndonesianDate(article.publishedDate),
    displayDate: article.publishedDate,
    readTime: article.readTime,
    source: "bawaan",
  }));
}

/**
 * Gabungkan kedua sumber, buang duplikat slug, urutkan terbaru dulu.
 *
 * Kalau ada slug yang sama di dua sumber, yang BAWAAN menang — sama seperti
 * urutan pengecekan di loader /artikel/$slug, supaya daftar dan halaman detail
 * tidak pernah menampilkan artikel yang berbeda untuk URL yang sama.
 */
export function mergeArticleSources(cmsPosts: BlogPost[]): BlogIndexItem[] {
  const builtIn = builtInArticles();
  const seen = new Set(builtIn.map((item) => item.slug));

  const merged = [...builtIn];
  for (const post of cmsPosts) {
    if (seen.has(post.slug)) continue;
    seen.add(post.slug);
    merged.push(fromCmsPost(post));
  }

  return merged.sort((a, b) => {
    // Artikel tanpa tanggal ditaruh paling belakang, bukan paling depan.
    const left = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const right = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return right - left;
  });
}

/** Semua tag unik dari daftar, untuk filter di halaman indeks. */
export function collectTags(items: BlogIndexItem[]): string[] {
  const tags = new Set<string>();
  for (const item of items) {
    for (const tag of item.tags) tags.add(tag);
  }
  return [...tags].sort((a, b) => a.localeCompare(b, "id-ID"));
}

/** Filter sisi klien untuk pencarian & tag pada daftar gabungan. */
export function filterArticles(
  items: BlogIndexItem[],
  options: { q?: string; tag?: string },
): BlogIndexItem[] {
  const query = options.q?.trim().toLowerCase();
  const tag = options.tag?.trim().toLowerCase();

  return items.filter((item) => {
    if (tag && !item.tags.some((t) => t.toLowerCase() === tag)) return false;
    if (!query) return true;
    return (
      item.title.toLowerCase().includes(query) ||
      item.excerpt.toLowerCase().includes(query) ||
      item.tags.some((t) => t.toLowerCase().includes(query))
    );
  });
}
