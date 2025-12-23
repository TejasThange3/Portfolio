"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, ExternalLink, ChevronDown, MapPin } from "lucide-react";
import { DATA } from "@/lib/data";
import { ShinyButton } from "@/components/ui/shiny-button";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Dynamically import the 3D scene
const KaalchakraScene = dynamic(() => import("@/components/3d/KaalchakraScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-transparent">
      <div className="w-20 h-20 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
    </div>
  ),
});

// Typewriter with delete and loop - Akshay Shinde style
const TypewriterLoop = ({ 
  texts,
  className = "",
}: { 
  texts: string[];
  className?: string;
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];
    
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting) {
      if (displayedText.length === 0) {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        return;
      }
      
      const deleteTimer = setTimeout(() => {
        setDisplayedText(displayedText.slice(0, -1));
      }, 30);
      return () => clearTimeout(deleteTimer);
    }

    if (displayedText.length < currentFullText.length) {
      const typeTimer = setTimeout(() => {
        setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
      }, 80);
      return () => clearTimeout(typeTimer);
    } else {
      setIsPaused(true);
    }
  }, [displayedText, isDeleting, isPaused, currentTextIndex, texts]);

  return (
    <span className={`${className} inline-flex items-baseline`}>
      <span>{displayedText}</span>
      <span 
        className="inline-block w-[3px] h-[0.85em] bg-amber-500 ml-1"
        style={{ animation: 'blink 0.8s step-end infinite' }}
      />
    </span>
  );
};

// Section component for scroll sections
interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const Section = ({ id, children, className = "" }: SectionProps) => (
  <section
    id={id}
    className={`relative min-h-screen w-full flex items-center justify-center ${className}`}
  >
    {children}
  </section>
);

// Glass card component
const GlassCard = ({ 
  children, 
  className = "",
  hover = true 
}: { 
  children: React.ReactNode; 
  className?: string;
  hover?: boolean;
}) => (
  <div className={`
    relative backdrop-blur-xl bg-white/[0.02] dark:bg-neutral-900/40
    border border-white/[0.05] dark:border-white/[0.08]
    rounded-2xl overflow-hidden
    ${hover ? 'hover:bg-white/[0.04] dark:hover:bg-neutral-800/50 hover:border-white/[0.1] transition-all duration-500' : ''}
    ${className}
  `}>
    {children}
  </div>
);

// Project card component
const ProjectCard = ({ project, index }: { project: typeof DATA.projects[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true, margin: "-100px" }}
  >
    <GlassCard className="group cursor-pointer">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 3).map((tech) => (
              <span key={tech} className="px-2 py-1 text-xs font-medium bg-amber-500/20 text-amber-400 rounded-full border border-amber-500/30">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-neutral-400 text-sm leading-relaxed mb-4">
          {project.tagline}
        </p>
        <div className="flex items-center gap-4">
          <a 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-500 hover:text-amber-400 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
          <a 
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            Source
          </a>
        </div>
      </div>
    </GlassCard>
  </motion.div>
);

// Skill badge component
const SkillBadge = ({ skill, index }: { skill: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    viewport={{ once: true }}
    className="px-4 py-2 bg-neutral-900/60 backdrop-blur-sm border border-white/5 rounded-full text-sm font-medium text-neutral-300 hover:text-amber-400 hover:border-amber-500/30 transition-all duration-300 cursor-default"
  >
    {skill}
  </motion.div>
);

// Main Portfolio Component
export default function ScrollytellingPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenis = useLenis();

  // Set up GSAP ScrollTrigger
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Main scroll progress tracker
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });

      // Animate sections on scroll
      gsap.utils.toArray<HTMLElement>(".scroll-section").forEach((section, i) => {
        gsap.fromTo(
          section.querySelector(".section-content"),
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Smooth scroll to section
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element && lenis) {
      lenis.scrollTo(element, { offset: 0, duration: 1.5 });
    }
  }, [lenis]);

  return (
    <div ref={containerRef} className="relative">
      {/* Fixed 3D Background */}
      <div className="fixed inset-0 z-0">
        <KaalchakraScene scrollProgress={scrollProgress} />
      </div>

      {/* Gradient overlays for readability */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-transparent to-neutral-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.4)_100%)]" />
      </div>

      {/* Hero Section */}
      <Section id="hero" className="scroll-section">
        <div className="section-content relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-400 mb-4"
          >
            Hey there, I'm
          </motion.p>

          {/* Name with Typewriter */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            <TypewriterLoop
              texts={[DATA.profile.name, DATA.profile.title]}
              className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent"
            />
          </motion.h1>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-center gap-2 text-neutral-500 mb-8"
          >
            <MapPin className="w-4 h-4" />
            <span>{DATA.profile.location}</span>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {DATA.profile.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <ShinyButton 
              text="View My Work" 
              onClick={() => scrollToSection("projects")}
              className="bg-neutral-900/80"
            />
            <a
              href={`mailto:${DATA.profile.email}`}
              className="group px-6 py-3 bg-amber-500 text-neutral-900 rounded-full font-semibold flex items-center gap-2 hover:bg-amber-400 transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.3)]"
            >
              <Mail className="w-4 h-4" />
              <span>Get In Touch</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex items-center justify-center gap-4"
          >
            {[
              { icon: Github, href: DATA.profile.social.github, label: "GitHub" },
              { icon: Linkedin, href: DATA.profile.social.linkedin, label: "LinkedIn" },
              { icon: Twitter, href: DATA.profile.social.twitter, label: "Twitter" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-amber-500/20 hover:border-amber-500/50 hover:scale-110 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-neutral-400 hover:text-amber-400" />
              </a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            onClick={() => scrollToSection("about")}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </motion.button>
        </div>
      </Section>

      {/* About Section */}
      <Section id="about" className="scroll-section bg-gradient-to-b from-transparent via-neutral-950/50 to-transparent">
        <div className="section-content relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* About Text */}
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-amber-500 font-mono text-sm mb-4 block"
              >
                01. About Me
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                Building the Future with <span className="text-amber-400">AI & Code</span>
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-4 text-neutral-400 leading-relaxed"
              >
                <p>
                  I'm a passionate AI & ML Engineer based in {DATA.profile.location}, focused on building intelligent systems that solve real-world problems. With expertise spanning machine learning, deep learning, and modern web technologies, I create solutions that are both powerful and accessible.
                </p>
                <p>
                  My journey in tech started with a curiosity about how machines can learn and adapt. Today, I work on everything from predictive analytics platforms to scalable distributed systems, always pushing the boundaries of what's possible.
                </p>
              </motion.div>
            </div>

            {/* Skills Grid */}
            <GlassCard className="p-8" hover={false}>
              <h3 className="text-lg font-semibold text-white mb-6">Technologies I Work With</h3>
              <div className="flex flex-wrap gap-3">
                {DATA.skills.map((skill, index) => (
                  <SkillBadge key={skill} skill={skill} index={index} />
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" className="scroll-section py-20">
        <div className="section-content relative z-10 max-w-6xl mx-auto px-6">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-amber-500 font-mono text-sm mb-4 block text-center"
          >
            02. Featured Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
          >
            Projects That <span className="text-amber-400">Define Me</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-neutral-400 text-center max-w-2xl mx-auto mb-12"
          >
            A selection of projects showcasing my expertise in AI, machine learning, and full-stack development.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DATA.projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="scroll-section pb-32">
        <div className="section-content relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-amber-500 font-mono text-sm mb-4 block"
          >
            03. Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Let's Build Something <span className="text-amber-400">Amazing</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-neutral-400 max-w-xl mx-auto mb-10 leading-relaxed"
          >
            I'm currently open to new opportunities and collaborations. Whether you have a project in mind or just want to connect, feel free to reach out!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href={`mailto:${DATA.profile.email}`}
              className="group px-8 py-4 bg-amber-500 text-neutral-900 rounded-full font-semibold flex items-center gap-3 hover:bg-amber-400 transition-all duration-300 shadow-[0_0_40px_rgba(245,158,11,0.4)]"
            >
              <Mail className="w-5 h-5" />
              <span>{DATA.profile.email}</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
