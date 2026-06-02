# 05. 코드 리뷰 & 개선 백로그 (Review & Improvements)

> kianpas-portfolio — 현재 코드베이스 리뷰 결과와 개선 항목
> 작성 기준일: 2026-06-02
> 우선순위: **P1**(권장, 효과 큼) / **P2**(있으면 좋음) / **P3**(소규모라 낮음)

---

## 요약

전반적으로 소규모 프론트 전용 프로젝트로서 구조가 깔끔하고 정적 우선 전략이 잘 잡혀 있다.
다만 **(1) 콘텐츠 파이프라인 이원화**, **(2) SEO 메타데이터 부재**, **(3) 검색 쿼리 인코딩 누락**이
실사용에서 가장 먼저 손볼 만한 항목이다.

---

## P1 — 우선 개선

### 1.1 글/프로젝트 Markdown 파이프라인 이원화 — ✅ 완료 (2026-06-02)

- **현상(이전)**: `services/posts.ts`는 `remark-gfm + remark-rehype + rehype-slug + rehype-stringify`를 쓰는데,
  `services/projects.ts`는 `remark-html`만 사용했다.
- **영향**: 프로젝트 본문은 GFM(표 등) 미지원, 헤딩 `id` 미생성(앵커/목차 불가). 두 곳의 렌더 결과가 달라 일관성이 깨졌다.
- **조치**: 공통 `src/utils/markdown.ts`의 `renderMarkdown(content)`로 통일(글 쪽 파이프라인 기준).
  `posts.ts`/`projects.ts` 모두 이를 호출한다. 미사용이 된 `remark-html` 의존성 제거.
- **참고**: 작업 중 `blog/category/[categoryName]/page.tsx`의 깨진 import 경로
  (`@/app/blog/components/PostList` → `@/app/blog/_components/PostList`, 빌드 실패 원인)도 함께 수정.

### 1.2 페이지별 SEO 메타데이터 부재

- **현상**: `app/layout.tsx`의 `metadata`가 최소(title/description)뿐이고 `metadataBase`가 없다. 상세 페이지에 `generateMetadata`가 없다.
- **영향**: 글/프로젝트마다 동일한 타이틀, OpenGraph/트위터 카드·canonical 없음 → 공유/검색 노출 손해. 블로그 성격상 체감이 크다.
- **제안**:
  - `layout.tsx`에 `metadataBase`, 기본 OG 추가.
  - `blog/post/[slug]`, `project/[slug]`에 `generateMetadata`로 글별 title/description/og:image 생성.

### 1.3 검색 쿼리 인코딩 누락

- **위치**: `src/components/SearchBar.tsx`
  ```ts
  const response = await fetch(`/api/search?q=${query}`);
  ```
- **영향**: `#`, `&`, 공백, `+` 등이 들어간 검색어가 깨진다.
- **제안**: `` `/api/search?q=${encodeURIComponent(query)}` `` 로 변경.

---

## P2 — 권장

### 2.1 죽은 빌드 스크립트 정리

- **위치**: `package.json`의 `"export": "next export"`, `"predeploy": "npm run build && npm run export"`.
- **영향**: `next export`는 최신 Next에서 제거됨(`output: 'export'`로 대체). 게다가 `/api` 라우트가 있어 정적 export 자체가 불가 → 실행 시 실패하는 죽은 스크립트.
- **제안**: 두 스크립트 제거(또는 실제 정적 호스팅이 목표라면 `docs/04` 3장의 전환 작업을 먼저).

### 2.2 `getProjectData`가 일부 필드를 버림

- **위치**: `src/services/projects.ts`의 `getProjectData`.
- **현상**: 반환 객체에 `date`/`startDate`/`endDate`/(일부) 메타가 빠져 있어, 프로젝트 상세에서 **기간 표시가 불가**하다(타입엔 존재).
- **제안**: frontmatter 전개를 목록 함수와 동일하게 맞추고, 상세 페이지에 진행 기간(`startDate ~ endDate`) 노출.

### 2.3 `SearchBar` error 상태 타입

- **위치**: `SearchBar.tsx` — `const [error, setError] = useState(null);`
- **현상**: 타입이 `null`로 추론되어 `setError("문자열")`이 strict에서 타입 오류 소지. 현재 동작은 우연.
- **제안**: `useState<string | null>(null)`.

### 2.4 디자인 토큰 혼용

- **현상**: 일부 컴포넌트는 `gray-*`/`blue-*` 임의 색상(예: `SearchBar`의 `focus:ring-blue-500`), 글 본문은 `primary-*`/`secondary-*`를 쓴다. `DESIGN.md`/`--ds-*` 토큰과 어긋난다.
- **제안**: 색상은 디자인 토큰/시맨틱 클래스로 통일(`NOTES.md`의 "--ds-* 사용 유지"와 일치).

---

## P3 — 낮음 (소규모라 당장 불필요)

### 3.1 검색이 매 요청 전체 본문 스캔

- `/api/search`가 모든 글의 `content`를 substring 스캔한다. 글 수가 적어 무방하나, 수십~수백 건으로 늘면 사전 인덱스(빌드 타임 생성) 고려.

### 3.2 `services/github.ts` 미완성/형태 불일치

- `getGitHubStats`의 정상 경로는 events 배열을, catch는 `{ publicRepos, followers }`를 반환해 형태가 다르다. 사용처가 없으면 제거, 쓸 거면 반환 타입 정리.

### 3.3 읽기 진행률 표시 중복 가능성

- `blog/post/[slug]/page.tsx`에 `<ReadingProgress />` 컴포넌트와, 인라인 `id="reading-progress"` sticky 바가 함께 있다. 둘이 같은 역할인지 확인 후 하나로 정리.

### 3.4 서버 전용 모듈 표시

- `services/*`는 `fs`를 쓰는 서버 전용이다. 실수로 클라이언트에서 import하지 않도록 파일 상단 주석 또는 `import "server-only";` 추가 고려(`NOTES.md` 언급).

---

## 참고: 이미 잘 되어 있는 점

- 상세 페이지 `generateStaticParams` 기반 정적 생성.
- `react`의 `cache`로 `getSortedPostsData` 요청 내 메모이즈.
- 검색 디바운스(300ms) + 바깥 클릭/ESC 닫기 처리.
- 다크 모드 FOUC 방지 인라인 스크립트.
- 공통 UI 컴포넌트(`components/ui`)와 디자인 문서(`DESIGN.md`) 보유.

---

## 관련 문서

- 아키텍처: `docs/02-architecture.md`
- 콘텐츠 규약: `docs/03-content-guide.md`
- 배포: `docs/04-deployment.md`
- 기존 메모: `NOTES.md` (Next 16 업그레이드/정리 항목과 상당수 겹침)
