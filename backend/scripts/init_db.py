"""
Initialize database with sample data
Run this script after setting up the database to create an initial admin user
"""

import sys
from pathlib import Path

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from app.core.database import SessionLocal
from app.core.security import get_password_hash
from app.models.admin import Admin, AdminRole
from app.models.advisor import Advisor

def init_db():
    """Initialize database with sample data"""
    db = SessionLocal()
    
    try:
        # Check if admin already exists
        existing_admin = db.query(Admin).filter(Admin.email == "admin@fundax.co.id").first()
        
        if not existing_admin:
            # Create default admin user
            admin = Admin(
                email="admin@fundax.co.id",
                password_hash=get_password_hash("admin123"),  # Change this password!
                full_name="System Administrator",
                role=AdminRole.ADMIN,
                is_active=1
            )
            db.add(admin)
            print("✓ Created admin user: admin@fundax.co.id / admin123")
        else:
            print("Admin user already exists")
        
        # Check if adviser exists
        existing_adviser = db.query(Admin).filter(Admin.email == "adviser@fundax.co.id").first()
        
        if not existing_adviser:
            # Create default adviser user
            adviser = Admin(
                email="adviser@fundax.co.id",
                password_hash=get_password_hash("adviser123"),  # Change this password!
                full_name="Loan Adviser",
                role=AdminRole.ADVISER,
                is_active=1
            )
            db.add(adviser)
            print("✓ Created adviser user: adviser@fundax.co.id / adviser123")
        else:
            print("Adviser user already exists")
        
        # Create sample advisors
        sample_advisors = [
            {"name": "Maria Sari", "email": "maria.sari@fundax.co.id", "phone": "+62 812-3456-7890", "city": "Jakarta"},
            {"name": "Budi Santoso", "email": "budi.santoso@fundax.co.id", "phone": "+62 813-4567-8901", "city": "Surabaya"},
            {"name": "Siti Rahmawati", "email": "siti.rahmawati@fundax.co.id", "phone": "+62 814-5678-9012", "city": "Bandung"},
        ]
        
        for advisor_data in sample_advisors:
            existing = db.query(Advisor).filter(Advisor.email == advisor_data["email"]).first()
            if not existing:
                advisor = Advisor(**advisor_data)
                db.add(advisor)
                print(f"✓ Created advisor: {advisor_data['name']}")
        
        db.commit()
        print("\n✅ Database initialized successfully!")
        print("\nDefault credentials:")
        print("Admin: admin@fundax.co.id / admin123")
        print("Adviser: adviser@fundax.co.id / adviser123")
        print("\n⚠️  IMPORTANT: Change these passwords in production!")
        
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_db()

