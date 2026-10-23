'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Clock, 
  DollarSign, 
  ArrowUpRight, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Calendar,
  Copy,
  Check,
  Send,
  Globe
} from 'lucide-react';
import { JobPosting } from '@/lib/types';
import { 
  calculateJobCompatibility, 
  generateReferralOutreachMessage,
  buildLinkedInJobSearchUrl,
  buildNaukriJobSearchUrl,
  buildIndeedJobSearchUrl
} from '@/lib/job-data';

interface JobCardProps {
  job: JobPosting;
  candidateSkills?: string[];
  onSelectForMatch?: (job: JobPosting) => void;
}

export default function JobCard({ job, candidateSkills = [], onSelectForMatch }: JobCardProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [copiedReferral, setCopiedReferral] = useState(false);

  // Calculate compatibility if candidate skills are provided
  const compat = candidateSkills.length > 0 ? calculateJobCompatibility(candidateSkills, job) : null;
  const score = compat ? compat.score : (job.compatibilityScore || null);

  const formatPublishDate = (dateStr?: string) => {
    if (!dateStr) return null;
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return null;
    }
  };

  const publishDate = formatPublishDate(job.publishedAt);

  // Fallback portal URLs if not provided
  const linkedinUrl = job.portalUrls?.linkedinSearchUrl || buildLinkedInJobSearchUrl(job.title, job.company);
  const naukriUrl = job.portalUrls?.naukriSearchUrl || buildNaukriJobSearchUrl(job.title, job.company);
  const indeedUrl = job.portalUrls?.indeedSearchUrl || buildIndeedJobSearchUrl(job.title, job.company);

  const handleCopyReferral = () => {
    const text = generateReferralOutreachMessage(job.title, job.company, candidateSkills);
    navigator.clipboard.writeText(text);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2200);
  };

  return (
    <div className="editorial-card p-5 sm:p-6 flex flex-col justify-between gap-5 transition-all hover:border-forest-400">
      
      {/* Top Header */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          
          <div className="space-y-1">
            {/* Status Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              {job.isVerifiedLive ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                  <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                  REAL APPLICATION
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-100/80 text-amber-900 border border-amber-300">
                  <AlertCircle className="w-3 h-3 text-amber-700" />
                  CURATED BENCHMARK
                </span>
              )}

              {job.companyTier && (
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-forest-100 text-forest-900 border border-forest-300">
                  {job.companyTier}
                </span>
              )}

              <span className="text-[11px] font-mono text-muted-foreground px-2 py-0.5 rounded bg-ivory-200">
                {job.type}
              </span>

              {job.experienceLevel && (
                <span className="text-[11px] font-mono text-forest-700 px-2 py-0.5 rounded bg-forest-50 border border-forest-200">
                  {job.experienceLevel}
                </span>
              )}
            </div>

            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-forest-950 group-hover:text-forest-700">
              {job.title}
            </h3>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-forest-800 font-medium">
              <span className="flex items-center gap-1.5 font-bold text-forest-950">
                <Building2 className="w-3.5 h-3.5 text-forest-600" />
                {job.company}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-forest-500" />
                {job.location}
              </span>
              {job.salary && (
                <span className="flex items-center gap-1.5 text-emerald-800 font-semibold font-mono">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  {job.salary}
                </span>
              )}
              {publishDate && (
                <span className="flex items-center gap-1.5 text-muted-foreground font-mono text-[11px]">
                  <Calendar className="w-3 h-3" />
                  {publishDate}
                </span>
              )}
            </div>
          </div>

          {/* Compatibility Badge */}
          {score !== null && (
            <div className="flex flex-col items-end shrink-0">
              <button
                type="button"
                onClick={() => setShowBreakdown(!showBreakdown)}
                className={`flex flex-col items-center px-3 py-1.5 rounded-xl border transition-all ${
                  score >= 75
                    ? 'bg-forest-900 text-limeAccent-300 border-forest-800 hover:bg-forest-800'
                    : score >= 50
                    ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                    : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
                }`}
                title="Click to view explainable criteria breakdown"
              >
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-limeAccent-400" />
                  <span className="text-base font-extrabold tracking-tight font-mono leading-none">
                    {score}%
                  </span>
                </div>
                <span className="text-[9px] uppercase font-bold tracking-wider opacity-80 mt-0.5">
                  Match
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-2 line-clamp-3">
          {job.description}
        </p>

        {/* Explainability Breakdown Card */}
        {showBreakdown && compat && (
          <div className="p-4 mt-3 rounded-xl bg-ivory-100 border border-[#E3E3D8] text-xs space-y-2 animate-in fade-in duration-150">
            <div className="flex items-center justify-between font-bold text-forest-900 pb-1 border-b border-[#E3E3D8]">
              <span className="font-mono uppercase text-[11px] text-forest-700">Compatibility Score Explanation</span>
              <span className="font-mono text-forest-900 font-extrabold">{score}% Total Fit</span>
            </div>
            <p className="text-forest-800 leading-snug">
              {compat.explanation}
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
              <div className="bg-white p-2 rounded border border-[#E3E3D8]">
                <span className="text-muted-foreground block text-[10px]">Skills Alignment</span>
                <span className="font-bold text-forest-950">{compat.skillsScore}% ({compat.matchedSkills.length}/{job.requiredSkills.length})</span>
              </div>
              <div className="bg-white p-2 rounded border border-[#E3E3D8]">
                <span className="text-muted-foreground block text-[10px]">Experience Estimate</span>
                <span className="font-bold text-forest-950">{compat.experienceScore}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Required Skills Badges */}
        <div className="pt-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-2">
            Target Competencies
          </div>
          <div className="flex flex-wrap gap-1.5">
            {job.requiredSkills.map(skill => {
              const isMatched = compat?.matchedSkills.includes(skill);
              return (
                <span
                  key={skill}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${
                    isMatched
                      ? 'bg-forest-100 text-forest-900 border border-forest-300'
                      : 'bg-ivory-200 text-forest-800 border border-[#E3E3D8]'
                  }`}
                >
                  {isMatched && <CheckCircle2 className="w-3 h-3 text-emerald-700" />}
                  {skill}
                </span>
              );
            })}
          </div>
        </div>

      </div>

      {/* Action Footer: Real-Time Direct Application Routes */}
      <div className="pt-4 border-t border-[#E3E3D8] space-y-3">
        
        {/* Direct Platform Links Row */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mr-1">
              Real-Time Portals:
            </span>

            {/* Official Portal */}
            <a
              href={job.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono font-semibold rounded-md bg-forest-900 text-white hover:bg-forest-800 transition-colors shadow-subtle"
              title={`Direct career portal at ${job.company}`}
            >
              <Globe className="w-3 h-3 text-limeAccent-400" />
              Official Portal
              <ArrowUpRight className="w-3 h-3" />
            </a>

            {/* LinkedIn Apply Route */}
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono font-semibold rounded-md bg-[#0077B5]/10 text-[#0077B5] hover:bg-[#0077B5]/20 border border-[#0077B5]/30 transition-colors"
              title={`Search real-time active vacancies on LinkedIn for ${job.title} at ${job.company}`}
            >
              LinkedIn Jobs
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Naukri.com Apply Route */}
            <a
              href={naukriUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono font-semibold rounded-md bg-[#FF7555]/10 text-[#D94F30] hover:bg-[#FF7555]/20 border border-[#FF7555]/30 transition-colors"
              title={`Search active vacancies on Naukri.com for ${job.title} at ${job.company}`}
            >
              Naukri.com
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Indeed Apply Route */}
            <a
              href={indeedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-mono text-forest-700 hover:bg-ivory-200 border border-[#E3E3D8] rounded-md transition-colors"
            >
              Indeed
            </a>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            
            {/* 1-Click Referral Pitch Copy */}
            <button
              type="button"
              onClick={handleCopyReferral}
              className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono font-semibold rounded-md transition-colors ${
                copiedReferral
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'bg-ivory-200 text-forest-800 hover:bg-ivory-300 border border-[#E3E3D8]'
              }`}
              title={`Generate tailored Work for FANG referral outreach message for an employee at ${job.company}`}
            >
              {copiedReferral ? (
                <>
                  <Check className="w-3 h-3 text-emerald-700" />
                  Referral Note Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-forest-600" />
                  Referral Script
                </>
              )}
            </button>

            {/* Match Analysis Button */}
            <Link
              href={`/match?jobTitle=${encodeURIComponent(job.title)}&company=${encodeURIComponent(job.company)}&desc=${encodeURIComponent(job.description)}`}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono font-semibold rounded-md bg-ivory-200 text-forest-900 hover:bg-ivory-300 border border-[#E3E3D8] transition-colors"
            >
              <Sparkles className="w-3 h-3 text-forest-700" />
              Analyze Fit
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}
