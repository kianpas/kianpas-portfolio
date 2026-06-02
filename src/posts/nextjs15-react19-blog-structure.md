---
title: "Next.js 15 & React 19 기반 블로그 구조 및 기술 스택 정리"
date: "2025-08-05"
author: "이운산"
summary: "Next.js App Router 기반으로 블로그를 설계한 이유와 구조"
tags: ["Next.js", "React", "Blog", "MDX", "TailwindCSS", "Vercel"]
category: "frontend"
---

## 개요

개인 블로그를 만들면서 최근 가장 고민한 건 기술 스택 선택이었다. 이 글에서는 **Next.js 15**와 **React 19**를 기반으로 블로그를 구축한 구조와 선택 이유,  그리고 실제 구현 내용을 공유한다.

### 기술 스택 선정 배경

- 기존 React, Next.js 학습 경험 있음
- 활발한 사용자 커뮤니티와 자료 덕분에 문제 해결과 학습이 용이 

### 블로그의 실제 구조 및 기술 스택 소개

#### 📦 디렉토리 구조

```text
src/
├── app/
│ ├── layout.tsx # 전체 레이아웃
│ ├── page.tsx # 홈
│ └── blog/
│ ├── page.tsx # 블로그 목록
│ └── [slug]/ # 포스트 상세
├── components/ # UI 컴포넌트
├── lib/ # 유틸, MDX 처리
├── content/ # 마크다운(.mdx) 파일
├── styles/ # Tailwind 설정
```

#### 🧩 기술 스택

- **Next.js 15**: 서버 컴포넌트와 App Router를 활용한 프레임워크
- **React 19**: 최신 버전의 리액트
- **Tailwind CSS**: 유틸리티 기반의 CSS 프레임워크로, 커스텀 스타일을 빠르게 적용
- **MDX**: 마크다운 내에 리액트 컴포넌트를 사용할 수 있게 해주는 도구
- **Contentlayer**: 마크다운 파일의 내용을 정적 타입으로 변환
- **Vercel**: Next.js 프로젝트에 최적화된 무료 배포 및 호스팅 서비스

### MDX 렌더링 방식

마크다운 포스트는 `contentlayer`와 `next-mdx-remote`를 함께 사용하여 렌더링된다.  
정적 타입을 자동 생성하고, `params.slug`를 기반으로 동적으로 포스트를 가져온다.

```tsx
// app/blog/[slug]/page.tsx

import { allPosts } from "contentlayer/generated";
import { Mdx } from "@/components/mdx-components";

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = allPosts.find((p) => p._raw.flattenedPath === `blog/${params.slug}`);
  return (
    <article className="prose">
      <h1>{post?.title}</h1>
      <Mdx code={post?.body.code} />
    </article>
  );
}
```
