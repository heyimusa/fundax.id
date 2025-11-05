from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class BankBase(BaseModel):
    name: str
    slug: str
    logo_url: Optional[str] = None
    description: Optional[str] = None
    website: Optional[str] = None


class BankCreate(BankBase):
    pass


class BankUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    logo_url: Optional[str] = None
    description: Optional[str] = None
    website: Optional[str] = None
    is_active: Optional[bool] = None
    display_order: Optional[int] = None


class BankResponse(BankBase):
    id: int
    is_active: bool
    display_order: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

