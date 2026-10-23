'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FileText, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Award, 
  Download, 
  Share2, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  Code2, 
  Printer, 
  Layers, 
  ExternalLink,
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Globe
} from 'lucide-react';
import { FANG_TEMPLATES, WORK_FOR_FANG_REFERRAL_GUIDE, ResumeTemplate } from '@/lib/fang-templates';
import { parseResumeProfile } from '@/lib/resume-parser';
import { saveActiveProfile, saveActiveReport } from '@/lib/storage';
import { analyzeResumeDeterministically } from '@/lib/ats-deterministic';

export default function TemplatesPage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>(FANG_TEMPLATES[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'visual' | 'text'>('visual');
  const [copiedText, setCopiedText] = useState(false);
  const [copiedScriptIndex, setCopiedScriptIndex] = useState<number | null>(null);
  const [loadingAudit, setLoadingAudit] = useState(false);

  const categories = [
    'All',
    'Two-Column Modern (Canva / Zety)',
    "Reddit 'Sheets' Standard",
    'Corporate Consulting (Deloitte / Big 4)',
    'Single-Column 100% ATS',
    'Students & Freshers'
  ];

  const filteredTemplates = selectedCategory === 'All'
    ? FANG_TEMPLATES
    : FANG_TEMPLATES.filter(t => t.category === selectedCategory);

  const handleCopyText = () => {
    navigator.clipboard.writeText(selectedTemplate.rawText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleCopyScript = (scriptText: string, index: number) => {
    navigator.clipboard.writeText(scriptText);
    setCopiedScriptIndex(index);
    setTimeout(() => setCopiedScriptIndex(null), 2000);
  };

  const handleLoadAndAnalyze = (tmpl: ResumeTemplate) => {
    setLoadingAudit(true);
    const parsed = parseResumeProfile(tmpl.rawText, `${tmpl.id}_resume.pdf`, 'application/pdf');
    parsed.targetRole = tmpl.targetRole;
    saveActiveProfile(parsed);

    // Generate baseline report
    const report = analyzeResumeDeterministically(parsed, tmpl.targetRole);
    saveActiveReport(report);

    setTimeout(() => {
      router.push('/analyzer');
    }, 300);
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const main = selectedTemplate.mainContent;
  const side = selectedTemplate.sidebarContent;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="pb-6 border-b border-[#E3E3D8] no-print">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-forest-100 text-forest-900 border border-forest-200 mb-2">
          <Award className="w-3.5 h-3.5 text-limeAccent-600" />
          Industry Benchmark Resume Templates & Referral Blueprints
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-forest-950">
          Executive Resume Templates & Hiring Hub
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-3xl leading-relaxed">
          Inspired by top industry layouts: <strong>Canva & Zety Two-Column</strong>, <strong>Reddit r/EngineeringResumes 'Sheets' Standard</strong>, <strong>Deloitte Big 4 Advisory</strong>, and <strong>Google 1-Page Action-Result Formats</strong>.
        </p>
      </div>

      {/* =====================================================================
          CATEGORY FILTER TABS & SELECTOR
          ===================================================================== */}
      <div className="space-y-4 no-print">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-forest-900 text-limeAccent-300 shadow-subtle'
                    : 'bg-white hover:bg-ivory-200 text-forest-900 border border-[#E3E3D8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="inline-flex items-center p-1 rounded-xl bg-white border border-[#E3E3D8] shadow-subtle">
            <button
              type="button"
              onClick={() => setViewMode('visual')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'visual'
                  ? 'bg-forest-900 text-white shadow-subtle'
                  : 'text-muted-foreground hover:text-forest-950'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Visual Document Preview
            </button>
            <button
              type="button"
              onClick={() => setViewMode('text')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'text'
                  ? 'bg-forest-900 text-white shadow-subtle'
                  : 'text-muted-foreground hover:text-forest-950'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Raw ATS Text (100% Plaintext)
            </button>
          </div>
        </div>

        {/* Template Cards Horizontal Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map(tmpl => {
            const isSelected = selectedTemplate.id === tmpl.id;
            return (
              <div
                key={tmpl.id}
                onClick={() => setSelectedTemplate(tmpl)}
                className={`p-5 rounded-2xl cursor-pointer transition-all border text-left flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-white border-forest-900 shadow-elevated ring-2 ring-forest-900/10'
                    : 'bg-white/80 hover:bg-white border-[#E3E3D8] hover:border-forest-400 shadow-subtle'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-forest-50 text-forest-800 border border-forest-200">
                      {tmpl.category}
                    </span>
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <span className="text-emerald-700 font-bold" title="ATS Machine Parseability">
                        ATS: {tmpl.atsScore}%
                      </span>
                      <span className="text-forest-700 font-bold" title="Human Recruiter Aesthetic Score">
                        Visual: {tmpl.visualScore}%
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-forest-950 leading-tight">
                    {tmpl.name}
                  </h3>

                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {tmpl.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E3E3D8] flex items-center justify-between text-[11px] font-mono text-forest-700">
                  <span className="truncate">Source: {tmpl.inspiredBy.split('(')[0]}</span>
                  <span className="text-forest-900 font-bold font-sans">
                    {isSelected ? 'Active Preview' : 'Select'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          TEMPLATE VIEWER: DOCUMENT CANVAS OR RAW ATS TEXT
          ===================================================================== */}
      <div className="editorial-card p-6 sm:p-8 space-y-6">
        
        {/* Template Header & Actions */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-[#E3E3D8] no-print">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-forest-900 text-limeAccent-300">
                {selectedTemplate.category}
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                Target: <strong>{selectedTemplate.targetRole}</strong> ({selectedTemplate.experienceLevel})
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-forest-950">
              {selectedTemplate.name}
            </h2>
            <p className="text-xs text-muted-foreground">
              Inspired by: <strong>{selectedTemplate.inspiredBy}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            
            {/* Copy Raw Text */}
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#D6D6C4] text-forest-900 hover:bg-ivory-100 text-xs font-semibold transition-colors shadow-subtle"
            >
              {copiedText ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-forest-600" />
                  Copy Resume Text
                </>
              )}
            </button>

            {/* Print Document */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#D6D6C4] text-forest-900 hover:bg-ivory-100 text-xs font-semibold transition-colors shadow-subtle"
            >
              <Printer className="w-3.5 h-3.5 text-forest-600" />
              Print / Save PDF
            </button>

            {/* Load & Run ATS Diagnostic Audit */}
            <button
              onClick={() => handleLoadAndAnalyze(selectedTemplate)}
              disabled={loadingAudit}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-900 text-white hover:bg-forest-800 text-xs font-semibold transition-colors shadow-subtle"
            >
              <Sparkles className="w-3.5 h-3.5 text-limeAccent-400" />
              {loadingAudit ? 'Running ATS Audit...' : 'Audit This Template in Analyzer'}
            </button>

          </div>
        </div>

        {/* =====================================================================
            VIEW MODE: VISUAL DOCUMENT PREVIEW (Canva / Zety / Sheets Canvas)
            ===================================================================== */}
        {viewMode === 'visual' ? (
          <div className="bg-[#525659] p-4 sm:p-8 rounded-2xl overflow-x-auto shadow-inner">
            <div className="max-w-[850px] mx-auto bg-white shadow-2xl rounded-sm min-h-[1050px] text-gray-900 font-sans p-8 sm:p-12 space-y-6">
              
              {/* LAYOUT 1: TWO-COLUMN MODERN EXECUTIVE (CANVA / ZETY STYLE) */}
              {selectedTemplate.layoutType === 'two_column' && side && main && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Left Column (Sidebar) */}
                  <div className="md:col-span-1 bg-gray-50 p-6 rounded-xl space-y-6 border border-gray-200 text-xs">
                    
                    {/* Candidate Initials Avatar */}
                    <div className="w-16 h-16 rounded-full bg-forest-900 text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-md">
                      {main.name.split(' ').map(n => n[0]).join('')}
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-2 pt-2 border-t border-gray-200">
                      <h4 className="font-bold uppercase tracking-wider text-[11px] text-gray-700">Contact</h4>
                      <p className="text-gray-600 flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-gray-500" /> {side.phone}
                      </p>
                      <p className="text-gray-600 flex items-center gap-1.5 truncate">
                        <Mail className="w-3 h-3 text-gray-500" /> {side.email}
                      </p>
                      <p className="text-gray-600 flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-gray-500" /> {side.location}
                      </p>
                      {side.links.map(l => (
                        <p key={l.label} className="text-forest-700 font-mono text-[10px] truncate underline">
                          {l.label}
                        </p>
                      ))}
                    </div>

                    {/* Skills Taxonomy */}
                    <div className="space-y-2 pt-3 border-t border-gray-200">
                      <h4 className="font-bold uppercase tracking-wider text-[11px] text-gray-700">Skills & Tech</h4>
                      <div className="flex flex-wrap gap-1">
                        {side.skills.map(skill => (
                          <span key={skill} className="px-2 py-0.5 rounded bg-white border border-gray-300 font-semibold text-[10px] text-gray-800">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    {side.certifications && (
                      <div className="space-y-1.5 pt-3 border-t border-gray-200">
                        <h4 className="font-bold uppercase tracking-wider text-[11px] text-gray-700">Certifications</h4>
                        {side.certifications.map(c => (
                          <p key={c} className="text-[11px] text-gray-700">• {c}</p>
                        ))}
                      </div>
                    )}

                    {/* Languages */}
                    {side.languages && (
                      <div className="space-y-1.5 pt-3 border-t border-gray-200">
                        <h4 className="font-bold uppercase tracking-wider text-[11px] text-gray-700">Languages</h4>
                        {side.languages.map(lang => (
                          <p key={lang} className="text-[11px] text-gray-700">• {lang}</p>
                        ))}
                      </div>
                    )}

                  </div>

                  {/* Right Column (Main Experience Body) */}
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 uppercase">
                        {main.name}
                      </h1>
                      <h2 className="text-sm font-bold text-forest-700 uppercase tracking-wider mt-1">
                        {main.title}
                      </h2>
                      <p className="text-xs text-gray-600 leading-relaxed mt-3 pt-3 border-t border-gray-200">
                        {main.summary}
                      </p>
                    </div>

                    {/* Work Experience */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b-2 border-forest-800 pb-1">
                        Work Experience
                      </h3>
                      {main.experience.map(exp => (
                        <div key={exp.company + exp.role} className="space-y-1.5">
                          <div className="flex flex-wrap items-baseline justify-between text-xs">
                            <span className="font-bold text-gray-900">{exp.role}</span>
                            <span className="text-gray-500 font-mono text-[11px]">{exp.period}</span>
                          </div>
                          <div className="text-[11px] font-semibold text-forest-800">
                            {exp.company} — {exp.location}
                          </div>
                          <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-gray-700">
                            {exp.bullets.map((b, i) => (
                              <li key={i} className="leading-snug">{b}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Projects */}
                    {main.projects && (
                      <div className="space-y-3">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b-2 border-forest-800 pb-1">
                          Key Technical Projects
                        </h3>
                        {main.projects.map(proj => (
                          <div key={proj.name} className="space-y-1 text-xs">
                            <span className="font-bold text-gray-900">{proj.name}</span>
                            <span className="text-gray-500 font-mono text-[10px] ml-2">({proj.tech})</span>
                            <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-gray-700">
                              {proj.bullets.map((b, i) => (
                                <li key={i}>{b}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Education */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b-2 border-forest-800 pb-1">
                        Education
                      </h3>
                      {main.education.map(edu => (
                        <div key={edu.degree} className="text-xs flex justify-between">
                          <div>
                            <span className="font-bold text-gray-900">{edu.degree}</span>
                            <p className="text-gray-600">{edu.school}</p>
                            {edu.details && <p className="text-gray-500 text-[11px]">{edu.details}</p>}
                          </div>
                          <span className="text-gray-500 font-mono text-[11px]">{edu.year}</span>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>
              )}

              {/* LAYOUT 2: CORPORATE CONSULTING (DELOITTE / BIG 4 STYLE) */}
              {selectedTemplate.layoutType === 'corporate_header' && main && (
                <div className="space-y-6">
                  
                  {/* Corporate Header Banner */}
                  <div className="border-b-2 border-gray-900 pb-4 flex flex-col md:flex-row items-start md:items-end justify-between gap-2">
                    <div>
                      <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 uppercase font-serif">
                        {main.name}
                      </h1>
                      <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-800 mt-1">
                        {main.title}
                      </h2>
                    </div>
                    <div className="text-right text-xs text-gray-600 font-mono">
                      <span>Chicago, IL • (312) 555-0149 • marcus.halloran@example.com</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 font-serif">
                      Executive Summary & Practice Focus
                    </h3>
                    <p className="text-xs text-gray-700 leading-relaxed pt-1">
                      {main.summary}
                    </p>
                  </div>

                  {/* Experience */}
                  <div className="space-y-5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 font-serif">
                      Client Advisory & Transformation Experience
                    </h3>
                    {main.experience.map(exp => (
                      <div key={exp.company} className="space-y-1.5">
                        <div className="flex justify-between items-baseline text-xs">
                          <span className="font-bold text-gray-900">{exp.company}</span>
                          <span className="text-gray-500 font-mono text-[11px]">{exp.period}</span>
                        </div>
                        <div className="text-xs font-semibold text-emerald-900">
                          {exp.role} — {exp.location}
                        </div>
                        <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-gray-700">
                          {exp.bullets.map((b, i) => (
                            <li key={i} className="leading-snug">{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Competencies */}
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 font-serif">
                      Core Competencies & Enterprise Systems
                    </h3>
                    <p className="text-xs text-gray-700 leading-relaxed pt-1">
                      <strong>Strategy & Governance:</strong> Digital Transformation, Cloud Strategy, IT Operating Models, Agile Governance (Scrum/SAFe), Executive Stakeholder Management. <br />
                      <strong>Systems & Architecture:</strong> AWS Cloud, Azure, SAP S/4HANA, SQL, Tableau, Python, JIRA, Confluence, PMP.
                    </p>
                  </div>

                  {/* Education */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 font-serif">
                      Education & Honors
                    </h3>
                    {main.education.map(edu => (
                      <div key={edu.degree} className="text-xs flex justify-between">
                        <div>
                          <span className="font-bold text-gray-900">{edu.degree}</span>
                          <p className="text-gray-600">{edu.school}</p>
                          {edu.details && <p className="text-gray-500 text-[11px]">{edu.details}</p>}
                        </div>
                        <span className="text-gray-500 font-mono text-[11px]">{edu.year}</span>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* LAYOUT 3: SINGLE-COLUMN CLEAN ATS (REDDIT SHEETS / SEBASTIAN BENNETT) */}
              {selectedTemplate.layoutType === 'single_column' && main && (
                <div className="space-y-5 text-gray-900 font-sans">
                  
                  {/* Top Header Centered */}
                  <div className="text-center space-y-1 border-b pb-3 border-gray-400">
                    <h1 className="text-2xl font-extrabold uppercase tracking-tight">
                      {main.name}
                    </h1>
                    <p className="text-xs text-gray-600 font-mono">
                      Location • Phone • Email • LinkedIn • GitHub
                    </p>
                  </div>

                  {/* Professional Summary */}
                  <div className="space-y-1">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-0.5">
                      Professional Summary
                    </h2>
                    <p className="text-xs text-gray-700 leading-relaxed pt-1">
                      {main.summary}
                    </p>
                  </div>

                  {/* Work Experience */}
                  <div className="space-y-4">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-0.5">
                      Work Experience
                    </h2>
                    {main.experience.map(exp => (
                      <div key={exp.company} className="space-y-1 text-xs">
                        <div className="flex justify-between items-baseline font-bold">
                          <span>{exp.company}</span>
                          <span className="font-mono text-gray-600 font-normal">{exp.period}</span>
                        </div>
                        <div className="italic text-gray-700 flex justify-between">
                          <span>{exp.role}</span>
                          <span>{exp.location}</span>
                        </div>
                        <ul className="list-disc list-outside pl-4 space-y-1 text-gray-700 pt-1">
                          {exp.bullets.map((b, i) => (
                            <li key={i} className="leading-snug">{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Technical Projects */}
                  {main.projects && (
                    <div className="space-y-3">
                      <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-0.5">
                        Technical Projects
                      </h2>
                      {main.projects.map(proj => (
                        <div key={proj.name} className="space-y-1 text-xs">
                          <div className="font-bold flex justify-between">
                            <span>{proj.name}</span>
                            <span className="font-mono text-gray-500 font-normal">{proj.tech}</span>
                          </div>
                          <ul className="list-disc list-outside pl-4 space-y-1 text-gray-700">
                            {proj.bullets.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Education */}
                  <div className="space-y-2">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-0.5">
                      Education
                    </h2>
                    {main.education.map(edu => (
                      <div key={edu.degree} className="text-xs flex justify-between">
                        <div>
                          <span className="font-bold">{edu.school}</span> — <span>{edu.degree}</span>
                          {edu.details && <p className="text-gray-500 text-[11px]">{edu.details}</p>}
                        </div>
                        <span className="font-mono text-gray-500">{edu.year}</span>
                      </div>
                    ))}
                  </div>

                </div>
              )}

            </div>
          </div>
        ) : (
          /* =====================================================================
              VIEW MODE: RAW ATS TEXT (Monospace 100% Plaintext)
              ===================================================================== */
          <div className="relative">
            <pre className="p-6 rounded-2xl bg-[#1E232A] text-emerald-400 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto max-h-[600px] border border-forest-800 selection:bg-forest-700 selection:text-white">
              {selectedTemplate.rawText}
            </pre>
            <button
              onClick={handleCopyText}
              className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest-900/90 text-white text-xs font-semibold hover:bg-forest-800 transition-colors shadow-subtle border border-forest-700"
            >
              {copiedText ? (
                <>
                  <Check className="w-3.5 h-3.5 text-limeAccent-400" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-limeAccent-400" />
                  Copy All
                </>
              )}
            </button>
          </div>
        )}

      </div>

      {/* =====================================================================
          RECRUITER & ATS TRUTH: SINGLE-COLUMN VS TWO-COLUMN GUIDANCE
          ===================================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-forest-950 text-white shadow-elevated space-y-6 no-print">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-forest-800">
          <div className="space-y-1">
            <span className="text-xs uppercase font-mono font-bold tracking-wider text-limeAccent-400">
              Recruiter & ATS Reality Guide
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Two-Column (Canva/Zety) vs. Single-Column (Harvard/Reddit Sheets)
            </h2>
            <p className="text-xs sm:text-sm text-forest-200">
              When to use which format to get maximum interview callbacks.
            </p>
          </div>
          <div className="px-3.5 py-1.5 rounded-full bg-forest-900 border border-forest-700 text-limeAccent-300 text-xs font-mono font-bold shrink-0">
            Internal Referral Bonus: $2,000 – $10,000 / Hire
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          <div className="p-5 rounded-2xl bg-forest-900/60 border border-forest-800 space-y-3">
            <div className="flex items-center gap-2 text-limeAccent-400 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              Single-Column 100% ATS (Sebastian Bennett / Reddit Sheets)
            </div>
            <p className="text-xs text-forest-200 leading-relaxed">
              <strong>Best For:</strong> Cold portal applications on company career sites (Workday, Taleo, Greenhouse, Lever).
            </p>
            <ul className="text-xs text-forest-300 space-y-1.5 list-disc list-inside">
              <li>Zero parser traps: Scanners never merge left and right columns horizontally.</li>
              <li>Highest ATS parsing rate (99% - 100%).</li>
              <li>Preferred by Google, Amazon, Microsoft, and high-volume automated screeners.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-forest-900/60 border border-forest-800 space-y-3">
            <div className="flex items-center gap-2 text-limeAccent-400 font-bold text-sm">
              <Users className="w-4 h-4" />
              Two-Column Modern Executive (Canva / Zety / Richard Sanchez)
            </div>
            <p className="text-xs text-forest-200 leading-relaxed">
              <strong>Best For:</strong> Direct networking, LinkedIn DMs, employee referrals, and direct email attachments to hiring managers.
            </p>
            <ul className="text-xs text-forest-300 space-y-1.5 list-disc list-inside">
              <li>Human recruiters scan top-to-bottom and love visual hierarchy and clean sidebars.</li>
              <li>Instantly highlights technical skills, languages, and certifications at a single glance.</li>
              <li>Best for standing out when a human is already looking at your PDF.</li>
            </ul>
          </div>

        </div>

        {/* Referral Outreach Scripts */}
        <div className="space-y-4 pt-4 border-t border-forest-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">
              Employee Referral Outreach Blueprints (Copy & Paste for LinkedIn)
            </h3>
            <span className="text-xs font-mono text-limeAccent-400">
              High-Conversion Message Templates
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {WORK_FOR_FANG_REFERRAL_GUIDE.outreachScripts.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-forest-900 border border-forest-800 space-y-3 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{item.title}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyScript(item.script, idx)}
                      className="text-xs font-mono text-limeAccent-400 hover:text-limeAccent-300 flex items-center gap-1"
                    >
                      {copiedScriptIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy Script
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-forest-300 font-mono">
                    Context: {item.context}
                  </p>
                  <pre className="text-xs font-mono bg-forest-950 p-3 rounded-xl text-forest-200 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto border border-forest-800/80">
                    {item.script}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
