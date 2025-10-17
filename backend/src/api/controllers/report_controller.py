from fastapi import APIRouter

from api.schemas import (
    FinancialSummary, CategoryAmount, DateIncomeAndExpenseAmount
)
from api.services import report_service

router = APIRouter()


@router.get("/summary", response_model=FinancialSummary)
def financial_summary() -> FinancialSummary:
    """Retorna um resumo financeiro com entradas, saídas e saldo."""
    return report_service.get_financial_summary()


@router.get("/expense/category", response_model=list[CategoryAmount])
def expense_by_category() -> list[CategoryAmount]:
    """Retorna a soma de saídas agrupada por categoria."""
    return report_service.get_expense_by_category()


@router.get("/income/category", response_model=list[CategoryAmount])
def income_by_category() -> list[CategoryAmount]:
    """Retorna a soma de entrada agrupada por categoria."""
    return report_service.get_income_by_category()


@router.get("/summary/month", response_model=list[DateIncomeAndExpenseAmount])
def income_and_expense_by_month() -> list[DateIncomeAndExpenseAmount]:
    """Retorna a soma de entradas e saídas agrupada por mês."""
    return report_service.get_income_and_expense_by_month()
