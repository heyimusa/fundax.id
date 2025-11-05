from datetime import datetime
from typing import Optional
from decimal import Decimal

from pydantic import BaseModel


class ProductBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    features: Optional[str] = None
    requirements: Optional[str] = None
    interest_rate_min: Optional[Decimal] = None
    interest_rate_max: Optional[Decimal] = None


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    features: Optional[str] = None
    requirements: Optional[str] = None
    interest_rate_min: Optional[Decimal] = None
    interest_rate_max: Optional[Decimal] = None
    is_active: Optional[bool] = None


class ProductResponse(ProductBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

