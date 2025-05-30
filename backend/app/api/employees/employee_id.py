from fastapi import APIRouter, HTTPException
from app.models import Employee
from pydantic import BaseModel

router = APIRouter()

@router.get("/api/employees/{employee_id}")
async def get_employee_by_id(employee_id: str):
    employee = await Employee.get(employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee

class UpdateEmployeeRequest(BaseModel):
    name: str
    department: str
    designation: str
    type: str
    status: str

@router.put("/api/employees/{employee_id}")
async def update_employee(employee_id: str, payload: UpdateEmployeeRequest):
    employee = await Employee.get(employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    for field, value in payload.dict().items():
        setattr(employee, field, value)
    await employee.save()
    return {"message": "Employee updated"}

@router.delete("/api/employees/{employee_id}")
async def delete_employee(employee_id: str):
    employee = await Employee.get(employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    await employee.delete()
    return {"message": "Employee deleted"}