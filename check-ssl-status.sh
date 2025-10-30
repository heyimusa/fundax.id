#!/bin/bash
# SSL Certificate Status Check Script

echo "SSL Certificate Status for fundax.id:"
echo "======================================"

# Check certificate expiry
echo "Certificate expiry:"
sudo certbot certificates | grep -A 3 "fundax.id"

echo ""
echo "Next renewal scheduled for:"
echo "Daily at 12:00 PM via cron job:"
sudo crontab -l

echo ""
echo "Certificate files location:"
echo "- Certificate: /etc/letsencrypt/live/fundax.id/fullchain.pem"
echo "- Private Key: /etc/letsencrypt/live/fundax.id/privkey.pem"

echo ""
echo "Nginx status:"
sudo systemctl is-active nginx