import { useState, useEffect } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  BookOpen,
  Check,
  Calculator,
  Share2,
  ThumbsUp,
  Bookmark,
  ChevronRight,
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { articlesRegistry, type ArticleData } from "@/lib/articles";
import { formatIDR } from "@/lib/utils";

export const Route = createFileRoute("/artikel/$slug")({
  head: ({ params }) => {
    const article = articlesRegistry[params.slug];
    if (!article) {
      return { meta: [{ title: "Artikel Tidak Ditemukan | Siarpi Blog" }] };
    }

    const metaTitle = `${article.title} | Siarpi Business Blog`;
    return {
      meta: [
        { title: metaTitle },
        { name: "description", content: article.summary },
        {
          name: "keywords",
          content: `${article.category}, panduan siarpi, pembukuan bisnis, erp indonesia`,
        },
        { property: "og:title", content: metaTitle },
        { property: "og:description", content: article.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  loader: async ({ params }) => {
    const article = articlesRegistry[params.slug];
    if (!article) throw notFound();
    return { article };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Artikel Tidak Ditemukan</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Artikel yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <Button asChild className="mt-6 bg-gradient-primary text-primary-foreground font-semibold">
          <Link to="/studi-kasus">Kembali ke Panduan Bisnis</Link>
        </Button>
      </main>
      <Footer />
    </div>
  ),
  component: ArticleReaderPage,
});

function ArticleReaderPage() {
  const { article } = Route.useLoaderData() as { article: ArticleData };

  const waTemplateText = `Halo Tim Siarpi, saya baru selesai membaca artikel "${article.title}" dan ingin berkonsultasi mengenai penerapan modul Siarpi untuk bisnis saya. Bisakah dibantu jadwal diskusinya? Terima kasih!`;
  const waUrl = `https://wa.me/6281387895911?text=${encodeURIComponent(waTemplateText)}`;

  // Scroll Progress Bar State
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>(article.sections[0]?.id || "");

  // Feedback & Interactions
  const [isHelpful, setIsHelpful] = useState<boolean | null>(null);
  const [helpfulCount, setHelpfulCount] = useState<number>(42);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // In-Article Calculator State
  const [calcHours, setCalcHours] = useState<number>(10);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }

      // Track active section by scroll position
      article.sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(sec.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [article.sections]);

  const handleToggleHelpful = (val: boolean) => {
    if (isHelpful === val) return;
    setIsHelpful(val);
    if (val) setHelpfulCount((prev) => prev + 1);
    else if (isHelpful === true) setHelpfulCount((prev) => prev - 1);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const otherArticles = Object.values(articlesRegistry).filter((a) => a.slug !== article.slug);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* READING PROGRESS BAR STICKY TOP */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted/40">
        <div
          className="h-full bg-gradient-primary transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Header />

      <main className="flex-1">
        {/* ARTICLE HEADER */}
        <section className="bg-gradient-to-b from-muted/30 via-background to-background py-10 md:py-16 border-b border-border/80">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl space-y-6">
              {/* Back Link */}
              <Link
                to="/studi-kasus"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Panduan & Artikel Bisnis
              </Link>

              <div className="space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge
                    variant="outline"
                    className="rounded-full border-primary/30 text-primary font-semibold bg-primary/5 px-3 py-1 text-xs"
                  >
                    {article.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {article.readTime}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Dipublikasikan: {article.publishedDate}
                  </span>
                </div>

                <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl leading-[1.18]">
                  {article.title}
                </h1>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {article.subtitle}
                </p>
              </div>

              {/* Author & Action Bar */}
              <div className="flex items-center justify-between border-t border-border/60 pt-4 flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground font-display font-bold text-xs">
                    S
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{article.author}</div>
                    <div className="text-muted-foreground text-[11px]">
                      Ditinjau oleh Tim Akuntansi Siarpi
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`h-8 px-3 text-xs gap-1.5 ${isBookmarked ? "border-primary text-primary bg-primary/5" : ""}`}
                  >
                    <Bookmark className="h-3.5 w-3.5" /> {isBookmarked ? "Tersimpan" : "Simpan"}
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopyLink}
                    className="h-8 px-3 text-xs gap-1.5"
                  >
                    <Share2 className="h-3.5 w-3.5" /> {copiedLink ? "Link Tersalin" : "Bagikan"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN BODY WITH STICKY TABLE OF CONTENTS SIDEBAR */}
        <section className="container mx-auto px-4 py-10 md:px-6 md:py-16">
          <div className="mx-auto max-w-5xl grid gap-10 lg:grid-cols-12">
            {/* LEFT STICKY SIDEBAR: TABLE OF CONTENTS */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-24 space-y-6 rounded-2xl border border-border/80 bg-card p-5 shadow-soft">
                <div className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider text-foreground border-b border-border/60 pb-3">
                  <BookOpen className="h-4 w-4 text-primary" /> Daftar Isi Artikel
                </div>

                <nav className="space-y-1.5 text-xs">
                  {article.sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className={`block py-1.5 px-3 rounded-lg font-medium transition-all ${
                        activeSection === sec.id
                          ? "bg-primary/10 text-primary font-bold border-l-2 border-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {sec.heading}
                    </a>
                  ))}
                  {article.faq && article.faq.length > 0 && (
                    <a
                      href="#faq-section"
                      className="block py-1.5 px-3 rounded-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    >
                      Pertanyaan Sering Diajukan (FAQ)
                    </a>
                  )}
                </nav>

                <div className="pt-3 border-t border-border/60 text-[11px] text-muted-foreground space-y-2">
                  <div className="font-semibold text-foreground">Butuh Konsultasi Modul?</div>
                  <p>Tanyakan langsung ke spesialis Siarpi via WhatsApp (+62 813-8789-5911).</p>
                  <Button
                    size="sm"
                    asChild
                    className="w-full text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs gap-1.5"
                  >
                    <a href={waUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-3.5 w-3.5" /> Tanya Via WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </aside>

            {/* RIGHT COLUMN: ARTICLE CONTENT */}
            <article className="lg:col-span-8 space-y-10 text-foreground leading-relaxed text-sm md:text-base">
              {/* Summary Lead Box */}
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 md:p-6 text-sm text-foreground/90 font-medium leading-relaxed">
                <span className="font-bold text-primary block mb-1 uppercase text-xs tracking-wider">
                  Ringkasan Eksekutif:
                </span>
                {article.summary}
              </div>

              {/* Dynamic Article Sections */}
              {article.sections.map((sec) => (
                <section key={sec.id} id={sec.id} className="space-y-4 scroll-mt-28">
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground tracking-tight pt-2 border-t border-border/40">
                    {sec.heading}
                  </h2>

                  {sec.paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-muted-foreground leading-relaxed text-sm md:text-base"
                    >
                      {p}
                    </p>
                  ))}

                  {/* Optional Callout Alert Box */}
                  {sec.callout && (
                    <div
                      className={`my-4 rounded-xl border p-4 text-xs md:text-sm font-medium leading-relaxed flex items-start gap-3 ${
                        sec.callout.type === "warning"
                          ? "border-amber-300 bg-amber-50/60 text-amber-900 dark:border-amber-950 dark:bg-amber-950/30 dark:text-amber-200"
                          : "border-sky-300 bg-sky-50/60 text-sky-900 dark:border-sky-950 dark:bg-sky-950/30 dark:text-sky-200"
                      }`}
                    >
                      <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                      <div>{sec.callout.text}</div>
                    </div>
                  )}

                  {/* Bullet Points */}
                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul className="space-y-2 text-xs md:text-sm text-muted-foreground my-3 pl-2">
                      {sec.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Key Takeaway Box */}
                  {sec.keyTakeaway && (
                    <div className="rounded-xl border border-border/80 bg-muted/40 p-4 text-xs md:text-sm font-semibold text-foreground flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-primary block text-[11px] uppercase tracking-wider mb-0.5">
                          Poin Kunci:
                        </span>
                        {sec.keyTakeaway}
                      </div>
                    </div>
                  )}
                </section>
              ))}

              {/* IN-ARTICLE INTERACTIVE CALCULATOR WIDGET */}
              <div className="my-8 rounded-2xl border border-border/80 bg-card p-6 shadow-soft space-y-4">
                <div className="flex items-center gap-2 font-display text-sm font-bold text-foreground">
                  <Calculator className="h-4 w-4 text-primary" /> Simulasi Penghematan Jam Kerja
                  Anda
                </div>

                <p className="text-xs text-muted-foreground">
                  Berapa jam yang dihabiskan tim Anda setiap minggu untuk mencatat kwitansi atau
                  memindahkan data manual?
                </p>

                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Jam Rekap Manual / Minggu:</span>
                    <span className="text-primary font-mono font-bold">{calcHours} Jam</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="40"
                    value={calcHours}
                    onChange={(e) => setCalcHours(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                <div className="rounded-xl bg-muted/40 p-4 text-xs flex items-center justify-between">
                  <span className="text-muted-foreground font-medium">
                    Estimasi Waktu Dihemat Dengan Siarpi:
                  </span>
                  <span className="font-display font-bold text-sm text-primary">
                    ~{Math.round(calcHours * 0.75)} Jam / Minggu
                  </span>
                </div>
              </div>

              {/* FAQ SECTION */}
              {article.faq && article.faq.length > 0 && (
                <section
                  id="faq-section"
                  className="space-y-4 pt-6 border-t border-border/60 scroll-mt-28"
                >
                  <h3 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" /> Pertanyaan Sering Diajukan (FAQ)
                  </h3>

                  <Accordion type="single" collapsible className="w-full space-y-2">
                    {article.faq.map((item, i) => (
                      <AccordionItem
                        key={i}
                        value={`faq-${i}`}
                        className="rounded-xl border border-border/80 bg-card px-4 py-1"
                      >
                        <AccordionTrigger className="text-xs md:text-sm font-bold text-foreground hover:no-underline">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-xs text-muted-foreground leading-relaxed pt-1">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              )}

              {/* INTERACTIVE READER FEEDBACK WIDGET */}
              <div className="rounded-2xl border border-border/80 bg-muted/30 p-6 text-center space-y-3">
                <div className="font-display font-bold text-sm text-foreground">
                  Apakah artikel ini bermanfaat bagi Anda?
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Button
                    size="sm"
                    variant={isHelpful === true ? "default" : "outline"}
                    onClick={() => handleToggleHelpful(true)}
                    className="text-xs gap-1.5"
                  >
                    <ThumbsUp className="h-3.5 w-3.5" /> Ya, Sangat Membantu ({helpfulCount})
                  </Button>
                  <Button
                    size="sm"
                    variant={isHelpful === false ? "secondary" : "outline"}
                    onClick={() => handleToggleHelpful(false)}
                    className="text-xs gap-1.5"
                  >
                    Kurang Jelas
                  </Button>
                </div>
                {isHelpful !== null && (
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                    Terima kasih atas masukan Anda. Kami terus memperbarui artikel ini.
                  </p>
                )}
              </div>
            </article>
          </div>
        </section>

        {/* OTHER RELATED ARTICLES */}
        {otherArticles.length > 0 && (
          <section className="bg-muted/20 py-12 md:py-16 border-t border-border/80">
            <div className="container mx-auto px-4 md:px-6">
              <div className="mx-auto max-w-5xl space-y-6">
                <h3 className="font-display text-xl font-bold text-foreground">
                  Artikel Panduan Lainnya
                </h3>

                <div className="grid gap-6 md:grid-cols-2">
                  {otherArticles.map((rel) => (
                    <Card
                      key={rel.slug}
                      className="rounded-2xl border border-border/80 bg-card p-6 shadow-soft hover:border-primary/40 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-[10px] font-semibold">
                            {rel.category}
                          </Badge>
                          <span>{rel.readTime}</span>
                        </div>
                        <h4 className="font-display font-bold text-base text-foreground leading-snug">
                          {rel.title}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {rel.summary}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{rel.publishedDate}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          asChild
                          className="text-xs font-semibold text-primary p-0 h-auto"
                        >
                          <Link to="/artikel/$slug" params={{ slug: rel.slug }}>
                            Baca Selengkapnya <ChevronRight className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* BOTTOM CTA */}
        <section className="bg-gradient-primary py-14 text-primary-foreground">
          <div className="container mx-auto px-4 text-center md:px-6">
            <div className="mx-auto max-w-3xl space-y-4">
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                Diskusi Penerapan Siarpi untuk Bisnis Anda
              </h2>
              <p className="text-sm md:text-base opacity-90 leading-relaxed">
                Tim spesialis kami siap menjawab pertanyaan dan mendiskusikan alur kerja spesifik
                bisnis Anda via WhatsApp.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="font-bold shadow-md bg-white text-slate-900 hover:bg-slate-100 gap-2"
                >
                  <a href={waUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4 text-emerald-600" /> Konsultasi WhatsApp (+62
                    813-8789-5911)
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
