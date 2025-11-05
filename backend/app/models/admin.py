from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Enum
import enum

from app.core.database import Base


class AdminRole(str, enum.Enum):
    ADMIN = "admin"
    ADVISER = "adviser"
    VIEWER = "viewer"


class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(Enum(AdminRole), default=AdminRole.VIEWER, nullable=False)
    is_active = Column(Integer, default=1, nullable=False)  # Using Integer for boolean (1/0)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

