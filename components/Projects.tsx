"use client";

import React, { useState, useRef, useEffect } from "react";

type ProjectData = {
  id: string;
  accent: string;
  badge: string;
  url: string;
  title: string;
  desc: string;
  highlights: string[];
  stack: string[];
};

const PROJ_DATA: ProjectData[] = [
  {
    id: "sellermetric",
    accent: "#3B82F6",
    badge: "LIVE",
    url: "https://sellermetrics.netlify.app",
    title: "SellerMetric",
    desc: "Web analytics platform for Flipkart sellers",
    highlights: [
      "Upload & analyze Earn More Reports in-browser (no backend)",
      "Recharts dashboards for profit/SKU/return rate",
      "Surfaces loss-making products from raw data",
    ],
    stack: ["React", "Tailwind CSS", "Recharts", "SheetJS"],
  },
  {
    id: "portfolio",
    accent: "#EC4899",
    badge: "PERSONAL",
    url: "",
    title: "Personal Portfolio",
    desc: "Dark-themed portfolio with canvas animations & fluid motion design",
    highlights: [
      "Next.js App Router for SSR and optimized asset delivery",
      "Framer Motion page transitions + scroll-triggered reveals + micro-interactions",
      "Canvas API drives generative background animations without impacting layout",
      "Custom Tailwind dark design system across all sections",
    ],
    stack: ["Next.js", "Framer Motion", "Tailwind CSS", "Canvas"],
  },
  {
    id: "warranty",
    accent: "#10B981",
    badge: "DEPLOYED",
    url: "",
    title: "Star Work Warranty Portal",
    desc: "Branded warranty registration with dual-backend architecture",
    highlights: [
      "Google Sheets + Supabase synced on submission",
      "Multi-step form captures customer/product/purchase data",
      "Replaced manual spreadsheet entry with self-serve flow",
    ],
    stack: ["React", "Google Sheets API", "Supabase"],
  },
  {
    id: "meesho",
    accent: "#F59E0B",
    badge: "TOOL",
    url: "",
    title: "Meesho Label Sorter Pro",
    desc: "Shipping label parser eliminating manual courier sorting",
    highlights: [
      "Parses Meesho label files and groups orders by courier automatically",
      "Built for sellers managing 50+ daily shipments across multiple providers",
    ],
    stack: ["JavaScript"],
  },
];

function ProjectCard({
  data,
  inView,
  index,
}: {
  data: ProjectData;
  inView: boolean;
  index: number;
}) {
  return (
    <div
      className="exp-card relative flex flex-col h-full overflow-hidden p-[18px]"
      style={{
        "--card-accent": data.accent,
        "--card-accent-dim": `${data.accent}1A`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 100
          }ms, opacity 0.6s ease ${index * 100}ms, border-color 0.3s ease`,
      } as React.CSSProperties}
    >
      <div className="absolute inset-x-0 top-0 h-[2px] card-top-bar" />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="rounded px-2 pt-1 pb-0.5 text-[10px] uppercase tracking-wider font-semibold"
          style={{
            backgroundColor: "var(--card-accent-dim)",
            color: "var(--card-accent)",
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          {data.badge}
        </div>

        {data.url && (
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] uppercase font-medium text-[#888] hover:text-[var(--card-accent)] transition-colors opacity-65 hover:opacity-100"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            ↗ Visit
          </a>
        )}
      </div>

      {/* Info */}
      <h3
        className="text-[14px] text-[#eee] mb-2 leading-tight"
        style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
      >
        {data.title}
      </h3>
      <p
        className="text-[11px] text-[#aaa] mb-5 leading-relaxed"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        {data.desc}
      </p>

      {/* Highlights */}
      <div className="flex flex-col gap-2 mb-6 flex-1">
        {data.highlights.map((hlt, i) => (
          <div key={i} className="flex items-start gap-2">
            <div
              className="mt-[5px] h-[4px] w-[4px] flex-shrink-0 rounded-full"
              style={{ backgroundColor: "var(--card-accent)" }}
            />
            <div
              className="text-[11px] leading-relaxed text-[#888]"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {hlt}
            </div>
          </div>
        ))}
      </div>

      {/* Chips */}
      <div className="mt-auto pt-4 flex flex-wrap gap-2">
        {data.stack.map((skill) => (
          <div
            key={skill}
            className="tech-chip rounded-full px-2 pt-[3px] pb-[2px]"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "10px",
            }}
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [projInView, setProjInView] = useState(false);
  const projRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };

    const projObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.1) setProjInView(true);
    }, observerOptions);

    if (projRef.current) projObserver.observe(projRef.current);

    return () => {
      projObserver.disconnect();
    };
  }, []);

  const globals = `
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

    .card-top-bar {
      background-color: var(--card-accent);
      opacity: 0.35;
      transition: opacity 0.3s ease;
    }

    .exp-card:hover .card-top-bar {
      opacity: 1;
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
  `;

  return (
    <section className="w-full flex justify-center bg-[#080808] pt-0 pb-12 sm:pb-16 md:pb-24 px-4 md:px-6">
      <style dangerouslySetInnerHTML={{ __html: globals }} />
      <div className="w-full max-w-[1200px] flex flex-col gap-24 md:gap-32">
        {/* BLOCK: PROJECTS */}
        <div ref={projRef} id="projects" className="flex flex-col">
          {/* Section Header */}
          <div className="flex flex-col items-start mb-8 md:mb-10 w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-[24px] bg-[#3B82F6]" />
              <span
                className="text-[11px] tracking-[0.2em] text-[#3B82F6] uppercase font-semibold"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                BUILT
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between w-full gap-4">
              <h2
                className="text-4xl sm:text-5xl md:text-6xl text-white"
                style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
              >
                Projects
              </h2>
              <a
                href="https://sellermetrics.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-right text-[12px] text-[#3B82F6] hover:underline"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                ↗ sellermetric.netlify.app
              </a>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 min-[900px]:grid-cols-2 min-[1100px]:grid-cols-4 gap-[12px]">
            {PROJ_DATA.map((proj, i) => (
              <ProjectCard key={proj.id} data={proj} index={i} inView={projInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
