from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Text

from app.core.database import Base


class Bank(Base):
    __tablename__ = "banks"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    logo_url = Column(String(500))
    description = Column(Text)
    website = Column(String(500))
    is_active = Column(Integer, default=1, nullable=False)  # Boolean as Integer
    display_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

