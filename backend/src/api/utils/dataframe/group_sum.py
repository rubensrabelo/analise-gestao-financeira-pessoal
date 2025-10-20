import pandas as pd


def group_sum(
        df: pd.DataFrame,
        group_col: str,
        value_col: str,
        sort_desc: bool = True
):
    """Agrupa um DataFrame por uma coluna e soma outra."""
    grouped = (
        df.groupby(group_col)[value_col]
        .sum()
        .reset_index()
        .sort_values(value_col, ascending=not sort_desc)
    )
    return grouped
