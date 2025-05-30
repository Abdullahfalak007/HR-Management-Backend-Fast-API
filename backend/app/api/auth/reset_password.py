from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from app.models import User, Notification
from passlib.hash import bcrypt
import datetime

router = APIRouter()

class ResetPasswordRequest(BaseModel):
    email: EmailStr
    newPassword: str

@router.post("/api/auth/reset-password")
async def reset_password(payload: ResetPasswordRequest):
    if not payload.email or not payload.newPassword:
        raise HTTPException(status_code=400, detail="Email and new password are required")

    user = await User.find_one(User.email == payload.email)
    if not user:
        raise HTTPException(status_code=400, detail="User not found")

    user.password = bcrypt.hash(payload.newPassword)
    user.otp = None
    user.otp_expires_at = None
    await user.save()

    notification = Notification(
        user_id=str(user.id),
        type="PASSWORD_CHANGED",
        message="Your password has been changed successfully.",
        read=False,
        created_at=datetime.datetime.utcnow()
    )
    await notification.insert()

    return {"message": "Password updated successfully"}