from starlette import status
import pandas as pd

from api.services.errors.base.base_error import raise_http_exception


def validate_csv_column(df: pd.DataFrame):
    """Valida se o CSV possui todas as colunas necessárias."""
    required_columns = {"fluxo", "valor", "categoria", "data"}
    if not required_columns.issubset(df.columns):
        raise_http_exception(
            status.HTTP_400_BAD_REQUEST,
            f"CSV missing required columns: {
                required_columns - set(df.columns)
            }"
        )
