import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Sparkles } from "lucide-react";

export const SIARPI_WHATSAPP_NUMBER = "6281387895911";
export const SIARPI_CONTACT_EMAIL = "contacts@siarpi.com";

export function generateOfferMessage(context?: string | string[]): string {
  let moduleNote = "";
  if (Array.isArray(context) && context.length > 0) {
    moduleNote = ` Saat ini saya tertarik dengan modul: ${context.join(", ")}.`;
  } else if (typeof context === "string" && context.trim().length > 0) {
    moduleNote = ` Saat ini saya tertarik dengan modul/solusi ${context.trim()}.`;
  } else {
    moduleNote = " Saya belum menemukan kombinasi modul yang sesuai dengan alur bisnis kami.";
  }

  return `Halo Tim Siarpi, saya ingin mendiskusikan kebutuhan sistem bisnis dan meminta penawaran resmi Siarpi ERP.${moduleNote} Mohon dibantu rekomendasi modul atau paket, rincian estimasi harga penawaran, serta jadwal diskusi atau demonya. Terima kasih.`;
}

export function getWhatsAppOfferUrl(message: string): string {
  return `https://wa.me/${SIARPI_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getEmailOfferUrl(message: string, subjectTitle = "Diskusi Kebutuhan dan Penawaran Siarpi ERP"): string {
  const emailBody = `${message}\n\n---\nDetail Kontak Saya:\n- Nama:\n- Perusahaan / Bidang Usaha:\n- Nomor HP / WhatsApp:\n- Catatan Kebutuhan Khusus:`;
  return `mailto:${SIARPI_CONTACT_EMAIL}?subject=${encodeURIComponent(subjectTitle)}&body=${encodeURIComponent(emailBody)}`;
}

interface ConsultationCtaSectionProps {
  title?: string;
  badgeText?: string;
  description?: string;
  context?: string | string[];
  className?: string;
  variant?: "section" | "card";
}

export function ConsultationCtaSection({
  title = "Tidak menemukan apa yang kamu cari?",
  badgeText = "Diskusikan dengan Tim Siarpi",
  description = "Ceritakan alur kerja dan kebutuhan bisnis Anda. Tim kami siap membantu menyusun kombinasi modul kustom, rekomendasi paket, serta penawaran resmi yang paling relevan untuk perusahaan Anda.",
  context,
  className = "",
  variant = "section",
}: ConsultationCtaSectionProps) {
  const message = generateOfferMessage(context);
  const whatsappUrl = getWhatsAppOfferUrl(message);
  const emailUrl = getEmailOfferUrl(
    message,
    typeof context === "string"
      ? `Permintaan Penawaran Siarpi ERP - Modul ${context}`
      : "Permintaan Penawaran & Diskusi Kebutuhan Siarpi ERP"
  );

  const content = (
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 text-center md:flex-row md:justify-between md:text-left">
      <div className="max-w-xl">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          {badgeText}
        </div>
        <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground md:justify-start">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Respon cepat via WhatsApp
          </span>
          <span className="hidden sm:inline">•</span>
          <span>Konsultasi gratis tanpa komitmen</span>
        </div>
      </div>

      <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
        <Button
          asChild
          className="bg-emerald-600 font-semibold text-white shadow-soft transition-all hover:bg-emerald-700 hover:shadow-glow"
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-4 w-4" /> Diskusi via WhatsApp
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-border/80 font-semibold transition-all hover:border-primary/50 hover:bg-muted/50"
        >
          <a href={emailUrl}>
            <Mail className="mr-2 h-4 w-4" /> Email Tim Siarpi
          </a>
        </Button>
      </div>
    </div>
  );

  if (variant === "card") {
    return (
      <div
        className={`rounded-3xl border border-border/80 bg-gradient-to-b from-card to-muted/30 p-8 shadow-soft md:p-10 ${className}`}
      >
        {content}
      </div>
    );
  }

  return (
    <section className={`border-y border-border/80 bg-muted/25 py-12 md:py-16 ${className}`}>
      {content}
    </section>
  );
}
