"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: Props) {
  useEffect(() => {
    // Sync GSAP ScrollTrigger with Lenis
    ScrollTrigger.refresh();
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      }}
    >
      {/* React 19 type compat with @studio-freight/react-lenis peer types */}
      {children as never}
    </ReactLenis>
  );
}
