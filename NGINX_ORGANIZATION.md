# Organized Nginx Configuration

## Structure Overview

The nginx configuration has been reorganized for better maintainability:

- **Centralized server blocks**: Each domain has its own clearly defined section
- **Upstream definitions**: Backend servers defined at the top for easy management
- **Consistent formatting**: Organized sections with clear comments
- **Reusable templates**: Template for adding new applications

## Key Improvements

1. **Modular Structure**: Each domain is clearly separated with headers
2. **Upstream Management**: All backend servers defined in one place  
3. **Standardized Headers**: Consistent proxy and security headers across all sites
4. **Clear Documentation**: Comments explain each section and provide templates
5. **Easy Expansion**: Simple template to follow for new applications

## Adding New Applications

To add a new application:

1. Add a new upstream definition at the top:
   ```
   upstream newapp_backend {
       server 127.0.0.1:PORT;
   }
   ```

2. Add HTTP and HTTPS server blocks as shown in the template at the end of the configuration file

3. Restart nginx: `sudo nginx -t && sudo systemctl reload nginx`

## Current Applications

- **fundax.id**: Proxied to port 5000
- **hi.heyimusa.blog**: Proxied to port 5001

Both applications use the same proxy and security header configurations for consistency.