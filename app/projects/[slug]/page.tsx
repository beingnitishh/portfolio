import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/CaseStudy";
import { getProject, hasStorySections, PROJECTS } from "@/lib/projects";
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

    const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/#projects` },
            {
                "@type": "ListItem",
                position: 3,
                name: project.title,
                item: canonical,
            },
        ],
    };

    const software =
        project.caseStudy && project.liveUrl
            ? {
                  "@context": "https://schema.org",
                  "@type": "SoftwareApplication",
                  name: project.title,
                  description: project.summary,
                  applicationCategory: "BusinessApplication",
                  applicationSubCategory: "Inventory Management",
                  operatingSystem: "Web",
                  url: project.liveUrl,
                  ...(project.githubUrl ? { sameAs: [project.githubUrl] } : {}),
                  author: { "@type": "Person", name: SITE_NAME, url: `${SITE_URL}/` },
                  featureList: project.caseStudy.features.items.map((item) => item.title),
              }
            : null;

    if (project.caseStudy) {
        return (
            <>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
                />
                {software && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(software) }}
                    />
                )}
                <CaseStudy project={project} />
            </>
        );
    }

    return (
        <div className="px-6 py-24 text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
            />
            <article className="mx-auto max-w-3xl">
                <p className="mb-3 text-xs uppercase tracking-[0.2em]" style={{ color: project.accent }}>
                    {project.badge} · Case study
                </p>
                <h1 className="mb-4 text-4xl font-bold sm:text-5xl">{project.title}</h1>
                <p className="mb-8 text-lg text-white/60">{project.summary}</p>
                <div className="mb-12 flex flex-wrap gap-4 text-sm">
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#3B82F6] hover:underline"
                        >
                            Live site ↗
                        </a>
                    )}
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/60 hover:text-white"
                        >
                            GitHub ↗
                        </a>
                    )}
                    <Link href="/#projects" className="text-white/40 hover:text-white">
                        Back to projects
                    </Link>
                </div>

                {hasStorySections(project) &&
                    [
                        ["The problem", project.problem],
                        ["Who it’s for", project.audience],
                        ["What I built", project.solution],
                        ["Architecture", project.architecture],
                        ["What I’d improve", project.next],
                    ]
                        .filter((entry): entry is [string, string] => Boolean(entry[1]))
                        .map(([title, body]) => (
                            <section key={title} className="mb-8">
                                <h2 className="mb-2 text-xl font-semibold">{title}</h2>
                                <p className="text-sm leading-relaxed text-white/55">{body}</p>
                            </section>
                        ))}

                {project.challenges && project.challenges.length > 0 && (
                    <section className="mb-8">
                        <h2 className="mb-2 text-xl font-semibold">What was difficult</h2>
                        <ul className="list-disc space-y-2 pl-5 text-sm text-white/55">
                            {project.challenges.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {project.outcomes && project.outcomes.length > 0 && (
                    <section className="mb-8">
                        <h2 className="mb-2 text-xl font-semibold">Outcomes</h2>
                        <ul className="list-disc space-y-2 pl-5 text-sm text-white/55">
                            {project.outcomes.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {project.learnings && project.learnings.length > 0 && (
                    <section className="mb-8">
                        <h2 className="mb-2 text-xl font-semibold">What I learned</h2>
                        <ul className="list-disc space-y-2 pl-5 text-sm text-white/55">
                            {project.learnings.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </section>
                )}

                <section className="mb-12">
                    <h2 className="mb-3 text-xl font-semibold">Technology</h2>
                    <p className="text-sm text-white/55">{project.tech.join(" · ")}</p>
                </section>

                <nav className="border-t border-white/10 pt-8 text-sm text-white/40">
                    <p className="mb-3 text-white/70">Related</p>
                    <div className="flex flex-col gap-2">
                        {PROJECTS.filter((p) => p.slug !== project.slug).map((p) => (
                            <Link key={p.slug} href={`/projects/${p.slug}`} className="hover:text-white">
                                {p.title}
                            </Link>
                        ))}
                    </div>
                    <Link href="/" className="mt-8 inline-block hover:text-white">
                        ← Home
                    </Link>
                </nav>
            </article>
        </div>
    );
}
