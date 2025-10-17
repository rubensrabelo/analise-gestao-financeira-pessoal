import type { SummaryCardVariantEnum } from "../enums/SummaryCardVariantEnum";

export interface SummaryCardItemProps {
  title: string;
  value: number;
  variant: SummaryCardVariantEnum;
}