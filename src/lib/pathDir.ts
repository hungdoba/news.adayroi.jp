'use server';
import fs, { readFileSync } from 'fs';

export async function readContentDir(page?: number) {
  const dirContent = fs.readdirSync(
    process.env.CONTENT_DIR ?? 'content/posts',
    'utf-8'
  );
  if (!page) {
    return dirContent;
  }

  const postsPerPage = parseInt(process.env.POSTS_PER_PAGE ?? '6', 6);
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  return dirContent.slice(startIndex, endIndex);
}

export async function readMDFile(filePath: string) {
  return readFileSync(filePath, 'utf-8');
}
