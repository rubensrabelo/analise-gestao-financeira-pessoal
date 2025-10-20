import pandas as pd

_global_df = None


def set_df(new_df: pd.DataFrame):
    """Define o DataFrame global quando o CSV é carregado."""
    global _global_df
    _global_df = new_df


def get_df() -> pd.DataFrame:
    """Retorna o DataFrame atual. Lança erro se não estiver carregado."""
    if _global_df is None:
        raise ValueError("CSV ainda não foi carregado.")
    return _global_df
