from fastapi import APIRouter, UploadFile

from api.services import file_service

router = APIRouter()


@router.post("/uploads")
async def upload(file: UploadFile):
    """Faz o upload de um arquivo CSV"""
    return await file_service.upload(file)
