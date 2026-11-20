"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell, PieChart, Pie 
} from "recharts";
import { 
  TrendingUp, Award, Clock, ArrowUpRight, CheckCircle2, 
  Sparkles, Filter, Briefcase, Zap 
} from "lucide-react";

export default function AnalyticsPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Conversion Funnel Data
  const funnelData = [
    { stage: "Applications", count: 48, rate: "100%", fill: "#6366f1" },
    { stage: "Recruiter Screen", count: 26, rate: "54.2%", fill: "#818cf8" },
    { stage: "Technical Round", count: 14, rate: "29.2%", fill: "#38bdf8" },
    { stage: "System Design", count: 9, rate: "18.8%", fill: "#06b6d4" },
    { stage: "Final Executive", count: 6, rate: "12.5%", fill: "#10b981" },
    { stage: "Official Offers", count: 3, rate: "6.25%", fill: "#34d399" },
  ];

  // Compensation Distribution Data
  const salaryCompData = [
    { company: "Vercel", base: 175, equity: 65, bonus: 25, total: 265 },
    { company: "Stripe", base: 195, equity: 85, bonus: 30, total: 310 },
    { company: "Linear", base: 180, equity: 70, bonus: 20, total: 270 },
    { company: "Supabase", base: 165, equity: 50, bonus: 20, total: 235 },
    { company: "Cloudflare", base: 185, equity: 75, bonus: 25, total: 285 },
  ];

  // Interview Outcome Breakdown
  const outcomeData = [
    { name: "Active Negotiations", value: 3, color: "#10b981" },
    { name: "In Progress Rounds", value: 8, color: "#6366f1" },
    { name: "Declined by Candidate", value: 4, color: "#f59e0b" },
    { name: "Position Closed", value: 12, color: "#64748b" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Pipeline Funnel & Conversion Analytics
            </h1>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-time progression rates, interview velocity, offer benchmarks, and drop-off diagnostics.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Offer Rate: Top 5% Industry Percentile</span>
          </div>
        </div>

        {/* 4 Analytics Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Application to Screen", val: "54.2%", change: "+14.6%", sub: "vs 18% avg benchmark" },
            { label: "Screen to Final Round", val: "23.1%", change: "+6.8%", sub: "Strong tech pass rate" },
            { label: "Avg Velocity to Offer", val: "18 Days", change: "-4 Days", sub: "Fast recruitment cycle" },
            { label: "Median Offered TC", val: "$270,000", change: "+18.4%", sub: "Above initial target" }
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800"
            >
              <div className="text-xs font-semibold text-slate-400">{item.label}</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5">{item.val}</div>
              <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-400">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{item.change}</span>
                <span className="text-slate-500 text-[11px] font-normal">({item.sub})</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Funnel Graph & Outcome Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Funnel Chart */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Full-Cycle Pipeline Conversion Drop-off</h3>
                <p className="text-xs text-slate-400">Candidate flow from cold application to final offer acceptance</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                48 Candidates Evaluated
              </span>
            </div>

            <div className="h-72 w-full pt-4">
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis type="number" stroke="#64748b" fontSize={11} />
                    <YAxis dataKey="stage" type="category" stroke="#94a3b8" fontSize={12} width={110} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#fff" }}
                      formatter={(val, name, item) => [`${val} roles (${item.payload.rate} conversion)`, "Candidates"]}
                    />
                    <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                      {funnelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Outcome Pie */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-base font-bold text-white">Active Stage Allocation</h3>
              <p className="text-xs text-slate-400">Current status of all logged applications</p>
            </div>

            <div className="h-56 w-full flex items-center justify-center">
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={outcomeData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                    >
                      {outcomeData.map((entry, index) => (
                        <Cell key={`pie-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#fff" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              {outcomeData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-300">{item.name}</span>
                  </div>
                  <span className="font-bold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Compensation Breakdown Graph */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-white">Offer Compensation Benchmarks ($k Annualized)</h3>
              <p className="text-xs text-slate-400">Stacked comparison of Base Salary, Annual Equity Grant, and Performance Bonus</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-indigo-400">
                <span className="w-2.5 h-2.5 rounded bg-indigo-500" /> Base
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2.5 h-2.5 rounded bg-cyan-400" /> Equity
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded bg-emerald-400" /> Bonus
              </span>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salaryCompData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                  <XAxis dataKey="company" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={11} unit="k" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#fff" }}
                    formatter={(val) => [`$${val},000`, '']}
                  />
                  <Bar dataKey="base" stackId="a" fill="#6366f1" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="equity" stackId="a" fill="#38bdf8" />
                  <Bar dataKey="bonus" stackId="a" fill="#34d399" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
