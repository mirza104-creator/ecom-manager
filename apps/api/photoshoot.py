import os
from fastapi import APIRouter, UploadFile, File, Form

router = APIRouter()

UPLOAD_DIR = "api/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/generate")
async def generate_photoshoot(
    image: UploadFile = File(...),
    model: str = Form(...),
    background: str = Form(...),
):
    file_path = f"{UPLOAD_DIR}/{image.filename}"

    with open(file_path, "wb") as f:
        content = await image.read()
        f.write(content)

    return {
        "status": "success",
        "message": "Photoshoot generated (mock)",
        "model": model,
        "background": background,
        "image_url": f"/uploads/{image.filename}",
    }
