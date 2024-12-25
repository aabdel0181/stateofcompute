'use client';

import { motion } from 'framer-motion';
import type { GPUMetrics } from '../../types/metrics';

interface NetworkHealthProps {
  data: GPUMetrics[];
}

export const NetworkHealth: React.FC<NetworkHealthProps> = ({ data }) => {
  const averageHealth = data.reduce((acc, curr) => acc + curr.networkHealth, 0) / data.length;

  return (
    <div className="p-6 rounded-lg bg-gray-800 border border-gray-700">
      <h3 className="text-xl mb-4">Network Health</h3>
      <div className="relative h-[300px] flex items-center justify-center">
        <motion.div
          className="w-32 h-32 rounded-full border-4"
          style={{
            borderColor: averageHealth > 90 ? '#4ade80' : '#ef4444',
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <div className="flex items-center justify-center h-full">
            <span className="text-2xl font-bold">{averageHealth.toFixed(1)}%</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};