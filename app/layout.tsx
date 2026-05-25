import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID;

export const metadata: Metadata = {
    title: "Nitish Kumar - E-Commerce & AI Tools Specialist",
    description:
        "Results-driven E-Commerce Executive with 1.5+ years managing multi-platform marketplace operations across Shopify, Flipkart, and Meesho. Certified Oracle Generative AI Professional.",
    keywords: [
        "Nitish Kumar",
        "e-commerce executive",
        "AI tools specialist",
        "Shopify",
        "Flipkart",
        "Meesho",
        "portfolio",
    ],
    authors: [{ name: "Nitish Kumar" }],
     icons: {
        icon: "/favicon.svg",
    },
    openGraph: {
        title: "Nitish Kumar - E-Commerce & AI Tools Specialist",
        description:
            "Results-driven E-Commerce Executive with expertise in multi-platform marketplace operations and applied AI tooling.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable}>
            <head>
                {googleTagId ? (
                    <>
                        <Script
                            src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
                            strategy="afterInteractive"
                        />
                        <Script id="google-tag" strategy="afterInteractive">
                            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleTagId}');`}
                        </Script>
                    </>
                ) : null}
            </head>
            <body className="bg-surface font-sans antialiased">{children}</body>
        </html>
    );
}
