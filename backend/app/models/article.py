from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Text

from app.core.database import Base


class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(500), nullable=False)
    slug = Column(String(500), unique=True, index=True, nullable=False)
    content = Column(Text, nullable=False)
    excerpt = Column(Text)
    category = Column(String(100), index=True)
    image_url = Column(String(500))
    author = Column(String(255))
    is_published = Column(Integer, default=0, nullable=False)  # Boolean as Integer
    published_at = Column(DateTime, index=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

