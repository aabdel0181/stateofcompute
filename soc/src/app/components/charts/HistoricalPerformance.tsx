'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { GPUMetrics } from '../../types/metrics';

interface HistoricalPerformanceProps {
  data: GPUMetrics[];
}

export const HistoricalPerformance: React.FC<HistoricalPerformanceProps> = ({ data }) => {
  return (
    <div className="p-6 rounded-lg bg-gray-800 border border-gray-700">
      <h3 className="text-xl mb-4">Historical Performance</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="utilization" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};