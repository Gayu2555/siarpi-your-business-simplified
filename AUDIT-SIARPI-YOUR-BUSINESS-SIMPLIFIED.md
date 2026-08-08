# Audit Report: siarpi-your-business-simplified

**Proyek:** Marketing Landing Page & Onboarding Flow untuk Siarpi ERP
**Tanggal Audit:** 8 Agustus 2026
**Auditor:** OpenCode CLI
**Versi Paket:** TanStack Start 1.167, Vite 7, React 19
**Deployment Target:** Cloudflare Workers (via wrangler.jsonc)

---

## 🔴 Temuan Kritis (Prioritas Tinggi)

### KRIT-1: Kebocoran Token JWT di URL Query Parameter
**File:** `src/routes/dashboard.tsx:143-145`
**Kode yang bermasalah:**
```typescript
href={typeof window !== 'undefined' && localStorage.getItem("siarpi_token") 
  ? `https://app.siarpi.com/?token=${encodeURIComponent(localStorage.getItem("siarpi_token") || "")}`
  : "https://app.siarpi.com"
}
```

**Dampak:**
- JWT token pengguna diekspos di URL `https://app.siarpi.com/?token=...`
- Token dapat tercatat di:
  - Log akses server/CDN
  - Riwayat browser pengguna
  - HTTP Referer header (bocor ke domain eksternal)
- Violasi prinsip dasar keamanan OAuth/OIDC

**Rekomendasi:**
1. Hapus token dari URL query parameter
2. Gunakan salah satu pendekatan:
   - **postMessage bridge**: Kirim token via `window.postMessage()` dari popup
   - **Backend session transfer**: Frontend minta backend untuk generate session cookie, lalu redirect
   - **Authorization Code flow**: Implementasi proper OAuth2/OIDC
3. Implementasi SameSite cookies di sisi backend
4. Hapus token dari localStorage pasca navigasi

---

## 🟡 Temuan Sedang (Prioritas Menengah)

### SEDH-1: Hardcoded Credentials & Tracking IDs
**File:** `src/routes/index.tsx`, `src/routes/__root.tsx`
**Temuan:**
- Nomor WhatsApp: `+62-813-8789-5911`
- Google Analytics ID: `G-QTJLLW7M7Z`
- Microsoft Clarity ID: `x93fkookdr`
- Bing Webmaster Meta: `16C5717F3121D840BD0162D3962EBD7F`

**Rekomendasi:**
- Ekstrak ke environment variables: `import.meta.env.VITE_WHATSAPP_NUMBER`, dll
- Gunakan `.dev.vars` untuk Cloudflare Workers secrets

### SEDH-2: Simulasi Reset Password
**File:** `src/routes/forgot-password.tsx:34-38`
```typescript
// Simulasi/mock API call pemulihan password.
await new Promise((resolve) => setTimeout(resolve, 1500));
setSuccess(true);
```
**Rekomendasi:** Implementasi actual `POST /auth/forgot-password` ke backend.

### SEDH-3: Missing Security Headers
**File:** `wrangler.jsonc`
**Rekomendasi:** Tambahkan CSP, HSTS, X-Frame-Options, Referrer-Policy via Worker middleware/response headers.

---

## 🟢 Temuan Rendah / Observasi

### REN-1: Formatting Issues (CRLF)
Hampir semua file memiliki line endings CRLF, menyebabkan ratusan error ESLint Prettier:
```
error  Delete `␍`  prettier/prettier
```
**Solusi:** Jalankan `npx prettier --write .` dan atur `.gitattributes` untuk konsistensi.

### REN-2: Penggunaan `any` Type
**File:** `src/routes/modules.$moduleId.tsx:154`
```typescript
const { module: m, detail: d } = Route.useLoaderData() as any;
```
**Rekomendasi:** Gunakan typed interface yang sudah tersedia.

### REN-3: Duplikasi Utility
`formatIDR` didefinisikan di dua tempat:
- `src/lib/modules.ts:186`
- `src/lib/modules-api.ts:80`

**Rekomendasi:** Satukan ke `src/lib/utils.ts`.

### REN-4: Potensi Hydration Mismatch
**File:** `src/routes/dashboard.tsx:143` dan `src/components/site/Header.tsx:39`
Penggunaan langsung `localStorage` di dalam JSX render dapat menyebabkan hydration mismatch.

**Solusi yang sudah diterapkan:** `dashboard.tsx` memakai `typeof window !== 'undefined'` check — patokan baik.

---

## 🏗️ Konfigurasi Infrastruktur

| Komponen | Versi | Status |
|---|---|---|
| TanStack Start | 1.167.14 | ✅ Kompatibel |
| React | 19.2.0 | ✅ Terbaru |
| Vite | 7.3.1 | ✅ Stabil |
| TypeScript | 5.8.3 | ✅ Strict mode aktif |
| Cloudflare Wrangler | - | ⚠️ Butuh CSP headers |
| Prettier | 3.7.3 | ✅ Terintegrasi ESLint |
| ESLint | 9.32.0 | ✅ + TypeScript, React Hooks |

**Catatan Wrangler Config:**
```
{
  "name": "tanstack-start-app",
  "compatibility_date": "2025-09-24",
  "compatibility_flags": ["nodejs_compat"],
  "main": "@tanstack/react-start/server-entry",
}
```

---

## 🔐 Audit Keamanan Ringkas

| Kategori | Status | Catatan |
|---|---|---|
| Auth Token Storage | ⚠️ Medium Risk | localStorage (XSS vulnerable, no HttpOnly) |
| Token Transmission | 🔴 CRITICAL | Token bocor via URL di dashboard.tsx |
| CSRF Protection | ⚠️ Missing | Perlu implementasi jika pakai cookies |
| XSS Protection | 🟡 Partial | dangerouslySetInnerHTML hanya untuk analytics |
| Security Headers | 🔴 Missing | CSP, HSTS, X-Frame-Options, Referrer-Policy |
| Input Validation | ✅ Good | Zod schemas, regex patterns, client+backend validation |
| HTTPS | ✅ Assumed | API_BASE_URL = https://api.siarpi.com |
| Env Variables | 🔴 Hardcoded | Credentials exposed in source code |

---

## 🛠️ Rekomendasi Implementasi (Roadmap)

### Prioritas 1 (Segera)
1. [ ] **FIX CRITICAL** – Hapus token dari URL di `dashboard.tsx:143-145`
2. [ ] Implementasi postMessage bridge atau backend session transfer

### Prioritas 2 (Minggu ini)
3. [ ] Tambah CSP header via Wrangler/Vite middleware
4. [ ] Ekstrak credentials ke environment variables
5. [ ] Implementasi `POST /auth/forgot-password` yang proper

### Prioritas 3 (2 minggu)
6. [ ] Jalankan `npx prettier --write .` untuk fix formatting
7. [ ] Tambahkan `.gitattributes` dengan `* text=auto`
8. [ ] Refactor `formatIDR` ke single utility
9. [ ] Ganti `as any` dengan typed interfaces

---

Laporan ini dapat diakses kembali di: `AUDIT-SIARPI-YOUR-BUSINESS-SIMPLIFIED.md`
