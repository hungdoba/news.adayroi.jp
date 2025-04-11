import fs from 'fs';
import matter from 'gray-matter';
import { BlogType } from '@/type/blog';
import { toDateString } from './utils';

const CONTENT_DIR = 'content';

// Cache for posts to avoid repeated file reads
let postsCache: BlogType[] | null = null;

export function getAllPosts(): BlogType[] {
  if (postsCache) return postsCache;

  try {
    const dirContent = fs.readdirSync(CONTENT_DIR, 'utf-8');

    postsCache = dirContent.map((file) => {
      const fileContent = fs.readFileSync(`${CONTENT_DIR}/${file}`, 'utf-8');
      const { data } = matter(fileContent);
      return {
        title: data.title,
        slug: file.replace(/\.md$/, ''),
        description: data.description,
        createdAt: data.created_at,
      };
    });

    return postsCache;
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

export function getPostsOnDay(date?: Date | string): BlogType[] {
  try {
    const posts = getAllPosts();
    const targetDate = date
      ? typeof date === 'string'
        ? date
        : toDateString(date)
      : toDateString(new Date());

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

export function getUniquePostDates(): string[] {
  try {
    const uniqueDates = new Set<string>();
    const allPosts = getAllPosts();

    allPosts.forEach((post) => {
      if (post.createdAt) {
        uniqueDates.add(toDateString(new Date(post.createdAt)));
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
