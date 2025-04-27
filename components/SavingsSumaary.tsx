"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'May 01', amount: 2000 },
  { date: 'May 05', amount: 3000 },
  { date: 'May 10', amount: 2800 },
  { date: 'May 15', amount: 3200 },
  { date: 'May 20', amount: 2900 },
  { date: 'May 25', amount: 3500 },
  { date: 'May 30', amount: 3300 },
];

const SavingsSummary = () => {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem',
            }}
            formatter={(value) => [`$${value}`, 'Amount']}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SavingsSummary;