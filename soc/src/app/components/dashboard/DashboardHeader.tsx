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
    const metrics = {
      totalGPUs: data.reduce((acc, curr) => acc + curr.gpuCount, 0),
      totalProviders: new Set(data.map(d => d.userId)).size,
      avgUtilization: data.reduce((acc, curr) => acc + curr.utilization, 0) / data.length,
      marketCap: data.reduce((acc, curr) => acc + (curr.gpuCount * curr.currentPrice), 0),
    };
  
    const changes = {
      gpus: 12.5,        // Weekly growth in total GPUs
      providers: 8.3,    // Weekly growth in providers
      utilization: 15.2, // Weekly change in utilization
      marketCap: 22.4,   // Weekly growth in market cap
    };
  
    return (
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-5xl font-bold mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800">
              DePIN GPU Analytics
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Global insights across all decentralized GPU networks
          </motion.p>
        </motion.div>
  
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
            title="Active Providers"
            value={metrics.totalProviders.toLocaleString()}
            change={changes.providers}
            icon={<FiUsers className="w-6 h-6" />}
            isLoading={isLoading}
            delay={0.2}
          />
          <MetricCard
            title="Network Utilization"
            value={`${metrics.avgUtilization.toFixed(1)}%`}
            change={changes.utilization}
            icon={<FiActivity className="w-6 h-6" />}
            isLoading={isLoading}
            delay={0.3}
          />
          <MetricCard
            title="Market Cap"
            value={`$${(metrics.marketCap/1000000).toFixed(2)}M`}
            change={changes.marketCap}
            icon={<FiDollarSign className="w-6 h-6" />}
            isLoading={isLoading}
            delay={0.4}
          />
        </div>
      </div>
    );
  };