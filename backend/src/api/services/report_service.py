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
from log import LoggerFactory

logger = LoggerFactory.get_logger("AppLogger")


def get_financial_summary() -> FinancialSummary:
    df = get_df()
    logger.debug(f"DataFrame carregado: {len(df)} registros")

    total_income, total_expense = get_sum_by_type(df)
    logger.debug(
        f"Total income: {total_income}, Total expense: {total_expense}"
    )

    return {
        "income": float(total_income),
        "expense": float(total_expense),
        "balance": float(total_income - total_expense),
    }


def get_income_by_category() -> list[CategoryAmount]:
    result = get_sum_by_category("entrada")
    logger.debug(
        f"Entradas por categoria calculadas ({len(result)} registros)"
    )
    return result


def get_expense_by_category() -> list[CategoryAmount]:
    result = get_sum_by_category("saída")
    logger.debug(f"Saídas por categoria calculadas ({len(result)} registros)")
    return result


def get_income_and_expense_by_month() -> list[DateIncomeAndExpenseAmount]:
    """Retorna a soma de entradas e saídas agrupada por mês."""
    df = get_df()
    logger.debug(f"DataFrame original para resumo mensal: {len(df)} registros")

    df = prepare_monthly_dataframe(df)
    summary = summarize_income_and_expense(df)
    logger.debug(f"Resumo mensal preparado: {len(summary)} registros")

    return summary.to_dict(orient="records")
