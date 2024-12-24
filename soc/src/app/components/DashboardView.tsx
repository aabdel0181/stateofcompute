'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MetricsCarousel } from './dashboard/MetricsCarousel';
import { ProviderLeaderboard } from './dashboard/ProviderLeaderboard';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { ParticleBackground } from './ParticleBackground';
import type { GPUMetrics } from '@/types/metrics';

interface DashboardViewProps {
  data: GPUMetrics[];
}
export const DashboardView: React.FC<DashboardViewProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <ParticleBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Dashboard Header */}
        <DashboardHeader data={data} isLoading={isLoading} />

        {/* Metrics Carousel */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 w-full"
        >
          <MetricsCarousel data={data} isLoading={isLoading} />
        </motion.section>

        {/* Provider Leaderboard */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ProviderLeaderboard data={data} isLoading={isLoading} />
        </motion.section>
      </div>
    </div>
  );
};