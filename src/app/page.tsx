"use client";

import { useState } from "react";
import Hero from "@/components/home/Hero";
import BentoGrid from "@/components/home/BentoGrid";
import ThemeToggle from "@/components/shared/ThemeToggle";
import Preloader from "@/components/shared/Preloader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Preloader onComplete={() => setIsLoading(false)} />
      {!isLoading && <ThemeToggle />}
      <div className="w-full min-h-screen">
        <Hero />
        <div id="projects" className="pb-20">
          <BentoGrid />
        </div>
      </div>
    </>
  );
}
