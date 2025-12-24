"use client";

import { useRef, useMemo } from "react";
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
  const avatarScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.05]);
  
  // Phase 2: Kundalini & Identity (40% - 80%)
  // Fades in, stays visible, then fades out
  const serpentOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.75, 0.85], [0, 1, 1, 0]);
  const serpentScale = useTransform(scrollYProgress, [0.4, 0.8], [0.95, 1]);
  
  // Text animations for Phase 2
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.7, 0.8], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.4, 0.5], [60, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.8], [0, 1, 1, 0]);
  const subtitleY = useTransform(scrollYProgress, [0.45, 0.55], [40, 0]);
  
  // Phase 3: Collapse & Reveal (80% - 100%)
  // Entire overlay slides up to reveal main content
  const overlayY = useTransform(scrollYProgress, [0.8, 1], ["0%", "-100%"]);

  // Progress indicator
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Memoize particles to prevent re-renders
  const particles = useMemo(() => 
    [...Array(15)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 3,
    })), []
  );

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      {/* Sticky Overlay Container - Stays fixed while scrolling */}
      <motion.div
        style={{ y: overlayY }}
        className="sticky top-0 left-0 w-full h-[100dvh] z-50 overflow-hidden bg-black"
      >
        {/* Phase 1: Divine Avatar - Responsive fit */}
        <motion.div
          style={{ 
            opacity: avatarOpacity, 
            scale: avatarScale,
            willChange: "transform, opacity",
          }}
          className="absolute inset-0 z-10"
        >
          {/* Mobile: object-cover with top focus | Desktop: contain for full view */}
          <div className="relative w-full h-[100dvh]">
            <Image
              src="/intro-avatar.jpg"
              alt="Divine Avatar"
              fill
              priority
              quality={100}
              className="object-cover object-top md:object-contain md:object-center"
              sizes="100vw"
            />
          </div>
          
          {/* Subtle vignette overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/70" />
          
          {/* Ambient glow effect */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 30%, rgba(100, 100, 255, 0.2) 0%, transparent 60%)",
            }}
            animate={{
              opacity: [0.5, 0.9, 0.5],
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
          style={{ 
            opacity: serpentOpacity, 
            scale: serpentScale,
            willChange: "transform, opacity",
          }}
          className="absolute inset-0 z-20 bg-black"
        >
          {/* Serpent Background - CONTAIN to show full symbol */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src="/intro-serpent.png"
                alt="Kundalini Serpent"
                fill
                quality={100}
                className="object-contain object-center"
                sizes="100vw"
                style={{
                  filter: "sepia(40%) saturate(180%) brightness(0.85) contrast(1.3)",
                  willChange: "transform",
                }}
              />
            </div>
            {/* Gold/Black overlay for premium look */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-amber-950/10 to-black/60" />
            <div className="absolute inset-0 bg-gradient-radial from-amber-500/5 via-transparent to-black/40" />
          </div>

          {/* Cinematic Text Overlay - Simplified */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            {/* Pre-text */}
            <motion.span
              style={{ opacity: subtitleOpacity, y: subtitleY }}
              className="text-amber-400/90 text-xs sm:text-sm md:text-base tracking-[0.4em] sm:tracking-[0.5em] uppercase mb-6 md:mb-8 font-light"
            >
              Welcome to the realm of
            </motion.span>
            
            {/* Main Name - NO "THIS IS" */}
            <motion.h1
              style={{ opacity: textOpacity, y: textY }}
              className="text-center font-display font-black leading-none"
            >
              <span 
                className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(251,191,36,0.4)]"
                style={{
                  WebkitTextStroke: "1px rgba(251, 191, 36, 0.3)",
                }}
              >
                TEJAS THANGE
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white/90 mt-3 md:mt-5 tracking-wider">
                AKA
              </span>
              <motion.span 
                className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent mt-3 md:mt-5"
                style={{
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
              className="mt-8 md:mt-12 text-amber-200/70 text-xs sm:text-sm md:text-lg tracking-widest uppercase"
            >
              AI & ML Engineer • Creator • Visionary
            </motion.p>
          </div>

          {/* Particle/Sparkle effects - Memoized */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-1 h-1 bg-amber-400 rounded-full"
                style={{
                  left: particle.left,
                  top: particle.top,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, -80],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Progress Indicator at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-30 h-[2px] bg-white/5">
          <motion.div
            style={{ width: progressWidth }}
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"
          />
        </div>
      </motion.div>
    </div>
  );
}
