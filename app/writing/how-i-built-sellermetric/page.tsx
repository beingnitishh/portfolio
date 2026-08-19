import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL, SELLERMETRIC_URL } from "@/lib/site";

const TITLE = "How I built SellerMetric for Flipkart sellers";
const DESCRIPTION =
    "Nitish Kumar on building a browser-only Flipkart Earn More Report analyzer — the problem, the architecture, and what stayed out of the backend.";
const CANONICAL = `${SITE_URL}/writing/how-i-built-sellermetric`;
const PUBLISHED = "2026-08-19";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: CANONICAL },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: CANONICAL,
        type: "article",
        publishedTime: PUBLISHED,
    },
};

export default function Article() {
    const articleLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: TITLE,
        description: DESCRIPTION,
        datePublished: PUBLISHED,
        dateModified: PUBLISHED,
        author: { "@type": "Person", name: SITE_NAME, url: `${SITE_URL}/` },
        mainEntityOfPage: CANONICAL,
    };

    return (
        <main className="min-h-screen bg-[#080808] px-6 py-24 text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
            />
            <article className="mx-auto max-w-2xl">
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#F59E0B]">Writing · 19 Aug 2026</p>
                <h1 className="mb-6 text-4xl font-bold leading-tight">{TITLE}</h1>
                <div className="space-y-5 text-sm leading-relaxed text-white/60">
                    <p>
                        Flipkart sellers already have the data. Earn More Reports contain profit, ad spend, and return
                        signals. The problem is the format: a spreadsheet that rewards whoever has time to filter,
                        pivot, and not miss a loss-making SKU.
                    </p>
                    <p>
                        I built{" "}
                        <Link href="/projects/sellermetric" className="text-[#3B82F6] hover:underline">
                            SellerMetric
                        </Link>{" "}
                        so that file becomes a dashboard in the browser. There is no account and no upload to my
                        servers. SheetJS reads the workbook on the device; Recharts draws profit, SKU, and return-rate
                        views.
                    </p>
                    <p>
                        Keeping processing client-side was a product decision, not a shortcut. Marketplace reports
                        include commercial detail sellers should not have to trust a stranger’s database with. If the
                        file never leaves the laptop, that conversation is shorter.
                    </p>
                    <p>
                        The hard part is not the chart library. It is mapping columns that shift between report
                        versions into something stable enough to say “this SKU is losing money.” That mapping is the
                        product.
                    </p>
                    <p>
                        Live tool:{" "}
                        <a
                            href={SELLERMETRIC_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#3B82F6] hover:underline"
                        >
                            sellermetric.vercel.app
                        </a>
                    </p>
                </div>
                <p className="mt-12 text-sm">
                    <Link href="/writing" className="text-white/40 hover:text-white">
                        ← Writing
                    </Link>
                </p>
            </article>
        </main>
    );
}
