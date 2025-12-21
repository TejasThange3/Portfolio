"use client";

import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user has a preference
    const theme = localStorage.getItem("theme");
    if (theme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-8 right-8 z-50 px-4 py-3 bg-neutral-900/50 backdrop-blur-md hover:bg-neutral-800/50 border border-white/5 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      <div className="flex items-center gap-2">
        {isDark ? (
          <>
            <Sun className="w-4 h-4 text-neutral-400 group-hover:text-yellow-400 transition-colors" />
            <span className="text-xs font-medium text-neutral-400 group-hover:text-yellow-400 transition-colors">Light</span>
          </>
        ) : (
          <>
            <Moon className="w-4 h-4 text-neutral-600 group-hover:text-blue-400 transition-colors" />
            <span className="text-xs font-medium text-neutral-600 group-hover:text-blue-400 transition-colors">Dark</span>
          </>
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
