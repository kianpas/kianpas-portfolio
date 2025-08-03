"use client";

import { useEffect } from "react";

const ImageOptimizer = () => {
  useEffect(() => {
    const optimizeImages = () => {
      const images = document.querySelectorAll('.prose img:not([data-optimized])');
      
      images.forEach((img) => {
        const imageElement = img as HTMLImageElement;
        
        // 지연 로딩 설정
        imageElement.setAttribute('loading', 'lazy');
        imageElement.style.opacity = '0';
        imageElement.style.transition = 'opacity 0.3s ease-in-out';
        
        const handleLoad = () => {
          imageElement.style.opacity = '1';
          imageElement.dataset.optimized = 'true';
        };
        
        const handleError = () => {
          imageElement.style.opacity = '0.5';
          imageElement.dataset.optimized = 'true';
        };
        
        if (imageElement.complete && imageElement.naturalWidth > 0) {
          handleLoad();
        } else {
          imageElement.addEventListener('load', handleLoad, { once: true });
          imageElement.addEventListener('error', handleError, { once: true });
        }
      });
    };

    // 초기 실행 (약간의 지연으로 DOM 완전 로드 대기)
    const timeoutId = setTimeout(optimizeImages, 100);
    
    // DOM 변경 감지 (throttle 적용)
    let timeoutObserver: NodeJS.Timeout;
    const observer = new MutationObserver(() => {
      clearTimeout(timeoutObserver);
      timeoutObserver = setTimeout(optimizeImages, 50);
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutObserver);
      observer.disconnect();
    };
  }, []);

  return null;
};

export default ImageOptimizer;