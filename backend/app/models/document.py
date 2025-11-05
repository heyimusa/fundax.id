from datetime import datetime
import enum

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship

from app.core.database import Base


class DocumentStatus(str, enum.Enum):
    PENDING = "pending"
    RECEIVED = "received"
    VERIFIED = "verified"


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(Integer, ForeignKey("applications.id"), nullable=False, index=True)
    
    document_type = Column(String(100), nullable=False)  # KTP, NPWP, Slip Gaji, etc.
    file_path = Column(String(500), nullable=False)
    file_name = Column(String(255), nullable=False)
    file_size = Column(Integer)  # in bytes
    mime_type = Column(String(100))
    
    status = Column(Enum(DocumentStatus), default=DocumentStatus.PENDING, nullable=False)
    
    uploaded_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    verified_at = Column(DateTime)
    verified_by = Column(Integer, ForeignKey("admins.id"))

    # Relationships
    application = relationship("Application", back_populates="documents")
    verified_by_admin = relationship("Admin")

