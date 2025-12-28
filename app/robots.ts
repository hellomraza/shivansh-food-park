import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/.next/', '/admin/'],
    },
    sitemap: 'https://shivanshfoodpark.com/sitemap.xml',
  };
}
