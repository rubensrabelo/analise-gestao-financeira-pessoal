import styles from "./ReportPage.module.css";
import { useReports } from "./hooks/useReports";
import { SummaryCards } from "./components/SummaryCards";
import { CategoryChart } from "./components/CategoryChart";
import { MonthlyChart } from "./components/MonthlyChart";
import { ChartTypeEnum } from "../../schemas/enums/CharTypeEnum";

function ReportPage() {
  const { summary, expenseCategoryData, incomeCategoryData, monthlyData, loading } = useReports();

  if (!summary) return null;

  return (
    <div className={styles.reportContainer}>
      <h2>Financial Dashboard</h2>
      {loading && <p className={styles.loading}>Loading reports...</p>}
      {!loading && !summary && (<p className={styles.error}>Error loading data.</p>)}

      <SummaryCards summary={summary} />

      <div className={styles.chartRow}>
        <CategoryChart data={expenseCategoryData} type={ChartTypeEnum.EXPENSE} />
        <CategoryChart data={incomeCategoryData} type={ChartTypeEnum.INCOME} />
      </div> 
      <MonthlyChart data={monthlyData} />
    </div>
  );
}

export default ReportPage;
