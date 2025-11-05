from typing import List, Optional
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, case

from app.core.database import get_db
from app.core.dependencies import get_current_user, require_role
from app.models.admin import Admin
from app.models.advisor import Advisor
from app.models.application import Application, ApplicationStatus
from app.schemas.advisor import AdvisorCreate, AdvisorUpdate, AdvisorResponse, AdvisorStats
from app.schemas.application import ApplicationListResponse

router = APIRouter()


@router.get("/", response_model=List[AdvisorResponse])
def list_advisors(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    is_active: Optional[bool] = None,
    db: Session = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
):
    """List all advisors"""
    
    query = db.query(Advisor)
    
    if is_active is not None:
        query = query.filter(Advisor.is_active == (1 if is_active else 0))
    
    query = query.order_by(Advisor.name)
    advisors = query.offset(skip).limit(limit).all()
    
    return advisors


@router.post("/", response_model=AdvisorResponse, status_code=status.HTTP_201_CREATED)
def create_advisor(
    advisor: AdvisorCreate,
    db: Session = Depends(get_db),
    current_user: Admin = Depends(require_role(["admin"]))
):
    """Create new advisor"""
    
    # Check if email already exists
    existing = db.query(Advisor).filter(Advisor.email == advisor.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    db_advisor = Advisor(**advisor.model_dump())
    db.add(db_advisor)
    db.commit()
    db.refresh(db_advisor)
    
    return db_advisor


@router.get("/{advisor_id}", response_model=AdvisorResponse)
def get_advisor(
    advisor_id: int,
    db: Session = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
):
    """Get advisor details by ID"""
    
    advisor = db.query(Advisor).filter(Advisor.id == advisor_id).first()
    
    if not advisor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Advisor not found"
        )
    
    return advisor


@router.patch("/{advisor_id}", response_model=AdvisorResponse)
def update_advisor(
    advisor_id: int,
    advisor_update: AdvisorUpdate,
    db: Session = Depends(get_db),
    current_user: Admin = Depends(require_role(["admin"]))
):
    """Update advisor information"""
    
    advisor = db.query(Advisor).filter(Advisor.id == advisor_id).first()
    
    if not advisor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Advisor not found"
        )
    
    # Update fields
    update_data = advisor_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        if field == "is_active" and value is not None:
            value = 1 if value else 0
        setattr(advisor, field, value)
    
    db.commit()
    db.refresh(advisor)
    
    return advisor


@router.get("/{advisor_id}/applications", response_model=List[ApplicationListResponse])
def get_advisor_applications(
    advisor_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
):
    """Get all applications assigned to an advisor"""
    
    advisor = db.query(Advisor).filter(Advisor.id == advisor_id).first()
    if not advisor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Advisor not found"
        )
    
    applications = db.query(Application).filter(
        Application.advisor_id == advisor_id
    ).order_by(
        Application.submitted_at.desc()
    ).offset(skip).limit(limit).all()
    
    return applications


@router.get("/{advisor_id}/stats", response_model=AdvisorStats)
def get_advisor_stats(
    advisor_id: int,
    db: Session = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
):
    """Get advisor performance statistics"""
    
    advisor = db.query(Advisor).filter(Advisor.id == advisor_id).first()
    if not advisor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Advisor not found"
        )
    
    # Get application counts by status
    stats = db.query(
        func.count(Application.id).label("total"),
        func.sum(case((Application.status == ApplicationStatus.PENDING, 1), else_=0)).label("pending"),
        func.sum(case((Application.status == ApplicationStatus.REVIEW, 1), else_=0)).label("review"),
        func.sum(case((Application.status == ApplicationStatus.APPROVED, 1), else_=0)).label("approved"),
        func.sum(case((Application.status == ApplicationStatus.REJECTED, 1), else_=0)).label("rejected"),
        func.sum(case((Application.status == ApplicationStatus.DISBURSED, 1), else_=0)).label("disbursed"),
    ).filter(
        Application.advisor_id == advisor_id
    ).first()
    
    # Calculate average processing time for approved applications
    approved_apps = db.query(
        func.avg(
            func.julianday(Application.updated_at) - func.julianday(Application.submitted_at)
        )
    ).filter(
        Application.advisor_id == advisor_id,
        Application.status.in_([ApplicationStatus.APPROVED, ApplicationStatus.DISBURSED])
    ).scalar()
    
    return {
        "total_applications": stats.total or 0,
        "pending": stats.pending or 0,
        "review": stats.review or 0,
        "approved": stats.approved or 0,
        "rejected": stats.rejected or 0,
        "disbursed": stats.disbursed or 0,
        "avg_processing_time_days": round(approved_apps, 1) if approved_apps else None
    }


@router.delete("/{advisor_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_advisor(
    advisor_id: int,
    db: Session = Depends(get_db),
    current_user: Admin = Depends(require_role(["admin"]))
):
    """Delete advisor (admin only)"""
    
    advisor = db.query(Advisor).filter(Advisor.id == advisor_id).first()
    
    if not advisor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Advisor not found"
        )
    
    # Check if advisor has applications
    has_applications = db.query(Application).filter(
        Application.advisor_id == advisor_id
    ).first()
    
    if has_applications:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete advisor with existing applications. Set as inactive instead."
        )
    
    db.delete(advisor)
    db.commit()
    
    return None

