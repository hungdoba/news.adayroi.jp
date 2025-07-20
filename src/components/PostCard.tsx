import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import ExportedImage from 'next-image-export-optimizer';

interface Props {
  title: string;
  slug: string;
  description: string;
  createdAt: string;
  priority?: boolean;
}

export default function PostCard({
  title,
  slug,
  description,
  createdAt,
  priority = false,
}: Props) {
  return (
    <article>
      <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:gap-x-6 xl:space-y-0">
        <div>
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={createdAt}>{formatDate(createdAt)}</time>
            </dd>
          </dl>
          <div className="relative my-4 aspect-video w-full">
            <ExportedImage
              fill
              src={`/images/thumbnails/${slug}.webp`}
              alt={title}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded object-cover"
              priority={priority}
              unoptimized={false}
            />
          </div>
        </div>

        <div className="space-y-5 xl:col-span-3">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold leading-8 tracking-tight">
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
          <div className="text-base font-medium leading-6">
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
