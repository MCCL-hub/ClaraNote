from fastapi import APIRouter, UploadFile, File
import os

router = APIRouter()

UPLOAD_DIR = "tmp_audio"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
def upload_audio(file: UploadFile = File(...)):
    file_location = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_location, "wb") as f:
        f.write(file.file.read())
    return {"filename": file.filename, "path": file_location}