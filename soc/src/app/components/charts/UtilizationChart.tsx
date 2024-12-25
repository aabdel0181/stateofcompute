'use client';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';
import type { GPUMetrics } from '../../types/metrics';

ChartJS.register(ArcElement, Tooltip, Legend);

interface UtilizationChartProps {
  data: GPUMetrics[];
  isLoading: boolean;
}

export const UtilizationChart: React.FC<UtilizationChartProps> = ({ data, isLoading }) => {
  const utilizationRanges = {
    high: data.filter(d => d.utilization >= 80).length,
    medium: data.filter(d => d.utilization >= 50 && d.utilization < 80).length,
    low: data.filter(d => d.utilization < 50).length,
  };

  const chartData = {
    labels: ['High Utilization (>80%)', 'Medium Utilization (50-80%)', 'Low Utilization (<50%)'],
    datasets: [{
      data: [utilizationRanges.high, utilizationRanges.medium, utilizationRanges.low],
      backgroundColor: [
        'rgba(204, 0, 0, 0.8)',   // Dark Red
        'rgba(255, 99, 132, 0.8)', // Pink
        'rgba(255, 159, 164, 0.8)' // Light Pink
      ],
      borderColor: [
        'rgba(204, 0, 0, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 159, 164, 1)'
      ],
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'white',
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} GPUs (${percentage}%)`;
          }
        }
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full flex items-center justify-center p-4"
    >
      <div className="w-full max-w-[600px] h-full">
        <Pie data={chartData} options={options} />
      </div>
    </motion.div>
  );
};