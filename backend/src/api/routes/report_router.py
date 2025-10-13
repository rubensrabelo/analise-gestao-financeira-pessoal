from fastapi import APIRouter
from repositories.data_repository import df
import pandas as pd

router = APIRouter()


@router.get("/summary")
def financial_summary():
    """Retorna um resumo financeiro com entradas, saídas e saldo."""
    total_income = df["entrada"].sum()
    total_expense = df["saida"].sum()
    balance = total_income - total_expense
    return {
        "income": float(total_income),
        "expense": float(total_expense),
        "balance": float(balance),
    }


@router.get("/expense/category")
def expense_by_category():
    """Retorna a soma de saídas agrupada por categoria."""
    expenses = df.groupby("categoria")["saida"].sum().reset_index()
    return expenses.to_dict(orient="records")


@router.get("/summary/month")
def income_and_expense_by_month():
    """Retorna a soma de entradas e saídas agrupada por mês."""
    df["data"] = pd.to_datetime(df["data"], errors="coerce")
    df["mes"] = df["data"].dt.strftime("%Y-%m")

    summary = (
        df.groupby("mes")[["entrada", "saida"]]
        .sum()
        .reset_index()
        .sort_values("mes")
    )

    return summary.to_dict(orient="records")
