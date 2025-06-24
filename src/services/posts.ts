import { Post } from "@/types/post";

//마크다운 라이브러리
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// 'posts' 디렉토리의 경로를 설정합니다.
const postsDirectory = path.join(process.cwd(), 'src', 'posts');

// 모든 포스트의 메타데이터를 날짜순으로 정렬하여 가져오는 함수
export const getSortedPostsData = () => {
  // posts 디렉토리의 파일 이름을 모두 읽어옵니다.
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // '.md' 확장자를 제거하여 파일 이름을 ID로 사용합니다.
    const id = fileName.replace(/\.md$/, '');

    // 파일 전체 경로를 만듭니다.
    const fullPath = path.join(postsDirectory, fileName);
    // 파일을 UTF-8 인코딩으로 읽어옵니다.
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // gray-matter를 사용하여 frontmatter를 파싱합니다.
    const matterResult = matter(fileContents);

    // 데이터와 ID를 합쳐서 반환합니다.
    return {
      id,
      ...(matterResult.data as { title: string; date: string; author: string }),
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
}

// 모든 포스트의 ID(파일 이름) 목록을 가져오는 함수 (generateStaticParams를 위해)
export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

// 특정 ID(slug)를 가진 포스트의 전체 데이터를 가져오는 함수
export const getPostData = async (id: string) => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Frontmatter 파싱
  const matterResult = matter(fileContents);

  // remark를 사용하여 Markdown을 HTML 문자열로 변환
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // 데이터와 HTML 본문을 합쳐서 반환
  return {
    id,
    contentHtml,
    ...(matterResult.data as { title: string; date: string; author: string }),
  };
}



const POSTS_PER_PAGE = 10; // 페이지당 포스트 개수를 상수로 정의

export interface PostsResponse {
  posts: Post[];
  totalPages: number;
  totalPosts: number; // 전체 포스트 수도 유용할 수 있으니 추가
}

//포스트 목록
export const getPosts = async (page: number): Promise<PostsResponse | null> => {
  try {
    const skip = (page - 1) * POSTS_PER_PAGE;
    const limit = POSTS_PER_PAGE;
    const res = await fetch(
      `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`,
      {
        cache: "no-store", // 서버 렌더링에 적합한 캐싱 정책
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch posts ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    // 2. dummyjson의 반환 구조를 보고 타입 단언을 해줄 수 있습니다.
    // data는 { posts: Post[], total: number, skip: number, limit: number } 형태를 가집니다.
    const posts: Post[] = data.posts;
    const totalPosts: number = data.total;

    // 3. totalPages 계산
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    // 4. 새로운 구조의 객체로 반환
    return {
      posts,
      totalPages,
      totalPosts,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
};

//단일 포스트
export const getSinglePost = async (id: string): Promise<Post> => {
  try {
    const res = await fetch(`https://dummyjson.com/posts/${id}`, {
      cache: "no-store", // 서버 렌더링에 적합한 캐싱 정책
    }).catch((error) => {
      throw new Error(`Network error: ${error.message}`);
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch posts ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
