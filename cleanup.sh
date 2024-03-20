#!/bin/bash

# Stop and remove existing containers
docker stop $(docker ps -a -q --filter="name=swe642-frontend") || true
docker rm $(docker ps -a -q --filter="name=swe642-frontend") || true

docker stop $(docker ps -a -q --filter="name=swe642-backend") || true
docker rm $(docker ps -a -q --filter="name=swe642-backend") || true

# Remove existing images
docker rmi swe642-frontend || true
docker rmi swe642-backend || true

