'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Upload, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Printer, 
  Download, 
  Layers, 
  Briefcase, 
  RefreshCw,
  Quote,
  TrendingUp,
  FileCode,
  ShieldCheck,
  ChevronDown,
  Info,
  Award,
  Trash2
} from 'lucide-react';
import { ExtractedProfile, ResumeAnalysisReport } from '@/lib/types';
import { saveActiveProfile, getActiveProfile, saveActiveReport, getActiveReport, clearProfileData } from '@/lib/storage';
import ScoreGauge from '@/components/ScoreGauge';
import SkillBadge from '@/components/SkillBadge';

export default function ResumeAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [manualText, setManualText] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const [targetRole, setTargetRole] = useState('Senior Software Engineer');
  
  // Loading & Progress
  const [isParsing, setIsParsing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Profile & Report State
  const [profile, setProfile] = useState<ExtractedProfile | null>(null);
  const [report, setReport] = useState<ResumeAnalysisReport | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load existing profile or report from storage on mount
  useEffect(() => {
    const cachedProfile = getActiveProfile();
    const cachedReport = getActiveReport();
    if (cachedProfile) setProfile(cachedProfile);
    if (cachedReport) setReport(cachedReport);
    if (cachedProfile?.targetRole) setTargetRole(cachedProfile.targetRole);
  }, []);

  // Handle file drop/selection
  const handleFileChange = async (selectedFile: File) => {
    setErrorMessage(null);

    // Validation
    const validExtensions = ['pdf', 'docx', 'txt'];
    const ext = selectedFile.name.split('.').pop()?.toLowerCase() || '';
    if (!validExtensions.includes(ext)) {
      setErrorMessage(`Unsupported format .${ext}. Please upload a PDF, DOCX, or TXT file.`);
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrorMessage('File size exceeds the 5MB safety limit.');
      return;
    }

    setFile(selectedFile);
    setIsParsing(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const res = await fetch('/api/resume/parse', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to extract text from file.');
      }

      setProfile(data.profile);
      saveActiveProfile(data.profile);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error parsing file.');
    } finally {
      setIsParsing(false);
    }
  };

  // Handle manual text submission
  const handleManualTextSubmit = async () => {
    if (manualText.trim().length < 50) {
      setErrorMessage('Please provide at least 50 characters of resume text.');
      return;
    }

    setIsParsing(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append('manualText', manualText.trim());

      const res = await fetch('/api/resume/parse', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to parse text.');
      }

      setProfile(data.profile);
      saveActiveProfile(data.profile);
      setShowTextInput(false);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error parsing text.');
    } finally {
      setIsParsing(false);
    }
  };

  // Trigger full Gemini / ATS analysis
  const handleAnalyze = async () => {
    if (!profile) {
      setErrorMessage('Please upload or paste a resume first.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);

    // Simulation steps for user reassurance
    setAnalysisStep('Ingesting parsed taxonomy and tokenizing sections...');
    const stepTimer1 = setTimeout(() => setAnalysisStep('Auditing candidate skills against Gemini reasoning engine...'), 700);
    const stepTimer2 = setTimeout(() => setAnalysisStep('Evaluating Google XYZ quantifiable impact metrics...'), 1400);

    try {
      const updatedProfile = { ...profile, targetRole };
      const res = await fetch('/api/ai/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: updatedProfile,
          targetRole,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Analysis service encountered an issue.');
      }

      setReport(data.report);
      saveActiveReport(data.report);
      setProfile(updatedProfile);
      saveActiveProfile(updatedProfile);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to complete analysis.');
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setIsAnalyzing(false);
      setAnalysisStep('');
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleResetAndClear = () => {
    clearProfileData();
    setProfile(null);
    setReport(null);
    setFile(null);
    setManualText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#E3E3D8] no-print">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-forest-100 text-forest-900 border border-forest-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-limeAccent-600" />
            Deterministic & Generative Career Audit
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-forest-950">
            Resume Intelligence & ATS Diagnostics
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Extract grounded evidence, quantify Google XYZ bullet impact, and audit your standing against target roles.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {profile && (
            <button
              onClick={handleResetAndClear}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-800 hover:bg-rose-100 transition-colors shadow-subtle"
              title="Remove current resume from browser memory and start fresh"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
              Clear & Start Fresh
            </button>
          )}

          {report && (
            <>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-[#E3E3D8] text-xs font-semibold text-forest-900 hover:bg-ivory-100 transition-colors shadow-subtle"
              >
                <Printer className="w-3.5 h-3.5 text-forest-700" />
                Export / Print Report
              </button>
              <Link
                href="/match"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-forest-900 text-white text-xs font-semibold hover:bg-forest-800 transition-colors shadow-subtle"
              >
                <Layers className="w-3.5 h-3.5 text-limeAccent-400" />
                Match Against Job
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-900 flex items-start gap-3 no-print">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold">Notice:</span> {errorMessage}
          </div>
        </div>
      )}

      {/* =====================================================================
          UPLOAD & TARGET ROLE CONFIGURATION SECTION
          ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 no-print">
        
        {/* Left: Drag & Drop Card */}
        <div className="lg:col-span-2 editorial-card p-6 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-forest-800 font-bold flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-forest-600" />
              1. Document Ingestion
            </span>
            <button
              type="button"
              onClick={() => setShowTextInput(!showTextInput)}
              className="text-xs font-semibold text-forest-700 hover:text-forest-950 underline underline-offset-4"
            >
              {showTextInput ? 'Switch to File Upload' : 'Or Paste Raw Resume Text'}
            </button>
          </div>

          {!showTextInput ? (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleFileChange(e.dataTransfer.files[0]);
                }
              }}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#D6D6C4] hover:border-forest-600 bg-ivory-50 hover:bg-ivory-100/60 rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileChange(e.target.files[0]);
                  }
                }}
              />

              <div className="w-14 h-14 rounded-2xl bg-white border border-[#E3E3D8] text-forest-800 flex items-center justify-center group-hover:scale-105 transition-transform shadow-subtle">
                <FileText className="w-7 h-7 text-forest-700" />
              </div>

              <div>
                <p className="text-sm font-bold text-forest-950">
                  {isParsing ? 'Parsing document contents...' : 'Click to browse or drop your resume here'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Supported formats: PDF, DOCX, TXT (Maximum file size: 5MB)
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-forest-700 mt-2 bg-white px-3 py-1 rounded-full border border-[#E3E3D8]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Processed in-memory. Never persisted without consent.
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <textarea
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                placeholder="Paste the complete text of your resume here (experience bullets, skills, education)..."
                rows={8}
                className="w-full p-4 rounded-xl border border-[#D6D6C4] bg-white text-forest-950 text-xs sm:text-sm font-mono focus:border-forest-600 focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={handleManualTextSubmit}
                disabled={isParsing}
                className="px-4 py-2 rounded-lg bg-forest-900 text-white text-xs font-semibold hover:bg-forest-800 transition-colors"
              >
                {isParsing ? 'Parsing Text...' : 'Confirm Pasted Resume'}
              </button>
            </div>
          )}

          {/* Active Profile Info Banner */}
          {profile && (
            <div className="p-4 rounded-xl bg-forest-50 border border-forest-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-forest-950">{profile.name}</span>
                    {profile.fileName.toLowerCase().includes('sample') && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-bold">
                        PRELOADED SAMPLE
                      </span>
                    )}
                  </div>
                  <span className="text-muted-foreground font-mono">
                    {profile.fileName} • {profile.wordCount} words • {profile.skills.length} skills detected
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleResetAndClear}
                className="inline-flex items-center gap-1.5 text-xs text-rose-700 hover:text-rose-900 font-bold px-3 py-1.5 rounded-lg bg-white border border-rose-200 hover:bg-rose-50 transition-colors shadow-subtle"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Remove & Upload Your Own
              </button>
            </div>
          )}
        </div>

        {/* Right: Target Role Configuration */}
        <div className="editorial-card p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-forest-800 font-bold flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-forest-600" />
              2. Target Role Benchmark
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Pathwise evaluates your skills, evidence quotes, and metrics against the exact seniority and technical expectations of your target title.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-forest-950">
                Target Job Title
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Full Stack Engineer"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D6D6C4] bg-white text-sm font-semibold text-forest-950 focus:border-forest-600 focus:outline-none transition-colors"
              />
            </div>

            {/* Quick role pills */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-muted-foreground block">
                Quick Select:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Senior Backend Engineer',
                  'Staff ML Infrastructure',
                  'Full Stack Developer',
                  'Cloud Platform Architect'
                ].map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setTargetRole(r)}
                    className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors ${
                      targetRole === r
                        ? 'bg-forest-900 text-white border-forest-900'
                        : 'bg-ivory-200 text-forest-800 border-[#D6D6C4] hover:bg-ivory-300'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Analyze CTA */}
          <div className="pt-4 border-t border-[#E3E3D8] space-y-2">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isAnalyzing || !profile}
              className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-subtle ${
                !profile
                  ? 'bg-ivory-300 text-forest-400 cursor-not-allowed'
                  : 'bg-forest-900 text-white hover:bg-forest-800 active:scale-[0.98]'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-limeAccent-400" />
                  Analyzing Profile...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-limeAccent-400" />
                  Run AI Career & ATS Audit
                </>
              )}
            </button>

            {isAnalyzing && analysisStep && (
              <p className="text-[11px] text-center font-mono text-forest-700 animate-pulse">
                {analysisStep}
              </p>
            )}
          </div>
        </div>

      </div>


      {/* =====================================================================
          ANALYSIS REPORT RESULTS SECTION
          ===================================================================== */}
      {report && (
        <div className="space-y-10 animate-in fade-in duration-300">
          
          {/* Top Results Overview Card */}
          <div className="editorial-card p-6 sm:p-8 bg-white border border-[#E3E3D8]">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-[#E3E3D8]">
              
              {/* Score Gauge */}
              <div className="w-full lg:w-72 shrink-0 flex flex-col items-center">
                <ScoreGauge
                  score={report.overallScore}
                  label="Overall Fit Score"
                  size="lg"
                  breakdown={report.scoreBreakdown}
                />
              </div>

              {/* Executive Summary */}
              <div className="space-y-4 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-bold">
                      Audit Executive Briefing
                    </span>
                    <h2 className="text-2xl font-extrabold tracking-tight text-forest-950">
                      {report.candidateName} — {report.targetRole}
                    </h2>
                  </div>

                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                    report.isLiveAi
                      ? 'bg-forest-100 text-forest-900 border-forest-300'
                      : 'bg-amber-100/80 text-amber-900 border-amber-300'
                  }`}>
                    <Sparkles className="w-3.5 h-3.5 text-limeAccent-600" />
                    {report.modelUsed}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-forest-800/90 leading-relaxed bg-ivory-100 p-4 rounded-xl border border-[#E3E3D8]">
                  {report.executiveSummary}
                </p>

                {/* ATS Parse Metric */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-white border border-[#E3E3D8] flex items-center gap-2">
                    <span className="text-muted-foreground">ATS Machine Parse Readiness:</span>
                    <span className="font-bold text-forest-950">{report.atsScore}%</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-[#E3E3D8] flex items-center gap-2">
                    <span className="text-muted-foreground">Audit Timestamp:</span>
                    <span className="text-forest-800">{new Date(report.analyzedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Strengths and Weaknesses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              
              {/* Strengths */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Key Verified Strengths
                </div>
                <div className="space-y-2">
                  {report.strengths.map((s, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-forest-50/60 border border-forest-200/80 text-xs sm:text-sm text-forest-900 leading-snug flex items-start gap-2">
                      <span className="font-bold text-emerald-700 shrink-0 font-mono">0{idx+1}.</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weaknesses / Gaps */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-800">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  Priority Vulnerabilities & Gaps
                </div>
                <div className="space-y-2">
                  {report.weaknesses.map((w, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-rose-50/50 border border-rose-200/80 text-xs sm:text-sm text-forest-900 leading-snug flex items-start gap-2">
                      <span className="font-bold text-rose-600 shrink-0 font-mono">0{idx+1}.</span>
                      <span>{w}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>


          {/* Work for FANG: Referral Readiness & Anti-Website Audit */}
          {report.fangAudit && (
            <div className="editorial-card p-6 sm:p-8 bg-forest-950 text-white space-y-6 shadow-elevated">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-forest-800">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-limeAccent-400 text-forest-950">
                    <Award className="w-3.5 h-3.5" />
                    Work for FANG (workforfang.com) Standard
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-white pt-1">
                    FAANG Referral Readiness & "Anti-Website" Audit
                  </h3>
                  <p className="text-xs text-forest-300">
                    Will a senior engineer at Google, Meta, or Apple stake their reputation and submit you internally?
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="p-3 rounded-xl bg-forest-900 border border-forest-700 text-center">
                    <span className="text-[10px] font-mono uppercase text-forest-300 block">Referral Score</span>
                    <span className="text-2xl font-extrabold text-limeAccent-400 font-mono">
                      {report.fangAudit.referralReadinessScore}%
                    </span>
                  </div>
                </div>
              </div>

              {/* 3 Core Rules Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                
                {/* 1-Page Rule */}
                <div className="p-4 rounded-xl bg-forest-900 border border-forest-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-forest-300 text-[10px] uppercase font-bold">1-Page Length Rule</span>
                    {report.fangAudit.onePageRuleCompliance ? (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-900/80 text-emerald-300 border border-emerald-700 font-bold">PASSED</span>
                    ) : (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-900/80 text-rose-300 border border-rose-700 font-bold">TOO VERBOSE</span>
                    )}
                  </div>
                  <p className="text-forest-200 text-xs">
                    {report.fangAudit.onePageRuleCompliance
                      ? 'Complies with strict 1-page density for the 6-second recruiter scan.'
                      : 'Exceeds recommended 1-page length (>700 words). Trim words to avoid recruiter fatigue.'}
                  </p>
                </div>

                {/* Action-Result Format */}
                <div className="p-4 rounded-xl bg-forest-900 border border-forest-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-forest-300 text-[10px] uppercase font-bold">Action-Result Density</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-forest-800 text-limeAccent-300 font-bold">
                      {report.fangAudit.actionResultBulletsPercentage}%
                    </span>
                  </div>
                  <p className="text-forest-200 text-xs">
                    Percentage of bullets leading with strong active verbs and ending in verifiable data.
                  </p>
                </div>

                {/* Fluff Word Filter */}
                <div className="p-4 rounded-xl bg-forest-900 border border-forest-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-forest-300 text-[10px] uppercase font-bold">Fluff & Opinion Filter</span>
                    {report.fangAudit.fluffPhrasesDetected.length === 0 ? (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-900/80 text-emerald-300 border border-emerald-700 font-bold">ZERO FLUFF</span>
                    ) : (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-900/80 text-amber-300 border border-amber-700 font-bold">
                        {report.fangAudit.fluffPhrasesDetected.length} FLUFF WORDS
                      </span>
                    )}
                  </div>
                  <p className="text-forest-200 text-xs">
                    {report.fangAudit.fluffPhrasesDetected.length === 0
                      ? 'No subjective self-evaluations found. 100% grounded in facts.'
                      : `Detected: ${report.fangAudit.fluffPhrasesDetected.slice(0, 3).join(', ')}. Replace with numbers.`}
                  </p>
                </div>

              </div>

              {/* Recruiter Verdict & Strategy */}
              <div className="p-4 rounded-2xl bg-forest-900 border border-forest-800 text-xs space-y-2">
                <div className="flex items-center gap-2 text-limeAccent-300 font-bold font-mono uppercase text-[11px]">
                  <span>Recruiter Referral Verdict:</span>
                </div>
                <p className="text-forest-100 leading-relaxed text-xs sm:text-sm">
                  {report.fangAudit.fangRecruiterVerdict}
                </p>
                <p className="text-forest-300 leading-relaxed pt-1 text-xs border-t border-forest-800">
                  <span className="font-bold text-white">Outreach Strategy:</span> {report.fangAudit.referralRecommendation}
                </p>
              </div>

              {/* Action Link to Templates */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-xs text-forest-300">
                  Want to format your resume to 100% match Google & Meta referral benchmarks?
                </span>
                <Link
                  href="/templates"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-limeAccent-400 text-forest-950 font-bold text-xs hover:bg-limeAccent-300 transition-colors shadow-subtle shrink-0"
                >
                  Browse FAANG 1-Page Templates
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          )}


          {/* Categorized Skills With Evidence Quotes */}
          <div className="editorial-card p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E3E3D8]">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-forest-950 flex items-center gap-2">
                  <Quote className="w-5 h-5 text-forest-700" />
                  Skills Taxonomy & Resume Citations
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Click any skill badge to inspect the exact quote extracted from your resume experience.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-forest-900 font-semibold">
                  <span className="w-2.5 h-2.5 rounded bg-forest-900" /> Evidenced
                </span>
                <span className="flex items-center gap-1.5 text-amber-800 font-semibold">
                  <span className="w-2.5 h-2.5 rounded bg-amber-400" /> Mention Only
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {[
                'Languages', 
                'Frameworks & Libraries', 
                'Cloud & DevOps', 
                'Databases', 
                'Tools & Systems', 
                'Soft Skills & Leadership'
              ].map(cat => {
                const skillsInCat = report.categorizedSkills.filter(s => s.category === cat);
                if (skillsInCat.length === 0) return null;
                return (
                  <div key={cat} className="space-y-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-forest-700">
                      {cat} ({skillsInCat.length})
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {skillsInCat.map(skill => (
                        <SkillBadge key={skill.skill} skill={skill} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Critical Missing Keywords */}
            {report.criticalMissingKeywords.length > 0 && (
              <div className="p-4 rounded-xl bg-ivory-100 border border-[#E3E3D8] space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-forest-800 block">
                  Critical Missing Keywords for "{report.targetRole}"
                </span>
                <p className="text-xs text-muted-foreground">
                  ATS parsers expect these domain terms in technical evaluations for this role:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {report.criticalMissingKeywords.map(kw => (
                    <span key={kw} className="px-2.5 py-1 rounded bg-white text-xs font-mono font-semibold text-forest-800 border border-[#D6D6C4]">
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>


          {/* Google XYZ Bullet Optimization */}
          <div className="editorial-card p-6 sm:p-8 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-limeAccent-100 text-forest-900 border border-limeAccent-300 mb-2">
                Google XYZ Formula: Accomplished [X] as measured by [Y] by doing [Z]
              </div>
              <h3 className="text-xl font-bold tracking-tight text-forest-950">
                Targeted Bullet Point Transformations
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Rewrites that convert passive descriptions into high-leverage accomplishments for engineering hiring managers.
              </p>
            </div>

            <div className="space-y-4">
              {report.bulletImprovements.map((b, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-ivory-100 border border-[#E3E3D8] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-forest-700 font-bold uppercase tracking-wider">
                      Transformation 0{idx+1} — {b.targetedSkillOrMetric}
                    </span>
                  </div>

                  {/* Before */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-rose-700 font-bold">Original Resume Bullet:</span>
                    <p className="text-xs sm:text-sm text-forest-900 bg-white p-3 rounded-lg border border-rose-200 font-mono">
                      "{b.originalBullet}"
                    </p>
                  </div>

                  {/* Critique */}
                  <div className="text-xs text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                    <span className="font-bold">ATS Flaw:</span> {b.critique}
                  </div>

                  {/* After */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold">Optimized Google XYZ Bullet:</span>
                    <p className="text-xs sm:text-sm text-forest-950 bg-white p-3.5 rounded-lg border-2 border-forest-900 font-semibold leading-relaxed">
                      "{b.improvedGoogleXYZ}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* 90-Day Career Improvement Roadmap */}
          <div className="editorial-card p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-forest-800 font-bold block mb-1">
                Strategic Career Execution
              </span>
              <h3 className="text-xl font-bold tracking-tight text-forest-950">
                Personalized 90-Day Career Roadmap
              </h3>
              <p className="text-xs text-muted-foreground">
                Follow these high-ROI steps to bridge detected skill gaps and maximize hiring outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {report.roadmap.map((step, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-white border border-[#E3E3D8] flex flex-col justify-between space-y-4 shadow-subtle">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-forest-700 px-2 py-0.5 rounded bg-ivory-200">
                        {step.timeframe}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        step.priority === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-forest-100 text-forest-800'
                      }`}>
                        {step.priority} Priority
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-forest-950 pt-1">
                      {step.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E3E3D8] text-xs">
                    <span className="font-bold text-forest-900 block text-[11px] uppercase font-mono mb-1">Actionable Task:</span>
                    <p className="text-forest-800 bg-ivory-100 p-2.5 rounded-lg border border-[#E3E3D8] font-medium leading-snug">
                      {step.actionableStep}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Bottom Next Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-forest-950 text-white no-print">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-base font-bold">Ready to match this profile against a specific vacancy?</h4>
              <p className="text-xs text-forest-300">
                Paste any job description to calculate exact match percentages and tailored interview pitches.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/match"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-limeAccent-400 text-forest-950 font-bold text-xs hover:bg-limeAccent-300 transition-colors shadow-subtle"
              >
                Compare Against Job Description
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
