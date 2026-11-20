"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { LiveJob } from "@/app/api/jobs/feed/route";
import {
  Globe,
  Search,
  Building2,
  MapPin,
  ExternalLink,
  PlusCircle,
  CheckCircle2,
  Sparkles,
  Briefcase,
  Radio,
  Tag,
  Filter,
} from "lucide-react";

export default function LiveJobsPage() {
  const [jobs, setJobs] = useState<LiveJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [addedJobs, setAddedJobs] = useState<Record<string, boolean>>({});
  const [totalCount, setTotalCount] = useState(0);

  const filterTags = ["All", "React", "TypeScript", "Node.js", "Python", "DevOps", "AI", "Remote"];

  const fetchJobs = (searchQuery = "", tag = "") => {
    setLoading(true);
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (tag && tag !== "All") params.set("tag", tag);

    fetch(`/api/jobs/feed?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.jobs && Array.isArray(data.jobs)) {
          setJobs(data.jobs);
          setTotalCount(data.totalCount || data.jobs.length);
        }
      })
      .catch((err) => console.error("Failed to load live jobs:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs(query, selectedTag);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    fetchJobs(query, tag);
  };

  const handleAddToTracker = async (job: LiveJob) => {
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: job.companyName,
          roleTitle: job.title,
          stage: "WISHLIST",
          jobType: job.remote ? "Remote" : "Hybrid",
          location: job.location,
          listingUrl: job.url,
          notes: `Added from Live Tech Job Radar. Tags: ${job.tags.join(", ")}`,
          priority: 4,
        }),
      });

      if (res.ok) {
        setAddedJobs((prev) => ({ ...prev, [job.id]: true }));
        // Also persist locally
        try {
          const stored = localStorage.getItem("huntflow_applications");
          const apps = stored ? JSON.parse(stored) : [];
          apps.unshift({
            id: `app-${Date.now()}`,
            company: job.companyName,
            roleTitle: job.title,
            stage: "WISHLIST",
            jobType: job.remote ? "Remote" : "Hybrid",
            location: job.location,
            appliedDate: new Date().toISOString().split("T")[0],
            listingUrl: job.url,
            notes: `Added from Live Job Radar. Tags: ${job.tags.join(", ")}`,
            priority: 4,
            contacts: [],
            checklist: [
              { id: `cl-${Date.now()}-1`, text: "Review job description & requirements", isCompleted: true },
              { id: `cl-${Date.now()}-2`, text: "Tailor CV and submit application", isCompleted: false },
            ],
          });
          localStorage.setItem("huntflow_applications", JSON.stringify(apps));
        } catch (e) {}
      }
    } catch (err) {
      console.error("Failed to add to tracker:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Radio className="h-3 w-3 animate-pulse" />
                <span>Live External Job Feed</span>
              </span>
              <span className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-full">
                {totalCount} Active Positions
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Live Tech Job Radar
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Real-time engineering job listings synced from verified public career boards. Explore live positions and 1-click import directly into your Kanban pipeline.
            </p>
          </div>

          <Link
            href="/board"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all self-start md:self-auto"
          >
            <Briefcase className="h-4 w-4" />
            <span>View Kanban Board</span>
          </Link>
        </div>

        {/* Search & Tag Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md">
          <form onSubmit={handleSearch} className="relative flex-grow max-w-lg flex items-center gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search live jobs by title, company, or tech stack..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-colors"
            >
              Search
            </button>
          </form>

          {/* Quick Tag Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filterTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedTag === tag
                    ? "bg-indigo-600 text-white font-semibold"
                    : "bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs Feed Grid */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="h-8 w-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-mono text-slate-400">Fetching live positions from career boards...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="py-16 text-center rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
            <Briefcase className="h-10 w-10 text-slate-600 mx-auto mb-2" />
            <h3 className="text-base font-bold text-white">No Jobs Found</h3>
            <p className="text-xs text-slate-400 mt-1">Try another search query or tag filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map((job) => {
              const isAdded = addedJobs[job.id];
              return (
                <div
                  key={job.id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/50 p-5 hover:border-slate-700 hover:bg-slate-900/80 transition-all group"
                >
                  <div className="space-y-3">
                    {/* Top Row: Company & Location */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs uppercase">
                          {job.companyName.substring(0, 2)}
                        </div>
                        <div>
                          <div className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors">
                            {job.companyName}
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-slate-400">
                            <MapPin className="h-3 w-3" />
                            <span>{job.location}</span>
                          </div>
                        </div>
                      </div>

                      {job.remote && (
                        <span className="text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                          Remote
                        </span>
                      )}
                    </div>

                    {/* Job Title */}
                    <h3 className="text-base font-bold text-white leading-snug">
                      {job.title}
                    </h3>

                    {/* Description Snippet */}
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Tags */}
                    {job.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {job.tags.slice(0, 4).map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions Bottom Bar */}
                  <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-300 font-medium transition-colors"
                    >
                      <span>Posting</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    <button
                      onClick={() => handleAddToTracker(job)}
                      disabled={isAdded}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isAdded
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default"
                          : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Added to Pipeline</span>
                        </>
                      ) : (
                        <>
                          <PlusCircle className="h-3.5 w-3.5" />
                          <span>Track Application</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

