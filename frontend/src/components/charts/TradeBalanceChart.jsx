import React from 'react';
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function TradeBalanceChart({ data = [] }) {
  const chartData = data.length > 0 ? data : [
    { year: '2021', imports: 8.7, exports: 6.3, trade_balance: 2.5 },
    { year: '2022', imports: 8.7, exports: 4.7, trade_balance: 2.1 },
    { year: '2023', imports: 8.7, exports: 4.7, trade_balance: 1.8 },
    { year: '2024', imports: 8.7, exports: 6.3, trade_balance: 1.2 },
    { year: '2025', imports: 8.7, exports: 4.7, trade_balance: 0.8 }
  ];

  return (
    <div style={{ width: '100%', height: 260 }}>
      {/* Legend matching Figma */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px', marginBottom: '8px', fontSize: '11px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: 8, height: 8, backgroundColor: '#00b4d8', borderRadius: 2 }} />
          <span style={{ color: '#94a3b8' }}>Imports</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: 8, height: 8, backgroundColor: '#f59e0b', borderRadius: 2 }} />
          <span style={{ color: '#94a3b8' }}>Exports</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: 12, height: 2, backgroundColor: '#00e599' }} />
          <span style={{ color: '#00e599' }}>Trade Balance</span>
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
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#00e599', borderRadius: 8, color: '#fff' }}
          />
          <Bar dataKey="imports" name="Imports" fill="#00b4d8" radius={[4, 4, 0, 0]} />
          <Bar dataKey="exports" name="Exports" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          <Line 
            type="monotone" 
            dataKey="trade_balance" 
            name="Trade Balance" 
            stroke="#00e599" 
            strokeWidth={2.5} 
            dot={{ r: 4, fill: '#00e599' }} 
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
