"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import ScrollytellingPortfolio from "@/components/ScrollytellingPortfolio";
import ThemeToggle from "@/components/shared/ThemeToggle";
import Preloader from "@/components/shared/Preloader";

// Dynamically import IntroSequence for better performance
const IntroSequence = dynamic(() => import("@/components/intro/IntroSequence"), {
  ssr: false,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Preloader onComplete={() => setIsLoading(false)} />
      {!isLoading && (
        <div className="relative">
          {/* Intro Sequence - 300vh scroll container with sticky overlay */}
          <IntroSequence />
          
          {/* Main Portfolio Content - sits behind the intro, revealed after scroll */}
          <div className="relative">
            <ThemeToggle />
            <ScrollytellingPortfolio />
          </div>
        </div>
      )}
    </>
  );
}
