"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

// Premium easing function - exponential decay for "heavy" feel
const premiumEasing = (t: number): number => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,           // Lower = smoother, heavier feel
        duration: 1.4,        // Longer duration for cinematic scroll
        smoothWheel: true,
        wheelMultiplier: 0.8, // Slower wheel for more control
        touchMultiplier: 1.5, // Better touch response on mobile
        easing: premiumEasing,
      }}
    >
      {children}
    </ReactLenis>
  );
}
