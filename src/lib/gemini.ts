import { GoogleGenAI } from '@google/genai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  ResumeAnalysisReport,
  ResumeAnalysisReportSchema,
  JobMatchReport,
  JobMatchReportSchema,
  ExtractedProfile
} from './types';
import { analyzeResumeDeterministically, matchJobDeterministically } from './ats-deterministic';

/**
 * Returns available AI API key or null
 * Checks OPENROUTER_API_KEY and GEMINI_API_KEY
 */
export function getAiApiKey(): { key: string | null; provider: 'openrouter' | 'gemini_direct' | null } {
  const openRouterKey = process.env.OPENROUTER_API_KEY?.trim();
  const geminiKey = process.env.GEMINI_API_KEY?.trim();

  // Explicit OpenRouter key
  if (openRouterKey && openRouterKey !== 'your_key_here') {
    return { key: openRouterKey, provider: 'openrouter' };
  }

  // If GEMINI_API_KEY is an OpenRouter key (starts with sk-or-)
  if (geminiKey && geminiKey.startsWith('sk-or-')) {
    return { key: geminiKey, provider: 'openrouter' };
  }

  // Standard Google Gemini key
  if (geminiKey && geminiKey !== 'your_gemini_api_key_here') {
    return { key: geminiKey, provider: 'gemini_direct' };
  }

  return { key: null, provider: null };
}

export function getGeminiApiKey(): string | null {
  return getAiApiKey().key;
}

/**
 * Resolves active model identifier
 */
export function getTargetModelName(): string {
  const { provider } = getAiApiKey();
  if (provider === 'openrouter') {
    return process.env.GEMINI_MODEL || 'google/gemini-3.8-flash';
  }
  return process.env.GEMINI_MODEL || 'gemini-2.5-flash';
}

/**
 * Call OpenRouter with OpenAI-compatible chat completion
 */
async function callOpenRouter(apiKey: string, prompt: string, systemInstruction?: string): Promise<{ text: string; modelUsed: string }> {
  let targetModel = getTargetModelName();
  if (!targetModel.includes('/')) {
    targetModel = `google/${targetModel}`;
  }

  const modelsToTry = [
    targetModel,
    'google/gemini-3.8-flash',
    'google/gemini-2.5-flash',
    'google/gemini-3.7-flash',
  ].filter((v, i, a) => a.indexOf(v) === i);

  let lastError: any = null;

  for (const modelId of modelsToTry) {
    try {
      const messages: any[] = [];
      if (systemInstruction) {
        messages.push({ role: 'system', content: systemInstruction });
      }
      messages.push({ role: 'user', content: prompt });

      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://pathwise.career',
          'X-Title': 'Pathwise AI Career Intelligence'
        },
        body: JSON.stringify({
          model: modelId,
          messages,
          response_format: { type: 'json_object' },
          max_tokens: 3500,
          temperature: 0.15,
        })
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error?.message || `OpenRouter returned status ${res.status}`);
      }

      const text = data.choices?.[0]?.message?.content;
      if (text && text.trim().length > 0) {
        return { text, modelUsed: `${modelId} (OpenRouter)` };
      }
    } catch (err: any) {
      lastError = err;
      console.warn(`[OpenRouter] Model '${modelId}' attempt failed:`, err?.message || err);
    }
  }

  throw lastError || new Error('Failed to obtain response from OpenRouter.');
}

/**
 * Call Google Gemini directly via SDK
 */
async function callGeminiDirect(apiKey: string, prompt: string, systemInstruction?: string): Promise<{ text: string; modelUsed: string }> {
  const modelsToTry = [
    getTargetModelName(),
    process.env.GEMINI_FALLBACK_MODEL || 'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-1.5-pro'
  ].filter((v, i, a) => v && a.indexOf(v) === i);

  let lastError: any = null;

  for (const modelId of modelsToTry) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const fullPrompt = systemInstruction ? `${systemInstruction}\n\nTask:\n${prompt}` : prompt;
      const response = await ai.models.generateContent({
        model: modelId,
        contents: fullPrompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.15,
        }
      });

      const responseText = response.text;
      if (responseText && responseText.trim().length > 0) {
        return { text: responseText, modelUsed: modelId };
      }
    } catch (err: any) {
      lastError = err;
      console.warn(`[Gemini SDK] Model '${modelId}' attempt failed:`, err?.message || err);
    }
  }

  throw lastError || new Error('Failed to obtain response from Gemini API.');
}

/**
 * Unified AI Caller
 */
async function callAi(prompt: string, systemInstruction?: string): Promise<{ text: string; modelUsed: string }> {
  const { key, provider } = getAiApiKey();
  if (!key || !provider) {
    throw new Error('No valid AI API key detected.');
  }

  if (provider === 'openrouter') {
    return callOpenRouter(key, prompt, systemInstruction);
  } else {
    return callGeminiDirect(key, prompt, systemInstruction);
  }
}

/**
 * Clean and parse JSON from model response
 */
function parseJsonSafely(raw: string): any {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }
  return JSON.parse(cleaned);
}

/**
 * Perform comprehensive, evidence-grounded AI resume analysis
 */
export async function analyzeResumeWithGemini(
  profile: ExtractedProfile,
  targetRole: string = 'Software Professional'
): Promise<ResumeAnalysisReport> {
  const { key } = getAiApiKey();

  // If no AI key is provided, return honest deterministic evaluation
  if (!key) {
    console.info('[Pathwise AI] No AI API key detected. Using deterministic evidence engine.');
    return analyzeResumeDeterministically(profile, targetRole);
  }

  const systemInstruction = `You are a Principal Technical Recruiter, ATS Architecture Expert, and Career Advisor for Pathwise.
You provide deep, evidence-grounded resume evaluations.

CRITICAL RULES:
1. Ground every claim directly in the extracted resume text. Do NOT fabricate experience, projects, metrics, or education.
2. Distinguish accurately between:
   - "explicitly_evidenced": The resume has concrete bullets or project sentences demonstrating the skill in action.
   - "mentioned_weak_evidence": The skill is merely listed in a skills section or mentioned casually without outcome context.
   - "not_found": Not identified in the resume.
3. Quantifiable Impact: Evaluate bullets using the Google XYZ formula ("Accomplished [X] as measured by [Y] by doing [Z]"). Provide real rewrite suggestions.
4. Work for FANG (workforfang.com) Standard:
   - Strict 1-Page Rule: Resumes must be concise and dense (under 700 words).
   - Action-Result Format: Bullets must lead with strong verbs and end with quantified data.
   - Fluff Filter: Flag subjective opinions ('passionate', 'hardworking', 'responsible for', 'team player') and demand data.
   - Referral Readiness: Determine if this candidate is ready for an internal employee referral.
5. Output MUST be valid JSON adhering strictly to the requested schema.`;

  const prompt = `Perform an in-depth analysis of the following candidate resume for the target role: "${targetRole}".

Candidate Name: ${profile.name}
Extracted Resume Text:
"""
${profile.rawText.substring(0, 14000)}
"""

Return a JSON object with this EXACT structure:
{
  "id": "rep_${Date.now()}",
  "analyzedAt": "${new Date().toISOString()}",
  "modelUsed": "pending",
  "isLiveAi": true,
  "candidateName": "${profile.name}",
  "targetRole": "${targetRole}",
  "overallScore": <integer 0-100>,
  "atsScore": <integer 0-100 evaluating ATS parsing readiness and structure>,
  "executiveSummary": "<concise 3-sentence executive summary of profile strengths, depth, and immediate leveling opportunities>",
  "scoreBreakdown": {
    "impactAndQuantification": <integer 0-100>,
    "skillEvidenceAndDepth": <integer 0-100>,
    "atsClarityAndStructure": <integer 0-100>,
    "roleRelevance": <integer 0-100>
  },
  "strengths": ["<strength 1 with evidence>", "<strength 2 with evidence>", "<strength 3 with evidence>"],
  "weaknesses": ["<actionable weakness 1>", "<actionable weakness 2>", "<actionable weakness 3>"],
  "criticalMissingKeywords": ["<keyword 1 for target role>", "<keyword 2>", "<keyword 3>", "<keyword 4>"],
  "categorizedSkills": [
    {
      "skill": "<skill name>",
      "category": "Languages" | "Frameworks & Libraries" | "Cloud & DevOps" | "Databases" | "Tools & Systems" | "Soft Skills & Leadership",
      "evidenceStatus": "explicitly_evidenced" | "mentioned_weak_evidence",
      "evidenceQuote": "<quote or sentence from resume showing evidence>",
      "proficiencyEstimate": "Proficient" | "Familiar" | "Unverified"
    }
  ],
  "bulletImprovements": [
    {
      "originalBullet": "<verbatim bullet point from resume>",
      "critique": "<why this bullet point is weak or lacks metric/scope>",
      "improvedGoogleXYZ": "<rewritten bullet following Accomplished [X] as measured by [Y] by doing [Z]>",
      "targetedSkillOrMetric": "<skill or impact target>"
    }
  ],
  "recommendedRoles": [
    { "title": "<role title 1>", "matchPercentage": <0-100>, "rationale": "<why candidate fits>" },
    { "title": "<role title 2>", "matchPercentage": <0-100>, "rationale": "<why candidate fits>" },
    { "title": "<role title 3>", "matchPercentage": <0-100>, "rationale": "<why candidate fits>" }
  ],
  "roadmap": [
    {
      "timeframe": "Immediate (Weeks 1-2)",
      "title": "<step title>",
      "description": "<step details>",
      "priority": "High" | "Medium" | "Low",
      "actionableStep": "<concrete task candidate can do today>"
    },
    {
      "timeframe": "Short-Term (Month 1)",
      "title": "<step title>",
      "description": "<step details>",
      "priority": "High" | "Medium" | "Low",
      "actionableStep": "<concrete task candidate can do today>"
    },
    {
      "timeframe": "Mid-Term (Months 2-3)",
      "title": "<step title>",
      "description": "<step details>",
      "priority": "High" | "Medium" | "Low",
      "actionableStep": "<concrete task candidate can do today>"
    }
  ],
  "fangAudit": {
    "referralReadinessScore": <integer 0-100>,
    "onePageRuleCompliance": <boolean true if under 700 words, false otherwise>,
    "actionResultBulletsPercentage": <integer 0-100 percentage of bullets that use Action-Result structure with metrics>,
    "fluffPhrasesDetected": ["<subjective opinion or passive phrase detected: e.g. passionate, responsible for, assisted with>"],
    "fangRecruiterVerdict": "<2-sentence FAANG recruiter verdict evaluating whether an internal employee would confidently refer this candidate>",
    "referralRecommendation": "<actionable advice on getting referred internally instead of applying cold on company website>"
  }
}`;

  try {
    const { text, modelUsed } = await callAi(prompt, systemInstruction);
    const parsed = parseJsonSafely(text);
    parsed.modelUsed = modelUsed;
    parsed.isLiveAi = true;

    const validated = ResumeAnalysisReportSchema.safeParse(parsed);
    if (validated.success) {
      return validated.data;
    } else {
      console.warn('[Pathwise AI] Zod validation normalization:', validated.error.issues);
      return {
        ...analyzeResumeDeterministically(profile, targetRole),
        ...parsed,
        isLiveAi: true,
        modelUsed: `${modelUsed} (schema normalized)`
      };
    }
  } catch (error: any) {
    console.error('[Pathwise AI] AI API call failed, falling back to deterministic baseline:', error?.message);
    const baseline = analyzeResumeDeterministically(profile, targetRole);
    baseline.executiveSummary = `[Notice: Live AI API encountered: ${error?.message || 'Check API key or quota'}. Generated via Pathwise Deterministic ATS Engine]. ${baseline.executiveSummary}`;
    return baseline;
  }
}

/**
 * Match a resume against a specific target Job Description using AI
 */
export async function matchJobWithGemini(
  resumeText: string,
  jobTitle: string,
  jobDescription: string,
  companyName: string = 'Hiring Company'
): Promise<JobMatchReport> {
  const { key } = getAiApiKey();

  if (!key) {
    return matchJobDeterministically(resumeText, jobTitle, jobDescription, companyName);
  }

  const systemInstruction = `You are an executive ATS matching algorithm and Hiring Committee Chair.
Compare the candidate resume against the given Job Description with surgical precision.
Compatibility scores are explainable estimates based on explicit evidence in the resume, not arbitrary guesses.`;

  const prompt = `Compare this resume against the target job posting.

Target Job Title: ${jobTitle}
Company: ${companyName}
Job Description:
"""
${jobDescription.substring(0, 7000)}
"""

Candidate Resume:
"""
${resumeText.substring(0, 10000)}
"""

Return a JSON object conforming strictly to this format:
{
  "id": "match_${Date.now()}",
  "jobTitle": "${jobTitle}",
  "company": "${companyName}",
  "overallMatchScore": <integer 0-100>,
  "isLiveAi": true,
  "modelUsed": "pending",
  "scoreExplanation": "<transparent 2-sentence explanation of score calculation and biggest match drivers>",
  "criteriaScores": {
    "coreSkillsMatch": <integer 0-100, weight 40%>,
    "experienceAlignment": <integer 0-100, weight 30%>,
    "toolsAndSystems": <integer 0-100, weight 15%>,
    "impactAndScope": <integer 0-100, weight 15%>
  },
  "matchedRequirements": [
    {
      "requirement": "<key requirement from JD>",
      "status": "fully_matched" | "partially_matched" | "missing",
      "evidenceFromResume": "<verbatim evidence snippet or why missing>",
      "remediationAdvice": "<how candidate can demonstrate this if missing>"
    }
  ],
  "missingSkills": ["<skill 1 missing>", "<skill 2 missing>"],
  "evidenceGaps": ["<gap 1>", "<gap 2>"],
  "customizedSuggestions": [
    "<specific action 1 to modify resume for this job>",
    "<specific action 2 to modify resume for this job>",
    "<specific action 3 to modify resume for this job>"
  ],
  "tailoredSummaryPitch": "<high-impact 3-sentence professional summary tailored for this application>"
}`;

  try {
    const { text, modelUsed } = await callAi(prompt, systemInstruction);
    const parsed = parseJsonSafely(text);
    parsed.modelUsed = modelUsed;
    parsed.isLiveAi = true;

    const validated = JobMatchReportSchema.safeParse(parsed);
    if (validated.success) {
      return validated.data;
    }
    return {
      ...matchJobDeterministically(resumeText, jobTitle, jobDescription, companyName),
      ...parsed,
      isLiveAi: true,
      modelUsed: `${modelUsed} (schema normalized)`
    };
  } catch (error: any) {
    console.error('[Pathwise AI] Job match API failed, falling back to deterministic:', error?.message);
    const baseline = matchJobDeterministically(resumeText, jobTitle, jobDescription, companyName);
    baseline.scoreExplanation = `[Notice: Live AI API encountered: ${error?.message || 'Network/Quota'}. Evaluated via Deterministic ATS Engine]. ${baseline.scoreExplanation}`;
    return baseline;
  }
}

/**
 * Diagnostic test for server-side AI connectivity
 */
export async function testGeminiConnection(): Promise<{
  connected: boolean;
  model: string;
  latencyMs: number;
  message: string;
}> {
  const { key, provider } = getAiApiKey();
  if (!key) {
    return {
      connected: false,
      model: getTargetModelName(),
      latencyMs: 0,
      message: 'No API key configured in .env.local (supports Google Gemini or OpenRouter).'
    };
  }

  const start = Date.now();
  try {
    const { text, modelUsed } = await callAi(
      'Respond with JSON: {"status": "ok", "message": "Connection verified successfully"}'
    );
    const latency = Date.now() - start;
    const json = parseJsonSafely(text);
    return {
      connected: true,
      model: modelUsed,
      latencyMs: latency,
      message: json.message || `Connected to ${provider === 'openrouter' ? 'OpenRouter Gemini' : 'Google Gemini'} successfully.`
    };
  } catch (err: any) {
    return {
      connected: false,
      model: getTargetModelName(),
      latencyMs: Date.now() - start,
      message: err?.message || 'Failed to authenticate or connect with AI API.'
    };
  }
}
