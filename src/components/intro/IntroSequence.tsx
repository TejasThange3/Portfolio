"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function IntroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within this 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phase 1: Divine Avatar (0% - 40%)
  // Image starts fully visible, fades and scales down
  const avatarOpacity = useTransform(scrollYProgress, [0, 0.35, 0.4], [1, 1, 0]);
  const avatarScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.1]);
  
  // Phase 2: Kundalini & Identity (40% - 80%)
  // Fades in, stays visible, then fades out
  const serpentOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.75, 0.85], [0, 1, 1, 0]);
  const serpentScale = useTransform(scrollYProgress, [0.4, 0.8], [1.05, 1]);
  
  // Text animations for Phase 2
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.7, 0.8], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.4, 0.5], [60, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.8], [0, 1, 1, 0]);
  const subtitleY = useTransform(scrollYProgress, [0.45, 0.55], [40, 0]);
  
  // Phase 3: Collapse & Reveal (80% - 100%)
  // Entire overlay slides up to reveal main content
  const overlayY = useTransform(scrollYProgress, [0.8, 1], ["0%", "-100%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0.95]);

  // Progress indicator
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      {/* Sticky Overlay Container - Stays fixed while scrolling */}
      <motion.div
        style={{ y: overlayY, opacity: overlayOpacity }}
        className="sticky top-0 left-0 w-full h-screen z-50 overflow-hidden"
      >
        {/* Phase 1: Divine Avatar */}
        <motion.div
          style={{ opacity: avatarOpacity, scale: avatarScale }}
          className="absolute inset-0 z-10"
        >
          <Image
            src="/intro-avatar.jpg"
            alt="Divine Avatar"
            fill
            priority
            quality={100}
            className="object-cover"
            sizes="100vw"
          />
          {/* Subtle vignette overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
          
          {/* Ambient glow effect */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 30%, rgba(100, 100, 255, 0.15) 0%, transparent 60%)",
            }}
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Phase 2: Kundalini & Identity */}
        <motion.div
          style={{ opacity: serpentOpacity, scale: serpentScale }}
          className="absolute inset-0 z-20"
        >
          {/* Serpent Background with Gold/Black filter */}
          <div className="absolute inset-0">
            <Image
              src="/intro-serpent.png"
              alt="Kundalini Serpent"
              fill
              quality={100}
              className="object-cover object-center"
              sizes="100vw"
              style={{
                filter: "sepia(30%) saturate(150%) brightness(0.9) contrast(1.2)",
              }}
            />
            {/* Gold/Black overlay for premium look */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-amber-950/20 to-black/70" />
            <div className="absolute inset-0 bg-gradient-radial from-amber-500/10 via-transparent to-black/50" />
          </div>

          {/* Cinematic Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            {/* Pre-text */}
            <motion.span
              style={{ opacity: subtitleOpacity, y: subtitleY }}
              className="text-amber-400/90 text-sm md:text-base tracking-[0.5em] uppercase mb-4 font-light"
            >
              Welcome to the realm of
            </motion.span>
            
            {/* Main Name */}
            <motion.h1
              style={{ opacity: textOpacity, y: textY }}
              className="text-center font-display font-black leading-none"
            >
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-2 md:mb-4 tracking-tight">
                THIS IS
              </span>
              <span 
                className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(251,191,36,0.4)]"
                style={{
                  WebkitTextStroke: "1px rgba(251, 191, 36, 0.3)",
                }}
              >
                TEJAS THANGE
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white/90 mt-2 md:mt-4 tracking-wider">
                AKA
              </span>
              <motion.span 
                className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent mt-2 md:mt-4"
                style={{
                  textShadow: "0 0 80px rgba(251, 191, 36, 0.5)",
                  WebkitTextStroke: "2px rgba(251, 191, 36, 0.2)",
                }}
                animate={{
                  textShadow: [
                    "0 0 60px rgba(251, 191, 36, 0.4)",
                    "0 0 100px rgba(251, 191, 36, 0.6)",
                    "0 0 60px rgba(251, 191, 36, 0.4)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                K.A.N.H.A
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              style={{ opacity: subtitleOpacity }}
              className="mt-6 md:mt-10 text-amber-200/70 text-sm md:text-lg tracking-widest uppercase"
            >
              AI & ML Engineer • Creator • Visionary
            </motion.p>
          </div>

          {/* Particle/Sparkle effects */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-amber-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, -100],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Progress Indicator at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-white/10">
          <motion.div
            style={{ width: progressWidth }}
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"
          />
        </div>

        {/* Scroll hint - only visible at start */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        >
          <span className="text-white/60 text-xs tracking-widest uppercase">Scroll to begin</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
