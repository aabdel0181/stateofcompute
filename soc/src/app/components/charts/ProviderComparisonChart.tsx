'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { motion } from 'framer-motion';
import type { GPUMetrics } from '@/types/metrics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ProviderComparisonChartProps {
  data: GPUMetrics[];
  isLoading: boolean;
}

export const ProviderComparisonChart: React.FC<ProviderComparisonChartProps> = ({ 
  data, 
  isLoading 
}) => {
  // Mock data for comparison - replace with real data
  const chartData = {
    labels: ['GPU Availability', 'Cost Efficiency', 'Network Performance'],
    datasets: [
      {
        label: 'Decentralized Network',
        data: [95, 85, 78],
        backgroundColor: 'rgba(204, 0, 0, 0.8)',
        borderColor: 'rgba(204, 0, 0, 1)',
        borderWidth: 1,
      },
      {
        label: 'Traditional Cloud',
        data: [75, 65, 90],
        backgroundColor: 'rgba(53, 162, 235, 0.8)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'white',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.raw}%`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'white',
        },
      },
    },
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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="h-[400px] flex items-center justify-center"
    >
      <Bar data={chartData} options={options} />
    </motion.div>
  );
};