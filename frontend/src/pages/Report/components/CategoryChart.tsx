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
import type { CategoryChartProps } from "../../../schemas/reports/CategoryChartProps";
import { ChartTypeEnum } from "../../../schemas/enums/CharTypeEnum";

export function CategoryChart({ data, type }: CategoryChartProps) {
  const barColor = type === ChartTypeEnum.INCOME ? "#16a34a" : "#dc2626";

  return (
    <section className={styles.chartSection}>
      <h3>{type === ChartTypeEnum.INCOME ? "Income by Category" : "Expenses by Category"}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 50, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="category" type="category" width={120} />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill={barColor} name={type === ChartTypeEnum.INCOME ? "Income" : "Expense"} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
