'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp, FiArrowDown, FiSearch, FiFilter } from 'react-icons/fi';
import type { GPUMetrics } from '../../types/metrics';

interface ProviderLeaderboardProps {
  data: GPUMetrics[];
  isLoading: boolean;
}

type SortField = 'userId' | 'network' | 'gpuCount' | 'utilization' | 'networkHealth' | 'currentPrice' | 'revenue' | 'status';
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
  const columns: { key: SortField; label: string }[] = [
    { key: 'userId', label: 'Provider ID' }, // Adjust if needed
    { key: 'network', label: 'Network' },    // Adjust if needed
    { key: 'gpuCount', label: 'GPUs' },
    { key: 'utilization', label: 'Utilization' },
    { key: 'networkHealth', label: 'Reliability' },
    { key: 'currentPrice', label: 'Price/Hour' },
    { key: 'revenue', label: 'Revenue (30d)' },
    { key: 'status', label: 'Status' }        // Adjust if needed
  ];

  // Process and aggregate data by provider (userId)
  const processedData = useMemo(() => {
    const providerMap = new Map<string, any>();
    
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
          network: metric.network || 'Unknown',
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
    return [...processedData]
      .filter(provider => 
        provider.userId.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === 'all' || provider.status === statusFilter)
      )
      .sort((a, b) => {
        let aValue = a[sortField as keyof typeof a];
        let bValue = b[sortField as keyof typeof b];
        
        // Handle revenue calculation
        if (sortField === 'revenue') {
          aValue = (a.currentPrice || 0) * (a.utilization || 0) * 720;
          bValue = (b.currentPrice || 0) * (b.utilization || 0) * 720;
        }

        if (typeof aValue === 'string') {
          return sortDirection === 'asc' 
            ? String(aValue).localeCompare(String(bValue))
            : String(bValue).localeCompare(String(aValue));
        }
        
        return sortDirection === 'asc' 
          ? Number(aValue || 0) - Number(bValue || 0)
          : Number(bValue || 0) - Number(aValue || 0);
      });
    }, [processedData, sortField, sortDirection, searchTerm, statusFilter]);

  const formatValue = (value: number | undefined, type: 'percentage' | 'price' | 'number') => {
    if (value === undefined) return '-';
    switch (type) {
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'price':
        return `$${value.toFixed(2)}`;
      case 'number':
        return value.toLocaleString();
      default:
        return value;
    }
  };
  const handleSort = (key: SortField) => {
    if (sortField === key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(key);
      setSortDirection('desc');
    }
  };


  const SortIcon = ({ field }: { field: SortField }) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? <FiArrowUp className="ml-1" /> : <FiArrowDown className="ml-1" />;
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800">
          Provider Leaderboard
        </span>
      </h2>
      
      <div className="glass-card rounded-lg p-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search providers..."
              className="w-full bg-black/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400
                       border border-gray-800 focus:border-red-500 focus:outline-none transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400" />
            <select
              className="bg-black/30 rounded-lg px-4 py-2 text-white border border-gray-800 
                         focus:border-red-500 focus:outline-none transition-colors"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-800">
                {columns.map(column => (
                  <th 
                    key={column.key}
                    className="pb-4 font-semibold text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
                    onClick={() => handleSort(column.key)}
                  >
                    <div className="flex items-center gap-2">
                      {column.label}
                      {sortField === column.key && (
                        <span className="text-red-500">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8">
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
                    className="border-b border-gray-800/50 hover:bg-black/30 transition-colors"
                  >
                    <td className="py-4">{provider.userId}</td>
                    <td className="py-4">{provider.network || 'Unknown'}</td>
                    <td className="py-4">{formatValue(provider.gpuCount, 'number')}</td>
                    <td className="py-4">{formatValue(provider.utilization, 'percentage')}</td>
                    <td className="py-4">{formatValue(provider.networkHealth, 'percentage')}</td>
                    <td className="py-4">{formatValue(provider.currentPrice, 'price')}</td>
                    <td className="py-4">
                      {formatValue(
                        provider.currentPrice && provider.utilization 
                          ? provider.currentPrice * provider.utilization * 720 
                          : undefined, 
                        'price'
                      )}k
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        provider.status === 'active' 
                          ? 'bg-green-500/20 text-green-500' 
                          : 'bg-gray-500/20 text-gray-500'
                      }`}>
                        {provider.status || 'Unknown'}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};