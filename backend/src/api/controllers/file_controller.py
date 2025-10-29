from fastapi import APIRouter, UploadFile

from api.schemas import MessageResponse
from api.services import file_service
from log import LoggerFactory

router = APIRouter()
logger = LoggerFactory.get_logger("AppLogger")


@router.post("/uploads", response_model=MessageResponse)
async def upload(file: UploadFile) -> MessageResponse:
    """Rota de upload de arquivo CSV"""
    logger.info(f"Iniciando upload: {file.filename}")

    response = await file_service.upload(file)

    logger.info(f"Upload finalizado com sucesso: {file.filename}")
    return response
