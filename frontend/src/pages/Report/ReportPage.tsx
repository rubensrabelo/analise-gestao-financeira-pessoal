import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useReports } from "./hooks/useReports";
import styles from "./ReportPage.module.css";

function ReportPage() {
  const { summary, categoryData, monthlyData, loading } = useReports();

  if (loading) return <p className={styles.loading}>Loading reports...</p>;
  if (!summary) return <p className={styles.error}>Error loading data.</p>;

  return (
    <div className={styles.reportContainer}>
      <h2>Financial Dashboard</h2>

      {/* === 3 CARDS === */}
      <div className={styles.cardContainer}>
        <div className={`${styles.card} ${styles.income}`}>
          <h3>Income</h3>
          <p>${summary.income.toFixed(2)}</p>
        </div>

        <div className={`${styles.card} ${styles.expense}`}>
          <h3>Expense</h3>
          <p>${summary.expense.toFixed(2)}</p>
        </div>

        <div className={`${styles.card} ${styles.balance}`}>
          <h3>Balance</h3>
          <p>${summary.balance.toFixed(2)}</p>
        </div>
      </div>

      {/* === CATEGORY CHART === */}
      <section className={styles.chartSection}>
        <h3>Expenses by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={categoryData}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 50, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="category" type="category" width={120} />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#dc2626" name="Expense" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* === MONTHLY CHART === */}
      <section className={styles.chartSection}>
        <h3>Income and Expenses by Month</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
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
    </div>
  );
}

export default ReportPage;
