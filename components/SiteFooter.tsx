"use client";

import React, { useEffect, useRef, useState } from "react";

// --- Types & Data ---

type ContactData = {
  id: string;
  label: string;
  value: string;
  href: string;
  accent: string;
  iconType: "email" | "phone" | "location" | "link" | "github" | "linkedin" | "instagram";
};

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
    value: "Singanpore, Surat, Gujarat",
    href: "https://maps.google.com/?q=Singanpore,Surat,Gujarat",
    accent: "#A855F7",
    iconType: "location",
  },
  {
    id: "live_project",
    label: "Live Project",
    value: "sellermetric.vercel.app",
    href: "https://sellermetric.vercel.app/",
    accent: "#3B82F6",
    iconType: "link",
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/beingnitishh",
    href: "https://github.com/beingnitishh/",
    accent: "#F5F5F5",
    iconType: "github",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/nitish-kumar",
    href: "https://www.linkedin.com/in/nitish-kumar-3a6671246?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    accent: "#0A66C2",
    iconType: "linkedin",
  },
  {
    id: "instagram",
    label: "Instagram",
    value: "instagram.com/oyee.nitishh",
    href: "https://www.instagram.com/oyee.nitishh/",
    accent: "#E1306C",
    iconType: "instagram",
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
  github: (
    <svg width="18" height="18" viewBox="0 0 50 50" fill="currentColor" aria-hidden="true">
      <path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z" />
    </svg>
  ),
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
    </svg>
  ),
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
};

function ContactCard({ data, inView, index }: { data: ContactData; inView: boolean; index: number }) {
  return (
    <a
      href={data.href}
      target={data.id === "email" || data.id === "phone" ? undefined : "_blank"}
      rel={data.id === "email" || data.id === "phone" ? undefined : "noopener noreferrer"}
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
        className="contact-value text-[12px] text-[#aaa] transition-colors duration-300 overflow-hidden text-ellipsis whitespace-nowrap w-full pr-6"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        {data.value}
      </div>
    </a>
  );
}

export default function SiteFooter() {
  const [footerInView, setFooterInView] = useState(false);
  const [showCookieSettings, setShowCookieSettings] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setShowCookieSettings(
      document.cookie.split(";").some((cookie) => cookie.trim() === "eea=1"),
    );

    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.1) setFooterInView(true);
      },
      { threshold: 0.1 },
    );

    if (footerRef.current) footerObserver.observe(footerRef.current);

    return () => {
      footerObserver.disconnect();
    };
  }, []);

  const globals = `
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Syne:wght@700;800&display=swap');

    :root {
      --color-background-secondary: #121212;
    }

    /* Contact cards */
    .contact-card {
      background-color: var(--color-background-secondary);
      border: 0.5px solid rgba(255,255,255,0.07);
      border-radius: 14px;
    }
    .contact-card:hover {
      background-color: var(--cdim) !important;
      border-color: var(--card-accent) !important;
    }
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
    .contact-top-bar {
      background-color: var(--card-accent);
      opacity: 0.35;
      transition: opacity 0.3s ease;
    }
    .contact-card:hover .contact-top-bar {
      opacity: 1;
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

    @media (prefers-reduced-motion: reduce) {
      .pulse-dot, .shimmer-text { animation: none !important; }
      .contact-card { transition: none !important; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globals }} />

          <footer
      ref={footerRef}
      id="contact"
      className="w-full flex flex-col items-center bg-[#050505]"
      style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)", paddingBottom: "env(safe-area-inset-bottom)" }}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 min-[1100px]:grid-cols-3 gap-[12px] mb-[40px]">
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

          {showCookieSettings && (
            <button
              type="button"
              onClick={() => {
                try {
                  window.localStorage.removeItem("consent_choice");
                } catch {
                  // The banner can still be reopened when storage is unavailable.
                }
                window.dispatchEvent(new Event("open-consent"));
              }}
              className="inline-flex min-h-[44px] cursor-pointer items-center text-[11px] text-[#fff] opacity-50 transition-colors hover:text-[#FF5500] hover:opacity-100 hover:underline focus-visible:outline-none focus-visible:underline underline-offset-4"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Cookie settings
            </button>
          )}

          <div
            className="flex items-center gap-[6px] text-[11px] text-[#fff] opacity-40 text-center sm:text-right"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Oracle Generative AI Professional
            <div className="h-[4px] w-[4px] rounded-full bg-[#F59E0B]" />
            Singanpore, Surat
          </div>
        </div>

      </div>
    </footer>
    </>
  );
}
