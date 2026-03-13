FROM python:3.11-slim

# Install ffmpeg for yt-dlp to extract mp3, and nodejs for youtube bot protection bypass
RUN apt-get update && apt-get install -y ffmpeg nodejs && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir -U --pre yt-dlp curl-cffi

COPY . .

EXPOSE 8082

CMD ["python", "app.py"]
