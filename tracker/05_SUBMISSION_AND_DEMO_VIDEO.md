# 📝 Phase 6: Submission Deliverables & Demo Video Script

> **Target Timeline:** Hours 11.0 – 12.0 (1.0 hr allocated)  
> **Status:** `[NOT STARTED]`  
> **Marks Impact:** Final Assessment & Defense (Required for acceptance)

---

## 📋 Required Deliverables Checklist (From Assignment Docx)

- [ ] **1. Public Source Code Repository:**
  - Complete `frontend/` (React)
  - Complete `backend/` (FastAPI)
  - Database schema & migrations (`backend/app/migrations/`)
  - Master `README.md`
- [ ] **2. Live URLs:**
  - Live Frontend URL (Vercel)
  - Live API URL / Swagger Docs (`https://.../docs`)
  - Live Health-Check URL (`https://.../api/health`)
- [ ] **3. Evaluation Test Credentials:**
  - Dedicated reviewer account credentials (e.g. `evaluator@panel.com` / `Review2026!`)
- [ ] **4. Assumptions, Fallback Sources & Limitations:**
  - Clearly identified data sources & fallback policies
- [ ] **5. Screen Recording Video (Demonstration & Defense):**
  - Walkthrough of the live application
  - Explanation of technical & design choices

---

## 🎙️ Demo Video Speaking Script & Talking Points

Use this 5-point structure for your video (3–5 minutes):

1. **Introduction & Live Walkthrough (1 min):**
   - Open live Vercel URL at `1214 × 2159` CSS viewport.
   - Show login with JWT authentication.
   - Showcase the Live Market Ticker (SENSEX, NIFTY BANK, NIFTY IT).
   - Walk through all 6 indicator panels (GDP Growth, Debt to GDP, Trade Balance, GST, Inflation, Govt Expenditure) and point out the "as of" dates and data sources.

2. **System Architecture (1 min):**
   - Explain how Frontend (React/Vite), Backend (FastAPI), and Database (PostgreSQL via parameterized queries) communicate.
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
