/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://beingnitish.me",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "monthly",
  priority: 1.0,
  exclude: ["/404", "/500"],
  // Explicit case-study entries so each project page keeps a stable priority
  // even when it is added before the next full build.
  additionalPaths: async () => [
    {
      loc: "/projects/starstock",
      changefreq: "monthly",
      priority: 0.9,
      lastmod: new Date().toISOString(),
    },
  ],
}
