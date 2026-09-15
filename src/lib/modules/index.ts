import type { ModuleDetail } from "./types";
import { hr } from "./hr/index";
import { payroll } from "./payroll/index";
import { finance } from "./finance";
import { inventory } from "./inventory";
import { project } from "./project";
import { crm } from "./crm";
import { absensi } from "./absensi";
import { invoice } from "./invoice";

export const moduleDetails: Record<string, ModuleDetail> = {
  hr,
  payroll,
  finance,
  inventory,
  project,
  crm,
  absensi,
  invoice,
};

export {
  modules,
  ICON_MAP,
  financeSubModules,
  getFinanceSubModule,
  getModuleIcon,
} from "./registry";

export type { ModuleItem, FinanceSubModule } from "./registry";
export type { ModuleDetail, Feature, Testimonial, ScreenshotBlock } from "./types";
