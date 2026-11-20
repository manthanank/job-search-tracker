import { JobApplication, InterviewReminder } from "./types";
import { formatSalary } from "./utils";

export function getCareerAiInsights(
  query: string,
  applications: JobApplication[],
  reminders: InterviewReminder[]
): string {
  const q = query.toLowerCase();

  const total = applications.length;
  const active = applications.filter((a) => a.stage !== "REJECTED" && a.stage !== "WISHLIST");
  const interviews = applications.filter(
    (a) => a.stage === "SCREENING" || a.stage === "TECHNICAL_INTERVIEW"
  );
  const offers = applications.filter((a) => a.stage === "OFFER");

  const interviewRate = total > 0 ? ((interviews.length / total) * 100).toFixed(1) : "0";
  const offerRate = interviews.length > 0 ? ((offers.length / interviews.length) * 100).toFixed(1) : "0";

  if (q.includes("interview") || q.includes("upcoming") || q.includes("prepare")) {
    const upcoming = reminders.filter((r) => !r.completed);
    if (upcoming.length === 0) {
      return "📅 **No Pending Interviews Scheduled**: You have zero upcoming interview blocks in your pipeline. Consider following up with your active recruiter screening contacts.";
    }

    const list = upcoming
      .map(
        (r) =>
          `- **${r.company}** (${r.roleTitle}): *${r.title}* on ${new Date(
            r.scheduledAt
          ).toLocaleDateString()} at ${new Date(r.scheduledAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`
      )
      .join("\n");

    return (
      `🎯 **Upcoming Interview Schedule** (${upcoming.length} events):\n${list}\n\n` +
      `💡 *Preparation Tip*: Focus on STAR method stories (Situation, Task, Action, Result) illustrating distributed systems trade-offs and team leadership.`
    );
  }

  if (q.includes("rate") || q.includes("metric") || q.includes("analytics") || q.includes("funnel")) {
    return (
      `📊 **Application Funnel Analytics**:\n` +
      `- **Total Tracked Roles**: ${total}\n` +
      `- **Active Opportunities**: ${active.length}\n` +
      `- **Interview Pipeline**: ${interviews.length} companies (${interviewRate}% conversion)\n` +
      `- **Offers Received**: ${offers.length} (${offerRate}% interview-to-offer rate)\n\n` +
      `🚀 *Benchmark*: Tech industry median application-to-interview conversion is ~8-12%. Your rate of **${interviewRate}%** demonstrates strong resume targeting.`
    );
  }

  if (q.includes("salary") || q.includes("compensation") || q.includes("offer")) {
    const salaries = applications
      .filter((a) => a.salaryMax)
      .map((a) => a.salaryMax as number);

    const highest = Math.max(...(salaries.length ? salaries : [0]));
    const avg = salaries.length ? Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length) : 0;

    return (
      `💰 **Compensation Analytics**:\n` +
      `- **Highest Salary Ceiling in Pipeline**: $${(highest / 1000).toFixed(0)}k/year\n` +
      `- **Average Target Range**: ~$${(avg / 1000).toFixed(0)}k/year\n\n` +
      `💼 *Negotiation Advice*: When multiple offers overlap (like Linear and Stripe), highlight competing remote equity compensation and performance bonus structures to anchor upper quartile band.`
    );
  }

  return (
    `🤖 **JobAI Career Copilot**:\n` +
    `Currently monitoring ${total} applications across ${applications.filter((a) => a.stage === 'OFFER').length} offers and ${reminders.length} scheduled interviews.\n\n` +
    `Try asking: "What interviews do I have coming up?", "Analyze my funnel metrics", or "What is my compensation range?".`
  );
}

