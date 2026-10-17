import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LabelList } from 'recharts';

export default function GDPGrowthChart({ data = [] }) {
  const chartData = data.length > 0 ? data : [
    { year: '2021', india: 8.7, world: 6.3 },
    { year: '2022', india: 8.7, world: 4.7 },
    { year: '2023', india: 8.7, world: 4.7 },
    { year: '2024', india: 8.7, world: 6.3 },
    { year: '2025', india: 8.7, world: 4.7 }
  ];

  return (
    <div style={{ width: '100%', height: 330, display: 'flex', flexDirection: 'column' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 18, right: 8, left: -20, bottom: 2 }} barGap={5}>
          <defs>
            <linearGradient id="gdpIndiaBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity={1} />
              <stop offset="100%" stopColor="#0077b6" stopOpacity={0.85} />
            </linearGradient>
            <linearGradient id="gdpWorldBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity={1} />
              <stop offset="100%" stopColor="#b45309" stopOpacity={0.85} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" vertical={false} horizontal={true} />
          <XAxis 
            dataKey="year" 
            stroke="#64748b" 
            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} 
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          />
          <YAxis 
            unit="%" 
            stroke="#64748b" 
            domain={[0, 11]}
            ticks={[0, 2, 4, 6, 8, 10]}
            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} 
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(0, 229, 255, 0.05)' }}
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#00e5ff', borderRadius: 8, color: '#fff', boxShadow: '0 8px 24px rgba(0,0,0,0.6)' }}
            formatter={(value) => [`${value}%`]}
          />
          <Bar dataKey="india" name="India" fill="url(#gdpIndiaBar)" radius={[4, 4, 0, 0]} isAnimationActive={false}>
            <LabelList dataKey="india" position="top" fill="#00e5ff" fontSize={11} fontWeight={700} formatter={(v) => `${v}%`} />
          </Bar>
          <Bar dataKey="world" name="World" fill="url(#gdpWorldBar)" radius={[4, 4, 0, 0]} isAnimationActive={false}>
            <LabelList dataKey="world" position="top" fill="#f59e0b" fontSize={11} fontWeight={700} formatter={(v) => `${v}%`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
