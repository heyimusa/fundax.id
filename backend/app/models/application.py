from datetime import datetime
import enum

from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, Enum, Numeric
from sqlalchemy.orm import relationship

from app.core.database import Base


class ApplicationStatus(str, enum.Enum):
    PENDING = "pending"
    REVIEW = "review"
    APPROVED = "approved"
    REJECTED = "rejected"
    DISBURSED = "disbursed"


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    advisor_id = Column(Integer, ForeignKey("advisors.id"), nullable=True, index=True)
    
    # Application identification
    application_number = Column(String(50), unique=True, index=True, nullable=False)
    
    # Product information (Step 1)
    product_type = Column(String(100), nullable=False)
    loan_amount = Column(String(100), nullable=False)  # Stored as string from frontend
    loan_purpose = Column(Text)
    
    # Personal information (Step 2) - stored in User model
    preferred_advisor = Column(String(255))
    
    # Financial information (Step 3)
    monthly_income = Column(String(100))
    occupation = Column(String(100))
    company_name = Column(String(255))
    work_experience = Column(String(50))
    has_npwp = Column(Integer, default=0)  # Boolean as Integer
    has_ktp = Column(Integer, default=0)   # Boolean as Integer
    additional_notes = Column(Text)
    
    # Status tracking
    status = Column(Enum(ApplicationStatus), default=ApplicationStatus.PENDING, nullable=False, index=True)
    current_step = Column(String(255), default="Pengajuan diterima, menunggu review")
    
    # Timestamps
    submitted_at = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relationships
    user = relationship("User", back_populates="applications")
    advisor = relationship("Advisor", back_populates="applications")
    documents = relationship("Document", back_populates="application", cascade="all, delete-orphan")
    timeline = relationship("ApplicationTimeline", back_populates="application", cascade="all, delete-orphan", order_by="ApplicationTimeline.created_at.desc()")


class ApplicationTimeline(Base):
    __tablename__ = "application_timeline"

    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(Integer, ForeignKey("applications.id"), nullable=False, index=True)
    status = Column(Enum(ApplicationStatus), nullable=False)
    notes = Column(Text)
    created_by = Column(Integer, ForeignKey("admins.id"))
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    application = relationship("Application", back_populates="timeline")
    created_by_admin = relationship("Admin")

