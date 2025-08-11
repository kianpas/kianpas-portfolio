# 기술 스택

## 핵심 프레임워크 및 언어
- **Next.js 15.2.0**: App Router 아키텍처를 사용하는 React 프레임워크
- **TypeScript 5**: 경로 별칭(`@/*` → `./src/*`)이 활성화된 엄격한 타이핑
- **React 19**: React DOM과 함께 사용하는 최신 React

## 스타일링 및 UI
- **Tailwind CSS 3.4**: 유틸리티 우선 CSS 프레임워크
- **@tailwindcss/typography**: 마크다운 콘텐츠를 위한 향상된 타이포그래피
- **커스텀 폰트**: CSS 변수를 사용하는 Geist Sans 및 Geist Mono
- **다크 모드**: 미디어 쿼리 기반 다크 모드 지원
- **반응형 디자인**: 컨테이너 기반 레이아웃의 모바일 우선 접근법
- **UI 컴포넌트**: `src/components/ui`에 위치한 재사용 가능한 디자인 시스템 컴포넌트

## 콘텐츠 관리
- **마크다운 처리**: 
  - `gray-matter`: 프론트매터 파싱
  - `remark` + `remark-html`: 마크다운을 HTML로 변환
- **콘텐츠 구조**: `/src/posts` 및 `/src/projects`의 마크다운 파일을 사용하는 파일 기반 CMS
- **정적 생성**: 최적의 성능을 위한 사전 렌더링된 페이지

## 개발 도구
- **ESLint**: TypeScript 지원이 포함된 Next.js 권장 설정
- **PostCSS**: CSS 처리 파이프라인
- **Turbopack**: 개발용 고속 번들러 (`--turbopack` 플래그 사용)

## 일반적인 명령어

```bash
# 개발
npm run dev          # Turbopack으로 개발 서버 시작
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버 시작
npm run lint         # ESLint 실행

# 배포
npm run export       # 정적 파일 내보내기
npm run predeploy    # 배포용 빌드 및 내보내기
```

## 아키텍처 패턴
- **App Router**: Next.js 13+ app 디렉토리 구조
- **서버 컴포넌트**: 기본 서버 사이드 렌더링
- **클라이언트 컴포넌트**: 상호작용을 위한 명시적 "use client" 지시어
- **서비스 레이어**: `/src/services`의 중앙화된 데이터 페칭
- **타입 안전성**: 모든 데이터 구조를 위한 포괄적인 TypeScript 인터페이스