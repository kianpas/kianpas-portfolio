import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

/**
 * Markdown 본문을 HTML 문자열로 변환하는 공통 함수.
 * 글(posts)과 프로젝트(projects)가 동일한 파이프라인을 사용한다.
 *
 * - remark-gfm: 표, 체크박스, 취소선 등 GFM 문법
 * - remark-rehype: Markdown AST → HTML AST
 * - rehype-slug: 헤딩에 id 부여 (앵커/목차 이동용)
 * - rehype-stringify: HTML 문자열로 직렬화
 */
export const renderMarkdown = async (content: string): Promise<string> => {
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return processed.toString();
};
