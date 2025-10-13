from fastapi import APIRouter
from api.repositories.data_repository import get_df

import pandas as pd

router = APIRouter()


@router.get("/summary")
def financial_summary():
    """Retorna um resumo financeiro com entradas, saídas e saldo."""
    df = get_df()
    total_income = df[df["fluxo"] == "entrada"]["valor"].sum()
    total_expense = df[df["fluxo"] == "saída"]["valor"].sum()
    balance = total_income - total_expense
    return {
        "income": float(total_income),
        "expense": float(total_expense),
        "balance": float(balance),
    }


@router.get("/expense/category")
def expense_by_category():
    """Retorna a soma de saídas agrupada por categoria."""
    df = get_df()
    expenses = (
        df[df["fluxo"] == "saída"]
        .groupby("categoria")["valor"]
        .sum()
        .reset_index()
        .sort_values("valor", ascending=False)
    )
    return expenses.to_dict(orient="records")


@router.get("/summary/month")
def income_and_expense_by_month():
    """Retorna a soma de entradas e saídas agrupada por mês."""
    df = get_df()
    df["data"] = pd.to_datetime(df["data"], errors="coerce")
    df["mes"] = df["data"].dt.strftime("%Y-%m")

    summary = (
        df.groupby(["mes", "fluxo"])["valor"]
        .sum()
        .reset_index()
        .pivot(index="mes", columns="fluxo", values="valor")
        .fillna(0)
        .reset_index()
        .sort_values("mes")
    )

    return summary.to_dict(orient="records")
