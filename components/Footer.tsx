"use client";

import { motion } from "framer-motion";

const socials = [
    { label: "GitHub", href: "https://github.com/beingnitishh/" },
    { label: "LinkedIn", href: "#" },
];

export default function Footer() {
    return (
        <footer
            id="contact"
            className="relative z-10 border-t border-white/[0.06] bg-surface px-6 py-20 md:px-12 lg:px-24"
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto max-w-7xl"
            >
                <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-end">
                    {/* Left */}
                    <div>
                        <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-brand/60">
                            Get in touch
                        </p>
                        <h3 className="text-3xl font-bold text-white md:text-4xl">
                            Let&apos;s build something
                            <br />
                            <span className="text-gradient">extraordinary</span>
                            <span className="text-brand">.</span>
                        </h3>
                        <div className="mt-6 space-y-2">
                            <a
                                href="mailto:beingnitishh@gmail.com"
                                className="block text-lg font-light text-white/40 transition-colors duration-300 hover:text-brand"
                            >
                                beingnitishh@gmail.com
                            </a>
                            <a
                                href="tel:+918353932343"
                                className="block text-lg font-light text-white/40 transition-colors duration-300 hover:text-brand"
                            >
                                +91 8353932343
                            </a>
                            <p className="text-sm font-light text-white/25">
                                Amroli, Surat, Gujarat
                            </p>
                        </div>
                    </div>

                    {/* Right — Socials */}
                    <div className="flex gap-6">
                        {socials.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                className="text-sm font-medium text-white/30 transition-colors duration-300 hover:text-brand"
                            >
                                {social.label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.04] pt-8 md:flex-row">
                    <p className="text-xs text-white/20">
                        © {new Date().getFullYear()} Nitish Kumar. All rights reserved.
                    </p>
                    <p className="text-xs text-white/20">
                        Next.js · Framer Motion · Tailwind CSS
                    </p>
                </div>
            </motion.div>
        </footer>
    );
}
