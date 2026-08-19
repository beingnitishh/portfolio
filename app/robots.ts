import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: "https://beingnitish.me/sitemap.xml",
        host: "https://beingnitish.me",
    };
}
