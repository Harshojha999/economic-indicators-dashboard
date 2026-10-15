import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';

export default function InflationChart({ data = [] }) {
  const chartData = data.length > 0 ? data : [
    { year: '2021', cpi: 8.2 },
    { year: '2022', cpi: 5.8 },
    { year: '2023', cpi: 2.8 },
    { year: '2024', cpi: 3.2 },
    { year: '2025', cpi: 5.4 }
  ];

  return (
    <div style={{ width: '100%', height: 260 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px', marginBottom: '8px', fontSize: '11px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: 12, height: 2, backgroundColor: '#00e5ff' }} />
          <span style={{ color: '#00e5ff' }}>CPI Inflation</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: 12, height: 2, borderTop: '2px dashed #f59e0b' }} />
          <span style={{ color: '#f59e0b' }}>RBI Target (4%)</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis 
            dataKey="year" 
            stroke="#64748b" 
            tick={{ fill: '#94a3b8', fontSize: 11 }} 
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          />
          <YAxis 
            unit="%" 
            stroke="#64748b" 
            domain={[0, 10]}
            ticks={[0, 2, 4, 6, 8, 10]}
            tick={{ fill: '#94a3b8', fontSize: 11 }} 
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#00e5ff', borderRadius: 8, color: '#fff' }}
          />
          <ReferenceLine y={4} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'RBI 4%', fill: '#f59e0b', fontSize: 10, position: 'right' }} />
          <Line 
            type="monotone" 
            dataKey="cpi" 
            name="Inflation Rate" 
            stroke="#00e5ff" 
            strokeWidth={2.5} 
            dot={{ r: 4, fill: '#00e5ff' }} 
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
