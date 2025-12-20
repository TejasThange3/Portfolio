"use client";

import { cn } from "@/lib/utils";

interface TechMarqueeProps {
  items: string[];
  className?: string;
}

const TechMarquee = ({ items, className }: TechMarqueeProps) => {
  return (
    <div
      className={cn(
        "w-full overflow-hidden bg-neutral-900 py-4 flex items-center relative",
        className
      )}
    >
      {/* Gradient masks for smooth fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-neutral-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-neutral-900 to-transparent z-10 pointer-events-none" />
      
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, index) => (
          <span
            key={index}
            className="mx-6 text-lg font-semibold text-neutral-300 uppercase tracking-wider"
          >
            {item}
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {items.map((item, index) => (
          <span
            key={`dup-${index}`}
            className="mx-6 text-lg font-semibold text-neutral-300 uppercase tracking-wider"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;
