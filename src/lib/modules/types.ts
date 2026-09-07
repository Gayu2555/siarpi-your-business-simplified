export type Feature = { title: string; desc: string };
export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
};
export type ScreenshotBlock = {
  label: string;
  value: string;
  tone: "primary" | "muted" | "accent";
};

export type ModuleDetail = {
  tagline: string;
  longDescription: string;
  keyBenefits?: string[];
  features: Feature[];
  // stats & rows OPSIONAL: keduanya hanya dipakai ModuleMockupPreview di
  // cabang fallback, yaitu ketika modul tidak punya `images` maupun `image`.
  // Modul yang punya screenshot (mis. hr & payroll) memang tidak mengisinya,
  // dan sebelumnya tipe ini menuntut keduanya sehingga `tsc` gagal padahal
  // datanya benar.
  mockup: {
    title: string;
    subtitle: string;
    image?: string;
    images?: string[];
    stats?: ScreenshotBlock[];
    rows?: { label: string; sub: string; value: string }[];
  };
  testimonials: Testimonial[];
  faq: { q: string; a: string }[];
};
