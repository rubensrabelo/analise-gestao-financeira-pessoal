from api.routes.reports_router import router as file_router
from api.routes.files_router import router as report_router

__all__ = [
    "file_router",
    "report_router",
]
