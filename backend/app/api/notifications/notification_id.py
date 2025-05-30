from fastapi import APIRouter, HTTPException
from app.models import Notification

router = APIRouter()

@router.get("/api/notifications/{notification_id}")
async def get_notification_by_id(notification_id: str):
    notification = await Notification.get(notification_id)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    return notification

@router.delete("/api/notifications/{notification_id}")
async def delete_notification(notification_id: str):
    notification = await Notification.get(notification_id)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    await notification.delete()
    return {"message": "Notification deleted"}