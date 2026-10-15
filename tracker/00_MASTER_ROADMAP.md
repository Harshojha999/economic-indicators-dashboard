# ⏱️ 12-Hour Master Roadmap & Progress Tracker

> **Project Goal:** Build, test, document, and deploy a production-grade Full Stack Economic Indicators Dashboard matching Figma design (1214 × 2159 CSS pixels), with FastAPI, PostgreSQL, React, JWT Auth, and 100% Free Cloud Deployment.
> **Timeline:** 12 Hours total
> **Evaluation Rubric Target:** 100 / 100 marks

---

## 📊 Live Progress Overview

| Phase | Description | Estimated Time | Status | Target Completion |
|---|---|---|---|---|
| **Phase 0** | Workspace & Tracker Setup | 0.5 hr | `[COMPLETED]` | Hour 0.5 |
| **Phase 1** | Database & FastAPI Backend + JWT Auth | 2.5 hrs | `[COMPLETED & VERIFIED]` | Hour 3.0 |
| **Phase 2** | Data Collectors (NSE + Macro Indicators) + Scheduler | 1.5 hrs | `[COMPLETED & VERIFIED]` | Hour 4.5 |
| **Phase 3** | Frontend (Vite + React) & Exact Figma UI Replica | 3.5 hrs | `[COMPLETED & VERIFIED]` | Hour 8.0 |
| **Phase 4** | Integration, State Handling (Loading, Error, Stale) | 1.5 hrs | `[COMPLETED & VERIFIED]` | Hour 9.5 |
| **Phase 5** | Free Cloud Deployment (Vercel + Render + Supabase) | 1.5 hrs | `[READY FOR PUSH]` | Hour 11.0 |
| **Phase 6** | README, Submission Docs & Video Walkthrough Guide | 1.0 hr | `[COMPLETED]` | Hour 12.0 |

---

## 🎯 12-Hour Detailed Breakdown

### ⏰ Hour 0.0 – 0.5: Phase 0 — Blueprint & Architecture Setup
- [x] Analyze challenge requirements & rubrics from docx
- [x] Extract reference image and design specifications
- [x] Verify toolchain (`Python 3.11`, `Node 24`, `npm 11`, `git`)
- [x] Initialize `tracker/` directory with tracking files
- [x] Initialize Git repository with `.gitignore`

### ⏰ Hour 0.5 – 3.0: Phase 1 — Database & FastAPI Backend
- [x] Database Schema: Users, Indicator Snapshots, Market Ticker (`SQL` parameterized queries)
- [x] FastAPI project scaffolding (`backend/`)
- [x] JWT Authentication (`/api/auth/register`, `/api/auth/login`, `/api/auth/me`)
- [x] Password hashing with bcrypt
- [x] Direct parameterized SQL queries (no ORM, strict compliance)
- [x] Health Check endpoint (`/api/health` - Verified Healthy)

### ⏰ Hour 3.0 – 4.5: Phase 2 — Data Ingestion & Background Scheduler
- [x] NSE scraper & realistic fallback adapter for Live Market Ticker (SENSEX, NIFTY BANK, NIFTY IT)
- [x] Indicators seed data + public API collectors for all 6 panels:
  - 1. GDP Growth (India vs World)
  - 2. Debt to GDP Ratio (IND)
  - 3. Imports, Exports & Trade Balance
  - 4. GST Tax Collection
  - 5. Inflation Rate vs RBI Target
  - 6. Government Expenditure (Total vs Capital)
- [x] In-memory caching & rate-limit handling
- [x] APScheduler background loop for periodic refresh

### ⏰ Hour 4.5 – 8.0: Phase 3 — React Frontend (Figma Faithful at 1214 × 2159)
- [x] Vite + React app setup (`frontend/`)
- [x] Design System & Global Styles:
  - Exact dark cyan/blue gradient theme
  - Glowing borders, badge styles, typography
  - Viewport lock & scaling for `1214 × 2159`
- [x] Top Live Market Ticker with real-time green/red delta badges
- [x] Indicator Card 1: GDP Growth (Grouped Bar Chart - India vs World)
- [x] Indicator Card 2: Debt to GDP (Smooth Area/Line Chart + Milestone Points)
- [x] Indicator Card 3: Trade Balance (Multi-series Bar + Line)
- [x] Indicator Card 4: GST Collection (Bar + Line Average overlay)
- [x] Indicator Card 5: Inflation Rate (Area/Line chart with RBI 4% benchmark)
- [x] Indicator Card 6: Govt Expenditure (Stacked / Grouped Bar Chart)
- [x] Clean Login / Register Modal with 1-click test reviewer credentials

### ⏰ Hour 8.0 – 9.5: Phase 4 — Integration, Polish & Edge Cases
- [x] Connect React Axios client with FastAPI backend (Verified Live)
- [x] JWT interceptor with automatic token storage and authorization header (Verified Live)
- [x] Implement all 4 required states per panel:
  - Loading State (skeleton/spinners)
  - Success / Live State (showing "as of" date & source)
  - Stale State (labeled "Stale" when refresh fails)
  - Error / Missing State (shows "—" without crashing)
- [x] Responsive & Viewport verification at `1214 × 2159` CSS pixels

### ⏰ Hour 9.5 – 11.0: Phase 5 — 100% Free Cloud Deployment
- [ ] Setup free PostgreSQL on **Supabase** (or Neon)
- [ ] Deploy FastAPI to **Render.com** (Free Web Service)
  - Configure CORS for frontend domain only
  - Set production environment variables
- [ ] Deploy React app to **Vercel** (Free Tier)
  - Configure `VITE_API_BASE_URL` pointing to Render
- [ ] Test end-to-end live flow on production URLs
- [ ] Verify SSL (HTTPS) and API Health Check

### ⏰ Hour 11.0 – 12.0: Phase 6 — Documentation & Evaluation Prep
- [x] Master `README.md` with:
  - Live URLs (Frontend, API docs, Health-check)
  - Demo Evaluation credentials
  - Architecture breakdown & DB schema
  - Data sources and assumptions
  - Local setup instructions
- [x] Screen recording script & key talking points for the video challenge

---

## 📁 Tracking Files Directory
- [tracker/01_BACKEND_AND_DATABASE.md](file:///c:/Users/Harsh/Desktop/Assignment/tracker/01_BACKEND_AND_DATABASE.md)
- [tracker/02_FRONTEND_AND_CHARTS.md](file:///c:/Users/Harsh/Desktop/Assignment/tracker/02_FRONTEND_AND_CHARTS.md)
- [tracker/03_INTEGRATION_AND_STATES.md](file:///c:/Users/Harsh/Desktop/Assignment/tracker/03_INTEGRATION_AND_STATES.md)
- [tracker/04_FREE_DEPLOYMENT_GUIDE.md](file:///c:/Users/Harsh/Desktop/Assignment/tracker/04_FREE_DEPLOYMENT_GUIDE.md)
- [tracker/05_SUBMISSION_AND_DEMO_VIDEO.md](file:///c:/Users/Harsh/Desktop/Assignment/tracker/05_SUBMISSION_AND_DEMO_VIDEO.md)
