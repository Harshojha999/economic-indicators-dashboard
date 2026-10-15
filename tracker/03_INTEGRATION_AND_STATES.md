# 🔄 Phase 4: Integration, State Handling & Edge Cases

> **Target Timeline:** Hours 8.0 – 9.5 (1.5 hrs allocated)  
> **Status:** `[COMPLETED]`  
> **Marks Impact:** Application Behaviour (20) + Performance and Code Quality (15)

---

## 📋 Task Checklist

### 1. API Client & Authentication Binding
- [x] Centralized Axios instance with configurable `VITE_API_BASE_URL` (`services/api.js`)
- [x] Automatic JWT request interceptor (`Authorization: Bearer <token>`)
- [x] Evaluation reviewer auto-fill credentials implemented (`evaluator@panel.com` / `Review2026!`)
- [x] Dynamic backend health check detection (`/api/health`)

### 2. Required 4 State Handlers (Per Panel Rubric)
The assignment explicitly grades the following 4 states:
- [x] **1. Loading State:**
  - Spinner and skeleton loader in `IndicatorCard.jsx`
  - Maintains stable height (460px) to prevent layout shifts
- [x] **2. Normal / Active State:**
  - Full data rendering for all 6 panels
  - Visible Source label (e.g. `Source: Ministry of Commerce / RBI / World Bank`)
  - Visible "As of" date badge (e.g. `As of: Q3 FY 2024-25`)
- [x] **3. Stale State:**
  - If upstream fails or connection drops, cached snapshot is retained
  - Explicit warning badge displayed: `⚠️ Stale`
- [x] **4. Empty / Missing State:**
  - Display `—` for missing data points rather than inventing figures or breaking layout
  - Clean fallback handling in delta indicators and metric cards

### 3. Viewport & Stability Testing
- [x] Calibrated for viewport `1214 × 2159` CSS pixels in `index.css`:
  - No accidental horizontal scrollbars
  - Stable cards without overflowing text
  - Clean vertical flow for portrait evaluation
