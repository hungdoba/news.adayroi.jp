import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { unified } from 'unified';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import Onthispage from '@/components/Onthispage';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Share from '@/components/Share';

interface Props {
  params: Promise<{ slug: string }>;
}

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings)
  .use(rehypeHighlight)
  .use(rehypeStringify);

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content');

  if (!fs.existsSync(contentDir)) {
    console.warn('Content directory not found:', contentDir);
    return [];
  }

  try {
    const dirContent = fs.readdirSync(contentDir, 'utf-8');

    return dirContent
      .filter((file) => file.endsWith('.md'))
      .map((file) => ({
        slug: file.replace(/\.md$/, ''),
      }));
  } catch (error) {
    console.error('Error reading content directory:', error);
    return [];
  }
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  const contentDir = path.join(process.cwd(), 'content');
  const filePath = path.join(contentDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { content } = matter(fileContent);

  const htmlContent = (await processor.process(content)).toString();

  return (
    <MaxWidthWrapper className="prose dark:prose-invert">
      <div className="flex">
        <div className="w-full px-4">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
          <Share url={`https://news.hungba.net/post/${slug}`} />
        </div>
        <Onthispage className="w-96 text-sm" htmlContent={htmlContent} />
      </div>
    </MaxWidthWrapper>
  );
}
