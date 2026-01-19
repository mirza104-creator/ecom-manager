from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api.database import SessionLocal
from api.models.user import User

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/login")
def login(email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()

    if not user:
        user = User(email=email)
        db.add(user)
        db.commit()
        db.refresh(user)

    return {
        "message": "Login successful",
        "user_id": user.id,
        "email": user.email
    }
