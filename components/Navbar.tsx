"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  PlusCircle,
  Sparkles,
  Menu,
  X,
  Database,
  BarChart2,
  Users,
  CalendarDays,
  Settings,
  Layers,
  ExternalLink,
  Globe,
  LogIn,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface NavbarProps {
  onOpenAddModal?: () => void;
  onOpenAiModal?: () => void;
}

export function Navbar({ onOpenAddModal, onOpenAiModal }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, login, logout, isAuthenticated } = useAuth();

  const navLinks = [
    { label: "Overview", href: "/", icon: Layers },
    { label: "Pipeline Board", href: "/board", icon: Briefcase },
    { label: "Live Job Radar", href: "/jobs", icon: Globe },
    { label: "Funnel Analytics", href: "/analytics", icon: BarChart2 },
    { label: "Network & CRM", href: "/contacts", icon: Users },
    { label: "Interviews", href: "/interviews", icon: CalendarDays },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-white text-base tracking-tight flex items-center gap-2">
                <span>HuntFlow</span>
                <span className="hidden xl:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Database className="h-3 w-3" />
                  <span>Prisma + Postgres</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Career Pipeline & Application Command Center</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 border-l border-slate-800 pl-6">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? "bg-indigo-600/15 text-indigo-400 border border-indigo-500/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {onOpenAiModal && (
            <button
              onClick={onOpenAiModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-medium transition-all cursor-pointer shadow-sm shadow-indigo-500/10"
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span>Career Copilot</span>
            </button>
          )}

          {onOpenAddModal ? (
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
            >
              <PlusCircle className="h-4 w-4" />
              <span>New Opportunity</span>
            </button>
          ) : (
            <Link
              href="/board"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
            >
              <Briefcase className="h-4 w-4" />
              <span>Open Pipeline</span>
            </Link>
          )}

          {/* User Session Profile & Auth */}
          <div className="relative">
            {isAuthenticated && user ? (
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 transition text-left"
              >
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="h-7 w-7 rounded-lg object-cover border border-indigo-500/30"
                />
                <div className="hidden sm:block pr-1">
                  <div className="text-[11px] font-semibold text-white leading-tight">{user.name}</div>
                  <div className="text-[9px] text-slate-400 leading-tight truncate max-w-[100px]">{user.role}</div>
                </div>
              </button>
            ) : (
              <button
                onClick={() => login("alex.morgan@huntflow.dev", "Alex Morgan")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition"
              >
                <LogIn className="h-3.5 w-3.5 text-indigo-400" />
                <span>Sign In</span>
              </button>
            )}

            {userMenuOpen && isAuthenticated && user && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-2xl shadow-black z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 border-b border-slate-800/80 mb-1">
                  <div className="text-xs font-semibold text-white">{user.name}</div>
                  <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
                  <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-xl transition font-medium"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          {onOpenAddModal && (
            <button
              onClick={onOpenAddModal}
              className="p-2 rounded-xl bg-indigo-600 text-white shadow-sm"
              aria-label="Add Opportunity"
            >
              <PlusCircle className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950 px-4 py-3 space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-600/20 text-indigo-400 font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            {onOpenAiModal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium"
              >
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <span>Career Copilot</span>
              </button>
            )}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-mono text-slate-400"
            >
              <span>Back to Public Product Tour</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
