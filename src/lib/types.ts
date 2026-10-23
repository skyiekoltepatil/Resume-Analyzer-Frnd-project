import { z } from 'zod';

// ============================================================================
// RESUME PARSING SCHEMAS
// ============================================================================

export const ExtractedProfileSchema = z.object({
  id: z.string(),
  name: z.string().default('Candidate Profile'),
  email: z.string().optional().default(''),
  phone: z.string().optional().default(''),
  linkedin: z.string().optional().default(''),
  github: z.string().optional().default(''),
  location: z.string().optional().default(''),
  summary: z.string().optional().default(''),
  targetRole: z.string().optional().default('Software Professional'),
  experienceYears: z.number().default(0),
  education: z.array(z.object({
    institution: z.string(),
    degree: z.string(),
    field: z.string().optional(),
    year: z.string().optional(),
  })).default([]),
  experience: z.array(z.object({
    role: z.string(),
    company: z.string(),
    duration: z.string().optional(),
    highlights: z.array(z.string()).default([]),
  })).default([]),
  projects: z.array(z.object({
    name: z.string(),
    description: z.string(),
    technologies: z.array(z.string()).default([]),
  })).default([]),
  skills: z.array(z.string()).default([]),
  rawText: z.string(),
  wordCount: z.number().default(0),
  fileName: z.string().default('resume.txt'),
  fileType: z.string().default('text/plain'),
});

export type ExtractedProfile = z.infer<typeof ExtractedProfileSchema>;

// ============================================================================
// AI RESUME ANALYSIS SCHEMAS
// ============================================================================

export const SkillEvidenceSchema = z.object({
  skill: z.string(),
  category: z.enum(['Languages', 'Frameworks & Libraries', 'Cloud & DevOps', 'Databases', 'Tools & Systems', 'Soft Skills & Leadership']),
  evidenceStatus: z.enum(['explicitly_evidenced', 'mentioned_weak_evidence', 'not_found']),
  evidenceQuote: z.string().optional().describe('Direct snippet or bullet quote from resume supporting this skill, if present'),
  proficiencyEstimate: z.enum(['Proficient', 'Familiar', 'Unverified']),
});

export type SkillEvidence = z.infer<typeof SkillEvidenceSchema>;

export const BulletImprovementSchema = z.object({
  originalBullet: z.string(),
  critique: z.string(),
  improvedGoogleXYZ: z.string().describe('Rewritten bullet using Accomplished [X] as measured by [Y] by doing [Z]'),
  targetedSkillOrMetric: z.string(),
});

export type BulletImprovement = z.infer<typeof BulletImprovementSchema>;

export const CareerRoadmapItemSchema = z.object({
  timeframe: z.enum(['Immediate (Weeks 1-2)', 'Short-Term (Month 1)', 'Mid-Term (Months 2-3)']),
  title: z.string(),
  description: z.string(),
  priority: z.enum(['High', 'Medium', 'Low']),
  actionableStep: z.string(),
});

export type CareerRoadmapItem = z.infer<typeof CareerRoadmapItemSchema>;

export const FangAuditSchema = z.object({
  referralReadinessScore: z.number().min(0).max(100),
  onePageRuleCompliance: z.boolean(),
  actionResultBulletsPercentage: z.number().min(0).max(100),
  fluffPhrasesDetected: z.array(z.string()).default([]),
  fangRecruiterVerdict: z.string(),
  referralRecommendation: z.string(),
});

export type FangAudit = z.infer<typeof FangAuditSchema>;

export const ResumeAnalysisReportSchema = z.object({
  id: z.string(),
  analyzedAt: z.string(),
  modelUsed: z.string(),
  isLiveAi: z.boolean(),
  candidateName: z.string(),
  targetRole: z.string(),
  overallScore: z.number().min(0).max(100),
  atsScore: z.number().min(0).max(100),
  executiveSummary: z.string(),
  scoreBreakdown: z.object({
    impactAndQuantification: z.number().min(0).max(100),
    skillEvidenceAndDepth: z.number().min(0).max(100),
    atsClarityAndStructure: z.number().min(0).max(100),
    roleRelevance: z.number().min(0).max(100),
  }),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  criticalMissingKeywords: z.array(z.string()),
  categorizedSkills: z.array(SkillEvidenceSchema),
  bulletImprovements: z.array(BulletImprovementSchema),
  recommendedRoles: z.array(z.object({
    title: z.string(),
    matchPercentage: z.number(),
    rationale: z.string(),
  })),
  roadmap: z.array(CareerRoadmapItemSchema),
  fangAudit: FangAuditSchema.optional(),
});

export type ResumeAnalysisReport = z.infer<typeof ResumeAnalysisReportSchema>;

// ============================================================================
// JOB MATCHING SCHEMAS
// ============================================================================

export const JobRequirementMatchSchema = z.object({
  requirement: z.string(),
  status: z.enum(['fully_matched', 'partially_matched', 'missing']),
  evidenceFromResume: z.string().optional(),
  remediationAdvice: z.string().optional(),
});

export type JobRequirementMatch = z.infer<typeof JobRequirementMatchSchema>;

export const JobMatchReportSchema = z.object({
  id: z.string(),
  jobTitle: z.string(),
  company: z.string().optional(),
  overallMatchScore: z.number().min(0).max(100),
  isLiveAi: z.boolean(),
  modelUsed: z.string(),
  scoreExplanation: z.string(),
  criteriaScores: z.object({
    coreSkillsMatch: z.number().min(0).max(100).describe('Weight: 40%'),
    experienceAlignment: z.number().min(0).max(100).describe('Weight: 30%'),
    toolsAndSystems: z.number().min(0).max(100).describe('Weight: 15%'),
    impactAndScope: z.number().min(0).max(100).describe('Weight: 15%'),
  }),
  matchedRequirements: z.array(JobRequirementMatchSchema),
  missingSkills: z.array(z.string()),
  evidenceGaps: z.array(z.string()),
  customizedSuggestions: z.array(z.string()),
  tailoredSummaryPitch: z.string().describe('An honest 3-sentence elevator pitch tailored to this specific role'),
});

export type JobMatchReport = z.infer<typeof JobMatchReportSchema>;

// ============================================================================
// JOB POSTING SCHEMAS
// ============================================================================

export const JobPostingSchema = z.object({
  id: z.string(),
  title: z.string(),
  company: z.string(),
  location: z.string(),
  type: z.string().default('Full-time'),
  salary: z.string().optional(),
  source: z.string().default('Verified Feed'),
  isVerifiedLive: z.boolean().default(false),
  publishedAt: z.string().optional(),
  applicationUrl: z.string().url(),
  description: z.string(),
  requiredSkills: z.array(z.string()),
  preferredSkills: z.array(z.string()).default([]),
  experienceLevel: z.string().default('Mid-Senior'),
  companyTier: z.string().optional(),
  portalUrls: z.object({
    companyCareerUrl: z.string().optional(),
    linkedinSearchUrl: z.string().optional(),
    naukriSearchUrl: z.string().optional(),
    indeedSearchUrl: z.string().optional(),
  }).optional(),
  compatibilityScore: z.number().optional(),
  compatibilityBreakdown: z.object({
    skillsScore: z.number(),
    experienceScore: z.number(),
    explanation: z.string(),
  }).optional(),
  matchedSkills: z.array(z.string()).optional(),
  missingSkills: z.array(z.string()).optional(),
});

export type JobPosting = z.infer<typeof JobPostingSchema>;
