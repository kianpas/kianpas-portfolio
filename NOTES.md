# NOTES.md

작업 메모. 규칙과 검증 절차는 `AGENTS.md`, 디자인 규격은 `DESIGN.md`를 보세요.

## 현재 상태

- 전 페이지가 에디토리얼 스타일로 통일됨 (홈 / 블로그 목록 / 태그 / 카테고리 /
  글 상세 / 프로젝트 / About).
- 공통 컴포넌트 정리 완료: `PageContainer`, `PageHeader`, `ArticleBody`,
  `PostRow`, `TagList`, `ArrowLink`, `LoadMoreButton` + `useLoadMore`, `utils/date`.
- Next 16 업그레이드 완료 (`next@^16.2.6`, Turbopack dev).

## 남은 작업

우선순위 순:

- [ ] 글 상세 `generateMetadata` — 현재 모든 페이지가 루트의 title/description을
      공유해서, 글을 공유해도 제목·요약·OG 카드가 안 나옴.
- [ ] RSS 피드 추가.
- [ ] 푸터 추가 (현재 레이아웃이 `<main>`으로 끝남).
- [ ] `components/ui` 처리 — `Card`/`Badge`/`Button`/`Input`이 이제
      `/design-system`에서만 쓰임. 유지할지 삭제할지 결정 필요.
- [ ] `/design-system` 페이지 처리 — 구세대(파란 액센트) 데모가 공개 배포에 노출 중.
- [ ] `RelatedPosts.tsx` — 어디서도 import되지 않는 죽은 코드.
- [ ] `globals.css`의 `--ds-*` 변수 정리 — 현재 화면에서 쓰지 않음.
- [ ] Pretendard를 CDN `@import` 대신 `next/font/local`로 셀프호스팅.
- [ ] 경력 데이터(`src/data/metadata.ts`)가 자리표시 상태 — 실데이터로 교체.

## 주의

- 공개 배포(Vercel)이므로 이메일 등 개인정보를 사이트에 노출하지 않습니다.
- 태그에 공백이 있는 항목(`Spring Boot` 등)은 `#태그` 표기에서 어색하게 보입니다.
