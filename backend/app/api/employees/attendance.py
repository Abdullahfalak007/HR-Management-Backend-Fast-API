from fastapi import APIRouter
from app.models import Attendance
from typing import List

router = APIRouter()

@router.get("/api/employees/{employee_id}/attendance", response_model=List[Attendance])
async def get_employee_attendance(employee_id: str):
    return await Attendance.find(Attendance.employee_id == employee_id).to_list()