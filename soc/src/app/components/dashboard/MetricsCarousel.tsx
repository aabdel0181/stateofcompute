'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UtilizationChart } from '../charts/UtilizationChart';
import { ProviderComparisonChart } from '../charts/ProviderComparisonChart';
import { GrowthChart } from '../charts/GrowthChart';
import type { GPUMetrics } from '@/types/metrics';

interface MetricsCarouselProps {
  data: GPUMetrics[];
  isLoading: boolean;
}

export const MetricsCarousel: React.FC<MetricsCarouselProps> = ({ data, isLoading }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    {
      id: 'utilization',
      title: 'GPU Utilization',
      component: <UtilizationChart data={data} isLoading={isLoading} />
    },
    {
      id: 'comparison',
      title: 'Provider Comparison',
      component: <ProviderComparisonChart data={data} isLoading={isLoading} />
    },
    {
      id: 'growth',
      title: 'Network Growth',
      component: <GrowthChart data={data} isLoading={isLoading} />
    }
  ];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide((prevSlide) => (
      (prevSlide + newDirection + slides.length) % slides.length
    ));
  }, [slides.length]);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Network Metrics</h2>
      
      <div className="relative h-[400px] w-full">
        {/* Navigation Arrows */}
        <button
          className="absolute left-4 top-1/2 z-10 transform -translate-y-1/2
                     w-12 h-12 rounded-full bg-black/50 hover:bg-black/70
                     flex items-center justify-center transition-colors"
          onClick={() => paginate(-1)}
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          className="absolute right-4 top-1/2 z-10 transform -translate-y-1/2
                     w-12 h-12 rounded-full bg-black/50 hover:bg-black/70
                     flex items-center justify-center transition-colors"
          onClick={() => paginate(1)}
          aria-label="Next slide"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Chart Container */}
        <div className="relative h-full w-full">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {slides[currentSlide].component}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1);
                setCurrentSlide(index);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-red-500' : 'bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};