---
title: "Spring Security + Next.js 세션 기반 인증 구현 이슈 해결 과정"
date: "2025-08-09"
author: "이운산"
summary: "Spring Security와 Next.js를 세션 쿠키로 연동할 때 인증 객체가 null로 반환되던 문제를, CORS·쿠키 설정과 인증 흐름을 짚어가며 해결한 과정입니다."
tags: ["Next.js", "Spring", "Java", "Login"]
category: "backend"
---

## 📋 프로젝트 환경

- **백엔드**: Spring Boot + Spring Security (포트: `8080`)
- **프론트엔드**: Next.js 15 + React 19 (포트: `3000`)
- **인증 방식**: 세션 기반 인증 (쿠키 사용)

---

## 🚨 발생한 이슈

### 문제 상황

- 로그인 API 호출은 성공하고 사용자 정보도 정상적으로 반환됨
- 하지만 **Header 컴포넌트에서 `useAuth` 훅으로 사용자 정보 불러오기 실패**
- `/api/v1/auth/me` 엔드포인트에서 \**`Authentication` 객체가 `null`*로 반환됨

---

## 🔍 초기 추정 원인

1. **React Context 문제** → 상태 공유 안 됨
2. **CORS 설정 문제** → 쿠키 전송이 안 됨
3. **프론트 상태 관리 문제** → `useAuth` 상태 업데이트 이슈

---

## 🛠 시행착오 과정

### 1단계: React Context 도입

```tsx
export function AuthProvider({ children }: AuthProviderProps) {
  // 전역 상태 관리 시도
}
```

- **결과**: 스프링 시큐리티 세션 기반에서는 필수 아님을 확인

---

### 2단계: 페이지 새로고침

```tsx
// 로그인 성공 후
window.location.href = "/";
```

- **결과**: 여전히 사용자 정보 로드 안 됨

---

### 3단계: CORS 설정 확인

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowCredentials(true);
    }
}

```

- **결과**: CORS 설정 정상

---

### 4단계: 세션 및 쿠키 추적

- 로그인 시 세션 생성 로그 확인

```java
log.debug("로그인 성공 - 세션 ID: {}", session.getId());

```

- 브라우저 쿠키 확인: `JSESSIONID` 정상 생성 및 전송

---

### 5단계: `/me` 엔드포인트 분석

```java
@GetMapping("/me")
public ResponseEntity<?> getCurrentUser(Authentication authentication, HttpServletRequest request) {
    HttpSession session = request.getSession(false);
    log.debug("/me 요청 - 세션 ID: {}", session.getId());
    log.debug("Authentication 객체: {}", authentication);
}

```

- 세션 ID는 로그인 시와 동일
- **하지만 `Authentication` 객체는 null**

---

## 💡 근본 원인 분석

- **문제 핵심**: SecurityContext가 세션에 저장되지 않거나 복원되지 않음
- **기존 방식 (폼 로그인)**: Spring Security가 자동 저장 → 정상 동작
- **현재 방식 (API 로그인)**: `fetch`를 통한 API 호출 시 **SecurityContext가 세션에 자동 저장되지 않음**

---

## ✅ 해결 방법

### 1) SecurityContextRepository 명시적 설정

```java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .securityContext(securityContext -> securityContext
            .securityContextRepository(new HttpSessionSecurityContextRepository())
        )
        .sessionManagement(session -> session
            .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            .maximumSessions(1)
            .maxSessionsPreventsLogin(false)
        );
    return http.build();
}

```

---

### 2) 로그인 시 SecurityContext 직접 저장

```java
@PostMapping("/login")
public ResponseEntity<?> login(@Valid @RequestBody LoginUserRequest request, HttpServletRequest httpRequest) {
    try {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        // SecurityContext 생성 및 저장
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(authentication);
        SecurityContextHolder.setContext(securityContext);

        // 세션에 SecurityContext 저장
        HttpSession session = httpRequest.getSession();
        session.setAttribute("SPRING_SECURITY_CONTEXT", securityContext);

        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(LoginUserResponse.from(user));
    } catch (AuthenticationException e) {
        // 에러 처리
    }
}

```

---

## 🎯 해결 후 동작 흐름

1. **로그인 요청** → SecurityContext 생성 및 세션 저장
2. **세션 쿠키 발급** → 브라우저 `JSESSIONID` 저장
3. **/me 요청 시** → 쿠키와 함께 전송
4. **SecurityContext 복원** → 세션에서 `Authentication` 복원
5. **사용자 정보 반환** → Header에서 정상적으로 표시

---

## 📌 핵심 교훈

- **API 기반 로그인**에서는 **SecurityContext를 세션에 명시적으로 저장**해야 함
- 폼 로그인과 API 로그인은 내부 동작 방식이 다름
- 문제는 CORS나 쿠키 전송이 아니라 **Spring Security의 SecurityContext 관리**에 있었음

---

## 📚 추가 고려사항

### 프로덕션 환경 설정

```yaml
server:
  servlet:
    session:
      cookie:
        secure: true # HTTPS에서만 쿠키 전송
        http-only: true # XSS 방지
        same-site: none # 다른 도메인 간 쿠키 전송 허용
      timeout: 30m # 세션 타임아웃
```

### 확장성

- 서버 확장 시 **Redis** 등을 이용한 세션 공유 필요
- 모바일 앱 지원 시 **JWT 토큰 방식** 고려

### 보안 강화

- **CSRF 토큰**
- **Rate Limiting**
- **로그인 시도 횟수 제한**
