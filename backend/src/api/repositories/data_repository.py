import pandas as pd

df = None


def set_df(new_df: pd.DataFrame):
    """Define o DataFrame global quando o CSV é carregado."""
    global df
    df = new_df


def get_df() -> pd.DataFrame:
    """Retorna o DataFrame atual. Lança erro se não estiver carregado."""
    if df is None:
        raise ValueError("CSV ainda não foi carregado.")
    return df
