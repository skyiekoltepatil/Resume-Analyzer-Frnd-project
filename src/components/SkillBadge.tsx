'use client';

import React, { useState } from 'react';
import { Check, HelpCircle, AlertCircle, Quote } from 'lucide-react';
import { SkillEvidence } from '@/lib/types';

interface SkillBadgeProps {
  skill: SkillEvidence | string;
  status?: 'explicitly_evidenced' | 'mentioned_weak_evidence' | 'not_found' | 'matched' | 'missing';
  quote?: string;
  category?: string;
}

export default function SkillBadge({ skill, status, quote, category }: SkillBadgeProps) {
  const [showQuote, setShowQuote] = useState(false);

  const skillName = typeof skill === 'string' ? skill : skill.skill;
  const effectiveStatus = status || (typeof skill === 'object' ? skill.evidenceStatus : 'explicitly_evidenced');
  const evidenceQuote = quote || (typeof skill === 'object' ? skill.evidenceQuote : undefined);
  const skillCategory = category || (typeof skill === 'object' ? skill.category : undefined);

  if (effectiveStatus === 'explicitly_evidenced' || effectiveStatus === 'matched') {
    return (
      <div className="relative inline-block">
        <button
          type="button"
          onClick={() => setShowQuote(!showQuote)}
          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-forest-900 text-limeAccent-300 border border-forest-800 hover:bg-forest-800 transition-colors shadow-subtle group text-left"
          title={evidenceQuote ? 'Click to view evidence citation from resume' : undefined}
        >
          <Check className="w-3.5 h-3.5 text-limeAccent-400 shrink-0" />
          <span>{skillName}</span>
          {evidenceQuote && (
            <Quote className="w-3 h-3 text-forest-300 opacity-60 group-hover:opacity-100 transition-opacity" />
          )}
        </button>

        {showQuote && evidenceQuote && (
          <div className="absolute left-0 bottom-full mb-2 z-30 max-w-[min(18rem,85vw)] p-3 bg-forest-950 text-white text-xs rounded-xl shadow-elevated border border-forest-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between text-[10px] uppercase font-mono text-limeAccent-300 mb-1.5 font-bold">
              <span>Verified Resume Evidence</span>
              <span>{skillCategory || 'Skill'}</span>
            </div>
            <p className="italic text-ivory-200 text-[11px] leading-relaxed border-l-2 border-limeAccent-400 pl-2">
              "{evidenceQuote}"
            </p>
          </div>
        )}
      </div>
    );
  }

  if (effectiveStatus === 'mentioned_weak_evidence') {
    return (
      <div className="relative inline-block">
        <button
          type="button"
          onClick={() => setShowQuote(!showQuote)}
          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-amber-50 text-amber-900 border border-amber-300/80 hover:bg-amber-100 transition-colors text-left"
          title="Mentioned without quantitative project proof"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span>{skillName}</span>
          <span className="text-[10px] text-amber-700 font-mono">(Unverified Proof)</span>
        </button>

        {showQuote && (
          <div className="absolute left-0 bottom-full mb-2 z-30 max-w-[min(16rem,85vw)] p-3 bg-white text-forest-950 text-xs rounded-xl shadow-card border border-amber-200">
            <span className="font-bold text-amber-900 block mb-1">Context Gap</span>
            <p className="text-[11px] text-muted-foreground leading-snug">
              This skill was identified in your skills list or brief summary, but lacks concrete project accomplishment bullets measuring its usage.
            </p>
          </div>
        )}
      </div>
    );
  }

  // Missing or Gap
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-rose-50/80 text-rose-800 border border-rose-200">
      <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
      <span>{skillName}</span>
      <span className="text-[10px] text-rose-600 font-mono font-normal">Missing</span>
    </span>
  );
}
