import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import ExportedImage from 'next-image-export-optimizer';
import type { PostCardProps } from '@/types';

export default function PostCard({
  title,
  slug,
  description,
  createdAt,
  priority = false,
}: PostCardProps) {
  return (
    <article className="bg-card group relative rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex flex-col space-y-4">
        <div className="space-y-2">
          <h3 className="group-hover:text-primary text-xl font-semibold tracking-tight transition-colors">
            <Link
              href={`/post/${slug}`}
              className="after:absolute after:inset-0"
            >
              {title}
            </Link>
          </h3>
          <time className="text-muted-foreground text-sm" dateTime={createdAt}>
            {formatDate(createdAt)}
          </time>
        </div>

        <div className="relative aspect-video w-full">
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

        <p className="text-muted-foreground line-clamp-3">{description}</p>

        <div className="flex items-center justify-between pt-2">
          <Link
            href={`/post/${slug}`}
            className="text-primary text-sm font-medium hover:underline"
          >
            Đọc thêm →
          </Link>
        </div>
      </div>
    </article>
  );
}
