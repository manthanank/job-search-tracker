import { describe, it, expect } from "vitest";
import { GET as getJobsFeed } from "../app/api/jobs/feed/route";
import { GET as getApplications, POST as postApplication } from "../app/api/applications/route";

describe("Job Search Tracker API Routes", () => {
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
