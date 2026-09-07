import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Rest parameter WAJIB bertipe array -- sebelumnya `...inputs: ClassValue`
// membuat `tsc` gagal (TS2370). Runtime-nya kebetulan tetap benar karena
// clsx menerima array, tapi errornya menghalangi pemasangan gate typecheck.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatIDR = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;
