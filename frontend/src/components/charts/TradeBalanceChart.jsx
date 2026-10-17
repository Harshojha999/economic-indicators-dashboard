import React from 'react';
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid, LabelList } from 'recharts';

export default function TradeBalanceChart({ data = [] }) {
  const chartData = data.length > 0 ? data : [
    { year: '2021', imports: 8.7, exports: 6.3, trade_balance: 2.5 },
    { year: '2022', imports: 8.7, exports: 4.7, trade_balance: 2.1 },
    { year: '2023', imports: 8.7, exports: 4.7, trade_balance: 1.8 },
    { year: '2024', imports: 8.7, exports: 6.3, trade_balance: 1.2 },
    { year: '2025', imports: 8.7, exports: 4.7, trade_balance: 0.8 }
  ];

  return (
    <div style={{ width: '100%', height: 330, display: 'flex', flexDirection: 'column' }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 18, right: 8, left: -20, bottom: 2 }} barGap={5}>
          <defs>
            <linearGradient id="tradeImportsBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity={1} />
              <stop offset="100%" stopColor="#0077b6" stopOpacity={0.85} />
            </linearGradient>
            <linearGradient id="tradeExportsBar" x1="0" y1="0" x2="0" y2="1">
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
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#00e599', borderRadius: 8, color: '#fff', boxShadow: '0 8px 24px rgba(0,0,0,0.6)' }}
          />
          <Bar dataKey="imports" name="Imports" fill="url(#tradeImportsBar)" radius={[4, 4, 0, 0]} isAnimationActive={false}>
            <LabelList dataKey="imports" position="top" fill="#00e5ff" fontSize={11} fontWeight={700} formatter={(v) => `${v}%`} />
          </Bar>
          <Bar dataKey="exports" name="Exports" fill="url(#tradeExportsBar)" radius={[4, 4, 0, 0]} isAnimationActive={false}>
            <LabelList dataKey="exports" position="top" fill="#f59e0b" fontSize={11} fontWeight={700} formatter={(v) => `${v}%`} />
          </Bar>
          <Line 
            type="monotone" 
            dataKey="trade_balance" 
            name="Trade Balance" 
            stroke="#00e599" 
            strokeWidth={2.5} 
            dot={{ r: 4.5, fill: '#00e599', stroke: '#070d18', strokeWidth: 1.5 }} 
            activeDot={{ r: 6, fill: '#00e599', stroke: '#fff', strokeWidth: 2 }}
            isAnimationActive={false}
          >
            <LabelList dataKey="trade_balance" position="bottom" offset={8} fill="#00e599" fontSize={10.5} fontWeight={700} formatter={(v) => `${v}%`} />
          </Line>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
