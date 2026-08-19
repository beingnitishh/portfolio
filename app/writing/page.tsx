import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
    title: "Writing",
    description:
        "Notes from Nitish Kumar on Flipkart seller analytics, marketplace operations, and building SellerMetric.",
    alternates: { canonical: `${SITE_URL}/writing` },
};

export default function WritingIndex() {
    return (
        <main className="min-h-screen bg-[#080808] px-6 py-24 text-white">
            <div className="mx-auto max-w-3xl">
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#F59E0B]">Notes</p>
                <h1 className="mb-4 text-4xl font-bold">Writing</h1>
                <p className="mb-12 text-white/50">
                    Experience-based notes — not generic “what is AI” posts.
                </p>
                <article className="border-b border-white/10 pb-6">
                    <Link
                        href="/writing/how-i-built-sellermetric"
                        className="text-2xl font-semibold hover:text-[#F59E0B]"
                    >
                        How I built SellerMetric for Flipkart sellers
                    </Link>
                    <p className="mt-2 text-sm text-white/50">
                        Why Earn More Reports are hard to read, and why the first version of SellerMetric stays in the
                        browser.
                    </p>
                </article>
                <p className="mt-12">
                    <Link href="/" className="text-sm text-white/40 hover:text-white">
                        ← Home
                    </Link>
                </p>
            </div>
        </main>
    );
}
