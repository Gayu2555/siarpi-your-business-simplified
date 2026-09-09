import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MarkdownContent } from "@/components/blog/MarkdownContent";
import {
  absoluteMediaUrl,
  estimateReadingMinutes,
  extractHeadings,
  formatPostDate,
  type BlogPost,
} from "@/lib/blog-api";
import type { BlogIndexItem } from "@/lib/blog-index";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bookmark,
  Clock,
  MessageCircle,
  Share2,
} from "lucide-react";

// Tampilan artikel yang berasal dari Blog CMS (MongoDB).
//
// Artikel bawaan di lib/articles.ts SENGAJA tetap dirender oleh komponen
// lamanya di routes/artikel.$slug.tsx — formatnya terstruktur dan punya blok
// khusus (callout, FAQ, kalkulator) yang tidak ada padanannya di Markdown.
// Memisahkan keduanya membuat artikel lama nol risiko regresi, sementara
// tampilannya tetap satu bahasa desain.

const WA_NUMBER = "6281387895911";

export function CmsArticleView({ post, related }: { post: BlogPost; related: BlogIndexItem[] }) {
  const markdown = post.content_markdown ?? "";
  const headings = extractHeadings(markdown);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState(headings[0]?.id ?? "");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= 180 && rect.bottom >= 180) setActiveHeading(heading.id);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Halo Tim Siarpi, saya baru selesai membaca artikel "${post.title}" dan ingin berkonsultasi mengenai penerapan Siarpi untuk bisnis saya. Bisakah dibantu jadwal diskusinya? Terima kasih!`,
  )}`;

  const thumbnail = absoluteMediaUrl(post.thumbnail_url);
  const publishedDate = formatPostDate(post.published_at ?? post.created_at);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-muted/40">
        <div
          className="h-full bg-gradient-primary transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Header />

      <main className="flex-1">
        {/* KEPALA ARTIKEL */}
        <section className="border-b border-border/80 bg-gradient-to-b from-muted/30 via-background to-background py-10 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl space-y-6">
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Semua Artikel
              </Link>

              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  {(post.tags ?? []).slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="rounded-full border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary"
                    >
                      {tag}
                    </Badge>
                  ))}
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {estimateReadingMinutes(markdown)} menit baca
                  </span>
                  {publishedDate && (
                    <span className="text-xs text-muted-foreground">
                      Dipublikasikan: {publishedDate}
                    </span>
                  )}
                </div>

                <h1 className="font-display text-3xl font-bold leading-[1.18] tracking-tight text-foreground sm:text-4xl md:text-5xl">
                  {post.title}
                </h1>

                {post.excerpt && (
                  <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                    {post.excerpt}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary font-display text-xs font-bold text-primary-foreground">
                    S
                  </div>
                  <div>
                    <div className="font-bold text-foreground">Tim Siarpi</div>
                    <div className="text-[11px] text-muted-foreground">
                      Ditinjau oleh Tim Produk Siarpi
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`h-8 gap-1.5 px-3 text-xs ${isBookmarked ? "border-primary bg-primary/5 text-primary" : ""}`}
                  >
                    <Bookmark className="h-3.5 w-3.5" /> {isBookmarked ? "Tersimpan" : "Simpan"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopyLink}
                    className="h-8 gap-1.5 px-3 text-xs"
                  >
                    <Share2 className="h-3.5 w-3.5" /> {copiedLink ? "Link Tersalin" : "Bagikan"}
                  </Button>
                </div>
              </div>

              {thumbnail && (
                <img
                  src={thumbnail}
                  alt={post.thumbnail_alt || post.title}
                  // Gambar utama artikel: JANGAN lazy-load, ini elemen LCP.
                  fetchPriority="high"
                  className="aspect-[16/9] w-full rounded-2xl border border-border/70 object-cover shadow-soft"
                />
              )}
            </div>
          </div>
        </section>

        {/* ISI + DAFTAR ISI */}
        <section className="container mx-auto px-4 py-10 md:px-6 md:py-16">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-12">
            {headings.length > 0 && (
              <aside className="hidden lg:col-span-4 lg:block">
                <div className="sticky top-24 space-y-6 rounded-2xl border border-border/80 bg-card p-5 shadow-soft">
                  <div className="flex items-center gap-2 border-b border-border/60 pb-3 font-display text-xs font-bold uppercase tracking-wider text-foreground">
                    <BookOpen className="h-4 w-4 text-primary" /> Daftar Isi Artikel
                  </div>
                  <nav className="space-y-1.5 text-xs">
                    {headings.map((heading) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={`block rounded-lg px-3 py-1.5 font-medium transition-all ${
                          activeHeading === heading.id
                            ? "border-l-2 border-primary bg-primary/10 font-bold text-primary"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        }`}
                      >
                        {heading.heading}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}

            <article className={headings.length > 0 ? "lg:col-span-8" : "lg:col-span-12"}>
              <MarkdownContent markdown={markdown} />

              {/* CTA KONSULTASI */}
              <Card className="mt-12 rounded-3xl border-border bg-gradient-subtle p-6 md:p-8">
                <h2 className="font-display text-xl font-bold text-foreground md:text-2xl">
                  Ingin menerapkannya di bisnis Anda?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Tim kami bisa membantu memetakan kebutuhan dan modul Siarpi yang paling sesuai
                  dengan kondisi operasional Anda.
                </p>
                <Button
                  asChild
                  className="mt-6 bg-gradient-primary font-semibold text-primary-foreground shadow-soft hover:shadow-glow"
                >
                  <a href={waUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-1.5 h-4 w-4" /> Konsultasi Gratis via WhatsApp
                  </a>
                </Button>
              </Card>
            </article>
          </div>
        </section>

        {/* ARTIKEL TERKAIT */}
        {related.length > 0 && (
          <section className="border-t border-border/70 bg-muted/20 py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-6">
              <div className="mx-auto max-w-5xl space-y-6">
                <h2 className="font-display text-xl font-bold text-foreground">
                  Artikel & Panduan Terkait Lainnya
                </h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {related.slice(0, 3).map((item) => (
                    <div key={item.slug}>
                      <Link to="/artikel/$slug" params={{ slug: item.slug }} className="group">
                        <Card className="flex h-full flex-col justify-between space-y-3 rounded-2xl border border-border/80 bg-card p-5 shadow-soft transition-all hover:border-primary/40">
                          <div className="space-y-2">
                            {item.tags[0] && (
                              <Badge variant="secondary" className="text-[10px] font-bold">
                                {item.tags[0]}
                              </Badge>
                            )}
                            <h3 className="font-display text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                              {item.title}
                            </h3>
                            <p className="line-clamp-2 text-xs text-muted-foreground">
                              {item.excerpt}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 border-t border-border/60 pt-2 text-xs font-semibold text-primary">
                            Baca Artikel
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                          </div>
                        </Card>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
