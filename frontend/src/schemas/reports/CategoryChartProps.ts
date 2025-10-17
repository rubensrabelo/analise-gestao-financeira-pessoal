import type { ChartTypeEnum } from "../enums/CharTypeEnum";
import type { CategoryAmount } from "./CategoryAmount";

export interface CategoryChartProps {
  data: CategoryAmount[];
  type: ChartTypeEnum;
}