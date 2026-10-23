import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Sparkles, HeartHandshake, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#E3E3D8] bg-[#F3F3EC] text-forest-950 mt-20 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Responsible AI Manifesto Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E3E3D8] shadow-subtle mb-14">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-forest-100 text-forest-800 border border-forest-200">
                <ShieldCheck className="w-3.5 h-3.5 text-forest-700" />
                Responsible Career AI Standard (2026–2027)
              </div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-forest-950">
                Ethical Grounding & Explainable Career Intelligence
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Pathwise operates on strict factual grounding: every skill score, gap diagnostic, and compatibility percentage is derived directly from verifiable resume text and verified job specifications. We never hallucinate credentials, predict arbitrary hiring decisions, or rank candidates on age, gender, race, or other protected demographic indicators.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 text-xs text-forest-700 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Ephemeral Memory Processing
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Zero Demographic Profiling
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Deterministic Audit Grounding
              </span>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-forest-800 mb-4">
              Intelligence
            </h4>
            <ul className="space-y-2.5 text-sm text-forest-700">
              <li><Link href="/analyzer" className="hover:text-forest-950 transition-colors">Resume Analyzer</Link></li>
              <li><Link href="/match" className="hover:text-forest-950 transition-colors">Job Match Analysis</Link></li>
              <li><Link href="/jobs" className="hover:text-forest-950 transition-colors">Verified Job Directory</Link></li>
              <li><Link href="/dashboard" className="hover:text-forest-950 transition-colors">Career Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-forest-800 mb-4">
              AI Methodology
            </h4>
            <ul className="space-y-2.5 text-sm text-forest-700">
              <li><span className="cursor-default">Google XYZ Formula</span></li>
              <li><span className="cursor-default">Evidence vs Mention Parsing</span></li>
              <li><span className="cursor-default">Two-Tower Vector Match</span></li>
              <li><Link href="/settings" className="hover:text-forest-950 transition-colors">Model Configuration</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-forest-800 mb-4">
              Data Feeds
            </h4>
            <ul className="space-y-2.5 text-sm text-forest-700">
              <li><span className="cursor-default">Remotive Live Remote API</span></li>
              <li><span className="cursor-default">Curated Engineering Benchmarks</span></li>
              <li><span className="cursor-default">ATS Compatibility Heuristics</span></li>
              <li><span className="cursor-default">Zero-Fabrication Guarantee</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-forest-800 mb-4">
              Privacy & Consent
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              Uploaded resumes are processed in-memory. No resume is persisted to third parties without your explicit command.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-800 bg-white px-2.5 py-1.5 rounded-lg border border-[#E3E3D8]">
              <Lock className="w-3.5 h-3.5 text-forest-600" />
              Client-Guarded Privacy
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#E3E3D8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Pathwise Career Intelligence. Built for high-integrity career elevation.</p>
          <div className="flex items-center gap-6">
            <span>Powered by Gemini & Deterministic ATS</span>
            <span className="font-mono text-forest-700">Version 2.0-Prod</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
