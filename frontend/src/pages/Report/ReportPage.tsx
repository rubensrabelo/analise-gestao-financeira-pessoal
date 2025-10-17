import styles from "./ReportPage.module.css";
import { useReports } from "./hooks/useReports";
import { SummaryCards } from "./components/SummaryCards";
import { CategoryChart } from "./components/CategoryChart";
import { MonthlyChart } from "./components/MonthlyChart";

function ReportPage() {
  const { summary, categoryData, monthlyData, loading } = useReports();

  if (loading) return;
  if (!summary) return <p className={styles.error}>Error loading data.</p>;

  return (
    <div className={styles.reportContainer}>
      <h2>Financial Dashboard</h2>
      {loading && <p className={styles.loading}>Loading reports...</p>}
      {!loading && !summary && (<p className={styles.error}>Error loading data.</p>)}

      <SummaryCards summary={summary} />
      <CategoryChart data={categoryData} />
      <MonthlyChart data={monthlyData} />
    </div>
  );
}

export default ReportPage;
