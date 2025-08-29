---
title: "헥사고날 아키텍처: 도메인 중심 설계로 유연한 시스템 구축하기"
date: "2025-07-20"
author: "kianpas"
summary: "헥사고날 아키텍처의 핵심 개념과 장단점, 그리고 실제 프로젝트에 적용 시 고려해야 할 점들을 정리했습니다."
tags: ["Architecture", "Hexagonal", "DDD", "Clean Architecture", "Spring"]
category: "backend"
---

## 헥사고날 아키텍처 개요

최근 프로젝트 개선 과정에서 헥사고날 아키텍처(Hexagonal Architecture)에 대해 알아보게 됐다. 이 아키텍처는 비즈니스 로직을 외부 의존성으로부터 분리하는 데 초점을 맞추고 있어 유지보수와 테스트가 용이한 시스템을 구축하는 데 도움이 될 것으로 보인다.

### 핵심 개념

헥사고날 아키텍처는 포트와 어댑터 패턴을 기반으로 한다. 육각형 모양에서 이름을 따왔지만, 실제로는 내부와 외부의 명확한 경계를 강조하는 구조다.

**주요 구성 요소:**

- **도메인 (내부)**: 비즈니스 로직이 위치하는 핵심 영역
- **포트**: 내부와 외부 사이의 인터페이스 정의
- **어댑터**: 포트를 구현하여 외부 시스템과 연결

```java
// 포트 (인터페이스) 예시
public interface OrderRepository {
    Order save(Order order);
    Optional<Order> findById(OrderId id);
}

// 어댑터 (구현체) 예시
@Repository
public class JpaOrderRepository implements OrderRepository {
    private final OrderJpaRepository repository;
    
    @Override
    public Order save(Order order) {
        OrderEntity entity = mapToEntity(order);
        return mapToDomain(repository.save(entity));
    }
}
```

## 장점

1. **도메인 로직 분리** : 비즈니스 로직이 프레임워크나 DB에 의존하지 않음
2. **테스트 용이성** : 단위 테스트가 외부 의존성 없이 가능
3. **유연한 인프라 교체** : DB나 외부 서비스 변경 시 도메인 코드 수정 불필요

## 단점

1. **초기 복잡성** : 작은 프로젝트에서는 과도한 구조로 느껴질 수 있음
2. **보일러플레이트 코드** : 인터페이스와 구현체 쌍으로 코드량 증가
3. **러닝 커브** : 팀원들이 패턴에 익숙해지는 데 시간 소요
