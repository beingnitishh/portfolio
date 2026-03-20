"use client";

import React, { useState, useRef, useEffect } from "react";

// --- Types & Data ---

type Achievement = {
  text: string;
  metric?: string;
};

type ExperienceData = {
  id: string;
  accent: string;
  tag: string;
  current?: boolean;
  period: string;
  role: string;
  company: string;
  headline: string;
  achievements: Achievement[];
  stack: string[];
};



const EXP_DATA: ExperienceData[] = [
  {
    id: "Star work",
    accent: "#FF5500",
    tag: "CURRENT ROLE",
    current: true,
    period: "Nov 2025 — Present",
    role: "E-Commerce Executive",
    company: "Star Work",
    headline: "Multi-platform marketplace operations across Flipkart & Meesho",
    achievements: [
      { text: "20x ROI on Flipkart ad spend", metric: "20x ROI" },
      { text: "₹1,00,000+ daily revenue against ₹5,000 ad budget", metric: "₹1L+/day" },
      { text: "End-to-end Flipkart ops, account health monitoring" },
      { text: "Simultaneous Flipkart + Meesho listings" },
      { text: "Dual-platform Excel records, Earn More Reports analysis" },
    ],
    stack: ["Flipkart Seller Central", "Meesho Seller Panel", "Microsoft Excel", "Keyword Bidding"],
  },
  {
    id: "jmd",
    accent: "#10B981",
    tag: "MARKETPLACE OPS",
    period: "May 2025 — Nov 2025",
    role: "E-Commerce Executive",
    company: "JMD Enterprise",
    headline: "Marketplace operations and catalog management across major platforms",
    achievements: [
      { text: "Managed listings/catalog/order processing" },
      { text: "Inventory tracking to prevent overselling" },
      { text: "Optimized product titles/descriptions/images for visibility" },
      { text: "Coordinated with logistics for SLA compliance" },
    ],
    stack: ["Marketplace Management", "Microsoft Excel", "Catalog Management", "Inventory Tracking"],
  },
  {
    id: "zolaris",
    accent: "#A855F7",
    tag: "FASHION E-COMM",
    period: "Jan 2024 — Nov 2024",
    role: "E-Commerce Executive",
    company: "Zolaris Clothing",
    headline: "Full Shopify store management with AI-accelerated content production",
    achievements: [
      { text: "~60% content time reduction per SKU via ChatGPT + Ideogram", metric: "60% faster" },
      { text: "Near-zero listing error rate" },
      { text: "Shopify storefront design + third-party app integration" },
      { text: "Structured Excel records" },
    ],
    stack: ["Shopify", "ChatGPT", "Ideogram", "Microsoft Excel"],
  },
];



// --- Subcomponents ---

function ExperienceCard({
  data,
  isOpen,
  onToggle,
  inView,
  index,
}: {
  data: ExperienceData;
  isOpen: boolean;
  onToggle: () => void;
  inView: boolean;
  index: number;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="exp-card relative flex flex-col w-full overflow-hidden"
      style={{
        "--card-accent": data.accent,
        "--card-accent-dim": `${data.accent}1A`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 120
          }ms, opacity 0.6s ease ${index * 120
          }ms, border-color 0.3s ease`,
      } as React.CSSProperties}
    >
      <div className="absolute inset-x-0 top-0 h-[2px] card-top-bar" />

      {/* Header (Clickable) */}
      <div
        className="flex items-start justify-between cursor-pointer px-[22px] py-[18px]"
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        <div className="flex flex-col gap-2">
          {/* Badge & Period row */}
          <div className="flex flex-wrap items-center gap-2">
            <div
              className={`flex items-center gap-2 rounded px-2 pt-1 pb-0.5 text-[10px] uppercase tracking-wider font-semibold ${data.current ? "bg-[#10B9811A] text-[#10B981]" : "bg-[#ffffff0A] text-[#ffffff80]"
                }`}
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {data.current && <div className="h-1.5 w-1.5 rounded-full bg-[#10B981] active-pulse" />}
              {data.tag}
            </div>
            <span
              className="text-[10px] uppercase tracking-wide text-[#888]"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {data.period}
            </span>
          </div>

          {/* Role & Company */}
          <div>
            <h3
              className="text-[18px] text-white leading-tight"
              style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
            >
              {data.role}
            </h3>
            <div
              className="mt-0.5 text-[14px] font-medium"
              style={{ color: "var(--card-accent)" }}
            >
              @{data.company}
            </div>
          </div>
        </div>

        {/* Toggle Button */}
        <div
          className="flex h-[26px] w-[26px] items-center justify-center rounded-full transition-transform duration-300"
          style={{
            backgroundColor: "var(--card-accent-dim)",
            color: "var(--card-accent)",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 1V11M1 6H11" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Expandable Body */}
      <div
        className="overflow-hidden transition-all duration-[380ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight || 800}px` : "0px",
        }}
      >
        <div ref={contentRef} className="px-[22px] pb-[18px] pt-1">
          {/* Headline */}
          <div
            className="pl-3 py-0.5 mb-5 text-[12px] text-[#aaa] border-l-[2px]"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              borderColor: `${data.accent}80`,
            }}
          >
            {data.headline}
          </div>

          {/* Achievements */}
          <div className="flex flex-col gap-3 mb-6">
            {data.achievements.map((ach, i) => (
              <div
                key={i}
                className="flex items-start gap-3"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateX(0)" : "translateX(-8px)",
                  transition: `all 0.4s ease ${150 + i * 60}ms`,
                }}
              >
                <div
                  className="mt-[6px] h-[5px] w-[5px] flex-shrink-0 rounded-full"
                  style={{ backgroundColor: "var(--card-accent)" }}
                />
                <div
                  className="text-[12px] leading-relaxed text-[#bbb]"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {ach.text}
                  {ach.metric && (
                    <span
                      className="inline-block ml-2 rounded px-1.5 py-0.5 text-[11px] font-medium"
                      style={{
                        backgroundColor: "var(--card-accent-dim)",
                        color: "var(--card-accent)",
                      }}
                    >
                      {ach.metric}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Tech Chips */}
          <div className="pt-4 border-t border-[#333] flex flex-wrap gap-2">
            {data.stack.map((skill) => (
              <div
                key={skill}
                className="tech-chip rounded-full px-2.5 pt-[3px] pb-[2px]"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "11px",
                }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



// --- Main Component ---

export default function Experience() {
  const [openStates, setOpenStates] = useState<boolean[]>([true, false, false]);
  const [expInView, setExpInView] = useState(false);
  const expRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };

    const expObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.1) setExpInView(true);
    }, observerOptions);

    if (expRef.current) expObserver.observe(expRef.current);

    return () => {
      expObserver.disconnect();
    };
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenStates((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const globals = `
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Syne:wght@700;800&display=swap');

    :root {
      --color-background-secondary: #121212;
      --color-border-tertiary: #333333;
    }

    @keyframes activePulse {
      0% { opacity: 1; }
      50% { opacity: 0.35; }
      100% { opacity: 1; }
    }

    .active-pulse {
      animation: activePulse 2s infinite ease-in-out;
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
    <section className="w-full flex justify-center bg-[#080808] py-16 md:py-24 px-4 md:px-6">
      <style dangerouslySetInnerHTML={{ __html: globals }} />
      <div className="w-full max-w-[1200px] flex flex-col gap-24 md:gap-32">
        {/* BLOCK 1: EXPERIENCE */}
        <div ref={expRef} className="flex flex-col">
          {/* Section Header */}
          <div className="flex flex-col items-start mb-8 md:mb-12 w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-[24px] bg-[#FF5500]" />
              <span
                className="text-[11px] tracking-[0.2em] text-[#FF5500] uppercase font-semibold"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                WORK HISTORY
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between w-full gap-4">
              <h2
                className="text-4xl sm:text-5xl md:text-6xl text-white"
                style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
              >
                Experience
              </h2>
              <div
                className="text-right text-[12px] text-[#666]"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                2+ years · 3 companies
              </div>
            </div>
          </div>

          {/* Timeline + Accordions Wrapper */}
          <div className="flex flex-row w-full gap-3 sm:gap-6 lg:gap-8">
            {/* Timeline Spine */}
            <div className="flex flex-col items-center pt-[24px]">
              {EXP_DATA.map((exp, i) => (
                <React.Fragment key={exp.id}>
                  <div
                    className="w-[9px] h-[9px] rounded-full z-10"
                    style={{
                      backgroundColor: exp.accent,
                      boxShadow: exp.current ? `0 0 8px ${exp.accent}70` : "none",
                    }}
                  />
                  {i < EXP_DATA.length - 1 && (
                    <div
                      className="w-[1.5px] h-[44px] my-2"
                      style={{
                        background: "linear-gradient(to bottom, rgba(255,255,255,0.10), rgba(255,255,255,0.02))",
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Accordion Cards */}
            <div className="flex flex-col flex-1 gap-[12px]">
              {EXP_DATA.map((exp, i) => (
                <ExperienceCard
                  key={exp.id}
                  data={exp}
                  index={i}
                  isOpen={openStates[i]}
                  onToggle={() => toggleAccordion(i)}
                  inView={expInView}
                />
              ))}
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
