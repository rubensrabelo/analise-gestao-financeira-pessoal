from fastapi import HTTPException


def raise_http_exception(status_code: int, message: str):
    """Lança uma exceção HTTP padronizada."""
    raise HTTPException(status_code=status_code, detail=message)
