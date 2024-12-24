'use client';

import { useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { GPUMetrics } from '@/types/metrics';

const GlobeGL = dynamic(() => import('react-globe.gl'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
    </div>
  ),
});

interface GlobeProps {
  data: GPUMetrics[];
}

export const Globe: React.FC<GlobeProps> = ({ data }) => {
  const globeRef = useRef<any>(null);

  useEffect(() => {
    let animationId: number;
    const rotationSpeed = 0.001;

    const animate = () => {
      if (globeRef.current) {
        const globe = globeRef.current;
        if (globe.scene()) {
          globe.scene().rotation.y += rotationSpeed;
          globe.renderer().render(globe.scene(), globe.camera());
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
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
    <div className="relative w-full h-[600px] flex justify-center items-center bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-sm"></div>
      <GlobeGL
        ref={globeRef}
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
        pointsData={globeData}
        pointAltitude="size"
        pointColor="color"
        pointRadius={0.5}
        atmosphereColor="#ffffff"
        atmosphereAltitude={0.15}
        backgroundColor="rgba(0,0,0,0)"
        width={800}
        height={600}
        globeRadius={50}
        enablePointerInteraction={false}
      />
    </div>
  );
};