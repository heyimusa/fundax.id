from typing import List, Optional
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user, require_role
from app.models.admin import Admin
from app.models.article import Article
from app.schemas.article import ArticleCreate, ArticleUpdate, ArticleResponse

router = APIRouter()


@router.get("/", response_model=List[ArticleResponse])
def list_articles(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    category: Optional[str] = None,
    is_published: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    """List all articles (public endpoint)"""
    
    query = db.query(Article)
    
    if category:
        query = query.filter(Article.category == category)
    
    if is_published is not None:
        query = query.filter(Article.is_published == (1 if is_published else 0))
    
    query = query.order_by(Article.published_at.desc())
    articles = query.offset(skip).limit(limit).all()
    
    return articles


@router.post("/", response_model=ArticleResponse, status_code=status.HTTP_201_CREATED)
def create_article(
    article: ArticleCreate,
    db: Session = Depends(get_db),
    current_user: Admin = Depends(require_role(["admin"]))
):
    """Create new article (admin only)"""
    
    # Check if slug already exists
    existing = db.query(Article).filter(Article.slug == article.slug).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Slug already exists"
        )
    
    db_article = Article(**article.model_dump())
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    
    return db_article


@router.get("/{article_id}", response_model=ArticleResponse)
def get_article(article_id: int, db: Session = Depends(get_db)):
    """Get article details by ID (public endpoint)"""
    
    article = db.query(Article).filter(Article.id == article_id).first()
    
    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article not found"
        )
    
    return article


@router.patch("/{article_id}", response_model=ArticleResponse)
def update_article(
    article_id: int,
    article_update: ArticleUpdate,
    db: Session = Depends(get_db),
    current_user: Admin = Depends(require_role(["admin"]))
):
    """Update article (admin only)"""
    
    article = db.query(Article).filter(Article.id == article_id).first()
    
    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article not found"
        )
    
    # Update fields
    update_data = article_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        if field == "is_published" and value is not None:
            value = 1 if value else 0
            # Set published_at timestamp when publishing
            if value == 1 and not article.is_published:
                article.published_at = datetime.utcnow()
        setattr(article, field, value)
    
    db.commit()
    db.refresh(article)
    
    return article


@router.delete("/{article_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_article(
    article_id: int,
    db: Session = Depends(get_db),
    current_user: Admin = Depends(require_role(["admin"]))
):
    """Delete article (admin only)"""
    
    article = db.query(Article).filter(Article.id == article_id).first()
    
    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article not found"
        )
    
    db.delete(article)
    db.commit()
    
    return None

