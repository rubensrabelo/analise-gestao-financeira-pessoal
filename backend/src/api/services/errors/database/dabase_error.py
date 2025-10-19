from starlette import status

from api.services.errors.base.base_error import raise_http_exception


def raise_database_error(error: Exception):
    """
    Lança uma exceção HTTP padrão para erros relacionados ao banco de dados.
    """
    raise_http_exception(
        status.HTTP_500_INTERNAL_SERVER_ERROR,
        f"Database operation failed: {error}"
    )
