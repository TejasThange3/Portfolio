"use client";

import { cn } from "@/lib/utils";

interface TechMarqueeProps {
  items: string[];
  className?: string;
}

const TechMarquee = ({ items, className }: TechMarqueeProps) => {
  // Multiply skills array for seamless infinite scroll
  const multipliedItems = [...items, ...items, ...items, ...items];
  
  return (
    <div
      className={cn(
        "w-full overflow-hidden backdrop-blur-xl py-4 flex items-center relative",
        className
      )}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {multipliedItems.map((item, index) => (
          <span
            key={index}
            className="mx-6 text-base font-mono font-semibold text-neutral-400 uppercase tracking-widest"
          >
            {item}
          </span>
        ))}
        {/* Duplicate again for seamless loop */}
        {multipliedItems.map((item, index) => (
          <span
            key={`dup-${index}`}
            className="mx-6 text-base font-mono font-semibold text-neutral-400 uppercase tracking-widest"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;
