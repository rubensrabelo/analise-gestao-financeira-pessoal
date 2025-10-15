from fastapi import HTTPException
from starlette import status
import pandas as pd


def validate_csv(df: pd.DataFrame):
    """Valida se o CSV possui todas as colunas necessárias."""
    required_columns = {"fluxo", "valor", "categoria", "data"}
    if not required_columns.issubset(df.columns):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"CSV missing required columns: {
                required_columns - set(df.columns)
            }"
        )
