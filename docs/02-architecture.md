# 02. 아키텍처 (Architecture)

> kianpas-portfolio — 기술 스택 / 라우트 구조 / 컴포넌트 / 데이터 흐름 / 콘텐츠 파이프라인
> 작성 기준일: 2026-06-02

---

## 1. 기술 스택

> 정확한 버전의 단일 출처는 `package.json`이다.

- **Next.js 16 (App Router)** — Turbopack dev (`next dev --turbopack`). Pages Router 미사용.
- **React 19** / **TypeScript** (strict)
- **Tailwind CSS 3** + `@tailwindcss/typography` (`prose`)
- **콘텐츠**: Markdown 파일 + `gray-matter`(frontmatter) + `remark`/`rehype` 파이프라인
- **테마**: `next-themes` (다크 모드)
- **아이콘**: `react-icons`
- **사이트맵**: `next-sitemap` (`postbuild`)
- **에디터(번들 포함)**: `@uiw/react-md-editor`, `@uiw/react-markdown-preview` — 렌더링 경로와는 별개(`docs/05` 참고)

---

## 2. 전체 구조

백엔드/DB가 없는 **단일 Next.js 앱**이다. 콘텐츠는 저장소 안의 Markdown 파일이 소스다.

```
┌─────────────────────────────┐
│        사용자(브라우저)         │
└──────────────┬──────────────┘
               │ HTTPS
        ┌──────▼───────────────────────────┐
        │   Next.js 앱 (Vercel)              │
        │                                    │
        │  Server Components (페이지)         │
        │    └ services/* 직접 호출 → 정적 생성 │
        │                                    │
        │  Route Handlers (/api/*)           │
        │    └ 클라이언트 컴포넌트 전용         │
        │       (검색 / 더보기 페이지네이션)     │
        └──────────────┬────────────────────┘
                       │ fs 읽기 (빌드/요청 시)
        ┌──────────────▼──────────────┐
        │  Markdown 콘텐츠              │
        │  src/posts/*.md              │
        │  src/projects/*.md           │
        └─────────────────────────────┘
```

- **페이지(서버 컴포넌트)**: `services/*`를 직접 호출해 파일을 읽고 렌더링한다. 상세 페이지는 `generateStaticParams`로 정적 생성.
- **API 라우트**: 클라이언트 상호작용(검색 입력, "더보기")에서만 사용. 페이지 렌더링은 API를 거치지 않는다.

---

## 3. 디렉터리 구조

```
kianpas-portfolio/
├─ src/
│  ├─ app/                         # App Router
│  │  ├─ layout.tsx                # 공통 레이아웃 (Navbar, ThemeProvider, FOUC 방지 스크립트)
│  │  ├─ (home)/                   # 홈 (route group)
│  │  │  ├─ page.tsx
│  │  │  └─ _components/           # HeroSection, HomePostTeaser
│  │  ├─ about/page.tsx
│  │  ├─ blog/
│  │  │  ├─ page/[page]/page.tsx           # 목록 (페이지네이션)
│  │  │  ├─ post/[slug]/page.tsx           # 상세
│  │  │  ├─ category/[categoryName]/page.tsx
│  │  │  ├─ tag/[tagName]/page.tsx
│  │  │  └─ _components/                   # PostCard, PostList, PostPagination
│  │  ├─ project/
│  │  │  ├─ page.tsx
│  │  │  ├─ [slug]/page.tsx
│  │  │  └─ _components/                   # ProjectCard, ProjectList
│  │  ├─ design-system/page.tsx
│  │  └─ api/                              # Route Handlers
│  │     ├─ posts/route.ts                 # 태그별 글 (page 파라미터)
│  │     ├─ projects/route.ts              # 프로젝트 더보기
│  │     └─ search/route.ts                # 글 검색
│  ├─ components/
│  │  ├─ ui/                       # Badge, Button, Card, Input (+ index.ts)
│  │  ├─ layout/                   # Navbar, ThemeProvider, ThemeToggle
│  │  ├─ SearchBar.tsx
│  │  ├─ ReadingProgress.tsx
│  │  ├─ RelatedPosts.tsx
│  │  └─ ImageOptimizer.tsx
│  ├─ services/                    # posts.ts, projects.ts, github.ts (서버 전용: fs 사용)
│  ├─ types/                       # post.ts, project.ts
│  ├─ utils/                       # readingTime.ts
│  ├─ data/                        # metadata.ts (저자/스킬/경력)
│  ├─ posts/*.md                   # 글 콘텐츠
│  └─ projects/*.md                # 프로젝트 콘텐츠
├─ public/                         # 정적 자원, robots.txt, sitemap
├─ docs/                           # 본 설계 문서
├─ next.config.ts                  # /blog → /blog/page/1 리라이트, 이미지 포맷
├─ next-sitemap.config.js
├─ tailwind.config.ts
├─ DESIGN.md                       # 디자인 토큰 (Linear)
└─ AGENTS.md                       # 작업 제약
```

---

## 4. 라우트 정의

| 화면 | 경로 | 렌더링 | 데이터 소스 |
| --- | --- | --- | --- |
| 홈 | `/` | 서버 | `getSortedPostsData()` 최근 3개 |
| About | `/about` | 서버 | `src/data/metadata.ts` |
| 블로그 목록 | `/blog/page/[page]` | 서버 | `getPaginatedPosts(page)` |
| (리라이트) | `/blog` → `/blog/page/1` | — | `next.config.ts` rewrites |
| 블로그 상세 | `/blog/post/[slug]` | 정적 생성 | `getPostData(slug)` |
| 카테고리 | `/blog/category/[categoryName]` | 서버 | `getPostsByCategory()` |
| 태그 | `/blog/tag/[tagName]` | 서버 | `getPostsByTag()` |
| 프로젝트 목록 | `/project` | 서버 | `getProjectsByType()` |
| 프로젝트 상세 | `/project/[slug]` | 정적 생성 | `getProjectData(slug)` |
| 디자인 시스템 | `/design-system` | 서버 | — |
| 검색 API | `GET /api/search?q=` | Route Handler | `getSortedPostsData()` |
| 태그 글 API | `GET /api/posts?tag=&page=` | Route Handler | `getPostsByTag()` |
| 프로젝트 API | `GET /api/projects?page=` | Route Handler | `getSortedProjectsData()` |

---

## 5. 데이터 흐름 (서버 vs 클라이언트)

- **서버 컴포넌트** (`app/**/page.tsx`): `services/*`를 직접 호출 → `fs`로 Markdown을 읽어 정적/서버 렌더링.
- **클라이언트 컴포넌트**:
  - `SearchBar` — 입력값을 300ms 디바운스 후 `/api/search` 호출.
  - `ProjectList` — "더보기" 클릭 시 `/api/projects?page=N` 호출해 누적.
- **`services/*`는 서버 전용**이다(`fs`/`path` 사용). 클라이언트에서 import 금지 → 반드시 API 라우트를 경유한다.

---

## 6. 콘텐츠 파이프라인 (Markdown → HTML)

콘텐츠 처리는 `services/posts.ts`, `services/projects.ts`에 있다.

### 6.1 글 (posts.ts)

```
파일(.md)
  → gray-matter (frontmatter/본문 분리)
  → remark
      → remark-gfm          (표/체크박스 등 GFM)
      → remark-rehype       (HTML AST)
      → rehype-slug         (헤딩에 id 부여)
      → rehype-stringify    (HTML 문자열)
  → dangerouslySetInnerHTML 로 렌더링
```

- `getSortedPostsData()` — 전체 글 메타 + 본문 + 읽기 시간을 날짜 내림차순으로 반환. `react`의 `cache`로 요청 내 메모이즈.
- `getPostData(slug)` — 본문 HTML + 이전/다음 글 반환.
- 헤딩 `id`(rehype-slug)는 본문 내 앵커 이동에 사용된다.

### 6.2 프로젝트 (projects.ts)

```
파일(.md)
  → gray-matter
  → remark → remark-html
  → dangerouslySetInnerHTML
```

> ⚠️ 글과 프로젝트의 파이프라인이 **다르다**(프로젝트는 `remark-html`만 사용 → GFM·헤딩 id 없음). 통일 권장 사항은 `docs/05` 참고.

### 6.3 읽기 시간

- `utils/readingTime.ts`의 `calculateReadingTime()`로 본문 기준 계산, `formatReadingTime()`로 표기.

---

## 7. 스타일링

- **Tailwind CSS** 유틸리티 + `prose`(타이포그래피 플러그인)로 Markdown 본문 스타일.
- 디자인 토큰/원칙은 `DESIGN.md`(Linear 스타일)와 `globals.css`의 `--ds-*` 변수에 정의.
- 공통 컴포넌트(`components/ui`)를 재사용하고, 큰 타이포그래피·넉넉한 여백·심플 레이아웃을 지향(`NOTES.md`).

---

## 8. 관련 문서

- 콘텐츠 작성 규약: `docs/03-content-guide.md`
- 배포: `docs/04-deployment.md`
- 개선 백로그: `docs/05-improvements.md`
