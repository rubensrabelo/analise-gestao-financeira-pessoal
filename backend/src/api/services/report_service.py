import pandas as pd

from api.schemas import (
    FinancialSummary, CategoryAmount, DateIncomeAndExpenseAmount
)
from api.repositories.data_repository import get_df


def get_financial_summary() -> FinancialSummary:
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


def get_expense_by_category() -> list[CategoryAmount]:
    """Retorna a soma de saídas agrupada por categoria."""
    df = get_df()
    expenses = (
        df[df["fluxo"] == "saída"]
        .groupby("categoria")["valor"]
        .sum()
        .reset_index()
        .sort_values("valor", ascending=False)
    )
    expenses = expenses.rename(
        columns={"categoria": "category", "valor": "amount"}
    )
    return expenses.to_dict(orient="records")


def get_income_by_category() -> list[CategoryAmount]:
    """Retorna a soma de entradas agrupada por categoria."""
    df = get_df()
    incomes = (
        df[df["fluxo"] == "entrada"]
        .groupby("categoria")["valor"]
        .sum()
        .reset_index()
        .sort_values("valor", ascending=False)
    )
    incomes = incomes.rename(
        columns={"categoria": "category", "valor": "amount"}
    )
    return incomes.to_dict(orient="records")


def get_income_and_expense_by_month() -> list[DateIncomeAndExpenseAmount]:
    """Retorna a soma de entradas e saídas agrupada por mês."""
    df = get_df()
    df["data"] = pd.to_datetime(df["data"], errors="coerce")
    df["month"] = df["data"].dt.strftime("%Y-%m")

    summary = (
        df.groupby(["month", "fluxo"])["valor"]
        .sum()
        .reset_index()
        .pivot(index="month", columns="fluxo", values="valor")
        .fillna(0)
        .reset_index()
        .sort_values("month")
    )

    summary = summary.rename(
        columns={
            "entrada": "income",
            "saída": "expense",
        }
    )

    return summary.to_dict(orient="records")
