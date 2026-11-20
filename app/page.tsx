"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Briefcase, Sparkles, Database, BarChart2, Users, CalendarDays, 
  ArrowRight, CheckCircle2, ChevronRight, Calculator, DollarSign, 
  Building2, ShieldCheck, Zap, Star, HelpCircle, Code2, Layers, ExternalLink 
} from "lucide-react";

export default function JobTrackerLandingPage() {
  // Offer Comparison Calculator State
  const [offerA, setOfferA] = useState({
    company: "Vercel",
    base: 175000,
    bonusPct: 15,
    equity4Yr: 240000,
    signing: 20000,
  });

  const [offerB, setOfferB] = useState({
    company: "Stripe",
    base: 195000,
    bonusPct: 15,
    equity4Yr: 320000,
    signing: 35000,
  });

  // Calculate Year 1 Total Comp
  const year1A = offerA.base + (offerA.base * (offerA.bonusPct / 100)) + (offerA.equity4Yr / 4) + offerA.signing;
  const year2PlusA = offerA.base + (offerA.base * (offerA.bonusPct / 100)) + (offerA.equity4Yr / 4);

  const year1B = offerB.base + (offerB.base * (offerB.bonusPct / 100)) + (offerB.equity4Yr / 4) + offerB.signing;
  const year2PlusB = offerB.base + (offerB.base * (offerB.bonusPct / 100)) + (offerB.equity4Yr / 4);

  // Pricing Toggle
  const [annualBilling, setAnnualBilling] = useState(true);

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does HuntFlow differ from general task trackers like Trello or Notion?",
      a: "HuntFlow is built specifically for tech career sprints. It features custom application stages, interview prep reminders, recruiter relationship management, offer comparison equity calculators, and automated AI career copilot recommendations that generic kanban boards lack."
    },
    {
      q: "Does HuntFlow support PostgreSQL and custom self-hosting?",
      a: "Yes! HuntFlow includes complete Prisma ORM models with strict relational cascades for companies, applications, contacts, and interview checklists. You can connect any Supabase, Neon, or self-hosted PostgreSQL database via the DATABASE_URL environment variable."
    },
    {
      q: "Is my salary and interview data private?",
      a: "100% private. All your application milestones, company compensation notes, and interviewer contact details are stored locally in your browser storage and optionally synchronized directly with your own private PostgreSQL instance via Prisma."
    },
    {
      q: "Can the AI Career Copilot generate tailored interview responses?",
      a: "Yes, JobAI analyzes the specific stage and job role to synthesize STAR-method behavioral anecdotes, technical system design prompts, and salary negotiation counter-offer phrasing."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight">HuntFlow</span>
              <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Prisma + Postgres
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#calculator" className="hover:text-white transition">Offer Calculator</a>
            <a href="#architecture" className="hover:text-white transition">Prisma Architecture</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="#faq" className="hover:text-white transition">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/board"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition hover:scale-105 active:scale-95"
            >
              <span>Launch App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 space-y-24 sm:space-y-32 py-12">
        {/* HERO SECTION */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Next-Generation Career Pipeline Command Station</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-tight sm:leading-[1.1]"
          >
            Manage Your Job Pipeline. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Negotiate Offers with Confidence.
            </span>
          </motion.h1>

          <p className="text-slate-400 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            The all-in-one application tracking workstation for high-velocity engineers. Built with Next.js 15, Prisma ORM, PostgreSQL schema cascades, and real-time conversion funnel analytics.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/board"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition hover:scale-105 active:scale-95"
            >
              <Briefcase className="w-5 h-5" />
              <span>Open Pipeline Board</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/analytics"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold text-sm transition"
            >
              <BarChart2 className="w-5 h-5 text-indigo-400" />
              <span>View Funnel Analytics</span>
            </Link>
          </div>

          {/* Social Proof Metric Bar */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
            {[
              { val: "$14.2M+", label: "Compensation Tracked", sub: "across 1,200+ offers" },
              { val: "6-Stage", label: "Interactive Kanban", sub: "Wishlist to Acceptance" },
              { val: "54.2%", label: "Screen Pass Rate", sub: "Top 5% candidate pool" },
              { val: "100% Free", label: "Open Source Engine", sub: "Prisma & PostgreSQL" }
            ].map((stat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80">
                <div className="text-2xl sm:text-3xl font-black text-white">{stat.val}</div>
                <div className="text-xs font-bold text-indigo-400 mt-1">{stat.label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* INTERACTIVE OFFER COMPARISON CALCULATOR */}
        <section id="calculator" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
              <Calculator className="w-3.5 h-3.5" />
              <span>Interactive Equity & Compensation Modeler</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Compare Two Competing Offers Side-by-Side</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Adjust base salaries, target bonuses, 4-year equity grants, and signing bonuses to compute Year 1 and recurring Annual Total Compensation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Offer A Card */}
            <div className={`p-6 sm:p-8 rounded-3xl border transition ${year1A >= year1B ? "border-emerald-500/50 bg-slate-900/80 shadow-2xl shadow-emerald-500/10" : "border-slate-800 bg-slate-900/50"}`}>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
                    A
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-lg">{offerA.company}</h3>
                    <p className="text-xs text-slate-400">Offer Option Alpha</p>
                  </div>
                </div>
                {year1A >= year1B && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Highest Year 1 TC
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <label className="text-xs font-semibold text-slate-400">Base Salary ($)</label>
                  <input
                    type="number"
                    value={offerA.base}
                    onChange={(e) => setOfferA({ ...offerA, base: Number(e.target.value) })}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400">Annual Bonus (%)</label>
                  <input
                    type="number"
                    value={offerA.bonusPct}
                    onChange={(e) => setOfferA({ ...offerA, bonusPct: Number(e.target.value) })}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400">4-Year Equity ($)</label>
                  <input
                    type="number"
                    value={offerA.equity4Yr}
                    onChange={(e) => setOfferA({ ...offerA, equity4Yr: Number(e.target.value) })}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400">Signing Bonus ($)</label>
                  <input
                    type="number"
                    value={offerA.signing}
                    onChange={(e) => setOfferA({ ...offerA, signing: Number(e.target.value) })}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-400">Year 1 Total Compensation</span>
                  <span className="text-2xl font-black text-emerald-400">${year1A.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-slate-400">
                  <span>Recurring TC (Years 2-4)</span>
                  <span className="font-semibold text-slate-200">${year2PlusA.toLocaleString()} / yr</span>
                </div>
              </div>
            </div>

            {/* Offer B Card */}
            <div className={`p-6 sm:p-8 rounded-3xl border transition ${year1B > year1A ? "border-emerald-500/50 bg-slate-900/80 shadow-2xl shadow-emerald-500/10" : "border-slate-800 bg-slate-900/50"}`}>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center font-bold">
                    B
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-lg">{offerB.company}</h3>
                    <p className="text-xs text-slate-400">Offer Option Beta</p>
                  </div>
                </div>
                {year1B > year1A && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Highest Year 1 TC
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <label className="text-xs font-semibold text-slate-400">Base Salary ($)</label>
                  <input
                    type="number"
                    value={offerB.base}
                    onChange={(e) => setOfferB({ ...offerB, base: Number(e.target.value) })}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400">Annual Bonus (%)</label>
                  <input
                    type="number"
                    value={offerB.bonusPct}
                    onChange={(e) => setOfferB({ ...offerB, bonusPct: Number(e.target.value) })}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400">4-Year Equity ($)</label>
                  <input
                    type="number"
                    value={offerB.equity4Yr}
                    onChange={(e) => setOfferB({ ...offerB, equity4Yr: Number(e.target.value) })}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400">Signing Bonus ($)</label>
                  <input
                    type="number"
                    value={offerB.signing}
                    onChange={(e) => setOfferB({ ...offerB, signing: Number(e.target.value) })}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-400">Year 1 Total Compensation</span>
                  <span className="text-2xl font-black text-emerald-400">${year1B.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-slate-400">
                  <span>Recurring TC (Years 2-4)</span>
                  <span className="font-semibold text-slate-200">${year2PlusB.toLocaleString()} / yr</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE WORKSPACE MODULES */}
        <section id="features" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Engineered for Every Stage of the Hunt</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              A cohesive suite of dedicated workstations replacing fragmented spreadsheets and lost email threads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Briefcase,
                title: "6-Stage Kanban Board",
                desc: "Fluid drag-and-drop pipeline across Wishlist, Applied, Screening, Technical, Offer, and Archived.",
                href: "/board",
                action: "Open Kanban"
              },
              {
                icon: BarChart2,
                title: "Conversion Funnel Analytics",
                desc: "Live drop-off diagnosis, interview velocity, and salary compensation charts powered by Recharts.",
                href: "/analytics",
                action: "View Funnel"
              },
              {
                icon: Users,
                title: "Recruiter & Referral CRM",
                desc: "Directory of talent partners, hiring managers, and internal employee advocates with email actions.",
                href: "/contacts",
                action: "Browse CRM"
              },
              {
                icon: CalendarDays,
                title: "Interview Prep Station",
                desc: "Session schedules, panel names, video call links, and STAR-method behavioral response prompts.",
                href: "/interviews",
                action: "Prep Schedule"
              }
            ].map((f, idx) => {
              const Icon = f.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-indigo-500/50 transition">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-white text-base mt-4">{f.title}</h3>
                    <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">{f.desc}</p>
                  </div>

                  <Link
                    href={f.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 pt-2"
                  >
                    <span>{f.action}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* PRISMA POSTGRESQL ARCHITECTURE */}
        <section id="architecture" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  Prisma ORM • PostgreSQL 16+
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Relational Data Engine & Schema Model</h2>
                <p className="text-slate-400 text-sm max-w-2xl">
                  Strictly typed entity relations with foreign keys and cascade deletions. Ready for deployment on Supabase, Neon, or Railway.
                </p>
              </div>

              <Link
                href="/settings"
                className="self-start lg:self-auto flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
              >
                <Code2 className="w-4 h-4 text-purple-400" />
                <span>Inspect Full Prisma File</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {[
                { name: "Company", fields: "id, name, logoUrl, website", rel: "1-to-Many JobApplications" },
                { name: "JobApplication", fields: "id, title, salary, stage, notes", rel: "Many-to-1 Company" },
                { name: "InterviewReminder", fields: "id, title, date, completed", rel: "Cascade on Application" },
                { name: "ChecklistTask", fields: "id, text, isCompleted", rel: "Prep items per Application" }
              ].map((m) => (
                <div key={m.name} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-2">
                  <div className="font-mono font-bold text-purple-400">model {m.name}</div>
                  <div className="text-slate-400 text-[11px] font-mono">{m.fields}</div>
                  <div className="text-slate-500 text-[10px] pt-1 border-t border-slate-800">{m.rel}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING MATRIX */}
        <section id="pricing" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Transparent, Open Access Plans</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Start with free local-first tracking or upgrade for automated recruiter scrapers and live AI interview coaching.
            </p>

            <div className="inline-flex items-center gap-3 p-1 rounded-full bg-slate-900 border border-slate-800 mt-4">
              <button
                onClick={() => setAnnualBilling(false)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${!annualBilling ? "bg-indigo-600 text-white" : "text-slate-400"}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnualBilling(true)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${annualBilling ? "bg-indigo-600 text-white" : "text-slate-400"}`}
              >
                Annual (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Developer Starter",
                price: "$0",
                period: "forever free",
                features: [
                  "Unlimited application milestones",
                  "6-stage interactive Kanban board",
                  "Local browser storage persistence",
                  "Basic interview checklist"
                ],
                popular: false,
                btn: "Start Free",
                href: "/board"
              },
              {
                name: "Pro Careerist",
                price: annualBilling ? "$16" : "$20",
                period: "per month, billed annually",
                features: [
                  "Everything in Starter",
                  "PostgreSQL cloud sync via Prisma",
                  "Full funnel conversion analytics",
                  "AI Career Copilot resume reviews",
                  "Comp & equity comparison calculator"
                ],
                popular: true,
                btn: "Launch Pro Workspace",
                href: "/board"
              },
              {
                name: "Executive Accelerator",
                price: annualBilling ? "$48" : "$59",
                period: "per month, billed annually",
                features: [
                  "Everything in Pro Careerist",
                  "AI System Design Interview Coach & Feedback",
                  "Recruiter contact email intelligence",
                  "Dedicated executive negotiation advisor",
                  "Multi-currency equity modeling"
                ],
                popular: false,
                btn: "Unlock Executive",
                href: "/board"
              }
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-3xl border flex flex-col justify-between space-y-6 transition ${
                  plan.popular
                    ? "bg-slate-900 border-indigo-500 shadow-2xl shadow-indigo-500/10 scale-105"
                    : "bg-slate-900/50 border-slate-800"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-white text-lg">{plan.name}</h3>
                    {plan.popular && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-xs text-slate-400">/{plan.period}</span>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={plan.href}
                  className={`w-full py-3 rounded-xl font-bold text-xs text-center transition ${
                    plan.popular
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                  }`}
                >
                  {plan.btn}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-sm">Everything you need to know about the HuntFlow platform and data engine.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-800 rounded-2xl bg-slate-900/50 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-white hover:text-indigo-400 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? "rotate-90 text-indigo-400" : ""}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-indigo-950/60 border border-indigo-500/30 text-center space-y-6 shadow-2xl">
            <h2 className="text-3xl sm:text-5xl font-black text-white max-w-2xl mx-auto leading-tight">
              Ready to Accelerate Your Career Sprint?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
              Join hundreds of high-caliber engineers tracking applications, mastering interview rounds, and closing top-tier offers.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/board"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition hover:scale-105"
              >
                Launch Pipeline Board Now
              </Link>
              <Link
                href="/settings"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 font-semibold text-sm transition"
              >
                Configure Goals & Database
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Briefcase className="h-4 w-4" />
            </div>
            <span className="font-bold text-white text-sm">HuntFlow</span>
            <span>• Next.js 15 & Prisma Workstation</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/board" className="hover:text-slate-300 transition">Pipeline Board</Link>
            <Link href="/analytics" className="hover:text-slate-300 transition">Funnel Analytics</Link>
            <Link href="/contacts" className="hover:text-slate-300 transition">Recruiter CRM</Link>
            <Link href="/interviews" className="hover:text-slate-300 transition">Interviews</Link>
            <Link href="/settings" className="hover:text-slate-300 transition">Settings</Link>
            <a href="https://github.com/manthanank/job-search-tracker" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition flex items-center gap-1">
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div>
            © {new Date().getFullYear()} HuntFlow Inc. Built for top tech career sprints.
          </div>
        </div>
      </footer>
    </div>
  );
}
