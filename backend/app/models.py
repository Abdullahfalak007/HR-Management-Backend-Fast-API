from typing import Optional, Dict, Any
from beanie import Document
from pydantic import EmailStr, Field
import datetime

class User(Document):
    name: Optional[str]
    email: EmailStr
    password: Optional[str] = None
    role: str = "USER"
    image: Optional[str] = None
    otp: Optional[str] = None
    otp_expires_at: Optional[datetime.datetime] = None

    class Settings:
        name = "users"

class Employee(Document):
    name: str
    employee_id: str
    department: str
    designation: str
    type: str
    status: str
    avatar: Optional[str]
    personal_info: Optional[Dict[str, Any]]
    professional_info: Optional[Dict[str, Any]]
    documents: Optional[Dict[str, Any]]
    account_links: Optional[Dict[str, Any]]

    class Settings:
        name = "employees"

class Attendance(Document):
    employee_id: str
    date: Optional[datetime.datetime]
    check_in: Optional[datetime.datetime]
    check_out: Optional[datetime.datetime]
    break_time: Optional[str]
    work_hours: Optional[str]
    status: Optional[str]

    class Settings:
        name = "attendance"

class Leave(Document):
    employee_id: str
    reason: Optional[str]
    start_date: Optional[datetime.datetime]
    end_date: Optional[datetime.datetime]
    status: Optional[str]

    class Settings:
        name = "leaves"

class Notification(Document):
    user_id: str
    type: str
    message: str
    read: bool = False
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.utcnow)

    class Settings:
        name = "notifications"

class Project(Document):
    title: str
    description: Optional[str]
    start_date: Optional[datetime.datetime]
    end_date: Optional[datetime.datetime]
    status: Optional[str]
    employee_id: Optional[str]

    class Settings:
        name = "projects"