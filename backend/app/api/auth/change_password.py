from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.models import User
from passlib.hash import bcrypt

router = APIRouter()

class ChangePasswordRequest(BaseModel):
    email: str
    currentPassword: str
    newPassword: str

@router.post("/api/auth/change-password")
async def change_password(payload: ChangePasswordRequest):
    if not payload.email or not payload.currentPassword or not payload.newPassword:
        raise HTTPException(status_code=400, detail="Both current and new passwords are required")

    user = await User.find_one(User.email == payload.email)
    if not user or not user.password or not bcrypt.verify(payload.currentPassword, user.password):
        raise HTTPException(status_code=400, detail="Current password is incorrect")

    user.password = bcrypt.hash(payload.newPassword)
    await user.save()
    return {"message": "Password changed successfully"}