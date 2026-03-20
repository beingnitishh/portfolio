"use client";

import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];

const INSTAGRAM_URL = "https://www.instagram.com/oyee.nitishh/";

// ─── Instagram SVG ──────────────────────────────────────────────────────────
function InstagramIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none" />
    </svg>
  );
}

// ─── Close (×) SVG ──────────────────────────────────────────────────────────
function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <line x1="1" y1="1" x2="13" y2="13" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13" y1="1" x2="1" y2="13" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Navigation({ isVisible = true }: { isVisible?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [igHovered, setIgHovered] = useState(false);
  const [igCardHovered, setIgCardHovered] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);

  // ── Scroll handler ────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      // Blur when the skills section reaches the navbar
      const skillsEl = document.getElementById("skills");
      if (skillsEl) {
        // If the top of the skills section is at or above the navbar (64px offset)
        // we set scrolled to true.
        const rect = skillsEl.getBoundingClientRect();
        setScrolled(rect.top <= 64);
      } else {
        setScrolled(false);
      }

      // Active section tracking
      let current = "";
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el && el.offsetTop <= window.scrollY + 120) {
          current = link.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Body overflow lock (iOS-safe) ────────────────────────────────────────
  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) window.scrollTo(0, parseInt(scrollY) * -1);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // ── Click-outside to close panel ─────────────────────────────────────────
  useEffect(() => {
    if (!menuOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [menuOpen]);

  // ── Smooth scroll helper ──────────────────────────────────────────────────
  const handleScrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Google Fonts ─────────────────────────────────────────────────── */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=IBM+Plex+Mono:wght@400;500&display=swap"
      />

      {/* ── Keyframe & pseudo-class styles ─────────────────────────────── */}
      <style>{`
        @keyframes nav-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,85,0,0.55), 0 0 6px 2px rgba(255,85,0,0.25); }
          50%       { box-shadow: 0 0 0 5px rgba(255,85,0,0), 0 0 10px 4px rgba(255,85,0,0.12); }
        }
        @keyframes nav-panel-in {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        @keyframes nav-item-in {
          from { opacity: 0; transform: translateX(18px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* Desktop nav link underline hover */
        .nav-link {
          position: relative;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: color 0.2s ease;
          padding-bottom: 3px;
          cursor: pointer;
          background: none;
          border: none;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 100%;
          height: 1px;
          background: #FF5500;
          transition: right 0.25s ease;
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          right: 0;
        }
        .nav-link:hover,
        .nav-link.active {
          color: rgba(255,255,255,0.9);
        }

        @media (min-width: 480px) {
          header { padding: 0 24px !important; }
        }

        /* Mobile panel row hover */
        .mob-row:hover {
          background: rgba(255,255,255,0.03);
        }

        /* Close button hover */
        .close-btn:hover {
          background: rgba(255,255,255,0.06) !important;
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════════
          FIXED NAVBAR
      ════════════════════════════════════════════════════════════════════ */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          background: scrolled ? "rgba(8,8,8,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "0.5px solid rgba(255,255,255,0.06)" : "none",
          transition: "opacity 0.8s ease, background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease",
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? "auto" : "none",
        }}
      >
        {/* ── Logo ──────────────────────────────────────────────────────── */}
        <button
          onClick={handleLogoClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
          aria-label="Scroll to top"
        >
          {/* Pulse dot */}
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#FF5500",
              flexShrink: 0,
              animation: "nav-pulse 2s ease-in-out infinite",
            }}
          />
          {/* Name */}
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "17px",
              color: "#F5F5F5",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            Nitish Kumar
          </span>
        </button>

        {/* ── Desktop Nav (≥768px) ──────────────────────────────────────── */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
          }}
          className="desktop-nav"
        >
          {/* Links */}
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              className={`nav-link${activeSection === link.id ? " active" : ""}`}
              onClick={() => handleScrollTo(link.id)}
              aria-current={activeSection === link.id ? "true" : undefined}
            >
              {link.label}
            </button>
          ))}

          {/* Instagram icon button — the ONLY Instagram button in this component */}
          <a
            href={"https://www.instagram.com/oyee.nitishh/"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            onMouseEnter={() => setIgHovered(true)}
            onMouseLeave={() => setIgHovered(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              border: igHovered
                ? "0.5px solid rgba(225,48,108,0.4)"
                : "0.5px solid rgba(255,255,255,0.1)",
              background: igHovered ? "rgba(225,48,108,0.10)" : "transparent",
              color: igHovered ? "#E1306C" : "rgba(255,255,255,0.4)",
              transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <InstagramIcon color="currentColor" />
          </a>
        </nav>

        {/* ── Mobile Hamburger (< 768px) ────────────────────────────────── */}
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="hamburger-btn"
          style={{
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ display: "block", width: "22px", height: "1.5px", background: "rgba(255,255,255,0.7)", borderRadius: "2px" }} />
          <span style={{ display: "block", width: "22px", height: "1.5px", background: "rgba(255,255,255,0.7)", borderRadius: "2px" }} />
          <span style={{ display: "block", width: "22px", height: "1.5px", background: "rgba(255,255,255,0.7)", borderRadius: "2px" }} />
        </button>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE OVERLAY + PANEL
      ════════════════════════════════════════════════════════════════════ */}
      {/* Backdrop overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1100,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.28s ease",
        }}
        aria-hidden="true"
      />

      {/* Side panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 1200,
          width: "min(300px, 88vw)",
          background: "#0A0A0A",
          borderLeft: "0.5px solid rgba(255,255,255,0.07)",
          display: "flex",
          flexDirection: "column",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
          overflow: "hidden",
        }}
      >
        {/* ── Panel Header ────────────────────────────────────────────── */}
        <div
          style={{
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            borderBottom: "0.5px solid rgba(255,255,255,0.06)",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "16px",
              color: "#F5F5F5",
            }}
          >
            Menu
          </span>
          <button
            className="close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              border: "none",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.2s ease",
            }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* ── Panel Nav Links ──────────────────────────────────────────── */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {NAV_LINKS.map((link, i) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                className="mob-row"
                onClick={() => handleScrollTo(link.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  padding: "16px 24px",
                  background: "transparent",
                  border: "none",
                  borderBottom: "0.5px solid rgba(255,255,255,0.04)",
                  cursor: "pointer",
                  animation: menuOpen
                    ? `nav-item-in 0.35s cubic-bezier(0.4,0,0.2,1) ${i * 60}ms both`
                    : "none",
                  transition: "background 0.2s ease",
                }}
              >
                {/* Index */}
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "10px",
                    color: "#FF5500",
                    letterSpacing: "0.04em",
                    marginRight: "14px",
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Label */}
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "22px",
                    color: isActive ? "#FF5500" : "#F0F0F0",
                    flex: 1,
                    textAlign: "left",
                    transition: "color 0.2s ease",
                  }}
                >
                  {link.label}
                </span>

                {/* Arrow */}
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "16px",
                    color: isActive ? "#FF5500" : "rgba(255,255,255,0.3)",
                    transition: "color 0.2s ease",
                  }}
                >
                  →
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Panel Bottom Zone ────────────────────────────────────────── */}
        <div
          style={{
            padding: "20px 24px",
            borderTop: "0.5px solid rgba(255,255,255,0.06)",
            flexShrink: 0,
          }}
        >
          {/* Instagram card */}
          <a
            href={"https://www.instagram.com/oyee.nitishh/"}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIgCardHovered(true)}
            onMouseLeave={() => setIgCardHovered(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 14px",
              borderRadius: "10px",
              border: igCardHovered
                ? "0.5px solid rgba(225,48,108,0.3)"
                : "0.5px solid rgba(255,255,255,0.07)",
              background: igCardHovered ? "rgba(225,48,108,0.08)" : "rgba(255,255,255,0.02)",
              textDecoration: "none",
              transition: "background 0.2s ease, border-color 0.2s ease",
              marginBottom: "16px",
            }}
          >
            {/* Icon box */}
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                background: "rgba(225,48,108,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <InstagramIcon size={16} color="#E1306C" />
            </div>

            {/* Texts */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "11px",
                  color: "#E1306C",
                  marginBottom: "2px",
                }}
              >
                Instagram
              </div>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                Follow for updates
              </div>
            </div>

            {/* Arrow */}
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "14px",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              ↗
            </span>
          </a>

          {/* Copyright */}
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "10px",
              color: "rgba(255,255,255,0.18)",
              textAlign: "center",
              margin: 0,
            }}
          >
            © 2026 Nitish Kumar
          </p>
        </div>
      </div>

      {/* ── Responsive visibility styles ─────────────────────────────────── */}
      <style>{`
        /* Desktop nav visible on ≥768px only */
        .desktop-nav { display: flex; }
        .hamburger-btn { display: none; }

        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
