"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Wisdom", href: "#wisdom" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(
    () => {
      if (!navRef.current) return;

      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          delay: 2.4,
        }
      );
    },
    { scope: navRef }
  );

  const isDark = resolvedTheme === "dark";

  const navBackground = scrolled
    ? isDark
      ? "rgba(10, 10, 10, 0.75)"
      : "rgba(245, 240, 232, 0.80)"
    : "transparent";

  const navBackdrop = scrolled ? "blur(16px) saturate(180%)" : "none";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-[100] opacity-0"
        style={{
          background: navBackground,
          backdropFilter: navBackdrop,
          WebkitBackdropFilter: navBackdrop,
          transition: "all 300ms ease",
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-10 h-16">
          <span
            className="text-base font-bold"
            style={{
              letterSpacing: "0.3em",
              color: "var(--accent)",
            }}
          >
            T · T
          </span>

          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="uppercase transition-colors duration-200"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.12em",
                  color: "var(--text-secondary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {mounted && (
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="rounded-full flex items-center justify-center transition-colors duration-200"
                style={{
                  width: "34px",
                  height: "34px",
                  background: "transparent",
                  border: "1px solid transparent",
                  color: "var(--accent)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "transparent";
                }}
              >
                {isDark ? (
                  <Moon size={18} strokeWidth={1.5} />
                ) : (
                  <Sun size={18} strokeWidth={1.5} />
                )}
              </button>
            )}

            <button
              type="button"
              className="md:hidden flex flex-col justify-center gap-[5px] p-1"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <span
                className="block h-px w-5"
                style={{ backgroundColor: "var(--accent)" }}
              />
              <span
                className="block h-px w-5"
                style={{ backgroundColor: "var(--accent)" }}
              />
              <span
                className="block h-px w-5"
                style={{ backgroundColor: "var(--accent)" }}
              />
            </button>
          </div>
        </div>
      </nav>

      <div
        className="fixed inset-0 z-[200] md:hidden"
        style={{
          backgroundColor: "var(--bg-primary)",
          opacity: menuOpen ? 0.97 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 400ms ease, opacity 400ms ease",
        }}
      >
        <button
          type="button"
          className="absolute top-6 right-6 text-3xl leading-none"
          style={{ color: "var(--text-primary)" }}
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        >
          ×
        </button>

        <div className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="uppercase transition-colors duration-200"
              style={{
                fontSize: "24px",
                letterSpacing: "0.12em",
                color: "var(--text-secondary)",
              }}
              onClick={() => setMenuOpen(false)}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
