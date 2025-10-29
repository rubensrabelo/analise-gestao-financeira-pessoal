from fastapi import APIRouter

from api.schemas import (
    FinancialSummary, CategoryAmount, DateIncomeAndExpenseAmount
)
from api.services import report_service
from log import LoggerFactory

router = APIRouter()
logger = LoggerFactory.get_logger("AppLogger")


@router.get("/summary", response_model=FinancialSummary)
def financial_summary() -> FinancialSummary:
    """Retorna um resumo financeiro com entradas, saídas e saldo."""
    logger.info("Solicitado resumo financeiro")

    summary = report_service.get_financial_summary()

    logger.info("Resumo financeiro retornado com sucesso")
    return summary


@router.get("/expense/category", response_model=list[CategoryAmount])
def expense_by_category() -> list[CategoryAmount]:
    """Retorna a soma de saídas agrupada por categoria."""
    logger.info("Solicitada soma de saídas por categoria")

    result = report_service.get_expense_by_category()

    logger.info(f"Saídas por categoria retornadas ({len(result)} registros)")
    return result


@router.get("/income/category", response_model=list[CategoryAmount])
def income_by_category() -> list[CategoryAmount]:
    """Retorna a soma de entrada agrupada por categoria."""
    logger.info("Solicitada soma de entradas por categoria")

    result = report_service.get_income_by_category()

    logger.info(f"Entradas por categoria retornadas ({len(result)} registros)")
    return result


@router.get("/summary/month", response_model=list[DateIncomeAndExpenseAmount])
def income_and_expense_by_month() -> list[DateIncomeAndExpenseAmount]:
    """Retorna a soma de entradas e saídas agrupada por mês."""
    logger.info("Solicitada soma de entradas e saídas por mês")

    result = report_service.get_income_and_expense_by_month()

    logger.info(f"Resumo mensal retornado ({len(result)} registros)")
    return result
