import uvicorn
import os

if __name__ == "__main__":
    # Create necessary directories
    os.makedirs("tmp_audio", exist_ok=True)
    os.makedirs("static/exports", exist_ok=True)
    
    # Start the FastAPI server
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)