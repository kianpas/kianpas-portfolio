import { cache } from "react";
//마크다운 라이브러리
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import rehypeStringify from "rehype-stringify";
import { calculateReadingTime } from "@/utils/readingTime";

// const POSTS_PER_PAGE = 10; // 페이지당 포스트 수를 상수로 정의 (기존에 없다면 추가)

// 'posts' 디렉토리의 경로를 설정합니다.
const postsDirectory = path.join(process.cwd(), "src", "posts");

// 모든 포스트의 메타데이터를 날짜순으로 정렬하여 가져오는 함수
export const getSortedPostsData = cache(() => {
  // posts 디렉토리의 파일 이름을 모두 읽어옵니다.
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // '.md' 확장자를 제거하여 파일 이름을 slug로 사용합니다.
    const slug = fileName.replace(/\.md$/, "");

    // 파일 전체 경로를 만듭니다.
    const fullPath = path.join(postsDirectory, fileName);
    // 파일을 UTF-8 인코딩으로 읽어옵니다.
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // gray-matter를 사용하여 frontmatter를 파싱합니다.
    const matterResult = matter(fileContents);

    // 읽기 시간 계산 (content 전체 사용)
    const readingTime = calculateReadingTime(matterResult.content);

    // 데이터와 ID를 합쳐서 반환합니다.
    return {
      slug,
      content: matterResult.content, // content 추가
      readingTime, // 읽기 시간 추가
      ...(matterResult.data as {
        title: string;
        date: string;
        author: string;
        summary: string;
        tags: string[];
        category: string;
      }),
    };
  });

  // 날짜를 기준으로 내림차순 정렬합니다.
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
});

// 모든 태그 목록을 가져오는 함수
export const getAllCategories = () => {
  const allPosts = getSortedPostsData();
  const category = new Set(allPosts.flatMap((post) => post.category));
  return Array.from(category);
};

// 특정 카테고리의 포스트 목록을 가져오는 함수
export const getPostsByCategory = (
  categoryName: string,
  page: number = 1,
  postsPerPage: number = 10
) => {
  const allPosts = getSortedPostsData();
  const filteredPosts = allPosts.filter(
    (post) => post.category === categoryName
  );

  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const posts = filteredPosts.slice(startIndex, endIndex);

  return {
    posts,
    totalPosts,
    totalPages,
    currentPage: page,
    hasMore: page < totalPages,
  };
};

// 모든 태그 목록을 가져오는 함수
export const getAllTags = () => {
  const allPosts = getSortedPostsData();
  const tags = new Set(allPosts.flatMap((post) => post.tags));
  return Array.from(tags);
};

interface OnePagePostsResult {
  posts: ReturnType<typeof getSortedPostsData>; // 포스트 데이터 배열
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
}

// 특정 태그를 포함하는 포스트 목록을 가져오는 함수
export const getPostsByTag = (
  tagName: string,
  page: number = 1,
  limit: number = 10
): OnePagePostsResult => {
  const allPosts = getSortedPostsData().filter((post) =>
    post.tags.includes(tagName)
  );
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * limit;

  //데이터 없는 경우
  if (page > totalPages) {
    return { posts: [], totalPosts, totalPages, currentPage, hasMore: false };
  }

  const posts = allPosts.slice(startIndex, startIndex + limit);

  return {
    posts,
    totalPosts,
    totalPages,
    currentPage,
    hasMore: page < totalPages,
  };
};

interface PaginatedPostsResult {
  posts: ReturnType<typeof getSortedPostsData>; // 포스트 데이터 배열
  totalPosts: number;
  totalPages: number;
  currentPage: number;
}

/**
 * 페이지 번호에 해당하는 포스트 목록과 페이징 정보를 반환합니다.
 * @param page - 현재 페이지 번호 (1부터 시작)
 * @param limit - 페이지당 보여줄 포스트 수
 */
export const getPaginatedPosts = (
  page: number,
  limit: number = 10 // 기본값: 페이지당 10개
): PaginatedPostsResult => {
  const allPosts = getSortedPostsData();
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);

  // 페이지 번호가 유효한 범위 내에 있는지 확인 (선택적)
  const currentPage = Math.max(1, Math.min(page, totalPages));

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;

  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    totalPosts,
    totalPages,
    currentPage,
  };
};

// 모든 포스트의 slug(파일 이름) 목록을 가져오는 함수 (generateStaticParams를 위해)
export const getAllPostSlugs = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ""),
    },
  }));
};

// 특정 ID(slug)를 가진 포스트의 전체 데이터를 가져오는 함수
export const getPostData = async (slug: string) => {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Frontmatter 파싱
  const matterResult = matter(fileContents);

  // remark를 사용하여 Markdown을 HTML 문자열로 변환
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true }) // markdown을 HTML AST로 변환
    .use(rehypeSlug) // 헤딩에 자동으로 ID 추가 (스크롤 위치 참조용)
    .use(rehypeStringify, { allowDangerousHtml: true }) // HTML 문자열로 변환
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // 읽는 시간 계산 (통일된 방식 사용)
  const readingTime = calculateReadingTime(matterResult.content);

  // 모든 포스트를 날짜순으로 정렬
  const sortedPosts = getSortedPostsData(); // 이 함수는 모든 포스트 메타데이터를 정렬해서 반환한다고 가정
  const currentPostIndex = sortedPosts.findIndex((post) => post.slug === slug);

  const prevPost =
    currentPostIndex > 0 ? sortedPosts[currentPostIndex - 1] : null;
  const nextPost =
    currentPostIndex < sortedPosts.length - 1
      ? sortedPosts[currentPostIndex + 1]
      : null;

  // postData 객체에 필요한 모든 정보를 담아 반환,
  // prevPost 로 이전 데이터, nextPost로 다음 데이터
  const postData = {
    slug,
    contentHtml,
    readingTime,
    ...(matterResult.data as {
      title: string;
      date: string;
      author?: string;
      tags?: string[];
      category?: string;
    }),
  };

  return {
    postData,
    prevPost,
    nextPost,
  };
};
