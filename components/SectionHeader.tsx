import type { ReactNode } from "react";

const MONO = "'IBM Plex Mono', monospace";

/** Homepage section heading: short accent rule, uppercase mono eyebrow, Syne H2. Shared by the homepage and /projects. */
export default function SectionHeader({
  eyebrow,
  accent,
  title,
  as: Heading = "h2",
  aside,
  children,
}: {
  eyebrow: string;
  accent: string;
  title: ReactNode;
  as?: "h1" | "h2";
  /** Optional content aligned to the right of the title on wider screens. */
  aside?: ReactNode;
  /** Optional content placed under the title row, e.g. an intro line. */
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-start mb-8 md:mb-10 w-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-[1.5px] w-[24px]" style={{ backgroundColor: accent }} />
        <span
          className="text-[11px] tracking-[0.2em] uppercase font-semibold"
          style={{ color: accent, fontFamily: MONO }}
        >
          {eyebrow}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between w-full gap-4">
        <Heading
          className="text-4xl sm:text-5xl md:text-6xl text-white"
          style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
        >
          {title}
        </Heading>
        {aside}
      </div>

      {children}
    </div>
  );
}
