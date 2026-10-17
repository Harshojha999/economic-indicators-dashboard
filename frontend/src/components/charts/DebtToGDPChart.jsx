import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, LabelList } from 'recharts';

export default function DebtToGDPChart({ data = [] }) {
  // Calibrated Debt to GDP points matching Image 1:
  // Sharp peak at 28 Jul (88%), dip at 8 Aug (54%), recovery to 72% at 22 Aug
  const chartData = (data && data.length > 0) ? data : [
    { date: '25 Jul', ratio: 78.0, showLabel: true },
    { date: '28 Jul', ratio: 88.0, showLabel: true },
    { date: '1 Aug', ratio: 65.0, showLabel: true },
    { date: '8 Aug', ratio: 54.0, showLabel: true },
    { date: '15 Aug', ratio: 65.0, showLabel: true },
    { date: '22 Aug', ratio: 72.0, showLabel: true }
  ];

  return (
    <div style={{ width: '100%', height: 330, display: 'flex', flexDirection: 'column' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 22, right: 12, left: -20, bottom: 2 }}>
          <defs>
            <linearGradient id="debtGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#00e5ff" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" vertical={true} horizontal={true} />
          <XAxis 
            dataKey="date" 
            ticks={['25 Jul', '1 Aug', '8 Aug', '15 Aug', '22 Aug']}
            stroke="#64748b" 
            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} 
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          />
          <YAxis 
            unit="%" 
            stroke="#64748b" 
            domain={[50, 100]}
            ticks={[50, 60, 70, 80, 90, 100]}
            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} 
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(0, 229, 255, 0.05)' }}
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#00e5ff', borderRadius: 8, color: '#fff', boxShadow: '0 8px 24px rgba(0,0,0,0.6)' }}
            formatter={(value) => [`${value}%`, 'Debt Ratio']}
          />
          <Area 
            type="linear" 
            dataKey="ratio" 
            stroke="#00e5ff" 
            strokeWidth={2.5} 
            fillOpacity={1} 
            fill="url(#debtGlow)" 
            dot={{ stroke: '#00e5ff', strokeWidth: 2, fill: '#0a192f', r: 4 }}
            activeDot={{ r: 6, fill: '#00e5ff', stroke: '#fff', strokeWidth: 2 }}
            isAnimationActive={false}
          >
            <LabelList dataKey="ratio" position="top" offset={8} fill="#00e5ff" fontSize={11} fontWeight={700} formatter={(v) => `${v}%`} />
          </Area>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
