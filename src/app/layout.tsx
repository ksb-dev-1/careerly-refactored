import { Suspense } from "react";

import { Geist, Geist_Mono, Mulish } from "next/font/google";

import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

import { Navbar } from "@/components/navbar";
import { NavigationProgress } from "@/components/navigation-progress";
import { cn } from "@/lib/utils";

import "./globals.css";

// import "nprogress/nprogress.css";

const dmSans = Mulish({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Better Auth Tutorial",
  description:
    "Learn how to implement authentication using Better Auth with email, Google, and GitHub in a modern Next.js application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        dmSans.variable,
      )}
      suppressHydrationWarning={true}
    >
      <body className="min-h-full flex flex-col">
        <Suspense>
          <NavigationProgress />
        </Suspense>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
