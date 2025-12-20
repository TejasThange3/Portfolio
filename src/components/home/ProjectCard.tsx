"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  slug: string;
  tech: string[];
  imageUrl: string;
}

const ProjectCard = ({ title, description, slug, tech, imageUrl }: ProjectCardProps) => {
  return (
    <Link href={`/projects/${slug}`} className="block h-full">
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="group relative h-full bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer"
      >
        {/* Thumbnail Image */}
        <div className="relative h-48 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          
          {/* Tech Stack Badges - Overlayed on image */}
          <div className="absolute bottom-3 left-3 flex gap-2 flex-wrap max-w-[calc(100%-24px)]">
            {tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 shadow-sm"
              >
                {t}
              </span>
            ))}
            {tech.length > 3 && (
              <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 shadow-sm">
                +{tech.length - 3}
              </span>
            )}
          </div>
          
          {/* Arrow Icon */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200">
            <div className="p-2 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-full shadow-lg">
              <ArrowUpRight className="w-4 h-4 text-neutral-900 dark:text-white" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;
