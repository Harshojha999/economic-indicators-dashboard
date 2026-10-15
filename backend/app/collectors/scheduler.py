import logging
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.collectors.nse_collector import sync_market_ticker

logger = logging.getLogger(__name__)

scheduler = AsyncIOScheduler()

def start_scheduler():
    try:
        # Schedule market ticker refresh every 60 seconds
        scheduler.add_job(
            sync_market_ticker,
            "interval",
            seconds=60,
            id="sync_market_ticker_job",
            replace_existing=True
        )
        scheduler.start()
        logger.info("✅ Background APScheduler started for data ingestion.")
    except Exception as e:
        logger.error(f"Failed to start scheduler: {e}")

def shutdown_scheduler():
    if scheduler.running:
        scheduler.shutdown(wait=False)
        logger.info("Background scheduler shut down.")
