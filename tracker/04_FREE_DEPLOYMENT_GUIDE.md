# 🚀 Phase 5: 100% Free Cloud Deployment Guide

> **Target Timeline:** Hours 9.5 – 11.0 (1.5 hrs allocated)  
> **Status:** `[NOT STARTED]`  
> **Marks Impact:** Deployment and Documentation (10) + Security & DB Access (15) = **25 Marks**

---

## ☁️ Architecture for Free Deployment

```
[User Browser]
       │
       ▼ (HTTPS)
[Vercel: React Frontend]
       │
       ▼ (HTTPS REST + JWT)
[Render: FastAPI Backend Service]
       │
       ▼ (Direct Parameterized SQL over SSL)
[Supabase: Managed PostgreSQL Database]
```

---

## 📋 Task Checklist

### 1. Database Deployment (Supabase PostgreSQL - 100% Free)
- [ ] Create free project on [Supabase](https://supabase.com)
- [ ] Get Connection String (`postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`)
- [ ] Execute initial schema migration (`001_initial.sql`) via SQL Editor
- [ ] Verify private credentials & SSL mode (`sslmode=require`)

### 2. Backend Deployment (Render.com - 100% Free)
- [ ] Create Web Service on [Render](https://render.com) from GitHub repo
- [ ] Set Root Directory: `backend`
- [ ] Build Command: `pip install -r requirements.txt`
- [ ] Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- [ ] Add Environment Variables:
  - `DATABASE_URL=postgresql://...`
  - `JWT_SECRET=super_secret_production_key...`
  - `CORS_ORIGINS=https://your-frontend.vercel.app`
  - `ENVIRONMENT=production`
- [ ] Verify live health check URL: `https://<backend-app>.onrender.com/api/health`

### 3. Frontend Deployment (Vercel - 100% Free)
- [ ] Import repo on [Vercel](https://vercel.com)
- [ ] Set Root Directory: `frontend`
- [ ] Framework Preset: `Vite`
- [ ] Add Environment Variable:
  - `VITE_API_BASE_URL=https://<backend-app>.onrender.com`
- [ ] Deploy & verify public HTTPS URL
- [ ] Test end-to-end authentication and chart rendering
