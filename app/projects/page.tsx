import type { Metadata } from "next";
import Link from "next/link";
import ProjectGrid from "@/components/ProjectGrid";
import SectionHeader from "@/components/SectionHeader";
import { PROJECTS_PAGE_CARDS } from "@/lib/projects";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const MONO = "'IBM Plex Mono', monospace";
const DESCRIPTION =
    "Case studies by Nitish Kumar: SellerMetric for Flipkart sellers, StarStock inventory system with AI connector, Star Work warranty portal and Meesho Label Sorter Pro.";
const CANONICAL = `${SITE_URL}/projects`;
const OG_IMAGE = "/og.jpg?v=2";
const OG_ALT = "Nitish Kumar, E-Commerce Executive and AI Tools Specialist";

export const metadata: Metadata = {
    title: "Projects",
    description: DESCRIPTION,
    alternates: { canonical: CANONICAL },
    openGraph: {
        title: `Projects | ${SITE_NAME}`,
        description: DESCRIPTION,
        url: CANONICAL,
        siteName: SITE_NAME,
        type: "website",
        images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_ALT }],
    },
    twitter: {
        card: "summary_large_image",
        title: `Projects | ${SITE_NAME}`,
        description: DESCRIPTION,
        images: [OG_IMAGE],
    },
};

const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${CANONICAL}#collection`,
    url: CANONICAL,
    name: "Projects",
    description: DESCRIPTION,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
    mainEntity: {
        "@type": "ItemList",
        numberOfItems: PROJECTS_PAGE_CARDS.length,
        itemListElement: PROJECTS_PAGE_CARDS.map((card, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: card.title,
            url: `${SITE_URL}${card.href}`,
        })),
    },
};

const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Projects", item: CANONICAL },
    ],
};

export default function ProjectsPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            <section className="w-full flex justify-center px-4 md:px-6 pt-10 sm:pt-14 md:pt-20 pb-16 md:pb-24">
                <div className="w-full max-w-[1200px] flex flex-col gap-12 md:gap-16">
                    <div className="flex flex-col">
                        <SectionHeader accent="#3B82F6" eyebrow="BUILT" title="Projects" as="h1">
                            <p
                                className="max-w-[640px] text-[13px] leading-relaxed text-[#a0a0a0]"
                                style={{ fontFamily: MONO }}
                            >
                                Tools built around real marketplace operations: Flipkart analytics, warranty intake,
                                Meesho shipping labels and inventory management.
                            </p>
                        </SectionHeader>

                        <ProjectGrid
                            cards={PROJECTS_PAGE_CARDS}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]"
                        />
                    </div>

                    <div className="flex justify-center md:justify-start">
                        <Link
                            href="/"
                            className="inline-flex min-h-[44px] items-center gap-2 rounded-[14px] border-[0.5px] border-[#333] bg-[#121212] px-5 text-[12px] text-[#ccc] transition-colors duration-300 hover:border-[#FF5500] hover:text-[#FF5500] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5500]"
                            style={{ fontFamily: MONO }}
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
