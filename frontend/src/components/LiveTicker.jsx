import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function LiveTicker({ tickerData = [] }) {
  // Default benchmark fallback matching Figma reference if live ticks still loading
  const defaultItems = [
    { symbol: 'SENSEX', price: 73158.24, change_value: 305.10, change_percent: 0.42 },
    { symbol: 'NIFTY BANK', price: 46919.80, change_value: -56.30, change_percent: -0.12 },
    { symbol: 'NIFTY IT', price: 37842.15, change_value: 412.50, change_percent: 1.10 }
  ];

  const rawItems = tickerData.length > 0 ? tickerData : defaultItems;

  // Deduplicate by symbol so each index appears exactly once (no repeat / duplication)
  const uniqueItemsMap = new Map();
  rawItems.forEach(item => {
    if (item?.symbol && !uniqueItemsMap.has(item.symbol)) {
      uniqueItemsMap.set(item.symbol, item);
    }
  });

  const orderMap = { 'SENSEX': 1, 'NIFTY BANK': 2, 'NIFTY IT': 3 };
  const items = Array.from(uniqueItemsMap.values()).sort(
    (a, b) => (orderMap[a.symbol] || 99) - (orderMap[b.symbol] || 99)
  );

  return (
    <div style={{
      width: '100%',
      background: 'rgba(8, 16, 30, 0.9)',
      border: '1px solid rgba(0, 229, 255, 0.3)',
      borderRadius: '8px',
      padding: '8px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      marginBottom: '20px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
    }}>
      {/* Red LIVE Badge matching Figma */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'rgba(239, 68, 68, 0.2)',
        border: '1px solid #ef4444',
        borderRadius: '4px',
        padding: '3px 8px',
        fontSize: '11px',
        fontWeight: '700',
        color: '#ff4d4f',
        letterSpacing: '0.05em',
        flexShrink: 0
      }}>
        <span className="pulsing-dot" />
        LIVE
      </div>

      {/* Clean single ticker indices (strictly no duplication) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: '32px',
        flex: 1
      }}>
        {items.map((item) => {
          const isPos = (item.change_percent >= 0);
          return (
            <div key={item.symbol} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '13px',
              fontFamily: 'var(--font-mono)'
            }}>
              <span style={{ color: '#94a3b8', fontWeight: '600' }}>{item.symbol}</span>
              <span style={{ color: '#ffffff', fontWeight: '700' }}>
                {Number(item.price).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span style={{
                color: isPos ? '#00e599' : '#ef4444',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center'
              }}>
                {isPos ? '+' : ''}{item.change_percent}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
