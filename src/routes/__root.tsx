import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

// Auth helpers sekarang ada di @/lib/auth — import dari sana kalau perlu
// status login (isAuthenticated, clearAuthToken, getStoredUser, dll).

// ── Not Found ─────────────────────────────────────────────────────────────────

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Route ─────────────────────────────────────────────────────────────────────

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Siarpi | All in One Management System & Business Operating System" },
      {
        name: "description",
        content:
          "Siarpi adalah All in One Management System & Business Operating System (BOS) untuk mengontrol Finance, HR & Payroll, Inventory, Procurement, Production, dan CRM.",
      },
      {
        name: "keywords",
        content:
          "siarpi all in one management system, business operating system, software erp indonesia, software akuntansi terbaik, aplikasi hr payroll indonesia, software bisnis terpadu",
      },
      { name: "msvalidate.01", content: "16C5717F3121D840BD0162D3962EBD7F" },
      { name: "author", content: "Siarpi" },
      {
        property: "og:title",
        content: "Siarpi | All in One Management System & Business Operating System",
      },
      {
        property: "og:description",
        content:
          "Kelola bisnis tanpa ribet dengan Siarpi. HR, Payroll, Finance, Inventory dalam satu platform.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Siarpi" },
    ],
    links: [
      { rel: "icon", type: "image/x-icon", href: "/siarpi-icon.ico?v=1" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

// ── Shell ─────────────────────────────────────────────────────────────────────

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        {/* Google Tag Manager -- diletakkan sedekat mungkin dengan tag <head>
            pembuka (rekomendasi resmi Google) supaya tag container capturing
            tidak kelewatan. Sama seperti gtag & Clarity, snippet ini hanya
            dimuat di build production supaya development lokal tidak ikut
            mengirim data ke container. */}
        {import.meta.env.PROD && (
          <>
            <script async src="https://www.googletagmanager.com/gtm.js?id=GTM-MWGNT5TV" />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                `,
              }}
            />
          </>
        )}
        <HeadContent />
        <meta name="msvalidate.01" content="16C5717F3121D840BD0162D3962EBD7F" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          media="print"
          onLoad={(e) => {
            (e.currentTarget as HTMLLinkElement).media = "all";
          }}
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          />
        </noscript>
        {import.meta.env.PROD && (
          <>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-QTJLLW7M7Z" />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-QTJLLW7M7Z');
                `,
              }}
            />
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: `
                  (function(c,l,a,r,i,t,y){
                      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                  })(window, document, "clarity", "script", "x93fkookdr");
                `,
              }}
            />
          </>
        )}
      </head>
      <body>
        {/* Fallback GTM untuk pengunjung yang mematikan JavaScript -- iframe
            ini tidak dieksekusi script, jadi tetap aman dipaketkan sebagai
            fallback namun tidak menambah beban saat JS aktif. */}
        {import.meta.env.PROD && (
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-MWGNT5TV"
              title="Google Tag Manager"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
        <Scripts />
      </body>
    </html>
  );
}

// ── Root component ────────────────────────────────────────────────────────────

function RootComponent() {
  return <Outlet />;
}
