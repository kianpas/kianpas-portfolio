# 03. 콘텐츠 작성 가이드 (Content Guide)

> kianpas-portfolio — Markdown / frontmatter 규약, 글·프로젝트 추가 방법
> 작성 기준일: 2026-06-02

---

## 1. 기본 원칙

- 콘텐츠는 **저장소 안의 Markdown 파일**이다. CMS/DB는 없다.
- 파일을 추가/수정 → 커밋 → 배포하면 콘텐츠가 반영된다(상세는 빌드 시 정적 생성).
- **파일명이 곧 slug**다. 파일명 = URL이므로 영문 소문자·하이픈(kebab-case)을 권장한다.
- **frontmatter 키는 함부로 바꾸지 않는다**(`AGENTS.md`). 서비스 파서가 키 이름에 의존한다.

---

## 2. 글(Post) 작성

### 2.1 위치 / slug

- 위치: `src/posts/<slug>.md`
- URL: `/blog/post/<slug>`
- 예: `src/posts/cqrs-pattern.md` → `/blog/post/cqrs-pattern`

### 2.2 frontmatter 규약

```markdown
---
title: "CQRS 패턴을 실무에 적용하면서 배운 것들"
date: "2025-07-22"
author: "kianpas"
summary: "한 줄 요약. 목록 카드와 검색 결과에 노출된다."
tags: ["CQRS", "Spring", "Java", "Architecture"]
category: "backend"
---

## 본문 시작
...
```

| 키 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `title` | string | ✅ | 글 제목 |
| `date` | string(`YYYY-MM-DD`) | ✅ | 정렬·표시에 사용(문자열 비교로 내림차순 정렬) |
| `category` | string | ✅ | 카테고리. `/blog/category/<category>` 로 묶임 |
| `summary` | string | 권장 | 목록/검색 결과 요약 |
| `tags` | string[] | 권장 | `/blog/tag/<tag>` 로 묶임 |
| `author` | string | 선택 | 없으면 "Kianpas"로 표시 |

- `date`는 **문자열 그대로 비교**해 정렬하므로 `YYYY-MM-DD` 형식을 지켜야 정렬이 어긋나지 않는다.
- `readingTime`은 frontmatter가 아니라 본문에서 자동 계산된다.

### 2.3 본문

- GitHub Flavored Markdown(GFM) 지원: 표, 체크박스, 취소선 등.
- 헤딩에는 자동으로 `id`가 부여된다(앵커 이동용).
- 코드 블록/인용/이미지 등은 `prose` 스타일이 적용된다.

---

## 3. 프로젝트(Project) 작성

### 3.1 위치 / slug

- 위치: `src/projects/<slug>.md`
- URL: `/project/<slug>`

### 3.2 frontmatter 규약

```markdown
---
title: "개인 포트폴리오 & 블로그"
description: "Next.js 기반으로 제작된 개인용 포트폴리오 및 기술 블로그"
date: "2024-07-01"
imageUrl: "/images/projects/kianpas-portfolio.png"
projectUrl: "https://github.com/kianpas/kianpas-portfolio"
tags: ["Next.js", "TypeScript", "Tailwind CSS"]
type: "personal"
startDate: "2024-07"
endDate: ""
---

## 프로젝트 소개
...
```

| 키 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `title` | string | ✅ | 프로젝트명 |
| `description` | string | ✅ | 목록 카드 설명 |
| `date` | string | ✅ | 정렬용(최신순) |
| `type` | `"professional"` \| `"personal"` | ✅ | 목록에서 실무/개인 구분 |
| `imageUrl` | string | 권장 | 카드 썸네일. `public/` 기준 경로 |
| `projectUrl` | string | 권장 | GitHub/데모 링크 |
| `tags` | string[] | 권장 | 기술 태그 |
| `startDate` / `endDate` | string(`YYYY-MM`) | 선택 | 기간. 진행 중이면 `endDate`는 빈 문자열 |

- 이미지는 `public/images/projects/`에 두고 `imageUrl`을 `/images/projects/<파일>`로 지정한다.
- `startDate`/`endDate`는 타입엔 있으나 현재 **상세 페이지에서 표시하지 않는다**(`docs/05` 개선 항목).

---

## 4. 새 콘텐츠 추가 체크리스트

1. `src/posts/` 또는 `src/projects/`에 `<slug>.md` 생성.
2. 위 frontmatter 규약대로 메타 작성(`date` 형식 주의).
3. (프로젝트) 썸네일을 `public/images/projects/`에 추가.
4. `npm run dev`로 로컬 확인 — 목록/상세/태그/카테고리 노출 점검.
5. 커밋 → 배포(`docs/04`). 빌드 시 정적 페이지가 새로 생성되고 sitemap도 갱신된다.

---

## 5. 관련 문서

- 파이프라인/렌더링 동작: `docs/02-architecture.md` 6장
- 배포: `docs/04-deployment.md`
