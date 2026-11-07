import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Syne } from "next/font/google";
import Script from "next/script";
import ConsentBanner from "@/components/ConsentBanner";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const TITLE = "Nitish Kumar - E-Commerce & AI Tools Specialist";
const DESCRIPTION =
    "E-Commerce Executive with 1.5+ years managing multi-platform marketplace operations across Shopify, Flipkart, and Meesho. Certified Oracle Generative AI Professional.";
const OG_IMAGE = "/og.jpg?v=2";

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
    metadataBase: new URL("https://beingnitish.me"),
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
                url: OG_IMAGE,
                width: 1200,
                height: 630,
                alt: "Nitish Kumar, E-Commerce Executive and AI Tools Specialist",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
        images: [OG_IMAGE],
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
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-EERF19N4J7"
                    strategy="afterInteractive"
                />
                <Script id="google-tag" strategy="afterInteractive">
                    {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}

    gtag('consent','default',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});
    gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500,region:['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IE','IT','LV','LI','LT','LU','MT','NL','NO','PL','PT','RO','SK','SI','ES','SE','GB','CH']});

    try {
      var consentChoice = localStorage.getItem('consent_choice');
      if (consentChoice === 'granted') {
        gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});
      } else if (consentChoice === 'denied') {
        gtag('consent','update',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});
      }
    } catch {}

    gtag('js', new Date());
    gtag('config','G-EERF19N4J7');
  `}
                </Script>
                <JsonLd />
                <ConsentBanner />
                {children}
            </body>
        </html>
    );
}
