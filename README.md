# HuntFlow — Job Search & Application Tracker

> Comprehensive career pipeline CRM and recruitment tracker with multi-column visual Kanban board, Prisma PostgreSQL schema, interview calendar alerts, salary insights, and JobAI career guidance.

Part of the **10-Project Full-Stack Suite** by [Manthan Ank](https://github.com/manthanank).

---

## 🚀 Key Features & Capabilities

- **Live Tech Job Radar (`/jobs` & `/api/jobs/feed`)**: Real-time integration with verified tech job feeds delivering 300+ active remote engineering positions from Stripe, Amazon, Spotify, etc., with 1-click "Add to Pipeline" import.
- **Dynamic Applications REST API (`/api/applications`)**: Full server-side CRUD supporting live search, stage updates, priority adjustments, and dynamic relative-date tracking.
- **Multi-Stage Kanban Board**: Visual workflow covering 6 recruitment stages (`Wishlist`, `Applied`, `Recruiter Screen`, `Tech Interview`, `Offer Received`, `Archived`).
- **Interactive Stage Progression**: Advance or regress applications across pipeline columns with 1-click stage controls.
- **Detailed Opportunity Inspection**:
  - Modal with company, role, workplace type (Remote/Hybrid), applied date, and priority stars.
  - Interactive preparation checklist with task addition and checkbox completion.
  - Recruiter contact directory (email, phone, LinkedIn).
- **Interview Reminder Alerts**: Scheduled interview widget with countdown, date/time, interview type pills, and direct meeting links.
- **Recruitment Funnel Analytics**:
  - Real-time conversion velocity (total roles, active pipeline, in-interview, offers in hand).
  - Benchmark comparison against industry averages.
- **JobAI Career Copilot**: Contextual AI assistant analyzing your active pipeline, offering STAR interview preparation tips, and calculating compensation ranges.
- **Prisma PostgreSQL Relational Schema**: Clean relational schema (`prisma/schema.prisma`) modeling companies, applications, contacts, and reminders.
- **Device Responsiveness**: Desktop 6-column pipeline view; Mobile tabbed stage selector to navigate stages effortlessly.
- **Observability**: Built-in `@vercel/analytics` and `@vercel/speed-insights`.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, React 19)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS, PostCSS, Lucide Icons, Framer Motion
- **ORM & DB**: Prisma ORM with PostgreSQL
- **Deployment**: Vercel

---

## 📦 Getting Started

1. Navigate to the project directory:
   ```bash
   cd c:\Users\manth\projects\job-search-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Run Prisma Client generation:
   ```bash
   npx prisma generate
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

