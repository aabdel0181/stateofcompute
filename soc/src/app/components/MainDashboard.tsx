'use client';

import type { GPUMetrics } from '@/types/metrics';

interface MainDashboardProps {
  data: GPUMetrics[];
}

export const MainDashboard: React.FC<MainDashboardProps> = ({ data }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gradient mb-8">
        Network Dashboard
      </h1>
      
      {/* Add your main dashboard content here */}
    </div>
  );
};