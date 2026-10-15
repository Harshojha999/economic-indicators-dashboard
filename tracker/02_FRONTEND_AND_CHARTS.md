# 🎨 Phase 3: Frontend Architecture & Exact Figma Replica

> **Target Timeline:** Hours 4.5 – 8.0 (3.5 hrs allocated)  
> **Status:** `[COMPLETED]`  
> **Marks Impact:** Design Fidelity (25) + Application Behaviour (20) = **45 Marks** (Highest weight!)

---

## 📐 Figma & Viewport Constraints
- **Required Evaluation Viewport:** `1214 × 2159` CSS pixels (Calibrated in `src/index.css`)
- **Visual Style:** Ultra-sleek Dark Cyber / Financial Theme
  - Background: Deep navy/black `#070d18` with glowing radial accents
  - Cards: Glassmorphic dark containers with cyan glow borders & hover effects
  - Accents: Vibrant Emerald Green (`#00e599`), Bright Cyan (`#00e5ff`), Amber Orange (`#f59e0b`), Ruby Red (`#ef4444`)
  - Typography: Crisp Inter and JetBrains Mono fonts

---

## 📋 Task Checklist

### 1. Project Scaffolding
- [x] Initialized Vite + React project (`frontend/`)
- [x] Installed production dependencies (`recharts`, `lucide-react`, `axios`)
- [x] Configured CSS variables, tokens, and animations matching Figma
- [x] Viewport container calibrated strictly for `1214 × 2159` CSS pixels

### 2. Header & Live Market Ticker
- [x] Top Header banner: "ECONOMIC INDICATOR" with glowing centerpiece
- [x] "LIVE" badge with animated pulsing red dot indicator
- [x] Live ticker component (`components/LiveTicker.jsx`):
  - [x] SENSEX `73,158.24 (+0.42%)` (Green)
  - [x] NIFTY BANK `46,919.80 (-0.12%)` (Red)
  - [x] NIFTY IT `37,842.15 (+1.10%)` (Cyan/Green)
  - [x] Dynamic tick updates & seamless scrolling

### 3. Six Indicator Panels (Exact Figma Layout)
- [x] **Card 1: GDP Growth - India vs World (YoY%)**
  - Flags / Badges: India flag, World globe
  - Key numbers: India `4.82% ▲ -0.2pp`, World `3.82% ▲ -0.81pp`
  - Dual bar chart (India vs World) 2021 – 2025 (`components/charts/GDPGrowthChart.jsx`)
- [x] **Card 2: Debt to GDP Ratio (IND)**
  - India (FY25) `3.82%`, Ind vs US `3.82%`
  - Smooth area curve line chart with cyan gradient fill (`components/charts/DebtToGDPChart.jsx`)
- [x] **Card 3: Imports, Exports & Trade Balance**
  - Exports `$382.9 B`, Imports `$382.9 B` with trade shipping badges
  - Grouped bar chart (Imports, Exports) + overlaid line chart for Trade Balance (`components/charts/TradeBalanceChart.jsx`)
- [x] **Card 4: GST Tax Collection (YoY%)**
  - GST Collections `3.82%`, Monthly Average `1.97`
  - Bar + Line average overlay (`components/charts/GSTCollectionChart.jsx`)
- [x] **Card 5: Inflation (IND)**
  - Inflation Rate `2.1% ▲ -0.2pp`, RBI Target `4%` badge
  - Line chart showing trend against the 4% target benchmark (`components/charts/InflationChart.jsx`)
- [x] **Card 6: Government Expenditure**
  - Total Expenditure `4.82%`, Capital Expenditure `3.82%`
  - Stacked bar chart: Revenue Expenditure vs Capital Expenditure (`components/charts/GovtExpenditureChart.jsx`)

### 4. Interactive & Usability Features
- [x] Dedicated Reviewer Sign-In modal with 1-click auto-fill (`evaluator@panel.com` / `Review2026!`)
- [x] Visible Source and "as of" date displayed on every card
- [x] Interactive tooltips on hover with formatted currencies and percentages
- [x] Live API health indicator and manual Sync trigger in top navigation
