-- ============================================================
-- Economic Indicators Dashboard Database Schema
-- Strict Compliance: Direct Parameterized SQL, No ORM dependencies
-- ============================================================

-- 1. Users Table (Authentication)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Indicator Snapshots Table (Stores all 6 indicator panel data series)
CREATE TABLE IF NOT EXISTS indicator_snapshots (
    id SERIAL PRIMARY KEY,
    indicator_code VARCHAR(100) NOT NULL,     -- 'gdp_growth', 'debt_to_gdp', 'trade_balance', 'gst_collection', 'inflation_cpi', 'govt_expenditure'
    indicator_name VARCHAR(200) NOT NULL,
    primary_metric_label VARCHAR(100),
    primary_metric_value VARCHAR(50),
    primary_metric_change VARCHAR(50),
    secondary_metric_label VARCHAR(100),
    secondary_metric_value VARCHAR(50),
    secondary_metric_change VARCHAR(50),
    chart_data JSONB NOT NULL DEFAULT '[]'::jsonb,
    source VARCHAR(255) NOT NULL,             -- e.g. 'Ministry of Statistics & Programme Implementation (MOSPI) / World Bank'
    observation_period VARCHAR(100) NOT NULL, -- e.g. 'FY 2024-25 Q3' or 'August 2025'
    is_valid BOOLEAN DEFAULT TRUE,
    is_stale BOOLEAN DEFAULT FALSE,
    collected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Live Market Ticker Table (SENSEX, NIFTY BANK, NIFTY IT, etc.)
CREATE TABLE IF NOT EXISTS market_ticker (
    id SERIAL PRIMARY KEY,
    symbol VARCHAR(50) NOT NULL,              -- 'SENSEX', 'NIFTY BANK', 'NIFTY IT'
    price DECIMAL(14, 2) NOT NULL,
    change_value DECIMAL(10, 2) NOT NULL,
    change_percent DECIMAL(6, 2) NOT NULL,
    is_positive BOOLEAN GENERATED ALWAYS AS (change_value >= 0) STORED,
    collected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for ultra-fast parameterized queries & security
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_indicator_code ON indicator_snapshots(indicator_code);
CREATE INDEX IF NOT EXISTS idx_indicator_collected_at ON indicator_snapshots(collected_at DESC);
CREATE INDEX IF NOT EXISTS idx_market_ticker_symbol ON market_ticker(symbol, collected_at DESC);
