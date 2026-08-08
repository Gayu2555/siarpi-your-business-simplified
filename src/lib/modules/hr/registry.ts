import type { HrSubModuleDetail } from "./types";
import { karyawan } from "./karyawan";
import { absensi } from "./absensi";
import { cuti } from "./cuti";
import { lembur } from "./lembur";
import { shift } from "./shift";
import { reimbursement } from "./reimbursement";
import { departemen } from "./departemen";
import { jabatan } from "./jabatan";
import { hierarki } from "./hierarki";
import { payrollDashboard } from "./payroll-dashboard";

export const hrSubModules: HrSubModuleDetail[] = [
  karyawan,
  absensi,
  cuti,
  lembur,
  shift,
  reimbursement,
  departemen,
  jabatan,
  hierarki,
  payrollDashboard,
];

export const getHrSubModule = (id: string): HrSubModuleDetail | undefined => {
  const normalizedId = id.toLowerCase();
  return hrSubModules.find(
    (mod) => mod.id === id || mod.id.toLowerCase() === normalizedId,
  );
};

export const getHrSubModuleByName = (name: string): HrSubModuleDetail | undefined =>
  hrSubModules.find((mod) => mod.name.toLowerCase() === name.toLowerCase());
