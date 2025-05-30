from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from app.models import User
from passlib.hash import bcrypt
from app.utils.jwt import create_access_token

router = APIRouter()

class SigninRequest(BaseModel):
    email: EmailStr
    password: str

@router.post("/api/auth/signin")
async def signin(payload: SigninRequest):
    user = await User.find_one(User.email == payload.email)
    if not user or not user.password or not bcrypt.verify(payload.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token({"sub": user.email, "id": str(user.id), "role": user.role})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": str(user.id),
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "image": user.image,
        }
    }