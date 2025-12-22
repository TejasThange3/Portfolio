"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { DATA } from "@/lib/data";

interface PreloaderProps {
  onComplete?: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      onComplete?.();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-950"
        >
          {/* Background gradient orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px] animate-pulse" />
            <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-[150px] animate-pulse delay-500" />
          </div>

          {/* Loading content */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Animated logo/name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative"
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                <span className="text-white">{DATA.profile.name.split(" ")[0]}</span>
              </h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"
              />
            </motion.div>

            {/* Loading indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="flex items-center gap-2"
            >
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                    className="w-2 h-2 rounded-full bg-white"
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Noise texture overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
            <svg className="w-full h-full">
              <filter id="preloaderNoise">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.8"
                  numOctaves="4"
                  stitchTiles="stitch"
                />
              </filter>
              <rect width="100%" height="100%" filter="url(#preloaderNoise)" />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
