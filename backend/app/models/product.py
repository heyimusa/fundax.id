from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Text, Numeric

from app.core.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    description = Column(Text)
    features = Column(Text)  # JSON string
    requirements = Column(Text)  # JSON string
    interest_rate_min = Column(Numeric(5, 2))  # e.g., 3.50
    interest_rate_max = Column(Numeric(5, 2))  # e.g., 12.50
    is_active = Column(Integer, default=1, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

