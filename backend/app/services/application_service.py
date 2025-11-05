from datetime import datetime
from sqlalchemy.orm import Session

from app.models.application import Application, ApplicationStatus
from app.models.user import User


def generate_application_number(db: Session) -> str:
    """Generate unique application number in format APP-YYYY-XXXXXX"""
    year = datetime.now().year
    
    # Get the count of applications this year
    count = db.query(Application).filter(
        Application.application_number.like(f"APP-{year}-%")
    ).count()
    
    # Generate number with 6 digits
    sequence = str(count + 1).zfill(6)
    
    return f"APP-{year}-{sequence}"


def get_or_create_user(db: Session, email: str, phone: str, full_name: str, city: str = None, address: str = None) -> User:
    """Get existing user or create new one"""
    # Try to find by email or phone
    user = db.query(User).filter(
        (User.email == email) | (User.phone == phone)
    ).first()
    
    if not user:
        user = User(
            email=email,
            phone=phone,
            full_name=full_name,
            city=city,
            address=address
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    
    return user

