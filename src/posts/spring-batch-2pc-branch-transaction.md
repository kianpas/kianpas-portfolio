---
title: 'Spring Batch 실무 적용기: 2PC, 분기 실행, 트랜잭션 처리까지'
date: '2025-07-17'
author: "이운산"
summary: '대용량 배치 처리와 트랜잭션 분리, 2단계 커밋 적용 등 실무에서 마주친 배치 관련 이슈를 해결한 사례.'
tags: ['Spring Batch', '2PC', 'Transactional', 'Job', 'Tasklet']
category: 'backend'
---

## 📦 대용량 배치와 트랜잭션, 실무에서는 이렇게 했습니다

### 🔁 서로 다른 DB에 데이터 업데이트할 때 2PC 적용

- **문제**: 한 Job에서 두 개의 DB에 데이터를 각각 쓰고 모두 성공해야 할 경우, 단일 트랜잭션으로는 어려움
- **해결**: JTA 기반의 2PC(2단계 커밋) 적용

### ➕ Tasklet을 나누고 상태 공유하기

- 여러 Step에서 데이터를 공유해야 할 때 `ExecutionContext`를 통해 공유

```java
stepBuilderFactory.get("stepA")
  .tasklet((contribution, chunkContext) -> {
      chunkContext.getStepContext().getStepExecution()
          .getExecutionContext().put("key", "value");
      return RepeatStatus.FINISHED;
  });
