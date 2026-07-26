"use client";

import { useState } from "react";

type FetchPageResult<T> = {
  items: T[];
  hasMore: boolean;
};

type Params<T> = {
  initialItems: T[];
  totalPage: number;
  /** page(2부터) 를 받아 다음 페이지 항목과 hasMore 를 반환. 실패 시 throw */
  fetchPage: (page: number) => Promise<FetchPageResult<T>>;
};

/**
 * 목록의 "더보기" 페이지네이션 공통 로직.
 * PostList / ProjectList 가 동일하게 사용한다.
 */
export function useLoadMore<T>({ initialItems, totalPage, fetchPage }: Params<T>) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(1 < totalPage);

  const loadMore = async () => {
    if (loading || page >= totalPage) return;

    setLoading(true);
    try {
      const nextPage = page + 1;
      const { items: newItems, hasMore: more } = await fetchPage(nextPage);
      setItems((prev) => [...prev, ...newItems]);
      setPage(nextPage);
      setHasMore(more);
    } catch {
      // 실패 시 조용히 멈춘다 (기존 동작 유지)
    } finally {
      setLoading(false);
    }
  };

  return { items, loading, hasMore, loadMore };
}
