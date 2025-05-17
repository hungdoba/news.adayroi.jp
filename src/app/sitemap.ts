import { getAllPosts } from '@/lib/post';
import { BlogType } from '@/type/blog';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const baseUrl = 'https://news.adayroi.jp';
  const now = new Date();

  const staticPages = [
    {
      url: `${baseUrl}/about-us`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // JLPT test pages (listen and regular)
  const newsSitemap = posts.flatMap((post: BlogType) => ({
    url: `${baseUrl}/post/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    ...staticPages,
    ...newsSitemap,
  ];
}

export const dynamic = 'force-static';
