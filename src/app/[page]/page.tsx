import React from 'react';
import Link from 'next/link';
import { readContentDir, readMDFile } from '@/lib/pathDir';
import matter from 'gray-matter';

interface Props {
  params: Promise<{ page: number }>;
}

export async function generateStaticParams() {
  const dirContent = await readContentDir();
  const totalPosts = dirContent.length;

  const totalPages = Math.ceil(
    totalPosts / parseInt(process.env.POSTS_PER_PAGE ?? '6', 6)
  );

  return Array.from({ length: totalPages }).map((_, index) => {
    return {
      page: index + 1,
    };
  });
}

export default async function Page({ params }: Props) {
  const { page } = await params;
  const dirContent = await readContentDir(page);
  const posts: Article[] = await Promise.all(
    dirContent.map(async (file) => {
      const fileContent = await readMDFile(`content/posts/${file}`);
      const { data } = matter(fileContent);
      const value: Article = {
        slug: data.slug,
        title: data.title,
        date: '2021-09-01',
        summary: data.summary,
        tags: data.tags,
        description: data.description,
        imageUrl: data?.imageUrl,
      };
      return value;
    })
  );

  return (
    <div className="px-4 divide-y divide-gray-200 dark:divide-gray-700">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {!posts.length && 'No posts found.'}
        {posts.map((post) => {
          const { slug, date, title, summary, tags } = post;
          return (
            <li key={slug} className="py-12">
              <article>
                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>2021-09-01</time>
                    </dd>
                  </dl>
                  <div className="space-y-5 xl:col-span-3">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl leading-8 font-bold tracking-tight">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-gray-900 dark:text-gray-100"
                          >
                            {title}
                          </Link>
                        </h2>
                        <div className="flex flex-wrap">
                          {tags && tags.map((tag) => <p key={tag}>{tag}</p>)}
                        </div>
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {summary}
                      </div>
                    </div>
                    <div className="text-base leading-6 font-medium">
                      <Link
                        href={`/${slug}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label={`Read more: "${title}"`}
                      >
                        Read more &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
