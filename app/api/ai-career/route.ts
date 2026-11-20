import { NextResponse } from "next/server";
import { getCareerAiInsights } from "@/lib/ai-career";

export async function POST(request: Request) {
  try {
    const { query, applications, reminders } = await request.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const reply = getCareerAiInsights(query, applications || [], reminders || []);

    return NextResponse.json({
      reply,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate career intelligence" },
      { status: 500 }
    );
  }
}

