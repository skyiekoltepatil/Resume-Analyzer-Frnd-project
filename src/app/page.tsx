'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Briefcase, 
  Layers, 
  TrendingUp, 
  Target, 
  Cpu, 
  Quote, 
  Award,
  ChevronRight,
  Sliders,
  Check,
  AlertCircle
} from 'lucide-react';

export default function LandingPage() {
  const [activeWorkflowTab, setActiveWorkflowTab] = useState<'extraction' | 'grounding' | 'matching' | 'xyz'>('grounding');

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-16">
      
      {/* =====================================================================
          HERO SECTION
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
          
          {/* Subtle Category Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-forest-100/80 text-forest-900 border border-forest-200 shadow-subtle animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Sparkles className="w-3.5 h-3.5 text-limeAccent-600" />
            <span>Next-Generation Career Intelligence & ATS Audit</span>
          </div>

          {/* High-Contrast Editorial Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-forest-950 leading-[1.08]">
            Evidence-grounded career intelligence. <br className="hidden sm:inline" />
            <span className="text-forest-700 underline decoration-limeAccent-400 decoration-wavy decoration-2 underline-offset-8">
              Zero resume hallucinations.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-forest-700/90 max-w-2xl font-normal leading-relaxed">
            Upload your resume to extract verifiable skills, calculate mathematically explainable role compatibility, and rewrite passive bullet points into high-impact Google XYZ achievements.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 w-full sm:w-auto">
            <Link
              href="/analyzer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-forest-900 text-white hover:bg-forest-800 text-base font-semibold shadow-elevated transition-all active:scale-[0.98] group"
            >
              <Sparkles className="w-4 h-4 text-limeAccent-400 group-hover:rotate-12 transition-transform" />
              Analyze Your Resume Now
              <ArrowRight className="w-4 h-4 text-limeAccent-300 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/jobs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-forest-900 hover:bg-ivory-200 border border-[#E3E3D8] text-base font-semibold shadow-subtle transition-all"
            >
              <Briefcase className="w-4 h-4 text-forest-600" />
              Browse Verified Jobs
            </Link>
          </div>

          {/* Social Proof & Integrity Metrics */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-xs font-mono text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Google XYZ Impact Audit
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Gemini 3.8 / 2.5 Structured Reasoning
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Live Remotive Job Sync
            </span>
          </div>

        </div>

        {/* Hero Interactive UI Preview Card */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto rounded-2xl bg-white border border-[#E3E3D8] shadow-elevated p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 pb-6 border-b border-[#E3E3D8]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-3 h-3 rounded-full bg-rose-400 shrink-0" />
              <div className="w-3 h-3 rounded-full bg-amber-400 shrink-0" />
              <div className="w-3 h-3 rounded-full bg-emerald-400 shrink-0" />
              <span className="text-xs font-mono text-muted-foreground ml-2 truncate">
                Pathwise Diagnostic Engine — Live Candidate Profile
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 self-start text-xs font-mono px-2.5 py-0.5 rounded-full bg-forest-50 text-forest-800 border border-forest-200 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Factual Grounding Verified
            </span>
          </div>

          {/* Inside Mock Audit Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            
            {/* Left Column: Overall Fit */}
            <div className="p-5 rounded-xl bg-ivory-100 border border-[#E3E3D8] flex flex-col justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-bold">
                  Role Compatibility
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-forest-950 font-mono">88%</span>
                  <span className="text-xs text-emerald-700 font-semibold">Senior SWE Benchmark</span>
                </div>
              </div>
              <div className="space-y-2 pt-4">
                <div className="flex justify-between text-xs text-forest-800 font-medium">
                  <span>ATS Parse Reliability</span>
                  <span className="font-mono font-bold">94%</span>
                </div>
                <div className="w-full h-1.5 bg-ivory-300 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full w-[94%]" />
                </div>
                <div className="flex justify-between text-xs text-forest-800 font-medium">
                  <span>Quantified XYZ Metrics</span>
                  <span className="font-mono font-bold">78%</span>
                </div>
                <div className="w-full h-1.5 bg-ivory-300 rounded-full overflow-hidden">
                  <div className="h-full bg-limeAccent-500 rounded-full w-[78%]" />
                </div>
              </div>
            </div>

            {/* Middle Column: Skills Evidence Audit */}
            <div className="p-5 rounded-xl bg-ivory-100 border border-[#E3E3D8] space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-bold block">
                Evidence vs Mention Audit
              </span>
              <div className="space-y-2">
                <div className="p-2 rounded bg-white border border-[#E3E3D8] flex items-center justify-between text-xs">
                  <span className="font-semibold text-forest-950 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Python & PyTorch
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Evidenced in 3 bullets
                  </span>
                </div>
                <div className="p-2 rounded bg-white border border-[#E3E3D8] flex items-center justify-between text-xs">
                  <span className="font-semibold text-forest-950 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Distributed Systems
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Evidenced with 15k QPS
                  </span>
                </div>
                <div className="p-2 rounded bg-white border border-amber-200 flex items-center justify-between text-xs">
                  <span className="font-semibold text-amber-950 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Kubernetes
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-300">
                    Mentioned (Zero metrics)
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Google XYZ Transformation */}
            <div className="p-5 rounded-xl bg-forest-950 text-white space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-limeAccent-300 font-bold">
                  Google XYZ Optimization
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-forest-800 text-limeAccent-400">
                  +28% Recruiter Conversion
                </span>
              </div>
              <div className="text-xs space-y-2">
                <div className="text-forest-400 line-through text-[11px]">
                  "Assisted with backend APIs and helped speed up query response times."
                </div>
                <div className="p-2.5 rounded bg-forest-900 border border-forest-800 text-[11px] text-limeAccent-100 leading-relaxed">
                  <span className="text-limeAccent-300 font-bold block mb-0.5">Optimized:</span>
                  "Engineered distributed Redis caching layers for 6 core microservices, reducing p99 API latency by 42% across 2.4M daily payment transactions."
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =====================================================================
          THREE CORE CAPABILITIES
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-mono font-bold tracking-wider text-forest-700">
            Engineered For Depth
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-forest-950">
            Three principles of high-integrity career elevation
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Built to surpass the superficial keyword matching of legacy applicant tracking systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="editorial-card p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-forest-100 text-forest-900 flex items-center justify-center font-bold">
                <FileText className="w-6 h-6 text-forest-800" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-forest-950">
                1. Evidence-Grounded Resume Diagnostics
              </h3>
              <p className="text-sm text-forest-800/80 leading-relaxed">
                Generic ATS tools count keywords. Pathwise scans for syntactic proof: we separate buzzwords in a skills list from capabilities explicitly proven in work experience and technical accomplishments.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-forest-700 font-medium pt-4 border-t border-[#E3E3D8]">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> PDF and DOCX text extraction</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Direct sentence evidence attribution</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Parse formatting defect detection</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="editorial-card p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-forest-100 text-forest-900 flex items-center justify-center font-bold">
                <Layers className="w-6 h-6 text-forest-800" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-forest-950">
                2. Explainable Two-Tower Job Matching
              </h3>
              <p className="text-sm text-forest-800/80 leading-relaxed">
                Receive an honest compatibility score backed by four transparent criteria: Core Skills (40%), Experience Scope (30%), Tooling Depth (15%), and Demonstrated Impact (15%).
              </p>
            </div>
            <ul className="space-y-2 text-xs text-forest-700 font-medium pt-4 border-t border-[#E3E3D8]">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Weighted mathematical rubric</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Matched vs Missing breakdown</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Tailored 3-sentence summary pitch</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="editorial-card p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-forest-100 text-forest-900 flex items-center justify-center font-bold">
                <TrendingUp className="w-6 h-6 text-forest-800" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-forest-950">
                3. Google XYZ Impact & Career Roadmap
              </h3>
              <p className="text-sm text-forest-800/80 leading-relaxed">
                Transform weak, duty-oriented phrases into metric-backed achievements: "Accomplished [X] as measured by [Y] by doing [Z]". Receive a prioritized 90-day trajectory.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-forest-700 font-medium pt-4 border-t border-[#E3E3D8]">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Bullet-by-bullet critiques</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 1-2 week immediate action fixes</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Verified live vacancy recommendations</li>
            </ul>
          </div>

        </div>
      </section>


      {/* =====================================================================
          INTERACTIVE WORKFLOW VISUALIZER
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-forest-950 text-white shadow-elevated">
          <div className="max-w-3xl mb-8 space-y-3">
            <span className="text-xs uppercase font-mono font-bold tracking-wider text-limeAccent-400">
              Interactive Workflow
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              See the Pathwise intelligence engine in motion
            </h2>
            <p className="text-sm sm:text-base text-forest-200">
              Click through the four analysis phases to experience how raw resume documents are parsed, verified, matched, and elevated.
            </p>
          </div>

          {/* Tab Selection */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 pb-6 border-b border-forest-800">
            <button
              onClick={() => setActiveWorkflowTab('extraction')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold font-mono transition-all ${
                activeWorkflowTab === 'extraction'
                  ? 'bg-limeAccent-400 text-forest-950 font-bold shadow-subtle'
                  : 'bg-forest-900 text-forest-300 hover:text-white'
              }`}
            >
              Phase 1: Ingestion & Parsing
            </button>
            <button
              onClick={() => setActiveWorkflowTab('grounding')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold font-mono transition-all ${
                activeWorkflowTab === 'grounding'
                  ? 'bg-limeAccent-400 text-forest-950 font-bold shadow-subtle'
                  : 'bg-forest-900 text-forest-300 hover:text-white'
              }`}
            >
              Phase 2: Evidence Grounding
            </button>
            <button
              onClick={() => setActiveWorkflowTab('matching')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold font-mono transition-all ${
                activeWorkflowTab === 'matching'
                  ? 'bg-limeAccent-400 text-forest-950 font-bold shadow-subtle'
                  : 'bg-forest-900 text-forest-300 hover:text-white'
              }`}
            >
              Phase 3: Explainable Matching
            </button>
            <button
              onClick={() => setActiveWorkflowTab('xyz')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold font-mono transition-all ${
                activeWorkflowTab === 'xyz'
                  ? 'bg-limeAccent-400 text-forest-950 font-bold shadow-subtle'
                  : 'bg-forest-900 text-forest-300 hover:text-white'
              }`}
            >
              Phase 4: Google XYZ Elevation
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="pt-8">
            {activeWorkflowTab === 'extraction' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Surgical Document Extraction</h3>
                  <p className="text-sm text-forest-200 leading-relaxed">
                    Pathwise extracts raw text from PDF and DOCX files without external tracking pixels or data brokers. It segments sections, detects chronological date gaps, and maps technical keywords to our canonical taxonomy of 350+ skills.
                  </p>
                  <div className="p-4 rounded-xl bg-forest-900/80 border border-forest-800 text-xs font-mono space-y-1 text-limeAccent-300">
                    <div>✓ File integrity validated (PDF / DOCX binary scan)</div>
                    <div>✓ Contact coordinates & GitHub/LinkedIn extracted</div>
                    <div>✓ 647 words indexed across 4 experience sections</div>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-forest-900 border border-forest-800 font-mono text-xs text-forest-300 space-y-2">
                  <div className="text-white font-bold pb-2 border-b border-forest-800">
                    // Parsed Taxonomy Metadata
                  </div>
                  <div>"candidate": "Alex Rivera",</div>
                  <div>"detectedExperienceYears": 4.5,</div>
                  <div>"skillsTaxonomyIdentified": ["TypeScript", "Next.js", "Docker", "PostgreSQL", "Kafka"],</div>
                  <div>"atsStructureIntegrity": 96%</div>
                </div>
              </div>
            )}

            {activeWorkflowTab === 'grounding' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Separating Proof From Fluff</h3>
                  <p className="text-sm text-forest-200 leading-relaxed">
                    Recruiters know that anyone can type "Kubernetes" or "Machine Learning" in a list of skills. Pathwise cross-references every declared skill with the project bullets to distinguish between verified accomplishments and unproven mentions.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded bg-forest-900 border border-emerald-500/50 text-emerald-400 text-xs font-mono">
                      ✓ Evidenced With Metrics
                    </span>
                    <span className="px-3 py-1 rounded bg-forest-900 border border-amber-500/50 text-amber-400 text-xs font-mono">
                      ⚠ Mentioned Casual
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-forest-900 border border-emerald-500/40 space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-400">
                      <span>SKILL: PostgreSQL</span>
                      <span>EXPLICITLY EVIDENCED</span>
                    </div>
                    <p className="text-xs text-ivory-200 italic">
                      "Partitioned 500M+ row ledger tables in PostgreSQL, cutting query latency from 850ms to 42ms."
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-forest-900 border border-amber-500/40 space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-400">
                      <span>SKILL: Redis</span>
                      <span>MENTIONED (NO CONTEXT)</span>
                    </div>
                    <p className="text-xs text-forest-300 italic">
                      Found in summary keyword block without corresponding project metrics.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeWorkflowTab === 'matching' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Rubric-Driven Compatibility</h3>
                  <p className="text-sm text-forest-200 leading-relaxed">
                    Instead of a black-box percentage, Pathwise displays an explainable breakdown: Core Skills (40%), Experience (30%), Tools & Systems (15%), and Scope of Impact (15%). Candidates understand exactly why they fit or what is missing.
                  </p>
                  <div className="text-xs font-mono text-limeAccent-300">
                    Total Match = (0.40 × Core) + (0.30 × Exp) + (0.15 × Tools) + (0.15 × Impact)
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-forest-900 border border-forest-800 space-y-3 text-xs">
                  <div className="flex justify-between text-forest-200 font-semibold">
                    <span>Core Skills Alignment (40%)</span>
                    <span className="font-mono text-limeAccent-400">92%</span>
                  </div>
                  <div className="w-full h-1.5 bg-forest-800 rounded-full overflow-hidden">
                    <div className="h-full bg-limeAccent-400 w-[92%]" />
                  </div>
                  <div className="flex justify-between text-forest-200 font-semibold">
                    <span>Experience Scope (30%)</span>
                    <span className="font-mono text-limeAccent-400">80%</span>
                  </div>
                  <div className="w-full h-1.5 bg-forest-800 rounded-full overflow-hidden">
                    <div className="h-full bg-limeAccent-400 w-[80%]" />
                  </div>
                  <div className="flex justify-between text-forest-200 font-semibold">
                    <span>Tools & Systems (15%)</span>
                    <span className="font-mono text-amber-400">65%</span>
                  </div>
                  <div className="w-full h-1.5 bg-forest-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 w-[65%]" />
                  </div>
                </div>
              </div>
            )}

            {activeWorkflowTab === 'xyz' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">The Google XYZ Formula in Practice</h3>
                  <p className="text-sm text-forest-200 leading-relaxed">
                    Laszlo Bock's gold standard for tech resumes: "Accomplished [X] as measured by [Y] by doing [Z]". Pathwise diagnoses weak verbs and automatically suggests metric-anchored rewrites.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-forest-900 border border-forest-800 space-y-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono text-rose-400 font-bold">Original Candidate Bullet:</span>
                    <div className="p-3 rounded-lg bg-forest-950 border border-rose-900 text-rose-200">
                      "Responsible for improving page load times on the main marketing website."
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono text-limeAccent-400 font-bold">Pathwise XYZ Elevation:</span>
                    <div className="p-3 rounded-lg bg-forest-950 border border-limeAccent-500/50 text-limeAccent-100 leading-relaxed">
                      "Accelerated Largest Contentful Paint (LCP) from 3.8s to 1.1s by refactoring React hydration and deploying edge CDN caching, boosting organic search conversions by 24%."
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>


      {/* =====================================================================
          FINAL CALL TO ACTION BANNER
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-white border border-[#E3E3D8] text-center space-y-6 shadow-subtle">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-forest-100 text-forest-900">
            <Award className="w-3.5 h-3.5 text-forest-700" />
            Begin Your Career Intelligence Audit
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-forest-950 max-w-3xl mx-auto">
            Ready to measure your resume against genuine tech standards?
          </h2>

          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Upload your resume now in PDF or DOCX format. Free, private, and powered by evidence-based AI diagnostics.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/analyzer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-forest-900 text-white hover:bg-forest-800 text-base font-semibold shadow-elevated transition-all active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-limeAccent-400" />
              Upload Resume & Audit Now
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-ivory-100 text-forest-900 hover:bg-ivory-200 border border-[#E3E3D8] text-base font-semibold transition-all active:scale-[0.98]"
            >
              Open Career Dashboard
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
