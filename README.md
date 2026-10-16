# 📊 Economic Indicators Dashboard (India Macro Analysis)

A full-stack, real-time financial intelligence dashboard engineered to monitor key macroeconomic indicators for India and global benchmarks.

Designed strictly in accordance with the **Interview Round II — Full Stack Application Challenge** specifications and calibrated for the required **1214 × 2159 CSS pixels** evaluation viewport.

![Dashboard Preview](frontend/public/assets/dashboard_preview.png)

---

## 🚀 Live Evaluation Links & Endpoints (100% Free Cloud Deployment)

| Resource | Live Production URL | Description |
|---|---|---|
| **Frontend Application (Vercel)** | **[https://economic-indicators-dashboard-rho.vercel.app](https://economic-indicators-dashboard-rho.vercel.app)** | React SPA with Recharts & responsive viewport |
| **Backend API Documentation (Render)** | **[https://economic-indicators-dashboard.onrender.com/docs](https://economic-indicators-dashboard.onrender.com/docs)** | FastAPI interactive Swagger documentation |
| **Health Check Route (Render)** | **[https://economic-indicators-dashboard.onrender.com/api/health](https://economic-indicators-dashboard.onrender.com/api/health)** | Live system health & PostgreSQL connection |

---

## 🔑 Evaluation Test Credentials

The application provides dedicated evaluation credentials pre-configured for the interview review panel:

- **Email:** `evaluator@panel.com`
- **Password:** `Review2026!`
- **Role:** Evaluation Panelist (Full Read & Sync Access)

> **Quick Access:** The frontend modal includes an **"Auto-fill Evaluation Credentials"** button for instant one-click review.

---

## 🏛️ System Architecture

```mermaid
graph TB
    subgraph "Frontend Layer (Vercel: React 18 + Vite)"
        UI[React Single Page Application]
        TC[Live Market Ticker Component]
        IC[6 Economic Indicator Cards]
        RC[Recharts Visualizations]
        AM[JWT Auth Modal & Interceptor]
        UI --> TC
        UI --> IC
        IC --> RC
        UI --> AM
    end

    subgraph "Backend API (Render: FastAPI + Python 3.11)"
        API[FastAPI Gateway]
        AUTH[JWT Authentication Service]
        DASH[Dashboard Query Service]
        SCHED[APScheduler Background Worker]
        COLL[NSE & Macro Data Collectors]
        HEALTH[Health Check Endpoint]
        API --> AUTH
        API --> DASH
        API --> HEALTH
        SCHED --> COLL
    end

    subgraph "Database Layer (Supabase: PostgreSQL Direct Parameterized SQL)"
        DB[(PostgreSQL Database)]
        TBL_U[users Table]
        TBL_I[indicator_snapshots Table]
        TBL_M[market_ticker Table]
        DB --> TBL_U
        DB --> TBL_I
        DB --> TBL_M
    end

    UI -->|HTTPS REST + JWT Bearer| API
    DASH -->|Direct Parameterized SQL Pool + SSL| DB
    AUTH -->|Direct Parameterized SQL Pool + SSL| DB
    COLL -->|Scheduled Ingestion| DB
```

---

## 🛡️ Security & Database Access Compliance

In strict compliance with the assignment rubrics:

1. **Direct Parameterized SQL (No ORM):**
   - All database queries are executed via direct parameterized SQL statements (`$1, $2, ...` through `asyncpg`), guaranteeing absolute immunity against SQL injection vulnerabilities.
   - String concatenation of unvalidated user input into SQL is strictly forbidden and avoided.
2. **Network Security Boundary:**
   - The database is not exposed to the public internet without authentication. Access is restricted to authorized backend worker connections utilizing SSL encryption (`ssl=require`).
3. **CORS Enforcement:**
   - FastAPI middleware restricts cross-origin resource sharing specifically to the verified frontend domain (`https://economic-indicators-dashboard-rho.vercel.app`).
4. **Environment Isolation:**
   - Zero credentials, secrets, or database URLs exist in client-side browser code.

---

## 📈 Covered Indicators & Official Sources

| # | Indicator Panel | Primary Source | Secondary / Fallback Source | Observation Period |
|---|---|---|---|---|
| **0** | **Live Market Ticker** | National Stock Exchange (NSE India) | Real-time upstream / calibrated feed | Real-time |
| **1** | **GDP Growth — India vs World (YoY%)** | National Statistical Office (NSO / MoSPI) | World Bank Open Data | Q3 FY 2024-25 |
| **2** | **Debt to GDP Ratio (IND)** | Reserve Bank of India (RBI Handbook of Statistics) | IMF World Economic Outlook | FY 2024-25 |
| **3** | **Imports, Exports & Trade Balance** | Directorate General of Commercial Intelligence and Statistics (DGCIS) | Ministry of Commerce & Industry | January 2025 |
| **4** | **GST Tax Collection (YoY%)** | GST Council / Ministry of Finance (PIB) | MoSPI | February 2025 |
| **5** | **Inflation (IND) vs RBI Target** | Consumer Price Index (CPI), MoSPI / RBI | Reserve Bank of India | January 2025 |
| **6** | **Government Expenditure** | Controller General of Accounts (CGA) | Union Budget (Receipts & Exp.) | FY 2024-25 RE |

---

## 🔄 State Handling & Resilience Strategy

The dashboard explicitly implements all 4 states required by the assignment:

1. **Active / Success State:** Live visualization with interactive tooltips, data points, and metadata tags showing the official source and "as of" observation date.
2. **Loading State:** Height-stabilized skeleton containers (`460px`) with animated cyan spinners to eliminate layout shifts (CLS = 0).
3. **Stale State:** If external network refreshes encounter upstream rate-limiting or downtime, retained snapshot data is served and flagged with an amber `⚠️ Stale` badge.
4. **Empty / Missing State:** Missing values are represented as `—` rather than displaying unverified calculations or crashing the visualization.

---

## 💻 Local Setup & Execution Instructions

### Prerequisites
- Python 3.11+
- Node.js 18+ & npm
- PostgreSQL 14+

### 1. Backend Setup
```bash
cd backend
python -m venv .venv
# Windows:
.\.venv\Scripts\activate
# Linux/macOS:
# source .venv/bin/activate

pip install -r requirements.txt
cp .env.example .env

# Run database creation (if using local PostgreSQL)
python create_db.py [your_postgres_password]

# Start FastAPI server
uvicorn app.main:app --reload --port 8000
```
API will be live at `http://localhost:8000` with Swagger docs at `http://localhost:8000/docs`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Dashboard will be available at `http://localhost:5173` (or `http://localhost:5174`).

---

## ☁️ 100% Free Cloud Deployment Overview

| Component | Platform | Status |
|---|---|---|
| **Database** | **Supabase** (PostgreSQL) | ✅ Active & Connected |
| **Backend API** | **Render.com** (Web Service) | ✅ Active & Healthy |
| **Frontend** | **Vercel** | ✅ Active & Deployed |

---

## 🤖 AI Usage Transparency Statement (Rubric V)

In compliance with Section V of the assessment guidelines:
- **Tasks Assisted by AI:** Rapid boilerplate scaffolding, design token calibration matching Figma frame hex values, and automated test script synthesis.
- **Human Engineering & Governance:** Architecture design, direct parameterized SQL injection prevention, JWT session lifecycles, fault-tolerant fallback states, and security boundaries were architected, reviewed, and verified manually.
