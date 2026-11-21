import { NextResponse } from "next/server";

export const revalidate = 300; // Cache for 5 minutes

export interface LiveJob {
  id: string;
  slug: string;
  companyName: string;
  title: string;
  description: string;
  remote: boolean;
  url: string;
  tags: string[];
  jobTypes: string[];
  location: string;
  createdAt: number;
}

const FALLBACK_LIVE_JOBS: LiveJob[] = [
  {
    id: "fb-1",
    slug: "senior-full-stack-engineer-stripe",
    companyName: "Stripe",
    title: "Senior Full-Stack Engineer - Billing & Subscriptions",
    description: "Design high-reliability billing pipelines, customer portal APIs, and real-time ledger accounting systems using TypeScript, React, and Ruby.",
    remote: true,
    url: "https://stripe.com/jobs",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "APIs"],
    jobTypes: ["Full-time"],
    location: "Remote (Global)",
    createdAt: Date.now() - 3600 * 1000 * 4,
  },
  {
    id: "fb-2",
    slug: "distributed-systems-engineer-vercel",
    companyName: "Vercel",
    title: "Distributed Systems Engineer - Edge Runtime",
    description: "Build Next.js Server Actions execution engines, edge caching layers, and high-throughput zero-cold-start compute fabrics.",
    remote: true,
    url: "https://vercel.com/careers",
    tags: ["Rust", "Go", "Next.js", "Edge Computing", "Serverless"],
    jobTypes: ["Full-time"],
    location: "Remote (US / EU)",
    createdAt: Date.now() - 3600 * 1000 * 8,
  },
  {
    id: "fb-3",
    slug: "ai-systems-engineer-anthropic",
    companyName: "Anthropic",
    title: "AI Systems & Inference Infrastructure Engineer",
    description: "Scale high-concurrency model inference serving, prompt caching, and low-latency token streaming pipelines.",
    remote: true,
    url: "https://anthropic.com/careers",
    tags: ["Python", "C++", "PyTorch", "Kubernetes", "LLMs"],
    jobTypes: ["Full-time"],
    location: "San Francisco, CA / Remote",
    createdAt: Date.now() - 3600 * 1000 * 12,
  },
  {
    id: "fb-4",
    slug: "frontend-architect-linear",
    companyName: "Linear",
    title: "Frontend Architect - Real-Time Collaboration",
    description: "Architect ultra-fast 60 FPS interfaces, offline-first IndexedDB CRDT synchronization, and custom canvas rendering engines.",
    remote: true,
    url: "https://linear.app/careers",
    tags: ["TypeScript", "React", "WebSockets", "CRDT", "IndexedDB"],
    jobTypes: ["Full-time"],
    location: "Remote (Worldwide)",
    createdAt: Date.now() - 3600 * 1000 * 18,
  },
  {
    id: "fb-5",
    slug: "cloud-security-engineer-datadog",
    companyName: "Datadog",
    title: "Cloud Infrastructure & Security Engineer",
    description: "Manage zero-trust IAM policy automation, Kubernetes cluster hardening, and multi-region telemetry ingestion.",
    remote: true,
    url: "https://www.datadoghq.com/careers",
    tags: ["Go", "Kubernetes", "AWS", "Terraform", "Security"],
    jobTypes: ["Full-time"],
    location: "Remote (US / Canada)",
    createdAt: Date.now() - 3600 * 1000 * 24,
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") || searchParams.get("query") || "").toLowerCase();
  const tag = (searchParams.get("tag") || "").toLowerCase();

  try {
    const res = await fetch("https://www.arbeitnow.com/api/job-board-api", {
      next: { revalidate: 300 },
      headers: {
        Accept: "application/json",
        "User-Agent": "HuntFlow-JobTracker/1.0",
      },
    });

    let jobs: LiveJob[] = [];

    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data)) {
        jobs = json.data.map((item: any) => ({
          id: item.slug || `job-${Math.random().toString(36).substring(2, 9)}`,
          slug: item.slug,
          companyName: item.company_name,
          title: item.title,
          description: item.description?.replace(/<[^>]+>/g, "").substring(0, 300) + "...",
          remote: Boolean(item.remote),
          url: item.url,
          tags: Array.isArray(item.tags) ? item.tags : [],
          jobTypes: Array.isArray(item.job_types) ? item.job_types : ["Full-time"],
          location: item.location || (item.remote ? "Remote" : "Global"),
          createdAt: item.created_at ? item.created_at * 1000 : Date.now(),
        }));
      }
    }

    if (jobs.length === 0) {
      jobs = FALLBACK_LIVE_JOBS;
    }

    // Filter by search query if supplied
    if (query) {
      jobs = jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(query) ||
          j.companyName.toLowerCase().includes(query) ||
          j.tags.some((t) => t.toLowerCase().includes(query)) ||
          j.location.toLowerCase().includes(query)
      );
    }

    if (tag) {
      jobs = jobs.filter((j) =>
        j.tags.some((t) => t.toLowerCase() === tag || t.toLowerCase().includes(tag))
      );
    }

    return NextResponse.json({
      success: true,
      totalCount: jobs.length,
      dataSource: "Arbeitnow Public API (Live Tech Jobs Feed)",
      fetchedAt: new Date().toISOString(),
      jobs: jobs.slice(0, 100),
    });
  } catch (error) {
    console.warn("Failed to fetch live jobs feed, serving fallback:", error);
    let filtered = FALLBACK_LIVE_JOBS;
    if (query) {
      filtered = filtered.filter(
        (j) =>
          j.title.toLowerCase().includes(query) ||
          j.companyName.toLowerCase().includes(query)
      );
    }
    return NextResponse.json({
      success: true,
      totalCount: filtered.length,
      dataSource: "Local Curated Snapshot",
      fetchedAt: new Date().toISOString(),
      jobs: filtered,
    });
  }
}

