from fastapi import APIRouter, HTTPException
from app.models import Attendance

router = APIRouter()

@router.get("/api/attendance/{attendance_id}")
async def get_attendance_by_id(attendance_id: str):
    attendance = await Attendance.get(attendance_id)
    if not attendance:
        raise HTTPException(status_code=404, detail="Attendance not found")
    return attendance

@router.delete("/api/attendance/{attendance_id}")
async def delete_attendance(attendance_id: str):
    attendance = await Attendance.get(attendance_id)
    if not attendance:
        raise HTTPException(status_code=404, detail="Attendance not found")
    await attendance.delete()
    return {"message": "Attendance deleted"}