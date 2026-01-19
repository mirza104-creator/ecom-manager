from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .auth import router as auth_router
from .database import engine
from .models.user import Base

app = FastAPI(title="Ecom Manager API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

app.include_router(auth_router, prefix="/auth")
from api.photoshoot import router as photoshoot_router

app.include_router(photoshoot_router, prefix="/photoshoot")

@app.get("/health")
def health():
    return {"status": "ok"}
