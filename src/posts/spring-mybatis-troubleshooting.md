---
title: '실무에서 자주 마주치는 Spring과 MyBatis 트러블슈팅'
date: '2025-07-16'
author: "이운산"
summary: 'MyBatis의 foreach 처리, AES 암호화 쿼리, 다중 리스트 파라미터 처리 등 실무에서 자주 겪은 문제와 해결 방법을 정리했습니다.'
tags: ['Spring', 'MyBatis', 'SQL', 'AES', 'foreach']
category: 'backend'
---

## 💥 실무에서 마주한 MyBatis와 Spring의 이슈들

### 🔄 다중 리스트를 MyBatis foreach로 처리할 수 없는 문제

- **문제**: 두 개 이상의 리스트를 `<foreach>`로 동시에 처리하고 싶었지만 MyBatis는 이를 지원하지 않음.
- **해결 방법**:  
  - `Map<String, Object>`로 리스트들을 묶어 하나의 파라미터로 넘김.
  - 혹은 하나의 `VO` 안에 리스트들을 포함시켜 처리.

### 🔐 AES 암호화된 컬럼 비교 쿼리 문제

- **문제**: `aes_decrypt(unhex(column), key)`로 복호화한 값을 `WHERE` 조건에 쓰면 성능 저하 발생.
- **해결 방법**:  
  - 가능하다면 복호화 없이 비교 가능한 값(`salt` 또는 해시값)을 별도 컬럼에 저장  
  - 어쩔 수 없는 경우 `CAST(...) AS CHAR`로 정확히 문자열 비교

```sql
WHERE CAST(aes_decrypt(unhex(encrypted_column), #{key}) AS CHAR(50)) = #{value}
