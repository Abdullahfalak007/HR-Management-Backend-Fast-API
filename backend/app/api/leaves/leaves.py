from fastapi import APIRouter, HTTPException
from app.models import Leave
from pydantic import BaseModel
from typing import List

router = APIRouter()

@router.get("/api/leaves", response_model=List[Leave])
async def get_leaves():
    return await Leave.find_all().to_list()

class CreateLeaveRequest(BaseModel):
    employee_id: str
    reason: str
    start_date: str
    end_date: str
    status: str

@router.post("/api/leaves")
async def create_leave(payload: CreateLeaveRequest):
    leave = Leave(**payload.dict())
    await leave.insert()
    return {"message": "Leave created", "id": str(leave.id)}