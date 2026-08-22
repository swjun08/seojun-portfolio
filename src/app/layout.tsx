import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeScript } from "@/components/theme-script";
import { SiteNav } from "@/components/site-nav";
import { AmbientBackground } from "@/components/ambient-background";
import "./globals.css";

const pretendard = localFont({
  src: "../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

export const metadata: Metadata = {
  title: "박서준",
  description: "문제를 정의하고 기획하는 사람, 박서준의 포트폴리오",
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
