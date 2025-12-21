"use client";

import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import ProfileCard from "./ProfileCard";
import TechMarquee from "./TechMarquee";
import ProjectCard from "./ProjectCard";
import FrequencyWidget from "./FrequencyWidget";

const BentoGrid = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
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
