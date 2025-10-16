import { useEffect, useState } from "react";
import type { FinancialSummary } from "../../../schemas/reports/financial-summary.interface";
import type { CategoryExpense } from "../../../schemas/reports/category-expenses.interface";
import type { MonthlySummary } from "../../../schemas/reports/monthly-summary.interface";
import { report } from "../../../api/services/report/reports.service";

export function useReports() {
  const [summary, setSummary] = useState<FinancialSummary | null>(null);
  const [categoryData, setCategoryData] = useState<CategoryExpense[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlySummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [summaryData, categoryData, monthData] = await Promise.all([
          report<FinancialSummary>("summary"),
          report<CategoryExpense[]>("expense/category"),
          report<MonthlySummary[]>("summary/month"),
        ]);

        setSummary(summaryData);
        setCategoryData(categoryData);
        setMonthlyData(monthData);
      } catch (err) {
        console.error("Error loading reports:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { summary, categoryData, monthlyData, loading };
}
