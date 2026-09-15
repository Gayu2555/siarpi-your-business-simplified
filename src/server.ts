import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";

// ─────────────────────────────────────────────────────────────────────────────
// Entry Cloudflare Worker milik kita sendiri.
//
// Sebelumnya wrangler.jsonc menunjuk langsung ke
// "@tanstack/react-start/server-entry", sehingga tidak ada satu pun tempat
// untuk menyisipkan security header -- respons keluar tanpa HSTS, tanpa
// proteksi framing, tanpa kebijakan referrer.
//
// File ini melakukan PERSIS apa yang dilakukan entry bawaan (lihat
// node_modules/@tanstack/react-start/dist/default-entry/esm/server.js), lalu
// menambahkan header sebelum respons dikirim. Body-nya diteruskan apa adanya
// sebagai ReadableStream supaya SSR streaming tidak berubah perilakunya.
// ─────────────────────────────────────────────────────────────────────────────

const handler = createStartHandler(defaultStreamHandler);

const developmentConnections = import.meta.env.DEV ? " ws://localhost:* ws://127.0.0.1:*" : "";

// Sumber eksternal yang benar-benar dipakai halaman ini. Kalau nanti ada
// script/asset pihak ketiga baru, daftarnya HARUS ikut diperbarui.
const CSP = [
  "default-src 'self'",
  // 'unsafe-inline' masih diperlukan: __root.tsx menyisipkan snippet gtag &
  // Clarity lewat dangerouslySetInnerHTML, dan TanStack Start menuliskan
  // script hidrasi inline. Menghapusnya butuh migrasi ke nonce lebih dulu.
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  `connect-src 'self' https://api.siarpi.com https://www.google-analytics.com https://*.clarity.ms https://*.google-analytics.com${developmentConnections}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

function withSecurityHeaders(response: Response, pathname = ""): Response {
  const headers = new Headers(response.headers);

  // HSTS tanpa includeSubDomains SENGAJA: direktif itu berlaku untuk SEMUA
  // subdomain dan browser mengingatnya sampai max-age habis. Aktifkan
  // "; includeSubDomains" hanya setelah dipastikan tiap subdomain
  // (app., api., dan internal apa pun) benar-benar HTTPS.
  headers.set("Strict-Transport-Security", "max-age=31536000");

  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");

  // Menahan URL lengkap bocor ke pihak ketiga lewat Referer -- termasuk saat
  // pengguna berpindah ke app.siarpi.com membawa kode handoff.
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");

  // CSP dipasang REPORT-ONLY dulu: kebijakan yang salah satu direktif saja
  // bisa mematikan halaman, dan situs ini memuat GA, Clarity, dan Google
  // Fonts. Pantau pelanggarannya di console/report, baru ganti header ini ke
  // "Content-Security-Policy" kalau sudah bersih.
  headers.set("Content-Security-Policy-Report-Only", CSP);

  const contentType = headers.get("Content-Type") ?? "";
  if (contentType.includes("text/html")) {
    // HTML selalu harus direvalidasi. Kalau HTML lama menunjuk hash asset dari
    // deployment sebelumnya, browser akan meminta file yang sudah tidak ada.
    headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
  } else if (pathname.startsWith("/assets/") && response.ok) {
    // Nama asset Vite mengandung content hash, jadi aman disimpan permanen.
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// robots.txt & sitemap.xml
//
// Keduanya HARUS disajikan dari domain situs (siarpi.com), bukan dari API,
// karena itu dilayani di sini — sebelum permintaan diteruskan ke TanStack.
// Sebelumnya situs ini tidak punya keduanya sama sekali, jadi crawler tidak
// pernah diberi tahu halaman apa saja yang ada dan kapan terakhir berubah.
// ─────────────────────────────────────────────────────────────────────────────

const SITE_URL = "https://siarpi.com";

// Sumber data artikel untuk sitemap.
//
// Dibaca dari import.meta.env (di-inline Vite saat build), BUKAN dari binding
// env Worker: VITE_* adalah variabel build-time dan tidak pernah muncul di
// argumen kedua fetch(). Salah ambil sumber = sitemap selalu jatuh ke fallback
// dan artikel CMS tidak pernah masuk.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.siarpi.com";

// Halaman publik yang tidak berubah-ubah. Halaman ber-auth (/dashboard,
// /checkout, /payment, /settings, /login, /register, /onboarding) SENGAJA
// tidak dimasukkan — tidak ada gunanya di indeks.
const STATIC_PATHS = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/blog", priority: "0.9", changefreq: "daily" },
  { path: "/studi-kasus", priority: "0.8", changefreq: "monthly" },
  { path: "/modular", priority: "0.8", changefreq: "monthly" },
  { path: "/komparasi", priority: "0.7", changefreq: "monthly" },
  { path: "/roadmap", priority: "0.6", changefreq: "monthly" },
  { path: "/hr", priority: "0.8", changefreq: "monthly" },
  { path: "/payroll", priority: "0.8", changefreq: "monthly" },
];

// Artikel bawaan di src/lib/articles.ts. Ditulis ulang di sini (bukan
// di-import) supaya bundel Worker tidak ikut menarik seluruh isi artikelnya
// hanya demi daftar slug.
const BUILT_IN_ARTICLE_SLUGS = [
  "5-tanda-usaha-butuh-software-akuntansi",
  "5-tanda-perusahaan-butuh-software-hr",
  "10-software-hr-terbaik-indonesia-2026",
  "10-software-akuntansi-terbaik-indonesia-2026",
  "10-software-erp-terbaik-indonesia-2026",
  "harga-software-erp-indonesia-2026",
  "erp-modular-vs-suite",
  "checklist-memilih-software-erp",
  "tanda-bisnis-butuh-erp",
  "sop-stock-opname-multi-gudang",
  "checklist-payroll-bulanan",
  "membangun-pipeline-crm-b2b",
  "transisi-pembukuan-digital",
  "rumus-kas-usaha-harian",
  "otomatisasi-efaktur-ppn",
];

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function robotsTxt(): Response {
  const body = [
    "User-agent: *",
    "Allow: /",
    // Halaman yang butuh login tidak perlu di-crawl.
    "Disallow: /dashboard",
    "Disallow: /checkout",
    "Disallow: /payment",
    "Disallow: /onboarding",
    "Disallow: /settings",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

async function sitemapXml(): Promise<Response> {
  const entries = STATIC_PATHS.map(
    (item) => `  <url>
    <loc>${SITE_URL}${item.path}</loc>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`,
  );

  for (const slug of BUILT_IN_ARTICLE_SLUGS) {
    entries.push(`  <url>
    <loc>${SITE_URL}/artikel/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
  }

  // Artikel CMS. Kalau API sedang tidak bisa dihubungi, sitemap TETAP terbit
  // berisi halaman statis — jangan sampai crawler menerima 500 dan berhenti
  // mengindeks seluruh situs gara-gara blog sedang bermasalah.
  try {
    const response = await fetch(`${API_BASE_URL}/public/blogs?page=1&page_size=100`, {
      signal: AbortSignal.timeout(5000),
    });
    if (response.ok) {
      const payload = (await response.json()) as {
        posts?: { slug?: string; updated_at?: string }[] | null;
      };
      for (const post of payload.posts ?? []) {
        if (!post.slug) continue;
        const lastmod = post.updated_at ? `\n    <lastmod>${post.updated_at}</lastmod>` : "";
        entries.push(`  <url>
    <loc>${SITE_URL}/artikel/${xmlEscape(post.slug)}</loc>${lastmod}
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
      }
    }
  } catch {
    // Sengaja diabaikan — lihat komentar di atas.
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // Cache di edge supaya tiap kunjungan crawler tidak menembak API.
      "Cache-Control": "public, max-age=600, s-maxage=3600",
    },
  });
}

export default {
  async fetch(...args: Parameters<typeof handler>): Promise<Response> {
    const request = args[0] as Request;
    const { pathname } = new URL(request.url);

    if (pathname === "/robots.txt") {
      return withSecurityHeaders(robotsTxt(), pathname);
    }
    if (pathname === "/sitemap.xml") {
      return withSecurityHeaders(await sitemapXml(), pathname);
    }

    const response = await handler(...args);
    const contentType = response.headers.get("Content-Type") ?? "";

    // Static asset yang tidak ditemukan tidak boleh jatuh ke SSR document.
    // Browser menolak HTML sebagai CSS/JS dan error aslinya jadi tersamarkan
    // sebagai MIME mismatch.
    if (pathname.startsWith("/assets/") && contentType.includes("text/html")) {
      return withSecurityHeaders(
        new Response("Asset not found", {
          status: 404,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-store",
          },
        }),
        pathname,
      );
    }

    return withSecurityHeaders(response, pathname);
  },
};
