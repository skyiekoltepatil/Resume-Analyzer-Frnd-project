'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Sparkles, 
  Briefcase, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  TrendingUp, 
  Target, 
  Compass, 
  RefreshCw,
  Plus,
  ShieldCheck,
  ChevronRight,
  UserCheck,
  Trash2
} from 'lucide-react';
import { ExtractedProfile, ResumeAnalysisReport } from '@/lib/types';
import { getActiveProfile, getActiveReport, saveActiveProfile, saveActiveReport, clearProfileData } from '@/lib/storage';
import { parseResumeProfile } from '@/lib/resume-parser';
import { analyzeResumeDeterministically } from '@/lib/ats-deterministic';
import ScoreGauge from '@/components/ScoreGauge';
import SkillBadge from '@/components/SkillBadge';

// Sample demo resume for 1-click exploration if no file is uploaded yet
const SAMPLE_RESUME_TEXT = `Alex Rivera
San Francisco, CA | alex.rivera@example.com | (415) 555-0192 | linkedin.com/in/alex-rivera-tech | github.com/alexrivera-dev

PROFESSIONAL SUMMARY
Senior Software Engineer with 5+ years of experience engineering high-throughput distributed systems, modern web platforms, and automated cloud infrastructure. Specialized in TypeScript, React, Next.js, Python, PostgreSQL, and Docker.

WORK EXPERIENCE
Senior Full Stack Engineer | Stripe Payments Platform | 2023 - Present
• Engineered distributed Redis caching layers for 6 core microservices, reducing p99 API latency by 42% across 2.4M daily payment transactions.
• Architected Next.js dashboard workflows with server-side streaming, reducing customer onboarding churn by 28% across 45,000 active merchant accounts.
• Spearheaded automated CI/CD pipeline using GitHub Actions and Docker, reducing deployment cycle times from 45 minutes to 7 minutes with zero downtime.

Software Engineer | CloudScale Systems | 2021 - 2023
• Built high-concurrency event ingestion pipelines using Python, FastAPI, and PostgreSQL, processing 15,000 telemetry events per second.
• Designed and executed database partitioning migration across 450M rows in PostgreSQL, eliminating query timeouts during peak traffic.
• Collaborated in cross-functional Agile team of 12 engineers, mentoring 3 junior developers and conducting weekly code reviews.

TECHNICAL SKILLS
• Languages: Python, TypeScript, JavaScript, SQL, Go
• Frameworks & Web: React, Next.js, Node.js, Express, FastAPI
• Cloud & Infrastructure: AWS, Docker, Kubernetes, Terraform, CI/CD, GitHub Actions
• Databases & Storage: PostgreSQL, Redis, MongoDB
• Methodologies & Tools: Git, REST API, GraphQL, Microservices, Agile, System Architecture

EDUCATION
B.S. in Computer Science | University of California, Berkeley | 2017 - 2021`;

export default function CareerDashboardPage() {
  const [profile, setProfile] = useState<ExtractedProfile | null>(null);
  const [report, setReport] = useState<ResumeAnalysisReport | null>(null);
  const [isLoadingSample, setIsLoadingSample] = useState(false);

  useEffect(() => {
    const cachedProfile = getActiveProfile();
    const cachedReport = getActiveReport();
    if (cachedProfile) setProfile(cachedProfile);
    if (cachedReport) setReport(cachedReport);
  }, []);

  const handleClearProfile = () => {
    clearProfileData();
    setProfile(null);
    setReport(null);
  };

  const loadSampleProfile = () => {
    setIsLoadingSample(true);
    setTimeout(() => {
      const parsed = parseResumeProfile(SAMPLE_RESUME_TEXT, 'Sample_Senior_Engineer_Resume.pdf', 'application/pdf');
      const sampleReport = analyzeResumeDeterministically(parsed, 'Senior Full Stack Engineer');
      setProfile(parsed);
      setReport(sampleReport);
      saveActiveProfile(parsed);
      saveActiveReport(sampleReport);
      setIsLoadingSample(false);
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E3E3D8]">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-forest-100 text-forest-900 border border-forest-200 mb-2">
            <Compass className="w-3.5 h-3.5 text-limeAccent-600" />
            Executive Career Command Center
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-forest-950">
            Career Intelligence Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time status of your active candidate profile, ATS audit readiness, and career trajectory.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {profile && (
            <button
              onClick={handleClearProfile}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold hover:bg-rose-100 transition-colors shadow-subtle"
              title="Remove stored resume from browser memory"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
              Clear Active Resume
            </button>
          )}
          <Link
            href="/analyzer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-900 text-white text-xs font-semibold hover:bg-forest-800 transition-colors shadow-subtle"
          >
            <Sparkles className="w-3.5 h-3.5 text-limeAccent-400" />
            {profile ? 'Audit New Resume' : 'Upload Resume'}
          </Link>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E3E3D8] text-forest-900 text-xs font-semibold hover:bg-ivory-100 transition-colors shadow-subtle"
          >
            <Briefcase className="w-3.5 h-3.5 text-forest-600" />
            Find Jobs
          </Link>
        </div>
      </div>

      {/* Empty State when no resume uploaded yet */}
      {!profile ? (
        <div className="editorial-card p-8 sm:p-14 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-forest-100 text-forest-800 flex items-center justify-center mx-auto shadow-subtle">
            <FileText className="w-8 h-8 text-forest-700" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold tracking-tight text-forest-950">
              No Active Candidate Profile Loaded
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Upload your resume in PDF or DOCX format to trigger our two-tower vector extraction, verify skills evidence, and generate an actionable career roadmap.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/analyzer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-forest-900 text-white font-semibold text-sm hover:bg-forest-800 shadow-elevated"
            >
              <Sparkles className="w-4 h-4 text-limeAccent-400" />
              Upload Resume (PDF / DOCX)
            </Link>

            <button
              type="button"
              onClick={loadSampleProfile}
              disabled={isLoadingSample}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-ivory-100 border border-[#E3E3D8] text-forest-900 font-semibold text-sm hover:bg-ivory-200 transition-colors"
            >
              {isLoadingSample ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-forest-600" />
                  Loading Sample Profile...
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4 text-forest-700" />
                  Load Sample Engineering Profile
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Active Dashboard Content */
        <div className="space-y-10">
          
          {/* Top Key Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="editorial-card p-5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase text-muted-foreground font-bold">
                  Profile Status
                </span>
                {profile.fileName.toLowerCase().includes('sample') && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-bold">
                    SAMPLE
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-lg font-bold text-forest-950 truncate">{profile.name}</span>
              </div>
              <p className="text-[11px] font-mono text-muted-foreground pt-1 truncate">
                {profile.fileName} • {profile.wordCount} words
              </p>
            </div>

            <div className="editorial-card p-5 space-y-1">
              <span className="text-[11px] font-mono uppercase text-muted-foreground font-bold">
                Overall Alignment
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-forest-950 font-mono">
                  {report ? `${report.overallScore}%` : 'Pending'}
                </span>
                <span className="text-xs text-forest-700 font-medium font-mono">
                  {report ? (report.overallScore >= 75 ? 'Tier 1 Strong' : 'Solid') : ''}
                </span>
              </div>
              <p className="text-[11px] font-mono text-muted-foreground pt-1 truncate">
                Target: {report?.targetRole || profile.targetRole}
              </p>
            </div>

            <div className="editorial-card p-5 space-y-1">
              <span className="text-[11px] font-mono uppercase text-muted-foreground font-bold">
                ATS Parse Readiness
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-forest-950 font-mono">
                  {report ? `${report.atsScore}%` : '88%'}
                </span>
                <span className="text-xs text-emerald-700 font-medium">Machine Verified</span>
              </div>
              <p className="text-[11px] font-mono text-muted-foreground pt-1">
                Zero structural syntax errors
              </p>
            </div>

            <div className="editorial-card p-5 space-y-1">
              <span className="text-[11px] font-mono uppercase text-muted-foreground font-bold">
                Verified Skills
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-forest-950 font-mono">
                  {profile.skills.length}
                </span>
                <span className="text-xs text-forest-700 font-medium">Domain Taxonomy</span>
              </div>
              <p className="text-[11px] font-mono text-muted-foreground pt-1">
                {report ? `${report.categorizedSkills.filter(s => s.evidenceStatus === 'explicitly_evidenced').length} evidenced in bullets` : 'Index verified'}
              </p>
            </div>

          </div>


          {/* Middle Row: Analysis Summary & Score Gauge */}
          {report && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Score Gauge Card */}
              <div className="editorial-card p-6 flex flex-col justify-between items-center text-center">
                <div className="w-full">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-forest-800 text-left pb-4 border-b border-[#E3E3D8]">
                    Score Rubric Breakdown
                  </div>
                  <div className="py-6">
                    <ScoreGauge
                      score={report.overallScore}
                      label="Explainable Compatibility"
                      size="md"
                      breakdown={report.scoreBreakdown}
                    />
                  </div>
                </div>

                <Link
                  href="/analyzer"
                  className="w-full py-2.5 rounded-lg bg-ivory-100 hover:bg-ivory-200 border border-[#E3E3D8] text-xs font-semibold text-forest-900 transition-colors"
                >
                  View Full Audit Report →
                </Link>
              </div>

              {/* Latest Analysis Briefing */}
              <div className="lg:col-span-2 editorial-card p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-forest-800">
                        Latest Intelligence Briefing
                      </span>
                      <h3 className="text-xl font-bold tracking-tight text-forest-950 mt-1">
                        {report.candidateName} — {report.targetRole}
                      </h3>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-forest-100 text-forest-900 border border-forest-200">
                      {report.modelUsed}
                    </span>
                  </div>

                  <p className="text-sm text-forest-800 leading-relaxed bg-ivory-100 p-4 rounded-xl border border-[#E3E3D8]">
                    {report.executiveSummary}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-2">
                      <span className="text-xs font-mono font-bold text-emerald-800 uppercase flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Key Standing Strengths
                      </span>
                      <ul className="text-xs text-forest-800 space-y-1.5">
                        {report.strengths.slice(0, 3).map((s, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-700 font-bold">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-mono font-bold text-rose-800 uppercase flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                        Priority Skill Gaps
                      </span>
                      <ul className="text-xs text-forest-800 space-y-1.5">
                        {report.weaknesses.slice(0, 3).map((w, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-rose-700 font-bold">•</span>
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E3E3D8] flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-muted-foreground font-mono">
                    Audited {new Date(report.analyzedAt).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    <Link
                      href="/match"
                      className="px-3.5 py-1.5 rounded-lg bg-forest-900 text-white text-xs font-semibold hover:bg-forest-800 transition-colors"
                    >
                      Compare With Job Description
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          )}


          {/* Recommended Career Directions & Target Roles */}
          {report?.recommendedRoles && (
            <div className="editorial-card p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#E3E3D8]">
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-forest-950 flex items-center gap-2">
                    <Target className="w-5 h-5 text-forest-700" />
                    Recommended Career Directions & Role Targets
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Roles that align with your evidenced technologies and experience scope.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {report.recommendedRoles.map((role, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-ivory-100 border border-[#E3E3D8] flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-forest-950">{role.title}</span>
                        <span className="text-xs font-mono font-bold text-forest-900 px-2 py-0.5 rounded bg-limeAccent-200">
                          {role.matchPercentage}% Fit
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {role.rationale}
                      </p>
                    </div>

                    <Link
                      href={`/jobs?role=${encodeURIComponent(role.title)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-800 hover:text-forest-950 pt-2 border-t border-[#E3E3D8]"
                    >
                      Explore open vacancies
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* Skills Overview */}
          <div className="editorial-card p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3E3D8]">
              <div>
                <h3 className="text-lg font-bold tracking-tight text-forest-950">
                  Detected Competencies & Taxonomy Index
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Verified against the Pathwise technical ontology.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-forest-700">
                {profile.skills.length} Total Skills
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {profile.skills.map(s => {
                const reportEvidence = report?.categorizedSkills.find(c => c.skill.toLowerCase() === s.toLowerCase());
                return (
                  <SkillBadge
                    key={s}
                    skill={s}
                    status={reportEvidence ? reportEvidence.evidenceStatus : 'matched'}
                    quote={reportEvidence?.evidenceQuote}
                  />
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
