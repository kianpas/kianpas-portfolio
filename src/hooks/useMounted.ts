import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * 클라이언트에서 마운트되었는지 여부를 반환한다.
 * 서버 렌더링 및 하이드레이션 시점에는 false, 커밋 이후 true.
 * effect 내 setState 없이 hydration 불일치를 피하기 위한 패턴.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
