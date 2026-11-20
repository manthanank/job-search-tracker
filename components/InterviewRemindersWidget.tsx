"use client";

import React from "react";
import { InterviewReminder } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";
import { Calendar, Video, ExternalLink, CheckCircle, Clock } from "lucide-react";

interface InterviewRemindersWidgetProps {
  reminders: InterviewReminder[];
  onToggleReminder: (id: string) => void;
}

export function InterviewRemindersWidget({
  reminders,
  onToggleReminder,
}: InterviewRemindersWidgetProps) {
  const pendingReminders = reminders.filter((r) => !r.completed);

  if (pendingReminders.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Calendar className="h-4 w-4 text-indigo-400" />
            <span>Upcoming Interview Schedule</span>
          </h3>
          <span className="text-xs text-slate-500 font-mono">0 Pending</span>
        </div>
        <p className="mt-3 text-xs text-slate-400">
          No interviews scheduled. Good time to follow up with recruiters or send outreach notes!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Calendar className="h-4 w-4 text-indigo-400" />
          <span>Upcoming Interview Schedule</span>
        </h3>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
          {pendingReminders.length} Sessions Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {pendingReminders.map((rem) => (
          <div
            key={rem.id}
            className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/80 flex flex-col justify-between gap-3 hover:border-slate-700 transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>{rem.company}</span>
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {rem.interviewType}
                </span>
              </div>
              <h4 className="text-xs font-semibold text-slate-200 mt-1 line-clamp-1">
                {rem.title}
              </h4>
              <p className="text-[11px] text-slate-400 font-mono mt-1 flex items-center gap-1.5">
                <Clock className="h-3 w-3 text-slate-500" />
                <span>{formatDateTime(rem.scheduledAt)}</span>
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
              {rem.meetingUrl ? (
                <a
                  href={rem.meetingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-medium text-indigo-400 hover:text-indigo-300 text-xs"
                >
                  <Video className="h-3.5 w-3.5" />
                  <span>Join Meeting</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <span className="text-slate-500 text-[11px]">Direct Link Pending</span>
              )}

              <button
                onClick={() => onToggleReminder(rem.id)}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
              >
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Mark Done</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

