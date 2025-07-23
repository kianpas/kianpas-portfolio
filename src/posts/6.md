---
title: "CQRS 패턴"
date: "2025-07-22"
author: "kianpas"
summary: "CQRS 패턴의 기본 개념과 언제 사용하면 좋은지, 그리고 간단한 구현 방법을 정리했습니다."
tags: ["CQRS", "Spring", "Java", "Architecture"]
category: "backend"
---

## CQRS란?

CQRS(Command Query Responsibility Segregation)는 명령(쓰기)과 조회(읽기)의 책임을 분리하는 패턴이다. 기존에는 하나의 모델로 읽기와 쓰기를 모두 처리했다면, CQRS는 이를 완전히 분리한다.

### 기본 개념

**전통적인 방식:**
```java
@Service
public class OrderService {
    public void createOrder(Order order) { ... }  // 쓰기
    public Order getOrder(Long id) { ... }        // 읽기
    public List<Order> getOrders() { ... }        // 읽기
}
```

**CQRS 방식:**
```java
// 명령 (쓰기) 전용
@Service
public class OrderCommandService {
    public void createOrder(CreateOrderCommand command) { ... }
    public void updateOrder(UpdateOrderCommand command) { ... }
}

// 조회 (읽기) 전용
@Service
public class OrderQueryService {
    public OrderView getOrder(Long id) { ... }
    public List<OrderListView> getOrders() { ... }
}

```

### 언제 사용하면 좋을까?

1. 읽기와 쓰기 요구사항이 다를 때
    - 복잡한 조회 화면이 많은 경우
    - 성능 최적화가 필요한 경우
2.  도메인이 복잡할 때
    - 비즈니스 로직이 복잡한 경우
3. 확장성이 중요할 때
    - 읽기와 쓰기 부하가 다른 경우
    - 독립적인 스케일링이 필요한 경우

### 장점
1. **성능 최적화** : 읽기와 쓰기를 각각 최적화 가능
2. **복잡성 분리** : 조회 로직과 비즈니스 로직 분리
3. **확장성** : 읽기와 쓰기를 독립적으로 스케일링

### 단점
1. **복잡성 증가** : 코드량이 늘어나고 구조가 복잡해짐
2. **데이터 일관성** : 읽기와 쓰기 모델 간 동기화 필요
3. **러닝 커브** : 팀원들이 패턴에 익숙해져야 함

### 결론
CQRS는 복잡한 도메인이나 성능이 중요한 시스템에서 유용하다. 하지만 단순한 CRUD 애플리케이션에서는 오히려 복잡성만 증가시킬 수 있다. 프로젝트의 요구사항을 잘 분석해서 필요한 경우에만 적용하는 것이 중요하다.

처음에는 간단한 명령-조회 분리부터 시작해서, 필요에 따라 점진적으로 확장하는 것을 추천한다.