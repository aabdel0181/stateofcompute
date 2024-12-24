'use client';

import { useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { GPUMetrics } from '@/types/metrics';

const GlobeGL = dynamic(() => import('react-globe.gl'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
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
      color: metric.utilization > 80 ? '#ff3333' : '#ff6666'
    }));
  }, [data]);

  return (
    <div className="w-full h-full relative">
      <div className="absolute inset-0 rounded-full bg-gradient-radial from-transparent to-black opacity-20" />
      <GlobeGL
        ref={globeRef}
        globeImageUrl="https://unpkg.com/three-globe@2.37.5/example/img/earth-dark.jpg"
        pointsData={globeData}
        pointAltitude="size"
        pointColor="color"
        pointRadius={0.5}
        atmosphereColor="#ff3333"
        atmosphereAltitude={0.15}
        backgroundColor="rgba(0,0,0,0)"
        width={800}
        height={800}
        globeRadius={300}
        enablePointerInteraction={false}
      />
    </div>
  );
};