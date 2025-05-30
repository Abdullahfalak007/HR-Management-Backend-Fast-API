from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.models import Employee
from typing import List

router = APIRouter()

@router.get("/api/employees", response_model=List[Employee])
async def get_employees():
    return await Employee.find_all().to_list()

class CreateEmployeeRequest(BaseModel):
    name: str
    employee_id: str
    department: str
    designation: str
    type: str
    status: str

@router.post("/api/employees")
async def create_employee(payload: CreateEmployeeRequest):
    existing = await Employee.find_one(Employee.employee_id == payload.employee_id)
    if existing:
        raise HTTPException(status_code=400, detail="Employee already exists")
    employee = Employee(**payload.dict())
    await employee.insert()
    return {"message": "Employee created", "employee_id": employee.employee_id}