from fastapi import APIRouter
from app.models import Project
from typing import List

router = APIRouter()

@router.get("/api/employees/{employee_id}/projects", response_model=List[Project])
async def get_employee_projects(employee_id: str):
    return await Project.find(Project.employee_id == employee_id).to_list()