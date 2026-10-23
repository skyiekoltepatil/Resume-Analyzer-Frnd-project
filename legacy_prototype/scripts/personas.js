/* ==========================================================================
   PERSONAS DATASET
   Pre-loaded realistic profiles for instant 1-click testing & demo
   ========================================================================== */

export const PERSONAS = {
  staff_ai: {
    id: 'staff_ai',
    name: 'Dr. Elena Rostova',
    role: 'Staff AI Systems Engineer',
    level: 'Staff / L6',
    experienceYears: 8,
    targetRole: 'Staff Machine Learning Systems Engineer',
    summary: 'Distributed ML systems architect with 8+ years scaling foundation model pre-training pipelines and inference serving on Kubernetes and Ray clusters across 4,000+ H100 GPUs.',
    email: 'elena.rostova@nexus-ai.dev',
    phone: '+1 (415) 890-4321',
    linkedin: 'linkedin.com/in/elena-rostova-ai',
    github: 'github.com/erostova',
    location: 'San Francisco, CA',
    education: 'Ph.D. in Computer Science (Distributed Systems) - Stanford University',
    skills: [
      'Python', 'C++', 'PyTorch', 'CUDA', 'Ray', 'Kubernetes', 'Triton Inference Server',
      'TensorRT-LLM', 'Distributed Training (FSDP / Megatron-LM)', 'vLLM', 'Kafka', 'Docker',
      'FastAPI', 'MLOps', 'Prometheus', 'Grafana', 'CI/CD', 'System Architecture'
    ],
    bullets: [
      'Architected distributed LLM inference cluster using vLLM and TensorRT-LLM on 512 H100 nodes, slashing P99 time-to-first-token by 54% from 420ms to 192ms.',
      'Engineered multi-node Megatron-LM training pipeline achieving 84% Model FLOPs Utilization (MFU), reducing pre-training cloud spend by $1.2M annually.',
      'Spearheaded transition from Ray 1.x to custom orchestrated scheduler on EKS, scaling cluster throughput to 85,000 requests/sec with 99.995% uptime.',
      'Mentored 12 senior engineers across infrastructure squads and established automated continuous benchmarking regression testing across all GPU clusters.'
    ],
    rawText: `Dr. Elena Rostova
San Francisco, CA | elena.rostova@nexus-ai.dev | +1 (415) 890-4321
LinkedIn: linkedin.com/in/elena-rostova-ai | GitHub: github.com/erostova

EXECUTIVE SUMMARY
Staff AI Systems Engineer with 8+ years designing high-throughput distributed training and inference platforms for frontier deep learning models. Led GPU cluster optimization across 4,000+ H100/A100 accelerators saving $1.2M+ in compute costs.

TECHNICAL SKILLS
Languages: Python, C++, Go, SQL, Bash
Frameworks & Libraries: PyTorch, CUDA, Ray, vLLM, TensorRT-LLM, Megatron-LM, HuggingFace, FastAPI
Infrastructure & Cloud: Kubernetes, Docker, AWS (EC2, S3, EKS), Triton Inference Server, Terraform, Kafka
MLOps & Observability: MLflow, Prometheus, Grafana, Weights & Biases, CI/CD

PROFESSIONAL EXPERIENCE
Staff ML Systems Engineer | HyperScale AI (2022 - Present)
• Architected distributed LLM inference cluster using vLLM and TensorRT-LLM on 512 H100 nodes, slashing P99 time-to-first-token by 54% from 420ms to 192ms.
• Engineered multi-node Megatron-LM training pipeline achieving 84% Model FLOPs Utilization (MFU), reducing pre-training cloud spend by $1.2M annually.
• Spearheaded transition from Ray to custom orchestrated scheduler on EKS, scaling cluster throughput to 85,000 requests/sec with 99.995% uptime.
• Mentored 12 senior engineers across infrastructure squads and established automated continuous benchmarking regression testing.

Senior Distributed Systems Engineer | CloudMatrix (2019 - 2022)
• Built real-time feature store processing 450M events daily with sub-5ms lookup latency using Redis and Kafka.
• Reduced model deployment cycle time from 14 days to 45 minutes by constructing an automated canary CI/CD pipeline.

EDUCATION
Ph.D. in Computer Science (Distributed Systems) — Stanford University (2015 - 2019)
B.S. in Computer Science — UC Berkeley (Summa Cum Laude)`
  },

  cloud_architect: {
    id: 'cloud_architect',
    name: 'Marcus Vance',
    role: 'Principal Cloud Solutions Architect',
    level: 'Principal / L7',
    experienceYears: 10,
    targetRole: 'Staff / Principal Enterprise Cloud Architect',
    summary: 'Cloud Solutions Architect specializing in multi-region zero-trust infrastructure, Terraform IaC, AWS/GCP migration, and SOC2 compliance for Fortune 500 financial institutions.',
    email: 'marcus.vance@cloudcraft.io',
    phone: '+1 (212) 555-0199',
    linkedin: 'linkedin.com/in/marcus-vance-cloud',
    github: 'github.com/mvance-cloud',
    location: 'New York, NY',
    education: 'M.S. Information Systems - Columbia University',
    skills: [
      'AWS', 'Google Cloud Platform (GCP)', 'Terraform', 'Kubernetes', 'Docker',
      'Go', 'Python', 'Microservices', 'Vault', 'Zero Trust', 'PostgreSQL',
      'Kafka', 'ArgoCD', 'Prometheus', 'Helm', 'FinOps', 'Disaster Recovery'
    ],
    bullets: [
      'Led zero-downtime multi-region cloud migration of core banking ledger handling $4.8B in annual transactions to AWS EKS and DynamoDB.',
      'Engineered automated Terraform modules reducing infrastructure provisioning time by 82% from 3 weeks to 4 hours.',
      'Instituted enterprise-wide FinOps governance policy that eliminated overprovisioned cloud resources, saving $850k in recurring cloud spend.',
      'Orchestrated automated disaster recovery failover drill across 3 geographical regions, achieving 4-minute RTO and zero data loss (RPO = 0).'
    ],
    rawText: `Marcus Vance
New York, NY | marcus.vance@cloudcraft.io | +1 (212) 555-0199
LinkedIn: linkedin.com/in/marcus-vance-cloud | GitHub: github.com/mvance-cloud

PROFESSIONAL SUMMARY
Principal Cloud Solutions Architect with 10+ years engineering resilient, SOC2 Type II compliant distributed systems across AWS and GCP. Proven track record migrating critical core banking workloads with zero downtime.

CORE COMPETENCIES
Cloud Platforms: AWS (EKS, IAM, DynamoDB, RDS, CloudFront), Google Cloud Platform (GCP)
Infrastructure as Code: Terraform, Terragrunt, Ansible, Pulumi, Helm
Containerization & Networking: Kubernetes, Docker, Envoy, Istio Service Mesh, Zero Trust Architecture
Programming: Go, Python, Bash, SQL

WORK EXPERIENCE
Principal Cloud Architect | FinTech Global Services (2021 - Present)
• Led zero-downtime multi-region cloud migration of core banking ledger handling $4.8B in annual transactions to AWS EKS and DynamoDB.
• Engineered automated Terraform modules reducing infrastructure provisioning time by 82% from 3 weeks to 4 hours.
• Instituted enterprise-wide FinOps governance policy that eliminated overprovisioned cloud resources, saving $850k in recurring cloud spend.
• Orchestrated automated disaster recovery failover drill across 3 geographical regions, achieving 4-minute RTO and zero data loss.

Senior DevOps & Infrastructure Engineer | Apex Systems (2017 - 2021)
• Standardized GitOps workflow utilizing ArgoCD and Helm across 45 production Kubernetes microservices.
• Implemented HashiCorp Vault secrets management, eliminating hardcoded credentials across 200+ repositories.

EDUCATION & CERTIFICATIONS
M.S. in Information Systems — Columbia University
AWS Certified Solutions Architect (Professional) | CKA (Certified Kubernetes Administrator)`
  },

  product_manager: {
    id: 'product_manager',
    name: 'Aaliyah Chen',
    role: 'Lead AI Product Manager',
    level: 'Lead / Director',
    experienceYears: 6,
    targetRole: 'Group Product Manager (AI & Enterprise)',
    summary: 'Product leader focused on B2B SaaS AI workflows, LLM agents, and revenue retention. Built products from $0 to $14M ARR with top quartile user NPS.',
    email: 'aaliyah.chen@productai.co',
    phone: '+1 (206) 431-7722',
    linkedin: 'linkedin.com/in/aaliyahchen-pm',
    github: '',
    location: 'Seattle, WA',
    education: 'MBA - Northwestern Kellogg | B.S. Cognitive Science - Brown',
    skills: [
      'Product Strategy', 'LLM Agent UX', 'A/B Testing', 'Product Analytics', 'Mixpanel',
      'User Research', 'SQL', 'Roadmapping', 'GTM Strategy', 'Figma', 'PRD Authoring',
      'Revenue Optimization', 'Enterprise SaaS', 'Agile'
    ],
    bullets: [
      'Spearheaded enterprise GenAI copilot from inception to $14M ARR in 14 months, driving 44% net expansion among Fortune 500 accounts.',
      'Designed self-serve onboarding flow that increased week-4 user retention from 28% to 61% across 120,000 monthly active users.',
      'Conducted 65+ qualitative enterprise customer interviews and synthesized telemetry data into a 3-quarter product roadmap executed by 24 engineers.',
      'Defined prompt evaluation and safety guardrail frameworks, decreasing hallucination escalation tickets by 76%.'
    ],
    rawText: `Aaliyah Chen
Seattle, WA | aaliyah.chen@productai.co | +1 (206) 431-7722
LinkedIn: linkedin.com/in/aaliyahchen-pm

PROFESSIONAL SUMMARY
Lead AI Product Manager with 6+ years driving product strategy for customer-facing AI agents and enterprise SaaS. Experienced in taking ambiguous machine learning technologies and turning them into intuitive, high-ARR enterprise products.

SKILLS & SPECIALTIES
Product Leadership: Product Strategy, Roadmapping, GTM Execution, Enterprise Customer Discovery, PRDs
Technical & Analytics: SQL, Mixpanel, Amplitude, A/B Experimentation, LLM Evaluation, Figma
Methodologies: Agile Scrum, User Journey Mapping, Jobs-to-be-Done (JTBD), OKRs

EXPERIENCE
Lead Product Manager, GenAI | Horizon Tech (2021 - Present)
• Spearheaded enterprise GenAI copilot from inception to $14M ARR in 14 months, driving 44% net expansion among Fortune 500 accounts.
• Designed self-serve onboarding flow that increased week-4 user retention from 28% to 61% across 120,000 monthly active users.
• Conducted 65+ qualitative enterprise customer interviews and synthesized telemetry data into a 3-quarter product roadmap executed by 24 engineers.
• Defined prompt evaluation and safety guardrail frameworks, decreasing hallucination escalation tickets by 76%.

Senior Product Manager | Omnichannel Labs (2018 - 2021)
• Launched personalized recommendations algorithm increasing average order value (AOV) by 18% across 4.2M transactions.
• Collaborated with engineering and design to overhaul checkout flow, cutting cart abandonment by 11%.

EDUCATION
MBA — Northwestern University, Kellogg School of Management
B.S. in Cognitive Science — Brown University`
  },

  junior_grad: {
    id: 'junior_grad',
    name: 'Devin Patel',
    role: 'Junior Software Engineer',
    level: 'Associate / New Grad',
    experienceYears: 1,
    targetRole: 'Junior Full-Stack / Backend Engineer',
    summary: 'Recent Computer Science graduate with hands-on experience building web applications in React and Node.js. Seeking entry-level software engineering role.',
    email: 'devin.patel@gmail.com',
    phone: '+91 98765 43210',
    linkedin: '',
    github: 'github.com/devin-codes',
    location: 'Bangalore, India',
    education: 'B.Tech in Computer Science - VTU',
    skills: [
      'JavaScript', 'React', 'Node.js', 'HTML', 'CSS', 'MongoDB', 'Git', 'Express'
    ],
    bullets: [
      'Helped develop frontend components using React and CSS for an internal dashboard.',
      'Worked on backend REST API endpoints using Express and MongoDB.',
      'Assisted team in fixing bugs and writing unit tests with Jest.',
      'Responsible for attending daily standups and updating Jira tickets.'
    ],
    rawText: `Devin Patel
Bangalore, India | devin.patel@gmail.com | +91 98765 43210
GitHub: github.com/devin-codes

CAREER OBJECTIVE
Aspiring software engineer looking for an entry-level developer role to utilize my coding skills and grow in a fast-paced environment.

SKILLS
Programming: JavaScript, C, Java
Web: HTML5, CSS3, React, Node.js, Express
Databases: MongoDB, MySQL
Tools: Git, VS Code, Postman

PROJECTS & INTERNSHIPS
Software Engineering Intern | WebCraft Solutions (6 months)
• Helped develop frontend components using React and CSS for an internal dashboard.
• Worked on backend REST API endpoints using Express and MongoDB.
• Assisted team in fixing bugs and writing unit tests with Jest.
• Responsible for attending daily standups and updating Jira tickets.

Campus Event Portal (College Capstone Project)
• Built an event management portal with React and Firebase.
• Created user registration forms and event calendar.

EDUCATION
B.Tech in Computer Science — VTU (Graduated 2024)
CGPA: 7.8/10`
  }
};
