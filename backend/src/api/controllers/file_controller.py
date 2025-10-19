from fastapi import APIRouter, UploadFile

from api.schemas import MessageResponse
from api.services import file_service

router = APIRouter()


@router.post("/uploads", response_model=MessageResponse)
async def upload(file: UploadFile) -> MessageResponse:
    """Faz o upload de um arquivo CSV"""
    return await file_service.upload(file)
