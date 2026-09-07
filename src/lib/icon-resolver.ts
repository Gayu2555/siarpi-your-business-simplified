// ─────────────────────────────────────────────────────────────────────────────
// icon-resolver.ts — CLIENT ONLY
// Resolve Phosphor/Lucide icon string ke komponen React.
// File ini TIDAK boleh di-import di server/loader context (hanya di komponen).
//
// PENTING — kenapa ikonnya di-import satu per satu, bukan `import * as`:
//
// Versi sebelumnya memakai `import * as PhosphorIcons` + `import * as
// LucideIcons` lalu mencarinya secara dinamis (`PhosphorIcons[pascalName]`).
// Karena bundler tidak bisa tahu properti mana yang dipakai, SELURUH isi kedua
// library ikut terbawa: satu chunk 5,36 MB (1,16 MB gzip) yang di-import
// STATIS oleh routes/index.tsx alias halaman depan. Untuk landing page yang
// tujuannya SEO & konversi, itu beban yang membatalkan usaha optimasi lain.
//
// Dengan peta eksplisit di bawah, bundler melihat persis ikon mana yang
// dipakai dan sisanya dibuang (@phosphor-icons/react sudah sideEffects:false).
// Polanya sama dengan ICON_MAP di lib/modules/registry.ts yang sudah ada.
//
// MENAMBAH MODUL BARU? Kalau ikonnya belum terdaftar di sini, tampilannya
// jatuh ke fallback dan sebuah peringatan dicetak ke console saat dev —
// tambahkan namanya ke peta di bawah.
// ─────────────────────────────────────────────────────────────────────────────

import {
  ChartBar,
  ChartLine,
  Columns,
  Crown,
  Cube,
  Factory,
  Fingerprint,
  IdentificationBadge,
  Megaphone,
  Money,
  Package,
  Receipt,
  Rocket,
  ShoppingBag,
  Storefront,
  Users,
  Wallet,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";

export type PhosphorWeight = "fill" | "regular" | "bold" | "light" | "duotone" | "thin";

const WEIGHT_SUFFIXES: PhosphorWeight[] = ["fill", "bold", "light", "duotone", "thin"];

// Isinya = seluruh nilai kolom `modules.icon` dan `product_suites.icon` yang
// benar-benar ada di katalog, ditambah ikon yang di-hardcode di frontend
// (mis. "i-ph-package-fill" di routes/checkout.tsx).
const PHOSPHOR_ICONS: Record<string, PhosphorIcon> = {
  ChartBar,
  ChartLine,
  Columns,
  Crown,
  Cube,
  Factory,
  Fingerprint,
  IdentificationBadge,
  Megaphone,
  Money,
  Package,
  Receipt,
  Rocket,
  ShoppingBag,
  Storefront,
  Users,
  Wallet,
};

function warnMissingIcon(kind: string, name: string, source: string) {
  if (import.meta.env.DEV) {
    console.warn(
      `[icon-resolver] ikon ${kind} "${name}" (dari "${source}") belum terdaftar di peta. ` +
        `Tambahkan di src/lib/icon-resolver.ts supaya tidak jatuh ke fallback.`,
    );
  }
}

/**
 * resolvePhosphorIcon("i-ph-cube-fill")
 *   → { Icon: Cube, weight: "fill" }
 */
export function resolvePhosphorIcon(iconClass: string): {
  Icon: PhosphorIcon;
  weight: PhosphorWeight;
} {
  const raw = (iconClass ?? "").replace(/^i-ph-/, "");

  let weight: PhosphorWeight = "regular";
  let slug = raw;

  for (const w of WEIGHT_SUFFIXES) {
    if (raw.endsWith(`-${w}`)) {
      weight = w;
      slug = raw.slice(0, -(w.length + 1));
      break;
    }
  }

  // "cube" → "Cube", "shopping-cart" → "ShoppingCart"
  const pascalName = slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

  const Icon = PHOSPHOR_ICONS[pascalName];
  if (!Icon) {
    warnMissingIcon("Phosphor", pascalName, iconClass);
    return { Icon: Package, weight };
  }

  return { Icon, weight };
}

// ── Lucide icon resolver ──────────────────────────────────────────────────────
// Resolve nama string ke Lucide component. Dipakai untuk arrays di module scope
// yang tidak boleh menyimpan React components langsung.

import {
  Building2,
  Circle,
  CreditCard,
  GraduationCap,
  QrCode,
  RefreshCw,
  Smartphone,
  Zap,
  type LucideIcon,
} from "lucide-react";

// Nama yang dipakai resolveLucideIcon() -- semuanya berasal dari array
// `benefits` & `paymentMethods` di routes/index.tsx. Peta modul punya
// daftarnya sendiri di lib/modules/registry.ts.
const LUCIDE_ICONS: Record<string, LucideIcon> = {
  Building2,
  Circle,
  CreditCard,
  GraduationCap,
  QrCode,
  RefreshCw,
  Smartphone,
  Zap,
};

export function resolveLucideIcon(name: string): LucideIcon {
  const Icon = LUCIDE_ICONS[name];
  if (!Icon) {
    warnMissingIcon("Lucide", name, name);
    return Circle;
  }
  return Icon;
}
