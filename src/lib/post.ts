import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogType } from '@/type/blog';
import { BlogPost } from '@/types';
import { toDateString, todayJST } from './utils';
import {
  AppError,
  NotFoundError,
  ValidationError,
  catchAsync,
  validators,
} from './errors';

const CONTENT_DIR = path.join(process.cwd(), 'content');

// Cache for posts to avoid repeated file reads
let postsCache: BlogType[] | null = null;
let lastCacheUpdate: number = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Clear posts cache
 */
export const clearPostsCache = (): void => {
  postsCache = null;
  lastCacheUpdate = 0;
};

/**
 * Check if cache is valid
 */
const isCacheValid = (): boolean => {
  return postsCache !== null && Date.now() - lastCacheUpdate < CACHE_TTL;
};

/**
 * Get all posts with caching and error handling
 */
export function getAllPosts(): BlogType[] {
  if (isCacheValid()) {
    return postsCache!;
  }

  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`Content directory not found: ${CONTENT_DIR}`);
    return [];
  }

  try {
    const dirContent = fs.readdirSync(CONTENT_DIR, 'utf-8');
    const markdownFiles = dirContent.filter(
      (file) => file.endsWith('.md') && !file.startsWith('template')
    );

    postsCache = markdownFiles
      .map((file) => {
        const filePath = path.join(CONTENT_DIR, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);

        // Validate required fields and skip files with placeholder values
        if (!data.title || !data.description || !data.created_at) {
          console.warn(`Missing required fields in ${file}`);
          return null;
        }

        // Skip files with placeholder values
        if (
          typeof data.created_at === 'string' &&
          (data.created_at.includes('[') || data.created_at.includes(']'))
        ) {
          console.warn(`Skipping file with placeholder date: ${file}`);
          return null;
        }

        // Validate date
        const createdAtDate = new Date(data.created_at);
        if (isNaN(createdAtDate.getTime())) {
          console.warn(`Invalid date in ${file}: ${data.created_at}`);
          return null;
        }

        return {
          title: data.title || 'Untitled',
          slug: file.replace(/\.md$/, ''),
          description: data.description || '',
          createdAt: data.created_at || new Date().toISOString(),
        };
      })
      .filter((post): post is BlogType => post !== null); // Remove null entries

    // Sort posts by creation date (newest first)
    postsCache.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    lastCacheUpdate = Date.now();
    return postsCache;
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

/**
 * Get posts for a specific day
 */
export function getPostsOnDay(date?: Date | string): BlogType[] {
  try {
    const posts = getAllPosts();
    const targetDate = date
      ? toDateString(typeof date === 'string' ? new Date(date) : date)
      : toDateString(todayJST());

    if (!validators.isValidDate(targetDate)) {
      console.error('Invalid date format');
      return [];
    }

    return posts
      .filter((post) => toDateString(new Date(post.createdAt)) === targetDate)
      .map((post) => ({
        ...post,
        createdAt: new Date(date?.toString() || post.createdAt).toISOString(),
      }));
  } catch (error) {
    console.error('Error getting posts for specific day:', error);
    return [];
  }
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  if (!validators.isValidSlug(slug)) {
    console.error('Invalid slug format');
    return null;
  }

  const filePath = path.join(CONTENT_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
      title: data.title || 'Untitled',
      slug,
      description: data.description || '',
      createdAt: data.created_at || new Date().toISOString(),
      content,
      tags: data.tags || [],
      author: data.author || 'Anonymous',
      featured: data.featured || false,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get featured posts
 */
export function getFeaturedPosts(limit: number = 5): BlogType[] {
  const posts = getAllPosts();
  return posts.slice(0, limit);
}

/**
 * Search posts by title or description
 */
export function searchPosts(query: string): BlogType[] {
  if (!query.trim()) {
    return [];
  }

  const posts = getAllPosts();
  const searchTerm = query.toLowerCase();

  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.description.toLowerCase().includes(searchTerm)
  );
}

/**
 * Get unique post dates for navigation
 */
export function getUniquePostDates(): string[] {
  try {
    const uniqueDates = new Set<string>();
    const allPosts = getAllPosts();

    allPosts.forEach((post) => {
      if (post.createdAt) {
        const dateStr = toDateString(new Date(post.createdAt));
        if (dateStr) {
          // Only add valid dates
          uniqueDates.add(dateStr);
        }
      }
    });

    return Array.from(uniqueDates).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );
  } catch (error) {
    console.error('Error getting unique post dates:', error);
    return [];
  }
}
