type Props = {
  html: string;
  className?: string;
};

/**
 * 마크다운에서 변환된 본문 HTML을 렌더링하는 공통 prose 블록.
 * 글 상세와 프로젝트 상세가 동일한 타이포그래피를 공유한다.
 */
const ArticleBody = ({ html, className = "" }: Props) => (
  <div
    className={`article-body prose prose-neutral md:prose-lg dark:prose-invert max-w-none leading-7
              prose-headings:font-bold prose-headings:tracking-tight
              prose-headings:text-gray-900 dark:prose-headings:text-gray-100
              prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
              prose-a:text-orange-600 dark:prose-a:text-orange-400 prose-a:font-medium
              prose-a:underline prose-a:decoration-orange-300 prose-a:underline-offset-4 hover:prose-a:decoration-orange-600
              prose-code:font-normal
              prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950
              prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700 prose-pre:rounded-xl
              prose-img:rounded-xl
              prose-blockquote:border-l-2 prose-blockquote:border-gray-200 dark:prose-blockquote:border-gray-700
              prose-blockquote:pl-6 prose-blockquote:not-italic
              prose-strong:font-bold prose-strong:text-gray-900 dark:prose-strong:text-gray-100
              prose-ul:space-y-2 prose-ol:space-y-2 ${className}`}
    dangerouslySetInnerHTML={{ __html: html }}
  />
);

export default ArticleBody;
