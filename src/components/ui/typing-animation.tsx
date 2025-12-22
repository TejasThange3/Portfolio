"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  text: string;
  duration?: number;
  className?: string;
  delay?: number;
  onComplete?: () => void;
}

export function TypingAnimation({
  text,
  duration = 100,
  className,
  delay = 0,
  onComplete,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startDelay);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    indexRef.current = 0;
    setDisplayedText("");

    const typingEffect = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayedText(text.slice(0, indexRef.current + 1));
        indexRef.current += 1;
      } else {
        clearInterval(typingEffect);
        onComplete?.();
      }
    }, duration);

    return () => clearInterval(typingEffect);
  }, [text, duration, started, onComplete]);

  return (
    <span className={cn("inline-block", className)}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
