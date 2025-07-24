import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Awesome Copilot Password Generator",
  description: "超シンプルなパスワード自動生成サービス (Next.js, TypeScript, Tailwind CSS)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900 transition-colors min-h-screen`}>
        <header className="w-full py-4 px-6 flex items-center justify-between bg-white/80 dark:bg-gray-800/80 shadow-sm sticky top-0 z-10">
          <Link href="/" className="text-xl font-bold tracking-tight dark:text-white">
            Awesome Copilot
          </Link>
          {/* サービス追加時はここにナビゲーションを追加 */}
          <nav className="flex gap-4">
            {/* <Link href="/password" className="hover:underline">パスワード生成</Link> */}
            {/* <Link href="/other-service" className="hover:underline">他サービス</Link> */}
          </nav>
        </header>
        <main className="flex flex-col items-center justify-center flex-1 w-full">
          {children}
        </main>
        <footer className="w-full py-4 px-6 text-center text-xs text-gray-400 dark:text-gray-500 bg-white/80 dark:bg-gray-800/80 mt-8">
          &copy; {new Date().getFullYear()} Awesome Copilot. Copilotで爆速開発しよう！
        </footer>
      </body>
    </html>
  );
}
