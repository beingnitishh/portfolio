import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/CaseStudy";
import { getProject, PROJECTS } from "@/lib/projects";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
    return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project) return {};
    const url = `${SITE_URL}/projects/${project.slug}`;
    const ogImage = "/og.jpg?v=2";
    const title = project.seo?.title ?? project.title;
    const description = project.seo?.description ?? project.summary;
    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            title: `${title} — ${SITE_NAME}`,
            description,
            url,
            siteName: SITE_NAME,
            type: "article",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: "Nitish Kumar, E-Commerce Executive and AI Tools Specialist",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} — ${SITE_NAME}`,
            description,
            images: [ogImage],
        },
    };
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project) notFound();

    const canonical = `${SITE_URL}/projects/${project.slug}`;
    const study = project.caseStudy;

    const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/#projects` },
            { "@type": "ListItem", position: 3, name: project.title, item: canonical },
        ],
    };

    const software = project.liveUrl
        ? {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: project.title,
              description: project.summary,
              applicationCategory: "BusinessApplication",
              applicationSubCategory: study.category,
              operatingSystem: "Web",
              url: project.liveUrl,
              ...(project.githubUrl ? { sameAs: [project.githubUrl] } : {}),
              author: { "@type": "Person", name: SITE_NAME, url: `${SITE_URL}/` },
              featureList: (study.features?.items ?? []).map((item) => item.title),
          }
        : null;

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
            {software && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(software) }} />
            )}
            <CaseStudy project={project} />
        </>
    );
}
