# HuntFlow - Job Search & Application Tracker AI System Context

This document provides system context, relational models, and architectural specifications for AI assistants working on HuntFlow.

---

## 1. Project Overview
- **Project**: Job Search & Application Tracker (Project 03 of the 10-Project Full-Stack Suite)
- **Author**: Manthan Ank
- **Framework**: Next.js 15 (App Router, Server & Client Components)
- **Language**: Strict TypeScript
- **Database & ORM**: PostgreSQL with Prisma ORM
- **Visual Board**: Multi-column Kanban board with stage advancement logic
- **Observability**: `@vercel/analytics` and `@vercel/speed-insights`
- **Styling**: Tailwind CSS (dark mode theme) with Framer Motion animations

---

## 2. Core Modules & Relational Models
- `prisma/schema.prisma`: Relational models (`Company`, `JobApplication`, `Contact`, `InterviewReminder`, `ChecklistTask`) with cascade deletes and stage indexes.
- `lib/types.ts`: TypeScript contracts for `ApplicationStage`, `JobApplication`, `Contact`, `InterviewReminder`.
- `lib/mock-data.ts`: Pre-populated sample job applications, interview reminders, and pipeline stages for zero-config offline demonstration.
- `lib/ai-career.ts`: Career heuristics, interview preparation suggestions, and funnel metrics calculation.
- `components/KanbanBoard.tsx`: Multi-stage recruitment board with search, filtering, and rapid stage advancement.
- `components/InterviewRemindersWidget.tsx`: Interview scheduling monitor with direct meeting links.

---

## 3. Responsive Principles
- Desktop/Tablet: 6-column horizontally arranged Kanban pipeline.
- Mobile: Stage tab selector to view individual recruitment stages cleanly without horizontal scroll fatigue.

