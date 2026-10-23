/* ==========================================================================
   APP CONTROLLER & UI ORCHESTRATION
   Binds Personas, ATS Engine, Vector Matcher, Radar Canvas, and UI Events
   ========================================================================== */

import { PERSONAS } from './personas.js';
import { JOB_POSTINGS } from './job-database.js';
import { SKILLS_TAXONOMY, evaluateJobMatch } from './vector-matcher.js';
import { auditResumeATS } from './ats-engine.js';
import { ResumeParser } from './parser.js';
import { SkillsRadarChart } from './radar-chart.js';

class NexusApp {
  constructor() {
    this.currentProfile = PERSONAS.staff_ai;
    this.radarChart = null;
    this.soundEnabled = true;
    this.audioCtx = null;

    this.init();
  }

  init() {
    // 1. Initialize Radar Chart
    this.radarChart = new SkillsRadarChart('skillsRadarCanvas');

    // 2. Setup Cursor Glow Tracker
    this.setupCursorGlow();

    // 3. Setup Sound Engine
    this.setupAudio();

    // 4. Setup Event Listeners
    this.bindEvents();

    // 5. Initial Render with default persona (Staff AI)
    this.analyzeProfile(this.currentProfile);
  }

  /* ------------------------------------------------------------------------
     Audio Synthesis (Web Audio API)
     ------------------------------------------------------------------------ */
  setupAudio() {
    const soundBtn = document.getElementById('soundToggleBtn');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        this.soundEnabled = !this.soundEnabled;
        soundBtn.innerHTML = this.soundEnabled
          ? `<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>`
          : `<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path></svg>`;
        this.showToast(this.soundEnabled ? 'Haptic Sound Enabled' : 'Sound Muted');
      });
    }
  }

  playSound(type = 'click') {
    if (!this.soundEnabled) return;
    try {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      const now = this.audioCtx.currentTime;

      if (type === 'click') {
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch (e) {
      // Audio fallback silent
    }
  }

  /* ------------------------------------------------------------------------
     Cursor Radial Glow Tracking
     ------------------------------------------------------------------------ */
  setupCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow) return;
    window.addEventListener('mousemove', (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    });
  }

  /* ------------------------------------------------------------------------
     Event Bindings
     ------------------------------------------------------------------------ */
  bindEvents() {
    // 1. Persona Chip Buttons
    document.querySelectorAll('.persona-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const personaId = chip.dataset.persona;
        if (PERSONAS[personaId]) {
          document.querySelectorAll('.persona-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          this.playSound('click');
          this.currentProfile = PERSONAS[personaId];
          this.hideActiveFileIndicator();
          this.analyzeProfile(this.currentProfile);
        }
      });
    });

    // 2. Tab Navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const targetId = btn.dataset.tab;
        const targetEl = document.getElementById(targetId);
        if (targetEl) targetEl.classList.add('active');

        this.playSound('click');

        // If radar tab became active, animate radar
        if (targetId === 'tab-radar' && this.radarChart) {
          setTimeout(() => this.radarChart.animate(), 50);
        }
      });
    });

    // 3. Dropzone & File Upload
    const dropzone = document.getElementById('resumeDropzone');
    const fileInput = document.getElementById('resumeFileInput');
    const browseBtn = document.getElementById('browseFileBtn');

    if (browseBtn && fileInput) {
      browseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
      });
    }

    if (fileInput) {
      fileInput.addEventListener('change', async (e) => {
        if (e.target.files && e.target.files[0]) {
          await this.handleFileUpload(e.target.files[0]);
        }
      });
    }

    if (dropzone) {
      ['dragenter', 'dragover'].forEach(name => {
        dropzone.addEventListener(name, (e) => {
          e.preventDefault();
          dropzone.classList.add('dragover');
        });
      });

      ['dragleave', 'drop'].forEach(name => {
        dropzone.addEventListener(name, (e) => {
          e.preventDefault();
          dropzone.classList.remove('dragover');
        });
      });

      dropzone.addEventListener('drop', async (e) => {
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
          await this.handleFileUpload(e.dataTransfer.files[0]);
        }
      });

      dropzone.addEventListener('click', () => {
        if (fileInput) fileInput.click();
      });
    }

    // 4. Raw Text Paste Drawer
    const pasteToggleBtn = document.getElementById('togglePasteDrawerBtn');
    const pasteDrawer = document.getElementById('pasteDrawer');
    const analyzePastedBtn = document.getElementById('analyzePastedTextBtn');
    const rawTextarea = document.getElementById('rawResumeText');

    if (pasteToggleBtn && pasteDrawer) {
      pasteToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        pasteDrawer.classList.toggle('open');
      });
    }

    if (analyzePastedBtn && rawTextarea) {
      analyzePastedBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = rawTextarea.value.trim();
        if (text.length < 50) {
          this.showToast('Please paste at least a few sentences of resume text.');
          return;
        }
        this.triggerScanAnimation();
        setTimeout(() => {
          const parsed = ResumeParser.parseText(text, 'Pasted_Resume.txt');
          this.currentProfile = parsed;
          this.showActiveFileIndicator('Pasted_Resume.txt', `${text.length} chars`);
          this.analyzeProfile(parsed);
          pasteDrawer.classList.remove('open');
        }, 800);
      });
    }

    // 5. Remove Uploaded File Button
    const removeFileBtn = document.getElementById('removeFileBtn');
    if (removeFileBtn) {
      removeFileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.hideActiveFileIndicator();
        this.currentProfile = PERSONAS.staff_ai;
        document.querySelector('.persona-chip[data-persona="staff_ai"]')?.classList.add('active');
        this.analyzeProfile(this.currentProfile);
      });
    }

    // 6. Google XYZ Bullet Optimizer
    const optimizeBtn = document.getElementById('runOptimizerBtn');
    if (optimizeBtn) {
      optimizeBtn.addEventListener('click', () => this.optimizeBullet());
    }

    document.querySelectorAll('.sample-bullet-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const textarea = document.getElementById('bulletInput');
        if (textarea) {
          textarea.value = chip.dataset.bullet;
          this.playSound('click');
        }
      });
    });

    const copyBtn = document.getElementById('copyOptimizedBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const text = document.getElementById('optimizedBulletResult')?.innerText;
        if (text) {
          navigator.clipboard.writeText(text);
          this.playSound('success');
          this.showToast('Copied optimized bullet to clipboard!');
        }
      });
    }

    // 7. Modal Close
    const modalBackdrop = document.getElementById('jobDetailModal');
    const modalClose = document.getElementById('closeModalBtn');
    if (modalBackdrop && modalClose) {
      modalClose.addEventListener('click', () => modalBackdrop.classList.remove('open'));
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) modalBackdrop.classList.remove('open');
      });
    }

    // 8. Print / Export Report
    const exportBtn = document.getElementById('exportReportBtn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        this.playSound('click');
        window.print();
      });
    }
  }

  /* ------------------------------------------------------------------------
     File Upload & Processing
     ------------------------------------------------------------------------ */
  async handleFileUpload(file) {
    this.triggerScanAnimation();
    this.playSound('click');

    try {
      const rawText = await ResumeParser.readFile(file);
      const parsed = ResumeParser.parseText(rawText, file.name);

      setTimeout(() => {
        this.currentProfile = parsed;
        const sizeKb = (file.size / 1024).toFixed(1) + ' KB';
        this.showActiveFileIndicator(file.name, sizeKb);
        document.querySelectorAll('.persona-chip').forEach(c => c.classList.remove('active'));
        this.analyzeProfile(parsed);
      }, 900);
    } catch (err) {
      console.error(err);
      this.showToast('Error reading file. Falling back to default.');
    }
  }

  triggerScanAnimation() {
    const card = document.getElementById('resumeDropzone');
    if (card) {
      card.classList.add('analyzing');
      setTimeout(() => card.classList.remove('analyzing'), 1600);
    }
  }

  showActiveFileIndicator(name, size) {
    const indicator = document.getElementById('activeFileIndicator');
    const nameEl = document.getElementById('activeFileName');
    const sizeEl = document.getElementById('activeFileSize');
    if (indicator && nameEl && sizeEl) {
      nameEl.textContent = name;
      sizeEl.textContent = size;
      indicator.classList.add('visible');
    }
  }

  hideActiveFileIndicator() {
    const indicator = document.getElementById('activeFileIndicator');
    if (indicator) indicator.classList.remove('visible');
  }

  /* ------------------------------------------------------------------------
     Core Analysis & View Updaters
     ------------------------------------------------------------------------ */
  analyzeProfile(profile) {
    // 1. Deterministic ATS Audit
    const atsResult = auditResumeATS(profile);

    // 2. Render Scorecard & Gauge
    this.renderScorecard(atsResult);

    // 3. Render Audit Checks (pass/warn/fail)
    this.renderAuditChecks(atsResult.checks);

    // 4. Update Radar & Skills Matrix
    this.renderSkillsMatrix(profile);

    // 5. Render Job Recommendations
    this.renderJobRecommendations(profile);

    // 6. Seed Bullet Optimizer with candidate's bullet
    const bulletInput = document.getElementById('bulletInput');
    if (bulletInput && profile.bullets && profile.bullets.length > 0) {
      bulletInput.value = profile.bullets[0];
      this.optimizeBullet();
    }

    this.playSound('success');
  }

  renderScorecard(atsResult) {
    const scoreEl = document.getElementById('atsScoreValue');
    const gradeEl = document.getElementById('atsGradeBadge');
    const verdictEl = document.getElementById('atsVerdictText');
    const circleEl = document.getElementById('gaugeProgressCircle');

    // Animated count up
    if (scoreEl) {
      this.animateCountUp(scoreEl, atsResult.overallScore);
    }

    if (gradeEl) {
      gradeEl.textContent = `Grade ${atsResult.letterGrade}`;
    }

    if (verdictEl) {
      verdictEl.textContent = atsResult.verdict;
    }

    // Circular gauge stroke animation: perimeter = 2 * PI * 90 = ~565
    if (circleEl) {
      const perimeter = 565;
      const offset = perimeter - (perimeter * (atsResult.overallScore / 100));
      circleEl.style.strokeDashoffset = offset;
    }

    // Render 4 Core Pillars
    this.setTrackValue('parseabilityFill', 'parseabilityVal', atsResult.pillars.parseability);
    this.setTrackValue('impactFill', 'impactVal', atsResult.pillars.quantifiedImpact);
    this.setTrackValue('verbFill', 'verbVal', atsResult.pillars.verbStrength);
    this.setTrackValue('completenessFill', 'completenessVal', atsResult.pillars.completeness);
  }

  setTrackValue(fillId, valId, value) {
    const fill = document.getElementById(fillId);
    const val = document.getElementById(valId);
    if (fill) fill.style.width = `${value}%`;
    if (val) val.textContent = `${value}/100`;
  }

  renderAuditChecks(checks) {
    const container = document.getElementById('auditChecksGrid');
    if (!container) return;

    container.innerHTML = checks.map(check => {
      let icon = '';
      if (check.status === 'pass') {
        icon = `<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>`;
      } else if (check.status === 'warn') {
        icon = `<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`;
      } else {
        icon = `<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>`;
      }

      return `
        <div class="audit-item">
          <div class="audit-status-badge ${check.status}">
            ${icon}
          </div>
          <div class="audit-details">
            <h4>${check.title}</h4>
            <p>${check.desc}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  renderSkillsMatrix(profile) {
    const matrixContainer = document.getElementById('taxonomyMatrixContainer');
    if (!matrixContainer) return;

    const candLower = profile.skills.map(s => s.toLowerCase());

    // Generate radar values dynamically based on candidate skills
    const radarCandidate = [
      candLower.some(s => s.includes('vllm') || s.includes('triton') || s.includes('cuda')) ? 92 : (candLower.some(s => s.includes('python')) ? 65 : 30),
      candLower.some(s => s.includes('ray') || s.includes('megatron') || s.includes('distributed')) ? 90 : (candLower.some(s => s.includes('kafka')) ? 70 : 35),
      candLower.some(s => s.includes('kubernetes') || s.includes('aws') || s.includes('docker')) ? 88 : 40,
      candLower.some(s => s.includes('fastapi') || s.includes('node') || s.includes('express') || s.includes('go')) ? 85 : 50,
      candLower.some(s => s.includes('postgres') || s.includes('dynamodb') || s.includes('sql') || s.includes('mongodb')) ? 82 : 45,
      candLower.some(s => s.includes('system architecture') || s.includes('disaster recovery')) ? 90 : 40,
      candLower.some(s => s.includes('prometheus') || s.includes('grafana') || s.includes('mlops')) ? 78 : 35,
      candLower.some(s => s.includes('product strategy') || s.includes('roadmapping')) ? 92 : 40
    ];

    if (this.radarChart) {
      this.radarChart.updateData(radarCandidate, [80, 85, 75, 80, 70, 80, 75, 60]);
    }

    // Build Categorized Matrix
    const categoryLabels = {
      languages: 'Programming Languages',
      frameworks: 'Frameworks & Libraries',
      cloud_devops: 'Cloud & Infrastructure',
      ai_systems: 'AI & Systems Engineering',
      databases: 'Databases & Storage',
      architecture_product: 'Architecture & Leadership'
    };

    let html = '';
    for (const [catKey, skillList] of Object.entries(SKILLS_TAXONOMY)) {
      const pillsHtml = skillList.map(skill => {
        const isMatched = candLower.includes(skill.toLowerCase());
        const pillClass = isMatched ? 'matched' : 'missing';
        const icon = isMatched ? '✓' : '+';
        return `<span class="skill-pill ${pillClass}"><i>${icon}</i> ${skill}</span>`;
      }).join('');

      html += `
        <div class="skill-category-group">
          <div class="skill-category-head">
            <span class="skill-category-title">${categoryLabels[catKey] || catKey}</span>
            <span class="tab-badge">${skillList.filter(s => candLower.includes(s.toLowerCase())).length} / ${skillList.length}</span>
          </div>
          <div class="skills-pill-wrap">
            ${pillsHtml}
          </div>
        </div>
      `;
    }

    matrixContainer.innerHTML = html;
  }

  renderJobRecommendations(profile) {
    const jobsGrid = document.getElementById('jobsGridContainer');
    if (!jobsGrid) return;

    // Evaluate candidate against every job posting
    const evaluatedJobs = JOB_POSTINGS.map(job => {
      const match = evaluateJobMatch(profile, job);
      return { ...job, match };
    });

    // Sort by overall match descending
    evaluatedJobs.sort((a, b) => b.match.overallScore - a.match.overallScore);

    jobsGrid.innerHTML = evaluatedJobs.map(job => {
      const reqSkillsPills = job.requiredSkills.slice(0, 4).map(skill => {
        const hasIt = profile.skills.some(s => s.toLowerCase() === skill.toLowerCase());
        return `<span class="job-tag ${hasIt ? 'salary' : ''}">${skill}</span>`;
      }).join('');

      return `
        <div class="job-card">
          <div class="job-card-top">
            <div class="company-avatar">${job.company.substring(0, 2).toUpperCase()}</div>
            <div class="match-percentage-badge">
              <span class="match-score-value">${job.match.overallScore}%</span>
              <span class="match-score-label">Two-Tower Match</span>
            </div>
          </div>

          <div>
            <h3 class="job-role-title">${job.role}</h3>
            <div class="job-company-name">
              <span>${job.company}</span> • <span>${job.location}</span>
            </div>
            <div class="job-meta-row">
              <span class="job-tag salary">${job.salary}</span>
              <span class="job-tag">${job.tier}</span>
              <span class="job-tag">${job.domain}</span>
            </div>
            <div class="job-meta-row">
              ${reqSkillsPills}
            </div>
          </div>

          <div class="job-card-footer">
            <span style="font-size: 0.78rem; color: var(--text-muted); font-family: var(--font-mono);">
              ${job.match.missingSkills.length === 0 ? '✓ 100% Core Match' : `${job.match.missingSkills.length} Gap Skills`}
            </span>
            <button class="tailor-match-btn" data-job-id="${job.id}">
              Deep Match Breakdown →
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Bind Deep Match Breakdown Modal Clicks
    document.querySelectorAll('.tailor-match-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const jobId = btn.dataset.jobId;
        const targetJob = evaluatedJobs.find(j => j.id === jobId);
        if (targetJob) {
          this.openJobDetailModal(targetJob);
        }
      });
    });
  }

  openJobDetailModal(job) {
    const modal = document.getElementById('jobDetailModal');
    const content = document.getElementById('modalJobContent');
    if (!modal || !content) return;

    const matchedPills = job.match.matchedSkills.map(s => `<span class="skill-pill matched">✓ ${s}</span>`).join('');
    const missingPills = job.match.missingSkills.map(s => `<span class="skill-pill missing">✕ ${s}</span>`).join('');
    const adjacentPills = job.match.adjacentSkills.map(adj => {
      return `<span class="skill-pill adjacent">≈ ${adj.required} (Transferable from ${adj.candidateHas})</span>`;
    }).join('');

    content.innerHTML = `
      <div style="margin-bottom: 20px;">
        <span class="gauge-tier-badge" style="margin-bottom: 8px;">Two-Tower Deep Match: ${job.match.overallScore}%</span>
        <h2 style="font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 4px;">${job.role}</h2>
        <p style="color: var(--text-secondary); font-size: 0.9rem;">${job.company} • ${job.location} • ${job.salary}</p>
      </div>

      <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-subtle); border-radius: 14px; padding: 16px; margin-bottom: 20px;">
        <h4 style="font-size: 0.88rem; font-family: var(--font-mono); color: var(--accent-emerald-bright); margin-bottom: 6px;">ROLE SUMMARY</h4>
        <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.5;">${job.summary}</p>
      </div>

      <div style="margin-bottom: 18px;">
        <h4 style="font-size: 0.82rem; font-family: var(--font-mono); color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">Matched Core Skills (${job.match.matchedSkills.length})</h4>
        <div class="skills-pill-wrap">${matchedPills || '<span style="font-size: 0.8rem; color: var(--text-muted);">None detected</span>'}</div>
      </div>

      ${job.match.adjacentSkills.length > 0 ? `
      <div style="margin-bottom: 18px;">
        <h4 style="font-size: 0.82rem; font-family: var(--font-mono); color: var(--accent-amber); text-transform: uppercase; margin-bottom: 8px;">Adjacent / Transferable Concepts (${job.match.adjacentSkills.length})</h4>
        <div class="skills-pill-wrap">${adjacentPills}</div>
      </div>` : ''}

      <div style="margin-bottom: 24px;">
        <h4 style="font-size: 0.82rem; font-family: var(--font-mono); color: var(--accent-rose); text-transform: uppercase; margin-bottom: 8px;">Recommended Growth Skills (${job.match.missingSkills.length})</h4>
        <div class="skills-pill-wrap">${missingPills || '<span style="font-size: 0.8rem; color: var(--accent-emerald-bright);">Zero skill gaps! You match all requirements.</span>'}</div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 10px;">
        <button class="nav-btn primary" onclick="document.getElementById('jobDetailModal').classList.remove('open')">
          Done Reviewing
        </button>
      </div>
    `;

    this.playSound('click');
    modal.classList.add('open');
  }

  /* ------------------------------------------------------------------------
     Google XYZ Bullet Optimizer
     ------------------------------------------------------------------------ */
  optimizeBullet() {
    const inputEl = document.getElementById('bulletInput');
    const beforeEl = document.getElementById('beforeBulletText');
    const afterEl = document.getElementById('optimizedBulletResult');
    if (!inputEl || !beforeEl || !afterEl) return;

    const raw = inputEl.value.trim();
    if (!raw) return;

    beforeEl.textContent = `"${raw}"`;

    const lower = raw.toLowerCase();
    let optimized = '';

    if (lower.includes('model') || lower.includes('llm') || lower.includes('ai') || lower.includes('inference') || lower.includes('gpu')) {
      optimized = 'Architected high-throughput distributed LLM inference cluster using vLLM and TensorRT-LLM across 512 H100 GPUs, slashing P99 latency by 54% and saving $1.2M in annual cloud compute.';
    } else if (lower.includes('cloud') || lower.includes('terraform') || lower.includes('aws') || lower.includes('infra') || lower.includes('kubernetes')) {
      optimized = 'Orchestrated automated zero-downtime multi-region Kubernetes infrastructure via Terraform GitOps pipelines, cutting deployment provisioning time by 82% with 99.995% SLA.';
    } else if (lower.includes('api') || lower.includes('backend') || lower.includes('microservice') || lower.includes('server')) {
      optimized = 'Engineered resilient RESTful microservices handling 4.2M daily transactions, reducing P99 response times from 380ms to 45ms while maintaining 100% data consistency.';
    } else if (lower.includes('react') || lower.includes('frontend') || lower.includes('ui') || lower.includes('dashboard') || lower.includes('web')) {
      optimized = 'Spearheaded modular enterprise design system and frontend architecture in React/TypeScript, driving 42% lift in user workflow completion and reducing client bundle size by 35%.';
    } else if (lower.includes('product') || lower.includes('roadmap') || lower.includes('user') || lower.includes('growth')) {
      optimized = 'Spearheaded enterprise product roadmap and automated onboarding flow, growing ARR from $0 to $14M in 14 months while accelerating week-4 user retention by 33%.';
    } else {
      // General Google XYZ formula
      optimized = `Spearheaded end-to-end optimization of ${raw.replace(/^(helped|worked on|assisted with|responsible for)\s*/i, '')}, elevating operational throughput by 46% and eliminating $180k in technical overhead.`;
    }

    afterEl.textContent = optimized;
    this.playSound('click');
  }

  /* ------------------------------------------------------------------------
     Helper Utilities
     ------------------------------------------------------------------------ */
  animateCountUp(element, target, duration = 1200) {
    let start = 0;
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * target);
      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target;
      }
    };

    requestAnimationFrame(update);
  }

  showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" fill="none" stroke="var(--accent-emerald-bright)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
      <span>${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.app = new NexusApp();
});
