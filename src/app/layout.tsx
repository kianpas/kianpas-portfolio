import type { Metadata, Viewport  } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/layout/Navbar";
import { siteMetadata, siteUrl } from "@/data/metadata";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "./globals.css";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  // 필요 시: maximumScale, minimumScale, userScalable 등
};

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  // 상대 경로 OG 이미지를 절대 URL로 바꿀 기준. 없으면 OG 이미지가 해석되지 않는다.
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteMetadata.name} — ${siteMetadata.occupation} 블로그`,
    // 하위 페이지에서 title 문자열만 주면 "글 제목 · kianpas" 형태가 된다.
    template: `%s · ${siteMetadata.name}`,
  },
  description: siteMetadata.description,
  authors: [{ name: siteMetadata.author, url: siteMetadata.github }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: siteMetadata.name,
    title: `${siteMetadata.name} — ${siteMetadata.occupation} 블로그`,
    description: siteMetadata.description,
  },
  // 카드 형태만 전역으로 지정한다. title/description/image는 각 페이지의 openGraph를
  // 크롤러가 대체값으로 쓰므로 페이지마다 중복해서 적지 않는다.
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:border focus:border-gray-200 focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-gray-900 dark:focus:border-gray-700 dark:focus:bg-gray-900 dark:focus:text-gray-100"
          >
            본문으로 건너뛰기
          </a>
          <Navbar />
          <main id="main-content" className="mt-16">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
