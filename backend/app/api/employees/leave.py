from fastapi import APIRouter
from app.models import Leave
from typing import List

router = APIRouter()

@router.get("/api/employees/{employee_id}/leave", response_model=List[Leave])
async def get_employee_leaves(employee_id: str):
    return await Leave.find(Leave.employee_id == employee_id).to_list()