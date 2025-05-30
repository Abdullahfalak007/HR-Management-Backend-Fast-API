from fastapi import APIRouter, HTTPException
from app.models import Project
from pydantic import BaseModel
from typing import List

router = APIRouter()

@router.get("/api/projects", response_model=List[Project])
async def get_projects():
    return await Project.find_all().to_list()

class CreateProjectRequest(BaseModel):
    title: str
    description: str
    start_date: str
    end_date: str
    status: str
    employee_id: str

@router.post("/api/projects")
async def create_project(payload: CreateProjectRequest):
    project = Project(**payload.dict())
    await project.insert()
    return {"message": "Project created", "id": str(project.id)}