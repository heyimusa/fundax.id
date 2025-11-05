# Fundax Backend API

FastAPI-based backend for the Fundax loan application platform.

## Setup

### Prerequisites
- Python 3.11+
- PostgreSQL 15+

### Installation

1. Create virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment:
```bash
cp .env.example .env
# Edit .env with your database credentials and settings
```

4. Run database migrations:
```bash
alembic upgrade head
```

5. Start the server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

API documentation: `http://localhost:8000/docs`

## Project Structure

```
backend/
├── app/
│   ├── api/              # API route handlers
│   ├── core/             # Core functionality (config, security, database)
│   ├── models/           # SQLAlchemy models
│   ├── schemas/          # Pydantic schemas for request/response
│   ├── services/         # Business logic
│   └── utils/            # Utility functions
├── alembic/              # Database migrations
├── uploads/              # Document storage
├── main.py               # Application entry point
└── requirements.txt      # Python dependencies
```

## API Endpoints

See `/docs` for interactive API documentation (Swagger UI).

### Key Endpoints:
- `POST /api/auth/login` - Admin/adviser login
- `POST /api/applications/` - Create loan application
- `GET /api/applications/` - List applications (admin)
- `GET /api/applications/{application_number}/track` - Track application status
- `POST /api/documents/upload` - Upload document
- `GET /api/analytics/dashboard` - Dashboard statistics

