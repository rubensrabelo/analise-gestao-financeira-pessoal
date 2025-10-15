from fastapi import UploadFile
from pathlib import Path
import shutil


async def save(file: UploadFile, upload_dir: Path):
    """
    Salva um arquivo enviado (UploadFile) no caminho especificado.
    """
    fixed_filename = "data.csv"
    file_path = upload_dir / fixed_filename
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    await file.close()
    return file_path
