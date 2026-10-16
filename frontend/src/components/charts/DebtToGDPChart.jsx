import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function DebtToGDPChart({ data = [] }) {
  const chartData = data.length > 0 ? data : [
    { date: '25 Jul', ratio: 78.0 },
    { date: '28 Jul', ratio: 88.0 },
    { date: '1 Aug', ratio: 65.0 },
    { date: '8 Aug', ratio: 54.0 },
    { date: '15 Aug', ratio: 65.0 },
    { date: '22 Aug', ratio: 72.0 }
  ];

  return (
    <div style={{ width: '100%', height: 330 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="debtGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.35}/>
              <stop offset="95%" stopColor="#00e5ff" stopOpacity={0.0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="#64748b" 
            tick={{ fill: '#94a3b8', fontSize: 11 }} 
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          />
          <YAxis 
            unit="%" 
            stroke="#64748b" 
            domain={[50, 100]}
            ticks={[50, 60, 70, 80, 90, 100]}
            tick={{ fill: '#94a3b8', fontSize: 11 }} 
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#00e5ff', borderRadius: 8, color: '#fff' }}
            formatter={(value) => [`${value}%`, 'Debt Ratio']}
          />
          <Area 
            type="monotone" 
            dataKey="ratio" 
            stroke="#00e5ff" 
            strokeWidth={2.5} 
            fillOpacity={1} 
            fill="url(#debtGlow)" 
            dot={{ stroke: '#00e5ff', strokeWidth: 2, fill: '#0a192f', r: 4 }}
            activeDot={{ r: 6, fill: '#00e5ff' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
