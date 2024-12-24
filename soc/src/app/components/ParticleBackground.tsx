'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const ParticleBackground: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 z-0"
      style={{
        background: 'radial-gradient(circle, rgba(2,0,36,0) 0%, rgba(0,0,0,0.4) 100%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
};