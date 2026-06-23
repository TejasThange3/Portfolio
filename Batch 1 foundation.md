# CURSOR PROMPT — BATCH 1: FOUNDATION

# Portfolio: Tejas Thange — AI & ML Engineer

# Next.js 15 + TypeScript + Tailwind CSS

# ─────────────────────────────────────────────────────────────

## SYSTEM ROLE & PHILOSOPHY

You are an Awwwards-winning Creative Developer and Senior Next.js Architect.
We are elevating an existing Next.js 15 + TypeScript + Tailwind CSS portfolio
for Tejas Thange, an AI & ML Engineer based in Pune, India.

Target audience: Hiring managers and technical recruiters at top-tier AI,
fintech, and deep-tech companies.

Aesthetic directive: Ultra-premium, ruthlessly minimalist, technically
flawless. No bloated animations. Only silky, intentional motion. Every pixel
must feel deliberate.

---

## STRICT TECHNICAL RULES — READ BEFORE WRITING ANY CODE

These apply to every single file you touch in this entire project:

1. GSAP: You MUST use `@gsap/react` and the `useGSAP()` hook for ALL GSAP
   animations. NEVER use raw GSAP inside `useEffect`. This is mandatory for
   React 19 / Next.js 15 to prevent memory leaks and hydration errors.

2. Smooth Scroll: Use `@studio-freight/react-lenis` (the React wrapper),
   NOT the base `@studio-freight/lenis` package directly.

3. Client boundary: Every component that uses animations, scroll events,
   mouse tracking, or browser APIs must have `"use client"` at the top.
   Keep all other components as server components.

4. No hardcoded hex values anywhere. Every color must reference a CSS
   custom property from globals.css.

5. Do not modify more than what is specified. Do not refactor unrelated
   files. Do not rename existing components unless instructed.

---

## BATCH 1 SCOPE: FOUNDATION (4 tasks)

This batch sets up the infrastructure everything else depends on.
Complete all 4 tasks, then STOP and wait for my review.

---

### TASK 1 — Install Dependencies

Install the following packages:

```bash
npm install @gsap/react gsap @studio-freight/react-lenis react-parallax-tilt
```

Confirm framer-motion is already in package.json (it should be — do not
reinstall). Confirm the installed versions and list them in a comment at
the top of a new file: `lib/dependencies.ts` (just a comment block, no
actual exports needed).

---

### TASK 2 — CSS Custom Properties (globals.css)

Replace or augment the existing :root and .dark blocks in globals.css with
the following complete token system. Do not remove any existing Tailwind
directives.

```css
:root {
  /* === LIGHT MODE === */
  --bg-primary: #f5f0e8; /* warm parchment — NOT cold white */
  --bg-surface: #ede8df;
  --bg-card: #ffffff;
  --text-primary: #0f0f0f;
  --text-secondary: #5a5a5a;
  --accent: #a67c20; /* darker gold — readable on light bg */
  --accent-light: #c9922a;
  --accent-glow: rgba(166, 124, 32, 0.25);
  --border: rgba(166, 124, 32, 0.2);
  --border-subtle: rgba(166, 124, 32, 0.08);
}

.dark {
  /* === DARK MODE === */
  --bg-primary: #0a0a0a;
  --bg-surface: #111111;
  --bg-card: #141414;
  --text-primary: #f2f0eb;
  --text-secondary: #8a8a8a;
  --accent: #d4af37; /* premium gold */
  --accent-light: #e0c050;
  --accent-glow: rgba(212, 175, 55, 0.2);
  --border: rgba(212, 175, 55, 0.18);
  --border-subtle: rgba(212, 175, 55, 0.07);
}

/* === TYPOGRAPHY BASE === */
body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition:
    background-color 0.4s ease,
    color 0.4s ease;
}
```

Also ensure the `html` tag has `class="dark"` set by default in the root
layout (dark is the primary experience).

---

### TASK 3 — Lenis Smooth Scroll Provider

Create a new file: `components/providers/SmoothScrollProvider.tsx`

```tsx
"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: Props) {
  useEffect(() => {
    // Sync GSAP ScrollTrigger with Lenis
    ScrollTrigger.refresh();
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
```

Wrap the entire `<body>` content in `app/layout.tsx` with this provider.
Place it as the outermost wrapper, inside the ThemeProvider if one exists.

---

### TASK 4 — Navbar (new component, does not exist yet)

Create: `components/Navbar.tsx`

Exact specifications:

STRUCTURE:

- Fixed position, top 0, full width, z-index 100
- Left side: "T · T" monogram — font-size 16px, font-weight 700,
  letter-spacing 0.3em, color: var(--accent)
- Center: navigation links — Home, About, Projects, Wisdom, Contact
  font-size: 12px, text-transform: uppercase, letter-spacing: 0.12em,
  color: var(--text-secondary), hover color: var(--accent), transition 200ms
- Right side: theme toggle button (moon icon in dark mode, sun icon in
  light mode) — 34x34px, rounded-full, no background, border 1px solid
  transparent, hover: border-color var(--border), transition 200ms

SCROLL BEHAVIOR:

- Default (top of page): background fully transparent, no blur
- After 80px of scroll: background rgba(10,10,10,0.75) in dark /
  rgba(245,240,232,0.80) in light, backdrop-filter: blur(16px) saturate(180%)
- Transition: all properties over 300ms ease

ENTRANCE ANIMATION (use useGSAP):

- On mount, animate the navbar in: from { opacity: 0, y: -16 } to
  { opacity: 1, y: 0 }, duration 0.7s, ease: "power2.out", delay 2.4s
  (after the loading screen finishes)

MOBILE:

- Below 768px: hide center nav links
- Show a hamburger icon (three lines, 20px, gold) on the right instead
- On click, show a full-screen overlay panel (z-index 200, bg var(--bg-primary),
  opacity 0.97) with the nav links stacked vertically, centered, 24px font
- Overlay slides in from right: translateX(100%) → translateX(0), 400ms ease
- Close button (×) top right of overlay

Add `<Navbar />` to `app/layout.tsx`, above the SmoothScrollProvider children
but inside the body.

---

## STOP HERE

After completing all 4 tasks above:

1. Confirm the site still compiles with `npm run dev`
2. Confirm no TypeScript errors
3. List every file you created or modified
4. Wait for my approval before starting Batch 2

Do NOT touch the loading screen, hero, or any other sections yet.
