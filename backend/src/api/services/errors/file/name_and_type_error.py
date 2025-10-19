from fastapi import UploadFile
from starlette import status

from api.services.errors.base.base_error import raise_http_exception


def validate_name_and_type(file: UploadFile):
    """Verifica se o arquivo é CSV válido."""
    if not file.filename or not file.filename.endswith(".csv"):
        raise_http_exception(
            status.HTTP_400_BAD_REQUEST,
            "Invalid file. Only .csv files are accepted."
        )
