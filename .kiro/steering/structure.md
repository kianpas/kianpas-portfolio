# 프로젝트 구조

## 루트 디렉토리
```
├── .kiro/              # Kiro AI 어시스턴트 설정
├── .next/              # Next.js 빌드 결과물
├── node_modules/       # 의존성 패키지
├── public/             # 정적 자산
├── src/                # 소스 코드
├── package.json        # 프로젝트 설정
├── next.config.ts      # Next.js 설정
├── tailwind.config.ts  # Tailwind CSS 설정
└── tsconfig.json       # TypeScript 설정
```

## 소스 코드 구조 (`/src`)

### App Router 구조 (`/src/app`)
- **App Router**: Next.js 13+ 파일 기반 라우팅
- **Layout**: 전역 스타일과 네비게이션이 포함된 루트 레이아웃
- **Pages**: 경로별 페이지 컴포넌트
- **API Routes**: `/api` 폴더의 서버사이드 API 엔드포인트
- **Fonts**: 로컬 폰트 파일 (Geist Sans/Mono)

### 컴포넌트 아키텍처 (`/src/components`)

#### 전역 컴포넌트 구조
- **전역 공유 컴포넌트**: 여러 페이지에서 사용되는 컴포넌트
- **UI 컴포넌트**: `src/components/ui`에 위치한 재사용 가능한 디자인 시스템 컴포넌트
  - `ui/Button.tsx` - 버튼 컴포넌트 (primary, secondary, ghost, danger 변형)
  - `ui/Badge.tsx` - 배지 컴포넌트 (default, success, warning, error, info 변형)
  - `ui/Card.tsx` - 카드 컴포넌트 (default, elevated, outlined 변형)
  - `ui/Input.tsx` - 입력 컴포넌트
- **기능 컴포넌트**: 특정 기능을 담당하는 컴포넌트
  - `SearchBar.tsx` - 검색 기능
  - `ReadingProgress.tsx` - 읽기 진행률 표시
  - `RelatedPosts.tsx` - 관련 포스트 표시
- **네이밍 규칙**: PascalCase 디렉토리와 파일명

#### 페이지별 컴포넌트 구조 (Co-location 패턴)
- **페이지 특화 컴포넌트**: 특정 경로에서만 사용되는 컴포넌트는 해당 경로 폴더 내에 위치
```
src/app/
├── blog/
│   ├── page/[page]/page.tsx     # 블로그 목록 페이지 (페이지네이션)
│   ├── post/[id]/page.tsx       # 개별 블로그 포스트 페이지
│   └── components/              # 블로그 전용 컴포넌트
│       ├── PostCard.tsx         # 블로그 포스트 카드 (UI 컴포넌트 활용)
│       ├── PostList.tsx         # 블로그 포스트 목록
│       └── PostPagination.tsx   # 페이지네이션
├── projects/
│   ├── page.tsx
│   └── components/              # 프로젝트 전용 컴포넌트
│       ├── ProjectCard.tsx
│       └── ProjectList.tsx
```

### 데이터 레이어 (`/src/data`)
- **메타데이터**: 사이트 전반의 설정과 상수
- **정적 데이터**: 콘텐츠가 아닌 설정 파일들

### 콘텐츠 관리 (`/src/posts` & `/src/projects`)
- **파일 기반 CMS**: 프론트매터가 포함된 마크다운 파일
- **네이밍**: 숫자 ID (1.md, 2.md 등)
- **프론트매터 구조**:
  - Posts: title, date, author, summary, tags, category
  - Projects: title, description, imageUrl, projectUrl, tags

### 서비스 레이어 (`/src/services`)
- **데이터 페칭**: 중앙화된 콘텐츠 처리
- **파일 처리**: 마크다운 파싱과 HTML 변환
- **비즈니스 로직**: 페이지네이션, 필터링, 정렬
- **함수**: 데이터 변환을 위한 순수 함수

### 타입 정의 (`/src/types`)
- **인터페이스 정의**: 모든 데이터 구조를 위한 TypeScript 인터페이스
- **관심사 분리**: 주요 엔티티 타입별로 하나의 파일
- **네이밍**: 단수 명사 (post.ts, project.ts)

## 규칙

### 파일 네이밍
- **컴포넌트**: PascalCase (Navbar.tsx)
- **페이지**: 소문자 (page.tsx, layout.tsx)
- **서비스**: camelCase (posts.ts)
- **타입**: 소문자 (post.ts)

### 임포트 패턴
- **경로 별칭**: src 임포트에 `@/*` 사용
- **절대 임포트**: 상대 임포트보다 절대 임포트 선호
- **타입 임포트**: TypeScript 타입에 `import type` 사용

### 컴포넌트 패턴
- **서버 컴포넌트**: 데이터 페칭을 위한 기본값
- **클라이언트 컴포넌트**: 상호작용을 위한 명시적 "use client" 지시어
- **Props 인터페이스**: 컴포넌트 props를 위한 인터페이스 정의
- **기본 내보내기**: 컴포넌트에 기본 내보내기 사용

## 컴포넌트 배치 가이드라인

### 전역 컴포넌트 (`/src/components`)
- 여러 페이지/경로에서 사용되는 컴포넌트
- UI 라이브러리 성격의 재사용 가능한 컴포넌트
- 레이아웃 관련 컴포넌트

### 페이지별 컴포넌트 (`/src/app/[route]/components`)
- 특정 경로에서만 사용되는 컴포넌트
- 해당 페이지의 비즈니스 로직과 밀접한 컴포넌트
- 페이지 특화된 UI 컴포넌트