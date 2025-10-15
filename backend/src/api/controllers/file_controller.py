from fastapi import APIRouter, UploadFile

from api.schemas import FileResponse
from api.services import file_service

router = APIRouter()


@router.post("/uploads", response_model=FileResponse)
async def upload(file: UploadFile):
    """Faz o upload de um arquivo CSV"""
    return await file_service.upload(file)
