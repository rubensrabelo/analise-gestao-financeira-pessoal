from api.repositories.data_repository import get_df
from api.utils import (
    get_sum_by_category,
    get_sum_by_type,
    prepare_monthly_dataframe,
    summarize_income_and_expense
)
from api.schemas import (
    FinancialSummary, CategoryAmount, DateIncomeAndExpenseAmount
)


def get_financial_summary() -> FinancialSummary:
    df = get_df()
    total_income, total_expense = get_sum_by_type(df)

    return {
        "income": float(total_income),
        "expense": float(total_expense),
        "balance": float(total_income - total_expense),
    }


def get_income_by_category() -> list[CategoryAmount]:
    return get_sum_by_category("entrada")


def get_expense_by_category() -> list[CategoryAmount]:
    return get_sum_by_category("saída")


def get_income_and_expense_by_month() -> list[DateIncomeAndExpenseAmount]:
    """Retorna a soma de entradas e saídas agrupada por mês."""
    df = get_df()
    df = prepare_monthly_dataframe(df)
    summary = summarize_income_and_expense(df)
    return summary.to_dict(orient="records")
