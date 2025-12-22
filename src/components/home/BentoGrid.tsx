"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Code2, Layers, Zap } from "lucide-react";
import { DATA } from "@/lib/data";
import ProfileCard from "./ProfileCard";
import TechMarquee from "./TechMarquee";
import ProjectCard from "./ProjectCard";
import FrequencyWidget from "./FrequencyWidget";

gsap.registerPlugin(ScrollTrigger);

const BentoGrid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".bento-card");
    
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { 
          opacity: 0, 
          y: 60,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            end: "top center",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section ref={sectionRef} className="relative py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-20"
        >
          {/* Decorative badge */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full border border-purple-500/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold text-purple-300 uppercase tracking-wider">Portfolio</span>
            </div>
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 font-display"
          >
            <span className="text-white">Featured </span>
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                Work
              </span>
              <motion.span 
                className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              />
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            A collection of projects showcasing expertise in AI, machine learning, and modern web development.
          </motion.p>

          {/* Stats row */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-8 mt-10"
          >
            {[
              { icon: Code2, label: "Projects", value: `${DATA.projects.length}+` },
              { icon: Layers, label: "Technologies", value: `${DATA.skills.length}+` },
              { icon: Zap, label: "Years Exp", value: "3+" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <stat.icon className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-neutral-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bento Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-4 gap-5 auto-rows-[200px]">
          
          {/* Profile Card - 2x2 */}
          <div className="bento-card col-span-1 md:col-span-2 row-span-2">
            <ProfileCard />
          </div>

          {/* Frequency Widget - 2x2 */}
          <div className="bento-card col-span-1 md:col-span-2 row-span-2">
            <FrequencyWidget />
          </div>

          {/* Tech Marquee - Full Width */}
          <div className="bento-card col-span-1 md:col-span-4 row-span-1 rounded-3xl overflow-hidden">
            <TechMarquee items={DATA.skills} />
          </div>

          {/* Projects - Dynamic */}
          {DATA.projects.map((project) => (
            <div
              key={project.slug}
              className="bento-card col-span-1 md:col-span-2 row-span-2"
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                slug={project.slug}
                tech={project.tech}
                imageUrl={project.imageUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
