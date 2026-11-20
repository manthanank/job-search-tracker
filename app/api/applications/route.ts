import { NextResponse } from "next/server";
import { JobApplication } from "@/lib/types";

// Dynamic seed generator relative to today's date
function generateDynamicSeedApplications(): JobApplication[] {
  const now = new Date();
  const formatRelDate = (daysAgo: number) => {
    const d = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    return d.toISOString().split("T")[0];
  };

  return [
    {
      id: "app-1",
      company: "Stripe",
      roleTitle: "Staff Software Engineer - Financial Infrastructure",
      stage: "TECHNICAL_INTERVIEW",
      jobType: "Remote",
      location: "San Francisco, CA / Remote",
      salaryMin: 220000,
      salaryMax: 260000,
      appliedDate: formatRelDate(8),
      listingUrl: "https://stripe.com/jobs",
      notes: "Passed behavioral screening and tech architecture screen. System design interview scheduled for next round.",
      priority: 5,
      contacts: [
        {
          id: "c-1",
          name: "Sarah Jenkins",
          role: "Senior Engineering Recruiter",
          email: "sjenkins@stripe.com",
        },
      ],
      checklist: [
        { id: "cl-1", text: "Submit resume and cover letter", isCompleted: true },
        { id: "cl-2", text: "Complete recruiter screen", isCompleted: true },
        { id: "cl-3", text: "Review distributed transactions & idempotency architecture", isCompleted: true },
        { id: "cl-4", text: "System design: high-throughput ledger service", isCompleted: false },
      ],
    },
    {
      id: "app-2",
      company: "Vercel",
      roleTitle: "Senior Solutions Architect - Next.js Enterprise",
      stage: "SCREENING",
      jobType: "Remote",
      location: "Remote (Worldwide)",
      salaryMin: 180000,
      salaryMax: 215000,
      appliedDate: formatRelDate(4),
      listingUrl: "https://vercel.com/careers",
      notes: "Recruiter phone call scheduled. Reviewing ISR, PPR (Partial Prerendering), and Turbopack specs.",
      priority: 5,
      contacts: [
        {
          id: "c-2",
          name: "Alex Rivera",
          role: "Talent Partner",
          email: "alex.r@vercel.com",
        },
      ],
      checklist: [
        { id: "cl-5", text: "Application submitted via referral", isCompleted: true },
        { id: "cl-6", text: "Prepare architectural case study", isCompleted: false },
      ],
    },
    {
      id: "app-3",
      company: "Linear",
      roleTitle: "Product Engineer - Real-Time Sync & Canvas",
      stage: "OFFER",
      jobType: "Remote",
      location: "Remote (Worldwide)",
      salaryMin: 195000,
      salaryMax: 230000,
      appliedDate: formatRelDate(21),
      listingUrl: "https://linear.app/careers",
      notes: "Offer received! Base: $210k + 0.15% equity. Reviewing terms and benefits package.",
      priority: 5,
      contacts: [
        {
          id: "c-3",
          name: "Marcus Vance",
          role: "VP of Engineering",
          email: "m.vance@linear.app",
        },
      ],
      checklist: [
        { id: "cl-7", text: "Final interview with Founders", isCompleted: true },
        { id: "cl-8", text: "Reference checks completed", isCompleted: true },
        { id: "cl-9", text: "Negotiate equity refreshers and start date", isCompleted: false },
      ],
    },
    {
      id: "app-4",
      company: "Datadog",
      roleTitle: "Full-Stack Security & Observability Engineer",
      stage: "APPLIED",
      jobType: "Hybrid",
      location: "New York, NY",
      salaryMin: 175000,
      salaryMax: 205000,
      appliedDate: formatRelDate(2),
      listingUrl: "https://www.datadoghq.com/careers",
      notes: "Submitted via internal career portal with custom tailored portfolio links.",
      priority: 4,
      contacts: [],
      checklist: [
        { id: "cl-10", text: "Application submitted", isCompleted: true },
        { id: "cl-11", text: "Follow up with talent acquisition on LinkedIn", isCompleted: false },
      ],
    },
    {
      id: "app-5",
      company: "Anthropic",
      roleTitle: "AI Applications & Prompt Interface Engineer",
      stage: "WISHLIST",
      jobType: "Remote",
      location: "San Francisco, CA / Remote",
      salaryMin: 230000,
      salaryMax: 280000,
      appliedDate: formatRelDate(1),
      listingUrl: "https://anthropic.com/careers",
      notes: "Targeting Q1 hiring batch. Tailoring CV with recent Claude API & MCP integration experience.",
      priority: 5,
      contacts: [],
      checklist: [
        { id: "cl-12", text: "Customize portfolio highlight reel", isCompleted: false },
        { id: "cl-13", text: "Reach out to network contacts", isCompleted: false },
      ],
    },
  ];
}

let serverApplications: JobApplication[] = generateDynamicSeedApplications();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stage = searchParams.get("stage");
  const query = searchParams.get("q")?.toLowerCase();

  let filtered = [...serverApplications];

  if (stage && stage !== "ALL") {
    filtered = filtered.filter((app) => app.stage === stage);
  }

  if (query) {
    filtered = filtered.filter(
      (app) =>
        app.company.toLowerCase().includes(query) ||
        app.roleTitle.toLowerCase().includes(query) ||
        app.location.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({
    success: true,
    count: filtered.length,
    applications: filtered,
    generatedAt: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.company || !body.roleTitle) {
      return NextResponse.json(
        { error: "Company and Role Title are required" },
        { status: 400 }
      );
    }

    const newApp: JobApplication = {
      id: body.id || `app-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      company: body.company,
      roleTitle: body.roleTitle,
      stage: body.stage || "WISHLIST",
      jobType: body.jobType || "Remote",
      location: body.location || "Remote",
      salaryMin: body.salaryMin ? Number(body.salaryMin) : undefined,
      salaryMax: body.salaryMax ? Number(body.salaryMax) : undefined,
      appliedDate: body.appliedDate || new Date().toISOString().split("T")[0],
      listingUrl: body.listingUrl || "",
      notes: body.notes || "",
      priority: body.priority || 3,
      contacts: body.contacts || [],
      checklist: body.checklist || [
        { id: `cl-${Date.now()}-1`, text: "Application submitted", isCompleted: true },
        { id: `cl-${Date.now()}-2`, text: "Follow up with recruiter", isCompleted: false },
      ],
    };

    serverApplications = [newApp, ...serverApplications];

    return NextResponse.json({
      success: true,
      message: "Application added successfully",
      application: newApp,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid application payload" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const updated = await request.json();
    if (!updated.id) {
      return NextResponse.json({ error: "Missing application ID" }, { status: 400 });
    }

    serverApplications = serverApplications.map((app) =>
      app.id === updated.id ? { ...app, ...updated } : app
    );

    return NextResponse.json({
      success: true,
      message: "Application updated successfully",
      application: updated,
    });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }

  serverApplications = serverApplications.filter((app) => app.id !== id);

  return NextResponse.json({
    success: true,
    message: "Application removed",
    remainingCount: serverApplications.length,
  });
}
