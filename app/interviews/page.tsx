"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { 
  CalendarDays, Video, Clock, CheckCircle2, AlertCircle, 
  Sparkles, ExternalLink, BookOpen, UserCheck, Shield 
} from "lucide-react";

interface InterviewSession {
  id: string;
  company: string;
  role: string;
  roundName: string;
  type: "System Design" | "Coding & Data Structures" | "Behavioral / Values" | "Executive / Bar Raiser";
  dateTime: string;
  interviewers: string[];
  meetingLink: string;
  prepCompleted: boolean;
  notes: string[];
}

const INITIAL_SESSIONS: InterviewSession[] = [
  {
    id: "int-1",
    company: "Vercel",
    role: "Staff Infrastructure Engineer",
    roundName: "Distributed Systems & Next.js Edge Routing",
    type: "System Design",
    dateTime: "Tomorrow, 2:00 PM EST",
    interviewers: ["Guillermo R. (Principal)", "Sarah T. (Infra Lead)"],
    meetingLink: "https://meet.google.com/ver-cel-edge",
    prepCompleted: true,
    notes: [
      "Review edge caching invalidation across Cloudflare vs Fastly POPs",
      "Explain multi-region Postgres replication latency trade-offs",
      "Detail past experience with zero-downtime rolling deploys"
    ]
  },
  {
    id: "int-2",
    company: "Stripe",
    role: "Senior Full Stack Engineer (Billing Platform)",
    roundName: "Live Architecture & High-Concurrency Idempotency",
    type: "Coding & Data Structures",
    dateTime: "Friday, 11:00 AM EST",
    interviewers: ["Kenji Sato (Staff Eng)"],
    meetingLink: "https://zoom.us/j/987654321",
    prepCompleted: false,
    notes: [
      "Idempotency keys and atomic payment state transitions in Postgres",
      "Double-entry ledger database schema invariants",
      "Distributed locks with Redis Redlock algorithm caveats"
    ]
  },
  {
    id: "int-3",
    company: "Linear",
    role: "Lead Systems Architect",
    roundName: "Product Architecture & Operational Excellence",
    type: "Executive / Bar Raiser",
    dateTime: "Next Tuesday, 4:00 PM EST",
    interviewers: ["Karri Saarinen (Co-Founder & CEO)"],
    meetingLink: "https://meet.linear.app/interview-karri",
    prepCompleted: false,
    notes: [
      "Linear's local-first sync engine (ElectricSQL / SQLite sync model)",
      "High framerate 120 FPS web client performance optimization",
      "Design principles and craftsmanship in enterprise developer tools"
    ]
  }
];

export default function InterviewsPage() {
  const [sessions, setSessions] = useState<InterviewSession[]>(INITIAL_SESSIONS);
  const [selectedSessionId, setSelectedSessionId] = useState<string>(INITIAL_SESSIONS[0].id);

  const activeSession = sessions.find((s) => s.id === selectedSessionId) || sessions[0];

  const handleTogglePrep = (id: string) => {
    setSessions(sessions.map((s) => s.id === id ? { ...s, prepCompleted: !s.prepCompleted } : s));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Interview Schedule & Preparation Station
            </h1>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Manage upcoming interview loops, system design preparation notes, and STAR-method responses.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span>Next session: {activeSession.dateTime}</span>
          </div>
        </div>

        {/* 2-Column Schedule & Prep Desk */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Scheduled Loops */}
          <div className="space-y-4 lg:col-span-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Upcoming Rounds ({sessions.length})</h2>
            <div className="space-y-3">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => setSelectedSessionId(session.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${
                    selectedSessionId === session.id
                      ? "bg-slate-900 border-indigo-500/80 shadow-lg shadow-indigo-500/10"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-indigo-400">{session.company}</span>
                      <h3 className="font-semibold text-white text-sm mt-0.5">{session.roundName}</h3>
                    </div>
                    <span className={`w-3 h-3 rounded-full mt-1 ${session.prepCompleted ? "bg-emerald-400" : "bg-amber-400 animate-pulse"}`} />
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {session.dateTime}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {session.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Framework Card */}
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/40 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-indigo-300">
                <BookOpen className="w-4 h-4" />
                <span>Behavioral STAR Framework</span>
              </div>
              <ul className="text-slate-400 space-y-1 list-disc list-inside text-[11px] leading-relaxed">
                <li><strong className="text-slate-200">Situation</strong>: Frame context & high-stakes problem</li>
                <li><strong className="text-slate-200">Task</strong>: Specific engineering goal & constraints</li>
                <li><strong className="text-slate-200">Action</strong>: Technical design decisions & leadership</li>
                <li><strong className="text-slate-200">Result</strong>: Quantifiable business metric (latency, revenue)</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Active Session Deep Prep */}
          <div className="space-y-6 lg:col-span-2">
            <motion.div
              key={activeSession.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {activeSession.company}
                    </span>
                    <span className="text-xs text-slate-400">• {activeSession.role}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mt-1.5">{activeSession.roundName}</h2>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleTogglePrep(activeSession.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                      activeSession.prepCompleted
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{activeSession.prepCompleted ? "Prep Complete" : "Mark Prepared"}</span>
                  </button>

                  <a
                    href={activeSession.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/25 transition"
                  >
                    <Video className="w-4 h-4" />
                    <span>Launch Video Call</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Panel Interviewers */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Interview Panel</h3>
                <div className="flex flex-wrap gap-2">
                  {activeSession.interviewers.map((person) => (
                    <span key={person} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-slate-300">
                      <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                      {person}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prep Objectives */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Target Discussion Modules</h3>
                <div className="space-y-2.5">
                  {activeSession.notes.map((note, index) => (
                    <div key={index} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3 text-xs text-slate-300">
                      <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="leading-relaxed">{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

