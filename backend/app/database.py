import os
from dotenv import load_dotenv

# Explicitly load the backend .env file
dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")
print("Loading .env from:", dotenv_path)
load_dotenv(dotenv_path)

from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.models import User, Employee, Attendance, Leave, Notification, Project
from pymongo.uri_parser import parse_uri

MONGODB_URI = os.getenv("MONGODB_URI")

async def init_db():
    print("MONGODB_URI from env:", MONGODB_URI)
    client = AsyncIOMotorClient(MONGODB_URI)
    parsed = parse_uri(MONGODB_URI)
    db_name = parsed.get("database") or "test"  # fallback to 'test' if not specified
    db = client[db_name]
    print("Using database:", db.name)
    await init_beanie(
        database=db,
        document_models=[User, Employee, Attendance, Leave, Notification, Project],
    )