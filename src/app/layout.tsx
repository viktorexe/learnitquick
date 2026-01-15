import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "LearnItQuick - Fun Math Games for Kids",
  description: "An interactive educational platform with fun math games and quizzes for first graders. Learn multiplication tables, addition, subtraction, and more!",
  keywords: ["math games", "educational games", "kids learning", "multiplication tables", "first grade math"],
  authors: [{ name: "LearnItQuick" }],
  openGraph: {
    title: "LearnItQuick - Fun Math Games for Kids",
    description: "An interactive educational platform with fun math games and quizzes for first graders.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎮</text></svg>" />
      </head>
      <body className={`${inter.className} antialiased bg-[#0a0a0a] text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
