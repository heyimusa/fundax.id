#!/bin/bash

# Make the script executable with: chmod +x docker-dev.sh

case "$1" in
  build)
    docker-compose build
    ;;
  up)
    docker-compose up -d
    ;;
  down)
    docker-compose down
    ;;
  logs)
    docker-compose logs -f
    ;;
  *)
    echo "Usage: $0 {build|up|down|logs}"
    exit 1
    ;;
esac 