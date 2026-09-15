import type { ModuleDetail } from "./types";
import { hr } from "./hr/index";
import { payroll } from "./payroll/index";
import { finance } from "./finance";
import { inventory } from "./inventory";
import { procurement } from "./procurement";
import { production } from "./production";
import { crm } from "./crm";
import { absensi } from "./absensi";
import { invoice } from "./invoice";
import { employeePortal } from "./employee-portal";

export const moduleDetails: Record<string, ModuleDetail> = {
  hr,
  payroll,
  finance,
  inventory,
  procurement,
  production,
  crm,
  absensi,
  invoice,
  employee_portal: employeePortal,
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
