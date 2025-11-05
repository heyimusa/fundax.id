from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Text

from app.core.database import Base


class JobOpening(Base):
    __tablename__ = "job_openings"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    department = Column(String(100), index=True)
    location = Column(String(255))
    job_type = Column(String(50))  # Full-time, Part-time, Contract
    description = Column(Text, nullable=False)
    requirements = Column(Text)  # JSON string
    benefits = Column(Text)  # JSON string
    is_active = Column(Integer, default=1, nullable=False)  # Boolean as Integer
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

