'use client';

import { useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { GPUMetrics } from '../types/metrics';

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
  globeImageUrl: string;
  pointsData: { lat: number; lng: number; size: number; color: string; }[];
  pointAltitude: number;
  pointColor: string;
  pointRadius: number;
  atmosphereColor: string;
  atmosphereAltitude: number;
  width: number;
  height: number;
  enablePointerInteraction: boolean;
  center?: boolean;
  globeRadius?: number; // Add this line
}
export const Globe: React.FC<GlobeProps> = ({ data }) => {
  const globeRef = useRef<any>(null);

  useEffect(() => {
    let animationId: number;
    const rotationSpeed = 0.005;

    const animate = () => {
      if (globeRef.current) {
        const globe = globeRef.current;
        if (globe.scene()) {
          globe.scene().rotation.y += rotationSpeed;
          globe.renderer().render(globe.scene(), globe.camera());
        }

      // First value (phi): vertical rotation (lower numbers move up)
      // Second value (theta): horizontal rotation (positive numbers move right)
      globeRef.current.pointOfView({
        lat: 30,    // Latitude (adjust to move up/down)
        lng: -95,   // Longitude (adjust to move left/right)
        altitude: 2.5  // Distance from globe (adjust for zoom)
      });
      }
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  const getColorByStatus = (metric: GPUMetrics) => {
    console.log('Status:', metric.status);
    console.log('Network Health:', metric.networkHealth);
    console.log('Utilization:', metric.utilization);
  
    // Grey for inactive nodes
    if (metric.status === 'inactive') {
      console.log('Coloring grey');
      return '#666666';
    }
    
    // For active nodes, check health and utilization
    if (metric.networkHealth < 70) {
      console.log('Coloring red');
      return '#cc0000';     // Red for poor health (< 70%)
    }
    if (metric.utilization > 90) {
      console.log('Coloring yellow');
      return '#FFD700';     // Yellow for high utilization (> 90%)
    }
    console.log('Coloring green');
    return '#00cc00';       // Green for healthy and normal utilization
  };
  
  const globeData = useMemo(() => {
    console.log('Total data points:', data.length);
    return data.map(metric => ({
      lat: metric.location.latitude,
      lng: metric.location.longitude,
      size: 0.5,
      color: getColorByStatus(metric)
    }));
  }, [data]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <GlobeGL
        ref={globeRef}
        globeImageUrl="https://unpkg.com/three-globe@2.37.5/example/img/earth-dark.jpg"
        pointsData={globeData}
        pointAltitude={0.01}
        pointColor="color"
        pointRadius={0.5}
        atmosphereColor="#cc0000"
        atmosphereAltitude={0.15}
        backgroundColor="rgba(0,0,0,0)"
        width={900}
        height={900}
        enablePointerInteraction={false}
      />
    </div>
  );
};