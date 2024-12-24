'use client';

import { motion } from 'framer-motion';
import { Globe } from './Globe';
import { MetricCounter } from './MetricCounter';
import { ParticleBackground } from './ParticleBackground';
import type { GPUMetrics } from '@/types/metrics';

interface AnalyticsDashboardProps {
  data: GPUMetrics[];
}
export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ data }) => {
    return (
      <div className="relative min-h-screen bg-black"> {/* Changed to bg-black */}
        <ParticleBackground />
        
        <main className="relative z-10">
          <header className="pt-8 pb-16 px-4">
            <h1 className="text-5xl font-bold text-center text-gradient">
              The State of DePIN
            </h1>
          </header>
  
          <div className="container mx-auto px-4">
            <div className="relative h-[80vh] mb-12">
              <div className="absolute inset-0">
                <Globe data={data} />
              </div>
              
              <div className="absolute top-4 left-4 right-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricCounter
                  label="Total GPUs"
                  value={data.reduce((acc, curr) => acc + curr.gpuCount, 0)}
                  theme="glass"
                />
                <MetricCounter
                  label="Active Users"
                  value={new Set(data.map(d => d.userId)).size}
                  theme="glass"
                />
                <MetricCounter
                  label="Network Health"
                  value={data.reduce((acc, curr) => acc + curr.networkHealth, 0) / data.length}
                  suffix="%"
                  theme="glass"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  };