"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";

const data = [
  { month: "Jan", thisWeek: 7500, lastWeek: 6500 },
  { month: "Feb", thisWeek: 5000, lastWeek: 7000 },
  { month: "Mar", thisWeek: 4000, lastWeek: 5000 },
  { month: "Apr", thisWeek: 7800, lastWeek: 6000 },
  { month: "May", thisWeek: 6500, lastWeek: 5500 },
  { month: "Jun", thisWeek: 4500, lastWeek: 4000 },
  { month: "Jul", thisWeek: 6700, lastWeek: 5700 },
  { month: "Aug", thisWeek: 7200, lastWeek: 6200 },
  { month: "Sep", thisWeek: 6300, lastWeek: 5300 },
  { month: "Oct", thisWeek: 6800, lastWeek: 5800 },
  { month: "Nov", thisWeek: 4200, lastWeek: 3200 },
  { month: "Dec", thisWeek: 5900, lastWeek: 4900 },
];

const ExpensesChart = () => {
  const [comparison] = useState("Monthly Comparison");

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <select className="bg-transparent border-none text-sm font-medium text-gray-600">
          <option>Monthly Comparison</option>
          <option>Weekly Comparison</option>
          <option>Daily Comparison</option>
        </select>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded"></div>
            <span className="text-gray-600">This Week</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200 rounded"></div>
            <span className="text-gray-600">Last Week</span>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              cursor={false}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "0.375rem",
                padding: "8px",
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, "Amount"]}
            />
            <Bar
              dataKey="lastWeek"
              fill="#E5E7EB"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="thisWeek"
              fill="#10B981"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpensesChart;
