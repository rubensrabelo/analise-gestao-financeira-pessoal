from fastapi import UploadFile, HTTPException
from starlette import status
import pandas as pd
from pathlib import Path

from api.utils import csv_file
from api.utils import file_utils
from api.utils import validate_csv
from api.repositories.data_repository import set_df
from config import CSV_PATH


async def upload(file: UploadFile):
    """Faz o upload de um arquivo CSV e o salva na pasta `uploads/`."""
    if not file.filename or not file.filename.endswith(".csv"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file. Only .csv files are accepted."
        )

    try:
        upload_dir = file_utils.ensure_upload_dir_exists(Path(CSV_PATH))
        file_path = await csv_file.save(file, upload_dir)

        df = pd.read_csv(file_path)
        validate_csv.validate_csv(df)

        set_df(df)

        return {
            "message": "File uploaded successfully."
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error saving file: {e}"
        )
