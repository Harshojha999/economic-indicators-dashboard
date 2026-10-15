import os
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Economic Indicators Dashboard API"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "postgresql://postgres:postgres@localhost:5432/economic_dashboard"
    )
    
    # JWT Auth
    JWT_SECRET: str = os.getenv("JWT_SECRET", "economic_dashboard_super_secret_jwt_key_2026_secure")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours token validity
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:4173",
        "*"  # Allows easily configurable frontend deployment origin
    ]

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()
