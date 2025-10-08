from fastapi import APIRouter

from .routes import file_router

api_router = APIRouter()

api_router.include_router(file_router, prefix="/files", tags=["Files"])
