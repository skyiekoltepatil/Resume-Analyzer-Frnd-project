'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  RefreshCw, 
  ArrowRight, 
  Building2, 
  FileText, 
  Target, 
  Copy, 
  Check,
  Quote,
  Trash2
} from 'lucide-react';
import { ExtractedProfile, JobMatchReport } from '@/lib/types';
import { getActiveProfile, getActiveMatch, saveActiveMatch, clearProfileData } from '@/lib/storage';
import ScoreGauge from '@/components/ScoreGauge';

// Sample Job Description for instant 1-click matching
const SAMPLE_TARGET_JD = `Role: Senior Backend Infrastructure Engineer
Company: CloudScale Systems

About The Role:
We are looking for a Senior Backend Infrastructure Engineer to scale our global event ingestion pipelines and real-time database architecture.

Requirements:
• 4+ years of professional backend software development experience.
• Strong hands-on proficiency in Python, Go, or TypeScript.
• Proven track record with PostgreSQL, Redis, or distributed message queues (Kafka / RabbitMQ).
• Deep knowledge of Docker, Kubernetes, and automated CI/CD deployments.
• Demonstrated experience optimizing API latency and handling high-concurrency workloads (10,000+ QPS).
• Experience mentoring junior engineers and leading system architecture discussions.`;

function MatchAnalysisContent() {
  const searchParams = useSearchParams();

  const [profile, setProfile] = useState<ExtractedProfile | null>(null);
  const [jobTitle, setJobTitle] = useState('Senior Backend Infrastructure Engineer');
  const [company, setCompany] = useState('CloudScale Systems');
  const [jobDescription, setJobDescription] = useState(SAMPLE_TARGET_JD);
  const [resumeText, setResumeText] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [matchReport, setMatchReport] = useState<JobMatchReport | null>(null);
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Check search params
    const qTitle = searchParams.get('jobTitle');
    const qCompany = searchParams.get('company');
    const qDesc = searchParams.get('desc');

    if (qTitle) setJobTitle(qTitle);
    if (qCompany) setCompany(qCompany);
    if (qDesc) setJobDescription(qDesc);

    // Load active profile
    const p = getActiveProfile();
    if (p) {
      setProfile(p);
      setResumeText(p.rawText);
    }

    const cachedMatch = getActiveMatch();
    if (cachedMatch) setMatchReport(cachedMatch);
  }, [searchParams]);

  const handleClearActiveProfile = () => {
    clearProfileData();
    setProfile(null);
    setResumeText('');
    setMatchReport(null);
  };

  const handleRunMatch = async () => {
    if (!resumeText || resumeText.trim().length < 20) {
      setErrorMessage('Please upload a resume or paste candidate resume text.');
      return;
    }
    if (!jobDescription || jobDescription.trim().length < 20) {
      setErrorMessage('Please provide a job description to evaluate.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/ai/match-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          jobTitle,
          jobDescription,
          company,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to analyze job match.');
      }

      setMatchReport(data.match);
      saveActiveMatch(data.match);
    } catch (e: any) {
      setErrorMessage(e.message || 'Error executing match.');
    } finally {
      setIsLoading(false);
    }
  };

  const copySummaryPitch = () => {
    if (!matchReport?.tailoredSummaryPitch) return;
    navigator.clipboard.writeText(matchReport.tailoredSummaryPitch);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="pb-6 border-b border-[#E3E3D8]">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-forest-100 text-forest-900 border border-forest-200 mb-2">
          <Layers className="w-3.5 h-3.5 text-limeAccent-600" />
          Explainable ATS Job Match Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-forest-950">
          Job Description vs. Resume Match Analysis
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Compare candidate resume evidence directly against any vacancy. Audit matched requirements, uncover evidence gaps, and generate tailored application points.
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Two-Column Inputs: Resume vs Job Description */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Candidate Resume */}
        <div className="editorial-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-forest-800 font-bold flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-forest-600" />
              Candidate Resume
            </span>
            {profile && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-emerald-800 font-semibold px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                  {profile.fileName.toLowerCase().includes('sample') ? 'Sample: ' : 'Active: '}
                  {profile.fileName}
                </span>
                <button
                  type="button"
                  onClick={handleClearActiveProfile}
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-2 py-0.5 rounded transition-colors"
                  title="Remove resume from browser memory"
                >
                  <Trash2 className="w-3 h-3 text-rose-600" />
                  Clear
                </button>
              </div>
            )}
          </div>

          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows={10}
            placeholder="Paste candidate resume text or upload via the Resume Analyzer..."
            className="w-full p-4 rounded-xl border border-[#D6D6C4] bg-white text-forest-950 text-xs font-mono focus:border-forest-700 focus:outline-none"
          />

          {!profile && (
            <div className="text-xs text-muted-foreground flex items-center justify-between">
              <span>Have a PDF or DOCX file?</span>
              <Link href="/analyzer" className="text-forest-800 font-semibold underline">
                Upload & Extract Document →
              </Link>
            </div>
          )}
        </div>

        {/* Right: Target Job Description */}
        <div className="editorial-card p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-forest-800 font-bold flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-forest-600" />
                Target Vacancy Specification
              </span>
              <span className="text-[11px] font-mono text-muted-foreground">
                Paste any job posting
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-mono font-bold text-forest-800 block mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#D6D6C4] bg-white text-forest-950 focus:border-forest-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono font-bold text-forest-800 block mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#D6D6C4] bg-white text-forest-950 focus:border-forest-700 focus:outline-none"
                />
              </div>
            </div>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={7}
              placeholder="Paste target job description and requirements here..."
              className="w-full p-4 rounded-xl border border-[#D6D6C4] bg-white text-forest-950 text-xs font-mono focus:border-forest-700 focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleRunMatch}
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-xl bg-forest-900 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-forest-800 shadow-subtle transition-all active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-limeAccent-400" />
                Calculating Surgical Match...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-limeAccent-400" />
                Run Two-Tower Match Analysis
              </>
            )}
          </button>
        </div>

      </div>


      {/* Match Results Display */}
      {matchReport && (
        <div className="space-y-10 animate-in fade-in duration-300">
          
          {/* Main Score & Rubric Breakdown */}
          <div className="editorial-card p-6 sm:p-8 bg-white space-y-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-6 border-b border-[#E3E3D8]">
              
              <div className="w-full lg:w-64 shrink-0 flex flex-col items-center">
                <ScoreGauge
                  score={matchReport.overallMatchScore}
                  label="Role Compatibility"
                  size="lg"
                />
              </div>

              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-bold">
                      Vacancy Match Verdict
                    </span>
                    <h2 className="text-2xl font-extrabold tracking-tight text-forest-950">
                      {matchReport.jobTitle} @ {matchReport.company}
                    </h2>
                  </div>

                  <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
                    matchReport.isLiveAi ? 'bg-forest-100 text-forest-900 border-forest-300' : 'bg-amber-100 text-amber-900 border-amber-300'
                  }`}>
                    {matchReport.modelUsed}
                  </span>
                </div>

                <p className="text-sm text-forest-800 leading-relaxed bg-ivory-100 p-4 rounded-xl border border-[#E3E3D8]">
                  {matchReport.scoreExplanation}
                </p>

                {/* 4 Rubric Criteria Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-white border border-[#E3E3D8] space-y-1">
                    <span className="text-[10px] font-mono text-muted-foreground block">Core Skills (40%)</span>
                    <span className="text-lg font-bold font-mono text-forest-950">{matchReport.criteriaScores.coreSkillsMatch}%</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-[#E3E3D8] space-y-1">
                    <span className="text-[10px] font-mono text-muted-foreground block">Experience (30%)</span>
                    <span className="text-lg font-bold font-mono text-forest-950">{matchReport.criteriaScores.experienceAlignment}%</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-[#E3E3D8] space-y-1">
                    <span className="text-[10px] font-mono text-muted-foreground block">Tools & Systems (15%)</span>
                    <span className="text-lg font-bold font-mono text-forest-950">{matchReport.criteriaScores.toolsAndSystems}%</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-[#E3E3D8] space-y-1">
                    <span className="text-[10px] font-mono text-muted-foreground block">Impact Scope (15%)</span>
                    <span className="text-lg font-bold font-mono text-forest-950">{matchReport.criteriaScores.impactAndScope}%</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Matched vs Partially Matched vs Missing Requirements */}
            <div className="space-y-4 pt-2">
              <h3 className="text-lg font-bold tracking-tight text-forest-950 flex items-center gap-2">
                <Target className="w-5 h-5 text-forest-700" />
                Line-by-Line Requirement Audit
              </h3>

              <div className="space-y-3">
                {matchReport.matchedRequirements.map((req, idx) => {
                  const isFull = req.status === 'fully_matched';
                  const isPartial = req.status === 'partially_matched';

                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border text-xs space-y-2 ${
                        isFull
                          ? 'bg-emerald-50/50 border-emerald-200 text-forest-950'
                          : isPartial
                          ? 'bg-amber-50/50 border-amber-200 text-forest-950'
                          : 'bg-rose-50/50 border-rose-200 text-forest-950'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm flex items-center gap-2">
                          {isFull && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                          {isPartial && <AlertCircle className="w-4 h-4 text-amber-600" />}
                          {!isFull && !isPartial && <AlertCircle className="w-4 h-4 text-rose-600" />}
                          {req.requirement}
                        </span>

                        <span className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                          isFull
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : isPartial
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-rose-100 text-rose-900 border border-rose-300'
                        }`}>
                          {req.status.replace('_', ' ')}
                        </span>
                      </div>

                      {req.evidenceFromResume && (
                        <p className="text-muted-foreground italic pl-3 border-l-2 border-forest-400">
                          Evidence: "{req.evidenceFromResume}"
                        </p>
                      )}

                      {req.remediationAdvice && (
                        <p className="text-rose-900 font-medium pl-3 border-l-2 border-rose-400">
                          Advice: {req.remediationAdvice}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>


          {/* Tailored Elevator Pitch & Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Tailored Elevator Pitch */}
            <div className="editorial-card p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-forest-800">
                    Tailored Professional Summary Pitch
                  </span>
                  <button
                    onClick={copySummaryPitch}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-forest-800 hover:text-forest-950 underline"
                  >
                    {copiedPitch ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Pitch
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-muted-foreground">
                  Use this calibrated 3-sentence summary at the top of your resume or in your application message for this specific role:
                </p>

                <div className="p-4 rounded-xl bg-ivory-100 border border-[#E3E3D8] text-xs sm:text-sm text-forest-950 font-medium leading-relaxed italic">
                  "{matchReport.tailoredSummaryPitch}"
                </div>
              </div>

              <div className="pt-2 text-[11px] font-mono text-muted-foreground">
                Grounded exclusively in your evidenced skills and project metrics.
              </div>
            </div>

            {/* Targeted Resume Adjustments */}
            <div className="editorial-card p-6 sm:p-8 space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-forest-800 block">
                Targeted Resume Modifications
              </span>
              <p className="text-xs text-muted-foreground">
                Make these surgical changes to your bullet points to address this employer's exact priorities:
              </p>

              <div className="space-y-2.5">
                {matchReport.customizedSuggestions.map((sug, i) => (
                  <div key={i} className="p-3 rounded-lg bg-ivory-100 border border-[#E3E3D8] text-xs text-forest-900 leading-snug flex items-start gap-2">
                    <span className="font-bold text-forest-800 font-mono">0{i+1}.</span>
                    <span>{sug}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default function JobMatchPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center font-mono text-sm text-forest-700">Loading Job Match Engine...</div>}>
      <MatchAnalysisContent />
    </Suspense>
  );
}
