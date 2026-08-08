import type { PayrollSubModuleDetail } from "./types";
import { payrollDashboard } from "./payroll-dashboard";
import { payRun } from "./pay-run";
import { payslips } from "./payslips";
import { kasbon } from "./kasbon";
import { jenisPotongan } from "./jenis-potongan";
import { configuration } from "./configuration";
import { taxBpjsConfig } from "./pengaturan";
import { journalMapping } from "./journal-mapping";

export const payrollSubModules: PayrollSubModuleDetail[] = [
  payrollDashboard,
  payRun,
  payslips,
  kasbon,
  jenisPotongan,
  configuration,
  taxBpjsConfig,
  journalMapping,
];

export const getPayrollSubModule = (id: string): PayrollSubModuleDetail | undefined => {
  const normalizedId = id.toLowerCase();
  if (normalizedId === "tax-config" || normalizedId === "tax_config") return taxBpjsConfig;
  if (normalizedId === "pay-slips" || normalizedId === "pay_slips") return payslips;
  return payrollSubModules.find(
    (mod) => mod.id === id || mod.id.toLowerCase() === normalizedId,
  );
};

export const getPayrollSubModuleByName = (name: string): PayrollSubModuleDetail | undefined =>
  payrollSubModules.find((mod) => mod.name.toLowerCase() === name.toLowerCase());
