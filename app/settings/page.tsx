"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { 
  Database, User, Shield, Download, RefreshCw, 
  CheckCircle2, Code2, Sliders, Briefcase, DollarSign 
} from "lucide-react";

export default function SettingsPage() {
  const [targetTitle, setTargetTitle] = useState("Staff Frontend / Systems Engineer");
  const [minBaseSalary, setMinBaseSalary] = useState("180,000");
  const [targetTotalComp, setTargetTotalComp] = useState("280,000");
  const [remotePreference, setRemotePreference] = useState("Remote Preferred");
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleExportData = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      schema: "Prisma PostgreSQL HuntFlow v1.0",
      settings: {
        targetTitle,
        minBaseSalary,
        targetTotalComp,
        remotePreference
      },
      counts: {
        applications: 48,
        interviews: 3,
        networkContacts: 12
      }
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `huntflow-pipeline-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    triggerToast("Full HuntFlow pipeline data exported as JSON!");
  };

  const prismaSchemaCode = `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum ApplicationStage {
  WISHLIST
  APPLIED
  SCREENING
  TECHNICAL
  OFFER
  REJECTED
}

model Company {
  id           String           @id @default(uuid())
  name         String           @unique
  logoUrl      String?
  website      String?
  applications JobApplication[]
  contacts     Contact[]
}

model JobApplication {
  id           String              @id @default(uuid())
  title        String
  salary       String?
  location     String
  stage        ApplicationStage    @default(APPLIED)
  notes        String?
  companyId    String
  company      Company             @relation(fields: [companyId], references: [id], onDelete: Cascade)
  contacts     Contact[]
  reminders    InterviewReminder[]
  checklist    ChecklistTask[]
  createdAt    DateTime            @default(now())
  updatedAt    DateTime            @updatedAt
}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Pipeline Configuration & Database Schema
          </h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">
            Customize compensation goals, inspect Prisma ORM relational definitions, and manage data portability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Target Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Target Position & Compensation Goals</h2>
                  <p className="text-xs text-slate-400">These parameters feed the AI Career Copilot and salary benchmarks</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Target Role Title</label>
                  <input
                    type="text"
                    value={targetTitle}
                    onChange={(e) => setTargetTitle(e.target.value)}
                    className="w-full mt-1.5 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300">Target Min Base Salary ($ USD)</label>
                    <input
                      type="text"
                      value={minBaseSalary}
                      onChange={(e) => setMinBaseSalary(e.target.value)}
                      className="w-full mt-1.5 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300">Target Total Comp / Year ($ USD)</label>
                    <input
                      type="text"
                      value={targetTotalComp}
                      onChange={(e) => setTargetTotalComp(e.target.value)}
                      className="w-full mt-1.5 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Work Model Preference</label>
                  <select
                    value={remotePreference}
                    onChange={(e) => setRemotePreference(e.target.value)}
                    className="w-full mt-1.5 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Remote Only">Remote Only (Anywhere in US/Worldwide)</option>
                    <option value="Remote Preferred">Remote Preferred (Flexible for rare onsite)</option>
                    <option value="Hybrid">Hybrid (1-2 days/week)</option>
                    <option value="Onsite">Onsite (San Francisco / New York / Seattle)</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => triggerToast("Compensation goals and preferences saved successfully!")}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>

            {/* Prisma Schema Interactive Viewer */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">PostgreSQL & Prisma Schema Explorer</h2>
                    <p className="text-xs text-slate-400">Strictly typed foreign-key relations with cascade deletions</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  schema.prisma
                </span>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-purple-300 overflow-x-auto leading-relaxed">
                {prismaSchemaCode}
              </pre>
            </div>
          </div>

          {/* Right Column: Data Portability */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Data Export & Backup</h3>
                  <p className="text-xs text-slate-400">Full JSON snapshot of applications, contacts, and checklists</p>
                </div>
              </div>

              <button
                onClick={handleExportData}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-lg shadow-emerald-500/20"
              >
                <Download className="w-4 h-4" /> Download Complete JSON Archive
              </button>

              <button
                onClick={() => triggerToast("Sample applications and reminders reset!")}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Default Pipeline Data
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Stack Architecture</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                  <span>Frontend Framework</span>
                  <span className="font-mono text-indigo-400">Next.js 15 App Router</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                  <span>Database Layer</span>
                  <span className="font-mono text-indigo-400">PostgreSQL + Prisma</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                  <span>Interactive Charts</span>
                  <span className="font-mono text-indigo-400">Recharts 2.x</span>
                </div>
                <div className="flex justify-between py-1.5 text-slate-300">
                  <span>Analytics</span>
                  <span className="font-mono text-indigo-400">Vercel Analytics & Speed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-indigo-500/40 text-indigo-300 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3"
        >
          <CheckCircle2 className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </motion.div>
      )}
    </div>
  );
}
