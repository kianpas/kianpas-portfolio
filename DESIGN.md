# DESIGN.md

이 사이트가 **실제로 사용하는** 디자인 시스템입니다. 새 화면을 만들거나 기존 화면을 고칠 때
여기 적힌 규칙을 따르고, 새 값을 발명하기 전에 `tailwind.config.ts`와 `src/app/globals.css`를
먼저 확인하세요.

## 방향

콘텐츠 중심의 **에디토리얼 기술 블로그**. 개인 홍보용 히어로 섹션 대신 글이 첫 화면에 오고,
꾸준히 관리되는 기록물이라는 인상을 목표로 합니다.

- 카드보다 **단일 컬럼 + 헤어라인 구분선**. 그림자와 떠오르는(hover lift) 효과는 쓰지 않습니다.
- 여백과 타이포그래피로 위계를 만듭니다. 배경색 블록으로 나누지 않습니다.
- 장식보다 가독성. 무거운 애니메이션, 글래스모피즘, 과한 그라데이션은 피합니다.

## 색

Tailwind 기본 팔레트만 씁니다. 커스텀 색 토큰은 없습니다.

| 용도 | 라이트 | 다크 |
|---|---|---|
| 액센트 (링크 hover, 아이브로우, 활성 표시) | `orange-600` | `orange-400` |
| 제목 | `gray-950` / `gray-900` | `white` |
| 본문 | `gray-600` / `gray-700` | `gray-300` |
| 보조 텍스트·메타 | `gray-500` | `gray-400` |
| 구분선 | `gray-200` | `gray-700` |
| 배경 | `white` | `gray-900` |

- **액센트는 오렌지 하나뿐입니다.** 파랑·초록 등 두 번째 유채색을 도입하지 마세요.
- 오렌지는 아이브로우 라벨, hover 상태, 활성 내비 표시, 본문 링크에만 씁니다.
  큰 면적의 배경으로 쓰지 않습니다.
- `globals.css`의 `--ds-*` 변수는 구세대 잔재이며 현재 화면에서는 쓰지 않습니다.

## 타이포그래피

- 본문 서체: **Pretendard** (`globals.css`에서 로드), 폴백 Geist Sans.
- 모노 서체: **Geist Mono** (`--font-geist-mono`). 날짜·읽기 시간·태그·아이브로우에 씁니다.
- 페이지 제목: `text-3xl sm:text-4xl font-bold tracking-tight`
- 글 상세 제목: `text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight`
- 아이브로우(섹션 라벨): `font-mono text-xs font-semibold uppercase tracking-[0.2em]` + 오렌지
- 본문 마크다운: `ArticleBody` 컴포넌트가 담당. prose 클래스를 각 페이지에 복사하지 마세요.

## 레이아웃

모든 페이지가 같은 규격을 공유합니다. 직접 클래스를 반복하지 말고 컴포넌트를 쓰세요.

- 페이지 래퍼: `PageContainer` — `min-h-screen` + `mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20`
- 글/프로젝트 본문 바깥 컬럼: `max-w-4xl mx-auto`. `ArticleBody`의 일반 콘텐츠는 48rem으로 좁히고, 코드 블록과 표는 바깥 컬럼 너비를 유지합니다.
- 인라인 코드는 라이트/다크 모드에 맞는 중립 회색 글자·배경으로 구분합니다. 코드 블록에는 인라인 배경과 패딩을 적용하지 않습니다.
- 본문 이미지에는 그림자·hover 확대를 쓰지 않고, 인용문은 배경 없이 얇은 회색 세로선으로 표시합니다.
- 글 목록 카테고리는 `text-xs tracking-normal`로 표시합니다.
- 목록 메타 컬럼: `md:grid-cols-[11rem_1fr]` (왼쪽 모노 메타, 오른쪽 내용)
- 헤더 높이: 64px 고정 (`h-16`), 본문은 `mt-16`으로 밀림
- 홈은 `py-10 sm:py-12`로 상단 여백을 줄이고, 최신 글 아래 글·프로젝트의 데스크톱 2열 구성을 유지합니다.
- 홈 로고는 `kianpas`. 최신 글의 대형 강조는 홈에서만 사용하고 블로그 목록은 동일한 `PostRow` 행으로 표시합니다.
- 블로그 목록과 카테고리 페이지는 `CategoryNav`로 기존 카테고리 URL을 연결합니다. 활성 주제는 오렌지 글자와 밑줄로 구분합니다.

## 공통 컴포넌트

새로 만들기 전에 이미 있는지 확인하세요.

| 컴포넌트 | 용도 |
|---|---|
| `layout/PageContainer` | 모든 페이지의 바깥 래퍼 |
| `layout/PageHeader` | 아이브로우 + 제목 + 설명 + 헤어라인 |
| `ArticleBody` | 마크다운 본문 prose 블록 (글·프로젝트 공용) |
| `PostRow` | 글 목록 행 — `featured` / `row` / `compact` |
| `TagList` | `#태그` 나열 (`href` 주면 링크, 없으면 평문) |
| `ArrowLink` | 화살표 텍스트 링크 (`forward` / `back`) |
| `LoadMoreButton` + `hooks/useLoadMore` | 목록 더보기 |
| `utils/date` | `formatDate` / `formatProjectPeriod` |

`components/ui`의 `Card`·`Badge`·`Button`·`Input`은 구세대 카드 UI의 잔재로,
현재는 `/design-system` 데모 페이지에서만 씁니다. **새 화면에 쓰지 마세요.**

## 반응형

- 모바일 우선. 본문 타이포는 `prose md:prose-lg`로 데스크톱에서 커집니다.
- 내비게이션은 `md` 미만에서 전체화면 오버레이로 전환됩니다.
- 오버레이는 반드시 `<header>` **바깥**에 두세요 — 헤더에 `backdrop-blur`가 걸려 있어
  안에 두면 `fixed` 기준이 헤더가 되어 메뉴가 잘립니다.

## 다크 모드

`next-themes` + Tailwind `darkMode: "class"`. 모든 색 클래스에 `dark:` 짝을 반드시 붙이세요.
