from fastapi import APIRouter

from api.controllers import file_router

router = APIRouter()

router.include_router(file_router, prefix="/files", tags=["Files"])
