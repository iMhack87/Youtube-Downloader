docker stop ytb
docker rm ytb
docker build -t youtube-downloader .
docker run -d -p 8082:8082 --name ytb youtube-downloader
