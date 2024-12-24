'use client';

import { useCallback } from 'react';
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

export const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1
        },
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        particles: {
            color: {
                value: ["#4a90e2", "#50E3C2", "#3D5AFE"],
              },
              links: {
                color: "#4a90e2",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 0.8,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5, // Increased opacity for better visibility
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.2,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}
    />
  );
};