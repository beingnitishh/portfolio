"use client";

import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

export default function Navbar() {
    const { scrollYProgress } = useScroll();
    const borderOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 0.06]);
    const borderColor = useMotionTemplate`rgba(255, 255, 255, ${borderOpacity})`;

    return (
        <motion.nav
            style={{
                borderBottomColor: borderColor,
            }}
            className="fixed left-0 right-0 top-0 z-50 border-b border-transparent backdrop-blur-md"
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12">
                {/* Logo */}
                <motion.a
                    href="#"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg font-bold tracking-tight text-white"
                >
                    Nitish<span className="text-brand"> Kumar</span>
                </motion.a>

                {/* Nav links */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex items-center gap-8"
                >
                    <a
                        href="#skills"
                        className="hidden text-sm font-medium text-white/50 transition-colors duration-300 hover:text-white md:inline-block"
                    >
                        Skills
                    </a>
                    <a
                        href="#experience"
                        className="hidden text-sm font-medium text-white/50 transition-colors duration-300 hover:text-white md:inline-block"
                    >
                        Experience
                    </a>
                    <a
                        href="#projects"
                        className="text-sm font-medium text-white/50 transition-colors duration-300 hover:text-white"
                    >
                        Projects
                    </a>
                    <a
                        href="#contact"
                        className="rounded-full border border-brand/30 bg-brand/5 px-5 py-2 text-sm font-medium text-brand transition-all duration-300 hover:border-brand/50 hover:bg-brand/10 hover:shadow-[0_0_20px_rgba(0,245,255,0.15)]"
                    >
                        Contact
                    </a>
                </motion.div>
            </div>
        </motion.nav>
    );
}
