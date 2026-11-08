"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import type { CasePanel, CaseTextSection, ProjectCase, ProjectCaseStudy } from "@/lib/projects";

type Section<K extends keyof ProjectCaseStudy> = NonNullable<ProjectCaseStudy[K]>;

const DISPLAY = "var(--font-syne), 'Syne', sans-serif";
const MONO = "var(--font-plex), 'IBM Plex Mono', monospace";

/* -------------------------------------------------------------------------- */
/*  Motion helpers                                                            */
/* -------------------------------------------------------------------------- */

type RevealProps = {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    as?: "div" | "li" | "span";
};

function Reveal({ children, delay = 0, className }: RevealProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}

function SectionHeading({
    eyebrow,
    heading,
    intro,
    accent,
}: {
    eyebrow: string;
    heading: string;
    intro?: string;
    accent: string;
}) {
    return (
        <Reveal>
            <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-6" style={{ backgroundColor: accent }} />
                <span
                    className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: accent, fontFamily: MONO }}
                >
                    {eyebrow}
                </span>
            </div>
            <h2
                className="text-3xl leading-tight text-white sm:text-4xl md:text-5xl"
                style={{ fontFamily: DISPLAY, fontWeight: 800 }}
            >
                {heading}
            </h2>
            {intro && (
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#a0a0a0] sm:text-[15px]">{intro}</p>
            )}
        </Reveal>
    );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

function Hero({ project, study }: { project: ProjectCase; study: ProjectCaseStudy }) {
    const accent = project.accent;
    return (
        <header className="relative overflow-hidden px-4 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-14 md:pb-24">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background: `radial-gradient(640px 320px at 12% 0%, ${accent}1f, transparent 70%), radial-gradient(520px 260px at 95% 10%, ${accent}12, transparent 70%)`,
                }}
            />
            <div className="relative mx-auto w-full max-w-[1100px]">
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <Link
                        href="/#projects"
                        className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-[#888] transition-colors hover:border-white/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        style={{ fontFamily: MONO, outlineColor: accent }}
                    >
                        <span className="transition-transform duration-300 group-hover:-translate-x-0.5">←</span>
                        Back to projects
                    </Link>
                </motion.div>

                <motion.div
                    className="mt-10 sm:mt-14"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
                >
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span
                            className="rounded px-2 pb-0.5 pt-1 text-[10px] uppercase tracking-[0.14em] font-semibold"
                            style={{ backgroundColor: `${accent}1a`, color: accent, fontFamily: MONO }}
                        >
                            {project.badge} · Case study
                        </span>
                        <span
                            className="text-[10px] uppercase tracking-[0.14em] text-[#666]"
                            style={{ fontFamily: MONO }}
                        >
                            {study.category}
                        </span>
                    </div>

                    <h1
                        className="text-[44px] leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl"
                        style={{ fontFamily: DISPLAY, fontWeight: 800 }}
                    >
                        {project.title}
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#a0a0a0] sm:text-lg">
                        {study.tagline}
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold text-[#080808] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                style={{
                                    backgroundColor: accent,
                                    fontFamily: MONO,
                                    boxShadow: `0 8px 30px ${accent}26`,
                                    outlineColor: accent,
                                }}
                            >
                                Live App
                                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                                    ↗
                                </span>
                            </a>
                        )}
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[13px] font-semibold text-[#e5e5e5] transition-colors hover:border-white/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                style={{ fontFamily: MONO, outlineColor: accent }}
                            >
                                GitHub
                                <span aria-hidden="true" className="text-[#888] transition-transform duration-200 group-hover:translate-x-0.5">
                                    ↗
                                </span>
                            </a>
                        )}
                    </div>

                    <ul className="mt-8 flex flex-wrap gap-2">
                        {study.heroBadges.map((badge) => (
                            <li
                                key={badge}
                                className="rounded-full border px-3 pb-[3px] pt-1 text-[11px] text-[#b3b3b3]"
                                style={{
                                    borderColor: `${accent}33`,
                                    backgroundColor: `${accent}0d`,
                                    fontFamily: MONO,
                                }}
                            >
                                {badge}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </header>
    );
}

/* -------------------------------------------------------------------------- */
/*  Features                                                                  */
/* -------------------------------------------------------------------------- */

function FeatureGrid({ features, accent }: { features: Section<"features">; accent: string }) {
    return (
        <div>
            <SectionHeading
                eyebrow={features.eyebrow}
                heading={features.heading}
                intro={features.intro}
                accent={accent}
            />
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
                {features.items.map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.45, delay: (index % 3) * 0.06, ease: "easeOut" }}
                        className="group relative overflow-hidden rounded-[14px] border-[0.5px] border-[#333] bg-[#121212] p-[18px] transition-colors duration-300 hover:border-[var(--feature-accent)]"
                        style={
                            {
                                "--feature-accent": accent,
                            } as React.CSSProperties
                        }
                    >
                        <span
                            aria-hidden="true"
                            className="absolute inset-x-0 top-0 h-[2px] opacity-30 transition-opacity duration-300 group-hover:opacity-100"
                            style={{ backgroundColor: accent }}
                        />
                        <span
                            className="text-[10px] uppercase tracking-[0.14em]"
                            style={{ color: accent, fontFamily: MONO }}
                        >
                            {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3
                            className="mt-2 text-[15px] leading-snug text-[#eee]"
                            style={{ fontFamily: DISPLAY, fontWeight: 700 }}
                        >
                            {item.title}
                        </h3>
                        {item.description && (
                            <p
                                className="mt-2 text-[11.5px] leading-relaxed text-[#8a8a8a]"
                                style={{ fontFamily: MONO }}
                            >
                                {item.description}
                            </p>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*  How it works — vertical stepper                                           */
/* -------------------------------------------------------------------------- */

function HowItWorks({ howItWorks, accent }: { howItWorks: Section<"howItWorks">; accent: string }) {
    return (
        <div>
            <SectionHeading
                eyebrow={howItWorks.eyebrow}
                heading={howItWorks.heading}
                intro={howItWorks.intro}
                accent={accent}
            />
            <ol className="mt-8 flex flex-col md:mt-10">
                {howItWorks.steps.map((step, index) => {
                    const last = index === howItWorks.steps.length - 1;
                    return (
                        <motion.li
                            key={step.title}
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
                            className="relative flex gap-4 sm:gap-6"
                        >
                            <div className="flex flex-col items-center">
                                <span
                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold"
                                    style={{
                                        borderColor: `${accent}59`,
                                        backgroundColor: `${accent}14`,
                                        color: accent,
                                        fontFamily: MONO,
                                    }}
                                >
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                {!last && (
                                    <motion.span
                                        aria-hidden="true"
                                        className="my-1 w-px flex-1 origin-top"
                                        style={{
                                            background: `linear-gradient(to bottom, ${accent}66, ${accent}0d)`,
                                            minHeight: 34,
                                        }}
                                        initial={{ scaleY: 0 }}
                                        whileInView={{ scaleY: 1 }}
                                        viewport={{ once: true, amount: 0.6 }}
                                        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                                    />
                                )}
                            </div>
                            <div className={last ? "pb-1" : "pb-7 sm:pb-8"}>
                                <h3 className="text-[15px] leading-snug text-[#eee] sm:text-base" style={{ fontFamily: DISPLAY, fontWeight: 700 }}>
                                    {step.title}
                                </h3>
                                <p
                                    className="mt-1.5 max-w-2xl text-[12px] leading-relaxed text-[#8a8a8a]"
                                    style={{ fontFamily: MONO }}
                                >
                                    {step.description}
                                </p>
                            </div>
                        </motion.li>
                    );
                })}
            </ol>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*  Architecture — animated flow diagram                                      */
/* -------------------------------------------------------------------------- */

function FlowArrow({ accent, vertical }: { accent: string; vertical?: boolean }) {
    return (
        <div
            aria-hidden="true"
            className={`flex shrink-0 items-center justify-center ${vertical ? "h-6 w-8 rotate-90" : "h-8 w-6"}`}
        >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={accent} strokeWidth="1.5">
                <path d="M2 7H12M8 3L12 7L8 11" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
}

function Architecture({ architecture, accent }: { architecture: Section<"architecture">; accent: string }) {
    const nodes = architecture.nodes;
    if (!nodes) {
        return (
            <div>
                <SectionHeading
                    eyebrow={architecture.eyebrow}
                    heading={architecture.heading}
                    intro={architecture.intro}
                    accent={accent}
                />
                {architecture.body && (
                    <Reveal className="mt-8 rounded-[14px] border-[0.5px] border-[#333] bg-[#121212] p-5 sm:p-6 md:mt-10">
                        <p className="text-sm leading-relaxed text-[#a0a0a0] sm:text-[15px]">{architecture.body}</p>
                    </Reveal>
                )}
            </div>
        );
    }
    return (
        <div>
            <SectionHeading
                eyebrow={architecture.eyebrow}
                heading={architecture.heading}
                intro={architecture.intro}
                accent={accent}
            />
            <div className="mt-8 rounded-[14px] border-[0.5px] border-[#333] bg-[#121212] p-4 sm:p-6 md:mt-10">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.12 } },
                    }}
                    className="flex flex-col items-stretch md:flex-row md:items-center md:justify-between"
                >
                    {nodes.map((node, index) => (
                        <React.Fragment key={node.title}>
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 12 },
                                    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                                }}
                                className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#171717] p-3 md:px-3 md:py-4"
                            >
                                <div className="flex items-baseline gap-2">
                                    <span
                                        className="text-[9px] uppercase tracking-[0.14em]"
                                        style={{ color: accent, fontFamily: MONO }}
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <p className="text-[12.5px] leading-tight text-[#e8e8e8]" style={{ fontFamily: MONO }}>
                                        {node.title}
                                    </p>
                                </div>
                                {node.detail && (
                                    <p className="mt-1 text-[10.5px] text-[#777]" style={{ fontFamily: MONO }}>
                                        {node.detail}
                                    </p>
                                )}
                            </motion.div>
                            {index < nodes.length - 1 && (
                                <>
                                    <div className="flex justify-center md:hidden">
                                        <FlowArrow accent={accent} vertical />
                                    </div>
                                    <div className="hidden md:flex">
                                        <FlowArrow accent={accent} />
                                    </div>
                                </>
                            )}
                        </React.Fragment>
                    ))}
                </motion.div>
                {architecture.footnote && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-5 border-t border-white/10 pt-4 text-[11.5px] leading-relaxed text-[#8a8a8a]"
                        style={{ fontFamily: MONO }}
                    >
                        {architecture.footnote}
                    </motion.p>
                )}
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*  AI integration                                                            */
/* -------------------------------------------------------------------------- */

function AiSection({ ai, accent }: { ai: Section<"ai">; accent: string }) {
    return (
        <div>
            <SectionHeading eyebrow={ai.eyebrow} heading={ai.heading} accent={accent} />
            <Reveal delay={0.05} className="mt-5">
                <p className="max-w-3xl text-sm leading-relaxed text-[#a0a0a0] sm:text-[15px]">{ai.intro}</p>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-10">
                {ai.steps.map((step, index) => (
                    <motion.div
                        key={step.title}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.45, delay: (index % 2) * 0.08, ease: "easeOut" }}
                        className="relative overflow-hidden rounded-[14px] border-[0.5px] border-[#333] bg-[#121212] p-[18px]"
                    >
                        <div className="flex items-center gap-2">
                            <span
                                className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold"
                                style={{
                                    backgroundColor: `${accent}1a`,
                                    color: accent,
                                    fontFamily: MONO,
                                }}
                            >
                                {index + 1}
                            </span>
                            <h3 className="text-[14px] leading-snug text-[#eee]" style={{ fontFamily: DISPLAY, fontWeight: 700 }}>
                                {step.title}
                            </h3>
                        </div>
                        <p className="mt-2 text-[11.5px] leading-relaxed text-[#8a8a8a]" style={{ fontFamily: MONO }}>
                            {step.description}
                        </p>
                    </motion.div>
                ))}
            </div>

            {ai.prompts.length > 0 && (
                <Reveal delay={0.1} className="mt-7">
                    <p
                        className="mb-3 text-[10px] uppercase tracking-[0.18em] text-[#666]"
                        style={{ fontFamily: MONO }}
                    >
                        {ai.promptLabel ?? "Example prompts"}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                        {ai.prompts.map((prompt) => (
                            <li
                                key={prompt}
                                className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 pb-[5px] pt-1.5 text-[11.5px] text-[#c9c9c9] transition-colors duration-200 hover:border-[var(--prompt-accent)] hover:text-white"
                                style={
                                    {
                                        "--prompt-accent": `${accent}66`,
                                        fontFamily: MONO,
                                    } as React.CSSProperties
                                }
                            >
                                <span aria-hidden="true" style={{ color: accent }}>
                                    ›{" "}
                                </span>
                                {prompt}
                            </li>
                        ))}
                    </ul>
                </Reveal>
            )}
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*  Tech stack                                                                */
/* -------------------------------------------------------------------------- */

function TechStack({ techStack, accent }: { techStack: ProjectCaseStudy["techStack"]; accent: string }) {
    return (
        <div>
            <SectionHeading eyebrow={techStack.eyebrow} heading={techStack.heading} accent={accent} />
            <div className="mt-8 flex flex-col gap-5 md:mt-10">
                {techStack.groups.map((group, index) => (
                    <motion.div
                        key={group.heading}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                        className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:gap-6"
                    >
                        <h3
                            className="w-full shrink-0 text-[11px] uppercase tracking-[0.14em] sm:w-[190px] sm:pt-1.5"
                            style={{ color: accent, fontFamily: MONO }}
                        >
                            {group.heading}
                        </h3>
                        <ul className="flex flex-wrap gap-2">
                            {group.items.map((item) => (
                                <li
                                    key={item}
                                    className="rounded-full border border-[#333] px-2.5 pb-[3px] pt-1 text-[11px] text-[#a0a0a0] transition-colors duration-200 hover:border-[var(--chip-accent)] hover:text-white"
                                    style={
                                        {
                                            "--chip-accent": `${accent}66`,
                                            fontFamily: MONO,
                                        } as React.CSSProperties
                                    }
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*  Screenshots + lightbox                                                    */
/* -------------------------------------------------------------------------- */

function ScreenshotPlaceholder({ caption, accent }: { caption: string; accent: string }) {
    // Spans only: this sits inside a <button>, which allows phrasing content only.
    return (
        <span className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#101010] px-4 text-center">
            <span
                aria-hidden="true"
                className="flex h-10 w-12 items-center justify-center rounded-md border border-dashed"
                style={{ borderColor: `${accent}59`, color: accent }}
            >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3">
                    <rect x="1.5" y="3" width="15" height="12" rx="1.5" />
                    <circle cx="6" cy="7.5" r="1.4" />
                    <path d="M2.5 13L7 9.5L10.5 12.5L13 10.5L15.5 13" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </span>
            <span className="block">
                <span className="block text-[11.5px] text-[#b3b3b3]" style={{ fontFamily: MONO }}>
                    {caption}
                </span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.14em] text-[#5a5a5a]" style={{ fontFamily: MONO }}>
                    Screenshot coming soon
                </span>
            </span>
        </span>
    );
}

function Screenshots({ screenshots, accent }: { screenshots: Section<"screenshots">; accent: string }) {
    const [failed, setFailed] = useState<Record<string, boolean>>({});
    const [active, setActive] = useState<number | null>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const close = useCallback(() => setActive(null), []);

    useEffect(() => {
        if (active === null) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") close();
        };
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        closeButtonRef.current?.focus();
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = previousOverflow;
        };
    }, [active, close]);

    const markFailed = (src: string) => setFailed((prev) => ({ ...prev, [src]: true }));
    const activeShot = active !== null ? screenshots.items[active] : null;
    const activeFailed = activeShot ? failed[activeShot.src] : false;

    return (
        <div>
            <SectionHeading
                eyebrow={screenshots.eyebrow}
                heading={screenshots.heading}
                intro={screenshots.intro}
                accent={accent}
            />
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-10">
                {screenshots.items.map((shot, index) => {
                    const isFailed = Boolean(failed[shot.src]);
                    return (
                        <motion.figure
                            key={shot.src}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.45, delay: (index % 2) * 0.07, ease: "easeOut" }}
                            className="group overflow-hidden rounded-[14px] border-[0.5px] border-[#333] bg-[#121212] transition-colors duration-300 hover:border-[var(--shot-accent)]"
                            style={{ "--shot-accent": `${accent}80` } as React.CSSProperties}
                        >
                            <button
                                type="button"
                                onClick={() => !isFailed && setActive(index)}
                                disabled={isFailed}
                                aria-label={isFailed ? `${shot.caption} screenshot is not available yet` : `Open ${shot.caption} screenshot`}
                                className="relative block aspect-[16/10] w-full overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] disabled:cursor-default"
                                style={{ outlineColor: accent, backgroundColor: "#0d0d0d" }}
                            >
                                {isFailed ? (
                                    <ScreenshotPlaceholder caption={shot.caption} accent={accent} />
                                ) : (
                                    <>
                                        {/* Plain img so a missing file degrades to the placeholder instead of failing the build. */}
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={shot.src}
                                            alt={shot.alt}
                                            loading="lazy"
                                            decoding="async"
                                            onError={() => markFailed(shot.src)}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                        />
                                        <span
                                            aria-hidden="true"
                                            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                            style={{ background: `linear-gradient(to top, ${accent}26, transparent 55%)` }}
                                        />
                                        <span
                                            aria-hidden="true"
                                            className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/50 px-2 pb-[3px] pt-1 text-[9px] uppercase tracking-[0.14em] text-white/80 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100"
                                            style={{ fontFamily: MONO }}
                                        >
                                            View
                                        </span>
                                    </>
                                )}
                            </button>
                            <figcaption className="flex items-center justify-between gap-3 border-t border-white/5 px-3.5 py-2.5">
                                <span className="text-[11px] text-[#a0a0a0]" style={{ fontFamily: MONO }}>
                                    {shot.caption}
                                </span>
                                <span className="text-[9px] uppercase tracking-[0.14em] text-[#5a5a5a]" style={{ fontFamily: MONO }}>
                                    {String(index + 1).padStart(2, "0")} / {String(screenshots.items.length).padStart(2, "0")}
                                </span>
                            </figcaption>
                        </motion.figure>
                    );
                })}
            </div>

            <AnimatePresence>
                {activeShot && !activeFailed && (
                    <motion.div
                        key="lightbox"
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${activeShot.caption} screenshot`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
                        onClick={close}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.97 }}
                            transition={{ duration: 0.24, ease: "easeOut" }}
                            className="relative max-h-full w-full max-w-5xl"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <button
                                ref={closeButtonRef}
                                type="button"
                                onClick={close}
                                aria-label="Close screenshot"
                                className="absolute -top-11 right-0 flex h-8 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 text-[10px] uppercase tracking-[0.14em] text-white/80 transition-colors hover:border-white/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                style={{ fontFamily: MONO, outlineColor: accent }}
                            >
                                Close
                                <span aria-hidden="true">✕</span>
                            </button>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={activeShot.src}
                                alt={activeShot.alt}
                                className="max-h-[78vh] w-full rounded-lg border border-white/10 object-contain"
                                onError={() => markFailed(activeShot.src)}
                            />
                            <p
                                className="mt-3 text-center text-[11px] uppercase tracking-[0.14em] text-white/50"
                                style={{ fontFamily: MONO }}
                            >
                                {activeShot.caption} · StarStock
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*  Paragraph + bullet sections                                               */
/* -------------------------------------------------------------------------- */

/** Paragraph section: "Who it’s for", "What I built", "What’s next". */
function TextBlock({ section, accent }: { section: CaseTextSection; accent: string }) {
    return (
        <Reveal>
            <SectionHeading eyebrow={section.eyebrow} heading={section.heading} accent={accent} />
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[#b3b3b3] sm:text-[15px]">{section.body}</p>
        </Reveal>
    );
}

/** Bulleted cards: "What was difficult", "Outcomes", "What I learned". */
function Panels({ panels, accent }: { panels: CasePanel[]; accent: string }) {
    return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {panels.map((panel, index) => (
                <motion.div
                    key={panel.heading}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
                    className="rounded-[14px] border-[0.5px] border-[#333] bg-[#121212] p-[18px]"
                >
                    <span className="text-[10px] uppercase tracking-[0.14em]" style={{ color: accent, fontFamily: MONO }}>
                        {panel.eyebrow}
                    </span>
                    <h3 className="mt-2 text-[15px] leading-snug text-[#eee]" style={{ fontFamily: DISPLAY, fontWeight: 700 }}>
                        {panel.heading}
                    </h3>
                    <ul className="mt-4 flex flex-col gap-2.5">
                        {panel.items.map((item) => (
                            <li key={item} className="flex items-start gap-2.5">
                                <span
                                    aria-hidden="true"
                                    className="mt-[7px] h-[4px] w-[4px] shrink-0 rounded-full"
                                    style={{ backgroundColor: accent }}
                                />
                                <span className="text-[11.5px] leading-relaxed text-[#8a8a8a]" style={{ fontFamily: MONO }}>
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            ))}
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*  Bottom CTA                                                                */
/* -------------------------------------------------------------------------- */

function BottomCta({ project, study }: { project: ProjectCase; study: ProjectCaseStudy }) {
    const accent = project.accent;
    return (
        <Reveal>
            <div
                className="relative overflow-hidden rounded-[14px] border-[0.5px] border-[#333] bg-[#121212] p-6 sm:p-9"
                style={{ backgroundImage: `radial-gradient(420px 200px at 85% 0%, ${accent}1a, transparent 70%)` }}
            >
                <h2
                    className="text-2xl leading-tight text-white sm:text-3xl"
                    style={{ fontFamily: DISPLAY, fontWeight: 800 }}
                >
                    {study.cta.heading}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#a0a0a0]">{study.cta.body}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold text-[#080808] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                            style={{ backgroundColor: accent, fontFamily: MONO, outlineColor: accent }}
                        >
                            View Live App <span aria-hidden="true">↗</span>
                        </a>
                    )}
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[13px] font-semibold text-[#e5e5e5] transition-colors hover:border-white/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                            style={{ fontFamily: MONO, outlineColor: accent }}
                        >
                            View Source <span aria-hidden="true">↗</span>
                        </a>
                    )}
                    <Link
                        href="/#projects"
                        className="inline-flex items-center justify-center gap-2 rounded-full px-2 py-2.5 text-[12px] text-[#888] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        style={{ fontFamily: MONO, outlineColor: accent }}
                    >
                        <span aria-hidden="true">←</span> Back to projects
                    </Link>
                </div>
            </div>
        </Reveal>
    );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function CaseStudy({ project }: { project: ProjectCase }) {
    const study = project.caseStudy;
    const accent = project.accent;

    return (
        <MotionConfig reducedMotion="user">
            <div className="text-white">
                <Hero project={project} study={study} />

                <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-20 px-4 pb-20 sm:px-6 sm:gap-24 md:gap-32 md:pb-28">
                    <Reveal className="border-t border-white/10 pt-12 md:pt-16">
                        <SectionHeading
                            eyebrow={study.overview.eyebrow}
                            heading={study.overview.heading}
                            accent={accent}
                        />
                        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[#b3b3b3] sm:text-[15px]">
                            {study.overview.body}
                        </p>
                    </Reveal>

                    {study.audience && <TextBlock section={study.audience} accent={accent} />}
                    {study.features && <FeatureGrid features={study.features} accent={accent} />}
                    {study.solution && <TextBlock section={study.solution} accent={accent} />}
                    {study.howItWorks && <HowItWorks howItWorks={study.howItWorks} accent={accent} />}
                    {study.architecture && <Architecture architecture={study.architecture} accent={accent} />}
                    {study.ai && <AiSection ai={study.ai} accent={accent} />}
                    {study.panels && study.panels.length > 0 && <Panels panels={study.panels} accent={accent} />}
                    {study.next && <TextBlock section={study.next} accent={accent} />}
                    <TechStack techStack={study.techStack} accent={accent} />
                    {study.screenshots && <Screenshots screenshots={study.screenshots} accent={accent} />}
                    <BottomCta project={project} study={study} />
                </div>
            </div>
        </MotionConfig>
    );
}
