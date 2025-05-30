from fastapi import APIRouter, HTTPException
from app.models import Notification
from pydantic import BaseModel
from typing import List

router = APIRouter()

@router.get("/api/notifications", response_model=List[Notification])
async def get_notifications():
    return await Notification.find_all().to_list()

class CreateNotificationRequest(BaseModel):
    user_id: str
    type: str
    message: str

@router.post("/api/notifications")
async def create_notification(payload: CreateNotificationRequest):
    notification = Notification(
        user_id=payload.user_id,
        type=payload.type,
        message=payload.message,
        read=False
    )
    await notification.insert()
    return {"message": "Notification created", "id": str(notification.id)}