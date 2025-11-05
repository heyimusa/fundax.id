from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel, EmailStr

from app.schemas.user import UserResponse
from app.schemas.advisor import AdvisorResponse
from app.schemas.document import DocumentResponse


class ApplicationBase(BaseModel):
    product_type: str
    loan_amount: str
    loan_purpose: Optional[str] = None
    preferred_advisor: Optional[str] = None
    monthly_income: Optional[str] = None
    occupation: Optional[str] = None
    company_name: Optional[str] = None
    work_experience: Optional[str] = None
    has_npwp: bool = False
    has_ktp: bool = False
    additional_notes: Optional[str] = None


class ApplicationCreate(BaseModel):
    # User info (will create user if doesn't exist)
    full_name: str
    email: EmailStr
    phone: str
    city: Optional[str] = None
    address: Optional[str] = None
    
    # Application data
    product_type: str
    loan_amount: str
    loan_purpose: Optional[str] = None
    preferred_advisor: Optional[str] = None
    monthly_income: Optional[str] = None
    occupation: Optional[str] = None
    company_name: Optional[str] = None
    work_experience: Optional[str] = None
    has_npwp: bool = False
    has_ktp: bool = False
    additional_notes: Optional[str] = None


class ApplicationUpdate(BaseModel):
    product_type: Optional[str] = None
    loan_amount: Optional[str] = None
    loan_purpose: Optional[str] = None
    monthly_income: Optional[str] = None
    occupation: Optional[str] = None
    company_name: Optional[str] = None
    work_experience: Optional[str] = None
    has_npwp: Optional[bool] = None
    has_ktp: Optional[bool] = None
    additional_notes: Optional[str] = None
    current_step: Optional[str] = None


class ApplicationStatusUpdate(BaseModel):
    status: str
    current_step: str
    notes: Optional[str] = None


class ApplicationAssign(BaseModel):
    advisor_id: int


class TimelineEntry(BaseModel):
    id: int
    status: str
    notes: Optional[str]
    created_by: Optional[int]
    created_at: datetime

    class Config:
        from_attributes = True


class ApplicationResponse(ApplicationBase):
    id: int
    user_id: int
    advisor_id: Optional[int]
    application_number: str
    status: str
    current_step: str
    submitted_at: datetime
    updated_at: datetime
    
    # Nested relationships
    user: Optional[UserResponse] = None
    advisor: Optional[AdvisorResponse] = None
    documents: List[DocumentResponse] = []
    timeline: List[TimelineEntry] = []

    class Config:
        from_attributes = True


class ApplicationListResponse(BaseModel):
    id: int
    application_number: str
    product_type: str
    loan_amount: str
    status: str
    current_step: str
    submitted_at: datetime
    user: Optional[UserResponse] = None
    advisor: Optional[AdvisorResponse] = None

    class Config:
        from_attributes = True

