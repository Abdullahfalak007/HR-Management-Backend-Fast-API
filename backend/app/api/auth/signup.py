from fastapi import APIRouter, status, HTTPException
from pydantic import BaseModel, EmailStr
from app.models import User
from passlib.hash import bcrypt

router = APIRouter()

class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str

@router.post("/api/auth/signup")
async def signup(payload: SignupRequest):
    existing = await User.find_one(User.email == payload.email)
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")
    hashed_password = bcrypt.hash(payload.password)
    user = User(
        name=payload.name,
        email=payload.email,
        password=hashed_password,
        role="USER"
    )
    await user.insert()
    return {"message": "User created", "userId": str(user.id)}