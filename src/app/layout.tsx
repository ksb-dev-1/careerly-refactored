import { Suspense } from "react";

import { Geist, Geist_Mono, Mulish } from "next/font/google";

// import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

import { NavigationProgress } from "@/components/navigation-progress";
import { Providers } from "@/components/providers/providers";
import { cn } from "@/lib/utils";

import "./globals.css";

// import "nprogress/nprogress.css";

const fontFamily = Mulish({ subsets: ["latin"], variable: "--font-sans" });

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
        fontFamily.variable,
      )}
      suppressHydrationWarning={true}
    >
      <body>
        <Suspense>
          <NavigationProgress />
        </Suspense>
        <Providers>
          <main>{children}</main>
          {/* <SpeedInsights /> */}
        </Providers>
      </body>
    </html>
  );
}
