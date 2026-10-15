# ⚙️ Phase 1 & 2: Backend Architecture, Database & Collectors

> **Target Timeline:** Hours 0.5 – 4.5 (4.0 hrs allocated)  
> **Status:** `[COMPLETED & VERIFIED IN PRODUCTION]`  
> **Marks Impact:** Backend & Data Handling (15) + Security & DB Access (15) = **30 Marks**

---

## 📋 Task Checklist

### 1. Database & Security Setup
- [x] Direct Parameterized SQL implementation (Strictly NO ORM concatenation) — `app/database.py`
- [x] Schema definition:
  - [x] `users` table (id, email, password_hash, full_name, is_active, created_at)
  - [x] `indicator_snapshots` table (id, indicator_code, chart_data jsonb, source, observation_period, is_valid, is_stale)
  - [x] `market_ticker` table (id, symbol, price, change_value, change_percent, collected_at)
- [x] Database migration & initial data seeder:
  - [x] `app/migrations/001_initial.sql`
  - [x] Automatic database seeding for all 6 Figma baseline indicators in `database.py`
  - [x] Connection pooling with `asyncpg` + parameterized `$1, $2` queries
- [x] Database creation script: `backend/create_db.py`

### 2. FastAPI Core Scaffolding
- [x] Project structure (`backend/app/...`)
- [x] CORS middleware configuration (`app/main.py`)
- [x] Config loader (`app/config.py` with `.env` support)
- [x] Health-check endpoint: `GET /api/health` with DB connection status & timestamp

### 3. Authentication System (JWT)
- [x] Password hashing using `passlib[bcrypt]` (`app/auth/jwt_handler.py`)
- [x] JWT token issuance & expiration (`app/auth/jwt_handler.py`)
- [x] Bearer token dependency injection (`app/auth/dependencies.py`)
- [x] Endpoints (`app/auth/routes.py`):
  - [x] `POST /api/auth/register` (Registers new user securely)
  - [x] `POST /api/auth/login` (Returns JWT access token)
  - [x] `GET /api/auth/me` (Protected profile route)
  - [x] Demo evaluation credentials built-in (`evaluator@panel.com` / `Review2026!`)

### 4. Data Ingestion & Live Scraper
- [x] Upstream NSE collector adapter (`app/collectors/nse_collector.py`):
  - [x] Fetches SENSEX, NIFTY BANK, NIFTY IT indices
  - [x] 4s timeout handling & graceful rate-limiting fallback with realistic calibration
- [x] 6 Required Economic Indicator Panels:
  - [x] 1. GDP Growth (India vs World)
  - [x] 2. Debt to GDP Ratio (IND)
  - [x] 3. Imports, Exports & Trade Balance
  - [x] 4. GST Tax Collection (Monthly average + YoY)
  - [x] 5. Inflation Rate (CPI) vs RBI Target (4.0%)
  - [x] 6. Government Expenditure (Total vs Capital)
- [x] Periodic background runner via APScheduler (`app/collectors/scheduler.py`)

### 5. Dashboard API Endpoints
- [x] `GET /api/dashboard/ticker` (Market indices with price & % changes)
- [x] `GET /api/dashboard/indicators` (All 6 indicator panels with charts, sources, and periods)
- [x] `GET /api/dashboard/indicator/{code}` (Individual indicator panel)
