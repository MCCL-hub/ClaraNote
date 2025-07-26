from fastapi import APIRouter
from pydantic import BaseModel
from services.whisper_transcriber import transcribe_audio

router = APIRouter()

class TranscriptionRequest(BaseModel):
    path: str

@router.post("/transcribe")
def transcribe(request: TranscriptionRequest):
    transcription = transcribe_audio(request.path)
    return {"transcription": transcription}