from fastapi import FastAPI
from app.database import init_db
from app.api.auth import (
    forgot_password,
    reset_password,
    signup,
    signin,
    verify_otp,
    change_password,
)
from app.api.employees import (
    employees,
    me,
    employee_id,
    attendance as emp_attendance,
    leave as emp_leave,
    projects as emp_projects,
    edit as emp_edit,
)
from app.api.attendance import (
    attendance,
    mark,
    attendance_id,
)
from app.api.leaves import (
    leaves,
    leave_id,
)
from app.api.notifications import (
    notifications,
    notification_id,
)
from app.api.projects import (
    projects,
    project_id,
)
from app.api.profile import profile
from app.api.upload import upload

app = FastAPI()

@app.on_event("startup")
async def on_startup():
    await init_db()

# Auth
app.include_router(forgot_password.router)
app.include_router(reset_password.router)
app.include_router(signup.router)
app.include_router(signin.router)
app.include_router(verify_otp.router)
app.include_router(change_password.router)

# Employees
app.include_router(employees.router)
app.include_router(me.router)
app.include_router(employee_id.router)
app.include_router(emp_attendance.router)
app.include_router(emp_leave.router)
app.include_router(emp_projects.router)
app.include_router(emp_edit.router)

# Attendance
app.include_router(attendance.router)
app.include_router(mark.router)
app.include_router(attendance_id.router)

# Leaves
app.include_router(leaves.router)
app.include_router(leave_id.router)

# Notifications
app.include_router(notifications.router)
app.include_router(notification_id.router)

# Projects
app.include_router(projects.router)
app.include_router(project_id.router)

# Profile
app.include_router(profile.router)

# Upload
app.include_router(upload.router)

@app.get("/test-insert")
async def test_insert():
    from app.models import User
    user = User(name="Debug User", email="debug@example.com", password="test123")
    await user.insert()
    return {"id": str(user.id)}