from fastapi import APIRouter

from api.controllers import report_router

router = APIRouter()

router.include_router(report_router, prefix="/reports", tags=["Reports"])
