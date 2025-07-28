# Utilise Python 3.10
FROM python:3.10-slim

# Crée le dossier de travail
WORKDIR /app

# Copie les dépendances et installe-les
COPY python_backend/requirements.txt .

RUN apt-get update && apt-get install -y ffmpeg \
  && pip install --upgrade pip \
  && pip install -r requirements.txt

# Copie le code backend
COPY python_backend /app

# Lance l'app avec Uvicorn
CMD ["uvicorn", "start_backend:app", "--host", "0.0.0.0", "--port", "8080"]
