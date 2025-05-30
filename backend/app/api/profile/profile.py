from fastapi import APIRouter, HTTPException
from app.models import User

router = APIRouter()

@router.get("/api/profile/{user_id}")
async def get_profile(user_id: str):
    user = await User.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user