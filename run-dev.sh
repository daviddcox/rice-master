#!/bin/bash

clear
echo "Starting backend in dev mode..."

# Starts the containers in watch mode, which restarts the server when you edit a file in server/src
docker compose --profile dev up --watch --remove-orphans --build