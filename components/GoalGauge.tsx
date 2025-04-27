"use client";

import React, { useEffect, useState } from "react";

interface GoalGaugeProps {
  value: number;
}

const GoalGauge: React.FC<GoalGaugeProps> = ({ value }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const radius = 80;
  const strokeWidth = 14;
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (currentValue / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentValue(normalizedValue);
    }, 100);
    return () => clearTimeout(timer);
  }, [normalizedValue]);

  return (
    <div className="relative flex justify-center items-center">
      <svg className="transform -rotate-90 w-48 h-24">
        {/* Background track */}
        <path
          d="M 40,80 A 40,40 0 1,1 120,80"
          fill="none"
          stroke="#f3f4f6"
          strokeWidth={strokeWidth}
          className="transition-all duration-300"
        />
        {/* Progress track with gradient */}
        <defs>
          <linearGradient
            id="progressGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        <path
          d="M 40,80 A 40,40 0 1,1 120,80"
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out drop-shadow-lg"
        />
      </svg>
      <div className="absolute flex flex-col items-center gap-1">
        <span className="text-3xl font-bold text-gray-800">
          {Math.round(currentValue)}%
        </span>
        <span className="text-sm text-gray-500 font-medium">
          Target vs Achievement
        </span>
      </div>
    </div>
  );
};

export default GoalGauge;
