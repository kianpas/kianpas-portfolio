---
title: "Next.js 15 & React 19 API 구조 및 데이터 페칭 전략 가이드"
date: "2025-08-28"
author: "이운산"
summary: "Next.js App Router에서 API 클라이언트를 어떻게 구조화하고, 서버·클라이언트 컴포넌트별로 데이터 페칭 전략을 나눴는지 정리한 가이드입니다."
tags: ["Next.js", "React"]
category: "frontend"
---

## 📋 목차

1. [API 구조 개요](#api-구조-개요)
2. [서버/클라이언트 API 분리](#서버클라이언트-api-분리)
3. [3가지 데이터 페칭 시나리오](#3가지-데이터-페칭-시나리오)
4. [실시간 데이터 갱신 전략](#실시간-데이터-갱신-전략)
5. [실제 구현 가이드라인](#실제-구현-가이드라인)

---

## API 구조 개요

### 🏗️ 전체 구조

```text
frontend/src/lib/api/
├── client.ts          # HTTP 요청 공통 처리기
├── index.ts           # 중앙 집중식 내보내기 (Barrel Pattern)
├── auth.ts            # 인증 관련 API
├── user.ts            # 사용자 관련 API
├── contact.ts         # 문의 관련 API
├── faq.ts             # FAQ 관련 API
└── reservation.ts     # 예약 관련 API
```

### 🔧 각 파일의 역할

#### `client.ts` - HTTP 요청의 핵심 엔진

- **역할**: `fetch()` API의 개선된 래퍼
- **기능**:
  - 공통 헤더 자동 추가
  - 에러 처리 통일
  - 세션 쿠키 자동 포함
  - URL 자동 조합

```typescript
// 기본 fetch() 사용 시
const response = await fetch('http://localhost:8080/api/v1/users', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include'
});
const data = await response.json();

// client.ts 사용 시
const data = await apiClient.get('/api/v1/users');
```

#### `index.ts` - 중앙 집중식 관리

- **역할**: 모든 API와 타입의 단일 진입점 (Barrel Pattern)
- **장점**:
  - import 경로 단순화
  - 코드 구조 정리
  - Tree Shaking 최적화

```typescript
// index.ts 없다면
import { authAPI } from '@/lib/api/auth';
import { userAPI } from '@/lib/api/user';
import { ContactForm } from '@/types/contact';

// index.ts 있으면
import { authAPI, userAPI, ContactForm } from '@/lib/api';
```

---

## 서버/클라이언트 API 분리

### 🎯 분리 기준

- **서버 컴포넌트** → **서버 API** (`serverApiClient`)
- **클라이언트 컴포넌트** (`'use client'`) → **클라이언트 API** (`apiClient`)

### 🔍 기술적 차이점

| 구분 | 서버 API | 클라이언트 API |
|------|----------|----------------|
| **실행 환경** | Next.js 서버 | 브라우저 |
| **실행 시점** | 빌드/요청 시 | 사용자 상호작용 시 |
| **쿠키 처리** | 없음 | `credentials: 'include'` |
| **에러 처리** | 로깅 중심 | 사용자 친화적 |
| **캐싱** | Next.js 캐싱 | 브라우저 캐시 |

### 💡 분리 이유

1. **확장성**: 미래에 다른 서버/인증 방식 대응
2. **최적화**: 각 환경에 맞는 최적화
3. **유지보수성**: 각각의 특성에 맞는 처리

### 🔄 실행 흐름 비교

**클라이언트에서 요청할 때:**

```text
브라우저 → (쿠키 포함) → 백엔드 서버
```

**서버에서 요청할 때:**

```text
Next.js 서버 → (쿠키 없음) → 백엔드 서버
```

---

## 3가지 데이터 페칭 시나리오

### 📊 시나리오 비교표

| 시나리오 | 초기 로딩 | 데이터 갱신 | 장점 | 단점 | 적합한 용도 |
|----------|-----------|-------------|------|------|-------------|
| **1. 서버 중심** | 서버 API | 새로고침 | 빠른 초기 로딩, SEO 좋음 | 깜빡임, 느린 갱신 | 정적 페이지, 블로그 |
| **2. 하이브리드** | 서버 API | 클라이언트 API | 빠른 초기 + 부드러운 갱신 | 복잡한 구조 | 상품 목록, 예약 시스템 |
| **3. 클라이언트 중심** | 클라이언트 API | 클라이언트 API | 부드러운 UX, 구조 단순 | 느린 초기, SEO 안 좋음 | 관리자 페이지, 대시보드 |

### 🔄 시나리오 1: 서버 중심 (전통적 방식)

**특징**: 새로고침으로만 갱신

```typescript
// app/seats/page.tsx (서버 컴포넌트)
import { serverSeatAPI } from '@/lib/api';

export default async function SeatsPage() {
  // 🖥️ 서버에서 좌석 정보 조회
  const seats = await serverSeatAPI.getSeats();
  
  return (
    <div>
      <h1>좌석 현황</h1>
      {seats.map(seat => (
        <div key={seat.id}>
          {seat.name} - {seat.status}
        </div>
      ))}
      
      {/* 새로고침 버튼 */}
      <button onClick={() => window.location.reload()}>
        새로고침
      </button>
    </div>
  );
}
```

**장점**: 간단함, SEO 좋음  
**단점**: 새로고침 시 깜빡임, 느림

### 🔄 시나리오 2: 하이브리드 (권장 방식)

**특징**: 초기는 서버, 갱신은 클라이언트

```typescript
// app/seats/page.tsx (서버 컴포넌트)
import { serverSeatAPI } from '@/lib/api';
import SeatList from './SeatList';

export default async function SeatsPage() {
  // 🖥️ 서버에서 초기 좌석 정보 조회
  const initialSeats = await serverSeatAPI.getSeats();
  
  return (
    <div>
      <h1>좌석 현황</h1>
      {/* 클라이언트 컴포넌트에 초기 데이터 전달 */}
      <SeatList initialSeats={initialSeats} />
    </div>
  );
}

// components/SeatList.tsx (클라이언트 컴포넌트)
'use client';
import { useState } from 'react';
import { seatAPI } from '@/lib/api';

export default function SeatList({ initialSeats }) {
  const [seats, setSeats] = useState(initialSeats);
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    // 💻 클라이언트에서 갱신된 정보 조회
    const updatedSeats = await seatAPI.getSeats();
    setSeats(updatedSeats);
    setLoading(false);
  };

  return (
    <div>
      {seats.map(seat => (
        <div key={seat.id}>
          {seat.name} - {seat.status}
        </div>
      ))}
      
      <button onClick={handleRefresh} disabled={loading}>
        {loading ? '갱신 중...' : '정보 갱신'}
      </button>
    </div>
  );
}
```

**장점**: 빠른 초기 로딩 + 부드러운 갱신  
**단점**: 구조가 복잡함

### 🔄 시나리오 3: 클라이언트 중심

**특징**: 모든 것을 클라이언트에서 처리

```typescript
// app/seats/page.tsx (클라이언트 컴포넌트)
'use client';
import { useState, useEffect } from 'react';
import { seatAPI } from '@/lib/api';

export default function SeatsPage() {
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  // 💻 페이지 로드 시 클라이언트에서 조회
  useEffect(() => {
    loadSeats();
  }, []);

  const loadSeats = async () => {
    setLoading(true);
    const seats = await seatAPI.getSeats();
    setSeats(seats);
    setLoading(false);
  };

  const handleRefresh = () => {
    // 💻 갱신도 클라이언트에서
    loadSeats();
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      <h1>좌석 현황</h1>
      {seats.map(seat => (
        <div key={seat.id}>
          {seat.name} - {seat.status}
        </div>
      ))}
      
      <button onClick={handleRefresh}>
        정보 갱신
      </button>
    </div>
  );
}
```

**장점**: 구조 단순, 상호작용 부드러움  
**단점**: 초기 로딩 느림, SEO 안 좋음

### 🔍 로딩 시퀀스 비교

**🖥️ 서버 컴포넌트 로딩:**

```text
1. 사용자가 /seats 접속
2. 서버에서 DB 조회 → 좌석 데이터 획득
3. HTML 생성 (데이터 포함)
4. 브라우저에 완성된 HTML 전송
5. 즉시 좌석 목록 표시 ✨
```

**💻 클라이언트 컴포넌트 로딩:**

```text
1. 사용자가 /seats 접속
2. 빈 HTML + JavaScript 전송
3. JavaScript 실행
4. API 호출 → 로딩 스피너 표시
5. 데이터 수신 후 UI 업데이트 ✨
```

---

## 실시간 데이터 갱신 전략

### 🔄 갱신 방식별 특징

#### 1. 사용자 행동 기반 자동 갱신 (예약 시스템)

```typescript
'use client';
export default function SeatSelector({ initialSeats }) {
  const [seats, setSeats] = useState(initialSeats);
  const [selectedDate, setSelectedDate] = useState('');

  // 날짜 변경 시 자동으로 해당 날짜 좌석 상태 조회
  useEffect(() => {
    if (selectedDate) {
      // 💻 클라이언트에서 날짜별 좌석 상태 조회
      seatAPI.getSeatsByDate(selectedDate).then(setSeats);
    }
  }, [selectedDate]);

  // 시간 변경 시 자동으로 해당 시간 좌석 상태 조회
  const handleTimeChange = async (time) => {
    const updatedSeats = await seatAPI.getSeatsByDateTime(selectedDate, time);
    setSeats(updatedSeats);
  };

  // 단계별 유효성 검증
  const handleNextStep = async () => {
    const isAvailable = await seatAPI.checkSeatAvailability({
      seatId: selectedSeat.id,
      date: selectedDate,
      time: selectedTime
    });

    if (!isAvailable) {
      alert('선택한 좌석이 이미 예약되었습니다. 다시 선택해주세요.');
      refreshSeats();
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  return (
    <div>
      <input 
        type="date" 
        onChange={(e) => setSelectedDate(e.target.value)} 
      />
      {seats.map(seat => (
        <button key={seat.id} onClick={() => handleTimeChange(seat.time)}>
          {seat.name}
        </button>
      ))}
    </div>
  );
}
```

#### 2. 주기적 폴링 (관리자 대시보드)

```typescript
'use client';
export default function AdminDashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    // 30초마다 자동 갱신
    const interval = setInterval(async () => {
      const newStats = await dashboardAPI.getRealtimeStats();
      setStats(newStats);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div>현재 예약: {stats.currentReservations}</div>
      <div>실시간 사용자: {stats.activeUsers}</div>
    </div>
  );
}
```

#### 3. 수동 갱신 버튼

```typescript
const [lastUpdated, setLastUpdated] = useState(new Date());

const handleRefresh = async () => {
  const newStats = await dashboardAPI.getRealtimeStats();
  setStats(newStats);
  setLastUpdated(new Date());
};

return (
  <div>
    <button onClick={handleRefresh}>
      새로고침 (마지막 업데이트: {lastUpdated.toLocaleTimeString()})
    </button>
    <div>현재 예약: {stats.currentReservations}</div>
  </div>
);
```

#### 4. WebSocket (고급)

```typescript
useEffect(() => {
  const ws = new WebSocket('ws://localhost:8080/dashboard');
  
  ws.onmessage = (event) => {
    const newStats = JSON.parse(event.data);
    setStats(newStats);
  };

  return () => ws.close();
}, []);
```

### 📋 갱신 전략 선택 가이드

| 용도 | 권장 방식 | 갱신 주기 | 예시 |
|------|-----------|-----------|------|
| **예약 시스템** | 사용자 행동 기반 + 단계별 검증 | 즉시 | 날짜/시간 선택 시 |
| **관리자 대시보드** | 주기적 폴링 + 수동 버튼 | 30초~1분 | 통계, 현황 모니터링 |
| **실시간 채팅** | WebSocket | 즉시 | 메시지, 알림 |
| **정적 콘텐츠** | 수동 갱신만 | 필요시 | FAQ, 공지사항 |

---

## 실제 구현 가이드라인

### 🎯 페이지 타입별 권장 전략

#### 📄 정적 콘텐츠 페이지

- **전략**: 시나리오 1 (서버 중심)
- **예시**: 회사 소개, FAQ, 가격표
- **구현**: 서버 컴포넌트 + 서버 API

```typescript
// app/faq/page.tsx
export default async function FaqPage() {
  const faqs = await serverFaqAPI.getFaqs();
  
  return (
    <div>
      <h1>자주 묻는 질문</h1>
      {faqs.map(faq => (
        <div key={faq.id}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}
```

#### 🛒 상품/예약 페이지

- **전략**: 시나리오 2 (하이브리드)
- **예시**: 상품 목록, 예약 시스템, 블로그
- **구현**: 서버 초기 로딩 + 클라이언트 상호작용

```typescript
// app/products/page.tsx
export default async function ProductsPage() {
  const initialProducts = await serverProductAPI.getProducts();
  
  return (
    <div>
      <h1>상품 목록</h1>
      {/* 서버에서 렌더링된 초기 상품들 */}
      <ProductGrid initialProducts={initialProducts} />
      
      {/* 클라이언트에서 처리되는 필터/검색 */}
      <ProductFilters />
    </div>
  );
}
```

#### 📊 관리자/대시보드

- **전략**: 시나리오 3 (클라이언트 중심)
- **예시**: 관리자 패널, 실시간 모니터링
- **구현**: 클라이언트 컴포넌트 + 주기적 갱신

```typescript
// app/admin/dashboard/page.tsx
'use client';
export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  
  useEffect(() => {
    // 초기 로드
    dashboardAPI.getStats().then(setStats);
    
    // 주기적 갱신
    const interval = setInterval(() => {
      dashboardAPI.getStats().then(setStats);
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div>
      <h1>관리자 대시보드</h1>
      <div>총 사용자: {stats.totalUsers}</div>
      <div>활성 세션: {stats.activeSessions}</div>
    </div>
  );
}
```

### 🔧 구현 체크리스트

#### ✅ API 구조 설정

- [ ] `client.ts`에 공통 HTTP 로직 구현
- [ ] 도메인별 API 파일 분리
- [ ] `index.ts`에 Barrel Pattern 적용
- [ ] 서버/클라이언트 API 분리

#### ✅ 컴포넌트 설계

- [ ] 서버 컴포넌트는 `async/await` 사용
- [ ] 클라이언트 컴포넌트는 `'use client'` 명시
- [ ] 초기 데이터를 props로 전달
- [ ] 상태 관리는 클라이언트에서만

#### ✅ 데이터 갱신 전략

- [ ] 사용자 행동에 따른 자동 갱신
- [ ] 단계별 유효성 검증
- [ ] 적절한 로딩 상태 표시
- [ ] 에러 처리 및 사용자 피드백

### 🚀 성능 최적화 팁

#### 1. 초기 로딩 최적화

- 서버 컴포넌트로 중요 데이터 미리 로드
- 스켈레톤 UI로 로딩 상태 개선

```typescript
// loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  );
}
```

#### 2. 네트워크 최적화

- 필요한 데이터만 요청
- 중복 요청 방지 (debounce, throttle)
- 적절한 캐싱 전략

```typescript
// debounce 예시
const debouncedSearch = useMemo(
  () => debounce(async (query) => {
    const results = await searchAPI.search(query);
    setResults(results);
  }, 300),
  []
);
```

#### 3. 사용자 경험 개선

- 낙관적 업데이트 (Optimistic Update)
- 에러 발생 시 롤백 처리
- 적절한 피드백 메시지

```typescript
const handleLike = async (postId) => {
  // 낙관적 업데이트
  setLiked(true);
  setLikeCount(prev => prev + 1);
  
  try {
    await postAPI.like(postId);
  } catch (error) {
    // 실패 시 롤백
    setLiked(false);
    setLikeCount(prev => prev - 1);
    alert('좋아요 처리에 실패했습니다.');
  }
};
```

---

## 📚 학습 요약

### 🎯 핵심 개념

1. **API 구조**: client.ts (공통 처리) + index.ts (중앙 관리) + 도메인별 분리
2. **서버/클라이언트 분리**: 실행 환경과 목적에 따른 최적화
3. **3가지 시나리오**: 서버 중심 vs 하이브리드 vs 클라이언트 중심
4. **갱신 전략**: 사용자 행동 기반, 주기적 폴링, 수동 갱신, WebSocket

### 🔑 선택 기준

- **SEO 중요** → 서버 API 우선
- **상호작용 중요** → 클라이언트 API 우선
- **복합적 요구사항** → 하이브리드 접근

### 💡 실무 팁

- 처음에는 간단하게 시작 (클라이언트 중심)
- 필요에 따라 점진적으로 서버 API 추가
- 사용자 경험과 성능의 균형점 찾기
- 적절한 갱신 전략으로 실시간성 확보

### 🔄 점진적 개선 로드맵

#### 1단계: 기본 구조 (클라이언트 중심)

```typescript
'use client';
export default function MyPage() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    api.getData().then(setData);
  }, []);
  
  return <div>{/* 렌더링 */}</div>;
}
```

#### 2단계: SEO 최적화 (하이브리드)

```typescript
// 서버에서 초기 데이터
export default async function MyPage() {
  const initialData = await serverAPI.getData();
  
  return (
    <div>
      <StaticContent data={initialData} />
      <DynamicContent />
    </div>
  );
}
```

#### 3단계: 성능 최적화 (캐싱, 실시간 갱신)

```typescript
// 캐싱 + 실시간 갱신
export default function MyPage() {
  const { data, mutate } = useSWR('/api/data', fetcher);
  
  useEffect(() => {
    const ws = new WebSocket('/ws');
    ws.onmessage = () => mutate(); // 실시간 갱신
    return () => ws.close();
  }, [mutate]);
  
  return <div>{/* 렌더링 */}</div>;
}
```

---

## 🎉 마무리

**기억할 점:**

- 완벽한 구조보다는 **점진적 개선**이 중요
- 사용자 경험과 개발 편의성의 **균형점** 찾기
- 프로젝트 규모와 요구사항에 맞는 **적절한 선택**
