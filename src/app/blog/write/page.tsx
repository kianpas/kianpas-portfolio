"use client";

import dynamic from 'next/dynamic';
import { useState } from "react";
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

// ✅ SSR 비활성화된 마크다운 에디터 동적 로딩
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

const BlogWritePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<string | undefined>('');

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
      <h1 className="text-2xl font-bold mb-6">새 글 작성</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-1">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">내용</label>
          <MDEditor value={content} onChange={setContent} height={400} />
        </div>
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          저장하기
        </button>
      </form>
    </section>
  );
};

export default BlogWritePage;
