"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, Sparkles } from "lucide-react";
import { DATA } from "@/lib/data";
import { ShinyButton } from "@/components/ui/shiny-button";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.12,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Interactive gradient that follows mouse */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-[100px] pointer-events-none transition-all duration-500 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(59,130,246,0.2) 50%, transparent 70%)",
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
        }}
      />

      {/* Static gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-[150px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/15 rounded-full blur-[130px] animate-float" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-500/10 rounded-full blur-[180px]" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center">
          {/* Status badge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-neutral-300">Available for opportunities</span>
            </div>
          </motion.div>

          {/* Waving hand + Greeting */}
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex items-center gap-3 mb-6"
          >
            <span className="text-5xl md:text-6xl animate-wave">👋</span>
            <span className="text-xl md:text-2xl text-neutral-400 font-medium font-display">
              Hey there, I'm
            </span>
          </motion.div>

          {/* Name - Large and prominent like Eik.me */}
          <motion.h1
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6"
          >
            <span className="text-white font-display">{DATA.profile.name.split(" ")[0]} </span>
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 italic font-light">
                {DATA.profile.name.split(" ")[1]}
              </span>
              {/* Underline decoration */}
              <motion.span 
                className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
          </motion.h1>

          {/* Title with highlighted keywords */}
          <motion.p
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-xl md:text-2xl text-neutral-400 mb-6 font-display"
          >
            I'm a{" "}
            <span className="text-white font-semibold relative">
              {DATA.profile.title}
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-transparent" />
            </span>{" "}
            based in{" "}
            <span className="text-white font-medium">{DATA.profile.location}</span>
          </motion.p>

          {/* Bio */}
          <motion.p
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-base md:text-lg text-neutral-500 max-w-2xl mb-12 leading-relaxed"
          >
            {DATA.profile.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
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

          {/* Social Links */}
          <motion.div
            custom={6}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex items-center gap-3"
          >
            {[
              { icon: Twitter, href: DATA.profile.social.twitter, label: "Twitter" },
              { icon: Linkedin, href: DATA.profile.social.linkedin, label: "LinkedIn" },
              { icon: Github, href: DATA.profile.social.github, label: "GitHub" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300 group"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-neutral-500 uppercase tracking-[0.3em] font-display">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2"
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-white/60 rounded-full"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
