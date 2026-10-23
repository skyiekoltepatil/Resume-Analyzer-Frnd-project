'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Lock, 
  Key, 
  Cpu, 
  Trash2,
  Info,
  Server
} from 'lucide-react';
import { clearProfileData } from '@/lib/storage';

export default function SettingsPage() {
  const [testing, setTesting] = useState(false);
  const [diagnostic, setDiagnostic] = useState<{
    connected: boolean;
    model: string;
    latencyMs: number;
    message: string;
  } | null>(null);
  const [clearedData, setClearedData] = useState(false);

  const runTest = async () => {
    setTesting(true);
    try {
      const res = await fetch('/api/ai/test');
      const data = await res.json();
      if (data.success && data.diagnostic) {
        setDiagnostic(data.diagnostic);
      } else {
        setDiagnostic({
          connected: false,
          model: 'Unknown',
          latencyMs: 0,
          message: data.error || 'Failed to communicate with diagnostic API.',
        });
      }
    } catch (e: any) {
      setDiagnostic({
        connected: false,
        model: 'Unknown',
        latencyMs: 0,
        message: e.message || 'Network error executing diagnostic test.',
      });
    } finally {
      setTesting(false);
    }
  };

  useEffect(() => {
    runTest();
  }, []);

  const handleClearCache = () => {
    clearProfileData();
    setClearedData(true);
    setTimeout(() => setClearedData(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="pb-6 border-b border-[#E3E3D8]">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-forest-100 text-forest-900 border border-forest-200 mb-2">
          <Settings className="w-3.5 h-3.5 text-forest-700" />
          Architecture & Model Diagnostics
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-forest-950">
          AI Provider Settings & Security
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Monitor your server-side Google Gen AI SDK connection, model fallback configuration, and privacy standards.
        </p>
      </div>

      {/* Connection Status Box */}
      <div className="editorial-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E3E3D8]">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
              diagnostic?.connected
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}>
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-forest-950">
                  {diagnostic?.connected ? 'Google Gemini AI Live & Verified' : 'Deterministic ATS Engine Active'}
                </h3>
                <span className={`w-2.5 h-2.5 rounded-full ${diagnostic?.connected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                Model: <span className="text-forest-900 font-bold">{diagnostic?.model || 'Evaluating...'}</span>
                {diagnostic?.latencyMs ? ` • Roundtrip Latency: ${diagnostic.latencyMs}ms` : ''}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={runTest}
            disabled={testing}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-900 text-white font-semibold text-xs hover:bg-forest-800 transition-colors shadow-subtle shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin text-limeAccent-400' : ''}`} />
            {testing ? 'Testing...' : 'Test AI Connection'}
          </button>
        </div>

        {/* Detailed diagnostic message */}
        <div className={`p-4 rounded-xl border text-xs space-y-1.5 ${
          diagnostic?.connected
            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
            : 'bg-amber-50/70 border-amber-200 text-amber-950'
        }`}>
          <div className="font-bold flex items-center gap-1.5 font-mono uppercase text-[11px]">
            {diagnostic?.connected ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Connection Operational
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Fallback Mode Active
              </>
            )}
          </div>
          <p className="leading-relaxed">
            {diagnostic?.message}
          </p>
          {!diagnostic?.connected && (
            <p className="text-amber-800 pt-1 font-mono text-[11px]">
              To enable live Gemini analysis, add your key to <code className="bg-white/80 px-1 py-0.5 rounded border border-amber-300">.env.local</code> as <code className="font-bold">GEMINI_API_KEY=AIzaSy...</code> and restart the development server.
            </p>
          )}
        </div>
      </div>


      {/* Configuration & Environment Variables Guide */}
      <div className="editorial-card p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 text-forest-950">
          <Key className="w-5 h-5 text-forest-700" />
          <h3 className="text-lg font-bold tracking-tight">
            Environment Variables Configuration (.env.local)
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Configure these server-side variables in your root <code className="font-mono font-bold text-forest-900">.env.local</code>. Pathwise strictly follows zero-leak architecture: credentials are never serialized into JavaScript bundles or transmitted to the client browser.
        </p>

        <div className="p-4 rounded-xl bg-forest-950 text-white font-mono text-xs space-y-2 overflow-x-auto">
          <div className="text-forest-400">// Server-Side Configuration File: .env.local</div>
          <div><span className="text-limeAccent-300">GEMINI_API_KEY</span>=your_google_ai_studio_api_key_here</div>
          <div><span className="text-limeAccent-300">GEMINI_MODEL</span>=gemini-2.5-flash <span className="text-forest-400"># or gemini-3.8-flash, gemini-1.5-flash</span></div>
          <div><span className="text-limeAccent-300">GEMINI_FALLBACK_MODEL</span>=gemini-1.5-flash</div>
          <div><span className="text-limeAccent-300">ENABLE_LIVE_JOB_API</span>=true <span className="text-forest-400"># queries Remotive public API</span></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-4 rounded-xl bg-ivory-100 border border-[#E3E3D8] space-y-1">
            <span className="font-bold text-forest-950 font-mono block">gemini-2.5-flash / gemini-3.8-flash</span>
            <p className="text-muted-foreground leading-relaxed">
              Recommended production models. Delivers low latency, high reasoning quality, and native structured JSON schema enforcement.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-ivory-100 border border-[#E3E3D8] space-y-1">
            <span className="font-bold text-forest-950 font-mono block">Deterministic ATS Engine</span>
            <p className="text-muted-foreground leading-relaxed">
              Automated offline fallback. Performs syntactic tokenization, Google XYZ metric extraction, and weighted keyword taxonomy scoring without external API calls.
            </p>
          </div>
        </div>
      </div>


      {/* Security & Client Guardrails */}
      <div className="editorial-card p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-2 text-forest-950">
          <Lock className="w-5 h-5 text-forest-700" />
          <h3 className="text-lg font-bold tracking-tight">
            Security & Candidate Privacy Guardrails
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white border border-[#E3E3D8] space-y-1.5 shadow-subtle">
            <div className="flex items-center gap-1.5 font-bold text-forest-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              In-Memory Processing
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Binary PDF and DOCX files are parsed in server memory buffers and cleared immediately after text extraction.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E3E3D8] space-y-1.5 shadow-subtle">
            <div className="flex items-center gap-1.5 font-bold text-forest-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Zero Demographic Profiling
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Pathwise explicitly excludes age, race, gender, postal codes, and proxy signals from candidate compatibility scoring.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E3E3D8] space-y-1.5 shadow-subtle">
            <div className="flex items-center gap-1.5 font-bold text-forest-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Zero Hallucinations Policy
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Skills and projects not explicitly attested by the candidate resume are marked as unevidenced or missing.
            </p>
          </div>
        </div>
      </div>


      {/* Local Storage & Session Data Management */}
      <div className="editorial-card p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E3E3D8]">
          <div>
            <h3 className="text-base font-bold text-forest-950">
              Local Browser Cache Management
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Purge your active uploaded resume and saved match reports from your browser's localStorage.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClearCache}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100 text-xs font-semibold transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            {clearedData ? 'Data Purged!' : 'Purge Local Cache'}
          </button>
        </div>
      </div>

    </div>
  );
}
