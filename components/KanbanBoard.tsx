"use client";

import React, { useState } from "react";
import { JobApplication, ApplicationStage } from "@/lib/types";
import { STAGES } from "@/lib/mock-data";
import { formatSalary, formatDate } from "@/lib/utils";
import {
  Search,
  Filter,
  Star,
  MapPin,
  ChevronRight,
  ChevronLeft,
  CheckSquare,
  Building2,
  ExternalLink,
} from "lucide-react";

interface KanbanBoardProps {
  applications: JobApplication[];
  onSelectApplication: (app: JobApplication) => void;
  onMoveStage: (id: string, newStage: ApplicationStage) => void;
}

export function KanbanBoard({
  applications,
  onSelectApplication,
  onMoveStage,
}: KanbanBoardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobType, setSelectedJobType] = useState<string>("All");
  const [activeMobileStage, setActiveMobileStage] = useState<ApplicationStage>("APPLIED");

  const stageOrder: ApplicationStage[] = [
    "WISHLIST",
    "APPLIED",
    "SCREENING",
    "TECHNICAL_INTERVIEW",
    "OFFER",
    "REJECTED",
  ];

  const filtered = applications.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.roleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedJobType === "All" || app.jobType === selectedJobType;

    return matchesSearch && matchesType;
  });

  const getNextStage = (current: ApplicationStage): ApplicationStage | null => {
    const idx = stageOrder.indexOf(current);
    if (idx !== -1 && idx < stageOrder.length - 1) return stageOrder[idx + 1];
    return null;
  };

  const getPrevStage = (current: ApplicationStage): ApplicationStage | null => {
    const idx = stageOrder.indexOf(current);
    if (idx > 0) return stageOrder[idx - 1];
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar: Search & Type Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md">
        <div className="relative flex-grow max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search company, role title, city..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {["All", "Remote", "Hybrid", "On-site"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedJobType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedJobType === type
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Stage Selector Tabs (Hidden on tablet/desktop) */}
      <div className="flex md:hidden overflow-x-auto gap-1.5 pb-2 scrollbar-none">
        {STAGES.map((stage) => {
          const count = filtered.filter((a) => a.stage === stage.id).length;
          const isActive = activeMobileStage === stage.id;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveMobileStage(stage.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 border transition-all ${
                isActive
                  ? "bg-indigo-600 text-white border-indigo-500"
                  : "bg-slate-900 border-slate-800 text-slate-400"
              }`}
            >
              <span>{stage.label}</span>
              <span className="px-1.5 py-0.2 rounded-md bg-black/40 text-[10px] font-mono">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Kanban Grid (Desktop / Tablet: 6 horizontal columns; Mobile: Selected Stage column) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto">
        {STAGES.map((stage) => {
          const stageApps = filtered.filter((a) => a.stage === stage.id);
          const isMobileVisible = activeMobileStage === stage.id;

          return (
            <div
              key={stage.id}
              className={`flex flex-col rounded-2xl border ${stage.borderColor} bg-slate-950/60 p-3 min-w-[240px] md:min-w-0 ${
                isMobileVisible ? "flex" : "hidden md:flex"
              }`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <span className={`text-xs font-bold ${stage.color} flex items-center gap-1.5`}>
                  <span>{stage.label}</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-900 text-slate-400 border border-slate-800">
                  {stageApps.length}
                </span>
              </div>

              {/* Cards List */}
              <div className="space-y-3 flex-grow">
                {stageApps.length === 0 ? (
                  <div className="py-8 text-center text-slate-600 text-[11px] font-mono">
                    No roles in {stage.label}
                  </div>
                ) : (
                  stageApps.map((app) => {
                    const completedTasks = app.checklist.filter((c) => c.isCompleted).length;
                    const nextStage = getNextStage(app.stage);
                    const prevStage = getPrevStage(app.stage);

                    return (
                      <div
                        key={app.id}
                        className="rounded-xl border border-slate-800/80 bg-slate-900/90 p-3.5 shadow-md hover:border-slate-700 hover:bg-slate-900 transition-all cursor-pointer group"
                        onClick={() => onSelectApplication(app)}
                      >
                        {/* Company & Priority */}
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="font-bold text-xs text-white group-hover:text-indigo-300 transition-colors truncate">
                            {app.company}
                          </span>
                          <span className="flex items-center text-amber-400 text-[10px] font-mono">
                            <Star className="h-3 w-3 fill-amber-400 inline" />
                            {app.priority}
                          </span>
                        </div>

                        {/* Role Title */}
                        <h4 className="text-xs font-semibold text-slate-200 line-clamp-1">
                          {app.roleTitle}
                        </h4>

                        {/* Salary & Location */}
                        <div className="mt-2 space-y-1 text-[11px] font-mono text-slate-400">
                          <div className="text-emerald-400 font-semibold truncate">
                            {formatSalary(app.salaryMin, app.salaryMax)}
                          </div>
                          <div className="flex items-center gap-1 text-slate-500 truncate">
                            <MapPin className="h-3 w-3 shrink-0" />
                            <span className="truncate">{app.location}</span>
                          </div>
                        </div>

                        {/* Checklist progress */}
                        {app.checklist.length > 0 && (
                          <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                            <span className="flex items-center gap-1">
                              <CheckSquare className="h-3 w-3 text-indigo-400" />
                              <span>Checklist:</span>
                            </span>
                            <span>
                              {completedTasks}/{app.checklist.length}
                            </span>
                          </div>
                        )}

                        {/* Move stage buttons */}
                        <div
                          className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {prevStage ? (
                            <button
                              onClick={() => onMoveStage(app.id, prevStage)}
                              className="p-1 rounded text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
                              title={`Move to ${prevStage}`}
                            >
                              <ChevronLeft className="h-3.5 w-3.5" />
                            </button>
                          ) : (
                            <div className="w-5" />
                          )}

                          <span className="text-[9px] font-mono uppercase text-slate-500">
                            {app.jobType}
                          </span>

                          {nextStage ? (
                            <button
                              onClick={() => onMoveStage(app.id, nextStage)}
                              className="p-1 rounded text-slate-500 hover:text-indigo-400 hover:bg-slate-800 transition-colors"
                              title={`Advance to ${nextStage}`}
                            >
                              <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                          ) : (
                            <div className="w-5" />
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

