/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://beingnitish.me",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "monthly",
  priority: 1.0,
  exclude: ["/404", "/500"],
}
