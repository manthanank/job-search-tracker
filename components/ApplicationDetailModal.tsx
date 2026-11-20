"use client";

import React, { useState } from "react";
import { JobApplication, ApplicationStage } from "@/lib/types";
import { STAGES } from "@/lib/mock-data";
import { formatSalary, formatDate } from "@/lib/utils";
import {
  X,
  ExternalLink,
  Trash2,
  CheckSquare,
  Square,
  Plus,
  Mail,
  User,
  Star,
  Building2,
  MapPin,
} from "lucide-react";

interface ApplicationDetailModalProps {
  application: JobApplication | null;
  onClose: () => void;
  onUpdateStage: (id: string, stage: ApplicationStage) => void;
  onToggleChecklist: (appId: string, checkId: string) => void;
  onAddChecklistTask: (appId: string, text: string) => void;
  onDeleteApplication: (id: string) => void;
}

export function ApplicationDetailModal({
  application,
  onClose,
  onUpdateStage,
  onToggleChecklist,
  onAddChecklistTask,
  onDeleteApplication,
}: ApplicationDetailModalProps) {
  const [newTaskText, setNewTaskText] = useState("");

  if (!application) return null;

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    onAddChecklistTask(application.id, newTaskText.trim());
    setNewTaskText("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl max-h-[90vh] flex flex-col rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl space-y-4 overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">{application.company}</span>
              <span className="text-xs text-amber-400 font-mono">
                {"★".repeat(application.priority)}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-indigo-400 mt-0.5">
              {application.roleTitle}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Stage Selector & Details Bar */}
        <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-mono">Stage</span>
            <select
              value={application.stage}
              onChange={(e) => onUpdateStage(application.id, e.target.value as ApplicationStage)}
              className="mt-1 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-slate-200 text-xs w-full focus:outline-none focus:border-indigo-500"
            >
              {STAGES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-mono">Target Salary</span>
            <span className="font-mono text-emerald-400 font-bold block mt-1">
              {formatSalary(application.salaryMin, application.salaryMax)}
            </span>
          </div>

          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-mono">Workplace</span>
            <span className="text-slate-300 block mt-1">
              {application.jobType} • {application.location}
            </span>
          </div>

          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-mono">Applied Date</span>
            <span className="text-slate-300 block mt-1">{formatDate(application.appliedDate)}</span>
          </div>
        </div>

        {/* Listing Link */}
        {application.listingUrl && (
          <div className="flex items-center justify-between text-xs p-2.5 rounded-xl border border-slate-800/80 bg-slate-950/40">
            <span className="text-slate-400 truncate max-w-sm font-mono text-[11px]">
              {application.listingUrl}
            </span>
            <a
              href={application.listingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium"
            >
              <span>Open Posting</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        )}

        {/* Notes */}
        {application.notes && (
          <div>
            <h4 className="text-xs font-semibold text-slate-300 mb-1">Interview & Strategy Notes</h4>
            <p className="text-xs text-slate-400 p-3 rounded-xl border border-slate-800/80 bg-slate-900/40 leading-relaxed">
              {application.notes}
            </p>
          </div>
        )}

        {/* Checklist */}
        <div>
          <h4 className="text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
            <span>Preparation Checklist</span>
            <span className="text-[10px] font-mono text-slate-500">
              {application.checklist.filter((c) => c.isCompleted).length}/{application.checklist.length} Completed
            </span>
          </h4>

          <div className="space-y-1.5 mb-3">
            {application.checklist.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No preparation tasks yet.</p>
            ) : (
              application.checklist.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onToggleChecklist(application.id, task.id)}
                  className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/40 hover:bg-slate-900 text-xs cursor-pointer transition-colors"
                >
                  {task.isCompleted ? (
                    <CheckSquare className="h-4 w-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Square className="h-4 w-4 text-slate-500 shrink-0" />
                  )}
                  <span
                    className={`${
                      task.isCompleted ? "line-through text-slate-500" : "text-slate-200"
                    }`}
                  >
                    {task.text}
                  </span>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleAddTask} className="flex gap-2">
            <input
              type="text"
              placeholder="Add checklist item (e.g. system design prep)..."
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              className="flex-grow rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
            >
              Add
            </button>
          </form>
        </div>

        {/* Contacts */}
        {application.contacts.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-slate-300 mb-2">Recruiters & Contacts</h4>
            <div className="space-y-1.5">
              {application.contacts.map((c) => (
                <div
                  key={c.id}
                  className="p-2.5 rounded-xl border border-slate-800/80 bg-slate-900/40 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <User className="h-3.5 w-3.5 text-indigo-400" />
                    <span className="font-semibold text-white">{c.name}</span>
                    <span className="text-slate-500 font-mono text-[10px]">({c.role})</span>
                  </div>
                  <a
                    href={`mailto:${c.email}`}
                    className="flex items-center gap-1 text-slate-400 hover:text-indigo-400 text-[11px]"
                  >
                    <Mail className="h-3 w-3" />
                    <span>{c.email}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              if (confirm(`Remove ${application.company} from your pipeline?`)) {
                onDeleteApplication(application.id);
                onClose();
              }
            }}
            className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete Role</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

