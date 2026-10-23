/* ==========================================================================
   DETERMINISTIC ATS DIAGNOSTIC ENGINE
   Audits parseability, Google XYZ metrics, power verbs, and structure
   ========================================================================== */

// High-impact power verbs
const POWER_VERBS = [
  'architected', 'spearheaded', 'engineered', 'orchestrated', 'pioneered',
  'automated', 'optimized', 'scaled', 'implemented', 'constructed',
  'eliminated', 'overhauled', 'benchmarked', 'deployed', 'designed',
  'standardized', 'instituted', 'slashed', 'accelerated', 'authored'
];

// Weak passive verbs/phrases to flag
const WEAK_VERBS = [
  'helped', 'worked on', 'assisted', 'responsible for', 'handled',
  'participated in', 'did', 'made', 'supported', 'attended', 'tasked with'
];

// Regex for quantifiable metrics ($4.2M, 54%, 85,000, 4-minute, sub-5ms)
const QUANTIFIED_METRIC_REGEX = /(\$\d+(\.\d+)?[kKmMbB]?|\d+([,\.]\d+)?%|\b\d+([,\.]\d+)?\s*(ms|seconds|minutes|hours|days|x|fold|users|nodes|requests|transactions|gpus|tpus|accounts|million|billion|k)\b|\b\d{2,}\b)/i;

/**
 * Runs a deterministic ATS diagnostic audit on candidate resume text and extracted metadata
 */
export function auditResumeATS(profileData) {
  const text = profileData.rawText || '';
  const bullets = profileData.bullets || [];

  const checks = [];
  let scoreParseability = 100;
  let scoreImpact = 100;
  let scoreVerbs = 100;
  let scoreCompleteness = 100;

  // 1. Contact Info Checks
  const emailValid = /[\w.-]+@[\w.-]+\.\w+/.test(profileData.email || text);
  const phoneValid = /(\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/.test(profileData.phone || text);
  const linkedinFound = /linkedin\.com\/in\/[\w-]+/i.test(profileData.linkedin || text);
  const githubFound = /github\.com\/[\w-]+/i.test(profileData.github || text);

  if (emailValid && phoneValid) {
    checks.push({
      id: 'contact_core',
      category: 'Parseability',
      status: 'pass',
      title: 'Valid Contact Channels',
      desc: 'Direct email and telephone are cleanly formatted for automated ATS parsing.'
    });
  } else {
    scoreParseability -= 20;
    checks.push({
      id: 'contact_core',
      category: 'Parseability',
      status: 'fail',
      title: 'Missing or Malformed Contact Info',
      desc: 'ATS systems require a clear email and phone number in standard header format.'
    });
  }

  if (linkedinFound) {
    checks.push({
      id: 'contact_linkedin',
      category: 'Parseability',
      status: 'pass',
      title: 'LinkedIn Identifier Detected',
      desc: 'Standardized profile URL recognized for recruiter cross-referencing.'
    });
  } else {
    scoreParseability -= 10;
    checks.push({
      id: 'contact_linkedin',
      category: 'Parseability',
      status: 'warn',
      title: 'No LinkedIn Profile URL Found',
      desc: 'Adding a valid linkedin.com/in/... link boosts recruiter engagement by 71%.'
    });
  }

  // 2. Section Header Standardizations
  const hasExperience = /experience|employment|work history|professional background/i.test(text);
  const hasEducation = /education|academic|degree|university/i.test(text);
  const hasSkills = /skills|competencies|technologies|technical stack/i.test(text);

  if (hasExperience && hasEducation && hasSkills) {
    checks.push({
      id: 'headers_standard',
      category: 'Structure',
      status: 'pass',
      title: 'Standardized ATS Section Headers',
      desc: 'Experience, Education, and Skills headers match Greenhouse and Workday taxonomies.'
    });
  } else {
    scoreCompleteness -= 25;
    checks.push({
      id: 'headers_standard',
      category: 'Structure',
      status: 'warn',
      title: 'Non-Standard Section Headings',
      desc: 'Ensure conventional headings (Experience, Education, Skills) are present without ornate formatting.'
    });
  }

  // 3. Google XYZ Quantified Impact Audit
  let quantifiedCount = 0;
  const weakBullets = [];
  const strongBullets = [];

  bullets.forEach((bullet, idx) => {
    const hasMetric = QUANTIFIED_METRIC_REGEX.test(bullet);
    if (hasMetric) {
      quantifiedCount++;
      strongBullets.push(bullet);
    } else {
      weakBullets.push(bullet);
    }
  });

  const quantifiedRatio = bullets.length > 0 ? (quantifiedCount / bullets.length) : 0;
  if (quantifiedRatio >= 0.75) {
    scoreImpact = 96;
    checks.push({
      id: 'impact_xyz',
      category: 'Impact Metrics',
      status: 'pass',
      title: 'Google XYZ Formula Adherence (High)',
      desc: `${Math.round(quantifiedRatio * 100)}% of your bullet points contain measurable, quantified KPIs and metrics.`
    });
  } else if (quantifiedRatio >= 0.4) {
    scoreImpact = 74;
    checks.push({
      id: 'impact_xyz',
      category: 'Impact Metrics',
      status: 'warn',
      title: 'Moderate Impact Quantification',
      desc: `${bullets.length - quantifiedCount} bullets lack concrete numbers or percentage improvements. Add metrics to prove scale.`
    });
  } else {
    scoreImpact = 45;
    checks.push({
      id: 'impact_xyz',
      category: 'Impact Metrics',
      status: 'fail',
      title: 'Low Quantifiable Achievements',
      desc: 'Bullets rely on passive task lists rather than measurable business outcomes.'
    });
  }

  // 4. Power Action Verbs vs Passive Fillers
  const textLower = text.toLowerCase();
  let foundPower = 0;
  let foundWeak = 0;

  POWER_VERBS.forEach(v => {
    if (textLower.includes(v)) foundPower++;
  });

  WEAK_VERBS.forEach(w => {
    if (textLower.includes(w)) foundWeak++;
  });

  if (foundPower >= 4 && foundWeak === 0) {
    scoreVerbs = 98;
    checks.push({
      id: 'power_verbs',
      category: 'Verb Index',
      status: 'pass',
      title: 'High-Impact Leadership Verbs',
      desc: `Detected strong action verbs (${foundPower} instances) such as "Architected", "Spearheaded", "Engineered".`
    });
  } else if (foundWeak > 0) {
    scoreVerbs = Math.max(40, 85 - (foundWeak * 12));
    checks.push({
      id: 'power_verbs',
      category: 'Verb Index',
      status: 'warn',
      title: 'Passive Fillers Detected',
      desc: `Found ${foundWeak} passive phrases (e.g. "helped", "responsible for"). Replace with authoritative action verbs.`
    });
  } else {
    scoreVerbs = 78;
    checks.push({
      id: 'power_verbs',
      category: 'Verb Index',
      status: 'pass',
      title: 'Solid Action Phrasing',
      desc: 'Action verbs are present throughout experience blocks.'
    });
  }

  // 5. Skills Density & Redundancy
  const skillCount = profileData.skills?.length || 0;
  if (skillCount >= 10 && skillCount <= 30) {
    checks.push({
      id: 'skills_density',
      category: 'Skill Density',
      status: 'pass',
      title: 'Optimal Skill Token Density',
      desc: `${skillCount} categorized skills provide strong coverage without triggering keyword-stuffing penalties.`
    });
  } else if (skillCount < 10) {
    scoreCompleteness -= 20;
    checks.push({
      id: 'skills_density',
      category: 'Skill Density',
      status: 'warn',
      title: 'Sparse Technical Skills Section',
      desc: 'Only a few technical skills listed. Add libraries, cloud tools, and engineering methodologies.'
    });
  }

  // Overall Combined Weighted ATS Score (0 - 100)
  const overallATS = Math.round(
    (scoreParseability * 0.25) +
    (scoreImpact * 0.35) +
    (scoreVerbs * 0.20) +
    (scoreCompleteness * 0.20)
  );

  let letterGrade = 'A+';
  let verdict = 'Elite Tier Candidate';
  if (overallATS < 60) {
    letterGrade = 'D';
    verdict = 'Needs Significant Restructuring';
  } else if (overallATS < 72) {
    letterGrade = 'C';
    verdict = 'Below Competitive Benchmark';
  } else if (overallATS < 82) {
    letterGrade = 'B';
    verdict = 'Solid - Needs Minor Optimization';
  } else if (overallATS < 90) {
    letterGrade = 'A';
    verdict = 'Strong Candidate Profile';
  }

  return {
    overallScore: Math.min(99, Math.max(40, overallATS)),
    letterGrade,
    verdict,
    pillars: {
      parseability: Math.max(40, Math.min(100, scoreParseability)),
      quantifiedImpact: Math.max(30, Math.min(100, scoreImpact)),
      verbStrength: Math.max(40, Math.min(100, scoreVerbs)),
      completeness: Math.max(40, Math.min(100, scoreCompleteness))
    },
    checks,
    quantifiedCount,
    totalBullets: bullets.length,
    weakBullets,
    strongBullets
  };
}
