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
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="group relative h-full overflow-hidden rounded-3xl bg-neutral-900 border border-white/10 shadow-xl hover:shadow-2xl cursor-pointer"
      >
        {/* CRITICAL: Background Image - First Child */}
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-80"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 group-hover:from-black/100 group-hover:via-black/60 transition-colors duration-300" />

        {/* Arrow Icon - Top Right */}
        <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 z-20">
          <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
            <ArrowUpRight className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Content - Bottom Section (Always on top) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg"
              >
                {t}
              </span>
            ))}
            {tech.length > 3 && (
              <span className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg">
                +{tech.length - 3}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-2xl group-hover:translate-x-1 transition-transform duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-white/90 line-clamp-2 leading-relaxed drop-shadow-lg">
            {description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;
