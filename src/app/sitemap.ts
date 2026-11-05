import type { MetadataRoute } from 'next';
import { siteUrl } from '@/config/links';
import { LEGAL } from '@/lib/legal';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: 'monthly', priority: 1 },
    ...Object.values(LEGAL).map((d) => ({
      url: `${siteUrl}${d.path}`,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ];
}
