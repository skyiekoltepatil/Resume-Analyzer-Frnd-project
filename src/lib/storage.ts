import { ExtractedProfile, ResumeAnalysisReport, JobMatchReport } from './types';

const STORAGE_KEYS = {
  ACTIVE_PROFILE: 'pathwise_active_profile',
  ACTIVE_REPORT: 'pathwise_active_report',
  ACTIVE_MATCH: 'pathwise_active_match',
  SAVED_JOBS: 'pathwise_saved_jobs',
};

export function saveActiveProfile(profile: ExtractedProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving profile to localStorage', e);
  }
}

export function getActiveProfile(): ExtractedProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_PROFILE);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function saveActiveReport(report: ResumeAnalysisReport): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_REPORT, JSON.stringify(report));
  } catch (e) {
    console.error('Error saving report to localStorage', e);
  }
}

export function getActiveReport(): ResumeAnalysisReport | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_REPORT);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function saveActiveMatch(match: JobMatchReport): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_MATCH, JSON.stringify(match));
  } catch (e) {
    console.error('Error saving match to localStorage', e);
  }
}

export function getActiveMatch(): JobMatchReport | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_MATCH);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function clearProfileData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.ACTIVE_PROFILE);
  localStorage.removeItem(STORAGE_KEYS.ACTIVE_REPORT);
  localStorage.removeItem(STORAGE_KEYS.ACTIVE_MATCH);
}
