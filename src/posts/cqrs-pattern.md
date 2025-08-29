---
title: "CQRS 패턴을 실무에 적용하면서 배운 것들"
date: "2025-07-22"
author: "kianpas"
summary: "복잡한 주문 시스템을 개발하면서 CQRS 패턴을 도입했던 경험과 그 과정에서 배운 것들을 공유합니다."
tags: ["CQRS", "Spring", "Java", "Architecture"]
category: "backend"
---

## 왜 CQRS를 고민하게 되었을까?

최근 프로젝트 처음에는 단순한 CRUD로 시작했는데, 생각보다 프로젝트가 점점 복잡해지면서 좀 더 나은 구조가 있지 않을까 생각하게 되었다.

하나의 Service 클래스에 모든 로직을 넣다 보니 코드가 점점 복잡해졌고, 이해하기 어려워 졌다.

그때 여러 방안을 찾아보던 중 찾은 것이 CQRS(Command Query Responsibility Segregation) 패턴이었다.

## CQRS가 뭔지 간단히 설명하면

CQRS는 쉽게 말해서 "쓰기"와 "읽기"를 완전히 분리하는 패턴이다. 기존에 하나의 Service에서 모든 걸 처리했다면, 이제는 역할을 나누는 거다.

**기존 방식 (처음에 했던 방식):**

```java
@Service
public class OrderService {
    public void createOrder(Order order) { ... }  // 주문 생성
    public Order getOrder(Long id) { ... }        // 주문 조회
    public List<Order> getOrders() { ... }        // 주문 목록
    public OrderStatistics getStatistics() { ... } // 통계 (이게 문제였다)
}
```

**CQRS 적용 후:**

```java
// 명령 (쓰기) - 주문 생성, 수정, 삭제만 담당
@Service
public class OrderCommandService {
    public void createOrder(CreateOrderCommand command) { ... }
    public void updateOrderStatus(UpdateOrderCommand command) { ... }
}

// 조회 (읽기) - 화면에 보여줄 데이터만 담당
@Service
public class OrderQueryService {
    public OrderDetailView getOrderDetail(Long id) { ... }
    public List<OrderListView> getOrderList(OrderSearchCriteria criteria) { ... }
    public OrderStatistics getStatistics() { ... }
}
```

처음에는 "이게 꼭 필요한가?" 싶었는데, 막상 적용해보니 코드가 훨씬 깔끔해졌다.

## 언제 써야 할까? (실제 경험 기준)

프로젝트에서 CQRS를 도입하게 된 이유들을 정리해보면:

### 1. 조회 화면이 복잡해질 때

관리자 대시보드에서 요구한 화면들이 정말 복잡했다. 주문 데이터 하나를 보여주는데도 고객 정보, 상품 정보, 배송 정보, 결제 정보를 모두 조인해야 했다.

### 2. 성능이 문제가 될 때

주문 생성은 빨라야 하는데, 복잡한 조회 쿼리 때문에 전체적으로 느려지는 상황이 우려 되었다. 

### 3. 비즈니스 로직이 복잡할 때

로직이 점점 복잡해졌다. 각 단계마다 다른 시스템과 연동해야 했다. 이런 로직과 단순한 조회 로직이 한 클래스에 있으니 코드가 너무 보기 어려웠다.

## 실제로 적용해보니 어땠을까?

### 좋았던 점들

**1. 깔끔해진 코드**
Command Service에는 비즈니스 로직만, Query Service에는 조회 로직만 있으니 각각의 역할이 명확해졌다. 새로운 팀원이 와도 "아, 주문 생성 로직은 여기, 조회는 저기구나" 하고 바로 이해할 수 있었다.

**2. 성능 최적화 대비**
실제 기존 대비 성능은 느낄 수 없었다. 소규모 프로젝트이기 때문이다. 하지만 서비스 분리로 언제든 조회 성능을 최적화하는데 대비할 수 있었다. 


### 아쉬웠던 점들

**1. 처음에는 확실히 복잡**
코드량이 늘어나는 건 사실이다. 간단한 CRUD도 Command와 Query로 나누다 보니 파일 개수가 두 배가 되었다. 처음에는 "이게 꼭 필요한가?" 싶은 생각이 들었다.

**2. 적응 시간**
기존에 하나의 Service에 익숙했던 사람으로 새로운 패턴에 적응하는 데 시간이 걸렸다. 특히 "이건 Command인가 Query인가?" 하는 판단을 내리는 게 처음에는 어려웠다.

## 마무리하며

현재 주로 하는 개인 프로젝트들은 굳이 CQRS 패턴을 도입할만큼의 프로젝트는 아닐 수도 있지만
학습 차원에서 CQRS 구조를 도입했다.

실제, 보다 복잡한 프로젝트에 참여하게 된다면, 이 기회가 추후에 도움이 되지 않을까 한다.


