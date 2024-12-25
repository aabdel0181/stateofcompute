'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { GPUMetrics } from '@/types/metrics';

interface PriceComparisonProps {
  data: GPUMetrics[];
}

export const PriceComparisonChart: React.FC<PriceComparisonProps> = ({ data }) => {
  return (
    <div className="p-6 rounded-lg bg-gray-800 border border-gray-700">
      <h3 className="text-xl mb-4">Price Comparison</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};