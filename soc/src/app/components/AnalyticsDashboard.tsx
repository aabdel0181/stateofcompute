'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react'; // Add useEffect here
import { Globe } from './Globe';
import { MetricCounter } from './MetricCounter';
import { ParticleBackground } from './ParticleBackground';
import type { GPUMetrics } from '@/types/metrics';

interface AnalyticsDashboardProps {
  data: GPUMetrics[];
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ data }) => {
  const [showButton, setShowButton] = useState(false);

  // Show button after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2000); // 2 second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <header className="pt-8 pb-16 px-4">
        <h1 className="text-5xl font-bold text-center text-gradient">
          The State of DePIN
        </h1>
      </header>

      <div className="container mx-auto px-4">
        <div className="relative h-[80vh]">
          <div className="absolute inset-0 -z-0">
            <ParticleBackground />
          </div>
          
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="w-[800px] h-[800px]">
              <Globe data={data} />
            </div>
          </div>

          <div className="absolute top-4 left-4 right-4 z-20 grid grid-cols-1 md:grid-cols-3 gap-4">
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

          {/* Enter Button */}
          <motion.div 
            className="absolute bottom-8 left-0 right-0 z-20 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: showButton ? 1 : 0, 
              y: showButton ? 0 : 20 
            }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut"
            }}
          >
<motion.button 
  className="group relative px-8 py-3 text-xl font-semibold rounded-full 
             overflow-hidden bg-black border-2 border-red-500
             transform hover:scale-105 transition-all duration-300"
  initial={{ opacity: 0, y: 20 }}
  animate={{ 
    opacity: showButton ? 1 : 0, 
    y: showButton ? 0 : 20 
  }}
  transition={{ 
    duration: 0.8,
    ease: "easeOut"
  }}
  onClick={() => {
    // Add your navigation logic here
    console.log('Enter clicked');
  }}
>
  <span className="relative z-10 bg-gradient-to-r from-red-500 to-red-600 
                   bg-clip-text text-transparent">
    Enter
  </span>
  <motion.div 
    className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500"
    initial={{ x: '-100%' }}
    whileHover={{ x: 0 }}
    transition={{ duration: 0.3 }}
  />
</motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};