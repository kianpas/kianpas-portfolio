# NOTES.md

작업 메모. 규칙과 검증 절차는 `AGENTS.md`, 디자인 규격은 `DESIGN.md`를 보세요.

## 현재 상태

- 전 페이지가 에디토리얼 스타일로 통일됨 (홈 / 블로그 목록 / 태그 / 카테고리 /
  글 상세 / 프로젝트 / About).
- 공통 컴포넌트 정리 완료: `PageContainer`, `PageHeader`, `ArticleBody`,
  `PostRow`, `TagList`, `ArrowLink`, `LoadMoreButton` + `useLoadMore`, `utils/date`.
- Next 16 업그레이드 완료 (`next@^16.2.6`, Turbopack dev).
- 페이지별 메타데이터 완료 — 루트에 `metadataBase` + `title.template`, 나머지 라우트에
  `generateMetadata`/`metadata`. canonical도 함께 지정했고, rewrite 때문에 겹치던
  `/blog`와 `/blog/page/1`은 `/blog`를 정본으로 통일. 사이트 주소는 `data/metadata.ts`의
  `siteUrl`(= next-sitemap과 같은 `NEXT_PUBLIC_SITE_URL`) 하나만 본다.

## 남은 작업

우선순위 순:

- [ ] 글 OG 이미지 — `opengraph-image.tsx` + `next/og`의 `ImageResponse`로 글 제목이
      들어간 카드를 빌드 시점에 생성. **선행 조건**: `ImageResponse`는 폰트를 파일로
      읽어 넘겨야 하는데 저장소에 한글 폰트 파일이 없다(Geist는 라틴 전용,
      Pretendard는 CDN `@import`). 폰트 없이 만들면 한글 제목이 두부로 렌더링됨.
      아래 Pretendard 셀프호스팅 과제와 묶어서 처리하는 게 자연스러움.
      (프로젝트는 frontmatter의 `imageUrl`을 쓰고 있어 이미 OG 이미지가 나옴)
- [ ] Pretendard를 CDN `@import` 대신 `next/font/local`로 셀프호스팅.
      렌더 블로킹 제거 + 위 OG 이미지의 폰트 문제를 동시에 해결.
- [ ] RSS 피드 추가.
- [ ] 푸터 추가 (현재 레이아웃이 `<main>`으로 끝남).
- [ ] `components/ui` 처리 — `Card`/`Badge`/`Button`/`Input`이 이제
      `/design-system`에서만 쓰임. 유지할지 삭제할지 결정 필요.
- [ ] `/design-system` 페이지 처리 — 구세대(파란 액센트) 데모가 공개 배포에 노출 중.
      (색인은 `design-system/layout.tsx`의 `robots: noindex`로 일단 막아둠.
      유지/삭제 결정은 그대로 남음)
- [ ] `RelatedPosts.tsx` — 어디서도 import되지 않는 죽은 코드.
- [ ] `globals.css`의 `--ds-*` 변수 정리 — 현재 화면에서 쓰지 않음.
- [ ] 경력 데이터(`src/data/metadata.ts`)가 자리표시 상태 — 실데이터로 교체.

## 주의

- 공개 배포(Vercel)이므로 이메일 등 개인정보를 사이트에 노출하지 않습니다.
- 태그에 공백이 있는 항목(`Spring Boot` 등)은 `#태그` 표기에서 어색하게 보입니다.
