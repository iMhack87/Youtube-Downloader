FROM python:3.11-slim

# Install ffmpeg for yt-dlp to extract mp3
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir -U --pre yt-dlp curl-cffi

COPY . .

# Installation du plugin yt-dlp-youtube-oauth2
RUN apt-get install -y git && \
    git clone https://github.com/coletdjnz/yt-dlp-youtube-oauth2.git /tmp/plugin && \
    cp -r /tmp/plugin/yt_dlp_plugins/ /app/yt_dlp_plugins/ && \
    rm -rf /tmp/plugin && \
    apt-get remove -y git && apt-get autoremove -y

EXPOSE 8082

CMD ["python", "app.py"]
