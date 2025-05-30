from fastapi import APIRouter, File, UploadFile, HTTPException
from app.utils.cloudinary import upload_file

router = APIRouter()

@router.post("/api/upload")
async def upload(file: UploadFile = File(...)):
    try:
        url = upload_file(file.file)
        return {"url": url}
    except Exception:
        raise HTTPException(status_code=500, detail="Upload failed")