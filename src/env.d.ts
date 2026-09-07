/// <reference types="vite/client" />

// Env var yang dipakai aplikasi ini. Dideklarasikan eksplisit supaya salah
// ketik nama variabel ketahuan `tsc`, bukan diam-diam jadi undefined lalu
// jatuh ke default produksi tanpa ada yang sadar.
interface ImportMetaEnv {
  /** Base URL backend. Kosong = pakai default produksi (https://api.siarpi.com). */
  readonly VITE_API_BASE_URL?: string;
  /** Base URL aplikasi utama tujuan handoff. Kosong = https://app.siarpi.com. */
  readonly VITE_MAIN_APP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
