"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

// ✅ SSR 비활성화된 마크다운 에디터 동적 로딩
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

const BlogWritePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<string | undefined>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("제목:", title);
    console.log("내용:", content);

    // 추후 DB 저장 API 호출 예정
    // await fetch('/api/posts', { method: 'POST', body: JSON.stringify({ title, body }) })

    alert("글이 임시로 저장되었습니다!");
  };

  return (
    <section className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        새 글 작성
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title-input" className="block font-semibold mb-1">
            제목
          </label>
          <input
            type="text"
            id="title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-blue-400"
            required
          />
        </div>
        <div>
            <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">내용</label>
          <MDEditor value={content} onChange={setContent} height={400} />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          저장하기
        </button>
      </form>
    </section>
  );
};

export default BlogWritePage;
