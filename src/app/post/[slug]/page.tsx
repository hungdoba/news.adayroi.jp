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
  const dirContent = fs.readdirSync(process.env.CONTENT_DIR ?? '', 'utf-8');

  return dirContent
    .filter((file) => file.endsWith('.md'))
    .map((file) => ({
      slug: file.replace(/\.md$/, ''),
    }));
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;

  const filePath = path.join(process.env.CONTENT_DIR ?? '', `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { content } = matter(fileContent);

  const htmlContent = (await processor.process(content)).toString();

  return (
    <MaxWidthWrapper className="prose dark:prose-invert">
      <div className="flex">
        <div className="px-4">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        </div>
        <Onthispage className="text-sm w-[100%]" htmlContent={htmlContent} />
      </div>
    </MaxWidthWrapper>
  );
}
