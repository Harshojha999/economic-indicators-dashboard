import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LiveTicker from './components/LiveTicker';
import IndicatorCard from './components/IndicatorCard';
import AuthModal from './components/AuthModal';

// Dedicated Charts
import GDPGrowthChart from './components/charts/GDPGrowthChart';
import DebtToGDPChart from './components/charts/DebtToGDPChart';
import TradeBalanceChart from './components/charts/TradeBalanceChart';
import GSTCollectionChart from './components/charts/GSTCollectionChart';
import InflationChart from './components/charts/InflationChart';
import GovtExpenditureChart from './components/charts/GovtExpenditureChart';

// Icons & Visual Badges
import { 
  Globe, 
  TrendingUp, 
  Ship, 
  Coins, 
  Building2, 
  Landmark, 
  Wallet, 
  BarChart3,
  Scale
} from 'lucide-react';

import { 
  fetchTickerData, 
  fetchIndicatorsData, 
  loginUser, 
  registerUser, 
  checkHealth,
  FALLBACK_INDICATORS 
} from './services/api';

export default function App() {
  const [tickerData, setTickerData] = useState([]);
  const [indicators, setIndicators] = useState(FALLBACK_INDICATORS);
  const [isStale, setIsStale] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverHealthy, setServerHealthy] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('economic_dashboard_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Load initial data
  const loadData = async () => {
    setIsLoading(true);
    const minWait = new Promise(resolve => setTimeout(resolve, 600));
    try {
      const isHealthy = await checkHealth();
      setServerHealthy(isHealthy);

      const ticks = await fetchTickerData();
      setTickerData(ticks);

      const indicatorRes = await fetchIndicatorsData();
      if (indicatorRes?.data) {
        setIndicators(indicatorRes.data);
        setIsStale(indicatorRes.isStale);
      }
      await minWait;
    } catch (err) {
      console.warn('Network sync notice:', err);
      setIsStale(true);
      await minWait;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // Periodic refresh every 30 seconds for live feel
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (email, password) => {
    const res = await loginUser(email, password);
    setCurrentUser(res.user);
    loadData();
  };

  const handleRegister = async (email, password, fullName) => {
    const res = await registerUser(email, password, fullName);
    setCurrentUser(res.user);
    loadData();
  };

  const handleLogout = () => {
    localStorage.removeItem('economic_dashboard_token');
    localStorage.removeItem('economic_dashboard_user');
    setCurrentUser(null);
  };

  // Helper to find specific indicator dataset from list
  const getIndicator = (code) => {
    return indicators.find(i => i.indicator_code === code) || {};
  };

  const gdp = getIndicator('gdp_growth');
  const debt = getIndicator('debt_to_gdp');
  const trade = getIndicator('trade_balance');
  const gst = getIndicator('gst_collection');
  const inflation = getIndicator('inflation_cpi');
  const govt = getIndicator('govt_expenditure');

  return (
    <div className="viewport-container">
      {/* Top Navbar & Header Controls */}
      <Navbar 
        user={currentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        onRefresh={loadData}
        isRefreshing={isLoading}
        serverStatus={serverHealthy}
      />

      {/* Live Market Ticker Banner matching Figma */}
      <LiveTicker tickerData={tickerData} />

      {/* Main 6 Indicators Grid (2 Columns × 3 Rows) calibrated for 1214 × 2159 viewport */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px',
        flex: 1
      }}>
        {/* Panel 1: GDP Growth - India vs World */}
        <IndicatorCard
          title="GDP Growth - India vs World (YOY%)"
          primaryLabel={gdp.primary_metric_label || "India"}
          primaryValue={gdp.primary_metric_value || "4.82%"}
          primaryChange={gdp.primary_metric_change || "-0.2pp"}
          primaryIcon={<span style={{ fontSize: 14 }}>🇮🇳</span>}
          secondaryLabel={gdp.secondary_metric_label || "World"}
          secondaryValue={gdp.secondary_metric_value || "3.82%"}
          secondaryChange={gdp.secondary_metric_change || "-0.81pp"}
          secondaryIcon={<Globe size={14} style={{ color: '#38bdf8' }} />}
          source={gdp.source}
          observationPeriod={gdp.observation_period}
          isStale={isStale}
        >
          <GDPGrowthChart data={gdp.chart_data} />
        </IndicatorCard>

        {/* Panel 2: Debt to GDP Ratio (IND) */}
        <IndicatorCard
          title="Debt to GDP Ratio (IND)"
          primaryLabel={debt.primary_metric_label || "India (FY25)"}
          primaryValue={debt.primary_metric_value || "3.82%"}
          primaryChange={debt.primary_metric_change || "-0.81pp"}
          primaryIcon={<span style={{ fontSize: 14 }}>🇮🇳</span>}
          secondaryLabel={debt.secondary_metric_label || "Ind vs US"}
          secondaryValue={debt.secondary_metric_value || "3.82%"}
          secondaryChange={debt.secondary_metric_change || "-0.81pp"}
          secondaryIcon={<span style={{ fontSize: 14 }}>🇺🇸</span>}
          source={debt.source}
          observationPeriod={debt.observation_period}
          isStale={isStale}
        >
          <DebtToGDPChart data={debt.chart_data} />
        </IndicatorCard>

        {/* Panel 3: Imports, Exports & Trade Balance */}
        <IndicatorCard
          title="Imports, Exports & Trade Balance"
          primaryLabel={trade.primary_metric_label || "Exports"}
          primaryValue={trade.primary_metric_value || "$382.9 B"}
          primaryChange={trade.primary_metric_change || "-0.81pp"}
          primaryIcon={<Ship size={14} style={{ color: '#f59e0b' }} />}
          secondaryLabel={trade.secondary_metric_label || "Imports"}
          secondaryValue={trade.secondary_metric_value || "$382.9 B"}
          secondaryChange={trade.secondary_metric_change || "-0.81pp"}
          secondaryIcon={<Scale size={14} style={{ color: '#00e5ff' }} />}
          source={trade.source}
          observationPeriod={trade.observation_period}
          isStale={isStale}
        >
          <TradeBalanceChart data={trade.chart_data} />
        </IndicatorCard>

        {/* Panel 4: GST Tax Collection */}
        <IndicatorCard
          title="GST Tax Collection (YOY%)"
          primaryLabel={gst.primary_metric_label || "GST Collections"}
          primaryValue={gst.primary_metric_value || "3.82%"}
          primaryChange={gst.primary_metric_change || "-0.81pp"}
          primaryIcon={<Coins size={14} style={{ color: '#eab308' }} />}
          secondaryLabel={gst.secondary_metric_label || "Monthly Average"}
          secondaryValue={gst.secondary_metric_value || "1.97"}
          secondaryChange={gst.secondary_metric_change || "-0.81pp"}
          secondaryIcon={<BarChart3 size={14} style={{ color: '#38bdf8' }} />}
          source={gst.source}
          observationPeriod={gst.observation_period}
          isStale={isStale}
        >
          <GSTCollectionChart data={gst.chart_data} />
        </IndicatorCard>

        {/* Panel 5: Inflation (IND) */}
        <IndicatorCard
          title="Inflation (IND)"
          primaryLabel={inflation.primary_metric_label || "Inflation Rate"}
          primaryValue={inflation.primary_metric_value || "2.1%"}
          primaryChange={inflation.primary_metric_change || "-0.2pp"}
          primaryIcon={<TrendingUp size={14} style={{ color: '#00e5ff' }} />}
          secondaryLabel={inflation.secondary_metric_label || "RBI Target"}
          secondaryValue={inflation.secondary_metric_value || "4%"}
          secondaryChange={inflation.secondary_metric_change || "-0.2pp"}
          secondaryIcon={<Landmark size={14} style={{ color: '#f59e0b' }} />}
          source={inflation.source}
          observationPeriod={inflation.observation_period}
          isStale={isStale}
        >
          <InflationChart data={inflation.chart_data} />
        </IndicatorCard>

        {/* Panel 6: Government Expenditure */}
        <IndicatorCard
          title="Government Expenditure"
          primaryLabel={govt.primary_metric_label || "Total Expenditure"}
          primaryValue={govt.primary_metric_value || "4.82%"}
          primaryChange={govt.primary_metric_change || "-0.2pp"}
          primaryIcon={<Building2 size={14} style={{ color: '#0077b6' }} />}
          secondaryLabel={govt.secondary_metric_label || "Capital Expenditure"}
          secondaryValue={govt.secondary_metric_value || "3.82%"}
          secondaryChange={govt.secondary_metric_change || "-0.2pp"}
          secondaryIcon={<Wallet size={14} style={{ color: '#f59e0b' }} />}
          source={govt.source}
          observationPeriod={govt.observation_period}
          isStale={isStale}
        >
          <GovtExpenditureChart data={govt.chart_data} />
        </IndicatorCard>
      </div>

      {/* Reviewer / Evaluator Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </div>
  );
}
