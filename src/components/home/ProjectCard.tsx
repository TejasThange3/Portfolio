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
        className="group relative h-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
      >
        {/* Full Background Image */}
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>

        {/* Dark Gradient Overlay (Always visible for text readability) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:from-black/95 group-hover:via-black/50 transition-colors duration-300" />

        {/* Arrow Icon - Top Right */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <ArrowUpRight className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Content - Bottom Left (Overlaid on image) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          {/* Tech Stack Badges */}
          <div className="flex gap-2 flex-wrap mb-3">
            {tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs font-semibold rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white"
              >
                {t}
              </span>
            ))}
            {tech.length > 3 && (
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
                +{tech.length - 3}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-white/90 line-clamp-2 leading-relaxed drop-shadow-md">
            {description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;
