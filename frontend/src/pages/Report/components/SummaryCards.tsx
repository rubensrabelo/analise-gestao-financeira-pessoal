import type { SummaryCardsProps } from "../../../schemas/reports/SummaryCardsProps";
import styles from "../ReportPage.module.css";
import { SummaryCardItem } from "./SummaryCardItem";

export function SummaryCards({ summary }: SummaryCardsProps) {
  return (
    <div className={styles.cardContainer}>
      <SummaryCardItem title="Income" value={summary!.income} variant="income" />
      <SummaryCardItem title="Expense" value={summary!.expense} variant="expense" />
      <SummaryCardItem title="Balance" value={summary!.balance} variant="balance" />
    </div>
  );
}
