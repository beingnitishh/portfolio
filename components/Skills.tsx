"use client";

import React, { useState, useEffect, useRef } from "react";

// --- Custom Hook for CountUp ---
function useCountUp(target: number, duration: number, startAnim: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnim) return;

    let startTime: number | null = null;
    const cubicEaseOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const current = Math.min(progress / duration, 1);
      const easedProgress = cubicEaseOut(current);

      setCount(Math.floor(easedProgress * target));

      if (current < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(step);
  }, [target, duration, startAnim]);

  return count;
}

// --- Utils ---
function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// --- Types & Data ---
type CardData = {
  id: string;
  badge: string;
  title: string;
  tabMatch: string[];
  color: string;
  span2?: boolean;
  skills: string[];
  metric?: {
    prefix?: string;
    value: number;
    suffix?: string;
    description: string;
  };
};

const TABS = [
  "All Skills",
  "E-Commerce",
  "AI Tools",
  "Web Dev",
  "Analytics",
  "Operations",
  "Design",
];

const CARDS: CardData[] = [
  {
    id: "ecomm",
    badge: "E-COMMERCE",
    title: "E-Commerce Platforms",
    tabMatch: ["E-Commerce"],
    color: "#FF5500",
    span2: true,
    skills: [
      "Shopify",
      "Flipkart Seller Central",
      "Meesho Seller Panel",
      "Store Management",
      "App Integration",
      "Catalog Management",
    ],
    metric: {
      value: 20,
      suffix: "x",
      description: "ROI on Flipkart Ad Spend",
    },
  },
  {
    id: "ai",
    badge: "AI",
    title: "AI Tools",
    tabMatch: ["AI Tools"],
    color: "#A855F7",
    skills: [
      "ChatGPT",
      "Ideogram",
      "Eleven Labs",
      "AI Ad Creation",
      "Prompt Engineering",
    ],
    metric: {
      value: 60,
      suffix: "%",
      description: "content time cut per SKU",
    },
  },
  {
    id: "web",
    badge: "DEVELOPMENT",
    title: "Web Dev (AI-Assisted)",
    tabMatch: ["Web Dev"],
    color: "#F59E0B",
    skills: [
      "React",
      "Tailwind CSS",
      "Recharts",
      "SheetJS",
      "Supabase",
      "Google Sheets API",
    ],
  },
  {
    id: "analytics",
    badge: "DATA",
    title: "Analytics & Reporting",
    tabMatch: ["Analytics"],
    color: "#3B82F6",
    skills: [
      "Microsoft Excel",
      "SKU Performance Tracking",
      "Return Rate Analysis",
      "Earn More Reports",
    ],
  },
  {
    id: "ops",
    badge: "MANAGEMENT",
    title: "Operations",
    tabMatch: ["Operations"],
    color: "#10B981",
    skills: [
      "Product Listing Optimization",
      "Order Processing",
      "Inventory Management",
      "SLA Compliance",
      "Logistics Coordination",
    ],
    metric: {
      prefix: "₹",
      value: 1,
      suffix: "L+",
      description: "daily revenue managed",
    },
  },
  {
    id: "design",
    badge: "CREATIVE",
    title: "Graphic Design",
    tabMatch: ["Design"],
    color: "#EC4899",
    skills: [
      "Product Catalog Design",
      "Amazon A+ Content",
      "EBC Images",
      "Product Banners",
      "Canva",
    ],
  },
  {
    id: "prod",
    badge: "EFFICIENCY",
    title: "Productivity",
    tabMatch: ["Operations", "Analytics"],
    color: "#64748B",
    skills: [
      "MS Office Suite",
      "Shipping Label Sorting",
      "Process Documentation",
    ],
  },
];

const STATS = [
  { value: "40+", label: "Total Skills" },
  { value: "7", label: "Domains" },
  { value: "1.5+", label: "Years Exp." },
  { value: "3", label: "Live Projects" },
  { value: "2", label: "Certifications" },
];

function MetricBlock({
  metric,
  color,
  inView,
}: {
  metric: NonNullable<CardData['metric']>;
  color: string;
  inView: boolean;
}) {
  const count = useCountUp(metric.value, 1400, inView);

  return (
    <div
      className="rounded-lg p-5"
      style={{
        backgroundColor: "var(--card-accent-dim)",
        border: "1px solid var(--card-accent)",
      }}
    >
      <div
        className="text-4xl"
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          color: color,
          lineHeight: 1,
        }}
      >
        {metric.prefix || ""}
        {count}
        {metric.suffix || ""}
      </div>
      <div
        className="mt-3 text-[10px] tracking-widest uppercase"
        style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#aaa" }}
      >
        {metric.description}
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState("All Skills");
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const globals = `
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Syne:wght@700;800&display=swap');

    @keyframes oraclePulse {
      0% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.7); }
      70% { box-shadow: 0 0 0 6px rgba(168, 85, 247, 0); }
      100% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0); }
    }

    .oracle-dot {
      animation: oraclePulse 2s infinite;
    }

    .bento-card {
      border: 0.5px solid #222;
      transition: opacity 0.3s ease, filter 0.3s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
    }

    .bento-card:hover {
      border-color: var(--card-accent) !important;
    }

    .bento-top-bar {
      background-color: var(--card-accent);
      opacity: 0.5;
      transition: opacity 0.3s ease;
    }

    .bento-card:hover .bento-top-bar {
      opacity: 1;
    }

    .skill-chip {
      border: 0.5px solid #333;
      color: #888;
      background-color: transparent;
      transition: all 0.2s ease;
    }

    .skill-chip:hover {
      border-color: var(--card-accent) !important;
      color: var(--card-accent) !important;
      background-color: var(--card-accent-dim) !important;
    }
  `;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="w-full flex justify-center bg-[#080808] py-16 md:py-24 px-4 md:px-6"
    >
      <style dangerouslySetInnerHTML={{ __html: globals }} />
      <div className="w-full max-w-[1200px] flex flex-col">
        {/* Header */}
        <div className="flex flex-col items-start mb-8 md:mb-10 w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-6 bg-[#FF5500]" />
            <span
              className="text-[11px] tracking-[0.2em] text-[#FF5500] uppercase font-medium"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              CAPABILITIES
            </span>
          </div>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl text-white mb-8"
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
          >
            Skills & <span style={{ color: "#FF5500" }}>Expertise</span>
          </h2>

          <div
            className="inline-flex items-center gap-3 rounded-full border px-4 py-2"
            style={{
              borderColor: "#A855F7",
              backgroundColor: hexToRgba("#A855F7", 0.1),
              color: "#A855F7",
            }}
          >
            <div className="h-2 w-2 flex-shrink-0 rounded-full oracle-dot bg-[#A855F7]" />
            <span
              className="text-[11px] sm:text-xs font-medium uppercase tracking-wider"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Oracle Generative AI Professional · 2026
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-10 flex gap-2 overflow-x-auto pb-2 scrollbar-none" style={{ WebkitOverflowScrolling: "touch", msOverflowStyle: "none", scrollbarWidth: "none" }}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="rounded-full px-3 py-1.5 sm:px-5 sm:py-2.5 text-[11px] sm:text-[12px] uppercase tracking-wide transition-colors duration-300"
                style={{
                  flexShrink: 0,
                  fontFamily: "'IBM Plex Mono', monospace",
                  border: isActive ? "1px solid #FF5500" : "1px solid #222",
                  backgroundColor: isActive
                    ? hexToRgba("#FF5500", 0.1)
                    : "transparent",
                  color: isActive ? "#FF5500" : "#888",
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 min-[1100px]:grid-cols-3 gap-3">
          {CARDS.map((card) => {
            const isMatch =
              activeTab === "All Skills" ||
              (card.tabMatch && card.tabMatch.includes(activeTab));
            
            return (
              <div
                key={card.id}
                className={`bento-card relative flex flex-col overflow-hidden bg-[#121212] p-6 rounded-[12px] ${
                  card.span2 ? "col-span-1 min-[1100px]:col-span-2" : "col-span-1"
                }`}
                style={
                  {
                    "--card-accent": card.color,
                    "--card-accent-dim": hexToRgba(card.color, 0.1),
                    opacity: isMatch ? 1 : 0.2,
                    filter: isMatch ? "none" : "grayscale(100%)",
                    transform: inView
                      ? "translateY(0) scale(1)"
                      : "translateY(20px) scale(0.95)",
                  } as React.CSSProperties
                }
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bento-top-bar" />

                <div className="flex items-center justify-between mb-4 mt-1">
                  <div
                    className="rounded px-2 pt-1 pb-0.5 text-[10px] uppercase tracking-wider font-semibold"
                    style={{
                      backgroundColor: "var(--card-accent-dim)",
                      color: "var(--card-accent)",
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  >
                    {card.badge}
                  </div>
                  <div
                    className="text-[10px] uppercase tracking-widest"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#666",
                    }}
                  >
                    {card.skills.length} SKILLS
                  </div>
                </div>

                <h3
                  className="text-2xl mb-6 text-[#eee]"
                  style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700 }}
                >
                  {card.title}
                </h3>

                <div
                  className={`flex flex-wrap gap-2 ${
                    card.metric ? "mb-6" : "mt-auto"
                  }`}
                >
                  {card.skills.map((skill, i) => (
                    <div
                      key={skill}
                      className="skill-chip rounded-full px-2.5 pt-[5px] pb-[4px]"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: "11px",
                        opacity: inView ? 1 : 0,
                        transform: inView ? "translateY(0)" : "translateY(6px)",
                        transition: `opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${
                          i * 40
                        }ms, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${
                          i * 40
                        }ms, background-color 0.2s, border-color 0.2s, color 0.2s`,
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>

                {card.metric && (
                  <div className="mt-auto">
                    <MetricBlock
                      metric={card.metric}
                      color={card.color}
                      inView={inView}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Stat Bar */}
        <div
          className="mt-12 w-full flex flex-col sm:flex-row flex-wrap lg:flex-nowrap items-center justify-around rounded-[12px] p-8 gap-y-8"
          style={{
            backgroundColor: "#121212",
            border: "0.5px solid #222",
            transform: inView
              ? "translateY(0) scale(1)"
              : "translateY(20px) scale(0.95)",
            transition:
              "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, opacity 0.6s ease 0.2s",
            opacity: inView ? 1 : 0,
          }}
        >
          {STATS.map((stat, i) => (
            <React.Fragment key={stat.label}>
              <div className="flex flex-col items-center text-center w-1/2 sm:w-1/3 lg:w-auto">
                <div
                  className="text-4xl text-white mb-2"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-[10px] uppercase text-[#666] tracking-widest whitespace-nowrap"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {stat.label}
                </div>
              </div>
              {i < STATS.length - 1 && (
                <div className="hidden lg:block h-12 w-[1px] bg-[#333]" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
