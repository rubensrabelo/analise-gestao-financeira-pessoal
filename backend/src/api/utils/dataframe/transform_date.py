import pandas as pd


def prepare_monthly_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    """
    Converte a coluna 'data' para datetime
    e cria uma coluna 'month' no formato YYYY-MM.
    """
    df = df.copy()
    df["data"] = pd.to_datetime(df["data"], errors="coerce")
    df["month"] = df["data"].dt.strftime("%Y-%m")
    return df
