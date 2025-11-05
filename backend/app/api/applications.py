from typing import List, Optional
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.core.database import get_db
from app.core.dependencies import get_current_user, require_role
from app.models.admin import Admin
from app.models.application import Application, ApplicationStatus, ApplicationTimeline
from app.models.advisor import Advisor
from app.schemas.application import (
    ApplicationCreate,
    ApplicationUpdate,
    ApplicationResponse,
    ApplicationListResponse,
    ApplicationStatusUpdate,
    ApplicationAssign,
)
from app.services.application_service import generate_application_number, get_or_create_user

router = APIRouter()


@router.post("/", response_model=ApplicationResponse, status_code=status.HTTP_201_CREATED)
def create_application(application: ApplicationCreate, db: Session = Depends(get_db)):
    """Create new loan application (public endpoint)"""
    
    # Get or create user
    user = get_or_create_user(
        db=db,
        email=application.email,
        phone=application.phone,
        full_name=application.full_name,
        city=application.city,
        address=application.address
    )
    
    # Generate application number
    app_number = generate_application_number(db)
    
    # Create application
    db_application = Application(
        user_id=user.id,
        application_number=app_number,
        product_type=application.product_type,
        loan_amount=application.loan_amount,
        loan_purpose=application.loan_purpose,
        preferred_advisor=application.preferred_advisor,
        monthly_income=application.monthly_income,
        occupation=application.occupation,
        company_name=application.company_name,
        work_experience=application.work_experience,
        has_npwp=1 if application.has_npwp else 0,
        has_ktp=1 if application.has_ktp else 0,
        additional_notes=application.additional_notes,
        status=ApplicationStatus.PENDING,
        current_step="Pengajuan diterima, menunggu review"
    )
    
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    
    # Create initial timeline entry
    timeline_entry = ApplicationTimeline(
        application_id=db_application.id,
        status=ApplicationStatus.PENDING,
        notes="Pengajuan baru diterima"
    )
    db.add(timeline_entry)
    db.commit()
    
    return db_application


@router.get("/", response_model=List[ApplicationListResponse])
def list_applications(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    status: Optional[str] = None,
    advisor_id: Optional[int] = None,
    product_type: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
):
    """List all applications with filters (admin/adviser only)"""
    
    query = db.query(Application)
    
    # Apply filters
    if status:
        query = query.filter(Application.status == status)
    if advisor_id:
        query = query.filter(Application.advisor_id == advisor_id)
    if product_type:
        query = query.filter(Application.product_type == product_type)
    if search:
        query = query.join(Application.user).filter(
            or_(
                Application.application_number.contains(search),
                Application.user.has(full_name=search)
            )
        )
    
    # Order by most recent first
    query = query.order_by(Application.submitted_at.desc())
    
    # Pagination
    applications = query.offset(skip).limit(limit).all()
    
    return applications


@router.get("/{application_id}", response_model=ApplicationResponse)
def get_application(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
):
    """Get application details by ID (admin/adviser only)"""
    
    application = db.query(Application).filter(Application.id == application_id).first()
    
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    return application


@router.get("/track/{application_number}", response_model=ApplicationResponse)
def track_application(application_number: str, db: Session = Depends(get_db)):
    """Track application status by application number (public endpoint)"""
    
    application = db.query(Application).filter(
        Application.application_number == application_number
    ).first()
    
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    return application


@router.patch("/{application_id}", response_model=ApplicationResponse)
def update_application(
    application_id: int,
    application_update: ApplicationUpdate,
    db: Session = Depends(get_db),
    current_user: Admin = Depends(require_role(["admin", "adviser"]))
):
    """Update application details (admin/adviser only)"""
    
    application = db.query(Application).filter(Application.id == application_id).first()
    
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    # Update fields
    update_data = application_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        if field in ["has_npwp", "has_ktp"] and value is not None:
            value = 1 if value else 0
        setattr(application, field, value)
    
    application.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(application)
    
    return application


@router.patch("/{application_id}/status", response_model=ApplicationResponse)
def update_application_status(
    application_id: int,
    status_update: ApplicationStatusUpdate,
    db: Session = Depends(get_db),
    current_user: Admin = Depends(require_role(["admin", "adviser"]))
):
    """Update application status (admin/adviser only)"""
    
    application = db.query(Application).filter(Application.id == application_id).first()
    
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    # Update status
    application.status = status_update.status
    application.current_step = status_update.current_step
    application.updated_at = datetime.utcnow()
    
    # Create timeline entry
    timeline_entry = ApplicationTimeline(
        application_id=application.id,
        status=status_update.status,
        notes=status_update.notes,
        created_by=current_user.id
    )
    db.add(timeline_entry)
    
    db.commit()
    db.refresh(application)
    
    return application


@router.patch("/{application_id}/assign", response_model=ApplicationResponse)
def assign_advisor(
    application_id: int,
    assignment: ApplicationAssign,
    db: Session = Depends(get_db),
    current_user: Admin = Depends(require_role(["admin"]))
):
    """Assign advisor to application (admin only)"""
    
    application = db.query(Application).filter(Application.id == application_id).first()
    
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    # Check if advisor exists
    advisor = db.query(Advisor).filter(Advisor.id == assignment.advisor_id).first()
    if not advisor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Advisor not found"
        )
    
    # Update previous advisor's count if there was one
    if application.advisor_id:
        old_advisor = db.query(Advisor).filter(Advisor.id == application.advisor_id).first()
        if old_advisor:
            old_advisor.total_applications = max(0, old_advisor.total_applications - 1)
    
    # Assign new advisor
    application.advisor_id = assignment.advisor_id
    application.updated_at = datetime.utcnow()
    
    # Update advisor's application count
    advisor.total_applications += 1
    
    # Create timeline entry
    timeline_entry = ApplicationTimeline(
        application_id=application.id,
        status=application.status,
        notes=f"Assigned to adviser: {advisor.name}",
        created_by=current_user.id
    )
    db.add(timeline_entry)
    
    db.commit()
    db.refresh(application)
    
    return application


@router.delete("/{application_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_application(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: Admin = Depends(require_role(["admin"]))
):
    """Delete application (admin only)"""
    
    application = db.query(Application).filter(Application.id == application_id).first()
    
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    db.delete(application)
    db.commit()
    
    return None

