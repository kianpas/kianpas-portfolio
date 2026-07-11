"use client";

import { useEffect, useState } from "react";

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const percent = (scrolled / total) * 100;
      setProgress(Math.min(100, Math.max(0, percent)));
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[60] h-1 w-full bg-gray-200 dark:bg-gray-800">
      <div
        className="h-full bg-orange-500 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadingProgress;
