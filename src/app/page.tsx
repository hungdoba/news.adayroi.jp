import React from 'react';
import PostCard from '@/components/PostCard';
import { getPostsOnDay } from '@/lib/post';
import DatePagination from '@/components/DatePagination';

export default function Page() {
  const posts = getPostsOnDay();

  return (
    <div className="px-4">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {posts.map((post, index) => (
          <li key={post.slug || index} className="py-12">
            <PostCard priority={index < 4} {...post} />
          </li>
        ))}
      </ul>

      <DatePagination />
    </div>
  );
}
