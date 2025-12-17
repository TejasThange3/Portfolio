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
        "w-full overflow-hidden bg-neutral-900 py-2 flex items-center",
        className
      )}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, index) => (
          <span
            key={index}
            className="mx-4 text-lg font-semibold text-neutral-300 uppercase tracking-wider"
          >
            {item}
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {items.map((item, index) => (
          <span
            key={`dup-${index}`}
            className="mx-4 text-lg font-semibold text-neutral-300 uppercase tracking-wider"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;
