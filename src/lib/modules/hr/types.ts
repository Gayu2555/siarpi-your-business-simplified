export interface HrFeature {
  title: string;
  desc: string;
}

export interface HrTestimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

export interface HrSubModuleDetail {
  id: string;
  name: string;
  category: string;
  tagline: string;
  longDescription: string;
  iconName: string;
  keyBenefits: string[];
  features: HrFeature[];
  workflowSteps: { step: string; title: string; desc: string }[];
  frontendPath: string;
  backendPath: string;
  sampleStats: { label: string; value: string; note: string }[];
  sampleRows: { code: string; title: string; category: string; amount: string; status: string }[];
  faq: { q: string; a: string }[];
}
