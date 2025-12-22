"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ShinyButtonProps {
  text?: string;
  href?: string;
  className?: string;
  onClick?: () => void;
}

export function ShinyButton({
  text = "Click me",
  href,
  className,
  onClick,
}: ShinyButtonProps) {
  const handleClick = () => {
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
    onClick?.();
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      onClick={handleClick}
      className={cn(
        "group relative rounded-full px-6 py-3 font-medium backdrop-blur-xl transition-all duration-300 ease-out",
        "bg-gradient-to-r from-purple-500/10 to-blue-500/10",
        "hover:from-purple-500/20 hover:to-blue-500/20",
        "hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]",
        "border border-white/10 hover:border-white/20",
        className
      )}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      </div>
      
      <span className="relative flex items-center gap-2 text-white font-medium">
        {text}
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </span>
    </motion.button>
  );
}
