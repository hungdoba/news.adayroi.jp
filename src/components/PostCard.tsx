import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  title: string;
  slug: string;
  description: string;
  createdAt: string;
}

export default function PostCard({
  title,
  slug,
  description,
  createdAt,
}: Props) {
  return (
    <article>
      <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0 xl:gap-x-6">
        <div>
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
              <time dateTime={createdAt}>{formatDate(createdAt)}</time>
            </dd>
          </dl>
          <div className="my-4 relative w-full aspect-video">
            <Image
              fill
              src={`/images/${slug}.webp`}
              alt={title}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded"
            />
          </div>
        </div>

        <div className="space-y-5 xl:col-span-3">
          <div className="space-y-6">
            <h2 className="text-2xl leading-8 font-bold tracking-tight">
              <Link
                href={`/post/${slug}`}
                className="text-gray-900 dark:text-white"
              >
                {title}
              </Link>
            </h2>
            <div className="prose max-w-none text-gray-500 dark:text-gray-400">
              {description}
            </div>
          </div>
          <div className="text-base leading-6 font-medium">
            <Link
              href={`/post/${slug}`}
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-gray-600 dark:text-gray-300"
              aria-label={`Read more: "${title}"`}
            >
              Đọc thêm &rarr;
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
