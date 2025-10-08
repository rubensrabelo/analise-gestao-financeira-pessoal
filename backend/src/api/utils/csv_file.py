from fastapi import UploadFile
from pathlib import Path
import shutil


async def save(file: UploadFile, file_path: Path):
    """
    Salva um arquivo enviado (UploadFile) no caminho especificado.
    """
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    await file.close()
