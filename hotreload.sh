#!/bin/bash

# Make the script executable with: chmod +x hotreload.sh

case "$1" in
  build)
    podman-compose -f docker-compose.hotreload.yaml build
    ;;
  up)
    podman-compose -f docker-compose.hotreload.yaml up -d
    sleep 3  # Wait for container startup
    if podman ps --filter name=fundax-folio-creator-hotreload --format "{{.Names}}" | grep -q fundax-folio-creator-hotreload; then
      echo "✓ Hot reload server started at http://localhost:8080"
      echo "✓ Changes to src/ will auto-reload in your browser"
      echo ""
      echo "Use './hotreload.sh logs' to see the development server output"
    else
      echo "WARNING: Container may have started, but status check failed."
      echo "Check manually:"
      echo "  - Run: podman ps (look for fundax-folio-creator-hotreload)"
      echo "  - Run: ./hotreload.sh logs (if Vite shows 'ready', it's working!)"
      echo "  - Open: http://localhost:8080"
      echo ""
      echo "If port 8080 is blocked, run: sudo lsof -i :8080, then sudo kill -9 <PID>"
    fi
    ;;
  down)
    podman-compose -f docker-compose.hotreload.yaml down
    ;;
  clean)
    echo "Cleaning up hot reload containers and volumes..."
    podman-compose -f docker-compose.hotreload.yaml down -v  # -v removes volumes too
    podman stop $(podman ps -q --filter name=fundax) 2>/dev/null || true
    podman rm $(podman ps -aq --filter name=fundax) 2>/dev/null || true
    echo "Cleanup complete. Port 8080 should now be free."
    ;;
  logs)
    podman-compose -f docker-compose.hotreload.yaml logs -f
    ;;
  restart)
    podman-compose -f docker-compose.hotreload.yaml restart
    ;;
  *)
    echo "Usage: $0 {build|up|down|clean|logs|restart}"
    echo ""
    echo "  build   - Build the hot reload image (only needed ONCE or after package.json changes)"
    echo "  up      - Start the hot reload development server (changes auto-reload, no rebuild needed!)"
    echo "  down    - Stop the hot reload development server"
    echo "  clean   - Stop/remove all containers and free ports (use before 'up' if conflicts)"
    echo "  logs    - View the development server logs (Ctrl+C to exit)"
    echo "  restart - Restart the development server (rarely needed; Vite auto-reloads)"
    echo ""
    echo "HOT RELOAD WORKFLOW:"
    echo "  1. ./hotreload.sh build   (once, or after npm install)"
    echo "  2. ./hotreload.sh up      (starts server on http://localhost:8080)"
    echo "  3. Edit your code in src/ (changes appear instantly in browser)"
    echo "  4. ./hotreload.sh down    (when done for the day)"
    exit 1
    ;;
esac