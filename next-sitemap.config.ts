import type { IConfig } from 'next-sitemap';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kianpas-portfolio.vercel.app';

const config: IConfig = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
};

export default config;