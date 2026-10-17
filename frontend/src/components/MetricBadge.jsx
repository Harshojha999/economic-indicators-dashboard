import React from 'react';

/**
 * MetricBadge renders high-fidelity 3D illustrations for the macro indicator cards.
 * Pattern A (inline): flag/globe spheres, small circular images.
 * Pattern B (right): large decorative photos anchored at bottom-right of their metric box.
 */
export default function MetricBadge({ type, size = 48 }) {
  const isSphere = type.includes('flag') || type.includes('globe') || type.includes('sphere');

  const imageMap = {
    india_flag: '/assets/india_sphere.png',
    world_globe: '/assets/world_sphere.png',
    us_flag: '/assets/us_sphere.png',
    // 3D Illustrations (mapped to the 8 newly generated assets)
    cargo_ship: '/assets/01_exports.png',
    port_containers: '/assets/02_imports.png',
    gst_coins: '/assets/03_gst_collections.png',
    bank_vault: '/assets/04_monthly_average.png',
    shopping_cart: '/assets/05_inflation_rate.png',
    target_bullseye: '/assets/06_rbi_target.png',
    govt_building: '/assets/07_total_expenditure.png',
    capital_growth: '/assets/08_capital_expenditure.png',
    // Direct name aliases
    exports: '/assets/01_exports.png',
    imports: '/assets/02_imports.png',
    gst_collections: '/assets/03_gst_collections.png',
    monthly_average: '/assets/04_monthly_average.png',
    inflation_rate: '/assets/05_inflation_rate.png',
    rbi_target: '/assets/06_rbi_target.png',
    total_expenditure: '/assets/07_total_expenditure.png',
    capital_expenditure: '/assets/08_capital_expenditure.png',
  };

  const imageSrc = imageMap[type];

  if (!imageSrc) {
    return (
      <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 18 }}>📊</span>
      </div>
    );
  }

  // Pattern A: Flag/globe spheres — circular with drop shadow
  if (isSphere) {
    return (
      <div style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <img
          src={imageSrc}
          alt={type}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.6))'
          }}
        />
      </div>
    );
  }

  // Pattern B: 3D Illustrations — seamless floating blend matching reference
  const isLandscape = type.includes('gst') || type.includes('total_expenditure') || type.includes('govt_building');
  const boxWidth = isLandscape ? Math.round(size * 1.2) : size;

  // Custom fine-tuning offsets per user instruction
  const getCustomOffset = (badgeType) => {
    switch (badgeType) {
      case 'port_containers':
      case 'imports':
        return { transform: 'translateY(7px)' }; // Imports: thodi neeche
      case 'gst_coins':
      case 'gst_collections':
        return { transform: 'translateX(9px)' }; // GST Collections: right ko shift
      case 'bank_vault':
      case 'monthly_average':
        return { transform: 'translateY(8px)' }; // Monthly Average: thoda neeche shift
      case 'govt_building':
      case 'total_expenditure':
        return { transform: 'translate(9px, 7px)' }; // Total Expenditure: right aur thodi neeche
      default:
        return {};
    }
  };

  const customOffset = getCustomOffset(type);

  return (
    <div style={{
      width: boxWidth,
      height: size,
      minWidth: boxWidth,
      minHeight: size,
      position: 'relative',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      ...customOffset
    }}>
      {/* Subtle ambient cyan glow behind the floating 3D asset anchored to corner */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '130%',
        height: '130%',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 65% 65%, rgba(0, 229, 255, 0.32) 0%, rgba(0, 160, 255, 0.15) 50%, transparent 75%)',
        filter: 'blur(10px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <img
        src={imageSrc}
        alt={type}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'right bottom',
          position: 'relative',
          zIndex: 1,
          filter: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 12px rgba(0, 229, 255, 0.28))',
        }}
      />
    </div>
  );
}
