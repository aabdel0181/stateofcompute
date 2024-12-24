'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

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

         {/* Buttons Container */}
         <motion.div 
            className="absolute bottom-32 left-0 right-0 z-20 flex justify-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: showButton ? 1 : 0, 
              y: showButton ? 0 : 20 
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Enter Button */}
            <button 
                        onClick={() => router.push('/app')}
              className="px-12 py-4 text-2xl font-semibold
                         bg-[#cc0000] text-white
                         rounded-full
                         shadow-[0_0_15px_rgba(204,0,0,0.5)]
                         hover:shadow-[0_0_30px_rgba(204,0,0,0.8)]
                         transform hover:scale-105 
                         transition-all duration-300"
            >
              Enter
            </button>

            {/* Learn More Button */}
            <button 
              className="px-12 py-4 text-2xl font-semibold rounded-full
                         border-2 border-[#cc0000] text-[#cc0000]
                         hover:bg-[#cc0000] hover:text-white
                         transform hover:scale-105 transition-all duration-300"
              onClick={() => router.push('/learn')}
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};