#!/bin/bash
cd python_backend
mkdir -p tmp_audio static/exports
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload