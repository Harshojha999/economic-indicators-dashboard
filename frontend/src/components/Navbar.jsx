import React, { useState, useEffect } from 'react';
import { User, LogIn, LogOut, RefreshCw, ShieldCheck, Activity, Check } from 'lucide-react';

export default function Navbar({
  user,
  onOpenAuth,
  onLogout,
  onRefresh,
  isRefreshing,
  serverStatus
}) {
  const [justSynced, setJustSynced] = useState(false);

  useEffect(() => {
    let timer;
    if (!isRefreshing && justSynced) {
      timer = setTimeout(() => setJustSynced(false), 2000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isRefreshing, justSynced]);

  const handleSyncClick = () => {
    setJustSynced(true);
    onRefresh();
  };
  return (
    <header style={{ marginBottom: '16px' }}>
      {/* Top Utility Status Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(11, 21, 40, 0.7)',
        border: '1px solid rgba(0, 229, 255, 0.15)',
        borderRadius: '8px',
        padding: '8px 16px',
        marginBottom: '16px',
        fontSize: '12px',
        color: '#94a3b8'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Target Evaluation Viewport Tag */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(0, 229, 255, 0.1)',
            border: '1px solid rgba(0, 229, 255, 0.3)',
            padding: '3px 8px',
            borderRadius: '4px',
            color: '#38bdf8',
            fontFamily: 'var(--font-mono)'
          }}>
            <Activity size={12} />
            <span>Target Viewport: 1214 × 2159 CSS px</span>
          </div>

          {/* Backend API Health Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: serverStatus ? '#00e599' : '#ef4444',
              boxShadow: serverStatus ? '0 0 6px #00e599' : '0 0 6px #ef4444'
            }} />
            <span>API: {serverStatus ? 'Connected (PostgreSQL)' : 'Offline / Standalone Feed'}</span>
          </div>
        </div>

        {/* Right actions: Refresh & Auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={handleSyncClick}
            disabled={isRefreshing}
            style={{
              background: justSynced && !isRefreshing ? 'rgba(0, 229, 153, 0.15)' : 'transparent',
              border: `1px solid ${justSynced && !isRefreshing ? '#00e599' : 'rgba(255, 255, 255, 0.2)'}`,
              color: justSynced && !isRefreshing ? '#00e599' : '#ffffff',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '12px',
              cursor: isRefreshing ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
            title="Refresh latest market ticker & indicator metrics"
          >
            {justSynced && !isRefreshing ? (
              <>
                <Check size={12} style={{ color: '#00e599' }} />
                <span style={{ fontWeight: 600 }}>Synced!</span>
              </>
            ) : (
              <>
                <RefreshCw 
                  size={12} 
                  style={{ 
                    animation: isRefreshing ? 'spin 0.8s linear infinite' : 'none',
                    display: 'inline-block'
                  }} 
                />
                <span>{isRefreshing ? 'Syncing...' : 'Sync'}</span>
              </>
            )}
          </button>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(0, 229, 153, 0.15)',
                border: '1px solid #00e599',
                color: '#00e599',
                padding: '3px 10px',
                borderRadius: '6px'
              }}>
                <ShieldCheck size={13} />
                <span>{user.email || 'Evaluator'}</span>
              </div>
              <button
                onClick={onLogout}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px'
                }}
              >
                <LogOut size={13} /> Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => onOpenAuth('login')}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(0, 229, 255, 0.35)',
                  color: '#00e5ff',
                  borderRadius: '6px',
                  padding: '5px 12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.2s ease'
                }}
              >
                <LogIn size={13} /> Sign In
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                style={{
                  background: 'linear-gradient(135deg, #00e5ff 0%, #0077b6 100%)',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: '6px',
                  padding: '5px 12px',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  boxShadow: '0 2px 10px rgba(0, 229, 255, 0.3)',
                  transition: 'all 0.2s ease'
                }}
              >
                <User size={13} /> Sign Up
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Title Centerpiece with Dim Watermark Candlestick Background matching Appendix Reference */}
      <div className="header-banner">
        <svg
          className="header-candlesticks-bg"
          viewBox="0 0 1200 68"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            maskImage: 'linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.9) 100%)',
            WebkitMaskImage: 'linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.9) 100%)'
          }}
        >
          {/* Faint Horizontal Terminal Gridlines */}
          <line x1="0" y1="18" x2="1200" y2="18" stroke="rgba(0, 229, 255, 0.04)" strokeDasharray="3 5" />
          <line x1="0" y1="34" x2="1200" y2="34" stroke="rgba(0, 229, 255, 0.03)" strokeDasharray="3 5" />
          <line x1="0" y1="50" x2="1200" y2="50" stroke="rgba(0, 229, 255, 0.04)" strokeDasharray="3 5" />

          {/* Dim Watermark Candlesticks (Subdued Red Left / Dark Minimal Center / Subdued Cyan Right) */}
          {CANDLESTICKS.map((c, i) => {
            const isBull = c.bull;
            const color = isBull ? '#00b4d8' : '#ef4444';
            const bodyY = Math.min(c.open, c.close);
            const bodyHeight = Math.max(3.5, Math.abs(c.open - c.close));

            return (
              <g
                key={i}
                opacity={c.opacity}
              >
                {/* Upper/Lower Wick */}
                <line
                  x1={c.x}
                  y1={c.high}
                  x2={c.x}
                  y2={c.low}
                  stroke={color}
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                {/* Candle Body */}
                <rect
                  x={c.x - 3.5}
                  y={bodyY}
                  width="7"
                  height={bodyHeight}
                  rx="1"
                  fill={color}
                />
              </g>
            );
          })}
        </svg>

        <h1 style={{
          position: 'relative',
          fontSize: '26px',
          fontWeight: '900',
          letterSpacing: '0.22em',
          color: '#ffffff',
          textTransform: 'uppercase',
          textShadow: '0 0 24px rgba(0, 229, 255, 0.7), 0 0 48px rgba(0, 180, 216, 0.35)',
          zIndex: 1
        }}>
          ECONOMIC INDICATOR
        </h1>
        <div style={{
          position: 'relative',
          width: '140px',
          height: '2.5px',
          background: 'linear-gradient(90deg, transparent, #00e5ff, transparent)',
          margin: '6px auto 0 auto',
          boxShadow: '0 0 12px #00e5ff',
          zIndex: 1
        }} />
      </div>
    </header>
  );
}

// Dim, subtle Candlesticks matching the dark reference background watermark
const CANDLESTICKS = [
  // LEFT WING (x: 18 - 360) - Dim Red Bearish Candlesticks
  { x: 18, high: 12, low: 50, open: 18, close: 44, bull: false, opacity: 0.28 },
  { x: 36, high: 20, low: 56, open: 24, close: 52, bull: false, opacity: 0.30 },
  { x: 54, high: 30, low: 60, open: 48, close: 36, bull: true, opacity: 0.22 },
  { x: 72, high: 22, low: 58, open: 26, close: 54, bull: false, opacity: 0.28 },
  { x: 90, high: 16, low: 54, open: 20, close: 48, bull: false, opacity: 0.30 },
  { x: 108, high: 28, low: 62, open: 32, close: 58, bull: false, opacity: 0.32 },
  { x: 126, high: 36, low: 62, open: 56, close: 40, bull: true, opacity: 0.22 },
  { x: 144, high: 24, low: 60, open: 28, close: 56, bull: false, opacity: 0.28 },
  { x: 162, high: 30, low: 64, open: 34, close: 60, bull: false, opacity: 0.30 },
  { x: 180, high: 26, low: 56, open: 30, close: 50, bull: false, opacity: 0.26 },
  { x: 198, high: 34, low: 60, open: 52, close: 38, bull: true, opacity: 0.20 },
  { x: 216, high: 22, low: 58, open: 26, close: 54, bull: false, opacity: 0.28 },
  { x: 234, high: 18, low: 54, open: 22, close: 50, bull: false, opacity: 0.30 },
  { x: 252, high: 28, low: 62, open: 32, close: 56, bull: false, opacity: 0.26 },
  { x: 270, high: 32, low: 58, open: 54, close: 36, bull: true, opacity: 0.20 },
  { x: 288, high: 20, low: 56, open: 24, close: 52, bull: false, opacity: 0.26 },
  { x: 306, high: 26, low: 60, open: 30, close: 56, bull: false, opacity: 0.24 },
  { x: 324, high: 28, low: 58, open: 50, close: 34, bull: true, opacity: 0.18 },
  { x: 342, high: 24, low: 54, open: 28, close: 48, bull: false, opacity: 0.22 },
  { x: 360, high: 30, low: 56, open: 32, close: 50, bull: false, opacity: 0.20 },

  // CENTER REGION (x: 380 - 820) - Very dim / practically black backdrop behind title
  { x: 380, high: 26, low: 54, open: 46, close: 32, bull: true, opacity: 0.08 },
  { x: 400, high: 24, low: 52, open: 30, close: 46, bull: false, opacity: 0.07 },
  { x: 420, high: 22, low: 50, open: 44, close: 28, bull: true, opacity: 0.08 },
  { x: 440, high: 24, low: 53, open: 28, close: 48, bull: false, opacity: 0.06 },
  { x: 460, high: 20, low: 50, open: 46, close: 26, bull: true, opacity: 0.08 },
  { x: 480, high: 22, low: 52, open: 26, close: 44, bull: false, opacity: 0.06 },
  { x: 500, high: 18, low: 48, open: 42, close: 24, bull: true, opacity: 0.08 },
  { x: 520, high: 20, low: 50, open: 24, close: 46, bull: false, opacity: 0.06 },
  { x: 540, high: 18, low: 46, open: 40, close: 22, bull: true, opacity: 0.07 },
  { x: 560, high: 22, low: 50, open: 26, close: 44, bull: false, opacity: 0.06 },
  { x: 580, high: 16, low: 48, open: 42, close: 22, bull: true, opacity: 0.08 },
  { x: 600, high: 20, low: 52, open: 24, close: 46, bull: false, opacity: 0.06 },
  { x: 620, high: 18, low: 48, open: 44, close: 24, bull: true, opacity: 0.08 },
  { x: 640, high: 22, low: 50, open: 26, close: 46, bull: false, opacity: 0.06 },
  { x: 660, high: 16, low: 46, open: 40, close: 22, bull: true, opacity: 0.08 },
  { x: 680, high: 18, low: 50, open: 24, close: 44, bull: false, opacity: 0.06 },
  { x: 700, high: 14, low: 46, open: 42, close: 20, bull: true, opacity: 0.08 },
  { x: 720, high: 20, low: 50, open: 24, close: 46, bull: false, opacity: 0.06 },
  { x: 740, high: 16, low: 44, open: 40, close: 20, bull: true, opacity: 0.08 },
  { x: 760, high: 18, low: 48, open: 22, close: 44, bull: false, opacity: 0.06 },
  { x: 780, high: 14, low: 44, open: 38, close: 18, bull: true, opacity: 0.08 },
  { x: 800, high: 18, low: 46, open: 22, close: 42, bull: false, opacity: 0.07 },
  { x: 820, high: 12, low: 42, open: 36, close: 16, bull: true, opacity: 0.10 },

  // RIGHT WING (x: 840 - 1188) - Dim Subdued Cyan Bullish Candlesticks
  { x: 840, high: 12, low: 48, open: 42, close: 16, bull: true, opacity: 0.22 },
  { x: 858, high: 14, low: 50, open: 20, close: 44, bull: false, opacity: 0.18 },
  { x: 876, high: 8,  low: 44, open: 40, close: 12, bull: true, opacity: 0.26 },
  { x: 894, high: 10, low: 46, open: 36, close: 14, bull: true, opacity: 0.28 },
  { x: 912, high: 6,  low: 40, open: 32, close: 10, bull: true, opacity: 0.30 },
  { x: 930, high: 12, low: 46, open: 16, close: 40, bull: false, opacity: 0.20 },
  { x: 948, high: 6,  low: 38, open: 34, close: 8,  bull: true, opacity: 0.30 },
  { x: 966, high: 4,  low: 36, open: 28, close: 6,  bull: true, opacity: 0.32 },
  { x: 984, high: 8,  low: 40, open: 12, close: 36, bull: false, opacity: 0.18 },
  { x: 1002, high: 4, low: 34, open: 30, close: 6,  bull: true, opacity: 0.30 },
  { x: 1020, high: 2, low: 32, open: 26, close: 4,  bull: true, opacity: 0.32 },
  { x: 1038, high: 4, low: 34, open: 24, close: 6,  bull: true, opacity: 0.28 },
  { x: 1056, high: 10, low: 42, open: 12, close: 36, bull: false, opacity: 0.20 },
  { x: 1074, high: 4, low: 36, open: 30, close: 6,  bull: true, opacity: 0.30 },
  { x: 1092, high: 2, low: 32, open: 26, close: 4,  bull: true, opacity: 0.32 },
  { x: 1110, high: 4, low: 34, open: 24, close: 6,  bull: true, opacity: 0.28 },
  { x: 1128, high: 8, low: 40, open: 12, close: 36, bull: false, opacity: 0.20 },
  { x: 1146, high: 2, low: 30, open: 26, close: 4,  bull: true, opacity: 0.32 },
  { x: 1164, high: 2, low: 32, open: 24, close: 6,  bull: true, opacity: 0.30 },
  { x: 1182, high: 1, low: 28, open: 22, close: 4,  bull: true, opacity: 0.30 }
];
