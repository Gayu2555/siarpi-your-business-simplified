// ─────────────────────────────────────────────────────────────────────────────
// seo.ts — pembangun metadata halaman.
//
// Pola dasarnya diangkat dari routes/hr.tsx yang sudah punya JSON-LD +
// canonical + OG lengkap, lalu dijadikan satu tempat supaya halaman blog tidak
// menyalin-tempel dan tidak ada field yang kelewat. Halaman artikel sebelumnya
// cuma punya title/description/og seadanya: tanpa canonical, tanpa og:image,
// tanpa tanggal terbit, dan tanpa JSON-LD sama sekali.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_URL = "https://siarpi.com";
export const SITE_NAME = "Siarpi";
export const SITE_LOGO = `${SITE_URL}/logo.png`;
/** Dipakai kalau artikel belum punya thumbnail. */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/dashboard-preview.jpg`;

export type MetaTag = Record<string, string>;
export type LinkTag = Record<string, string>;

export function canonicalUrl(path: string): string {
  if (!path || path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export interface ArticleSeoInput {
  title: string;
  description: string;
  /** Path relatif situs, mis. "/artikel/slug-artikel". */
  path: string;
  /** URL ABSOLUT. Relatif akan diabaikan crawler. */
  imageUrl?: string;
  imageAlt?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
  tags?: string[];
  /** Judul <title>; kalau kosong dipakai `${title} | Siarpi Blog`. */
  metaTitle?: string;
}

/**
 * Meta lengkap untuk satu artikel: dasar + Open Graph + Twitter + sinyal
 * artikel (tanggal terbit/ubah, tag). Semua dalam satu bentuk yang bisa
 * langsung dikembalikan dari `head()` TanStack Router.
 */
export function articleMeta(input: ArticleSeoInput): MetaTag[] {
  const title = input.metaTitle ?? `${input.title} | ${SITE_NAME} Blog`;
  const url = canonicalUrl(input.path);
  const image = input.imageUrl || DEFAULT_OG_IMAGE;

  const meta: MetaTag[] = [
    { title },
    { name: "description", content: input.description },
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },

    { property: "og:type", content: "article" },
    { property: "og:title", content: title },
    { property: "og:description", content: input.description },
    { property: "og:url", content: url },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "id_ID" },
    { property: "og:image", content: image },
    { property: "og:image:alt", content: input.imageAlt || input.title },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@Siarpi" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: input.description },
    { name: "twitter:image", content: image },
  ];

  if (input.publishedTime) {
    meta.push({ property: "article:published_time", content: input.publishedTime });
  }
  if (input.modifiedTime) {
    meta.push({ property: "article:modified_time", content: input.modifiedTime });
  }
  if (input.authorName) {
    meta.push({ name: "author", content: input.authorName });
    meta.push({ property: "article:author", content: input.authorName });
  }
  for (const tag of input.tags ?? []) {
    meta.push({ property: "article:tag", content: tag });
  }

  return meta;
}

/** JSON-LD schema.org Article — sumber rich result di hasil pencarian. */
export function articleJsonLd(input: ArticleSeoInput) {
  const url = canonicalUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: [input.imageUrl || DEFAULT_OG_IMAGE],
    datePublished: input.publishedTime,
    dateModified: input.modifiedTime ?? input.publishedTime,
    author: { "@type": "Organization", name: input.authorName || SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: SITE_LOGO },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "id-ID",
    keywords: (input.tags ?? []).join(", ") || undefined,
  };
}

/** JSON-LD BreadcrumbList — memunculkan jejak navigasi di hasil pencarian. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

/** JSON-LD untuk halaman indeks blog. */
export function blogListJsonLd(posts: { title: string; path: string; publishedTime?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Business Blog`,
    url: canonicalUrl("/blog"),
    inLanguage: "id-ID",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: canonicalUrl(post.path),
      datePublished: post.publishedTime,
    })),
  };
}

/** Bungkus objek JSON-LD jadi bentuk `scripts` yang diterima head(). */
export function jsonLdScript(payload: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(payload) };
}

/**
 * Canonical + rel prev/next. Halaman berpaginasi WAJIB punya canonical yang
 * menyertakan nomor halaman -- tanpa itu halaman 2 dst dianggap duplikat
 * halaman 1 dan hilang dari indeks.
 */
export function paginationLinks(path: string, page: number, totalPages: number): LinkTag[] {
  const at = (n: number) => (n <= 1 ? canonicalUrl(path) : `${canonicalUrl(path)}?page=${n}`);
  const links: LinkTag[] = [{ rel: "canonical", href: at(page) }];
  if (page > 1) links.push({ rel: "prev", href: at(page - 1) });
  if (page < totalPages) links.push({ rel: "next", href: at(page + 1) });
  return links;
}
