import Link from "next/link";
import type { CSSProperties } from "react";
import type { ProjectCardData } from "@/lib/projects";

const MONO = "'IBM Plex Mono', monospace";

/**
 * Homepage project card. The whole card is clickable: the case-study link's
 * ::after covers the card, and the optional Live link sits above it.
 * Styles live in ProjectGrid, which renders alongside every card.
 */
export default function ProjectCard({
  data,
  inView,
  index,
}: {
  data: ProjectCardData;
  inView: boolean;
  index: number;
}) {
  const isExternal = Boolean(data.external);

  return (
    <div
      className="exp-card project-card group relative flex flex-col h-full overflow-hidden p-[18px]"
      style={
        {
          "--card-accent": data.accent,
          "--card-accent-dim": `${data.accent}1A`,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 100
            }ms, opacity 0.6s ease ${index * 100}ms, border-color 0.3s ease`,
        } as CSSProperties
      }
    >
      <div className="absolute inset-x-0 top-0 h-[2px] card-top-bar" />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="rounded px-2 pt-1 pb-0.5 text-[10px] uppercase tracking-wider font-semibold"
          style={{
            backgroundColor: "var(--card-accent-dim)",
            color: "var(--card-accent)",
            fontFamily: MONO,
          }}
        >
          {data.badge}
        </div>

        <Link
          href={data.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          aria-label={`${data.title}, ${isExternal ? "visit site" : "case study"}`}
          className="card-link flex items-center gap-1 text-[10px] uppercase font-medium text-[#888] hover:text-[var(--card-accent)] transition-colors opacity-65 hover:opacity-100 after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          style={{ fontFamily: MONO }}
        >
          {isExternal ? "↗ Visit" : "Case study →"}
        </Link>
      </div>

      {/* Info */}
      <h3
        className="text-[14px] text-[#eee] mb-2 leading-tight"
        style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
      >
        {data.title}
      </h3>
      <p className="text-[11px] text-[#aaa] mb-5 leading-relaxed" style={{ fontFamily: MONO }}>
        {data.desc}
      </p>

      {/* Highlights */}
      <div className="flex flex-col gap-2 mb-6 flex-1">
        {data.highlights.map((hlt) => (
          <div key={hlt} className="flex items-start gap-2">
            <div
              className="mt-[5px] h-[4px] w-[4px] flex-shrink-0 rounded-full"
              style={{ backgroundColor: "var(--card-accent)" }}
            />
            <div className="text-[11px] leading-relaxed text-[#888]" style={{ fontFamily: MONO }}>
              {hlt}
            </div>
          </div>
        ))}
      </div>

      {/* Chips + optional Live link */}
      <div className="mt-auto pt-4 flex flex-wrap items-center gap-2">
        {data.stack.map((skill) => (
          <div
            key={skill}
            className="tech-chip rounded-full px-2 pt-[3px] pb-[2px]"
            style={{ fontFamily: MONO, fontSize: "10px" }}
          >
            {skill}
          </div>
        ))}

        {data.liveUrl && (
          <a
            href={data.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${data.title}, live site (opens in a new tab)`}
            className="live-link relative z-10 ml-auto inline-flex min-h-[44px] items-center gap-1 px-2 text-[10px] uppercase font-medium text-[#888] transition-colors hover:text-[var(--card-accent)] focus-visible:outline-none"
            style={{ fontFamily: MONO }}
          >
            Live ↗
          </a>
        )}
      </div>
    </div>
  );
}
