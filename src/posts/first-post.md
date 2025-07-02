---
title: 'Next.js와 Tailwind CSS로 나만의 블로그 만들기'
date: '2025-07-02'
author: 'kianpas'
summary: '이 포스트는 Next.js와 Tailwind CSS를 사용하여 만든 이 블로그에 대한 구성을 간단히 기록했습니다.'
tags: ['Next.js', 'TailwindCSS', 'React', 'TypeScript', 'Markdown']
---

## 안녕하세요! 첫 포스트에 오신 것을 환영합니다.

이 블로그는 저의 개발 여정과 학습한 내용들을 기록하기 위해 만들어졌습니다. 첫 번째 포스트에서는 이 블로그를 어떻게 만들었는지, 그 과정과 사용된 기술 스택에 대해 이야기해보려고 합니다.
 
 ### 🚀 사용된 기술 스택
- **Next.js**: React 프레임워크로, 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 지원하여 빠른 속도와 뛰어난 SEO 성능을 자랑합니다.
- **Tailwind CSS**: 유틸리티-우선 CSS 프레임워크로, 디자인 시스템을 빠르게 구축하고 커스터마이징할 수 있게 해줍니다.
- **TypeScript**: JavaScript에 정적 타입을 추가하여 코드의 안정성과 가독성을 높여줍니다.
- **Markdown**: 포스트 작성을 위해 사용하며, `gray-matter`와 `remark` 라이브러리를 통해 파싱합니다.

1.  **Next.js 프로젝트 생성:**

    npx create-next-app@latest my-blog --typescript --tailwind --eslint
    위 명령어를 통해 TypeScript와 Tailwind CSS가 기본 설정된 Next.js 프로젝트를 시작했습니다.

2.  **블로그 포스트 구조 설계:**

    모든 포스트는 `src/posts` 디렉토리에 마크다운 (`.md`) 파일로 저장됩니다. 각 파일 상단에는 `---`로 구분된 'frontmatter' 영역이 있어, 제목, 날짜, 작성자 등의 메타데이터를 관리합니다.

    ---
        title: '포스트 제목'
        date: 'YYYY-MM-DD'
        author: '작성자'
        summary: '포스트 요약'
        tags: ['태그1', '태그2']
    ---

    여기에 포스트 본문을 작성합니다...


3. **마크다운 파싱 및 렌더링:**
 
    `fs` 모듈로 `.md` 파일을 읽고, `gray-matter`로 frontmatter를 분리한 뒤, `remark`와 `remark-html`을 사용해 마크다운을 HTML로 변환하여 화면에 보여줍니다.