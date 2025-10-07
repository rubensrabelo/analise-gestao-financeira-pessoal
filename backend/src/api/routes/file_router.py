from fastapi import APIRouter, UploadFile

router = APIRouter()


@router.post("/uploads")
def upload(file: UploadFile):
    return {
        "message:": "File uploaded successfully.",
        "filename:": file.filename,
    }
