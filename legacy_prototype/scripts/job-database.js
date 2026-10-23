/* ==========================================================================
   JOB DATABASE (Two-Tower Job Postings with Vector Taxonomies)
   Realistic premier tech listings with salary, tier, and required skills
   ========================================================================== */

export const JOB_POSTINGS = [
  {
    id: 'job-openai-01',
    company: 'OpenAI',
    role: 'Staff ML Infrastructure Engineer (Inference)',
    location: 'San Francisco, CA (Hybrid)',
    type: 'Full-time',
    salary: '$285,000 - $395,000 + Equity',
    tier: 'Staff / L6',
    domain: 'AI/ML Infrastructure',
    summary: 'Build high-throughput, sub-second inference serving engines powering ChatGPT and API endpoints across tens of thousands of GPUs.',
    requiredSkills: [
      'Python', 'C++', 'PyTorch', 'CUDA', 'Triton Inference Server', 'vLLM',
      'TensorRT-LLM', 'Kubernetes', 'Ray', 'Distributed Systems', 'Docker'
    ],
    preferredSkills: [
      'Megatron-LM', 'Kafka', 'Prometheus', 'Grafana', 'CI/CD', 'Zero-downtime Deployments'
    ],
    experienceYears: 6
  },
  {
    id: 'job-google-01',
    company: 'Google DeepMind',
    role: 'Senior Research Infrastructure Engineer',
    location: 'Mountain View, CA / Hybrid',
    type: 'Full-time',
    salary: '$240,000 - $330,000 + Equity + Bonus',
    tier: 'Senior / L5',
    domain: 'AI/ML Systems',
    summary: 'Develop automated distributed training frameworks and TPU/GPU orchestration clusters for next-generation Gemini multimodal models.',
    requiredSkills: [
      'Python', 'C++', 'PyTorch', 'Distributed Training (FSDP / Megatron-LM)',
      'Kubernetes', 'Ray', 'CUDA', 'System Architecture', 'CI/CD'
    ],
    preferredSkills: [
      'JAX', 'MLOps', 'Docker', 'FastAPI', 'Prometheus'
    ],
    experienceYears: 5
  },
  {
    id: 'job-stripe-01',
    company: 'Stripe',
    role: 'Staff Infrastructure & Cloud Platform Engineer',
    location: 'San Francisco, CA / Seattle, WA',
    type: 'Full-time',
    salary: '$255,000 - $350,000 + Equity',
    tier: 'Staff / L6',
    domain: 'Cloud & FinTech Infrastructure',
    summary: 'Design global multi-region cloud primitives, zero-trust network boundaries, and automated disaster recovery for payment ledgers processing hundreds of billions of dollars.',
    requiredSkills: [
      'AWS', 'Terraform', 'Kubernetes', 'Go', 'Docker', 'Zero Trust',
      'Microservices', 'Kafka', 'System Architecture', 'Disaster Recovery'
    ],
    preferredSkills: [
      'Vault', 'ArgoCD', 'PostgreSQL', 'Prometheus', 'FinOps', 'Python'
    ],
    experienceYears: 7
  },
  {
    id: 'job-anthropic-01',
    company: 'Anthropic',
    role: 'Platform & Alignment Systems Engineer',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$260,000 - $360,000 + Equity',
    tier: 'Senior / Staff',
    domain: 'AI Systems',
    summary: 'Build high-performance evaluation clusters and distributed RLHF infrastructure to ensure safety, robustness, and alignment of Claude models.',
    requiredSkills: [
      'Python', 'PyTorch', 'Ray', 'Kubernetes', 'Docker', 'FastAPI',
      'Distributed Systems', 'MLOps', 'Prometheus'
    ],
    preferredSkills: [
      'C++', 'CUDA', 'vLLM', 'Grafana', 'Weights & Biases'
    ],
    experienceYears: 4
  },
  {
    id: 'job-databricks-01',
    company: 'Databricks',
    role: 'Principal Lakehouse Platform Architect',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    salary: '$270,000 - $370,000 + Equity',
    tier: 'Principal / L7',
    domain: 'Data & Cloud Infrastructure',
    summary: 'Lead architectural vision for hyperscale lakehouse storage and unified analytics engine across multi-cloud environments.',
    requiredSkills: [
      'AWS', 'Google Cloud Platform (GCP)', 'Kubernetes', 'Go', 'Python',
      'Terraform', 'Kafka', 'PostgreSQL', 'Disaster Recovery', 'System Architecture'
    ],
    preferredSkills: [
      'FinOps', 'Vault', 'ArgoCD', 'Docker', 'Prometheus'
    ],
    experienceYears: 8
  },
  {
    id: 'job-meta-01',
    company: 'Meta',
    role: 'Senior Product Manager - Enterprise AI Agents',
    location: 'Menlo Park, CA / Remote',
    type: 'Full-time',
    salary: '$210,000 - $295,000 + Equity + Bonus',
    tier: 'Senior / L5',
    domain: 'AI Product Management',
    summary: 'Drive end-to-end product roadmap for enterprise workplace AI agents, conversational copilots, and workplace collaboration tools.',
    requiredSkills: [
      'Product Strategy', 'LLM Agent UX', 'A/B Testing', 'Product Analytics',
      'User Research', 'SQL', 'Roadmapping', 'PRD Authoring', 'Agile'
    ],
    preferredSkills: [
      'GTM Strategy', 'Mixpanel', 'Figma', 'Revenue Optimization', 'Enterprise SaaS'
    ],
    experienceYears: 5
  },
  {
    id: 'job-netflix-01',
    company: 'Netflix',
    role: 'Senior Full-Stack & UI Platform Engineer',
    location: 'Los Gatos, CA / Hybrid',
    type: 'Full-time',
    salary: '$260,000 - $360,000 All-Cash / Equity Flex',
    tier: 'Senior / L5',
    domain: 'Frontend & Platform',
    summary: 'Engineer the high-performance media creation and partner studio web applications powering global content production.',
    requiredSkills: [
      'JavaScript', 'TypeScript', 'React', 'Node.js', 'REST API',
      'CSS', 'HTML', 'Git', 'CI/CD'
    ],
    preferredSkills: [
      'Docker', 'GraphQL', 'Next.js', 'Microservices', 'Jest'
    ],
    experienceYears: 4
  },
  {
    id: 'job-uber-01',
    company: 'Uber',
    role: 'Software Engineer II (Full-Stack & Backend)',
    location: 'Bangalore, India / Sunnyvale, CA',
    type: 'Full-time',
    salary: '$140,000 - $190,000 / ₹35L - ₹55L',
    tier: 'L3 / L4',
    domain: 'Marketplace & Web Apps',
    summary: 'Build responsive web tools and reliable microservice APIs for driver onboarding, document validation, and safety telemetry.',
    requiredSkills: [
      'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB',
      'SQL', 'Git', 'REST API'
    ],
    preferredSkills: [
      'Docker', 'TypeScript', 'Jest', 'CI/CD', 'Microservices'
    ],
    experienceYears: 1
  }
];
