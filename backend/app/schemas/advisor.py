from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr


class AdvisorBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    city: Optional[str] = None


class AdvisorCreate(AdvisorBase):
    pass


class AdvisorUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    city: Optional[str] = None
    is_active: Optional[bool] = None


class AdvisorResponse(AdvisorBase):
    id: int
    is_active: bool
    total_applications: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class AdvisorStats(BaseModel):
    total_applications: int
    pending: int
    review: int
    approved: int
    rejected: int
    disbursed: int
    avg_processing_time_days: Optional[float] = None

