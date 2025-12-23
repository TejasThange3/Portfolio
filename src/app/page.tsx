"use client";

import { useState } from "react";
import ScrollytellingPortfolio from "@/components/ScrollytellingPortfolio";
import ThemeToggle from "@/components/shared/ThemeToggle";
import Preloader from "@/components/shared/Preloader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Preloader onComplete={() => setIsLoading(false)} />
      {!isLoading && (
        <>
          <ThemeToggle />
          <ScrollytellingPortfolio />
        </>
      )}
    </>
  );
}
