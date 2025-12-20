"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  slug: string;
  tech: string[];
}

const ProjectCard = ({ title, description, slug, tech }: ProjectCardProps) => {
  return (
    <Link href={`/projects/${slug}`} className="block h-full">
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="group relative h-full p-6 bg-neutral-100 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
      >
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 translate-y-1 group-hover:translate-y-0">
          <div className="p-2 bg-white dark:bg-neutral-800 rounded-full shadow-md">
            <ArrowUpRight className="w-4 h-4 text-neutral-900 dark:text-white" />
          </div>
        </div>
        
        <div className="mt-auto">
          <div className="flex gap-2 mb-3 flex-wrap">
            {tech.map((t) => (
              <span
                key={t}
                className="px-2 py-1 text-xs rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300"
              >
                {t}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
            {description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;
