import React from 'react';

export default function LiveTicker({ tickerData = [] }) {
  const defaultItems = [
    { symbol: 'SENSEX', exchange: 'BSE', price: 73158.24, change_value: 305.10, change_percent: 0.42 },
    { symbol: 'NIFTY BANK', exchange: 'NSE', price: 46919.80, change_value: -56.30, change_percent: -0.12 },
    { symbol: 'NIFTY IT', exchange: 'NSE', price: 37842.15, change_value: 412.50, change_percent: 1.10 }
  ];

  const rawItems = tickerData.length > 0 ? tickerData : defaultItems;

  // Deduplicate by symbol
  const uniqueItemsMap = new Map();
  rawItems.forEach(item => {
    if (item?.symbol && !uniqueItemsMap.has(item.symbol)) {
      const exchange = item.symbol === 'SENSEX' ? 'BSE' : 'NSE';
      uniqueItemsMap.set(item.symbol, { ...item, exchange });
    }
  });

  const orderMap = { 'SENSEX': 1, 'NIFTY BANK': 2, 'NIFTY IT': 3 };
  const baseItems = Array.from(uniqueItemsMap.values()).sort(
    (a, b) => (orderMap[a.symbol] || 99) - (orderMap[b.symbol] || 99)
  );

  // Repeat for continuous seamless 60fps marquee loop
  const marqueeItems = [...baseItems, ...baseItems, ...baseItems, ...baseItems];

  return (
    <div style={{
      width: '100%',
      background: 'linear-gradient(90deg, rgba(14, 25, 46, 0.95) 0%, rgba(8, 16, 32, 0.95) 100%)',
      border: '1px solid rgba(0, 229, 255, 0.28)',
      borderRadius: '8px',
      padding: '7px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '16px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(0, 229, 255, 0.15)',
      overflow: 'hidden'
    }}>
      {/* Red LIVE Badge matching Figma */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'rgba(239, 68, 68, 0.18)',
        border: '1px solid #ef4444',
        borderRadius: '4px',
        padding: '3px 8px',
        fontSize: '11px',
        fontWeight: '800',
        color: '#ff4d4f',
        letterSpacing: '0.06em',
        flexShrink: 0,
        zIndex: 2,
        boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)'
      }}>
        <span className="pulsing-dot" />
        LIVE
      </div>

      {/* Seamless Infinite Marquee Track */}
      <div className="ticker-wrapper" style={{ flex: 1 }}>
        <div className="ticker-track">
          {marqueeItems.map((item, idx) => {
            const isPos = (item.change_percent >= 0);
            return (
              <div 
                key={`${item.symbol}-${idx}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                <span style={{ color: '#94a3b8', fontWeight: '700', letterSpacing: '0.02em' }}>
                  {item.symbol}
                </span>
                <span style={{ color: '#ffffff', fontWeight: '800' }}>
                  {Number(item.price).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span style={{
                  color: isPos ? '#00e599' : '#ef4444',
                  fontWeight: '700',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}>
                  {isPos ? '+' : ''}{item.change_percent}%
                </span>
                <span style={{ color: 'rgba(255, 255, 255, 0.25)', fontSize: '11px', margin: '0 4px' }}>
                  • {item.exchange}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
