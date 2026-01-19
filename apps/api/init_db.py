from .database import engine
from .models.user import Base

def init_db():
    Base.metadata.create_all(bind=engine)
