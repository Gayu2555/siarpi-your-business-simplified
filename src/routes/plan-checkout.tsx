import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/site/Header";
import {
  createCheckout,
  readPlanIntent,
  savePlanIntent,
  type PlanIntent,
} from "@/lib/checkout-api";
import { getOnboardingStatus } from "@/lib/company-api";
import { getStoredUser } from "@/lib/auth";
import { guardAuthenticatedRoute } from "@/lib/onboarding-guard";
import { optionalSearchString } from "@/lib/search-params";
import { SIARPI_WHATSAPP_NUMBER } from "@/components/site/ConsultationCtaSection";
import { Loader2, MessageCircle } from "lucide-react";

type PlanCheckoutSearch = {
  suite?: string;
  plan?: string;
  name?: string;
};

function validatePlanCheckoutSearch(search: Record<string, unknown>): PlanCheckoutSearch {
  const suite = optionalSearchString(search.suite);
  const plan = optionalSearchString(search.plan);
  const name = optionalSearchString(search.name);
  return {
    ...(suite ? { suite } : {}),
    ...(plan ? { plan } : {}),
    ...(name ? { name } : {}),
  };
}

export const Route = createFileRoute("/plan-checkout")({
  validateSearch: validatePlanCheckoutSearch,
  beforeLoad: async () => {
    guardAuthenticatedRoute("/plan-checkout");
  },
  head: () => ({
    meta: [
      { title: "Checkout Paket — Siarpi" },
      { name: "description", content: "Lanjutkan pembelian paket Siarpi." },
    ],
  }),
  component: PlanCheckoutPage,
});

// Data perusahaan yang dinonaktifkan tidak bisa "dibikin lagi" — POST
// /companies menolak user yang masih menempel di company lama — jadi
// satu-satunya jalur balik ke pembayaran adalah lewat support.
const supportWhatsAppUrl = `https://wa.me/${SIARPI_WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Halo Tim Siarpi, data perusahaan saya sedang tidak aktif sehingga pembayaran paket terhenti. Mohon dibantu mengaktifkan kembali data perusahaan saya. Terima kasih.",
)}`;

/**
 * Gerbang checkout paket.
 *
 * User yang sudah punya company langsung dibuatkan checkout lalu diarahkan ke
 * /checkout. User baru tetap butuh company, tetapi onboarding-nya membawa
 * pilihan paket ini dan langsung membuat checkout paket setelah profil
 * perusahaan tersimpan — tidak lewat pemilihan modul lagi.
 */
function PlanCheckoutPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/plan-checkout" });
  const started = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [companyInactive, setCompanyInactive] = useState(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const intent: PlanIntent | null =
      search.suite && search.plan
        ? {
            suite_key: search.suite,
            plan_key: search.plan,
            plan_name: search.name ?? search.plan,
          }
        : readPlanIntent();

    if (!intent) {
      setError("Paket yang dipilih tidak ditemukan. Silakan pilih paket dari halaman pricing.");
      return;
    }
    savePlanIntent(intent);

    void (async () => {
      try {
        const status = await getOnboardingStatus();
        if (!status.ok || !status.data) {
          throw new Error("Status akun belum bisa dibaca. Coba lagi.");
        }

        if (!status.data.has_company || !status.data.company_id) {
          await navigate({
            to: "/onboarding",
            search: {
              plan_suite: intent.suite_key,
              plan_key: intent.plan_key,
              plan_name: intent.plan_name,
            },
            replace: true,
          });
          return;
        }

        // Punya company tapi datanya nonaktif (misal disuspend dari platform
        // admin): jangan lanjut ke pembayaran. company_is_active yang absen
        // berarti backend lama — biarkan lolos supaya rollout bertahap tidak
        // memblokir pembayaran yang selama ini jalan.
        if (status.data.company_is_active === false) {
          setCompanyInactive(true);
          return;
        }

        const user = getStoredUser();
        if (!user) {
          throw new Error("Sesi login tidak ditemukan. Silakan login ulang.");
        }

        const { ok, data } = await createCheckout({
          company_id: status.data.company_id,
          user_id: user.id,
          suite_key: intent.suite_key,
          plan_key: intent.plan_key,
        });
        if (!ok || !data?.checkout) {
          throw new Error(data?.message ?? "Gagal membuat checkout paket. Coba lagi.");
        }

        await navigate({
          to: "/checkout",
          search: { id: data.checkout.id },
          replace: true,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan tidak terduga.");
      }
    })();
  }, [navigate, search.name, search.plan, search.suite]);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-subtle">
      <Header />
      <main className="container mx-auto flex flex-1 items-center justify-center px-4 py-20">
        <div className="max-w-md text-center">
          {companyInactive ? (
            <>
              <h1 className="font-display text-2xl font-bold">Data perusahaan tidak aktif</h1>
              <p className="mt-2 text-muted-foreground">
                Sebelum lanjut ke pembayaran, data perusahaan kamu harus aktif dulu. Hubungi tim
                Siarpi untuk mengaktifkannya kembali, atau kembali ke pricing kalau masih mau
                lihat-lihat dulu.
              </p>
              <div className="mt-6 flex flex-col items-center gap-3">
                <Button asChild className="bg-gradient-primary text-primary-foreground">
                  <a href={supportWhatsAppUrl} target="_blank" rel="noreferrer">
                    <MessageCircle className="mr-1 h-4 w-4" /> Hubungi via WhatsApp
                  </a>
                </Button>
                <Button asChild variant="ghost">
                  <Link to="/modular" hash="paket">
                    Kembali ke pricing
                  </Link>
                </Button>
              </div>
            </>
          ) : error ? (
            <>
              <h1 className="font-display text-2xl font-bold">Checkout paket gagal dimulai</h1>
              <p className="mt-2 text-muted-foreground">{error}</p>
              <Button asChild className="mt-6 bg-gradient-primary text-primary-foreground">
                <Link to="/modular" hash="paket">
                  Kembali ke pricing
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Menyiapkan checkout paket...</p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
