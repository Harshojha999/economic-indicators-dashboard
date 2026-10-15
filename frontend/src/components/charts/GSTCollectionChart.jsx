import React from 'react';
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function GSTCollectionChart({ data = [] }) {
  const chartData = data.length > 0 ? data : [
    { year: '2021', collection: 8.7, average: 2.1 },
    { year: '2022', collection: 6.7, average: 2.6 },
    { year: '2023', collection: 8.7, average: 3.7 },
    { year: '2024', collection: 8.7, average: 3.8 },
    { year: '2025', collection: 6.7, average: 3.2 }
  ];

  return (
    <div style={{ width: '100%', height: 260 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px', marginBottom: '8px', fontSize: '11px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: 8, height: 8, backgroundColor: '#00b4d8', borderRadius: 2 }} />
          <span style={{ color: '#94a3b8' }}>GST Collections</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: 12, height: 2, backgroundColor: '#facc15' }} />
          <span style={{ color: '#facc15' }}>Monthly Avg</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#facc15', borderRadius: 8, color: '#fff' }}
          />
          <Bar dataKey="collection" name="GST Collections" fill="#00b4d8" radius={[4, 4, 0, 0]} />
          <Line 
            type="monotone" 
            dataKey="average" 
            name="Monthly Average" 
            stroke="#facc15" 
            strokeWidth={2.5} 
            dot={{ r: 4, fill: '#facc15' }} 
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
