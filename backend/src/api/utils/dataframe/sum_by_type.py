import pandas as pd


def get_sum_by_type(df: pd.DataFrame):
    """Retorna a soma de entradas e saídas agrupada por fluxo."""
    total_income = df[df["fluxo"] == "entrada"]["valor"].sum()
    total_expense = df[df["fluxo"] == "saída"]["valor"].sum()
    return total_income, total_expense
