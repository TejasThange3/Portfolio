"use client";

import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import ProfileCard from "./ProfileCard";
import TechMarquee from "./TechMarquee";
import ProjectCard from "./ProjectCard";
import MapWidget from "./MapWidget";
import SpotifyWidget from "./SpotifyWidget";

const BentoGrid = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[180px]">
        
        {/* Profile Card - 2x2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="col-span-1 md:col-span-2 row-span-2"
        >
          <ProfileCard />
        </motion.div>

        {/* Map Widget - 1x1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="col-span-1 row-span-1"
        >
          <MapWidget />
        </motion.div>

        {/* Spotify Widget - 1x1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-1 row-span-1"
        >
          <SpotifyWidget />
        </motion.div>

        {/* Tech Marquee - 2x1 (Spans 2 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="col-span-1 md:col-span-2 row-span-1 rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900 flex items-center"
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

        {/* Placeholder for more content or filler */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.6 }}
           className="col-span-1 md:col-span-2 row-span-1 bg-neutral-100 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 flex items-center justify-center"
        >
            <p className="text-neutral-500">More coming soon...</p>
        </motion.div>

      </div>
    </div>
  );
};

export default BentoGrid;
