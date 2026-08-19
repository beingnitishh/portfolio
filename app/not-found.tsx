import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#080808] px-6 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#FF5500]">404</p>
            <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">Page not found</h1>
            <p className="mb-10 max-w-md text-sm text-white/50">
                That URL isn’t on beingnitish.me. Head home or open a project case study.
            </p>
            <nav className="flex flex-wrap items-center justify-center gap-4 text-sm">
                <Link href="/" className="rounded-full border border-[#FF5500]/40 px-5 py-2 text-[#FF5500]">
                    Home
                </Link>
                <Link href="/projects/sellermetric" className="text-white/60 hover:text-white">
                    SellerMetric
                </Link>
                <Link href="/writing" className="text-white/60 hover:text-white">
                    Writing
                </Link>
            </nav>
        </main>
    );
}
