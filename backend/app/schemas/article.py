from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ArticleBase(BaseModel):
    title: str
    slug: str
    content: str
    excerpt: Optional[str] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    author: Optional[str] = None


class ArticleCreate(ArticleBase):
    pass


class ArticleUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    author: Optional[str] = None
    is_published: Optional[bool] = None


class ArticleResponse(ArticleBase):
    id: int
    is_published: bool
    published_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

