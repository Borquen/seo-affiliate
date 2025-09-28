/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  generateRobotsTxt: true,
  exclude: ['/r/*','/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: [`${process.env.SITE_URL}/sitemap.xml`]
  }
}
