'use client';

import { motion } from 'framer-motion';
import { Globe } from './Globe';
import { PriceComparisonChart } from './charts/PriceComparison';
import { NetworkHealth } from './charts/NetworkHealth';
import { HistoricalPerformance } from './charts/HistoricalPerformance';
import { MetricCounter } from './MetricCounter';
import { ParticleBackground } from './ParticleBackground';
import { SkeletonLoader } from './SkeletonLoader';
import type { GPUMetrics } from '@/types/metrics';

interface AnalyticsDashboardProps {
  data: GPUMetrics[];
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ data }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <ParticleBackground />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section with Globe */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            GPU Network Analytics
          </h1>
          <div className="bg-gray-800 rounded-lg p-4">
            <Globe data={data} />
          </div>
        </section>

        {/* Metrics Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <MetricCounter
            label="Total GPUs"
            value={data.reduce((acc, curr) => acc + curr.gpuCount, 0)}
          />
          <MetricCounter
            label="Active Users"
            value={new Set(data.map(d => d.userId)).size}
          />
          <MetricCounter
            label="Avg. Utilization"
            value={data.reduce((acc, curr) => acc + curr.utilization, 0) / data.length}
            suffix="%"
          />
        </section>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PriceComparisonChart data={data} />
          <NetworkHealth data={data} />
          <HistoricalPerformance data={data} />
        </div>
      </main>
    </div>
  );
};