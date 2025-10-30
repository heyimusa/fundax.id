#!/bin/bash

# Make the script executable with: chmod +x hotreload.sh

case "$1" in
  build)
    docker-compose -f docker-compose.hotreload.yaml build
    ;;
  up)
    docker-compose -f docker-compose.hotreload.yaml up -d
    echo "Hot reload server started at http://localhost:8080"
    echo "Use './hotreload.sh logs' to see the development server output"
    ;;
  down)
    docker-compose -f docker-compose.hotreload.yaml down
    ;;
  logs)
    docker-compose -f docker-compose.hotreload.yaml logs -f
    ;;
  restart)
    docker-compose -f docker-compose.hotreload.yaml restart
    ;;
  *)
    echo "Usage: $0 {build|up|down|logs|restart}"
    echo ""
    echo "  build   - Build the hot reload Docker image"
    echo "  up      - Start the hot reload development server"
    echo "  down    - Stop the hot reload development server"
    echo "  logs    - View the development server logs"
    echo "  restart - Restart the development server"
    exit 1
    ;;
esac