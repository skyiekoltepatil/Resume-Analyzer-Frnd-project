'use client';

import React from 'react';

interface ScoreGaugeProps {
  score: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  breakdown?: {
    impactAndQuantification?: number;
    skillEvidenceAndDepth?: number;
    atsClarityAndStructure?: number;
    roleRelevance?: number;
  };
}

export default function ScoreGauge({ score, label = 'Overall Compatibility', size = 'md', breakdown }: ScoreGaugeProps) {
  // Score color spectrum
  const getColor = (val: number) => {
    if (val >= 80) return { stroke: '#15803D', bg: 'bg-emerald-50', text: 'text-emerald-800', bar: 'bg-emerald-600' };
    if (val >= 65) return { stroke: '#84CC16', bg: 'bg-limeAccent-50', text: 'text-forest-900', bar: 'bg-limeAccent-500' };
    if (val >= 50) return { stroke: '#D97706', bg: 'bg-amber-50', text: 'text-amber-800', bar: 'bg-amber-500' };
    return { stroke: '#E11D48', bg: 'bg-rose-50', text: 'text-rose-800', bar: 'bg-rose-500' };
  };

  const color = getColor(score);
  const radius = size === 'lg' ? 54 : size === 'sm' ? 32 : 44;
  const strokeWidth = size === 'lg' ? 9 : size === 'sm' ? 5 : 7;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const dimension = (radius + strokeWidth) * 2;

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center">
        <svg width={dimension} height={dimension} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            stroke="#E7E7DC"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            stroke={color.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`font-extrabold tracking-tight text-forest-950 ${size === 'lg' ? 'text-4xl' : size === 'sm' ? 'text-xl' : 'text-3xl'}`}>
            {score}
          </span>
          <span className="text-[11px] font-semibold text-muted-foreground -mt-1 uppercase tracking-wider font-mono">
            / 100
          </span>
        </div>
      </div>

      <div className="mt-2 text-center">
        <span className="text-xs font-semibold text-forest-900">
          {label}
        </span>
      </div>

      {/* Optional breakdown bars */}
      {breakdown && (
        <div className="w-full mt-6 space-y-3 pt-4 border-t border-[#E3E3D8]">
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-medium text-forest-800">
              <span>Quantified Impact (XYZ)</span>
              <span className="font-mono font-bold">{breakdown.impactAndQuantification || 0}%</span>
            </div>
            <div className="w-full h-1.5 bg-ivory-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getColor(breakdown.impactAndQuantification || 0).bar} transition-all duration-700`}
                style={{ width: `${breakdown.impactAndQuantification || 0}%` }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-medium text-forest-800">
              <span>Skill Evidence Depth</span>
              <span className="font-mono font-bold">{breakdown.skillEvidenceAndDepth || 0}%</span>
            </div>
            <div className="w-full h-1.5 bg-ivory-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getColor(breakdown.skillEvidenceAndDepth || 0).bar} transition-all duration-700`}
                style={{ width: `${breakdown.skillEvidenceAndDepth || 0}%` }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-medium text-forest-800">
              <span>ATS Parse Clarity</span>
              <span className="font-mono font-bold">{breakdown.atsClarityAndStructure || 0}%</span>
            </div>
            <div className="w-full h-1.5 bg-ivory-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getColor(breakdown.atsClarityAndStructure || 0).bar} transition-all duration-700`}
                style={{ width: `${breakdown.atsClarityAndStructure || 0}%` }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-medium text-forest-800">
              <span>Target Role Relevance</span>
              <span className="font-mono font-bold">{breakdown.roleRelevance || 0}%</span>
            </div>
            <div className="w-full h-1.5 bg-ivory-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getColor(breakdown.roleRelevance || 0).bar} transition-all duration-700`}
                style={{ width: `${breakdown.roleRelevance || 0}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
