/* ==========================================================================
   RESUME PARSER & SECTION EXTRACTOR
   Extracts text, contact details, bullets, and skills from files & text
   ========================================================================== */

import { SKILLS_TAXONOMY } from './vector-matcher.js';

export class ResumeParser {
  /**
   * Parses raw resume text into structured profile data
   */
  static parseText(rawText, fileName = 'Uploaded_Resume.txt') {
    const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);

    const email = this.extractEmail(rawText);
    const phone = this.extractPhone(rawText);
    const linkedin = this.extractLinkedIn(rawText);
    const github = this.extractGitHub(rawText);
    const extractedSkills = this.extractSkills(rawText);
    const bullets = this.extractBullets(rawText);

    // Guess candidate name from first non-empty line
    const name = lines[0] && lines[0].length < 40 ? lines[0] : 'Candidate Profile';

    return {
      id: 'custom_' + Date.now(),
      name,
      fileName,
      role: 'Software Professional',
      level: 'Professional',
      experienceYears: this.estimateExperienceYears(rawText),
      email,
      phone,
      linkedin,
      github,
      skills: extractedSkills.length > 0 ? extractedSkills : ['Python', 'SQL', 'Git', 'Agile'],
      bullets: bullets.length > 0 ? bullets : [
        'Collaborated on software development and infrastructure tasks across team sprints.',
        'Assisted with debugging and feature implementation in code repository.'
      ],
      rawText
    };
  }

  static extractEmail(text) {
    const match = text.match(/[\w.-]+@[\w.-]+\.\w+/);
    return match ? match[0] : '';
  }

  static extractPhone(text) {
    const match = text.match(/(\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
    return match ? match[0] : '';
  }

  static extractLinkedIn(text) {
    const match = text.match(/linkedin\.com\/in\/[\w-]+/i);
    return match ? match[0] : '';
  }

  static extractGitHub(text) {
    const match = text.match(/github\.com\/[\w-]+/i);
    return match ? match[0] : '';
  }

  static extractBullets(text) {
    const lines = text.split('\n');
    const bullets = [];

    for (let line of lines) {
      const trimmed = line.trim();
      // Look for bullet symbols or dashes or numbered bullets
      if (/^[•\-\*\u2022\u25E6]\s*/.test(trimmed)) {
        const clean = trimmed.replace(/^[•\-\*\u2022\u25E6]\s*/, '').trim();
        if (clean.length > 20) bullets.push(clean);
      } else if (/^\d+[\.\)]\s*/.test(trimmed)) {
        const clean = trimmed.replace(/^\d+[\.\)]\s*/, '').trim();
        if (clean.length > 20) bullets.push(clean);
      }
    }

    // If no explicit bullets were found, extract sentence chunks that look like experience
    if (bullets.length === 0) {
      const sentences = text.split(/[.\n]/).map(s => s.trim()).filter(s => s.length > 35);
      return sentences.slice(0, 6);
    }

    return bullets;
  }

  static extractSkills(text) {
    const lower = text.toLowerCase();
    const found = new Set();

    // Flatten taxonomy
    const allTaxonomySkills = [];
    Object.values(SKILLS_TAXONOMY).forEach(list => allTaxonomySkills.push(...list));

    // Common extra tech terms
    allTaxonomySkills.push(
      'Git', 'CI/CD', 'REST API', 'GraphQL', 'Linux', 'Security',
      'System Architecture', 'Microservices', 'Distributed Systems'
    );

    for (const skill of allTaxonomySkills) {
      // Regex word boundary match
      const escaped = skill.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`(^|[^a-zA-Z0-9])${escaped}([^a-zA-Z0-9]|$)`, 'i');
      if (regex.test(lower)) {
        found.add(skill);
      }
    }

    return Array.from(found);
  }

  static estimateExperienceYears(text) {
    // Look for patterns like "8+ years" or "5 years of experience" or graduation year
    const matchYears = text.match(/(\d+)\+?\s*years/i);
    if (matchYears && parseInt(matchYears[1]) < 30) {
      return parseInt(matchYears[1]);
    }

    // Check year ranges like 2018 - 2024
    const dates = text.match(/\b(20\d{2}|19\d{2})\b/g);
    if (dates && dates.length >= 2) {
      const years = dates.map(Number);
      const span = Math.max(...years) - Math.min(...years);
      if (span > 0 && span < 30) return span;
    }

    return 3;
  }

  /**
   * Reads a File object and extracts text
   */
  static async readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // If text/markdown/json
      if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
      } else {
        // PDF or binary: read as text fallback (extracting ASCII chunks)
        reader.onload = (e) => {
          const content = e.target.result;
          if (typeof content === 'string') {
            resolve(content);
          } else {
            // Convert ArrayBuffer to printable strings
            const uint8 = new Uint8Array(content);
            let extracted = '';
            for (let i = 0; i < uint8.length; i++) {
              const charCode = uint8[i];
              if ((charCode >= 32 && charCode <= 126) || charCode === 10 || charCode === 13) {
                extracted += String.fromCharCode(charCode);
              } else {
                extracted += ' ';
              }
            }
            resolve(extracted);
          }
        };
        reader.onerror = (e) => reject(e);
        reader.readAsArrayBuffer(file);
      }
    });
  }
}
