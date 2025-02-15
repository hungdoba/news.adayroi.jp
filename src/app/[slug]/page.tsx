import { unified } from 'unified';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import fs from 'fs';
import matter from 'gray-matter';
// import { Metadata } from 'next';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Onthispage from '@/components/Onthispage';

// type Props = {
//   params: { slug: string; title: string; description: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// };

interface Props {
  params: Promise<{ slug: string }>;
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

  const filePath = `content/${slug}.md`;
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const htmlContent = (await processor.process(content)).toString();
  return (
    <MaxWidthWrapper className="prose dark:prose-invert">
      <div className="flex ">
        <div className="px-16">
          <h1>{data.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        </div>
        <Onthispage className="text-sm w-[50%]" htmlContent={htmlContent} />
      </div>
    </MaxWidthWrapper>
  );
}

// export async function generateMetadata({
//   params: _params,
// }: Props): Promise<Metadata> {
//   const params = await Promise.resolve(_params);
//   const filePath = `content/${params.slug}.md`;
//   const fileContent = fs.readFileSync(filePath, 'utf-8');
//   const { data } = matter(fileContent);
//   return {
//     title: `${data.title} - ProgrammingWithHarry`,
//     description: data.description,
//   };
// }
