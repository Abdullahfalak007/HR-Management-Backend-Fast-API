from pydantic import BaseModel, EmailStr
from typing import Optional
import datetime

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    class Config:
        orm_mode = True

class EmployeeBase(BaseModel):
    name: str
    employee_id: str
    department: str
    designation: str
    type: str
    status: str
    avatar: Optional[str] = None

class Employee(EmployeeBase):
    id: int
    class Config:
        orm_mode = True

class AttendanceBase(BaseModel):
    employee_id: int
    date: Optional[datetime.datetime]
    status: str

class Attendance(AttendanceBase):
    id: int
    class Config:
        orm_mode = True

class LeaveBase(BaseModel):
    employee_id: int
    status: str

class Leave(LeaveBase):
    id: int
    class Config:
        orm_mode = True

class NotificationBase(BaseModel):
    user_id: int
    message: str
    read: bool = False

class Notification(NotificationBase):
    id: int
    class Config:
        orm_mode = True

class ProjectBase(BaseModel):
    name: str

class Project(ProjectBase):
    id: int
    class Config:
        orm_mode = True