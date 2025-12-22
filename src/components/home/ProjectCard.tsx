"use client";

import { useState, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  slug: string;
  tech: string[];
  imageUrl: string;
}

const ProjectCard = ({ title, description, slug, tech, imageUrl }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { stiffness: 300, damping: 30 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <Link href={`/projects/${slug}`} className="block h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="group relative h-full overflow-hidden rounded-3xl bg-neutral-900 cursor-pointer"
      >
        {/* Animated spotlight effect on hover */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useMotionTemplate`radial-gradient(600px circle at ${x}px ${y}px, rgba(139,92,246,0.1), transparent 40%)`,
          }}
        />

        {/* Gradient border on hover */}
        <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-purple-500/50 via-transparent to-blue-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-[1px] rounded-3xl bg-neutral-900" />
        </div>

        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-all duration-700 ease-out group-hover:scale-110 opacity-70 group-hover:opacity-50"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Arrow Icon - Top Right */}
        <motion.div 
          className="absolute top-5 right-5 z-20"
          initial={{ opacity: 0, x: 10, y: -10 }}
          animate={isHovered ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 10, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl group-hover:bg-white/20 transition-colors">
            <ArrowUpRight className="w-5 h-5 text-white" />
          </div>
        </motion.div>

        {/* Featured badge for first card */}
        <div className="absolute top-5 left-5 z-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-3 py-1.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-full border border-white/10"
          >
            <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">Project</span>
          </motion.div>
        </div>

        {/* Content - Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tech.slice(0, 3).map((t, index) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 shadow-lg"
              >
                {t}
              </motion.span>
            ))}
            {tech.length > 3 && (
              <span className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90">
                +{tech.length - 3}
              </span>
            )}
          </div>

          {/* Title with gradient text on hover */}
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 transition-all duration-300 font-display">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-neutral-300 line-clamp-2 leading-relaxed group-hover:text-neutral-200 transition-colors">
            {description}
          </p>

          {/* View project indicator */}
          <motion.div 
            className="mt-4 flex items-center gap-2 text-sm font-medium text-purple-400"
            initial={{ opacity: 0, x: -10 }}
            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            <span>View Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;
