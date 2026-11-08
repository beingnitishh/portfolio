"use client";

import React, { useEffect, useRef, useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import SiteFooter from "@/components/SiteFooter";

// --- Types & Data ---

type EducationData = {
  id: string;
  name: string;
  accent: string;
  tag: string;
  iconText: string;
  level: string;
  board: string;
  period: string;
  aggregate: string;
  subjectHighlight?: string;
};

type CertificationData = {
  id: string;
  title: string;
  accent: string;
  tag: string;
  verified: boolean;
  issuer: string;
  year: string;
  skills: string[];
  credentialUrl?: string;
};

const EDU_DATA: EducationData[] = [
  {
    id: "class12",
    name: "Mahatma J.F. Public School",
    accent: "#FF5500",
    tag: "SENIOR SECONDARY",
    iconText: "12",
    level: "Intermediate — Class XII · Humanities",
    board: "CBSE",
    period: "2024 — 2025",
    aggregate: "80%",
    subjectHighlight: "78% in Economics",
  },
  {
    id: "class10",
    name: "Dehradoon International School",
    accent: "#A855F7",
    tag: "SECONDARY",
    iconText: "10",
    level: "High School — Class X",
    board: "CBSE",
    period: "2022 — 2023",
    aggregate: "71%",
  },
];

const CERT_DATA: CertificationData[] = [
  {
    id: "google-ads-search",
    title: "Google Ads Search Professional",
    accent: "#4285F4",
    tag: "PROFESSIONAL CERT",
    verified: true,
    issuer: "Google",
    year: "2026",
    skills: ["Search Campaigns", "Keyword Strategy", "Ad Quality & Bidding"],
    credentialUrl: "https://skillshop.credential.net/88e4e44b-60cc-4734-a48d-cdd1e6377dd6#acc.NEn9Wx5p",
  },
  {
    id: "oracle",
    title: "Oracle Generative AI Professional",
    accent: "#F59E0B",
    tag: "PROFESSIONAL CERT",
    verified: true,
    issuer: "Oracle",
    year: "2025",
    skills: ["Generative AI Fundamentals", "Prompt Engineering", "Enterprise AI Integration"],
  },
  {
    id: "be10x",
    title: "AI Tools Workshop",
    accent: "#3B82F6",
    tag: "WORKSHOP",
    verified: false,
    issuer: "BE10x",
    year: "2025",
    skills: ["AI Report Generation", "Product Photography (GenAI)", "AI Ad Creation", "10–20 Min Production Cycle"],
  },
];

// --- Subcomponents ---

function EduCard({ data, inView, index }: { data: EducationData; inView: boolean; index: number }) {
  return (
    <div
      className="bento-base group relative flex flex-col w-full h-full overflow-hidden"
      style={{
        "--card-accent": data.accent,
        "--card-accent-dim": `${data.accent}1A`, // ~10% opacity
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 100
          }ms, opacity 0.6s ease ${index * 100}ms, border-color 0.3s ease`,
        padding: "20px 22px",
      } as React.CSSProperties}
    >
      <div className="absolute inset-x-0 top-0 h-[2px] card-top-bar" />

      {/* Top Row: Tag & Icon */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="rounded px-2 pt-1 pb-0.5 mt-1 text-[10px] uppercase tracking-wider font-semibold"
          style={{
            backgroundColor: "var(--card-accent-dim)",
            color: "var(--card-accent)",
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          {data.tag}
        </div>
        <div
          className="flex h-[42px] w-[42px] rounded-[9px] items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: "var(--card-accent-dim)",
            border: `0.5px solid ${data.accent}4D`, // 0.3 opacity hex approx 4D
          }}
        >
          <span
            className="text-[18px]"
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "var(--card-accent)" }}
          >
            {data.iconText}
          </span>
        </div>
      </div>

      {/* Content */}
      <h3
        className="text-[17px] text-[#eee] mb-1 leading-tight"
        style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
      >
        {data.name}
      </h3>
      <p
        className="text-[12px] text-[#aaa] mb-1"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        {data.level}
      </p>
      <p
        className="text-[11px] text-[#ffffff99] mb-5"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        {data.board} · {data.period}
      </p>

      {/* Metric Box */}
      <div
        className="mt-auto flex items-center rounded-[9px] px-[15px] py-[13px] gap-4"
        style={{
          backgroundColor: "var(--card-accent-dim)",
          border: `0.5px solid ${data.accent}40`, // 0.25 opacity hex approx 40
        }}
      >
        <div className="flex flex-col">
          <span
            className="text-[30px] leading-none mb-[2px]"
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "var(--card-accent)" }}
          >
            {data.aggregate}
          </span>
          <span
            className="text-[10px] uppercase tracking-wider"
            style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--card-accent)", opacity: 0.8 }}
          >
            AGGREGATE
          </span>
        </div>

        {data.subjectHighlight && (
          <>
            <div
              className="w-[1px] h-[34px]"
              style={{ backgroundColor: `${data.accent}4D` }}
            />
            <div className="flex flex-col">
              <span
                className="text-[13px] leading-tight mb-[2px]"
                style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, color: "var(--card-accent)" }}
              >
                {data.subjectHighlight}
              </span>
              <span
                className="text-[10px] uppercase tracking-wider"
                style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--card-accent)", opacity: 0.8 }}
              >
                SUBJECT SCORE
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CertCard({ data, inView, index }: { data: CertificationData; inView: boolean; index: number }) {
  const Wrapper = data.credentialUrl ? "a" : "div";
  const linkProps = data.credentialUrl
    ? {
        href: data.credentialUrl,
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <Wrapper
      {...linkProps}
      className="bento-base group relative flex flex-col w-full h-full overflow-hidden"
      style={{
        "--card-accent": data.accent,
        "--card-accent-dim": `${data.accent}1A`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 100
          }ms, opacity 0.6s ease ${index * 100}ms, border-color 0.3s ease`,
        padding: "20px 22px",
      } as React.CSSProperties}
    >
      <div className="absolute inset-x-0 top-0 h-[2px] card-top-bar" />

      {/* Top Row: Tag & Verified */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="rounded px-2 pt-1 pb-0.5 text-[10px] uppercase tracking-wider font-semibold"
          style={{
            backgroundColor: "var(--card-accent-dim)",
            color: "var(--card-accent)",
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          {data.tag}
        </div>
        {data.verified && (
          <div
            className="flex items-center gap-[5px] text-[#10B981] text-[10px] font-medium tracking-wide mt-1"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            <div className="h-[5px] w-[5px] rounded-full bg-[#10B981] pulse-dot" />
            VERIFIED
          </div>
        )}
      </div>

      {/* Content */}
      <h3
        className="text-[16px] sm:text-[17px] text-[#eee] mb-2 leading-tight pr-2 break-words"
        style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
      >
        {data.title}
      </h3>
      <div
        className="flex items-center gap-1.5 mb-6 text-[12px]"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        <span style={{ color: "var(--card-accent)", fontWeight: 500 }}>{data.issuer}</span>
        <span className="text-[#666] text-[11px]">· {data.year}</span>
      </div>

      {/* Tech Chips */}
      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {data.skills.map((skill) => (
          <div
            key={skill}
            className="cert-chip rounded-full px-[10px] pt-[3px] pb-[2px]"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px",
            }}
          >
            {skill}
          </div>
        ))}
      </div>
    </Wrapper>
  );
}

// --- Main Component ---

export default function EducationAndFooter() {
  const [eduInView, setEduInView] = useState(false);

  const eduRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };

    const eduObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.1) setEduInView(true);
    }, observerOptions);

    if (eduRef.current) eduObserver.observe(eduRef.current);

    return () => {
      eduObserver.disconnect();
    };
  }, []);

  const globals = `
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Syne:wght@700;800&display=swap');

    :root {
      --color-background-secondary: #121212;
    }

    /* Shared Bento Card Style */
    .bento-base {
      background-color: var(--color-background-secondary);
      border: 0.5px solid rgba(255,255,255,0.07);
      border-radius: 14px;
    }
    
    .bento-base:hover {
      border-color: var(--card-accent) !important;
    }
    
    /* Top Bars */
    .card-top-bar {
      background-color: var(--card-accent);
      opacity: 0.35;
      transition: opacity 0.3s ease;
    }
    .bento-base:hover .card-top-bar {
      opacity: 1;
    }

    /* Chips */
    .cert-chip {
      background-color: transparent;
      border: 0.5px solid rgba(255,255,255,0.08);
      color: #888;
      transition: all 0.2s ease;
    }
    .bento-base:hover .cert-chip {
      border-color: var(--card-accent) !important;
      color: var(--card-accent) !important;
    }
    /* Animations */
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.35; }
      100% { opacity: 1; }
    }
    .pulse-dot {
      animation: pulse 2s infinite ease-in-out;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globals }} />

      {/* BLOCK 1: EDUCATION & CERTIFICATIONS */}
      <section ref={eduRef} id="education" className="w-full flex justify-center bg-[#080808] py-16 md:py-24 px-4 md:px-6">
        <div className="w-full max-w-[1200px] flex flex-col">

          <SectionHeader
            accent="#F59E0B"
            eyebrow="BACKGROUND"
            title={
              <>
                Education & <span className="text-[#F59E0B] block sm:inline">Certifications</span>
              </>
            }
            aside={
              <div className="text-right text-[12px] text-[#666]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                3 certifications · CBSE
              </div>
            }
          />

          {/* Combined 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 min-[1100px]:grid-cols-4 gap-[14px]">
            {EDU_DATA.map((edu, i) => (
              <div key={edu.id} className="min-h-[260px] flex">
                <EduCard data={edu} inView={eduInView} index={i} />
              </div>
            ))}

            {CERT_DATA.map((cert, i) => (
              <div key={cert.id} className="min-h-[260px] flex">
                <CertCard data={cert} inView={eduInView} index={i + EDU_DATA.length} />
              </div>
            ))}
          </div>

        </div>
      </section>

      <SiteFooter />
    </>
  );
}
