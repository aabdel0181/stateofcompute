'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiCpu, FiUsers, FiActivity, FiDollarSign } from 'react-icons/fi';
import type { GPUMetrics } from '@/types/metrics';

interface DashboardHeaderProps {
  data: GPUMetrics[];
  isLoading: boolean;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  isLoading: boolean;
  delay: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon, isLoading, delay }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ scale: 1.05 }}
        className="glass-card rounded-lg p-6"
      >
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-24 mb-4" />
            <div className="h-8 bg-gray-700 rounded w-32" />
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-lg">{title}</span>
              <span className="text-primary">{icon}</span>
            </div>
            <div className="flex flex-col">
              <div className="text-3xl font-bold text-primary mb-2">{value}</div>
              <div className={`text-sm flex items-center ${
                change >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                <span className="mr-1">
                  {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
                </span>
                <span className="text-gray-500">vs last week</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ data, isLoading }) => {
    const [metrics, setMetrics] = useState({
    totalGPUs: 0,
    activeUsers: 0,
    networkHealth: 0,
    avgCost: 0,
  });

  useEffect(() => {
    if (data.length > 0) {
      // Calculate metrics from data
      const totalGPUs = data.reduce((acc, curr) => acc + curr.gpuCount, 0);
      const activeUsers = new Set(data.map(d => d.userId)).size;
      const avgHealth = data.reduce((acc, curr) => acc + curr.networkHealth, 0) / data.length;
      const avgCost = data.reduce((acc, curr) => acc + parseFloat(curr.pricing.currentPrice), 0) / data.length;

      setMetrics({
        totalGPUs,
        activeUsers,
        networkHealth: Math.round(avgHealth),
        avgCost: Number(avgCost.toFixed(2)),
      });
    }
  }, [data]);

  // Mock weekly changes (replace with real data)
  const changes = {
    gpus: 12.5,
    users: 8.3,
    health: -2.1,
    cost: -5.4,
  };

  return (
    <div className="mb-12">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-5xl font-bold mb-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800">
            Network Analytics
          </span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-gray-400 max-w-2xl mx-auto"
        >
          Real-time metrics and performance insights across major networks
        </motion.p>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total GPUs"
          value={metrics.totalGPUs.toLocaleString()}
          change={changes.gpus}
          icon={<FiCpu className="w-6 h-6" />}
          isLoading={isLoading}
          delay={0.1}
        />
        <MetricCard
          title="Active Users"
          value={metrics.activeUsers.toLocaleString()}
          change={changes.users}
          icon={<FiUsers className="w-6 h-6" />}
          isLoading={isLoading}
          delay={0.2}
        />
        <MetricCard
          title="Network Health"
          value={`${metrics.networkHealth}%`}
          change={changes.health}
          icon={<FiActivity className="w-6 h-6" />}
          isLoading={isLoading}
          delay={0.3}
        />
        <MetricCard
          title="Average Cost/Hour"
          value={`$${metrics.avgCost}`}
          change={changes.cost}
          icon={<FiDollarSign className="w-6 h-6" />}
          isLoading={isLoading}
          delay={0.4}
        />
      </div>
    </div>

  );
};