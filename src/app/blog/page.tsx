import { redirect } from 'next/navigation';

// /blog 경로로 접근하는 경우, 페이지네이션의 첫 페이지인 /blog/1로 리디렉션시킵니다.
export default function BlogRootPage() {
  redirect('/blog/page/1');
}