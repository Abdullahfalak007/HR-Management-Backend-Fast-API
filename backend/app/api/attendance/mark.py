from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.models import Attendance
import datetime

router = APIRouter()

class MarkAttendanceRequest(BaseModel):
    employee_id: str
    status: str

@router.post("/api/attendance/mark")
async def mark_attendance(payload: MarkAttendanceRequest):
    attendance = Attendance(
        employee_id=payload.employee_id,
        date=datetime.datetime.utcnow(),
        status=payload.status
    )
    await attendance.insert()
    return {"message": "Attendance marked"}