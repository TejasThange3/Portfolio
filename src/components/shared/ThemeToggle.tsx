"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-8 right-8 z-50 px-4 py-3 bg-neutral-900/50 dark:bg-neutral-900/50 light:bg-white/50 backdrop-blur-md hover:bg-neutral-800/50 border border-white/5 dark:border-white/5 light:border-black/5 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] transition-all duration-300 group"
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
