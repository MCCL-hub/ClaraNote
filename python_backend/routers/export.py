from fastapi import APIRouter
from pydantic import BaseModel
from services.pdf_generator import generate_pdf

router = APIRouter()

class ExportRequest(BaseModel):
    summary: str

@router.post("/export-pdf")
def export_pdf(request: ExportRequest):
    file_url = generate_pdf(request.summary)
    return {"file_url": file_url}