export const MetricEnum = {
    SUMMARY: "summary",
    CATEGORY_EXPENSE: "expense/category",
    INCOME_EXPENSE: "income/category",
    SUMMARY_MONTH: "summary/month",
} as const;

export type MetricEnum = typeof MetricEnum[keyof typeof MetricEnum];