import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "../ReportPage.module.css";
import type { MonthlyChartProps } from "../../../schemas/reports/MonthlyChartProps";

export function MonthlyChart({ data }: MonthlyChartProps) {
  return (
    <section className={styles.chartSection}>
      <h3>Income and Expenses by Month</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#16a34a" name="Income" />
          <Bar dataKey="expense" fill="#dc2626" name="Expense" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
