import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, BookOpen, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchPublishedPosts } from "@/lib/blog-api";
import { optionalSearchString, positiveSearchInteger } from "@/lib/search-params";
import {
  collectTags,
  filterArticles,
  mergeArticleSources,
  type BlogIndexItem,
} from "@/lib/blog-index";
import {
  blogListJsonLd,
  breadcrumbJsonLd,
  canonicalUrl,
  jsonLdScript,
  paginationLinks,
  SITE_NAME,
} from "@/lib/seo";

const PAGE_SIZE = 9;

// Pencarian & filter lewat query param (BUKAN state lokal) supaya tiap
// kombinasi punya URL sendiri yang bisa dibagikan dan di-crawl.
type BlogSearch = { page?: number; q?: string; tag?: string };

function validateBlogSearch(search: Record<string, unknown>): BlogSearch {
  return {
    page: positiveSearchInteger(search.page),
    q: optionalSearchString(search.q),
    tag: optionalSearchString(search.tag),
  };
}

const META_DESCRIPTION =
  "Panduan memilih ERP, harga software bisnis, akuntansi, HR, inventory, CRM, dan operasional untuk membantu perusahaan mengambil keputusan lebih tepat.";

export const Route = createFileRoute("/blog")({
  staleTime: 60_000,
  preloadStaleTime: 60_000,
  validateSearch: validateBlogSearch,
  loaderDeps: ({ search }) => ({ page: search.page ?? 1 }),
  loader: async ({ deps }) => {
    // Artikel CMS diambil banyak sekaligus lalu digabung dengan artikel
    // bawaan; paginasinya dilakukan setelah penggabungan supaya urutan
    // tanggal kedua sumber tidak terputus di batas halaman.
    const result = await fetchPublishedPosts({ page: 1, pageSize: 100 });
    return { items: mergeArticleSources(result.posts), page: deps.page };
  },
  head: ({ loaderData }) => {
    const items = loaderData?.items ?? [];
    const page = loaderData?.page ?? 1;
    const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
    const title =
      page > 1
        ? `Blog & Panduan Bisnis — Halaman ${page} | ${SITE_NAME}`
        : `Blog & Panduan Bisnis Indonesia | ${SITE_NAME}`;

    const leadImage = items.find((item) => item.thumbnailUrl)?.thumbnailUrl;
    return {
      meta: [
        { title },
        { name: "description", content: META_DESCRIPTION },
        { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
        { property: "og:type", content: "website" },
        { property: "og:title", content: title },
        { property: "og:description", content: META_DESCRIPTION },
        { property: "og:url", content: canonicalUrl("/blog") },
        { property: "og:site_name", content: SITE_NAME },
        { property: "og:locale", content: "id_ID" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: META_DESCRIPTION },
      ],
      links: [
        ...paginationLinks("/blog", page, totalPages),
        ...(leadImage
          ? [
              {
                rel: "preload",
                as: "image" as const,
                href: leadImage,
                fetchPriority: "high" as const,
              },
            ]
          : []),
      ],
      scripts: [
        jsonLdScript(
          blogListJsonLd(
            items.slice(0, 20).map((item) => ({
              title: item.title,
              path: `/artikel/${item.slug}`,
              publishedTime: item.publishedAt,
            })),
          ),
        ),
        jsonLdScript(
          breadcrumbJsonLd([
            { name: "Beranda", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ),
      ],
    };
  },
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const { items } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/blog" });

  const [draftQuery, setDraftQuery] = useState(search.q ?? "");

  const filtered = filterArticles(items, { q: search.q, tag: search.tag });
  const page = search.page ?? 1;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const tags = collectTags(items);
  const priorityImageSlug = visible.find((item) => item.thumbnailUrl)?.slug;

  function applySearch(next: { q?: string; tag?: string; page?: number }) {
    navigate({
      search: (prev) => ({ ...prev, ...next, page: next.page ?? 1 }),
      resetScroll: false,
    });
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-subtle">
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="container relative mx-auto px-4 py-14 md:px-6 md:py-20">
            <Badge variant="outline" className="mb-4 rounded-full">
              <BookOpen className="mr-1.5 h-3.5 w-3.5" /> Blog Siarpi
            </Badge>
            <h1 className="font-display text-3xl font-bold md:text-5xl">
              Panduan & Wawasan Bisnis
            </h1>
            <p className="mt-4 max-w-2xl text-base text-foreground/80 md:text-lg">
              {META_DESCRIPTION}
            </p>

            {/* Pencarian */}
            <form
              className="mt-8 flex max-w-xl gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                applySearch({ q: draftQuery || undefined });
              }}
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={draftQuery}
                  onChange={(e) => setDraftQuery(e.target.value)}
                  placeholder="Cari panduan, tips, atau topik…"
                  className="rounded-xl pl-9"
                  aria-label="Cari artikel"
                />
              </div>
              <Button
                type="submit"
                className="rounded-xl bg-gradient-primary text-primary-foreground"
              >
                Cari
              </Button>
            </form>

            {/* Filter tag */}
            {tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => applySearch({ tag: undefined })}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                    !search.tag
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  Semua
                </button>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => applySearch({ tag })}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                      search.tag?.toLowerCase() === tag.toLowerCase()
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* DAFTAR ARTIKEL */}
        <section className="container mx-auto px-4 py-12 md:px-6 md:py-16">
          {visible.length === 0 ? (
            <div className="mx-auto max-w-md rounded-3xl border border-border bg-card/60 p-10 text-center">
              <h2 className="font-display text-xl font-bold">Belum ada artikel</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {search.q || search.tag
                  ? "Tidak ada artikel yang cocok dengan pencarian Anda. Coba kata kunci lain."
                  : "Artikel baru akan segera terbit di sini."}
              </p>
              {(search.q || search.tag) && (
                <Button
                  variant="outline"
                  className="mt-6 rounded-xl"
                  onClick={() => {
                    setDraftQuery("");
                    navigate({ search: {} });
                  }}
                >
                  Tampilkan semua artikel
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((item) => (
                <ArticleCard
                  key={item.slug}
                  item={item}
                  prioritizeImage={item.slug === priorityImageSlug}
                />
              ))}
            </div>
          )}

          {/* Paginasi — pakai Link supaya tiap halaman punya URL yang bisa
              di-crawl, bukan tombol yang cuma mengubah state. */}
          {totalPages > 1 && (
            <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Paginasi">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl"
                disabled={page <= 1}
                onClick={() => applySearch({ ...search, page: page - 1 })}
              >
                <ChevronLeft className="h-4 w-4" /> Sebelumnya
              </Button>
              <span className="px-3 text-sm text-muted-foreground">
                Halaman {page} dari {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl"
                disabled={page >= totalPages}
                onClick={() => applySearch({ ...search, page: page + 1 })}
              >
                Berikutnya <ChevronRight className="h-4 w-4" />
              </Button>
            </nav>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ArticleCard({ item, prioritizeImage }: { item: BlogIndexItem; prioritizeImage: boolean }) {
  return (
    <div>
      <Link to="/artikel/$slug" params={{ slug: item.slug }} className="group block h-full">
        <Card className="flex h-full flex-col overflow-hidden rounded-3xl border-border bg-card/60 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-soft">
          {item.thumbnailUrl ? (
            <img
              src={item.thumbnailUrl}
              alt={item.thumbnailAlt}
              loading={prioritizeImage ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={prioritizeImage ? "high" : "auto"}
              className="aspect-[16/9] w-full object-cover"
            />
          ) : (
            <div className="flex aspect-[16/9] w-full items-center justify-center bg-gradient-subtle">
              <BookOpen className="h-8 w-8 text-primary/40" />
            </div>
          )}

          <div className="flex flex-1 flex-col gap-3 p-5">
            <div className="flex flex-wrap gap-1.5">
              {item.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="rounded-full text-[10px] font-bold">
                  {tag}
                </Badge>
              ))}
            </div>

            <h2 className="font-display text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
              {item.title}
            </h2>
            <p className="line-clamp-3 flex-1 text-sm text-muted-foreground">{item.excerpt}</p>

            <div className="flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
              <span>{item.displayDate}</span>
              {item.readTime && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {item.readTime}
                </span>
              )}
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-primary">
              Baca Artikel
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Card>
      </Link>
    </div>
  );
}
