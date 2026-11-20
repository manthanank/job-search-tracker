"use client";

import React, { useState, useEffect } from "react";
import { INITIAL_APPLICATIONS, INITIAL_REMINDERS } from "@/lib/mock-data";
import { JobApplication, InterviewReminder, ApplicationStage } from "@/lib/types";
import { Navbar } from "@/components/Navbar";
import { PipelineMetrics } from "@/components/PipelineMetrics";
import { InterviewRemindersWidget } from "@/components/InterviewRemindersWidget";
import { KanbanBoard } from "@/components/KanbanBoard";
import { AddApplicationModal } from "@/components/AddApplicationModal";
import { ApplicationDetailModal } from "@/components/ApplicationDetailModal";
import { AiCareerModal } from "@/components/AiCareerModal";
import { Database, Sparkles } from "lucide-react";

export default function JobBoardPage() {
  const [applications, setApplications] = useState<JobApplication[]>(INITIAL_APPLICATIONS);
  const [reminders, setReminders] = useState<InterviewReminder[]>(INITIAL_REMINDERS);

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [isAiOpen, setIsAiOpen] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const storedApps = localStorage.getItem("huntflow_applications");
      if (storedApps) setApplications(JSON.parse(storedApps));

      const storedRems = localStorage.getItem("huntflow_reminders");
      if (storedRems) setReminders(JSON.parse(storedRems));
    } catch (e) {
      // Fallback silently to mock state
    }
  }, []);

  // Save changes
  const saveApplications = (newApps: JobApplication[]) => {
    setApplications(newApps);
    try {
      localStorage.setItem("huntflow_applications", JSON.stringify(newApps));
    } catch (e) {}
  };

  const saveReminders = (newRems: InterviewReminder[]) => {
    setReminders(newRems);
    try {
      localStorage.setItem("huntflow_reminders", JSON.stringify(newRems));
    } catch (e) {}
  };

  // Handlers
  const handleAddApplication = (
    data: Omit<JobApplication, "id" | "contacts" | "checklist">
  ) => {
    const newApp: JobApplication = {
      ...data,
      id: `app-${Date.now()}`,
      contacts: [],
      checklist: [
        { id: `chk-${Date.now()}-1`, text: "Review job description requirements", isCompleted: true },
        { id: `chk-${Date.now()}-2`, text: "Tailor resume highlights for role", isCompleted: false },
      ],
    };

    saveApplications([newApp, ...applications]);
  };

  const handleMoveStage = (id: string, newStage: ApplicationStage) => {
    const updated = applications.map((a) => (a.id === id ? { ...a, stage: newStage } : a));
    saveApplications(updated);

    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({ ...selectedApp, stage: newStage });
    }
  };

  const handleToggleChecklist = (appId: string, checkId: string) => {
    const updated = applications.map((a) => {
      if (a.id !== appId) return a;
      const updatedChecklist = a.checklist.map((c) =>
        c.id === checkId ? { ...c, isCompleted: !c.isCompleted } : c
      );
      return { ...a, checklist: updatedChecklist };
    });
    saveApplications(updated);

    if (selectedApp && selectedApp.id === appId) {
      const updatedSelected = updated.find((a) => a.id === appId) || null;
      setSelectedApp(updatedSelected);
    }
  };

  const handleAddChecklistTask = (appId: string, text: string) => {
    const updated = applications.map((a) => {
      if (a.id !== appId) return a;
      const newTask = { id: `chk-${Date.now()}`, text, isCompleted: false };
      return { ...a, checklist: [...a.checklist, newTask] };
    });
    saveApplications(updated);

    if (selectedApp && selectedApp.id === appId) {
      const updatedSelected = updated.find((a) => a.id === appId) || null;
      setSelectedApp(updatedSelected);
    }
  };

  const handleDeleteApplication = (id: string) => {
    const updated = applications.filter((a) => a.id !== id);
    saveApplications(updated);
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp(null);
    }
  };

  const handleToggleReminder = (id: string) => {
    const updated = reminders.map((r) =>
      r.id === id ? { ...r, completed: !r.completed } : r
    );
    saveReminders(updated);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar
        onOpenAddModal={() => setIsAddOpen(true)}
        onOpenAiModal={() => setIsAiOpen(true)}
      />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full space-y-6">
        {/* PostgreSQL Schema Banner */}
        <div className="p-3 sm:p-4 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-6 rounded-md bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Database className="h-3.5 w-3.5" />
            </div>
            <div>
              <span className="font-semibold text-white">Relational Data Engine</span>:{" "}
              <span className="text-slate-400">
                Prisma ORM models configured with company, contact, and interview cascades.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px] self-end sm:self-auto">
            <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
            <span>Interactive 6-Stage Kanban Pipeline</span>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <PipelineMetrics applications={applications} />

        {/* Interview Schedule Reminders */}
        <InterviewRemindersWidget
          reminders={reminders}
          onToggleReminder={handleToggleReminder}
        />

        {/* Kanban Board */}
        <KanbanBoard
          applications={applications}
          onSelectApplication={(app) => setSelectedApp(app)}
          onMoveStage={handleMoveStage}
        />
      </main>

      {/* Floating Mobile AI Trigger */}
      <div className="fixed bottom-6 right-6 md:hidden z-40">
        <button
          onClick={() => setIsAiOpen(true)}
          className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white flex items-center justify-center shadow-2xl shadow-indigo-500/40 cursor-pointer"
          aria-label="Ask JobAI"
        >
          <Sparkles className="h-5 w-5" />
        </button>
      </div>

      {/* Modals */}
      <AddApplicationModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAddApplication={handleAddApplication}
      />

      <ApplicationDetailModal
        application={selectedApp}
        onClose={() => setSelectedApp(null)}
        onUpdateStage={handleMoveStage}
        onToggleChecklist={handleToggleChecklist}
        onAddChecklistTask={handleAddChecklistTask}
        onDeleteApplication={handleDeleteApplication}
      />

      <AiCareerModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        applications={applications}
        reminders={reminders}
      />
    </div>
  );
}
