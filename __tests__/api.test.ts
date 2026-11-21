import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { GET as getJobsFeed } from "../app/api/jobs/feed/route";
import { GET as getApplications, POST as postApplication } from "../app/api/applications/route";

describe("Job Search Tracker API Routes", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          data: [
            {
              slug: "senior-full-stack-engineer-stripe",
              company_name: "Stripe",
              title: "Senior Full-Stack Engineer - Billing",
              description: "Build robust billing pipelines and customer APIs",
              remote: true,
              url: "https://stripe.com/jobs",
              tags: ["React", "TypeScript", "Node.js"],
              job_types: ["Full-time"],
              location: "Remote (Global)",
              created_at: 1710000000,
            },
            {
              slug: "infrastructure-engineer-datadog",
              company_name: "Datadog",
              title: "Infrastructure Engineer",
              description: "Manage telemetry and distributed systems",
              remote: true,
              url: "https://datadog.com/jobs",
              tags: ["Go", "Kubernetes"],
              job_types: ["Full-time"],
              location: "Remote",
              created_at: 1710000000,
            },
          ],
        }),
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });
  it("GET /api/jobs/feed returns successful jobs feed with items", async () => {
    const req = new Request("http://localhost:3000/api/jobs/feed");
    const res = await getJobsFeed(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(Array.isArray(data.jobs)).toBe(true);
    expect(data.jobs.length).toBeGreaterThan(0);

    const firstJob = data.jobs[0];
    expect(firstJob).toHaveProperty("id");
    expect(firstJob).toHaveProperty("title");
    expect(firstJob).toHaveProperty("companyName");
  });

  it("GET /api/jobs/feed filters jobs by query search param", async () => {
    const req = new Request("http://localhost:3000/api/jobs/feed?query=Stripe");
    const res = await getJobsFeed(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    const hasStripe = data.jobs.some(
      (j: any) => j.companyName.toLowerCase().includes("stripe") || j.title.toLowerCase().includes("stripe")
    );
    expect(hasStripe).toBe(true);
  });

  it("GET /api/applications returns seeded application list", async () => {
    const req = new Request("http://localhost:3000/api/applications");
    const res = await getApplications(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(Array.isArray(data.applications)).toBe(true);
    expect(data.applications.length).toBeGreaterThan(0);
  });

  it("POST /api/applications validates and creates a new application", async () => {
    const newAppPayload = {
      company: "Acme Corp",
      roleTitle: "Staff Platform Engineer",
      stage: "APPLIED",
      jobType: "Remote",
      location: "Remote",
      salaryMin: 190000,
      salaryMax: 230000,
      listingUrl: "https://acme.com/jobs/123",
      notes: "Submitted via referral.",
      priority: 4,
    };

    const req = new Request("http://localhost:3000/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAppPayload),
    });

    const res = await postApplication(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.application).toMatchObject({
      company: "Acme Corp",
      roleTitle: "Staff Platform Engineer",
      stage: "APPLIED",
    });
  });
});
