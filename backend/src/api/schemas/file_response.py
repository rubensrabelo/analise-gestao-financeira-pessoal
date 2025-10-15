from pydantic import BaseModel


class FileResponse(BaseModel):
    title: str
