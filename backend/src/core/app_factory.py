from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes import file_router, report_router


def create_app() -> FastAPI:
    """Cria e configura a aplicação FastAPI."""
    app = FastAPI(
        title="Financial Report API",
        description="API para upload de arquivos e geração de relatórios.",
        version="1.0.0",
    )

    allowed_origins = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5500",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:8000",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(file_router, prefix="/files", tags=["Files"])
    app.include_router(report_router, prefix="/reports", tags=["Reports"])

    return app
