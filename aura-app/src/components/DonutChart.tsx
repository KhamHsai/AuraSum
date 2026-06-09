import React from 'react';
import { Category } from '../types';
import { CATEGORY_COLORS } from '../utils/categories';
import './DonutChart.css';

interface DonutSlice {
  category: Category;
  value: number;
  percentage: number;
}

interface DonutChartProps {
  slices: DonutSlice[];
  total: number;
  centerLabel: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({ slices, total, centerLabel }) => {
  const radius = 70;
  const cx = 90;
  const cy = 90;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius;

  let cumulativeOffset = 0;

  const segments = slices.map(slice => {
    const dashArray = (slice.percentage / 100) * circumference;
    const dashOffset = circumference - cumulativeOffset;
    cumulativeOffset += dashArray;
    return { ...slice, dashArray, dashOffset };
  });

  return (
    <div className="donut-wrapper">
      <svg width="180" height="180" viewBox="0 0 180 180" className="donut-svg">
        {/* background ring */}
        <circle
          cx={cx} cy={cy} r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
        />
        {segments.map((seg, i) => (
          <circle
            key={seg.category}
            cx={cx} cy={cy} r={radius}
            fill="none"
            stroke={CATEGORY_COLORS[seg.category]}
            strokeWidth={strokeWidth}
            strokeDasharray={`${seg.dashArray} ${circumference - seg.dashArray}`}
            strokeDashoffset={seg.dashOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
            className="donut-segment"
            style={{ animationDelay: `${i * 0.08}s` }}
          />
        ))}
        <text x={cx} y={cy - 8} textAnchor="middle" className="donut-center-value">
          {centerLabel}
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" className="donut-center-sub">
          total
        </text>
      </svg>
    </div>
  );
};
