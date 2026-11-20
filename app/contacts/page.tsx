"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { 
  Users, Mail, Linkedin, Plus, Search, Building2, 
  Phone, Calendar, CheckCircle2, MessageSquare, ArrowUpRight 
} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  role: string;
  company: string;
  type: "Recruiter" | "Hiring Manager" | "Referral" | "Peer";
  email: string;
  linkedin: string;
  lastContact: string;
  status: "Active Discussion" | "Follow-up Needed" | "Intro Made";
  notes: string;
}

const INITIAL_CONTACTS: Contact[] = [
  {
    id: "cnt-1",
    name: "Elena Rostova",
    role: "Staff Technical Recruiter",
    company: "Vercel",
    type: "Recruiter",
    email: "elena.rostova@vercel.com",
    linkedin: "https://linkedin.com/in/elena-rostova",
    lastContact: "Yesterday",
    status: "Active Discussion",
    notes: "Coordinating VP of Engineering final sync for Next.js Infrastructure role."
  },
  {
    id: "cnt-2",
    name: "Marcus Vance",
    role: "Engineering Director",
    company: "Stripe",
    type: "Hiring Manager",
    email: "mvance@stripe.com",
    linkedin: "https://linkedin.com/in/marcus-vance",
    lastContact: "3 days ago",
    status: "Active Discussion",
    notes: "Led the architecture round. Very interested in distributed systems experience."
  },
  {
    id: "cnt-3",
    name: "Sophia Zhang",
    role: "Senior Staff Engineer",
    company: "Linear",
    type: "Referral",
    email: "sophia@linear.app",
    linkedin: "https://linkedin.com/in/sophia-zhang",
    lastContact: "May 12",
    status: "Intro Made",
    notes: "Submitted internal warm referral for Frontend Systems Architect."
  },
  {
    id: "cnt-4",
    name: "David Kim",
    role: "Head of Talent",
    company: "Supabase",
    type: "Recruiter",
    email: "david.kim@supabase.io",
    linkedin: "https://linkedin.com/in/david-kim",
    lastContact: "May 10",
    status: "Follow-up Needed",
    notes: "Need to confirm timeline for take-home review with Postgres core team."
  },
  {
    id: "cnt-5",
    name: "Amara Patel",
    role: "Principal Architect",
    company: "Cloudflare",
    type: "Referral",
    email: "amara.p@cloudflare.com",
    linkedin: "https://linkedin.com/in/amara-patel",
    lastContact: "May 14",
    status: "Active Discussion",
    notes: "Discussed Workers KV & edge computing scale challenges."
  }
];

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    role: "",
    company: "",
    type: "Recruiter" as Contact["type"],
    email: "",
    linkedin: "",
    notes: ""
  });

  const filteredContacts = contacts.filter((c) => {
    const matchesSearch = 
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType === "All" || c.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContact.name || !newContact.company) return;

    const created: Contact = {
      id: `cnt-${Date.now()}`,
      name: newContact.name,
      role: newContact.role || "Contact",
      company: newContact.company,
      type: newContact.type,
      email: newContact.email || "pending@company.com",
      linkedin: newContact.linkedin || "#",
      lastContact: "Today",
      status: "Active Discussion",
      notes: newContact.notes || "Initial contact logged."
    };

    setContacts([created, ...contacts]);
    setIsModalOpen(false);
    setNewContact({
      name: "",
      role: "",
      company: "",
      type: "Recruiter",
      email: "",
      linkedin: "",
      notes: ""
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Recruiter & Referral CRM
            </h1>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Manage hiring managers, talent partners, and employee advocates across target enterprises.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Connection</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by name, company, or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {["All", "Recruiter", "Hiring Manager", "Referral", "Peer"].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  selectedType === t
                    ? "bg-indigo-600/20 border border-indigo-500/40 text-indigo-300"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredContacts.map((c, idx) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm">
                      {c.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">{c.name}</h3>
                      <p className="text-xs text-slate-400">{c.role}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                    c.type === "Hiring Manager" 
                      ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
                      : c.type === "Referral"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                  }`}>
                    {c.type}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    <span className="font-semibold text-white">{c.company}</span>
                  </div>
                  <p className="text-xs text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60 italic leading-relaxed">
                    "{c.notes}"
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500">Contact: {c.lastContact}</span>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${c.email}`}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                    title={c.email}
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={c.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl"
          >
            <h2 className="text-lg font-bold text-white">Add Professional Connection</h2>
            <form onSubmit={handleAddContact} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-400">Full Name *</label>
                <input
                  required
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  placeholder="e.g. Jessica Chen"
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400">Company *</label>
                  <input
                    required
                    type="text"
                    value={newContact.company}
                    onChange={(e) => setNewContact({ ...newContact, company: e.target.value })}
                    placeholder="e.g. Datadog"
                    className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400">Relationship Type</label>
                  <select
                    value={newContact.type}
                    onChange={(e) => setNewContact({ ...newContact, type: e.target.value as Contact["type"] })}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
                  >
                    <option value="Recruiter">Recruiter</option>
                    <option value="Hiring Manager">Hiring Manager</option>
                    <option value="Referral">Internal Referral</option>
                    <option value="Peer">Engineering Peer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400">Role / Title</label>
                <input
                  type="text"
                  value={newContact.role}
                  onChange={(e) => setNewContact({ ...newContact, role: e.target.value })}
                  placeholder="e.g. Principal Engineering Recruiter"
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400">Email Address</label>
                <input
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400">Notes & Context</label>
                <textarea
                  rows={2}
                  value={newContact.notes}
                  onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
                  placeholder="Key discussion points or intro context..."
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  Save Connection
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
