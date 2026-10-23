import { ExtractedProfile } from './types';

// Curated comprehensive skills taxonomy for deterministic pre-extraction
export const COMMON_SKILLS = [
  'Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C#', 'Go', 'Rust', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'SQL',
  'React', 'Next.js', 'Vue.js', 'Angular', 'Node.js', 'Express', 'FastAPI', 'Django', 'Flask', 'Spring Boot',
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Cassandra', 'Elasticsearch', 'DynamoDB', 'Supabase', 'Firebase',
  'AWS', 'Google Cloud', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'GitHub Actions', 'Jenkins',
  'Git', 'Linux', 'Microservices', 'GraphQL', 'REST API', 'gRPC', 'Kafka', 'RabbitMQ',
  'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'LLM', 'LangChain', 'NLP', 'Computer Vision',
  'Agile', 'Scrum', 'Leadership', 'System Architecture', 'Testing', 'Jest', 'Cypress'
];

/**
 * Parse extracted text into structured resume profile (isomorphic, safe for client and server)
 */
export function parseResumeProfile(rawText: string, fileName: string, fileType: string): ExtractedProfile {
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  const wordCount = rawText.split(/\s+/).filter(Boolean).length;

  const emailMatch = rawText.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
  const phoneMatch = rawText.match(/(\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
  const linkedinMatch = rawText.match(/linkedin\.com\/in\/[\w-]+/i);
  const githubMatch = rawText.match(/github\.com\/[\w-]+/i);

  // Candidate name heuristic: first non-empty line under 45 characters
  let candidateName = 'Candidate Profile';
  if (lines.length > 0 && lines[0].length < 45 && !lines[0].includes('@') && !lines[0].includes('http')) {
    candidateName = lines[0];
  }

  // Detect skills mentioned in resume
  const foundSkills: string[] = [];
  const lowerText = rawText.toLowerCase();
  for (const skill of COMMON_SKILLS) {
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(lowerText) && !foundSkills.includes(skill)) {
      foundSkills.push(skill);
    }
  }

  // Estimate experience years
  let estimatedYears = 0;
  const yearMatches = rawText.match(/\b(20\d{2}|19\d{2})\b/g);
  if (yearMatches && yearMatches.length >= 2) {
    const years = yearMatches.map(Number).filter(y => y >= 1990 && y <= 2026);
    if (years.length >= 2) {
      const minYear = Math.min(...years);
      const maxYear = Math.max(...years);
      estimatedYears = Math.min(Math.max(maxYear - minYear, 0), 30);
    }
  }

  // Extract candidate bullet points
  const bulletLines = lines.filter(l => /^[•\-\*–]\s+/.test(l) || /^\d+\.\s+/.test(l));
  const highlights = bulletLines.slice(0, 10).map(b => b.replace(/^[•\-\*–\d\.]+\s+/, ''));

  return {
    id: `res_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: candidateName,
    email: emailMatch ? emailMatch[0] : '',
    phone: phoneMatch ? phoneMatch[0] : '',
    linkedin: linkedinMatch ? `https://${linkedinMatch[0]}` : '',
    github: githubMatch ? `https://${githubMatch[0]}` : '',
    location: '',
    summary: lines.slice(1, 4).join(' '),
    targetRole: 'Software Engineer',
    experienceYears: estimatedYears,
    education: [],
    experience: highlights.length > 0 ? [{
      role: 'Recent Experience',
      company: 'Industry / Project Experience',
      highlights
    }] : [],
    projects: [],
    skills: foundSkills.length > 0 ? foundSkills : ['JavaScript', 'Python', 'Git', 'Problem Solving'],
    rawText,
    wordCount,
    fileName,
    fileType,
  };
}
