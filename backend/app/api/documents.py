from typing import List
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user, require_role
from app.models.admin import Admin
from app.models.application import Application
from app.models.document import Document, DocumentStatus
from app.schemas.document import DocumentResponse, DocumentUpdate
from app.utils.file_utils import save_upload_file, delete_file

router = APIRouter()


@router.post("/upload", response_model=DocumentResponse, status_code=status.HTTP_201_CREATED)
async def upload_document(
    application_id: int = Form(...),
    document_type: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Upload document for an application"""
    
    # Check if application exists
    application = db.query(Application).filter(Application.id == application_id).first()
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    # Save file
    file_info = await save_upload_file(file, subfolder=f"applications/{application_id}")
    
    # Create document record
    document = Document(
        application_id=application_id,
        document_type=document_type,
        file_path=file_info["file_path"],
        file_name=file_info["file_name"],
        file_size=file_info["file_size"],
        mime_type=file_info["mime_type"],
        status=DocumentStatus.RECEIVED
    )
    
    db.add(document)
    db.commit()
    db.refresh(document)
    
    return document


@router.get("/application/{application_id}", response_model=List[DocumentResponse])
def list_application_documents(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
):
    """List all documents for an application"""
    
    documents = db.query(Document).filter(
        Document.application_id == application_id
    ).all()
    
    return documents


@router.patch("/{document_id}/verify", response_model=DocumentResponse)
def verify_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: Admin = Depends(require_role(["admin", "adviser"]))
):
    """Mark document as verified"""
    
    document = db.query(Document).filter(Document.id == document_id).first()
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    document.status = DocumentStatus.VERIFIED
    document.verified_at = datetime.utcnow()
    document.verified_by = current_user.id
    
    db.commit()
    db.refresh(document)
    
    return document


@router.get("/{document_id}/download")
def download_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
):
    """Download document file"""
    
    document = db.query(Document).filter(Document.id == document_id).first()
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    return FileResponse(
        path=document.file_path,
        filename=document.file_name,
        media_type=document.mime_type
    )


@router.delete("/{document_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: Admin = Depends(require_role(["admin", "adviser"]))
):
    """Delete document"""
    
    document = db.query(Document).filter(Document.id == document_id).first()
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    # Delete file from filesystem
    delete_file(document.file_path)
    
    # Delete record from database
    db.delete(document)
    db.commit()
    
    return None

