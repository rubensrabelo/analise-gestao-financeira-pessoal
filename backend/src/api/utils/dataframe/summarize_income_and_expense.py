import pandas as pd


def summarize_income_and_expense(df: pd.DataFrame) -> pd.DataFrame:
    """Agrupa e pivota os valores de entrada e saída por mês."""
    summary = (
        df.groupby(["month", "fluxo"])["valor"]
        .sum()
        .reset_index()
        .pivot(index="month", columns="fluxo", values="valor")
        .fillna(0)
        .reset_index()
        .sort_values("month")
        .rename(columns={"entrada": "income", "saída": "expense"})
    )
    return summary
