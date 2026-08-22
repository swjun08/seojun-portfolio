import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeScript } from "@/components/theme-script";
import { SiteNav } from "@/components/site-nav";
import { AmbientBackground } from "@/components/ambient-background";
import "./globals.css";

const pretendard = localFont({
  src: [
    {
      path: "../../node_modules/pretendard/dist/web/static/woff2-subset/Pretendard-Regular.subset.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/pretendard/dist/web/static/woff2-subset/Pretendard-Medium.subset.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../node_modules/pretendard/dist/web/static/woff2-subset/Pretendard-SemiBold.subset.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../node_modules/pretendard/dist/web/static/woff2-subset/Pretendard-Bold.subset.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../node_modules/pretendard/dist/web/static/woff2-subset/Pretendard-Black.subset.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://seojunpark.vercel.app"),
  title: "박서준",
  description: "문제를 정의하고 기획하는 사람, 박서준의 포트폴리오",
  openGraph: {
    title: "박서준",
    description: "문제를 정의하고 기획하는 사람, 박서준의 포트폴리오",
    url: "https://seojunpark.vercel.app",
    siteName: "박서준",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "박서준",
    description: "문제를 정의하고 기획하는 사람, 박서준의 포트폴리오",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {/* Rollback: delete this one line to remove the ambient background */}
        <AmbientBackground />
        <SiteNav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border/60 py-10 text-center text-sm text-muted">
          <p>robinseojun0625@gmail.com · @wxst7xn</p>
          <p className="mt-1">© {new Date().getFullYear()} 박서준</p>
        </footer>
      </body>
    </html>
  );
}
