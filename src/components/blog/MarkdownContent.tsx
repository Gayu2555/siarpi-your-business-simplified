import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { absoluteMediaUrl, slugifyHeading } from "@/lib/blog-api";

// ─────────────────────────────────────────────────────────────────────────────
// Renderer isi artikel CMS.
//
// Isi Markdown datang dari database, jadi diperlakukan sebagai input TIDAK
// TEPERCAYA: rehype-sanitize membuang tag/atribut berbahaya sebelum apa pun
// dirender. Tanpa itu, siapa pun yang bisa menulis artikel bisa menitipkan
// <script> ke halaman publik.
//
// Dirender saat SSR juga, sehingga crawler menerima HTML artikel yang utuh —
// bukan div kosong yang baru terisi setelah JavaScript jalan.
// ─────────────────────────────────────────────────────────────────────────────

// Skema bawaan rehype-sanitize sudah ketat. Yang ditambahkan hanya
// `loading`/`decoding` pada <img> supaya gambar artikel bisa lazy-load.
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    img: [...(defaultSchema.attributes?.img ?? []), "loading", "decoding"],
  },
};

/**
 * Membaca arahan lebar dari judul gambar Markdown: `![alt](url "w=640")`.
 *
 * Mengembalikan null untuk judul yang bukan arahan lebar, supaya artikel lama
 * yang judul gambarnya sungguhan tetap tampil apa adanya.
 */
function readWidthDirective(title: unknown): number | null {
  if (typeof title !== "string") return null;
  const match = /^w=(\d+(?:\.\d+)?)$/.exec(title.trim());
  if (!match) return null;
  const width = Number(match[1]);
  return Number.isFinite(width) && width > 0 ? width : null;
}

/** Ambil teks polos dari children React untuk dijadikan id heading. */
function textOf(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node as { props: { children?: React.ReactNode } }).props.children);
  }
  return "";
}

export function MarkdownContent({ markdown }: { markdown: string }) {
  return (
    <div className="space-y-5 text-base leading-relaxed text-foreground/90">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeSanitize, sanitizeSchema]]}
        components={{
          h2: ({ children }) => (
            // id-nya HARUS sepadan dengan extractHeadings() di blog-api.ts,
            // karena daftar isi menaut ke anchor ini.
            <h2
              id={slugifyHeading(textOf(children))}
              className="scroll-mt-28 pt-4 font-display text-2xl font-bold text-foreground md:text-3xl"
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              id={slugifyHeading(textOf(children))}
              className="scroll-mt-28 pt-2 font-display text-xl font-bold text-foreground"
            >
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="leading-relaxed">{children}</p>,
          ul: ({ children }) => (
            <ul className="list-disc space-y-2 pl-5 marker:text-primary">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-2 pl-5 marker:font-semibold marker:text-primary">
              {children}
            </ol>
          ),
          blockquote: ({ children }) => (
            <blockquote className="rounded-r-xl border-l-4 border-primary/60 bg-accent/40 px-5 py-3 text-foreground/80 italic">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => {
            const isExternal = !!href && /^https?:\/\//i.test(href) && !href.includes("siarpi.com");
            return (
              <a
                href={href}
                className="font-medium text-primary underline underline-offset-2 hover:no-underline"
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer nofollow" } : {})}
              >
                {children}
              </a>
            );
          },
          img: ({ src, alt, title }) => {
            // Editor menitipkan lebar pilihan penulis di kolom judul gambar
            // (`![alt](url "w=640")`), karena Markdown tidak punya tempat lain
            // untuk atribut. Tanpa dibaca di sini, gambar yang sudah dikecilkan
            // penulis tetap tayang selebar mungkin — resize-nya jadi bohong.
            const width = readWidthDirective(title);
            return (
              <img
                // src dari editor berbentuk relatif ("/blog/files/blog-xxx")
                // karena disajikan API, bukan landing page — jadi diabsolutkan.
                src={absoluteMediaUrl(typeof src === "string" ? src : "")}
                alt={alt ?? ""}
                // Judul yang cuma arahan lebar TIDAK diteruskan ke DOM; kalau
                // diteruskan, pembaca melihat tooltip bertuliskan "w=640".
                {...(width === null && title ? { title } : {})}
                {...(width !== null ? { width } : {})}
                loading="lazy"
                decoding="async"
                style={width !== null ? { maxWidth: "100%", width } : undefined}
                className={
                  width !== null
                    ? "rounded-2xl border border-border/70 shadow-soft"
                    : "mx-auto w-full rounded-2xl border border-border/70 shadow-soft"
                }
              />
            );
          },
          table: ({ children }) => (
            // Tabel lebar harus menggulir di dalam wadahnya sendiri, bukan
            // membuat seluruh halaman menggulir ke samping di layar kecil.
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-border bg-muted/50 px-4 py-2.5 text-left font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-border/60 px-4 py-2.5 align-top">{children}</td>
          ),
          code: ({ className, children }) => {
            const isBlock = (className ?? "").startsWith("language-");
            if (isBlock) {
              return (
                <code className="block overflow-x-auto rounded-xl bg-muted p-4 font-mono text-sm">
                  {children}
                </code>
              );
            }
            return (
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]">
                {children}
              </code>
            );
          },
          hr: () => <hr className="border-border" />,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
