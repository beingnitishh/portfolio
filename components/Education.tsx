"use client";

import { motion } from "framer-motion";

interface EducationItem {
    id: number;
    title: string;
    institution: string;
    period: string;
    details: string;
    type: "education" | "certification";
    icon: string;
}

const items: EducationItem[] = [
    {
        id: 1,
        title: "Oracle Generative AI Professional",
        institution: "Oracle",
        period: "2025",
        details:
            "Certified in generative AI fundamentals, prompt engineering, and enterprise AI integration strategies.",
        type: "certification",
        icon: "🏆",
    },
    {
        id: 2,
        title: "BE10x AI Tools Workshop",
        institution: "BE10x",
        period: "2025",
        details:
            "Trained in AI-powered report generation, product photography using generative models, and end-to-end ad creation.",
        type: "certification",
        icon: "🎓",
    },
    {
        id: 3,
        title: "Intermediate (Class 12), Arts Stream",
        institution: "Mahatma J.F. Public School, CBSE",
        period: "2024–2025",
        details: "80% aggregate | 78% in Economics",
        type: "education",
        icon: "📚",
    },
    {
        id: 4,
        title: "High School (Class 10)",
        institution: "Dehradoon International School, CBSE",
        period: "2022–2023",
        details: "71% aggregate",
        type: "education",
        icon: "📖",
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export default function Education() {
    return (
        <section
            id="education"
            className="relative z-10 border-t border-white/[0.04] bg-surface px-6 py-32 md:px-12 lg:px-24"
        >
            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mb-20"
            >
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-brand/70">
                    Background
                </p>
                <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                    Education &amp; Certifications
                    <span className="text-brand">.</span>
                </h2>
            </motion.div>

            {/* Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid gap-6 md:grid-cols-2"
            >
                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        variants={cardVariants}
                        whileHover={{ y: -4, scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-md transition-colors duration-500 hover:border-brand/20 hover:bg-white/[0.04]"
                    >
                        {/* Glow */}
                        <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-brand/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                        <div className="relative z-10">
                            <div className="mb-4 flex items-start justify-between">
                                <span className="text-3xl">{item.icon}</span>
                                <span
                                    className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${item.type === "certification"
                                        ? "border-brand/30 bg-brand/10 text-brand"
                                        : "border-white/10 bg-white/[0.03] text-white/40"
                                        }`}
                                >
                                    {item.type}
                                </span>
                            </div>

                            <h3 className="mb-1 text-lg font-bold text-white">
                                {item.title}
                            </h3>
                            <p className="mb-3 text-sm font-medium text-brand/60">
                                {item.institution}
                                <span className="mx-2 text-white/20">·</span>
                                {item.period}
                            </p>
                            <p className="text-sm leading-relaxed text-white/40">
                                {item.details}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
