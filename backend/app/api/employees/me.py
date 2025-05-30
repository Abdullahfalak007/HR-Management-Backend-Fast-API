from fastapi import APIRouter, Depends
from app.deps import get_current_user
from app.models import User

router = APIRouter()

@router.get("/api/employees/me")
async def get_me(current_user=Depends(get_current_user)):
    user = await User.find_one(User.email == current_user["sub"])
    return {
        "id": str(user.id),
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "image": user.image,
    }