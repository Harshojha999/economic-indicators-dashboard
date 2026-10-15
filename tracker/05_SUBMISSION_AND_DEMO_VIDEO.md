# 📝 Phase 6: Submission Deliverables & Demo Video Script

> **Target Timeline:** Hours 11.0 – 12.0 (1.0 hr allocated)  
> **Status:** `[COMPLETED & DELIVERABLES READY]`  
> **Marks Impact:** Final Assessment & Defense (Required for acceptance)

---

## 📋 Required Deliverables Checklist (From Assignment Docx)

- [x] **1. Public Source Code Repository:**
  - Complete `frontend/` (React + Vite + Recharts)
  - Complete `backend/` (FastAPI + AsyncPG + APScheduler)
  - Database schema & migrations (`backend/app/migrations/001_initial.sql`)
  - Master [README.md](file:///c:/Users/Harsh/Desktop/Assignment/README.md) with full documentation
  - GitHub Repo: [https://github.com/Harshojha999/economic-indicators-dashboard](https://github.com/Harshojha999/economic-indicators-dashboard)
- [x] **2. Live Production URLs:**
  - Live Frontend URL (Vercel): [https://economic-indicators-dashboard-rho.vercel.app](https://economic-indicators-dashboard-rho.vercel.app)
  - Live API URL / Swagger Docs (Render): [https://economic-indicators-dashboard.onrender.com/docs](https://economic-indicators-dashboard.onrender.com/docs)
  - Live Health-Check URL (Render): [https://economic-indicators-dashboard.onrender.com/api/health](https://economic-indicators-dashboard.onrender.com/api/health)
- [x] **3. Evaluation Test Credentials:**
  - Email: `evaluator@panel.com`
  - Password: `Review2026!`
  - Auto-fill helper implemented directly in the frontend modal
- [x] **4. Assumptions, Fallback Sources & Limitations:**
  - Documented in master `README.md` and `tracker/03_INTEGRATION_AND_STATES.md`
- [ ] **5. Screen Recording Video (Demonstration & Defense):**
  - Use the speaking script below to record your 3–4 minute walkthrough

---

## 🎙️ Demo Video Speaking Script & Talking Points

Use this 5-point structure for your video (3–5 minutes):

1. **Introduction & Live Walkthrough (1 min):**
   - Open live Vercel URL at `1214 × 2159` CSS viewport.
   - Show login with JWT authentication.
   - Showcase the Live Market Ticker (SENSEX, NIFTY BANK, NIFTY IT).
   - Walk through all 6 indicator panels (GDP Growth, Debt to GDP, Trade Balance, GST, Inflation, Govt Expenditure) and point out the "as of" dates and data sources.

2. **System Architecture (1 min):**
   - Explain how Frontend (React/Vite), Backend (FastAPI), and Database (Supabase PostgreSQL via parameterized queries) communicate.
   - Mention why ORM was intentionally omitted in favor of direct parameterized queries for maximum SQL injection safety and performance.
   - Explain background data scheduler and caching mechanism to respect upstream rate limits.

3. **Key Challenges & Solutions (45 sec):**
   - Viewport constraint: Calibrating exact card dimensions and chart typography for `1214 × 2159` px portrait layout.
   - Resiliency: Implementing Stale, Error, and Loading fallback states so that if NSE or an external API experiences downtime, the UI remains rock solid and indicates "Stale" or "—" rather than failing.

4. **Security & Deployment Architecture (45 sec):**
   - Explain separate deployments: Vercel (Frontend) and Render (Backend).
   - Show that CORS is strictly locked to the frontend domain.
   - Confirm credentials and DB URL are kept purely in backend server environment variables.

5. **AI Usage Defense (Mandatory from docx) (30 sec):**
   - Explain that AI tools were used for rapid boilerplate setup and design token mapping, while architectural decisions, SQL parameterization, authentication security, and edge-case validation were thoroughly verified and controlled by you.
