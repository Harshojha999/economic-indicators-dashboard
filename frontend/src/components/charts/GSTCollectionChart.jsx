import React from 'react';
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid, LabelList } from 'recharts';

export default function GSTCollectionChart({ data = [] }) {
  const chartData = data.length > 0 ? data : [
    { year: '2021', collection: 8.7, average: 2.1 },
    { year: '2022', collection: 6.7, average: 2.6 },
    { year: '2023', collection: 8.7, average: 3.7 },
    { year: '2024', collection: 8.7, average: 3.8 },
    { year: '2025', collection: 6.7, average: 3.2 }
  ];

  return (
    <div style={{ width: '100%', height: 330, display: 'flex', flexDirection: 'column' }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 18, right: 8, left: -20, bottom: 2 }}>
          <defs>
            <linearGradient id="gstCollectionBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity={1} />
              <stop offset="100%" stopColor="#0077b6" stopOpacity={0.85} />
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
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#facc15', borderRadius: 8, color: '#fff', boxShadow: '0 8px 24px rgba(0,0,0,0.6)' }}
          />
          <Bar dataKey="collection" name="GST Collections" fill="url(#gstCollectionBar)" radius={[4, 4, 0, 0]} barSize={42} isAnimationActive={false}>
            <LabelList dataKey="collection" position="top" fill="#00e5ff" fontSize={11} fontWeight={700} formatter={(v) => `${v}%`} />
          </Bar>
          <Line 
            type="monotone" 
            dataKey="average" 
            name="Monthly Average" 
            stroke="#facc15" 
            strokeWidth={2.5} 
            dot={{ r: 4.5, fill: '#facc15', stroke: '#070d18', strokeWidth: 1.5 }} 
            activeDot={{ r: 6, fill: '#facc15', stroke: '#fff', strokeWidth: 2 }}
            isAnimationActive={false}
          >
            <LabelList dataKey="average" position="bottom" offset={8} fill="#facc15" fontSize={10.5} fontWeight={700} formatter={(v) => `${v}%`} />
          </Line>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
