'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { motion } from 'framer-motion';
import type { GPUMetrics } from '../../types/metrics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface GrowthChartProps {
  data: GPUMetrics[];
  isLoading: boolean;
}

export const GrowthChart: React.FC<GrowthChartProps> = ({ data, isLoading }) => {
  // Mock growth data - replace with real data
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total GPUs',
        data: [1200, 1900, 3000, 5000, 8000, 12000],
        borderColor: 'rgb(204, 0, 0)',
        backgroundColor: 'rgba(204, 0, 0, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
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
            return `GPUs: ${context.raw.toLocaleString()}`;
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
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
          callback: function(value: any) {
            return value.toLocaleString();
          }
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-[400px] flex items-center justify-center"
    >
      <Line data={chartData} options={options} />
    </motion.div>
  );
};