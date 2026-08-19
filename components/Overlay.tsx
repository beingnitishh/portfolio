"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Overlay() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const update = () => setIsMobile(window.innerWidth < 768);
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Section 1: Name — visible 0% to 25%
    const opacity1 = useTransform(scrollYProgress, [0, 0.08, 0.18, 0.25], [0, 1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.08, 0.18, 0.25], [60, 0, 0, -80]);
    const scale1 = useTransform(scrollYProgress, [0, 0.08, 0.18, 0.25], [0.9, 1, 1, 0.95]);

    // Section 2: What I do — visible 25% to 50%
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.33, 0.43, 0.50], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.25, 0.33, 0.43, 0.50], [60, 0, 0, -80]);
    const x2 = useTransform(scrollYProgress, [0.25, 0.33, 0.43, 0.50], isMobile ? [0, 0, 0, 0] : [-40, 0, 0, -20]);

    // Section 3: AI & Data — visible 55% to 80%
    const opacity3 = useTransform(scrollYProgress, [0.55, 0.63, 0.73, 0.80], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.55, 0.63, 0.73, 0.80], [60, 0, 0, -80]);
    const x3 = useTransform(scrollYProgress, [0.55, 0.63, 0.73, 0.80], isMobile ? [0, 0, 0, 0] : [40, 0, 0, 20]);

    return (
        <div
            ref={containerRef}
            className="pointer-events-none absolute inset-0 z-10 h-[500vh]"
        >
            {/* Section 1 — Center */}
            <motion.div
                style={{ opacity: opacity1, y: y1, scale: scale1 }}
                className="sticky top-0 flex h-screen w-full items-center justify-center px-4 sm:px-6"
            >
                <div className="text-center max-w-[min(100%,40rem)]">
                    <motion.p
                        className="mb-3 text-xs sm:text-sm font-medium uppercase tracking-[0.25em] sm:tracking-[0.3em] text-brand/80 md:text-base"
                    >
                        Hello, I&apos;m
                    </motion.p>
                    <h1 className="text-[clamp(2.1rem,10vw,6.5rem)] font-bold leading-[1.05] tracking-tight text-white">
                        <span className="text-gradient">Nitish</span>
                        <br />
                        Kumar<span className="text-brand">.</span>
                    </h1>
                    <p className="mt-5 sm:mt-6 text-sm sm:text-base font-light text-white/50 md:text-lg px-1">
                        <span className="block sm:inline">E-Commerce Executive</span>
                        <span className="hidden sm:inline">&nbsp;|&nbsp;</span>
                        <span className="block sm:inline mt-1 sm:mt-0">AI Tools Specialist</span>
                    </p>
                </div>
            </motion.div>

            {/* Section 2 — Left */}
            <motion.div
                style={{ opacity: opacity2, y: y2, x: x2 }}
                className="sticky top-0 flex h-[100dvh] min-h-[100svh] w-full items-center px-4 sm:px-8 md:px-16 lg:px-24"
            >
                <div className="max-w-2xl w-full">
                    <div className="mb-4 h-px w-16 bg-brand/50" />
                    <h2 className="text-[clamp(1.75rem,7vw,3.75rem)] font-bold leading-tight text-white">
                        I drive
                        <br />
                        <span className="text-gradient">e-commerce growth</span>
                        <span className="text-brand">.</span>
                    </h2>
                    <p className="mt-4 sm:mt-6 max-w-md text-sm sm:text-base font-light leading-relaxed text-white/40 md:text-lg">
                        1.5+ years managing multi-platform marketplace operations across Shopify, Flipkart &amp; Meesho — achieving 20x ROI on ad spend.
                    </p>
                </div>
            </motion.div>

            {/* Section 3 — Right */}
            <motion.div
                style={{ opacity: opacity3, y: y3, x: x3 }}
                className="sticky top-0 flex h-screen w-full items-center justify-start md:justify-end px-4 sm:px-8 md:px-16 lg:px-24"
            >
                <div className="max-w-2xl w-full text-left md:text-right">
                    <div className="mb-4 h-px w-16 bg-brand/50 md:ml-auto" />
                    <h2 className="text-[clamp(1.75rem,7vw,3.75rem)] font-bold leading-tight text-white">
                        Powered by
                        <br />
                        <span className="text-gradient">AI &amp; data</span>
                        <span className="text-brand">.</span>
                    </h2>
                    <p className="mt-4 sm:mt-6 md:ml-auto max-w-md text-sm sm:text-base font-light leading-relaxed text-white/40 md:text-lg">
                        Oracle Certified AI Professional — building data-driven tools that optimize performance, cut costs, and accelerate content production by 60%.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
