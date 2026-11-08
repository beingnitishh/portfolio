"use client";

import { useEffect, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import type { ProjectCardData } from "@/lib/projects";

/** Homepage column layout. /projects passes its own. */
export const HOMEPAGE_GRID_CLASS = "grid grid-cols-1 sm:grid-cols-2 min-[1000px]:grid-cols-3 gap-[12px]";

const CARD_CSS = `
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Syne:wght@700;800&display=swap');

    :root {
      --color-background-secondary: #121212;
      --color-border-tertiary: #333333;
    }

    .exp-card {
      background-color: var(--color-background-secondary);
      border: 0.5px solid var(--color-border-tertiary);
      border-radius: 14px;
      transition: opacity 0.3s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
    }

    .exp-card:hover {
      border-color: var(--card-accent) !important;
    }

    /* Keyboard focus on the case-study link highlights the whole card. */
    .exp-card:has(.card-link:focus-visible) {
      border-color: var(--card-accent) !important;
      outline: 2px solid var(--card-accent);
      outline-offset: 3px;
    }

    .card-top-bar {
      background-color: var(--card-accent);
      opacity: 0.35;
      transition: opacity 0.3s ease;
    }

    .exp-card:hover .card-top-bar,
    .exp-card:has(.card-link:focus-visible) .card-top-bar {
      opacity: 1;
    }

    .live-link:focus-visible {
      outline: 2px solid var(--card-accent);
      outline-offset: 2px;
      border-radius: 4px;
    }

    .tech-chip {
      background-color: transparent;
      border: 0.5px solid var(--color-border-tertiary);
      color: #888;
      transition: all 0.2s ease;
    }

    .tech-chip:hover {
      border-color: var(--card-accent) !important;
      color: var(--card-accent) !important;
      background-color: var(--card-accent-dim) !important;
    }

    @media (prefers-reduced-motion: reduce) {
      .project-card {
        transition: none !important;
      }
    }
  `;

/**
 * Staggered project card grid used by the homepage and /projects.
 * Cards fade and rise in once the grid scrolls into view.
 */
export default function ProjectGrid({
  cards,
  className = HOMEPAGE_GRID_CLASS,
}: {
  cards: ProjectCardData[];
  className?: string;
}) {
  const [inView, setInView] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.1) setInView(true);
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CARD_CSS }} />
      <div ref={gridRef} className={className}>
        {cards.map((card, i) => (
          <ProjectCard key={card.id} data={card} index={i} inView={inView} />
        ))}
      </div>
    </>
  );
}
