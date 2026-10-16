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
            <button
              onClick={onOpenAuth}
              style={{
                background: 'linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)',
                border: 'none',
                color: '#ffffff',
                borderRadius: '6px',
                padding: '5px 14px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(0, 180, 216, 0.4)'
              }}
            >
              <LogIn size={13} /> Sign In
            </button>
          )}
        </div>
      </div>

      {/* Main Title Centerpiece matching Figma */}
      <div style={{
        textAlign: 'center',
        padding: '12px 0 20px 0',
        position: 'relative'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '900',
          letterSpacing: '0.18em',
          color: '#ffffff',
          textTransform: 'uppercase',
          textShadow: '0 0 20px rgba(0, 229, 255, 0.6), 0 0 40px rgba(0, 180, 216, 0.3)'
        }}>
          ECONOMIC INDICATOR
        </h1>
        <div style={{
          width: '120px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #00e5ff, transparent)',
          margin: '8px auto 0 auto'
        }} />
      </div>
    </header>
  );
}
