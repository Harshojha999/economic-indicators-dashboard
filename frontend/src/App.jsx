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
import MetricBadge from './components/MetricBadge';



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
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const token = localStorage.getItem('economic_dashboard_token');
      const stored = localStorage.getItem('economic_dashboard_user');
      return (token && stored) ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Open modal on first visit if user is not already authenticated
  const [authModalOpen, setAuthModalOpen] = useState(() => {
    try {
      const token = localStorage.getItem('economic_dashboard_token');
      const stored = localStorage.getItem('economic_dashboard_user');
      return !(token && stored);
    } catch {
      return true;
    }
  });
  const [authModalMode, setAuthModalMode] = useState('login');

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

  const handleOpenAuth = (mode = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="viewport-container">
      {/* Top Navbar & Header Controls */}
      <Navbar 
        user={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onRefresh={loadData}
        isRefreshing={isLoading}
        serverStatus={serverHealthy}
      />

      {/* Live Market Ticker Banner matching Figma */}
      <LiveTicker tickerData={tickerData} />

      {/* Main 6 Indicators Grid (2 Columns × 3 Rows) calibrated for Figma Reference */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '14px'
      }}>
        {/* Panel 1: GDP Growth - India vs World */}
        <IndicatorCard
          title="GDP Growth - India vs World"
          titleHighlight="(YOY%)"
          primaryLabel={gdp.primary_metric_label || "India"}
          primaryValue={gdp.primary_metric_value || "4.82%"}
          primaryChange={gdp.primary_metric_change || "-0.2pp"}
          primaryIllustration={<MetricBadge type="india_flag" size={32} />}
          primaryLayout="inline"
          secondaryLabel={gdp.secondary_metric_label || "World"}
          secondaryValue={gdp.secondary_metric_value || "3.82%"}
          secondaryChange={gdp.secondary_metric_change || "-0.81pp"}
          secondaryIllustration={<MetricBadge type="world_globe" size={32} />}
          primaryLayout="inline"
          secondaryLayout="inline"
          source={gdp.source}
          observationPeriod={gdp.observation_period}
          legend={(
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '11px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: 8, height: 8, backgroundColor: '#00e5ff', borderRadius: 2 }} />
                <span style={{ color: '#94a3b8', fontWeight: 600 }}>India</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: 8, height: 8, backgroundColor: '#f59e0b', borderRadius: 2 }} />
                <span style={{ color: '#94a3b8', fontWeight: 600 }}>World</span>
              </div>
            </div>
          )}
        >
          <GDPGrowthChart data={gdp.chart_data} />
        </IndicatorCard>

        {/* Panel 2: Debt to GDP Ratio (IND) */}
        <IndicatorCard
          title="Debt to GDP Ratio"
          titleHighlight="(IND)"
          primaryLabel={debt.primary_metric_label || "India (FY25)"}
          primaryValue={debt.primary_metric_value || "3.82%"}
          primaryChange={debt.primary_metric_change || "-0.81pp"}
          primaryIllustration={<MetricBadge type="india_flag" size={32} />}
          primaryLayout="inline"
          secondaryLabel={debt.secondary_metric_label || "Ind vs US"}
          secondaryValue={debt.secondary_metric_value || "3.82%"}
          secondaryChange={debt.secondary_metric_change || "-0.81pp"}
          secondaryIllustration={<MetricBadge type="us_flag" size={32} />}
          secondaryLayout="inline"
          source={debt.source}
          observationPeriod={debt.observation_period}
        >
          <DebtToGDPChart data={debt.chart_data} />
        </IndicatorCard>

        {/* Panel 3: Imports, Exports & Trade Balance */}
        <IndicatorCard
          title="Imports, Exports & Trade Balance"
          primaryLabel={trade.primary_metric_label || "Exports"}
          primaryValue={trade.primary_metric_value || "$382.9 B"}
          primaryChange={trade.primary_metric_change || "-0.81pp"}
          primaryIllustration={<MetricBadge type="cargo_ship" size={98} />}
          secondaryLabel={trade.secondary_metric_label || "Imports"}
          secondaryValue={trade.secondary_metric_value || "$382.9 B"}
          secondaryChange={trade.secondary_metric_change || "-0.81pp"}
          secondaryIllustration={<MetricBadge type="port_containers" size={98} />}
          source={trade.source}
          observationPeriod={trade.observation_period}
          legend={(
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '11px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: 8, height: 8, backgroundColor: '#00e5ff', borderRadius: 2 }} />
                <span style={{ color: '#94a3b8', fontWeight: 600 }}>Imports</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: 8, height: 8, backgroundColor: '#f59e0b', borderRadius: 2 }} />
                <span style={{ color: '#94a3b8', fontWeight: 600 }}>Exports</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: 14, height: 2.5, backgroundColor: '#00e599' }} />
                <span style={{ color: '#00e599', fontWeight: 600 }}>Trade Balance</span>
              </div>
            </div>
          )}
        >
          <TradeBalanceChart data={trade.chart_data} />
        </IndicatorCard>

        {/* Panel 4: GST Tax Collection */}
        <IndicatorCard
          title="GST Tax Collection"
          titleHighlight="(YOY%)"
          primaryLabel={gst.primary_metric_label || "GST Collections"}
          primaryValue={gst.primary_metric_value || "3.82%"}
          primaryChange={gst.primary_metric_change || "-0.81pp"}
          primaryIllustration={<MetricBadge type="gst_coins" size={98} />}
          secondaryLabel={gst.secondary_metric_label || "Monthly Average"}
          secondaryValue={gst.secondary_metric_value ? (String(gst.secondary_metric_value).includes('%') ? gst.secondary_metric_value : `${gst.secondary_metric_value}%`) : "1.97%"}
          secondaryChange={gst.secondary_metric_change || "-0.81pp"}
          secondaryIllustration={<MetricBadge type="bank_vault" size={98} />}
          source={gst.source}
          observationPeriod={gst.observation_period}
          legend={(
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '11px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: 8, height: 8, backgroundColor: '#00e5ff', borderRadius: 2 }} />
                <span style={{ color: '#94a3b8', fontWeight: 600 }}>GST Collections</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: 14, height: 2.5, backgroundColor: '#facc15' }} />
                <span style={{ color: '#facc15', fontWeight: 600 }}>Monthly Avg</span>
              </div>
            </div>
          )}
        >
          <GSTCollectionChart data={gst.chart_data} />
        </IndicatorCard>

        {/* Panel 5: Inflation (IND) */}
        <IndicatorCard
          title="Inflation"
          titleHighlight="(IND)"
          primaryLabel={inflation.primary_metric_label || "Inflation Rate"}
          primaryValue={inflation.primary_metric_value || "2.1%"}
          primaryChange={inflation.primary_metric_change || "-0.2pp"}
          primaryIllustration={<MetricBadge type="shopping_cart" size={98} />}
          secondaryLabel={inflation.secondary_metric_label || "RBI Target"}
          secondaryValue={inflation.secondary_metric_value || "4%"}
          secondaryChange={inflation.secondary_metric_change || "-0.2pp"}
          secondaryIllustration={<MetricBadge type="target_bullseye" size={98} />}
          source={inflation.source}
          observationPeriod={inflation.observation_period}
        >
          <InflationChart data={inflation.chart_data} />
        </IndicatorCard>

        {/* Panel 6: Government Expenditure */}
        <IndicatorCard
          title="Government Expenditure"
          primaryLabel={govt.primary_metric_label || "Total Expenditure"}
          primaryValue={govt.primary_metric_value || "4.82%"}
          primaryChange={govt.primary_metric_change || "-0.2pp"}
          primaryIllustration={<MetricBadge type="govt_building" size={98} />}
          secondaryLabel={govt.secondary_metric_label || "Capital Expenditure"}
          secondaryValue={govt.secondary_metric_value || "3.82%"}
          secondaryChange={govt.secondary_metric_change || "-0.2pp"}
          secondaryIllustration={<MetricBadge type="capital_growth" size={98} />}
          source={govt.source}
          observationPeriod={govt.observation_period}
          legend={(
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '11px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: 8, height: 8, backgroundColor: '#0077b6', borderRadius: 2 }} />
                <span style={{ color: '#94a3b8', fontWeight: 600 }}>Revenue Expenditure</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: 8, height: 8, backgroundColor: '#f59e0b', borderRadius: 2 }} />
                <span style={{ color: '#f59e0b', fontWeight: 600 }}>Capital Expenditure</span>
              </div>
            </div>
          )}
        >
          <GovtExpenditureChart data={govt.chart_data} />
        </IndicatorCard>
      </div>

      {/* Reviewer / Evaluator Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </div>
  );
}
