"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TechMarqueeProps {
  items: string[];
  className?: string;
}

const TechMarquee = ({ items, className }: TechMarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // Create rows with different items for variety
  const row1Items = [...items.slice(0, Math.ceil(items.length / 2))];
  const row2Items = [...items.slice(Math.ceil(items.length / 2))];

  // Multiply for seamless scroll
  const multipliedRow1 = [...row1Items, ...row1Items, ...row1Items, ...row1Items];
  const multipliedRow2 = [...row2Items, ...row2Items, ...row2Items, ...row2Items];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Row 1 - scroll based animation (moves right on scroll down)
      if (row1Ref.current) {
        gsap.fromTo(
          row1Ref.current,
          { x: 0 },
          {
            x: -400,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // Row 2 - opposite direction (moves left on scroll down)
      if (row2Ref.current) {
        gsap.fromTo(
          row2Ref.current,
          { x: -200 },
          {
            x: 200,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full h-full overflow-hidden bg-neutral-900/30 backdrop-blur-xl rounded-3xl border border-white/5 flex flex-col justify-center gap-4 py-6",
        className
      )}
    >
      {/* Row 1 - moves left */}
      <div className="relative overflow-hidden">
        <div
          ref={row1Ref}
          className="flex whitespace-nowrap"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          }}
        >
          {multipliedRow1.map((item, index) => (
            <span
              key={index}
              className="mx-4 md:mx-6 text-sm md:text-base font-display font-semibold text-neutral-300 uppercase tracking-[0.2em] hover:text-white transition-colors duration-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 - moves right */}
      <div className="relative overflow-hidden">
        <div
          ref={row2Ref}
          className="flex whitespace-nowrap"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          }}
        >
          {multipliedRow2.map((item, index) => (
            <span
              key={index}
              className={cn(
                "mx-4 md:mx-6 text-sm md:text-base font-display font-semibold uppercase tracking-[0.2em] transition-colors duration-300",
                index % 3 === 0 ? "text-purple-400/80 hover:text-purple-300" : "text-neutral-500 hover:text-neutral-300"
              )}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechMarquee;
