export interface FinanceSubModuleDetail {
  id: string;
  name: string;
  category: string;
  tagline: string;
  longDescription: string;
  iconName: string;
  keyBenefits: string[];
  features: { title: string; desc: string }[];
  workflowSteps: { step: string; title: string; desc: string }[];
  frontendPath: string;
  backendPath: string;
  sampleStats: { label: string; value: string; note: string }[];
  sampleRows: { code: string; title: string; category: string; amount: string; status: string }[];
  comparisons?: {
    beforeTitle: string;
    beforeDesc: string;
    afterTitle: string;
    afterDesc: string;
  }[];
  faq: { q: string; a: string }[];
}
