from fastapi import APIRouter, UploadFile, HTTPException
from starlette import status
from pathlib import Path

from api.utils import csv_file
from api.utils import file_utils

router = APIRouter()

BASE_DIR = Path(__file__).resolve().parent.parent.parent
UPLOAD_DIR = file_utils.ensure_upload_dir_exists(BASE_DIR)


@router.post("/uploads")
async def upload(file: UploadFile):
    """Faz o upload de um arquivo CSV e o salva na pasta `uploads/`."""
    if file.filename is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Filename is missing."
        )

    if not file.filename.endswith(".csv"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only .csv files are accepted."
        )

    try:
        fixed_filename = "data.csv"
        file_path = UPLOAD_DIR / fixed_filename

        await csv_file.save(file, file_path)

        return {
            "message": "File uploaded successfully.",
            "filename": file_path,
            "path": str(file_path)
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error saving file: {e}"
        )
