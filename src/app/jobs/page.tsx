'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Briefcase, 
  Filter, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  SlidersHorizontal,
  Sparkles,
  ExternalLink,
  Building2,
  MapPin,
  HelpCircle,
  Globe,
  ArrowUpRight,
  TrendingUp,
  Zap,
  Target
} from 'lucide-react';
import { JobPosting, ExtractedProfile } from '@/lib/types';
import { getActiveProfile } from '@/lib/storage';
import JobCard from '@/components/JobCard';
import { 
  buildLinkedInJobSearchUrl, 
  buildNaukriJobSearchUrl, 
  buildGoogleCareersSearchUrl, 
  buildDeloitteCareersSearchUrl, 
  buildIndeedJobSearchUrl 
} from '@/lib/job-data';

export default function JobRecommendationsPage() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [companyFilter, setCompanyFilter] = useState('All Companies');
  const [sourceSummary, setSourceSummary] = useState('');
  const [isLiveFeed, setIsLiveFeed] = useState(false);
  const [profile, setProfile] = useState<ExtractedProfile | null>(null);

  // Load candidate profile
  useEffect(() => {
    const p = getActiveProfile();
    if (p) setProfile(p);
  }, []);

  // Fetch jobs
  const fetchJobListings = async (query?: string, role?: string, company?: string) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (query && query.trim()) params.append('q', query.trim());
      if (role && role !== 'All Roles') params.append('role', role);
      if (company && company !== 'All Companies') params.append('company', company);

      const res = await fetch(`/api/jobs?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setJobs(data.jobs || []);
        setSourceSummary(data.sourceSummary || '');
        setIsLiveFeed(data.isLiveFeed || false);
      }
    } catch (e) {
      console.error('Failed to load jobs', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobListings();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobListings(searchQuery, roleFilter, companyFilter);
  };

  const candidateSkills = profile?.skills || [];
  const activeRoleTerm = searchQuery.trim() || profile?.targetRole || 'Software Engineer';

  // Live direct application search links based on current user query/role
  const liveLinkedInUrl = buildLinkedInJobSearchUrl(activeRoleTerm, companyFilter !== 'All Companies' ? companyFilter : undefined);
  const liveNaukriUrl = buildNaukriJobSearchUrl(activeRoleTerm, companyFilter !== 'All Companies' ? companyFilter : undefined);
  const liveGoogleCareersUrl = buildGoogleCareersSearchUrl(activeRoleTerm);
  const liveDeloitteCareersUrl = buildDeloitteCareersSearchUrl(activeRoleTerm);
  const liveIndeedUrl = buildIndeedJobSearchUrl(activeRoleTerm, companyFilter !== 'All Companies' ? companyFilter : undefined);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#E3E3D8]">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-forest-100 text-forest-900 border border-forest-200 mb-2">
            <Briefcase className="w-3.5 h-3.5 text-forest-700" />
            Live Enterprise Vacancies & Real Direct Portals
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-forest-950">
            Real-Time Job Application & Vacancy Index
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Direct application routes to <strong>Google, Deloitte, Microsoft, AWS</strong>, plus instant 1-click verified pipelines on <strong>LinkedIn Jobs</strong> and <strong>Naukri.com</strong>.
          </p>
        </div>

        {profile && (
          <div className="p-3 rounded-xl bg-forest-50 border border-forest-200 text-xs flex items-center gap-3 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <div>
              <span className="text-muted-foreground">Matching Against:</span>{' '}
              <span className="font-bold text-forest-950">{profile.name}</span>{' '}
              <span className="font-mono text-forest-700">({candidateSkills.length} skills indexed)</span>
            </div>
          </div>
        )}
      </div>

      {/* =====================================================================
          1-CLICK MULTI-PORTAL DIRECT APPLICATION COMMAND CENTER
          ===================================================================== */}
      <div className="p-6 rounded-2xl bg-forest-950 text-white shadow-elevated space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-forest-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-limeAccent-400" />
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-limeAccent-400">
                Direct Hiring Portals (1-Click Real-Time Applications)
              </span>
            </div>
            <p className="text-xs text-forest-200">
              Trigger instant real-time job searches on the world’s leading recruitment portals for: <span className="font-bold text-white font-mono">{activeRoleTerm}</span>
            </p>
          </div>

          <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-forest-900 text-forest-300 border border-forest-700">
            Active Candidates Ready to Hire
          </span>
        </div>

        {/* Multi-Portal Launch Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          
          {/* LinkedIn Jobs */}
          <a
            href={liveLinkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-forest-900/80 hover:bg-[#0077B5] border border-forest-700 hover:border-[#0077B5] transition-all group flex flex-col justify-between space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono tracking-tight text-white">LinkedIn Jobs</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-limeAccent-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-forest-300 group-hover:text-white/90">
              Live verified 24h tech postings with Easy Apply
            </p>
          </a>

          {/* Naukri.com */}
          <a
            href={liveNaukriUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-forest-900/80 hover:bg-[#D94F30] border border-forest-700 hover:border-[#D94F30] transition-all group flex flex-col justify-between space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono tracking-tight text-white">Naukri.com</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-limeAccent-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-forest-300 group-hover:text-white/90">
              India & MNC tech hiring (Google, Deloitte, TCS)
            </p>
          </a>

          {/* Google Official Careers */}
          <a
            href={liveGoogleCareersUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-forest-900/80 hover:bg-forest-800 border border-forest-700 hover:border-limeAccent-400 transition-all group flex flex-col justify-between space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono tracking-tight text-white">Google Careers</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-limeAccent-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-forest-300 group-hover:text-white/90">
              Official Google & DeepMind direct applicant portal
            </p>
          </a>

          {/* Deloitte Official Talent Portal */}
          <a
            href={liveDeloitteCareersUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-forest-900/80 hover:bg-forest-800 border border-forest-700 hover:border-limeAccent-400 transition-all group flex flex-col justify-between space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono tracking-tight text-white">Deloitte Careers</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-limeAccent-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-forest-300 group-hover:text-white/90">
              Deloitte Global Technology & Advisory hiring
            </p>
          </a>

          {/* Indeed */}
          <a
            href={liveIndeedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-forest-900/80 hover:bg-[#2164f3] border border-forest-700 hover:border-[#2164f3] transition-all group flex flex-col justify-between space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono tracking-tight text-white">Indeed Jobs</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-limeAccent-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-forest-300 group-hover:text-white/90">
              Global aggregator with direct company submissions
            </p>
          </a>

        </div>
      </div>

      {/* Source Integrity Notice Banner */}
      <div className={`p-4 rounded-xl border text-xs flex flex-wrap items-center justify-between gap-4 ${
        isLiveFeed 
          ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
          : 'bg-forest-50/80 border-forest-200 text-forest-950'
      }`}>
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="leading-snug font-medium">
            <span className="font-bold font-mono">VERIFIED VACANCIES:</span> {sourceSummary}
          </span>
        </div>

        <button
          onClick={() => fetchJobListings(searchQuery, roleFilter, companyFilter)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#D6D6C4] hover:bg-ivory-100 text-forest-900 font-semibold text-xs shrink-0 shadow-subtle"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh Listings
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="editorial-card p-5 space-y-4">
        
        {/* Main Search Row */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-forest-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role, company (e.g. Google, Deloitte), or skill (Python, AWS, React)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#D6D6C4] bg-white text-sm text-forest-950 focus:border-forest-700 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Specialization Filter */}
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                fetchJobListings(searchQuery, e.target.value, companyFilter);
              }}
              className="px-3.5 py-2.5 rounded-lg border border-[#D6D6C4] bg-white text-xs font-semibold text-forest-900 focus:outline-none"
            >
              <option value="All Roles">All Specializations</option>
              <option value="Software Engineer">Software & Full Stack Engineering</option>
              <option value="Cloud">Cloud Platform & DevSecOps</option>
              <option value="Infrastructure">Distributed Systems & Infrastructure</option>
              <option value="Consultant">Technology Advisory & Consulting (Deloitte / Big 4)</option>
              <option value="ML">Machine Learning & AI Systems</option>
            </select>

            {/* Company Filter */}
            <select
              value={companyFilter}
              onChange={(e) => {
                setCompanyFilter(e.target.value);
                fetchJobListings(searchQuery, roleFilter, e.target.value);
              }}
              className="px-3.5 py-2.5 rounded-lg border border-[#D6D6C4] bg-white text-xs font-semibold text-forest-900 focus:outline-none"
            >
              <option value="All Companies">All Employers</option>
              <option value="Google">Google & DeepMind</option>
              <option value="Deloitte">Deloitte Consulting</option>
              <option value="Microsoft">Microsoft</option>
              <option value="Amazon">Amazon / AWS</option>
              <option value="Accenture">Accenture</option>
              <option value="OpenAI">OpenAI</option>
              <option value="Stripe">Stripe</option>
            </select>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-forest-900 text-white font-semibold text-xs hover:bg-forest-800 transition-colors shadow-subtle"
            >
              Search
            </button>
          </div>
        </form>

        {/* In-Demand Employers Quick Selector */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E3E3D8]">
          <span className="font-mono text-[11px] font-bold text-forest-800 uppercase tracking-wider mr-1 flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-forest-600" />
            Top Demanded:
          </span>
          {[
            { label: 'All Employers', value: 'All Companies' },
            { label: 'Google', value: 'Google' },
            { label: 'Deloitte', value: 'Deloitte' },
            { label: 'Microsoft', value: 'Microsoft' },
            { label: 'Amazon / AWS', value: 'Amazon' },
            { label: 'Accenture', value: 'Accenture' },
            { label: 'OpenAI', value: 'OpenAI' },
            { label: 'Stripe', value: 'Stripe' }
          ].map(comp => (
            <button
              key={comp.value}
              type="button"
              onClick={() => {
                setCompanyFilter(comp.value);
                fetchJobListings(searchQuery, roleFilter, comp.value);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                companyFilter === comp.value
                  ? 'bg-forest-900 text-limeAccent-300 shadow-subtle'
                  : 'bg-ivory-100 hover:bg-ivory-200 text-forest-900 border border-[#E3E3D8]'
              }`}
            >
              {comp.label}
            </button>
          ))}
        </div>

      </div>

      {/* Jobs Listing Grid */}
      {isLoading ? (
        <div className="py-20 text-center space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin text-forest-700 mx-auto" />
          <p className="text-sm font-bold text-forest-950 font-mono">
            Synchronizing live vacancies from Google, Deloitte, Microsoft, and Remotive feeds...
          </p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="editorial-card p-12 text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto" />
          <h3 className="text-lg font-bold text-forest-950">No Listings Matched Your Filter</h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Try broadening your search term or selecting "All Employers". You can also launch a direct real-time search on LinkedIn or Naukri above!
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setRoleFilter('All Roles');
              setCompanyFilter('All Companies');
              fetchJobListings('', 'All Roles', 'All Companies');
            }}
            className="px-4 py-2 rounded-lg bg-forest-900 text-white text-xs font-semibold hover:bg-forest-800"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              candidateSkills={candidateSkills}
            />
          ))}
        </div>
      )}

    </div>
  );
}
