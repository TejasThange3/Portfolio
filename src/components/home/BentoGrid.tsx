"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { DATA } from "@/lib/data";
import ProfileCard from "./ProfileCard";
import TechMarquee from "./TechMarquee";
import ProjectCard from "./ProjectCard";
import FrequencyWidget from "./FrequencyWidget";

const BentoGrid = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="mb-16 relative"
      >
        {/* Decorative element */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-4"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Portfolio</span>
          </div>
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          <span className="text-white">Featured </span>
          <span className="relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              Work
            </span>
            <motion.span 
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </span>
        </h2>
        <p className="text-neutral-500 text-lg max-w-2xl leading-relaxed">
          A collection of projects showcasing my expertise in AI, machine learning, and modern web development.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[180px]">
          
          {/* Profile Card - 2x2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1 md:col-span-2 row-span-2"
          >
            <ProfileCard />
          </motion.div>

          {/* Frequency Widget - 2x2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1 md:col-span-2 row-span-2"
          >
            <FrequencyWidget />
          </motion.div>

          {/* Tech Marquee - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1 md:col-span-4 row-span-1 rounded-3xl overflow-hidden"
          >
            <TechMarquee items={DATA.skills} />
          </motion.div>

          {/* Projects - Dynamic */}
          {DATA.projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="col-span-1 md:col-span-2 row-span-2"
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                slug={project.slug}
                tech={project.tech}
                imageUrl={project.imageUrl}
              />
            </motion.div>
          ))}

        </div>
      </motion.div>
    </div>
  );
};

export default BentoGrid;
