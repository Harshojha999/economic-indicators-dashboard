import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, LabelList } from 'recharts';

export default function InflationChart({ data = [] }) {
  // Calibrated trajectory matching reference Image 1:
  // Fluctuating inflation line starting at 8.2% in 2021, dipping to 2.8% in 2023, rising to 5.4% in 2025
  const chartData = (data && data.length > 0) ? data : [
    { year: '2021', cpi: 8.2, label: '8.2%' },
    { year: '2021.3', cpi: 6.8 },
    { year: '2021.7', cpi: 7.4 },
    { year: '2022', cpi: 5.8, label: '5.8%' },
    { year: '2022.4', cpi: 4.6 },
    { year: '2022.8', cpi: 5.1 },
    { year: '2023', cpi: 2.8, label: '2.8%' },
    { year: '2023.6', cpi: 3.0 },
    { year: '2024', cpi: 3.2, label: '3.2%' },
    { year: '2024.5', cpi: 4.2 },
    { year: '2025', cpi: 5.4, label: '5.4%' }
  ];

  return (
    <div style={{ width: '100%', height: 330, display: 'flex', flexDirection: 'column' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 22, right: 12, left: -20, bottom: 2 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" vertical={true} horizontal={true} />
          <XAxis 
            dataKey="year" 
            ticks={['2021', '2022', '2023', '2024', '2025']}
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
            formatter={(value) => [`${value}%`, 'Inflation Rate']}
          />
          <Line 
            type="linear" 
            dataKey="cpi" 
            name="Inflation Rate" 
            stroke="#00e5ff" 
            strokeWidth={2.5} 
            dot={(props) => {
              const { cx, cy, payload } = props;
              if (!payload.label) return null;
              return (
                <circle 
                  key={`dot-${payload.year}`}
                  cx={cx} 
                  cy={cy} 
                  r={4} 
                  fill="#00e5ff" 
                  stroke="#070d18" 
                  strokeWidth={2} 
                />
              );
            }} 
            activeDot={{ r: 6, fill: '#00e5ff', stroke: '#fff', strokeWidth: 2 }}
            isAnimationActive={false}
          >
            <LabelList 
              dataKey="label" 
              position="top" 
              offset={8} 
              fill="#00e5ff" 
              fontSize={11} 
              fontWeight={700} 
            />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
