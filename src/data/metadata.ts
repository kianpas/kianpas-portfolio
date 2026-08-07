/**
 * 사이트의 정식 주소. next-sitemap(`next-sitemap.config.js`)과 같은 환경변수를 읽어
 * 사이트맵과 메타데이터의 도메인이 어긋나지 않게 한다. 끝의 슬래시는 제거한다.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://kianpas-portfolio.vercel.app'
).replace(/\/+$/, '');

export const siteMetadata = {
  author: '이운산',
  occupation: '백엔드 개발자',
  github: 'https://github.com/kianpas',
  /** 브라우저 탭·OG 카드에 쓰는 사이트 이름 */
  name: 'kianpas',
  description: '백엔드 개발하면서 배운 것들을 기록하는 블로그이자 포트폴리오입니다.',
};

export const skillsData = {
  backend: ['Java', 'Spring Boot', 'Spring Batch', 'MyBatis', 'MySQL', 'PostgreSQL'],
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  tools: ['Git', 'Docker', 'AWS', 'IntelliJ IDEA']
};

// TODO: 실제 경력으로 교체 (회사명·기간·성과는 자리표시용 틀)
export const experienceData = [
  {
    company: '회사명',
    position: '백엔드 개발자',
    period: '2021.12 - 현재',
    description: 'Java/Spring 기반 웹 서비스 개발 및 운영',
    achievements: [
      '핵심 도메인 서버 개발과 운영 담당',
      '레거시 시스템 개선 및 리팩토링',
      '배치·연동 시스템 설계와 구현',
    ],
    technologies: ['Java', 'Spring Boot', 'MyBatis', 'Oracle', 'JavaScript'],
  },
];
