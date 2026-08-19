import type { Metadata } from "next";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
    title: "Projects",
    description:
        "Case studies by Nitish Kumar: SellerMetric for Flipkart sellers, Star Work warranty registration, and Meesho Label Sorter Pro.",
    alternates: { canonical: `${SITE_URL}/projects` },
};

export default function ProjectsIndex() {
    return (
        <main className="min-h-screen bg-[#080808] px-6 py-24 text-white">
            <div className="mx-auto max-w-3xl">
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#3B82F6]">Built</p>
                <h1 className="mb-4 text-4xl font-bold">Projects</h1>
                <p className="mb-12 text-white/50">
                    Tools built around real marketplace operations — Flipkart analytics, warranty intake, and Meesho
                    shipping labels.
                </p>
                <ul className="flex flex-col gap-6">
                    {PROJECTS.map((p) => (
                        <li key={p.slug} className="border-b border-white/10 pb-6">
                            <Link href={`/projects/${p.slug}`} className="text-2xl font-semibold hover:text-[#3B82F6]">
                                {p.title}
                            </Link>
                            <p className="mt-2 text-sm text-white/50">{p.summary}</p>
                        </li>
                    ))}
                </ul>
                <p className="mt-12">
                    <Link href="/" className="text-sm text-white/40 hover:text-white">
                        ← Home
                    </Link>
                </p>
            </div>
        </main>
    );
}
