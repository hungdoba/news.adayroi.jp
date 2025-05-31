import Link from 'next/link';
import { Facebook, Twitter } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Props {
  url: string;
}

export default function Share({ url }: Props) {
  return (
    <div>
      <div className="flex items-center flex-col w-full">
        <hr className="mb-8 w-96" />
        <div className="flex gap-4">
          <Tooltip>
            <TooltipTrigger>
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  url
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook
                  strokeWidth={0.8}
                  className="hover:text-blue-400 cursor-pointer"
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chia sẻ bài viết lên Facebook</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Link
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  url
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter
                  strokeWidth={0.8}
                  className="hover:text-blue-400 cursor-pointer"
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chia sẻ bài viết lên X (Twitter)</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
