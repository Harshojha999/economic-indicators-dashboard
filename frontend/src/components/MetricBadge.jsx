import React from 'react';

/**
 * MetricBadge renders high-fidelity 3D illustrations for the macro indicator cards,
 * matching the Figma / Interview Round II specification reference.
 */
export default function MetricBadge({ type, size = 52 }) {
  const containerStyle = {
    width: size,
    height: size,
    minWidth: size,
    borderRadius: '10px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'radial-gradient(circle at 30% 30%, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95))',
    border: '1px solid rgba(0, 229, 255, 0.25)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
    flexShrink: 0
  };

  // 1. Cargo Freight Ship (Exports)
  if (type === 'cargo_ship') {
    return (
      <div style={containerStyle} title="Maritime Export Logistics">
        <img 
          src="/assets/cargo_ship.jpg" 
          alt="Cargo Ship 3D" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>
    );
  }

  // 2. Seaport Container Logistics (Imports)
  if (type === 'port_containers') {
    return (
      <div style={containerStyle} title="Container Import Terminal">
        <img 
          src="/assets/port_containers.jpg" 
          alt="Port Terminal 3D" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>
    );
  }

  // 3. GST Coins & Invoice (GST Collections)
  if (type === 'gst_coins') {
    return (
      <div style={containerStyle} title="GST Revenue & Invoices">
        <img 
          src="/assets/gst_coins.jpg" 
          alt="GST Coins 3D" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>
    );
  }

  // 4. Bank Safe / Vault (Monthly Average GST)
  if (type === 'bank_vault') {
    return (
      <div style={containerStyle} title="Treasury Reserve Vault">
        <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="vaultOuter" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#334155" />
              <stop offset="0.5" stopColor="#1e293b" />
              <stop offset="1" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="vaultGold" x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fde047" />
              <stop offset="1" stopColor="#ca8a04" />
            </linearGradient>
            <radialGradient id="vaultCyan" cx="24" cy="24" r="16" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00e5ff" stopOpacity="0.4" />
              <stop offset="1" stopColor="#00e5ff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="4" y="4" width="40" height="40" rx="8" fill="url(#vaultOuter)" stroke="#475569" strokeWidth="2" />
          <circle cx="24" cy="24" r="15" fill="none" stroke="url(#vaultGold)" strokeWidth="3" />
          <circle cx="24" cy="24" r="15" fill="url(#vaultCyan)" />
          <circle cx="24" cy="24" r="6" fill="#0f172a" stroke="#00e5ff" strokeWidth="2" />
          {/* Wheel spokes */}
          <line x1="24" y1="9" x2="24" y2="15" stroke="url(#vaultGold)" strokeWidth="3" strokeLinecap="round" />
          <line x1="24" y1="33" x2="24" y2="39" stroke="url(#vaultGold)" strokeWidth="3" strokeLinecap="round" />
          <line x1="9" y1="24" x2="15" y2="24" stroke="url(#vaultGold)" strokeWidth="3" strokeLinecap="round" />
          <line x1="33" y1="24" x2="39" y2="24" stroke="url(#vaultGold)" strokeWidth="3" strokeLinecap="round" />
          {/* Keypad indicator */}
          <rect x="36" y="8" width="4" height="4" rx="1" fill="#00e599" />
        </svg>
      </div>
    );
  }

  // 5. Shopping Cart with Groceries (Inflation Rate)
  if (type === 'shopping_cart') {
    return (
      <div style={containerStyle} title="Consumer Goods Inflation Basket">
        <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="cartGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="1" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="itemOrange" x1="16" y1="8" x2="32" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fbbf24" />
              <stop offset="1" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          {/* Goods inside cart */}
          <rect x="18" y="10" width="8" height="12" rx="2" fill="url(#itemOrange)" />
          <circle cx="31" cy="16" r="5" fill="#00e599" />
          <path d="M22 6 L28 14" stroke="#f8fafc" strokeWidth="1.5" />
          {/* Cart wire basket */}
          <path d="M8 12 H14 L20 30 H36 L40 16 H15" stroke="url(#cartGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <line x1="22" y1="18" x2="37" y2="18" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" />
          <line x1="24" y1="24" x2="34" y2="24" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" />
          {/* Wheels */}
          <circle cx="21" cy="35" r="3" fill="#f8fafc" />
          <circle cx="34" cy="35" r="3" fill="#f8fafc" />
        </svg>
      </div>
    );
  }

  // 6. RBI Bullseye Target with Arrow (Inflation Target)
  if (type === 'target_bullseye') {
    return (
      <div style={containerStyle} title="RBI 4% Target Benchmark">
        <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
          <defs>
            <radialGradient id="targetRed" cx="24" cy="24" r="18" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ef4444" />
              <stop offset="1" stopColor="#991b1b" />
            </radialGradient>
          </defs>
          <circle cx="24" cy="24" r="20" fill="url(#targetRed)" stroke="#f8fafc" strokeWidth="2" />
          <circle cx="24" cy="24" r="14" fill="#f8fafc" />
          <circle cx="24" cy="24" r="9" fill="url(#targetRed)" />
          <circle cx="24" cy="24" r="4" fill="#facc15" />
          {/* Arrow */}
          <line x1="8" y1="8" x2="24" y2="24" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          <polygon points="24,24 20,16 28,18" fill="#38bdf8" />
          <line x1="6" y1="6" x2="10" y2="4" stroke="#00e5ff" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  // 7. Government Building / Treasury (Total Expenditure)
  if (type === 'govt_building') {
    return (
      <div style={containerStyle} title="Union Government Treasury">
        <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="govtGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00e5ff" />
              <stop offset="1" stopColor="#0077b6" />
            </linearGradient>
            <linearGradient id="goldRoof" x1="12" y1="8" x2="36" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fde047" />
              <stop offset="1" stopColor="#d97706" />
            </linearGradient>
          </defs>
          {/* Pediment / Roof */}
          <polygon points="24,6 6,18 42,18" fill="url(#goldRoof)" stroke="#fef08a" strokeWidth="1" />
          <rect x="8" y="18" width="32" height="4" fill="#334155" />
          {/* Pillars */}
          <rect x="10" y="22" width="4" height="14" rx="1" fill="url(#govtGrad)" />
          <rect x="18" y="22" width="4" height="14" rx="1" fill="url(#govtGrad)" />
          <rect x="26" y="22" width="4" height="14" rx="1" fill="url(#govtGrad)" />
          <rect x="34" y="22" width="4" height="14" rx="1" fill="url(#govtGrad)" />
          {/* Base */}
          <rect x="6" y="36" width="36" height="6" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  // 8. Capital Expenditure / Financial Growth Chest
  if (type === 'capital_growth') {
    return (
      <div style={containerStyle} title="Capital Growth & Infrastructure">
        <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="chestGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f59e0b" />
              <stop offset="1" stopColor="#b45309" />
            </linearGradient>
          </defs>
          {/* Briefcase/Chest body */}
          <rect x="8" y="16" width="32" height="24" rx="4" fill="url(#chestGrad)" stroke="#fde68a" strokeWidth="1.5" />
          {/* Handle */}
          <path d="M18 16 V10 C18 8 20 6 24 6 C28 6 30 8 30 10 V16" stroke="#fde68a" strokeWidth="2.5" fill="none" />
          {/* Metallic trims */}
          <line x1="8" y1="26" x2="40" y2="26" stroke="#451a03" strokeWidth="2" />
          <circle cx="24" cy="26" r="3" fill="#fef08a" />
          {/* Upward Growth Arrow */}
          <path d="M30 40 L38 30 M38 30 H32 M38 30 V36" stroke="#00e599" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  // 9. India Flag 3D Circular Badge
  if (type === 'india_flag') {
    return (
      <div style={containerStyle} title="Republic of India">
        <svg width="38" height="38" viewBox="0 0 48 48">
          <defs>
            <clipPath id="circleClipInd">
              <circle cx="24" cy="24" r="20" />
            </clipPath>
          </defs>
          <circle cx="24" cy="24" r="20" fill="#ffffff" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <g clipPath="url(#circleClipInd)">
            <rect x="0" y="4" width="48" height="13.3" fill="#FF9933" />
            <rect x="0" y="17.3" width="48" height="13.3" fill="#FFFFFF" />
            <rect x="0" y="30.6" width="48" height="13.3" fill="#138808" />
            {/* Ashoka Chakra */}
            <circle cx="24" cy="24" r="5" stroke="#000088" strokeWidth="1" fill="none" />
            <circle cx="24" cy="24" r="1.5" fill="#000088" />
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={i}
                x1="24"
                y1="24"
                x2={24 + 5 * Math.cos((i * 30 * Math.PI) / 180)}
                y2={24 + 5 * Math.sin((i * 30 * Math.PI) / 180)}
                stroke="#000088"
                strokeWidth="0.75"
              />
            ))}
          </g>
          {/* Domed glass shine */}
          <ellipse cx="24" cy="14" rx="14" ry="6" fill="white" opacity="0.25" />
        </svg>
      </div>
    );
  }

  // 10. US Flag 3D Circular Badge
  if (type === 'us_flag') {
    return (
      <div style={containerStyle} title="United States Benchmark">
        <svg width="38" height="38" viewBox="0 0 48 48">
          <defs>
            <clipPath id="circleClipUs">
              <circle cx="24" cy="24" r="20" />
            </clipPath>
          </defs>
          <g clipPath="url(#circleClipUs)">
            {/* Red and White stripes */}
            {Array.from({ length: 9 }).map((_, i) => (
              <rect
                key={i}
                x="0"
                y={4 + i * 4.4}
                width="48"
                height="4.4"
                fill={i % 2 === 0 ? '#B22234' : '#FFFFFF'}
              />
            ))}
            {/* Blue Canton */}
            <rect x="4" y="4" width="20" height="20" fill="#3C3B6E" />
            <circle cx="10" cy="9" r="1" fill="#ffffff" />
            <circle cx="17" cy="9" r="1" fill="#ffffff" />
            <circle cx="13.5" cy="14" r="1" fill="#ffffff" />
            <circle cx="10" cy="19" r="1" fill="#ffffff" />
            <circle cx="17" cy="19" r="1" fill="#ffffff" />
          </g>
          {/* Domed glass shine */}
          <ellipse cx="24" cy="14" rx="14" ry="6" fill="white" opacity="0.25" />
        </svg>
      </div>
    );
  }

  // 11. World Hologram Globe 3D Badge
  if (type === 'world_globe') {
    return (
      <div style={containerStyle} title="Global Benchmark">
        <svg width="38" height="38" viewBox="0 0 48 48">
          <defs>
            <radialGradient id="globeGrad" cx="24" cy="24" r="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00b4d8" />
              <stop offset="0.7" stopColor="#0077b6" />
              <stop offset="1" stopColor="#03045e" />
            </radialGradient>
          </defs>
          <circle cx="24" cy="24" r="20" fill="url(#globeGrad)" stroke="#38bdf8" strokeWidth="1.5" />
          {/* Latitude & Longitude curves */}
          <ellipse cx="24" cy="24" rx="18" ry="8" fill="none" stroke="#90e0ef" strokeWidth="1.2" strokeDasharray="3 2" />
          <ellipse cx="24" cy="24" rx="8" ry="18" fill="none" stroke="#90e0ef" strokeWidth="1.2" strokeDasharray="3 2" />
          <line x1="4" y1="24" x2="44" y2="24" stroke="#90e0ef" strokeWidth="1.2" />
          <line x1="24" y1="4" x2="24" y2="44" stroke="#90e0ef" strokeWidth="1.2" />
          {/* Domed glass shine */}
          <ellipse cx="24" cy="14" rx="12" ry="5" fill="white" opacity="0.3" />
        </svg>
      </div>
    );
  }

  return null;
}
