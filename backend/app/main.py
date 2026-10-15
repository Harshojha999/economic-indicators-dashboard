import logging
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import init_db_pool, close_db_pool, check_db_health
from app.auth.routes import router as auth_router
from app.dashboard.routes import router as dashboard_router
from app.collectors.scheduler import start_scheduler, shutdown_scheduler

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("app.main")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize Database Pool & Background Scheduler
    logger.info("Initializing backend services...")
    await init_db_pool()
    start_scheduler()
    yield
    # Shutdown: Clean up connections
    logger.info("Shutting down backend services...")
    shutdown_scheduler()
    await close_db_pool()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    description="Economic Indicators Dashboard API with direct parameterized SQL and JWT Authentication.",
    lifespan=lifespan
)

# CORS configuration strictly enforced
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth_router)
app.include_router(dashboard_router)

@app.get("/api/health", tags=["Health"])
async def health_check():
    """
    Mandatory Health Check endpoint.
    Reports API status, database connectivity, and timestamp.
    """
    db_healthy = await check_db_health()
    return {
        "status": "healthy" if db_healthy else "degraded",
        "database_connected": db_healthy,
        "service": "Economic Indicators API",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "environment": settings.ENVIRONMENT
    }

@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "Economic Indicators Dashboard API is running.",
        "documentation": "/docs",
        "health": "/api/health"
    }
