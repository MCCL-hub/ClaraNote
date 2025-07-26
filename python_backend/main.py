from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import upload, transcription, summary, export

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router)
app.include_router(transcription.router)
app.include_router(summary.router)
app.include_router(export.router)

@app.get("/ping")
def ping():
    return {"message": "ClaraNote API is live!"}