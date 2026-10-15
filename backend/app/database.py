import asyncpg
import json
import logging
from typing import Any, List, Optional, Dict
from app.config import settings

logger = logging.getLogger(__name__)

pool: Optional[asyncpg.Pool] = None

async def init_db_pool():
    global pool
    try:
        db_url = settings.DATABASE_URL
        if db_url.startswith("postgres://"):
            db_url = db_url.replace("postgres://", "postgresql://", 1)
            
        # Detect if remote cloud (Supabase / Render) to apply SSL & disable prepared statement caching
        is_cloud = "supabase" in db_url or "render" in db_url or "pooler" in db_url
        
        ssl_mode = "require" if is_cloud else None
        cache_size = 0 if is_cloud else 100

        pool = await asyncpg.create_pool(
            dsn=db_url,
            min_size=1,
            max_size=5,
            command_timeout=30.0,
            statement_cache_size=cache_size,
            ssl=ssl_mode
        )
        logger.info("[DB] Database connection pool successfully initialized.")
        await run_migrations()
        await seed_initial_data()
    except Exception as e:
        logger.error(f"[DB] Failed to connect to PostgreSQL database: {e}")
        pool = None

async def close_db_pool():
    global pool
    if pool:
        await pool.close()
        logger.info("[DB] Database connection pool closed.")

async def execute_query(query: str, *params) -> str:
    """Executes a direct parameterized query (INSERT, UPDATE, DELETE). Prevents SQL injection."""
    if not pool:
        raise RuntimeError("Database pool is not connected.")
    async with pool.acquire() as conn:
        return await conn.execute(query, *params)

async def fetch_one(query: str, *params) -> Optional[Dict[str, Any]]:
    """Fetches a single row using direct parameterized query."""
    if not pool:
        raise RuntimeError("Database pool is not connected.")
    async with pool.acquire() as conn:
        record = await conn.fetchrow(query, *params)
        return dict(record) if record else None

async def fetch_all(query: str, *params) -> List[Dict[str, Any]]:
    """Fetches multiple rows using direct parameterized query."""
    if not pool:
        raise RuntimeError("Database pool is not connected.")
    async with pool.acquire() as conn:
        records = await conn.fetch(query, *params)
        return [dict(r) for r in records]

async def check_db_health() -> bool:
    if not pool:
        return False
    try:
        async with pool.acquire() as conn:
            val = await conn.fetchval("SELECT 1")
            return val == 1
    except Exception:
        return False

async def run_migrations():
    """Runs the initial table creation scripts if tables do not exist."""
    if not pool:
        return
    migration_sql = """
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(150),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS indicator_snapshots (
        id SERIAL PRIMARY KEY,
        indicator_code VARCHAR(100) NOT NULL,
        indicator_name VARCHAR(200) NOT NULL,
        primary_metric_label VARCHAR(100),
        primary_metric_value VARCHAR(50),
        primary_metric_change VARCHAR(50),
        secondary_metric_label VARCHAR(100),
        secondary_metric_value VARCHAR(50),
        secondary_metric_change VARCHAR(50),
        chart_data JSONB NOT NULL DEFAULT '[]'::jsonb,
        source VARCHAR(255) NOT NULL,
        observation_period VARCHAR(100) NOT NULL,
        is_valid BOOLEAN DEFAULT TRUE,
        is_stale BOOLEAN DEFAULT FALSE,
        collected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS market_ticker (
        id SERIAL PRIMARY KEY,
        symbol VARCHAR(50) NOT NULL,
        price DECIMAL(14, 2) NOT NULL,
        change_value DECIMAL(10, 2) NOT NULL,
        change_percent DECIMAL(6, 2) NOT NULL,
        collected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_indicator_code ON indicator_snapshots(indicator_code);
    """
    async with pool.acquire() as conn:
        await conn.execute(migration_sql)
        logger.info("[DB] Database tables and indexes verified.")

async def seed_initial_data():
    """Seeds the 6 indicator panels matching the Figma benchmark design."""
    if not pool:
        return
    async with pool.acquire() as conn:
        count = await conn.fetchval("SELECT COUNT(*) FROM indicator_snapshots")
        if count > 0:
            return  # Already seeded
            
        logger.info("[DB] Seeding initial benchmark indicator data from Figma reference...")
        
        # 1. GDP Growth - India vs World
        gdp_chart = [
            {"year": "2021", "india": 8.7, "world": 6.3},
            {"year": "2022", "india": 8.7, "world": 4.7},
            {"year": "2023", "india": 8.7, "world": 4.7},
            {"year": "2024", "india": 8.7, "world": 6.3},
            {"year": "2025", "india": 8.7, "world": 4.7}
        ]
        await conn.execute(
            """
            INSERT INTO indicator_snapshots (
                indicator_code, indicator_name, primary_metric_label, primary_metric_value, primary_metric_change,
                secondary_metric_label, secondary_metric_value, secondary_metric_change,
                chart_data, source, observation_period
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            """,
            "gdp_growth", "GDP Growth - India vs World (YOY%)", "India", "4.82%", "-0.2pp",
            "World", "3.82%", "-0.81pp", json.dumps(gdp_chart),
            "National Statistical Office (NSO) / World Bank", "Q3 FY 2024-25"
        )

        # 2. Debt to GDP Ratio (IND)
        debt_chart = [
            {"date": "25 Jul", "ratio": 78.0},
            {"date": "28 Jul", "ratio": 88.0},
            {"date": "1 Aug", "ratio": 65.0},
            {"date": "8 Aug", "ratio": 54.0},
            {"date": "15 Aug", "ratio": 65.0},
            {"date": "22 Aug", "ratio": 72.0}
        ]
        await conn.execute(
            """
            INSERT INTO indicator_snapshots (
                indicator_code, indicator_name, primary_metric_label, primary_metric_value, primary_metric_change,
                secondary_metric_label, secondary_metric_value, secondary_metric_change,
                chart_data, source, observation_period
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            """,
            "debt_to_gdp", "Debt to GDP Ratio (IND)", "India (FY25)", "3.82%", "-0.81pp",
            "Ind vs US", "3.82%", "-0.81pp", json.dumps(debt_chart),
            "Reserve Bank of India (RBI Handbook of Statistics)", "FY 2024-25"
        )

        # 3. Imports, Exports & Trade Balance
        trade_chart = [
            {"year": "2021", "imports": 8.7, "exports": 6.3, "trade_balance": 2.5},
            {"year": "2022", "imports": 8.7, "exports": 4.7, "trade_balance": 2.1},
            {"year": "2023", "imports": 8.7, "exports": 4.7, "trade_balance": 1.8},
            {"year": "2024", "imports": 8.7, "exports": 6.3, "trade_balance": 1.2},
            {"year": "2025", "imports": 8.7, "exports": 4.7, "trade_balance": 0.8}
        ]
        await conn.execute(
            """
            INSERT INTO indicator_snapshots (
                indicator_code, indicator_name, primary_metric_label, primary_metric_value, primary_metric_change,
                secondary_metric_label, secondary_metric_value, secondary_metric_change,
                chart_data, source, observation_period
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            """,
            "trade_balance", "Imports, Exports & Trade Balance", "Exports", "$382.9 B", "-0.81pp",
            "Imports", "$382.9 B", "-0.81pp", json.dumps(trade_chart),
            "Ministry of Commerce and Industry (DGCIS)", "January 2025"
        )

        # 4. GST Tax Collection (YOY%)
        gst_chart = [
            {"year": "2021", "collection": 8.7, "average": 2.1},
            {"year": "2022", "collection": 6.7, "average": 2.6},
            {"year": "2023", "collection": 8.7, "average": 3.7},
            {"year": "2024", "collection": 8.7, "average": 3.8},
            {"year": "2025", "collection": 6.7, "average": 3.2}
        ]
        await conn.execute(
            """
            INSERT INTO indicator_snapshots (
                indicator_code, indicator_name, primary_metric_label, primary_metric_value, primary_metric_change,
                secondary_metric_label, secondary_metric_value, secondary_metric_change,
                chart_data, source, observation_period
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            """,
            "gst_collection", "GST Tax Collection (YOY%)", "GST Collections", "3.82%", "-0.81pp",
            "Monthly Average", "1.97", "-0.81pp", json.dumps(gst_chart),
            "GST Council / Ministry of Finance (PIB)", "February 2025"
        )

        # 5. Inflation (IND)
        inflation_chart = [
            {"year": "2021", "cpi": 8.2},
            {"year": "2022", "cpi": 5.8},
            {"year": "2023", "cpi": 2.8},
            {"year": "2024", "cpi": 3.2},
            {"year": "2025", "cpi": 5.4}
        ]
        await conn.execute(
            """
            INSERT INTO indicator_snapshots (
                indicator_code, indicator_name, primary_metric_label, primary_metric_value, primary_metric_change,
                secondary_metric_label, secondary_metric_value, secondary_metric_change,
                chart_data, source, observation_period
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            """,
            "inflation_cpi", "Inflation (IND)", "Inflation Rate", "2.1%", "-0.2pp",
            "RBI Target", "4%", "-0.2pp", json.dumps(inflation_chart),
            "Ministry of Statistics and Programme Implementation (MOSPI) / RBI", "January 2025"
        )

        # 6. Government Expenditure
        expenditure_chart = [
            {"year": "2021", "revenue": 21.2, "capital": 10.0},
            {"year": "2022", "revenue": 23.2, "capital": 8.0},
            {"year": "2023", "revenue": 23.2, "capital": 8.0},
            {"year": "2024", "revenue": 23.2, "capital": 8.0},
            {"year": "2025", "revenue": 23.2, "capital": 8.0}
        ]
        await conn.execute(
            """
            INSERT INTO indicator_snapshots (
                indicator_code, indicator_name, primary_metric_label, primary_metric_value, primary_metric_change,
                secondary_metric_label, secondary_metric_value, secondary_metric_change,
                chart_data, source, observation_period
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            """,
            "govt_expenditure", "Government Expenditure", "Total Expenditure", "4.82%", "-0.2pp",
            "Capital Expenditure", "3.82%", "-0.2pp", json.dumps(expenditure_chart),
            "Controller General of Accounts (CGA) / Union Budget", "FY 2024-25 RE"
        )

        # Seed Market Ticker values
        await conn.execute(
            """
            INSERT INTO market_ticker (symbol, price, change_value, change_percent)
            VALUES 
                ('SENSEX', 73158.24, 305.10, 0.42),
                ('NIFTY BANK', 46919.80, -56.30, -0.12),
                ('NIFTY IT', 37842.15, 412.50, 1.10)
            """
        )
        logger.info("[DB] All initial indicators and market ticker seeded successfully.")
