export interface PayrollFeature {
  title: string;
  desc: string;
}

export interface PayrollSubModuleDetail {
  id: string;
  name: string;
  category: string;
  tagline: string;
  longDescription: string;
  iconName: string;
  keyBenefits: string[];
  features: PayrollFeature[];
  workflowSteps: { step: string; title: string; desc: string }[];
  frontendPath: string;
  backendPath: string;
  sampleStats: { label: string; value: string; note: string }[];
  sampleRows: { code: string; title: string; category: string; amount: string; status: string }[];
  faq: { q: string; a: string }[];
}
