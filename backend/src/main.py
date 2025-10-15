from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes import file_router, report_router

app = FastAPI()

app.include_router(file_router)
app.include_router(report_router)

origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5500",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
