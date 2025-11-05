# Fundax Backoffice System - Quick Start Guide

## What Has Been Built

You now have a **complete backoffice system** for the Fundax loan application platform:

1. ✅ **Backend API** (Python + FastAPI + PostgreSQL)
2. ✅ **Admin Dashboard** (React + TypeScript)
3. ✅ **Frontend Integration** (Updated existing website)
4. ✅ **Docker Setup** (Easy deployment)

## Quick Start (3 Steps)

### Step 1: Start the Backend

```bash
cd backend

# Option A: Using Docker (Recommended)
docker-compose up -d

# Option B: Manual Setup
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your database credentials
uvicorn main:app --reload
```

Backend runs at: **http://localhost:8000**
API Docs: **http://localhost:8000/docs**

### Step 2: Initialize Database

```bash
cd backend
python scripts/init_db.py
```

This creates default admin and adviser accounts.

### Step 3: Start Admin Dashboard

```bash
cd admin-dashboard
npm install
npm run dev
```

Admin Dashboard runs at: **http://localhost:3000**

### Step 4 (Optional): Update Frontend Environment

```bash
# In root directory
echo "VITE_API_BASE_URL=http://localhost:8000" > .env
npm run dev
```

Main website runs at: **http://localhost:5173**

## Default Login Credentials

### Admin Dashboard
- **Admin**: `admin@fundax.co.id` / `admin123`
- **Adviser**: `adviser@fundax.co.id` / `adviser123`

⚠️ **IMPORTANT**: Change these passwords in production!

## Testing the System

### 1. Submit a Loan Application (Frontend)
1. Go to http://localhost:5173/ajukan
2. Fill out the 3-step form
3. Submit the application
4. Note the application number

### 2. Track Application (Frontend)
1. Go to http://localhost:5173/application-tracking
2. Enter the application number
3. View real-time status

### 3. Manage Applications (Admin Dashboard)
1. Login to http://localhost:3000
2. View dashboard statistics
3. Go to Applications page
4. Click on an application to view details
5. Update status, add notes, assign advisors

## Project Structure

```
fundax.id/
├── backend/                 # Python FastAPI backend
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Request/response schemas
│   │   └── services/       # Business logic
│   ├── docker-compose.yml  # Docker setup
│   └── requirements.txt    # Dependencies
│
├── admin-dashboard/         # React admin panel
│   ├── src/
│   │   ├── pages/          # Admin pages
│   │   ├── api/            # API client
│   │   └── components/     # UI components
│   └── package.json
│
└── src/                     # Main website (existing)
    └── pages/
        ├── Ajukan.tsx      # ✅ Integrated with API
        └── ApplicationTracking.tsx  # ✅ Integrated with API
```

## Key Features

### Backend API
- ✅ JWT Authentication
- ✅ Role-based access control
- ✅ Application management
- ✅ Document upload/verification
- ✅ Advisor management
- ✅ Analytics & reporting
- ✅ Timeline tracking

### Admin Dashboard
- ✅ Login/logout
- ✅ Dashboard with statistics
- ✅ Applications list & detail view
- ✅ Status updates
- ✅ Advisor management
- ✅ Real-time data

### Frontend Integration
- ✅ Application submission
- ✅ Application tracking
- ✅ Real API calls

## API Endpoints

### Public (No Auth Required)
- `POST /api/applications/` - Submit application
- `GET /api/applications/track/{number}` - Track application

### Protected (Auth Required)
- `POST /api/auth/login` - Admin login
- `GET /api/applications/` - List applications
- `PATCH /api/applications/{id}/status` - Update status
- `GET /api/analytics/dashboard` - Dashboard stats
- `GET /api/advisors/` - List advisors

Full API documentation: http://localhost:8000/docs

## Common Commands

### Backend
```bash
# Start backend
cd backend && docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop backend
docker-compose down

# Access PostgreSQL
docker-compose exec db psql -U fundax_user -d fundax_db
```

### Admin Dashboard
```bash
cd admin-dashboard
npm run dev        # Development
npm run build      # Production build
npm run preview    # Preview production build
```

### Frontend
```bash
npm run dev        # Development
npm run build      # Production build
```

## Troubleshooting

### Backend won't start
- Check if port 8000 is available
- Verify PostgreSQL is running
- Check `.env` file exists with correct credentials

### Admin Dashboard can't connect
- Verify backend is running at http://localhost:8000
- Check CORS settings in backend `.env`
- Check browser console for errors

### Database connection errors
- Ensure PostgreSQL is running
- Verify `DATABASE_URL` in `.env`
- Check database credentials

## Next Steps

### For Development
1. Change default passwords
2. Configure email/SMS notifications
3. Add more advisors via admin dashboard
4. Customize application workflow
5. Add custom fields to forms

### For Production
1. Use strong `SECRET_KEY`
2. Enable HTTPS
3. Configure proper CORS origins
4. Set up regular database backups
5. Implement monitoring (logs, errors, uptime)
6. Use production-grade database
7. Configure file storage (S3)
8. Set up CI/CD pipeline

## Need Help?

### Check Documentation
- Backend API: http://localhost:8000/docs
- Implementation details: See `IMPLEMENTATION_SUMMARY.md`

### Common Issues
1. **Port conflicts**: Change ports in docker-compose.yml or vite.config.ts
2. **Database connection**: Verify PostgreSQL credentials
3. **CORS errors**: Add frontend URL to `CORS_ORIGINS` in backend `.env`

## Architecture Overview

```
┌─────────────────┐
│  Main Website   │  (Port 5173)
│   (React)       │───────┐
└─────────────────┘       │
                          ├──► ┌─────────────────┐
┌─────────────────┐       │    │  Backend API    │  (Port 8000)
│ Admin Dashboard │────────────│   (FastAPI)     │
│   (React)       │  (Port 3000)└────────┬────────┘
└─────────────────┘                     │
                                        │
                                   ┌────▼────┐
                                   │PostgreSQL│  (Port 5432)
                                   │   DB     │
                                   └─────────┘
```

## Summary

You now have a production-ready backoffice system with:

- ✅ Complete backend API with authentication
- ✅ Admin dashboard for managing applications
- ✅ Frontend integration for submissions and tracking
- ✅ Docker setup for easy deployment
- ✅ Database schema with all necessary tables
- ✅ Role-based access control
- ✅ Document management
- ✅ Analytics and reporting

**Everything is ready to use!** Just follow the Quick Start steps above to get started.

