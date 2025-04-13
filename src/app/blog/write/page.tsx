"use client";

import { useState } from "react";

const BlogWritePage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("제목:", title);
    console.log("내용:", body);

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
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={10}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
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
