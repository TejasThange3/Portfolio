"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";
import { DATA } from "@/lib/data";

const Hero = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center">
          {/* Waving hand + Greeting */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex items-center gap-3 mb-6"
          >
            <span className="text-4xl md:text-5xl animate-wave">👋</span>
            <span className="text-lg md:text-xl text-neutral-400 font-medium">
              Hey there, I'm
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
          >
            <span className="text-white">{DATA.profile.name.split(" ")[0]} </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 italic font-light">
              {DATA.profile.name.split(" ")[1]}
            </span>
          </motion.h1>

          {/* Title */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-xl md:text-2xl text-neutral-400 mb-6"
          >
            I'm a{" "}
            <span className="text-white font-medium">{DATA.profile.title}</span>{" "}
            based in{" "}
            <span className="text-white font-medium">{DATA.profile.location}</span>
          </motion.p>

          {/* Bio */}
          <motion.p
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-base md:text-lg text-neutral-500 max-w-2xl mb-10 leading-relaxed"
          >
            {DATA.profile.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-4 mb-10"
          >
            <a
              href={DATA.profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 py-3 bg-white text-neutral-900 rounded-full font-medium flex items-center gap-2 hover:bg-neutral-100 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <span>Visit GitHub</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity" />
            </a>
            <a
              href={`mailto:${DATA.profile.email}`}
              className="px-6 py-3 border border-white/20 text-white rounded-full font-medium flex items-center gap-2 hover:bg-white/5 hover:border-white/40 transition-all duration-300 backdrop-blur-sm"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Me</span>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex items-center gap-4"
          >
            <a
              href={DATA.profile.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
            </a>
            <a
              href={DATA.profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
            </a>
            <a
              href={DATA.profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-neutral-500 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
