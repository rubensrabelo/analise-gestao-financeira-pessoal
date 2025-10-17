import { useEffect, useState } from "react";
import type { FinancialSummary } from "../../../schemas/reports/FinancialSummary";
import type { CategoryAmount } from "../../../schemas/reports/CategoryAmount";
import type { MonthlySummary } from "../../../schemas/reports/MonthlySummary";
import { report } from "../../../api/services/report/ReportsService";
import { MetricEnum } from "../../../schemas/enums/MetricEnum";

export function useReports() {
  const [summary, setSummary] = useState<FinancialSummary | null>(null);
  const [expenseCategoryData, setExpenseCategoryData] = useState<CategoryAmount[]>([]);
  const [incomeCategoryData, setIncomeCategoryData] = useState<CategoryAmount[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlySummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [summaryData, ExpensecategoryData, IncomecategoryData, monthData] = await Promise.all([
          report<FinancialSummary>(MetricEnum.SUMMARY),
          report<CategoryAmount[]>(MetricEnum.CATEGORY_EXPENSE),
          report<CategoryAmount[]>(MetricEnum.INCOME_EXPENSE),
          report<MonthlySummary[]>(MetricEnum.SUMMARY_MONTH),
        ]);

        setSummary(summaryData);
        setExpenseCategoryData(ExpensecategoryData);
        setIncomeCategoryData(IncomecategoryData);
        setMonthlyData(monthData);
      } catch (err) {
        console.error("Error loading reports:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { summary, expenseCategoryData, incomeCategoryData, monthlyData, loading };
}
