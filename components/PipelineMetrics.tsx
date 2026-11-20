"use client";

import React from "react";
import { JobApplication } from "@/lib/types";
import { Briefcase, Video, Award, Target, TrendingUp } from "lucide-react";

interface PipelineMetricsProps {
  applications: JobApplication[];
}

export function PipelineMetrics({ applications }: PipelineMetricsProps) {
  const total = applications.length;
  const active = applications.filter((a) => a.stage !== "REJECTED" && a.stage !== "WISHLIST");
  const inInterview = applications.filter(
    (a) => a.stage === "SCREENING" || a.stage === "TECHNICAL_INTERVIEW"
  );
  const offers = applications.filter((a) => a.stage === "OFFER");
  const conversionRate = total > 0 ? Math.round((inInterview.length / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Active Pipeline Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md shadow-lg">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>Active Pipeline</span>
          <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Briefcase className="h-4 w-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
          {active.length}{" "}
          <span className="text-xs font-normal text-slate-500 font-sans">of {total} total</span>
        </div>
        <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
          <span>Under active recruitment</span>
        </div>
      </div>

      {/* In Interview Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md shadow-lg">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>Interview Stages</span>
          <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Video className="h-4 w-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
          {inInterview.length}
        </div>
        <div className="mt-2 text-xs text-slate-400">Screening & Technical Rounds</div>
      </div>

      {/* Offers Received Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md shadow-lg">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>Offers Secured</span>
          <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Award className="h-4 w-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
          {offers.length}
        </div>
        <div className="mt-2 text-xs text-emerald-400 font-mono flex items-center gap-1">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>Ready for negotiation</span>
        </div>
      </div>

      {/* Conversion Rate Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md shadow-lg">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>Interview Funnel</span>
          <div className="h-8 w-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Target className="h-4 w-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">
          {conversionRate}%
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
              style={{ width: `${Math.min(100, conversionRate)}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-slate-400 shrink-0">Benchmark: 12%</span>
        </div>
      </div>
    </div>
  );
}

