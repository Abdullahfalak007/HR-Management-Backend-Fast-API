from fastapi import APIRouter, HTTPException
from app.models import Project

router = APIRouter()

@router.get("/api/projects/{project_id}")
async def get_project_by_id(project_id: str):
    project = await Project.get(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.delete("/api/projects/{project_id}")
async def delete_project(project_id: str):
    project = await Project.get(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    await project.delete()
    return {"message": "Project deleted"}