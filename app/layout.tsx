import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "HuntFlow — Job Search & Application Tracker",
  description:
    "Career management pipeline and recruitment CRM with visual Kanban boards, interview schedule reminders, salary analytics, and AI career strategy guidance.",
  keywords: [
    "Job Search Tracker",
    "Application Pipeline",
    "Kanban Job Board",
    "Next.js 15",
    "PostgreSQL",
    "Prisma",
    "Career CRM",
  ],
  authors: [{ name: "Manthan Ank", url: "https://github.com/manthanank" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/manthanank/job-search-tracker",
    siteName: "HuntFlow Career Tracker",
    title: "HuntFlow — Job Search & Application Tracker",
    description: "Visual Kanban pipeline, interview preparation, salary insights & career CRM.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

