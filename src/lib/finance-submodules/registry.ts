import type { FinanceSubModuleDetail } from "./types";
import { jurnal } from "./jurnal";
import { kasBank } from "./kas-bank";
import { piutangAr } from "./piutang-ar";
import { hutangAp } from "./hutang-ap";
import { asetTetap } from "./aset-tetap";
import { pajak } from "./pajak";
import { kursValuta } from "./kurs-valuta";
import { budget } from "./budget";
import { laporan } from "./laporan";
import { pengaturan } from "./pengaturan";

export const financeSubModules: FinanceSubModuleDetail[] = [
  jurnal,
  kasBank,
  piutangAr,
  hutangAp,
  asetTetap,
  pajak,
  kursValuta,
  budget,
  laporan,
  pengaturan,
];

export const getFinanceSubModule = (id: string): FinanceSubModuleDetail | undefined =>
  financeSubModules.find((mod) => mod.id === id);

export const getFinanceSubModuleByName = (name: string): FinanceSubModuleDetail | undefined =>
  financeSubModules.find((mod) => mod.name.toLowerCase() === name.toLowerCase());
