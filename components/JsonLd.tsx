import { GITHUB_URL, INSTAGRAM_URL, JOB_TITLE, LINKEDIN_URL, SITE_NAME, SITE_URL } from "@/lib/site";

const graph = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Person",
            "@id": `${SITE_URL}/#person`,
            name: SITE_NAME,
            url: `${SITE_URL}/`,
            image: `${SITE_URL}/og.jpg`,
            jobTitle: JOB_TITLE,
            description:
                "E-Commerce Executive with 1.5+ years managing multi-platform marketplace operations across Shopify, Flipkart, and Meesho. Google Ads Search Professional and Oracle Generative AI Professional.",
            email: "mailto:beingnitishh@gmail.com",
            sameAs: [GITHUB_URL, LINKEDIN_URL, INSTAGRAM_URL],
            knowsAbout: [
                "E-commerce",
                "E-commerce Operations",
                "Flipkart Seller Analytics",
                "Meesho",
                "Shopify",
                "Artificial Intelligence",
                "AI Tools",
                "Marketplace Operations",
            ],
            hasCredential: [
                {
                    "@type": "EducationalOccupationalCredential",
                    name: "Google Ads Search Professional Certification",
                    credentialCategory: "Professional Certification",
                    recognizedBy: { "@type": "Organization", name: "Google" },
                    url: "https://skillshop.credential.net/88e4e44b-60cc-4734-a48d-cdd1e6377dd6",
                },
                {
                    "@type": "EducationalOccupationalCredential",
                    name: "Oracle Generative AI Professional",
                    credentialCategory: "Professional Certification",
                    recognizedBy: { "@type": "Organization", name: "Oracle" },
                },
            ],
        },
        {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            name: SITE_NAME,
            url: `${SITE_URL}/`,
            publisher: { "@id": `${SITE_URL}/#person` },
            inLanguage: "en",
        },
        {
            "@type": "WebPage",
            "@id": `${SITE_URL}/#webpage`,
            url: `${SITE_URL}/`,
            name: `${SITE_NAME} — ${JOB_TITLE}`,
            isPartOf: { "@id": `${SITE_URL}/#website` },
            about: { "@id": `${SITE_URL}/#person` },
            inLanguage: "en",
        },
    ],
};

export default function JsonLd() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
    );
}
