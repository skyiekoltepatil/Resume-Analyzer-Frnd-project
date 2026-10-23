/* ==========================================================================
   INTERACTIVE CANVAS RADAR CHART
   High-DPI, animated multi-axis radar comparing candidate vs benchmark
   ========================================================================== */

export class SkillsRadarChart {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.axes = [
      { label: 'AI & Inference', key: 'ai' },
      { label: 'Distributed Systems', key: 'distributed' },
      { label: 'Cloud & Kubernetes', key: 'cloud' },
      { label: 'Backend APIs', key: 'backend' },
      { label: 'Databases & Storage', key: 'db' },
      { label: 'System Architecture', key: 'arch' },
      { label: 'Observability & MLOps', key: 'mlops' },
      { label: 'Product & Strategy', key: 'product' }
    ];

    this.candidateValues = [85, 90, 80, 85, 75, 88, 70, 45];
    this.benchmarkValues = [80, 85, 75, 80, 70, 80, 75, 60];
    this.animProgress = 0;
    this.animationFrame = null;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
      this.draw(1);
    });
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;
    this.center = { x: this.width / 2, y: this.height / 2 };
    this.radius = Math.min(this.width, this.height) * 0.36;
  }

  updateData(candidateVals, benchmarkVals) {
    if (candidateVals) this.candidateValues = candidateVals;
    if (benchmarkVals) this.benchmarkValues = benchmarkVals;
    this.animate();
  }

  animate() {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    let start = null;
    const duration = 900; // ms

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      this.draw(ease);

      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(step);
      }
    };

    this.animationFrame = requestAnimationFrame(step);
  }

  draw(progress = 1) {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    const totalAxes = this.axes.length;
    const angleStep = (Math.PI * 2) / totalAxes;

    // 1. Draw concentric background webs
    const levels = 4;
    for (let level = 1; level <= levels; level++) {
      const r = (this.radius / levels) * level;
      this.ctx.beginPath();
      for (let i = 0; i < totalAxes; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = this.center.x + Math.cos(angle) * r;
        const y = this.center.y + Math.sin(angle) * r;
        if (i === 0) this.ctx.moveTo(x, y);
        else this.ctx.lineTo(x, y);
      }
      this.ctx.closePath();
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    }

    // 2. Draw axis spoke lines & labels
    for (let i = 0; i < totalAxes; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const xEnd = this.center.x + Math.cos(angle) * this.radius;
      const yEnd = this.center.y + Math.sin(angle) * this.radius;

      // Spoke
      this.ctx.beginPath();
      this.ctx.moveTo(this.center.x, this.center.y);
      this.ctx.lineTo(xEnd, yEnd);
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      this.ctx.stroke();

      // Label text
      const labelDist = this.radius + 24;
      const lx = this.center.x + Math.cos(angle) * labelDist;
      const ly = this.center.y + Math.sin(angle) * labelDist;

      this.ctx.font = '500 11px "Plus Jakarta Sans", sans-serif';
      this.ctx.fillStyle = '#94a3b8';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(this.axes[i].label, lx, ly);
    }

    // 3. Draw Benchmark Polygon (Dotted White/Cyan)
    this.ctx.save();
    this.ctx.beginPath();
    for (let i = 0; i < totalAxes; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const val = (this.benchmarkValues[i] / 100) * this.radius * progress;
      const x = this.center.x + Math.cos(angle) * val;
      const y = this.center.y + Math.sin(angle) * val;
      if (i === 0) this.ctx.moveTo(x, y);
      else this.ctx.lineTo(x, y);
    }
    this.ctx.closePath();
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    this.ctx.setLineDash([4, 4]);
    this.ctx.lineWidth = 1.5;
    this.ctx.stroke();
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    this.ctx.fill();
    this.ctx.restore();

    // 4. Draw Candidate Polygon (Emerald Neon)
    this.ctx.save();
    this.ctx.beginPath();
    const candidatePoints = [];
    for (let i = 0; i < totalAxes; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const val = (this.candidateValues[i] / 100) * this.radius * progress;
      const x = this.center.x + Math.cos(angle) * val;
      const y = this.center.y + Math.sin(angle) * val;
      candidatePoints.push({ x, y, val: this.candidateValues[i] });
      if (i === 0) this.ctx.moveTo(x, y);
      else this.ctx.lineTo(x, y);
    }
    this.ctx.closePath();

    // Glowing Fill Gradient
    const gradient = this.ctx.createRadialGradient(
      this.center.x, this.center.y, 10,
      this.center.x, this.center.y, this.radius
    );
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.45)');
    gradient.addColorStop(1, 'rgba(6, 182, 212, 0.15)');
    this.ctx.fillStyle = gradient;
    this.ctx.fill();

    // Stroke
    this.ctx.strokeStyle = '#34d399';
    this.ctx.lineWidth = 2.5;
    this.ctx.shadowColor = 'rgba(16, 185, 129, 0.6)';
    this.ctx.shadowBlur = 12;
    this.ctx.stroke();

    // 5. Draw point dots
    candidatePoints.forEach(pt => {
      this.ctx.beginPath();
      this.ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fill();
      this.ctx.strokeStyle = '#10b981';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    });

    this.ctx.restore();
  }
}
