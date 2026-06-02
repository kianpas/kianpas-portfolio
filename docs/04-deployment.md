# 04. 배포 (Deployment)

> kianpas-portfolio — 로컬 실행 / 빌드 / 배포 / sitemap
> 작성 기준일: 2026-06-02

---

## 1. 로컬 실행

```bash
npm install
npm run dev        # next dev --turbopack, http://localhost:3000
```

| 스크립트 | 동작 |
| --- | --- |
| `npm run dev` | 개발 서버(Turbopack) |
| `npm run build` | 프로덕션 빌드 (정적 페이지 생성 포함) |
| `npm run postbuild` | `next-sitemap` 실행 (build 후 자동) |
| `npm run start` | 빌드 결과 서버 실행 |
| `npm run lint` | ESLint |

> `package.json`의 `export` / `predeploy` 스크립트는 현재 구조와 맞지 않는 레거시다(`/api` 라우트가 있어 정적 export 불가). 정리 대상은 `docs/05` 참고.

---

## 2. 빌드 전략

- **정적 우선(Static-first)**. 상세 페이지(`/blog/post/[slug]`, `/project/[slug]`)는 `generateStaticParams`로 빌드 타임에 생성된다.
- 콘텐츠가 Markdown 파일이므로, **새 글/프로젝트를 반영하려면 다시 빌드/배포**해야 한다.
- `/api/*` 라우트는 클라이언트 상호작용(검색·더보기)에서만 동작하는 서버 핸들러다.

---

## 3. 배포 (Vercel 권장)

별도 백엔드/DB가 없어 **Vercel에 그대로 배포**하는 것이 가장 단순하다.

1. GitHub 저장소를 Vercel 프로젝트에 연결.
2. 빌드 커맨드 `npm run build`, 출력은 Next.js 기본값(자동 감지).
3. `main` 브랜치 push → 자동 빌드·배포.
4. 환경 변수: 현재 필수 비밀값 없음(콘텐츠가 저장소 내 파일).

> 정적 호스팅(`output: 'export'`)으로 옮기려면 `/api` 라우트(검색·더보기)를 클라이언트/빌드타임 방식으로 대체해야 한다. 현재는 Vercel(서버 런타임 포함) 배포를 전제로 한다.

---

## 4. SEO / sitemap

- `next-sitemap`이 `postbuild`에서 `public/sitemap.xml`, `sitemap-0.xml`, `robots.txt`를 생성한다.
- 설정 파일: `next-sitemap.config.js`.
- ⚠️ 페이지별 메타데이터(OpenGraph, canonical, per-page title)는 아직 미흡하다 → `docs/05` P1 항목.

---

## 5. 배포 체크리스트

- [ ] `npm run build` 로컬 통과(정적 생성 에러 없음)
- [ ] `npm run lint` 통과
- [ ] 새 콘텐츠의 목록/상세/태그/카테고리 노출 확인
- [ ] sitemap에 새 URL 포함 확인
- [ ] 다크/라이트 모드 토글 정상

---

## 6. 관련 문서

- 아키텍처/렌더링: `docs/02-architecture.md`
- 콘텐츠 추가: `docs/03-content-guide.md`
- 개선 백로그: `docs/05-improvements.md`
