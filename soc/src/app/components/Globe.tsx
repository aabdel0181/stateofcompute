'use client';

import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import type { GPUMetrics } from '@/types/metrics';

const GlobeGL = dynamic(() => import('react-globe.gl'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
    </div>
  ),
});

interface GlobeProps {
  data: GPUMetrics[];
}

export const Globe: React.FC<GlobeProps> = ({ data }) => {
  const globeRef = useRef();

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  const globeData = useMemo(() => {
    return data.map(metric => ({
      lat: metric.location.latitude,
      lng: metric.location.longitude,
      size: metric.gpuCount * 0.5,
      color: metric.utilization > 80 ? '#ff4444' : '#44ff44'
    }));
  }, [data]);

  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className="h-[400px] w-full"
    >
      <GlobeGL
        ref={globeRef}
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-dark.jpg"
        pointsData={globeData}
        pointAltitude="size"
        pointColor="color"
        pointRadius={0.5}
        atmosphereColor="#ffffff"
        atmosphereAltitude={0.1}
      />
    </motion.div>
  );
};