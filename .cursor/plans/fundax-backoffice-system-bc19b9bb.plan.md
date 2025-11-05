<!-- bc19b9bb-65f6-4fb2-b1ab-6b0b9af8349c 4b3f6949-13ad-4430-8456-3f48caca9b62 -->
# Fundax Backoffice System Implementation

## Architecture Overview

Build a complete backoffice system with:

- **Backend**: Python (FastAPI) + PostgreSQL + SQLAlchemy ORM
- **Admin Dashboard**: Separate React + TypeScript + shadcn/ui app
- **File Storage**: Local file system (with S3-ready structure for future)
- **Authentication**: JWT tokens for API access

## Phase 1: Backend API Setup

### 1.1 Project Structure

Create `/backend` directory with:

```
backend/
├── app/
│   ├── api/              # API routes
│   ├── core/             # Config, security, dependencies
│   ├── models/           # SQLAlchemy models
│   ├── schemas/          # Pydantic schemas
│   ├── services/         # Business logic
│   └── utils/            # Helpers
├── alembic/              # Database migrations
├── uploads/              # Document storage
├── requirements.txt
└── main.py
```

### 1.2 Database Schema Design

**Core Tables:**

- `users` - Customer accounts (id, email, phone, name, address, city, created_at)
- `admins` - Admin/staff accounts with roles (id, email, password_hash, role, full_name)
- `advisors` - Loan advisers (id, name, email, phone, city, is_active, total_applications)
- `applications` - Loan applications with full form data (id, user_id, advisor_id, application_number, product_type, loan_amount, loan_purpose, monthly_income, occupation, company_name, work_experience, status, current_step, submitted_at, updated_at)
- `documents` - Document tracking (id, application_id, document_type, file_path, status, uploaded_at, verified_at, verified_by)
- `application_timeline` - Status change history (id, application_id, status, notes, created_by, created_at)
- `products` - Product definitions (id, name, slug, description, features, interest_rate_min/max, requirements)
- `articles` - News/blog content (id, title, slug, content, category, image_url, published_at)
- `banks` - Partner banks (id, name, logo_url, is_active)
- `job_openings` - Career listings (id, title, department, location, description, requirements, benefits)
- `referrals` - Referral tracking (id, referrer_user_id, referred_user_id, application_id, status, reward_amount)

### 1.3 Core API Endpoints

**Authentication (`/api/auth/`)**

- POST `/login` - Admin/adviser login (returns JWT)
- POST `/refresh` - Refresh token
- POST `/logout` - Invalidate token

**Applications (`/api/applications/`)**

- POST `/` - Create application (public endpoint)
- GET `/` - List all applications (paginated, filterable by status/date/adviser)
- GET `/{id}` - Get application details
- PATCH `/{id}/status` - Update application status
- PATCH `/{id}/assign` - Assign adviser
- GET `/{application_number}/track` - Public tracking endpoint
- POST `/{id}/timeline` - Add timeline entry

**Documents (`/api/documents/`)**

- POST `/upload` - Upload document (multipart/form-data)
- GET `/application/{id}` - List application documents
- PATCH `/{id}/verify` - Mark document as verified
- GET `/{id}/download` - Download document file

**Users (`/api/users/`)**

- GET `/` - List users (paginated)
- GET `/{id}` - Get user details
- PATCH `/{id}` - Update user info

**Advisors (`/api/advisors/`)**

- GET `/` - List advisors
- POST `/` - Create advisor
- PATCH `/{id}` - Update advisor
- GET `/{id}/applications` - Get advisor's applications
- GET `/{id}/stats` - Advisor performance stats

**Products (`/api/products/`)**

- GET `/` - List products
- POST `/` - Create product (admin)
- PATCH `/{id}` - Update product
- DELETE `/{id}` - Delete product

**Articles (`/api/articles/`)**

- GET `/` - List articles (public)
- POST `/` - Create article (admin)
- PATCH `/{id}` - Update article
- DELETE `/{id}` - Delete article

**Analytics (`/api/analytics/`)**

- GET `/dashboard` - Dashboard statistics
- GET `/applications/stats` - Application metrics
- GET `/advisors/performance` - Adviser performance

### 1.4 Key Features

- **File Upload**: Handle document uploads with validation (PDF, JPG, PNG, max 5MB)
- **Application Number Generation**: Format `APP-{YEAR}-{6-digit-sequence}`
- **Email/SMS Notifications**: Structure for future integration
- **Audit Trail**: Track all status changes with timestamps and admin who made the change
- **Pagination**: Standard limit/offset pagination
- **Filtering & Search**: By status, date range, adviser, product type

## Phase 2: Admin Dashboard

### 2.1 Project Structure

Create `/admin-dashboard` directory:

```
admin-dashboard/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Admin pages
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Applications/
│   │   ├── Users.tsx
│   │   ├── Advisors.tsx
│   │   ├── Products.tsx
│   │   ├── Articles.tsx
│   │   └── Settings.tsx
│   ├── api/             # API client
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utils
│   └── types/           # TypeScript types
```

### 2.2 Core Admin Pages

**Dashboard** - Overview with:

- Total applications (by status)
- Recent applications list
- Adviser performance summary
- Charts: Applications over time, conversion rates

**Applications Management**

- List view with filters (status, date, adviser, product)
- Detail view with full application data
- Status update workflow (pending → review → approved/rejected → disbursed)
- Document verification interface
- Adviser assignment
- Timeline/activity log
- Add notes/comments

**Users Management**

- List all customers
- View user details and application history
- Search by name/email/phone

**Advisors Management**

- List advisors
- Create/edit advisor profiles
- View assigned applications
- Performance metrics per advisor

**Products Management**

- CRUD for loan products
- Edit features, requirements, interest rates

**Articles/Content Management**

- CRUD for articles
- Rich text editor for content
- Image upload for featured images

**Settings**

- Admin user management
- System configuration

### 2.3 Key UI Features

- **Authentication**: Login page with JWT storage
- **Protected Routes**: Auth guard for all admin pages
- **Data Tables**: Sortable, filterable tables with pagination
- **Forms**: Validation with react-hook-form + zod
- **File Preview**: View uploaded documents (PDF viewer, image preview)
- **Real-time Status Updates**: Optimistic UI updates
- **Export**: Export data to CSV/Excel
- **Responsive Design**: Mobile-friendly admin interface

## Phase 3: Integration

### 3.1 Frontend Updates

Update existing `src/pages/Ajukan.tsx`:

- Replace mock submission with real API call to POST `/api/applications/`
- Handle file uploads for documents
- Store application number for tracking

Update `src/pages/ApplicationTracking.tsx`:

- Call GET `/api/applications/{application_number}/track`
- Display real data from backend

### 3.2 Environment Configuration

- Backend: `.env` with database URL, JWT secret, CORS origins
- Frontend: `.env` with API base URL
- Admin: `.env` with API base URL

## Technical Specifications

**Backend Stack:**

- FastAPI 0.109+
- SQLAlchemy 2.0+ (async)
- Alembic (migrations)
- Pydantic v2 (validation)
- python-multipart (file uploads)
- python-jose (JWT)
- passlib + bcrypt (password hashing)
- psycopg2-binary (PostgreSQL driver)

**Database:**

- PostgreSQL 15+
- Connection pooling
- Indexes on frequently queried fields (status, created_at, application_number)

**Admin Dashboard:**

- React 18 + TypeScript
- Vite
- shadcn/ui components
- React Router v6
- TanStack Query (data fetching)
- Axios (HTTP client)
- Recharts (analytics charts)

**Security:**

- CORS configuration for frontend origins
- JWT expiration (access: 30min, refresh: 7 days)
- Password hashing with bcrypt
- Role-based access control (admin, adviser, viewer)
- File upload validation and sanitization

**Deployment Ready:**

- Docker support for backend
- docker-compose with PostgreSQL
- Health check endpoints
- Logging configuration

### To-dos

- [ ] Initialize backend project structure with FastAPI, setup virtual environment, create requirements.txt
- [ ] Create SQLAlchemy models for all entities (users, applications, documents, advisors, etc.)
- [ ] Setup Alembic and create initial database migration
- [ ] Implement JWT authentication system with login/logout/refresh endpoints
- [ ] Build applications API endpoints (CRUD, status updates, assignment)
- [ ] Implement document upload, verification, and download endpoints
- [ ] Create advisors management API endpoints
- [ ] Build CRUD APIs for products, articles, banks, and job openings
- [ ] Create analytics and dashboard statistics endpoints
- [ ] Initialize admin dashboard React project with routing and base layout
- [ ] Build admin login page and authentication flow with JWT storage
- [ ] Create dashboard overview page with statistics and charts
- [ ] Build applications management interface (list, detail, status updates, assignment)
- [ ] Create document verification interface with file preview
- [ ] Build advisors management pages
- [ ] Create products and articles management pages
- [ ] Update frontend Ajukan.tsx and ApplicationTracking.tsx to use real API endpoints
- [ ] Create Docker configuration and docker-compose for backend + PostgreSQL