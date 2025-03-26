import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',         // 정적 사이트 export
  trailingSlash: true,      // 모든 경로에 / 붙이기 (GitHub Pages 호환)
  images: {
    unoptimized: true       // next/image 최적화 비활성화
  },
  basePath: '',             // 서브 디렉토리에 배포할 경우 '/블로그경로' 입력
};

export default nextConfig;
