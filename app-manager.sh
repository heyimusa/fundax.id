#!/bin/bash

# Multi-Application Manager Script
# Helps manage multiple applications on the server

APP_DIR="/home/heyimusa/apps"
NGINX_CONFIG="/etc/nginx/sites-available/multi-apps"

show_help() {
    echo "Multi-Application Manager"
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  list          - List all running applications"
    echo "  add <domain>  - Add a new domain/application (requires port)"
    echo "  status        - Show server status"
    echo "  logs <app>    - Show logs for specific application"
    echo ""
}

list_apps() {
    echo "Running applications:"
    podman ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}"
    echo ""
    echo "Nginx configuration has the following server blocks:"
    grep -E "server_name|proxy_pass" $NGINX_CONFIG | grep -A1 server_name
}

show_status() {
    echo "Server Status:"
    echo "--------------"
    echo "Nginx status:"
    sudo systemctl is-active nginx
    echo ""
    echo "Firewall status:"
    sudo ufw status | head -5
    echo ""
    echo "Running containers:"
    podman ps --format "table {{.Names}}\t{{.Status}}"
    echo ""
    echo "Listening ports:"
    sudo ss -tulnp | grep LISTEN
}

case "$1" in
    "list")
        list_apps
        ;;
    "status")
        show_status
        ;;
    "help"|"-h"|"--help")
        show_help
        ;;
    *)
        show_help
        exit 1
        ;;
esac