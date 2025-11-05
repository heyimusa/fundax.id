# Fundax Admin Dashboard

Admin panel for managing the Fundax loan application platform.

## Features

- Application management
- User management
- Advisor management
- Document verification
- Analytics and reporting
- Content management (products, articles)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your API URL
```

3. Start development server:
```bash
npm run dev
```

The admin dashboard will be available at `http://localhost:3000`

## Default Credentials

- Admin: admin@fundax.co.id / admin123
- Adviser: adviser@fundax.co.id / adviser123

**⚠️ Change these passwords in production!**

## Build for Production

```bash
npm run build
```

## Tech Stack

- React 18 + TypeScript
- Vite
- TanStack Query (data fetching)
- React Router v6
- shadcn/ui components
- Tailwind CSS
- Recharts (analytics charts)
- Axios (HTTP client)

