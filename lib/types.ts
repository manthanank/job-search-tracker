export type ApplicationStage =
  | "WISHLIST"
  | "APPLIED"
  | "SCREENING"
  | "TECHNICAL_INTERVIEW"
  | "OFFER"
  | "REJECTED";

export type JobType = "Remote" | "Hybrid" | "On-site" | "Contract";

export interface Contact {
  id: string;
  name: string;
  role: string;
  email: string;
  linkedIn?: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface JobApplication {
  id: string;
  company: string;
  roleTitle: string;
  stage: ApplicationStage;
  jobType: JobType;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  appliedDate: string; // YYYY-MM-DD
  listingUrl?: string;
  notes?: string;
  priority: 1 | 2 | 3 | 4 | 5; // 1 to 5 stars
  contacts: Contact[];
  checklist: ChecklistItem[];
}

export interface InterviewReminder {
  id: string;
  applicationId: string;
  company: string;
  roleTitle: string;
  title: string;
  scheduledAt: string; // ISO date-time
  interviewType: "Phone Screen" | "Technical" | "System Design" | "Behavioral" | "Executive";
  meetingUrl?: string;
  completed: boolean;
}

export interface PipelineStageInfo {
  id: ApplicationStage;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

