#!/bin/bash

# Stop and remove existing containers
docker stop $(docker ps -a -q --filter="name=swe642-frontend") || true
docker rm $(docker ps -a -q --filter="name=swe642-frontend") || true

docker stop $(docker ps -a -q --filter="name=swe642-backend") || true
docker rm $(docker ps -a -q --filter="name=swe642-backend") || true

# Remove existing images
docker rmi swe642-frontend || true
docker rmi swe642-backend || true

# Build and run the frontend container
docker build -t swe642-frontend ./frontend
docker run -d -p 4200:80 --name swe642-frontend swe642-frontend

# Build and run the backend container
docker build -t swe642-backend ./backend/SWE-645-Assignment-3-main/SWE-645-Assignment-3-main
docker run -d -p 8080:8080 --name swe642-backend swe642-backend
