/// <reference types="vite/client" />

// Env var yang dipakai aplikasi ini. Dideklarasikan eksplisit supaya salah
// ketik nama variabel ketahuan `tsc`, bukan diam-diam jadi undefined lalu
// jatuh ke default produksi tanpa ada yang sadar.
interface ImportMetaEnv {
  /** Base URL backend. Kosong = pakai default produksi (https://api.siarpi.com). */
  readonly VITE_API_BASE_URL?: string;
  /** Base URL aplikasi utama tujuan handoff. Kosong = https://app.siarpi.com. */
  readonly VITE_MAIN_APP_URL?: string;
  /**
   * OAuth Client ID Google (Web application) untuk tombol "Lanjutkan dengan
   * Google". HARUS sama persis dengan GOOGLE_CLIENT_ID di backend — backend
   * memvalidasi audience ID token terhadap nilai itu. Client ID memang
   * publik by design (terlihat di bundle), bukan rahasia. Kosong = tombol
   * Google tampil nonaktif ("Segera") seperti metode SSO lain yang belum jalan.
   */
  readonly VITE_GOOGLE_CLIENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
