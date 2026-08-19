import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Syne } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const TITLE = "Nitish Kumar - E-Commerce & AI Tools Specialist";
const DESCRIPTION =
    "E-Commerce Executive with 1.5+ years managing multi-platform marketplace operations across Shopify, Flipkart, and Meesho. Certified Oracle Generative AI Professional.";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const syne = Syne({
    subsets: ["latin"],
    weight: ["700", "800"],
    variable: "--font-syne",
    display: "swap",
});

const plex = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    variable: "--font-plex",
    display: "swap",
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    viewportFit: "cover",
    themeColor: "#080808",
};

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: TITLE,
        template: "%s | Nitish Kumar",
    },
    description: DESCRIPTION,
    applicationName: "Nitish Kumar Portfolio",
    keywords: [
        "Nitish Kumar",
        "e-commerce executive",
        "AI tools specialist",
        "Shopify",
        "Flipkart",
        "Meesho",
        "Google Ads Search",
        "Oracle Generative AI",
        "marketplace operations",
        "Surat",
        "portfolio",
    ],
    authors: [{ name: "Nitish Kumar", url: SITE_URL }],
    creator: "Nitish Kumar",
    publisher: "Nitish Kumar",
    category: "portfolio",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    alternates: {
        canonical: `${SITE_URL}/`,
    },
    icons: {
        icon: "/favicon.svg",
        shortcut: "/favicon.svg",
        apple: "/favicon.svg",
    },
    manifest: "/site.webmanifest",
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: SITE_URL,
        siteName: SITE_NAME,
        title: TITLE,
        description: DESCRIPTION,
        images: [
            {
                url: "/og.jpg",
                width: 1376,
                height: 768,
                alt: "Nitish Kumar — E-Commerce Executive and AI Tools Specialist",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
        images: ["/og.jpg"],
    },
    other: {
        "geo.region": "IN-GJ",
        "geo.placename": "Surat",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable}>
            <body className="bg-surface font-sans antialiased">
                <JsonLd />
                {children}
            </body>
        </html>
    );
}
