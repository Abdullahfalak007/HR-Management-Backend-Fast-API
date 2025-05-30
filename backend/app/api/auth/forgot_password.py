from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from app.models import User
from app.utils.email import send_otp_email
import random, datetime

router = APIRouter()

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

@router.post("/api/auth/forgot-password")
async def forgot_password(payload: ForgotPasswordRequest):
    if not payload.email:
        raise HTTPException(status_code=400, detail="Email is required")

    user = await User.find_one(User.email == payload.email)
    if not user:
        # Always return the same message for security
        return {"message": "If a matching account was found, an OTP has been sent to your email."}

    otp = str(random.randint(100000, 999999))
    otp_expires_at = datetime.datetime.utcnow() + datetime.timedelta(minutes=10)
    user.otp = otp
    user.otp_expires_at = otp_expires_at
    await user.save()

    send_otp_email(user.email, otp)
    return {
        "message": "OTP has been sent to your email."
    }