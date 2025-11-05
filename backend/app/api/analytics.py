from typing import Dict, List, Any
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, case, extract

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.admin import Admin
from app.models.application import Application, ApplicationStatus
from app.models.advisor import Advisor
from app.models.user import User

router = APIRouter()


@router.get("/dashboard")
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
) -> Dict[str, Any]:
    """Get dashboard statistics"""
    
    # Total applications count by status
    total_apps = db.query(func.count(Application.id)).scalar() or 0
    
    status_counts = db.query(
        func.sum(case((Application.status == ApplicationStatus.PENDING, 1), else_=0)).label("pending"),
        func.sum(case((Application.status == ApplicationStatus.REVIEW, 1), else_=0)).label("review"),
        func.sum(case((Application.status == ApplicationStatus.APPROVED, 1), else_=0)).label("approved"),
        func.sum(case((Application.status == ApplicationStatus.REJECTED, 1), else_=0)).label("rejected"),
        func.sum(case((Application.status == ApplicationStatus.DISBURSED, 1), else_=0)).label("disbursed"),
    ).first()
    
    # Total users
    total_users = db.query(func.count(User.id)).scalar() or 0
    
    # Active advisors
    active_advisors = db.query(func.count(Advisor.id)).filter(
        Advisor.is_active == 1
    ).scalar() or 0
    
    # Recent applications (last 10)
    recent_applications = db.query(Application).order_by(
        Application.submitted_at.desc()
    ).limit(10).all()
    
    # Applications this month
    now = datetime.now()
    first_day_of_month = datetime(now.year, now.month, 1)
    apps_this_month = db.query(func.count(Application.id)).filter(
        Application.submitted_at >= first_day_of_month
    ).scalar() or 0
    
    # Average processing time (in days)
    avg_processing_time = db.query(
        func.avg(
            func.julianday(Application.updated_at) - func.julianday(Application.submitted_at)
        )
    ).filter(
        Application.status.in_([ApplicationStatus.APPROVED, ApplicationStatus.DISBURSED])
    ).scalar()
    
    return {
        "total_applications": total_apps,
        "applications_by_status": {
            "pending": status_counts.pending or 0,
            "review": status_counts.review or 0,
            "approved": status_counts.approved or 0,
            "rejected": status_counts.rejected or 0,
            "disbursed": status_counts.disbursed or 0,
        },
        "total_users": total_users,
        "active_advisors": active_advisors,
        "applications_this_month": apps_this_month,
        "avg_processing_time_days": round(avg_processing_time, 1) if avg_processing_time else 0,
        "recent_applications": [
            {
                "id": app.id,
                "application_number": app.application_number,
                "product_type": app.product_type,
                "status": app.status,
                "submitted_at": app.submitted_at
            }
            for app in recent_applications
        ]
    }


@router.get("/applications/stats")
def get_application_stats(
    start_date: str = Query(None, description="Start date (YYYY-MM-DD)"),
    end_date: str = Query(None, description="End date (YYYY-MM-DD)"),
    db: Session = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
) -> Dict[str, Any]:
    """Get application statistics with optional date range"""
    
    query = db.query(Application)
    
    if start_date:
        query = query.filter(Application.submitted_at >= datetime.fromisoformat(start_date))
    if end_date:
        query = query.filter(Application.submitted_at <= datetime.fromisoformat(end_date))
    
    # Applications by product type
    product_stats = db.query(
        Application.product_type,
        func.count(Application.id).label("count")
    ).group_by(Application.product_type).all()
    
    # Applications by month (last 6 months)
    six_months_ago = datetime.now() - timedelta(days=180)
    monthly_stats = db.query(
        extract('year', Application.submitted_at).label('year'),
        extract('month', Application.submitted_at).label('month'),
        func.count(Application.id).label('count')
    ).filter(
        Application.submitted_at >= six_months_ago
    ).group_by('year', 'month').order_by('year', 'month').all()
    
    # Conversion rate (approved + disbursed / total)
    total = query.count()
    successful = query.filter(
        Application.status.in_([ApplicationStatus.APPROVED, ApplicationStatus.DISBURSED])
    ).count()
    conversion_rate = (successful / total * 100) if total > 0 else 0
    
    return {
        "total_applications": total,
        "successful_applications": successful,
        "conversion_rate": round(conversion_rate, 2),
        "by_product_type": [
            {"product_type": stat[0], "count": stat[1]}
            for stat in product_stats
        ],
        "monthly_trend": [
            {"year": int(stat.year), "month": int(stat.month), "count": stat.count}
            for stat in monthly_stats
        ]
    }


@router.get("/advisors/performance")
def get_advisors_performance(
    db: Session = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
) -> List[Dict[str, Any]]:
    """Get performance metrics for all advisors"""
    
    advisors = db.query(Advisor).filter(Advisor.is_active == 1).all()
    
    performance = []
    for advisor in advisors:
        # Get application counts by status
        stats = db.query(
            func.count(Application.id).label("total"),
            func.sum(case((Application.status == ApplicationStatus.APPROVED, 1), else_=0)).label("approved"),
            func.sum(case((Application.status == ApplicationStatus.DISBURSED, 1), else_=0)).label("disbursed"),
            func.sum(case((Application.status == ApplicationStatus.REJECTED, 1), else_=0)).label("rejected"),
        ).filter(
            Application.advisor_id == advisor.id
        ).first()
        
        # Success rate
        total = stats.total or 0
        successful = (stats.approved or 0) + (stats.disbursed or 0)
        success_rate = (successful / total * 100) if total > 0 else 0
        
        performance.append({
            "advisor_id": advisor.id,
            "advisor_name": advisor.name,
            "total_applications": total,
            "approved": stats.approved or 0,
            "disbursed": stats.disbursed or 0,
            "rejected": stats.rejected or 0,
            "success_rate": round(success_rate, 2)
        })
    
    # Sort by total applications descending
    performance.sort(key=lambda x: x["total_applications"], reverse=True)
    
    return performance

