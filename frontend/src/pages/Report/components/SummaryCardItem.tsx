import type { SummaryCardItemProps } from "../../../schemas/reports/SummaryCardItemProps";
import styles from "../ReportPage.module.css";

export function SummaryCardItem({ title, value, variant }: SummaryCardItemProps) {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <h3>{title}</h3>
      <p>${value.toFixed(2)}</p>
    </div>
  );
}
