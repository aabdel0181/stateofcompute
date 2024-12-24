'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp, FiArrowDown, FiSearch, FiFilter } from 'react-icons/fi';
import type { GPUMetrics } from '@/types/metrics';

interface ProviderLeaderboardProps {
  data: GPUMetrics[];
  isLoading: boolean;
}

type SortField = 'utilization' | 'networkHealth' | 'gpuCount' | 'currentPrice';
type SortDirection = 'asc' | 'desc';

interface ProviderData {
  userId: string;
  utilization: number;
  networkHealth: number;
  gpuCount: number;
  currentPrice: number;
  status: string;
}

export const ProviderLeaderboard: React.FC<ProviderLeaderboardProps> = ({ data, isLoading }) => {
  const [sortField, setSortField] = useState<SortField>('utilization');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // Process and aggregate data by provider (userId)
  const processedData = useMemo(() => {
    const providerMap = new Map<string, ProviderData>();
    
    data.forEach(metric => {
      const existing = providerMap.get(metric.userId);
      if (existing) {
        existing.utilization = (existing.utilization + metric.utilization) / 2;
        existing.networkHealth = (existing.networkHealth + metric.networkHealth) / 2;
        existing.gpuCount += metric.gpuCount;
        existing.currentPrice = (existing.currentPrice + parseFloat(metric.pricing.currentPrice)) / 2;
      } else {
        providerMap.set(metric.userId, {
          userId: metric.userId,
          utilization: metric.utilization,
          networkHealth: metric.networkHealth,
          gpuCount: metric.gpuCount,
          currentPrice: parseFloat(metric.pricing.currentPrice),
          status: metric.status
        });
      }
    });

    return Array.from(providerMap.values());
  }, [data]);

  // Filter and sort data
  const sortedData = useMemo(() => {
    return processedData
      .filter(provider => 
        provider.userId.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === 'all' || provider.status === statusFilter)
      )
      .sort((a, b) => {
        const multiplier = sortDirection === 'asc' ? 1 : -1;
        return (a[sortField] - b[sortField]) * multiplier;
      });
  }, [processedData, sortField, sortDirection, searchTerm, statusFilter]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? <FiArrowUp className="ml-1" /> : <FiArrowDown className="ml-1" />;
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
      <h2 className="text-2xl font-bold mb-6">Provider Leaderboard</h2>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search providers..."
            className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <FiFilter className="text-gray-400" />
          <select
            className="bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-800">
              <th className="pb-4 font-semibold text-gray-400">Provider ID</th>
              {[
                { key: 'utilization' as SortField, label: 'Utilization' },
                { key: 'networkHealth' as SortField, label: 'Health' },
                { key: 'gpuCount' as SortField, label: 'GPUs' },
                { key: 'currentPrice' as SortField, label: 'Cost/Hr' },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  className="pb-4 font-semibold text-gray-400 cursor-pointer"
                  onClick={() => handleSort(key)}
                >
                  <div className="flex items-center">
                    {label}
                    <SortIcon field={key} />
                  </div>
                </th>
              ))}
              <th className="pb-4 font-semibold text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto" />
                  </td>
                </tr>
              ) : sortedData.map((provider, index) => (
                <motion.tr
                  key={provider.userId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-4">{provider.userId}</td>
                  <td className="py-4">{provider.utilization.toFixed(1)}%</td>
                  <td className="py-4">{provider.networkHealth.toFixed(1)}%</td>
                  <td className="py-4">{provider.gpuCount}</td>
                  <td className="py-4">${provider.currentPrice.toFixed(2)}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      provider.status === 'active' 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-gray-500/20 text-gray-500'
                    }`}>
                      {provider.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};