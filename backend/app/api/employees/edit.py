from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.models import Employee

router = APIRouter()

class EditEmployeeRequest(BaseModel):
    name: str
    department: str
    designation: str
    type: str
    status: str

@router.put("/api/employees/{employee_id}/edit")
async def edit_employee(employee_id: str, payload: EditEmployeeRequest):
    employee = await Employee.get(employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    for field, value in payload.dict().items():
        setattr(employee, field, value)
    await employee.save()
    return {"message": "Employee updated"}