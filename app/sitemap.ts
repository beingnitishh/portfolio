import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();
    return [
        { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
        { url: `${SITE_URL}/projects`, lastModified, changeFrequency: "monthly", priority: 0.8 },
        ...PROJECTS.map((p) => ({
            url: `${SITE_URL}/projects/${p.slug}`,
            lastModified,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        })),
        { url: `${SITE_URL}/writing`, lastModified, changeFrequency: "monthly", priority: 0.6 },
        {
            url: `${SITE_URL}/writing/how-i-built-sellermetric`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.6,
        },
    ];
}
