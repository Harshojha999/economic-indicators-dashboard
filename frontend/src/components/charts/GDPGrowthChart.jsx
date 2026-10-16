import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function GDPGrowthChart({ data = [] }) {
  const chartData = data.length > 0 ? data : [
    { year: '2021', india: 8.7, world: 6.3 },
    { year: '2022', india: 8.7, world: 4.7 },
    { year: '2023', india: 8.7, world: 4.7 },
    { year: '2024', india: 8.7, world: 6.3 },
    { year: '2025', india: 8.7, world: 4.7 }
  ];

  return (
    <div style={{ width: '100%', height: 330 }}>
      {/* Legend matching Figma */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginBottom: '8px', fontSize: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: 10, height: 10, backgroundColor: '#00b4d8', borderRadius: 2 }} />
          <span style={{ color: '#94a3b8' }}>India</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: 10, height: 10, backgroundColor: '#f59e0b', borderRadius: 2 }} />
          <span style={{ color: '#94a3b8' }}>World</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#00b4d8', borderRadius: 8, color: '#fff' }}
            formatter={(value) => [`${value}%`]}
          />
          <Bar dataKey="india" name="India" fill="#00b4d8" radius={[4, 4, 0, 0]} />
          <Bar dataKey="world" name="World" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
