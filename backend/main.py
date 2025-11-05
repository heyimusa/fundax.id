from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.core.config import settings
from app.core.database import engine, Base

# Import models to ensure they're registered
from app.models import admin, user, advisor, application, document, product, article, bank, job_opening, referral

# Create tables (in production, use Alembic migrations)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_PREFIX}/openapi.json",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount uploads directory
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Health check
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# API Routes will be added here
from app.api import auth, applications, documents, users, advisors, products, articles, analytics

app.include_router(auth.router, prefix=f"{settings.API_V1_PREFIX}/auth", tags=["auth"])
app.include_router(applications.router, prefix=f"{settings.API_V1_PREFIX}/applications", tags=["applications"])
app.include_router(documents.router, prefix=f"{settings.API_V1_PREFIX}/documents", tags=["documents"])
app.include_router(users.router, prefix=f"{settings.API_V1_PREFIX}/users", tags=["users"])
app.include_router(advisors.router, prefix=f"{settings.API_V1_PREFIX}/advisors", tags=["advisors"])
app.include_router(products.router, prefix=f"{settings.API_V1_PREFIX}/products", tags=["products"])
app.include_router(articles.router, prefix=f"{settings.API_V1_PREFIX}/articles", tags=["articles"])
app.include_router(analytics.router, prefix=f"{settings.API_V1_PREFIX}/analytics", tags=["analytics"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

