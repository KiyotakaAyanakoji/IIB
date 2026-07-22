import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IIB — Industry Intelligence Bridge",
  description:
    "Make smarter decisions with data-driven intelligence across every sector. Real-time analytics, insights, and industry reports.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex items-center justify-center bg-[#050B14]">
        {/* The 16:9 Container Wrapper */}
        <div className="w-full max-w-[calc(100vh*16/9)] max-h-screen aspect-video bg-white overflow-y-auto overflow-x-hidden relative shadow-2xl">
          {children}
        </div>
      </body>
    </html>
  );
}
