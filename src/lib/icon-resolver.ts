// ─────────────────────────────────────────────────────────────────────────────
// icon-resolver.ts — CLIENT ONLY
// Resolve Phosphor icon string ke komponen React.
// File ini TIDAK boleh di-import di server/loader context (hanya di komponen).
// ─────────────────────────────────────────────────────────────────────────────

import * as PhosphorIcons from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

export type PhosphorWeight = "fill" | "regular" | "bold" | "light" | "duotone" | "thin";

const WEIGHT_SUFFIXES: PhosphorWeight[] = ["fill", "bold", "light", "duotone", "thin"];

/**
 * resolvePhosphorIcon("i-ph-cube-fill")
 *   → { Icon: PhosphorIcons.Cube, weight: "fill" }
 */
export function resolvePhosphorIcon(iconClass: string): {
  Icon: PhosphorIcon;
  weight: PhosphorWeight;
} {
  const raw = iconClass.replace(/^i-ph-/, "");

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

  const Icon =
    (PhosphorIcons as Record<string, unknown>)[pascalName] as PhosphorIcon | undefined;

  return { Icon: Icon ?? PhosphorIcons.Package, weight };
}

// ── Lucide icon resolver ──────────────────────────────────────────────────────
// Resolve nama string ke Lucide component. Dipakai untuk arrays di module scope
// yang tidak boleh menyimpan React components langsung.

import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function resolveLucideIcon(name: string): LucideIcon {
  return ((LucideIcons as Record<string, unknown>)[name] as LucideIcon) ?? LucideIcons.Circle;
}
