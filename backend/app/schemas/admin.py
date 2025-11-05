from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr


class AdminBase(BaseModel):
    email: EmailStr
    full_name: str
    role: str = "viewer"


class AdminCreate(AdminBase):
    password: str


class AdminUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    role: Optional[str] = None
    is_active: Optional[bool] = None


class AdminResponse(AdminBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class AdminLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: Optional[int] = None

