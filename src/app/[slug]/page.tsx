import { unified } from 'unified';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import fs, { readFileSync } from 'fs';
import matter from 'gray-matter';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Onthispage from '@/components/Onthispage';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const dirContent = fs.readdirSync('content/posts', 'utf-8');

  return dirContent.map((file) => {
    const fileContent = readFileSync(`content/posts/${file}`, 'utf-8');
    const { data } = matter(fileContent);

    return {
      slug: data.slug || file.replace(/\.md$/, ''),
    };
  });
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(remarkFrontmatter)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(remarkGfm)
    .use(rehypeAutolinkHeadings);

  const filePath = `content/posts/${slug}.md`;
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const htmlContent = (await processor.process(content)).toString();
  return (
    <MaxWidthWrapper className="prose dark:prose-invert">
      <div className="flex ">
        <div className="px-8">
          {/* <p>{data.description}</p> */}
          <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        </div>
        <Onthispage className="text-sm w-[100%]" htmlContent={htmlContent} />
      </div>
    </MaxWidthWrapper>
  );
}
