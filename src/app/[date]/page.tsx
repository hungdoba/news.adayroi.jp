import React from 'react';
import PostCard from '@/components/PostCard';
import { getPostsOnDay, getUniquePostDates } from '@/lib/post';
import { toDateString } from '@/lib/utils';
import DatePagination from '@/components/DatePagination';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    date: string;
  }>;
}

export function generateStaticParams() {
  const dates = getUniquePostDates();

  // Return empty array if no valid dates
  if (!dates || dates.length === 0) {
    return [];
  }

  return dates.map((createdDate) => ({
    date: createdDate,
  }));
}

export default async function Page({ params }: Props) {
  const { date } = await params;
  const selectedDateStr = toDateString(date);
  if (!selectedDateStr) {
    notFound();
  }

  const posts = getPostsOnDay(selectedDateStr);

  if (!posts || posts.length === 0) {
    notFound();
  }

  return (
    <div className="px-4">
      {
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {posts.map(({ title, slug, description, createdAt }) => (
            <li key={slug} className="py-12">
              <PostCard
                title={title}
                slug={slug}
                description={description}
                createdAt={createdAt}
              />
            </li>
          ))}
        </ul>
      }

      <DatePagination selectedDateStr={selectedDateStr} />
    </div>
  );
}
