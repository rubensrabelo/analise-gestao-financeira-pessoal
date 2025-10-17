export const SummaryCardVariantEnum = {
    INCOME: "income",
    EXPENSE: "expense",
    BALANCE: "balance",
} as const;

export type SummaryCardVariantEnum = typeof SummaryCardVariantEnum[keyof typeof SummaryCardVariantEnum]
