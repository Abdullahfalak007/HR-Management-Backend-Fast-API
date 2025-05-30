from fastapi import APIRouter, HTTPException
from app.models import Leave

router = APIRouter()

@router.get("/api/leaves/{leave_id}")
async def get_leave_by_id(leave_id: str):
    leave = await Leave.get(leave_id)
    if not leave:
        raise HTTPException(status_code=404, detail="Leave not found")
    return leave

@router.delete("/api/leaves/{leave_id}")
async def delete_leave(leave_id: str):
    leave = await Leave.get(leave_id)
    if not leave:
        raise HTTPException(status_code=404, detail="Leave not found")
    await leave.delete()
    return {"message": "Leave deleted"}