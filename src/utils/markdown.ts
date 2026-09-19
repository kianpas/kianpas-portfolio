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
export type TocEntry = { id: string; text: string; depth: number };

type HtmlNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: { id?: string; alt?: string };
  children?: HtmlNode[];
};

export const renderMarkdownWithToc = async (content: string) => {
  const toc: TocEntry[] = [];
  const textContent = (node: HtmlNode): string =>
    node.type === "text" ? node.value ?? "" :
      node.tagName === "img" ? node.properties?.alt ?? "" :
        (node.children ?? []).map(textContent).join("");
  const collectHeadings = () => (tree: HtmlNode) => {
    const visit = (node: HtmlNode) => {
      if ((node.tagName === "h2" || node.tagName === "h3") && node.properties?.id) {
        const text = textContent(node).trim();
        if (text) toc.push({ id: node.properties.id, text, depth: Number(node.tagName[1]) });
      }
      node.children?.forEach(visit);
    };
    visit(tree);
  };
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(collectHeadings)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return { html: processed.toString(), toc };
};

export const renderMarkdown = async (content: string): Promise<string> =>
  (await renderMarkdownWithToc(content)).html;
