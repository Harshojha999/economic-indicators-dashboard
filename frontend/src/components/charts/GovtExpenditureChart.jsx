import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function GovtExpenditureChart({ data = [] }) {
  const chartData = data.length > 0 ? data : [
    { year: '2021', revenue: 21.2, capital: 10.0 },
    { year: '2022', revenue: 23.2, capital: 8.0 },
    { year: '2023', revenue: 23.2, capital: 8.0 },
    { year: '2024', revenue: 23.2, capital: 8.0 },
    { year: '2025', revenue: 23.2, capital: 8.0 }
  ];

  return (
    <div style={{ width: '100%', height: 330 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px', marginBottom: '8px', fontSize: '11px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: 8, height: 8, backgroundColor: '#0077b6', borderRadius: 2 }} />
          <span style={{ color: '#94a3b8' }}>Revenue Expenditure</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: 8, height: 8, backgroundColor: '#f59e0b', borderRadius: 2 }} />
          <span style={{ color: '#94a3b8' }}>Capital Expenditure</span>
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
            tick={{ fill: '#94a3b8', fontSize: 11 }} 
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#0077b6', borderRadius: 8, color: '#fff' }}
          />
          <Bar dataKey="revenue" name="Revenue Expenditure" stackId="a" fill="#0077b6" radius={[0, 0, 0, 0]} />
          <Bar dataKey="capital" name="Capital Expenditure" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
