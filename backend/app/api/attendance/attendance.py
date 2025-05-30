from fastapi import APIRouter
from app.models import Attendance
from typing import List

router = APIRouter()

@router.get("/api/attendance", response_model=List[Attendance])
async def get_attendance():
    return await Attendance.find_all().to_list()