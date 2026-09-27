import type { TocEntry } from "@/utils/markdown";

const TocLinks = ({ entries }: { entries: TocEntry[] }) => (
  <ol className="space-y-1">
    {entries.map((entry) => (
      <li key={entry.id} className={entry.depth === 3 ? "ps-4" : ""}>
        <a
          href={`#${encodeURIComponent(entry.id)}`}
          className="block py-2 text-sm leading-6 text-gray-600 underline decoration-gray-300 underline-offset-4 [overflow-wrap:anywhere] hover:text-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-gray-300 dark:decoration-gray-600 dark:hover:text-orange-400"
        >
          {entry.text}
        </a>
      </li>
    ))}
  </ol>
);

export default function ArticleToc({ entries, desktop = false }: { entries: TocEntry[]; desktop?: boolean }) {
  if (entries.length < 2) return null;

  return desktop ? (
    <nav aria-label="이 글의 목차" className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain px-1 pb-4">
      <p className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">이 글의 목차</p>
      <TocLinks entries={entries} />
    </nav>
  ) : (
    // 위쪽 선은 헤더의 border-b와 40px 간격을 두고 겹쳐 빈 띠처럼 보여서 아래쪽만 남긴다.
    <details className="mb-10 border-b border-gray-200 pb-3 dark:border-gray-700 lg:hidden">
      <summary className="cursor-pointer py-2 text-sm font-semibold text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-gray-100">
        이 글의 목차 ({entries.length})
      </summary>
      <nav aria-label="이 글의 목차" className="mt-3"><TocLinks entries={entries} /></nav>
    </details>
  );
}
