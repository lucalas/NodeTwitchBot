rem command to execute to run the container with a new volume

docker container stop twitchbot
docker container rm twitchbot
docker volume rm test-vol
docker image rm twitchbot
docker build . --tag twitchbot

docker volume create test-vol
docker run -d --network host --name twitchbot --mount source=test-vol,target=/app twitchbot:latest
