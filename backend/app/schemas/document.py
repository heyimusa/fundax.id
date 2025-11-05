from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class DocumentBase(BaseModel):
    document_type: str


class DocumentCreate(DocumentBase):
    application_id: int
    file_path: str
    file_name: str
    file_size: int
    mime_type: str


class DocumentUpdate(BaseModel):
    status: Optional[str] = None


class DocumentResponse(DocumentBase):
    id: int
    application_id: int
    file_path: str
    file_name: str
    file_size: int
    mime_type: str
    status: str
    uploaded_at: datetime
    verified_at: Optional[datetime] = None
    verified_by: Optional[int] = None

    class Config:
        from_attributes = True

