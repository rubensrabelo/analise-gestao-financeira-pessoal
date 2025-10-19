from fastapi import UploadFile
import pandas as pd
from pathlib import Path

from api.services.errors import (
    validate_name_and_type,
    validate_csv_column,
    raise_database_error
)
from api.schemas import FileResponse
from api.utils import csv_file, file_utils
from api.repositories.data_repository import set_df
from config import CSV_PATH


async def upload(file: UploadFile) -> FileResponse:
    """Faz o upload de um arquivo CSV e o salva na pasta `uploads/`."""
    validate_name_and_type(file)

    try:
        upload_dir = file_utils.ensure_upload_dir_exists(Path(CSV_PATH))
        file_path = await csv_file.save(file, upload_dir)

        df = pd.read_csv(file_path)
        validate_csv_column(df)

        set_df(df)

        return {
            "message": "File uploaded successfully."
        }
    except Exception as e:
        raise_database_error(e)
