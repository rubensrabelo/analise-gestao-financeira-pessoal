export const MetricType = {
    SUMMARY: "summary",
    EXPENSE_CATEGORY: "expense/category",
    SUMMARY_MONTH: "summary/month",
} as const;

export type MetricType = typeof MetricType[keyof typeof MetricType];