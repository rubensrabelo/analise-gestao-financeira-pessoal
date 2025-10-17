export const ChartTypeEnum = {
  INCOME: "income",
  EXPENSE: "expense",
} as const;

export type ChartTypeEnum = typeof ChartTypeEnum[keyof typeof ChartTypeEnum];
