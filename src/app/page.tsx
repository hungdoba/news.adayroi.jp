import React from 'react';
import fs, { readFileSync } from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import Image from 'next/image';

interface BlogType {
  title: string;
  slug: string;
  description: string;
  created_at: string;
}

const dirContent = fs.readdirSync('content', 'utf-8');

const posts: BlogType[] = dirContent
  .map((file) => {
    const fileContent = readFileSync(`content/${file}`, 'utf-8');
    const { data } = matter(fileContent);
    const value: BlogType = {
      title: data.title,
      slug: file.replace(/\.md$/, ''),
      description: data.description,
      created_at: data.created_at,
    };

    return value;
  })
  .sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
export default async function Page() {
  return (
    <div className="px-4">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {!posts.length && 'No posts found.'}
        {posts.map((post) => {
          const { title, slug, description, created_at } = post;
          return (
            <li key={slug} className="py-12">
              <article>
                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0 xl:gap-x-6">
                  <dl>
                    <dt className="sr-only ">Published on</dt>
                    <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                      <time dateTime={created_at}>
                        {new Date(created_at).toLocaleDateString('vi-VN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>

                      {new Date(created_at).toDateString() <=
                        new Date().toDateString() && (
                        <div className="my-4 relative w-full aspect-video">
                          <Image
                            fill={true}
                            src={`/images/${slug}.webp`}
                            alt={title}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                      )}
                    </dd>
                  </dl>
                  <div className="space-y-5 xl:col-span-3">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl leading-8 font-bold tracking-tight">
                          <Link
                            href={`/${slug}`}
                            className="text-gray-900 dark:text-white"
                          >
                            {title}
                          </Link>
                        </h2>
                        {/* <div className="flex flex-wrap">
                          {tags && tags.map((tag) => <p key={tag}>{tag}</p>)}
                        </div> */}
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {description}
                      </div>
                    </div>
                    <div className="text-base leading-6 font-medium">
                      <Link
                        href={`/${slug}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-gray-600 dark:text-gray-300"
                        aria-label={`Read more: "${title}"`}
                      >
                        Đọc thêm &rarr;
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
