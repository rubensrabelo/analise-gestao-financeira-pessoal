from fastapi import APIRouter

from api.schemas import FinancialData
from api.services import report_service

router = APIRouter()


@router.get("/summary", response_model=FinancialData)
def financial_summary() -> FinancialData:
    """Retorna um resumo financeiro com entradas, saídas e saldo."""
    return report_service.get_financial_summary()


@router.get("/expense/category", response_model=list[FinancialData])
def expense_by_category() -> list[FinancialData]:
    """Retorna a soma de saídas agrupada por categoria."""
    return report_service.get_expense_by_category()


@router.get("/summary/month", response_model=list[FinancialData])
def income_and_expense_by_month() -> list[FinancialData]:
    """Retorna a soma de entradas e saídas agrupada por mês."""
    return report_service.get_income_and_expense_by_month()
