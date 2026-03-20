"use client";

import React, { useEffect, useRef, useState } from "react";

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
};

type ContactData = {
  id: string;
  label: string;
  value: string;
  href: string;
  accent: string;
  iconType: "email" | "phone" | "location" | "link";
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

const CONTACT_DATA: ContactData[] = [
  {
    id: "email",
    label: "Email",
    value: "beingnitishh@gmail.com",
    href: "mailto:beingnitishh@gmail.com",
    accent: "#FF5500",
    iconType: "email",
  },
  {
    id: "phone",
    label: "Phone",
    value: "+91 83539 32343",
    href: "tel:+918353932343",
    accent: "#10B981",
    iconType: "phone",
  },
  {
    id: "location",
    label: "Location",
    value: "Amroli, Surat, Gujarat",
    href: "https://maps.google.com/?q=Amroli,Surat,Gujarat",
    accent: "#A855F7",
    iconType: "location",
  },
  {
    id: "live_project",
    label: "Live Project",
    value: "sellermetrics.netlify.app",
    href: "https://sellermetrics.netlify.app",
    accent: "#3B82F6",
    iconType: "link",
  },
];

// --- Icons ---
const Icons = {
  email: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 4 10 8 10-8" />
    </svg>
  ),
  phone: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  location: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  link: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
};

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
  return (
    <div
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
        className="text-[17px] text-[#eee] mb-2 leading-tight pr-4"
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
    </div>
  );
}

function ContactCard({ data, inView, index }: { data: ContactData; inView: boolean; index: number }) {
  return (
    <a
      href={data.href}
      target={data.id === "live_project" || data.id === "location" ? "_blank" : undefined}
      rel={data.id === "live_project" || data.id === "location" ? "noopener noreferrer" : undefined}
      className="contact-card relative flex flex-col h-full overflow-hidden p-[18px]"
      style={{
        "--card-accent": data.accent,
        "--card-accent-dim": `${data.accent}1A`, // 10% for icon hover
        "--cdim": `${data.accent}0F`, // 6% overall background hover
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 100
          }ms, opacity 0.6s ease ${index * 100}ms, border-color 0.3s ease, background-color 0.3s ease`,
      } as React.CSSProperties}
    >
      <div className="absolute inset-x-0 top-0 h-[2px] contact-top-bar" />

      {/* Arrow */}
      <div className="absolute top-[18px] right-[18px] contact-arrow text-[#888] opacity-0 transition-all duration-300">
        ↗
      </div>

      {/* Icon */}
      <div className="contact-icon-box flex h-[34px] w-[34px] rounded-[8px] items-center justify-center mb-4 transition-colors duration-300 text-[#666]" style={{ border: "0.5px solid rgba(255,255,255,0.08)" }}>
        {Icons[data.iconType]}
      </div>

      {/* Labels */}
      <div
        className="contact-label text-[10px] uppercase tracking-wider text-[#666] mb-[2px] transition-colors duration-300"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        {data.label}
      </div>
      <div
        className="contact-value text-[12px] text-[#aaa] transition-colors duration-300 overflow-hidden text-ellipsis whitespace-nowrap w-[90%]"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        {data.value}
      </div>
    </a>
  );
}

// --- Main Component ---

export default function EducationAndFooter() {
  const [eduInView, setEduInView] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  const eduRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };

    const eduObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.1) setEduInView(true);
    }, observerOptions);

    const footerObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.1) setFooterInView(true);
    }, observerOptions);

    if (eduRef.current) eduObserver.observe(eduRef.current);
    if (footerRef.current) footerObserver.observe(footerRef.current);

    return () => {
      eduObserver.disconnect();
      footerObserver.disconnect();
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
      opacity: var(--hover-border-opacity, 0.55);
    }
    
    /* Contact specific overrides to match exact prompt */
    .contact-card {
      background-color: var(--color-background-secondary);
      border: 0.5px solid rgba(255,255,255,0.07);
      border-radius: 14px;
    }
    .contact-card:hover {
      background-color: var(--cdim) !important;
      border-color: var(--card-accent) !important;
    }
    
    /* Custom Hover Selectors for Contact Grid */
    .contact-card:hover .contact-icon-box {
      background-color: var(--card-accent-dim) !important;
      border-color: var(--card-accent) !important;
      color: var(--card-accent) !important;
    }
    .contact-card:hover .contact-label {
      color: var(--card-accent) !important;
    }
    .contact-card:hover .contact-value {
      color: #fff !important;
    }
    .contact-card:hover .contact-arrow {
      opacity: 1 !important;
      transform: translate(2px, -2px) !important;
      color: var(--card-accent) !important;
    }

    /* Top Bars */
    .card-top-bar, .contact-top-bar {
      background-color: var(--card-accent);
      opacity: 0.35;
      transition: opacity 0.3s ease;
    }
    .bento-base:hover .card-top-bar, .contact-card:hover .contact-top-bar {
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

    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    .shimmer-text {
      background: linear-gradient(90deg, #FF5500, #F59E0B, #FF5500);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 3s linear infinite;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globals }} />

      {/* BLOCK 1: EDUCATION & CERTIFICATIONS */}
      <section ref={eduRef} id="education" className="w-full flex justify-center bg-[#080808] py-16 md:py-24 px-4 md:px-6">
        <div className="w-full max-w-[1200px] flex flex-col">

          {/* Section Header */}
          <div className="flex flex-col items-start mb-8 md:mb-10 w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1.5px] w-[24px] bg-[#F59E0B]" />
              <span
                className="text-[11px] tracking-[0.2em] text-[#F59E0B] uppercase font-semibold"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                BACKGROUND
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between w-full gap-4">
              <h2
                className="text-4xl sm:text-5xl md:text-6xl text-white"
                style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
              >
                Education & <span className="text-[#F59E0B]">Certifications</span>
              </h2>
              <div
                className="text-right text-[12px] text-[#666]"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                2 certifications · CBSE
              </div>
            </div>
          </div>

          {/* Combined 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 min-[1100px]:grid-cols-4 gap-[14px]">
            {/* 2 Education Cards */}
            {EDU_DATA.map((edu, i) => (
              <div key={edu.id} className="min-h-[260px] flex">
                <EduCard data={edu} inView={eduInView} index={i} />
              </div>
            ))}

            {/* 2 Certification Cards */}
            {CERT_DATA.map((cert, i) => (
              <div key={cert.id} className="min-h-[260px] flex">
                <CertCard data={cert} inView={eduInView} index={i + EDU_DATA.length} />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* BLOCK 2: FOOTER / CONTACT */}
      <footer
        ref={footerRef}
        id="contact"
        className="w-full flex flex-col items-center bg-[#050505]"
        style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}
      >
        <div className="w-full max-w-[1200px] flex flex-col px-4 md:px-6 pt-16 md:pt-[72px] pb-8 md:pb-[48px]">

          {/* Top Zone */}
          <div className="flex flex-col md:flex-row md:items-start justify-between w-full mb-10 md:mb-14 gap-8">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[1.5px] w-[24px] bg-[#FF5500]" />
                <span
                  className="text-[11px] tracking-[0.2em] text-[#FF5500] uppercase font-semibold"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  CONTACT
                </span>
              </div>
              <h2
                className="text-4xl sm:text-5xl md:text-6xl text-white mb-4"
                style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, lineHeight: 1.1 }}
              >
                Let&apos;s work <br className="hidden md:block" />
                <span className="shimmer-text">together.</span>
              </h2>
              <p
                className="text-[12px] text-[#888] max-w-[380px] leading-relaxed"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                Open to e-commerce roles, freelance catalog & marketplace work, and AI tooling projects.
              </p>
            </div>

            <div
              className="flex flex-col gap-[7px] p-[14px_20px] rounded-[12px] self-start"
              style={{
                border: "0.5px solid rgba(16,185,129,0.3)",
                background: "rgba(16,185,129,0.06)",
              }}
            >
              <div className="flex items-center gap-[6px]">
                <div className="h-[5px] w-[5px] rounded-full bg-[#10B981] pulse-dot" />
                <span
                  className="text-[11px] text-[#10B981] tracking-wide"
                  style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500 }}
                >
                  AVAILABLE FOR WORK
                </span>
              </div>
              <div
                className="text-[10px] text-[#666]"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                Surat, Gujarat — IST (UTC+5:30)
              </div>
            </div>
          </div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 min-[1100px]:grid-cols-4 gap-[12px] mb-[40px]">
            {CONTACT_DATA.map((contact, i) => (
              <ContactCard key={contact.id} data={contact} inView={footerInView} index={i} />
            ))}
          </div>

          {/* Bottom Bar Divider */}
          <div
            className="w-full h-[0.5px] mb-[24px]"
            style={{ backgroundImage: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)" }}
          />

          {/* Bottom Texts */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center items-start gap-4 w-full">
            <div
              className="text-[11px] text-[#fff] opacity-50"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              © 2026 Nitish Kumar · Built with Next.js, Framer Motion & Tailwind CSS
            </div>

            <div
              className="flex items-center gap-[6px] text-[11px] text-[#fff] opacity-40 text-center sm:text-right"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Oracle Generative AI Professional
              <div className="h-[4px] w-[4px] rounded-full bg-[#F59E0B]" />
              Amroli, Surat
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
