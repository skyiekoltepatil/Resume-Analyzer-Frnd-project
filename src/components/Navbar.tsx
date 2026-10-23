'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Sparkles, 
  FileText, 
  Briefcase, 
  Layers, 
  Settings, 
  Menu, 
  X, 
  ArrowUpRight,
  ShieldCheck,
  Compass,
  Award
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aiStatus, setAiStatus] = useState<{ connected: boolean; model: string } | null>(null);

  useEffect(() => {
    // Quick probe of AI status
    fetch('/api/ai/test')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.diagnostic) {
          setAiStatus({
            connected: data.diagnostic.connected,
            model: data.diagnostic.model || 'Gemini',
          });
        }
      })
      .catch(() => {
        setAiStatus({ connected: false, model: 'Baseline Engine' });
      });
  }, []);

  const navLinks = [
    { 
      href: '/dashboard', 
      label: 'Dashboard', 
      desktopLabel: 'Dashboard',
      icon: Compass 
    },
    { 
      href: '/analyzer', 
      label: 'Resume Analyzer', 
      desktopLabel: (
        <>
          <span className="hidden xl:inline">Resume </span>Analyzer
        </>
      ),
      icon: FileText 
    },
    { 
      href: '/templates', 
      label: 'Resume Templates', 
      desktopLabel: (
        <>
          <span className="hidden xl:inline">Resume </span>Templates
        </>
      ),
      icon: Award 
    },
    { 
      href: '/match', 
      label: 'Job Match Analysis', 
      desktopLabel: (
        <>
          Job Match<span className="hidden 2xl:inline"> Analysis</span>
        </>
      ),
      icon: Layers 
    },
    { 
      href: '/jobs', 
      label: 'Real-Time Jobs', 
      desktopLabel: (
        <>
          <span className="hidden xl:inline">Real-Time </span>Jobs
        </>
      ),
      icon: Briefcase 
    },
    { 
      href: '/settings', 
      label: 'AI Settings', 
      desktopLabel: (
        <>
          <span className="hidden xl:inline">AI </span>Settings
        </>
      ),
      icon: Settings 
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F9F9F6]/90 backdrop-blur-md border-b border-[#E3E3D8] transition-all">
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 lg:gap-4">
          
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-8 h-8 rounded-lg bg-forest-900 text-limeAccent-300 flex items-center justify-center font-bold text-sm shadow-subtle group-hover:bg-forest-800 transition-colors shrink-0">
              P
            </div>
            <div className="flex flex-col shrink-0">
              <span className="font-extrabold tracking-tight text-forest-950 text-base xl:text-lg leading-tight flex items-center gap-1.5 whitespace-nowrap">
                Pathwise
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 rounded bg-forest-100 text-forest-800 border border-forest-200 whitespace-nowrap shrink-0">
                  v2.0
                </span>
              </span>
              <span className="text-[10px] xl:text-[11px] text-muted-foreground font-medium -mt-0.5 whitespace-nowrap hidden sm:block">
                AI Career Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink-0">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 xl:gap-2 px-2.5 py-1.5 xl:px-3 xl:py-2 text-xs xl:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-white text-forest-950 shadow-subtle border border-[#E3E3D8]'
                      : 'text-forest-700 hover:text-forest-950 hover:bg-ivory-200/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0 ${isActive ? 'text-forest-800' : 'text-forest-500'}`} />
                  <span className="whitespace-nowrap">{link.desktopLabel}</span>
                </Link>
              );
            })}
          </nav>

          {/* Status & CTA */}
          <div className="flex items-center gap-2 xl:gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-2 xl:gap-3 shrink-0">
              <Link
                href="/settings"
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-full border border-forest-200/80 bg-forest-50/60 text-forest-800 hover:bg-forest-100/70 transition-colors shrink-0 whitespace-nowrap"
                title="Click to manage AI Model & API Configuration"
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${aiStatus?.connected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                <span className="font-medium truncate max-w-[110px] xl:max-w-[130px] whitespace-nowrap">
                  {aiStatus ? (aiStatus.connected ? aiStatus.model : 'Deterministic ATS') : 'Testing AI...'}
                </span>
              </Link>

              <Link
                href="/analyzer"
                className="inline-flex items-center gap-1.5 xl:gap-2 bg-forest-900 text-white hover:bg-forest-800 px-3.5 py-2 rounded-lg text-xs xl:text-sm font-semibold shadow-subtle transition-all active:scale-[0.98] shrink-0 whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-limeAccent-400 shrink-0" />
                <span className="whitespace-nowrap">Upload Resume</span>
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-forest-800 hover:bg-ivory-200 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E3E3D8] bg-[#F9F9F6] px-4 pt-2 pb-5 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-200">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 text-sm font-semibold rounded-lg ${
                  isActive
                    ? 'bg-white text-forest-950 border border-[#E3E3D8]'
                    : 'text-forest-700 hover:bg-ivory-200'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.label}</span>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-[#E3E3D8] flex flex-col gap-2">
            <Link
              href="/analyzer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-forest-900 text-white py-3 rounded-lg text-sm font-semibold shadow-subtle active:scale-[0.98] transition-transform"
            >
              <Sparkles className="w-4 h-4 text-limeAccent-400 shrink-0" />
              Upload & Analyze Resume
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
