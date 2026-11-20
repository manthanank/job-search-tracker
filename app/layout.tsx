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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://job-search-tracker-lime.vercel.app"),
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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://job-search-tracker-lime.vercel.app",
    siteName: "HuntFlow Career Tracker",
    title: "HuntFlow — Job Search & Application Tracker",
    description: "Visual Kanban pipeline, interview preparation, salary insights & career CRM.",
  },
  twitter: {
    card: "summary_large_image",
    title: "HuntFlow — Job Search & Application Tracker",
    description: "Visual Kanban pipeline, interview preparation, salary insights & career CRM.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "HuntFlow Job Search Tracker",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Manthan Ank",
      url: "https://github.com/manthanank",
    },
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
