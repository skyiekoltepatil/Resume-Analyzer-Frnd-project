# Pathwise — AI Career Intelligence & ATS Audit Platform

> **Awwwards-Level Editorial Design (2026–2027)**  
> Evidence-grounded resume diagnostics, Google XYZ bullet transformations, explainable two-tower job matching, and live vacancy synchronization.

---

## 1. Executive Overview

**Pathwise** is an enterprise-grade AI career intelligence platform built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and the official **Google Gen AI SDK (`@google/genai` & `@google/generative-ai`)**.

Unlike superficial keyword-matching ATS scanners that hallucinate credentials or spit out arbitrary percentages, Pathwise is built on **verifiable evidence grounding**:
1. **Document Ingestion**: Extracts text from PDF and DOCX files safely in-memory without data persistence.
2. **Evidence vs. Mention Audit**: Distinguishes skills explicitly proven in project bullets with metrics from buzzwords casually dropped in a skills list.
3. **Google XYZ Bullet Optimization**: Rewrites passive phrases using Laszlo Bock's formula (*"Accomplished [X] as measured by [Y] by doing [Z]"*).
4. **Explainable Job Matching**: Uses a transparent 4-criteria rubric:
   - **Core Skills Alignment**: 40%
   - **Experience Scope**: 30%
   - **Tools & Systems**: 15%
   - **Demonstrated Impact**: 15%
5. **Live Job Vacancies**: Queries the public Remotive remote jobs API for real verified vacancies, with explicit labeling (`[LIVE VERIFIED]` vs `[DEMO DATA — NOT LIVE VACANCIES]`).
6. **Dual Intelligence Engine**:
   - **Gemini Live AI**: Uses `gemini-2.5-flash` / `gemini-3.8-flash` with structured JSON schema validation via **Zod**.
   - **Deterministic ATS Baseline**: High-precision offline heuristic engine ensuring zero mock fakes when credentials are missing or offline.

---

## 2. Technology Stack

- **Framework**: Next.js 14 (App Router, Server Components & Route Handlers)
- **Language**: TypeScript (Strict typing, no `any` leaks)
- **Styling**: Tailwind CSS (Warm off-white `#F9F9F6`, deep forest green `#0C2016`, controlled lime accents `#A3E635`)
- **Typography**: Manrope & JetBrains Mono
- **Icons**: Lucide React
- **AI SDK**: Google Gen AI SDK (`@google/genai` v2.31.0 and `@google/generative-ai` v0.24.0)
- **Validation**: Zod 3.24
- **Document Extractors**: `pdf-parse` (binary PDF text extraction) & `mammoth` (DOCX extraction)
- **Storage**: Client-side localStorage persistence with memory-only server processing

---

## 3. Application Architecture & Pages

| Route | Page | Purpose |
|---|---|---|
| `/` | **Landing Page** | Editorial SaaS hero, 3 core capabilities, interactive 4-phase workflow visualizer, responsible AI manifesto. |
| `/dashboard` | **Career Dashboard** | Candidate profile status, overall fit gauge, skills taxonomy, career directions, 1-click sample profile loader. |
| `/analyzer` | **Resume Analyzer** | Drag-and-drop PDF/DOCX ingestion, target role configuration, real-time audit progress, Google XYZ rewrites, Work for FANG referral audit, printable PDF export. |
| `/templates` | **FAANG Templates Hub** | Curated 1-page FAANG templates (SWE, Staff, AI/ML, Fresher), Action-Result blueprints, and employee referral cold outreach scripts. |
| `/match` | **Job Match Analysis** | Two-column comparison of candidate resume against any pasted or selected job description, requirement audit, tailored 3-sentence summary pitch. |
| `/jobs` | **Verified Jobs** | Live vacancy feed from Remotive API, search & specialization filters, explainable compatibility breakdown, direct application URLs. |
| `/settings` | **AI Settings** | Model configuration, server-side diagnostic connection tester (`/api/ai/test`), zero-leak key security assurance. |

### API Route Endpoints
- `POST /api/resume/parse`: Accepts multipart PDF/DOCX/TXT and returns parsed taxonomy.
- `POST /api/ai/analyze-resume`: Generates structured Gemini / Deterministic ATS evaluation.
- `POST /api/ai/match-job`: Compares resume against job description with weighted criteria.
- `GET /api/jobs`: Fetches live verified remote vacancies with search & filters.
- `GET /api/ai/test`: Safe diagnostic testing server-side Gemini API connectivity without leaking secrets.

---

## 4. Getting Started

### Prerequisites
- Node.js `v18.18+` or higher (tested on Node v26)
- npm `v9+`

### Installation
```bash
npm install
```

### Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` to configure your Gemini API Key:
```env
# Google AI Studio API Key (Optional for offline deterministic baseline, Required for live AI)
GEMINI_API_KEY=your_gemini_api_key_here

# Primary Model Identifier
GEMINI_MODEL=gemini-2.5-flash

# Fallback Model
GEMINI_FALLBACK_MODEL=gemini-1.5-flash

# Live Job API
ENABLE_LIVE_JOB_API=true
```

> **Note on Model Support**: The engine defaults to `gemini-2.5-flash` or `gemini-1.5-flash`, and fully supports `gemini-3.8-flash` whenever the account has access. If a model ID is unavailable, the fallback cascade automatically resolves the nearest verified Gemini model.

### Running Locally
```bash
# Run Development Server
npm run dev

# Or Run Compiled Production Server
npm run build
npm run start
```
The application will be live at: **`http://localhost:3000`**

---

## 5. Running the Verification Test Suite

Pathwise includes an automated end-to-end test suite verifying all 5 core modules:
```bash
node test-e2e.mjs
```
Expected output:
```text
🚀 Running Pathwise E2E API Verification Suite...

1. Testing /api/ai/test...
   ✓ AI Diagnostic operational. Model: gemini-2.5-flash Connected: ...
2. Testing /api/jobs...
   ✓ Loaded 9 jobs. Live feed active: true.
3. Testing /api/resume/parse with pasted text...
   ✓ Parsed resume profile. Detected skills: Python, Docker, Kubernetes, PyTorch
4. Testing /api/ai/analyze-resume...
   ✓ Analysis complete. Overall score: 28%, ATS: 30%, Model: ...
5. Testing /api/ai/match-job...
   ✓ Job match complete. Fit Score: 93%, Matched requirements: 4

✨ All 5 Core API Modules Passed Verification with 100% Success!
```

---

## 6. Security, Privacy & Ethical Standard

- **Zero Client-Side Leaks**: `GEMINI_API_KEY` is exclusively accessed in server-side API routes (`runtime = 'nodejs'`). It is never passed to client components, HTML templates, or network responses.
- **In-Memory Buffering**: Uploaded PDF and DOCX files are converted to text in-memory and discarded. No files are saved to unvetted cloud storage.
- **Demographic Neutrality**: Evaluation algorithms explicitly ignore age, gender, ethnicity, postal addresses, and demographic proxies.
- **No Mock Hallucinations**: When the API key is not supplied, Pathwise transparently marks results as evaluated by the **Deterministic ATS Engine**, providing genuine mathematical evaluation rather than fabricating AI responses.
