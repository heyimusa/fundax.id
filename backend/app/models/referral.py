from datetime import datetime
import enum

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum, Numeric
from sqlalchemy.orm import relationship

from app.core.database import Base


class ReferralStatus(str, enum.Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    REWARDED = "rewarded"


class Referral(Base):
    __tablename__ = "referrals"

    id = Column(Integer, primary_key=True, index=True)
    referrer_user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    referred_user_id = Column(Integer, ForeignKey("users.id"), nullable=True, index=True)
    application_id = Column(Integer, ForeignKey("applications.id"), nullable=True, index=True)
    
    referral_code = Column(String(50), unique=True, index=True, nullable=False)
    status = Column(Enum(ReferralStatus), default=ReferralStatus.PENDING, nullable=False)
    reward_amount = Column(Numeric(15, 2), default=0)
    
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    completed_at = Column(DateTime)
    rewarded_at = Column(DateTime)

    # Relationships
    referrer = relationship("User", foreign_keys=[referrer_user_id])
    referred = relationship("User", foreign_keys=[referred_user_id])
    application = relationship("Application")

