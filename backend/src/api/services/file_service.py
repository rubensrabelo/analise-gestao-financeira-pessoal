from fastapi import UploadFile
import pandas as pd
from pathlib import Path

from api.schemas import MessageResponse
from api.services.errors import (
    validate_name_and_type,
    validate_csv_column,
    raise_database_error
)
from api.utils import create_folder, save_file
from api.repositories.data_repository import set_df
from config import CSV_PATH


async def upload(file: UploadFile) -> MessageResponse:
    """Faz o upload de um arquivo CSV"""
    validate_name_and_type(file)

    try:
        upload_dir = create_folder(Path(CSV_PATH))
        file_path = await save_file.save(file, upload_dir)

        df = pd.read_csv(file_path)
        validate_csv_column(df)

        set_df(df)

        return MessageResponse("File uploaded successfully.")
    except Exception as e:
        raise_database_error(e)
