"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";
import { DATA } from "@/lib/data";
import { ShinyButton } from "@/components/ui/shiny-button";
import dynamic from "next/dynamic";

// Dynamically import the 3D component with no SSR
const Kaalchakra3D = dynamic(() => import("@/components/3d/Kaalchakra"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-20 h-20 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
    </div>
  ),
});

// Real typewriter effect with authentic cursor - like Akshay Shinde's site
const TypewriterText = ({ 
  text, 
  className = "",
  delay = 0,
  speed = 50,
  onComplete,
  cursorClassName = "",
}: { 
  text: string; 
  className?: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
  cursorClassName?: string;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    let typeInterval: NodeJS.Timeout;
    
    const startDelay = setTimeout(() => {
      typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsComplete(true);
          // Keep cursor visible briefly then hide
          setTimeout(() => {
            setShowCursor(false);
            onComplete?.();
          }, 400);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startDelay);
      if (typeInterval) clearInterval(typeInterval);
    };
  }, [text, delay, speed, onComplete]);

  return (
    <span className={`${className} inline-flex items-baseline`}>
      <span>{displayedText}</span>
      {showCursor && (
        <span 
          className={`inline-block w-[3px] h-[0.9em] bg-current ml-0.5 translate-y-[0.05em] ${cursorClassName}`}
          style={{
            animation: 'blink 0.8s step-end infinite',
          }}
        />
      )}
    </span>
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Typewriter sequence state
  const [step, setStep] = useState(0);
  const [greetingDone, setGreetingDone] = useState(false);
  const [firstNameDone, setFirstNameDone] = useState(false);
  const [lastNameDone, setLastNameDone] = useState(false);
  const [titleDone, setTitleDone] = useState(false);

  useEffect(() => {
    // Start the sequence after a brief delay
    const timer = setTimeout(() => setStep(1), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const firstName = DATA.profile.name.split(" ")[0];
  const lastName = DATA.profile.name.split(" ")[1];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Interactive gradient that follows mouse */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] pointer-events-none transition-all duration-700 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.3) 0%, rgba(139,92,246,0.2) 50%, transparent 70%)",
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
        }}
      />

      {/* Static gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[130px] animate-float" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-500/5 rounded-full blur-[180px]" />
      </div>

      {/* Star field background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white/40 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left side - Text content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            
            {/* Greeting - Typewriter */}
            <div className="h-8 mb-4">
              {step >= 1 && (
                <TypewriterText 
                  text="Hey there, I'm"
                  className="text-lg md:text-xl text-neutral-400 font-medium"
                  delay={0}
                  speed={60}
                  onComplete={() => {
                    setGreetingDone(true);
                    setTimeout(() => setStep(2), 200);
                  }}
                />
              )}
            </div>

            {/* Name - Typewriter with gradient */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.1]">
              {/* First Name */}
              <span className="block sm:inline">
                {step >= 2 && (
                  <TypewriterText 
                    text={firstName}
                    className="text-white font-display"
                    delay={0}
                    speed={80}
                    onComplete={() => {
                      setFirstNameDone(true);
                      setTimeout(() => setStep(3), 100);
                    }}
                  />
                )}
              </span>
              
              <span className="inline">{firstNameDone && " "}</span>
              
              {/* Last Name with gradient */}
              <span className="block sm:inline">
                {step >= 3 && (
                  <TypewriterText 
                    text={lastName}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 pb-1"
                    delay={0}
                    speed={80}
                    cursorClassName="bg-purple-400"
                    onComplete={() => {
                      setLastNameDone(true);
                      setTimeout(() => setStep(4), 300);
                    }}
                  />
                )}
              </span>
            </h1>

            {/* Title - Typewriter */}
            <div className="h-8 mb-6">
              {step >= 4 && (
                <TypewriterText 
                  text={DATA.profile.title}
                  className="text-lg md:text-xl text-white font-semibold"
                  delay={0}
                  speed={40}
                  onComplete={() => {
                    setTitleDone(true);
                    setTimeout(() => setStep(5), 200);
                  }}
                />
              )}
            </div>

            {/* Bio - Fade in after typing */}
            <AnimatePresence>
              {step >= 5 && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                >
                  <p className="text-base md:text-lg text-neutral-500 max-w-xl mb-8 leading-relaxed">
                    {DATA.profile.bio}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA Buttons - Fade in */}
            <AnimatePresence>
              {step >= 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8"
                >
                  <ShinyButton 
                    text="Visit My GitHub" 
                    href={DATA.profile.social.github}
                    className="bg-neutral-900/50"
                  />
                  <a
                    href={`mailto:${DATA.profile.email}`}
                    className="group px-6 py-3 bg-white text-neutral-900 rounded-full font-medium flex items-center gap-2 hover:bg-neutral-100 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Contact Me</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Social Links - Fade in */}
            <AnimatePresence>
              {step >= 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-center gap-3"
                >
                  {[
                    { icon: Twitter, href: DATA.profile.social.twitter, label: "Twitter" },
                    { icon: Linkedin, href: DATA.profile.social.linkedin, label: "LinkedIn" },
                    { icon: Github, href: DATA.profile.social.github, label: "GitHub" },
                  ].map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300 group"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right side - 3D Kaalchakra */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 h-[350px] sm:h-[400px] md:h-[450px] lg:h-[550px] xl:h-[600px]"
          >
            <Kaalchakra3D className="w-full h-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
