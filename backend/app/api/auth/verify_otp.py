from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from app.models import User
import datetime

router = APIRouter()

class VerifyOtpRequest(BaseModel):
    email: EmailStr
    otp: str

@router.post("/api/auth/verify-otp")
async def verify_otp(payload: VerifyOtpRequest):
    if not payload.email or not payload.otp:
        raise HTTPException(status_code=400, detail="Email and OTP are required")

    user = await User.find_one(User.email == payload.email)
    if (
        not user or
        not user.otp or
        not user.otp_expires_at or
        user.otp != payload.otp or
        datetime.datetime.utcnow() > user.otp_expires_at
    ):
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")

    return {"message": "OTP verified"}