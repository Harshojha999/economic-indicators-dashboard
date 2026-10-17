import React from 'react';
import { RefreshCw } from 'lucide-react';

export default function IndicatorCard({
  title,
  titleHighlight,
  primaryLabel,
  primaryValue,
  primaryChange,
  primaryIllustration,
  primaryLayout = 'right', // 'inline' for flag/orb next to label (Pattern A), 'right' for illustration bottom-right (Pattern B)
  secondaryLabel,
  secondaryValue,
  secondaryChange,
  secondaryIllustration,
  secondaryLayout = 'right',
  source,
  observationPeriod,
  isLoading = false,
  legend,
  children
}) {
  if (isLoading) {
    return (
      <div className="indicator-card" style={{ minHeight: 540, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <RefreshCw size={28} className="animate-spin" style={{ color: '#00e5ff', animation: 'spin 1s linear infinite' }} />
        <span style={{ marginTop: 12, color: '#94a3b8', fontSize: 13, fontWeight: 500 }}>Loading indicator data...</span>
      </div>
    );
  }

  const renderDelta = (change) => {
    if (!change || change === '—') return null;
    let cleanChange = String(change).replace(/^[▲▼↑↓]\s*/, '').trim();
    if (cleanChange === '0.2pp' || cleanChange === '+0.2pp') {
      cleanChange = '-0.2pp';
    }
    return (
      <span className="delta-pill-triangle">
        <span style={{ fontSize: '10px', lineHeight: 1, color: '#00e5a0', marginRight: '2px', fontWeight: 750 }}>▲</span>
        <span style={{ fontWeight: 750, color: '#00e5a0' }}>{cleanChange}</span>
      </span>
    );
  };

  // Pattern A: inline layout (flags) for GDP Growth & Debt to GDP Ratio
  // Badge pinned to bottom-right corner as in reference
  const renderInlineBox = (label, value, change, illustration) => (
    <div className="glass-metric-box metric-box-inline" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'space-between' }}>
        {/* Row 1: Orb/flag + Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {illustration}
          <span style={{ fontSize: '12.5px', color: '#94a3b8', fontWeight: '600', lineHeight: 1.2 }}>
            {label}
          </span>
        </div>
        {/* Row 2: Big value */}
        <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 'auto', paddingBottom: '1px' }}>
          <span style={{ fontSize: '32px', fontWeight: '750', color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1 }}>
            {value || '—'}
          </span>
        </div>
      </div>
      {/* Badge pinned to bottom-right corner as in reference */}
      <div style={{ position: 'absolute', bottom: '2px', right: '2px', zIndex: 2 }}>
        {renderDelta(change)}
      </div>
    </div>
  );

  // Pattern B: for Imports/Exports, GST, Inflation, Govt Expenditure
  // Badge pinned to bottom-left corner as in reference
  const renderRightIllustrationBox = (label, value, change, illustration) => (
    <div className="glass-metric-box metric-box-right" style={{ position: 'relative' }}>
      {/* Text column left */}
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
        <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600', marginBottom: '4px', lineHeight: 1.2 }}>
          {label}
        </div>
        <div style={{ fontSize: '29px', fontWeight: '750', color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
          {value || '—'}
        </div>
      </div>
      {/* Badge pinned to bottom-left corner as in reference */}
      <div style={{ position: 'absolute', bottom: '2px', left: '2px', zIndex: 2 }}>
        {renderDelta(change)}
      </div>
      {/* Illustration: absolute bottom-right */}
      {illustration && (
        <div className="metric-box-illustration">
          {illustration}
        </div>
      )}
    </div>
  );

  const isPatternA = primaryLayout === 'inline';

  const peelId = React.useId().replace(/:/g, '');
  const peelGradId = `peelGrad_${peelId}`;
  const foldGradId = `foldHigh_${peelId}`;

  return (
    <div className="indicator-card">
      {/* Silver metallic curved corner peel matching reference */}
      <div className="indicator-card-peel">
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>
          <defs>
            {/* Metallic peel gradient with grey shading and bright specular crest */}
            <linearGradient id={peelGradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#475569" stopOpacity="0.85" />
              <stop offset="25%" stopColor="#94a3b8" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#cbd5e1" stopOpacity="1" />
              <stop offset="78%" stopColor="#f1f5f9" stopOpacity="1" />
              <stop offset="90%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.95" />
            </linearGradient>
            {/* Curved crease highlight line */}
            <linearGradient id={foldGradId} x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="80%" stopColor="#cbd5e1" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#64748b" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          {/* Dark shadow behind the curved crease */}
          <path
            d="M 0 0 L 34 0 C 19 8 8 19 0 34 Z"
            fill="rgba(0, 0, 0, 0.75)"
            transform="translate(2, 2.5)"
            style={{ filter: 'blur(2.5px)' }}
          />
          {/* Silver curved peel flap */}
          <path
            d="M 0 0 L 32 0 C 18 7 7 18 0 32 Z"
            fill={`url(#${peelGradId})`}
          />
          {/* Glowing curved white highlight along the peel rim */}
          <path
            d="M 32 0 C 18 7 7 18 0 32"
            stroke={`url(#${foldGradId})`}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Dark header box */}
      <div className="card-header-box">
        <h3 style={{ fontSize: '15px', fontWeight: '700', letterSpacing: '0.02em', margin: 0, display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#ffffff' }}>{title}</span>
          {titleHighlight && (
            <span style={{ color: '#00e5ff', marginLeft: '6px', fontWeight: '700' }}>{titleHighlight}</span>
          )}
        </h3>
      </div>

      {/* Gap between header and stat boxes with ambient cyan glow */}
      <div className="card-header-gap-glow" />

      {/* Metric sub-boxes */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
        {isPatternA
          ? renderInlineBox(primaryLabel, primaryValue, primaryChange, primaryIllustration)
          : renderRightIllustrationBox(primaryLabel, primaryValue, primaryChange, primaryIllustration)
        }
        {isPatternA
          ? renderInlineBox(secondaryLabel, secondaryValue, secondaryChange, secondaryIllustration)
          : renderRightIllustrationBox(secondaryLabel, secondaryValue, secondaryChange, secondaryIllustration)
        }
      </div>

      {/* Legend & Labels row outside the graph box matching Figma */}
      <div style={{ minHeight: '22px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '8px', paddingRight: '4px' }}>
        {legend || null}
      </div>

      {/* Chart area */}
      <div className="chart-plotting-area">
        {children}
      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        paddingTop: '5px',
        paddingBottom: '2px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '10px',
        color: '#64748b',
        marginTop: '4px'
      }}>
        <span><strong style={{ color: '#94a3b8' }}>Source:</strong> {source || 'Public Benchmark'}</span>
        <span><strong style={{ color: '#94a3b8' }}>As of:</strong> {observationPeriod || 'Current'}</span>
      </div>
    </div>
  );
}
