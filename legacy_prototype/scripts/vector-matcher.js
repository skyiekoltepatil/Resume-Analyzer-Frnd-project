/* ==========================================================================
   TWO-TOWER VECTOR MATCHER & SKILLS TAXONOMY
   Implements semantic embeddings, cosine similarity, and skill gap taxonomy
   ========================================================================== */

export const SKILLS_TAXONOMY = {
  languages: [
    'Python', 'C++', 'Go', 'JavaScript', 'TypeScript', 'SQL', 'Rust', 'Java', 'Bash'
  ],
  frameworks: [
    'PyTorch', 'React', 'Node.js', 'FastAPI', 'Express', 'Next.js', 'JAX', 'HuggingFace', 'Django', 'Flask'
  ],
  cloud_devops: [
    'AWS', 'Google Cloud Platform (GCP)', 'Kubernetes', 'Docker', 'Terraform', 'Kafka',
    'ArgoCD', 'Prometheus', 'Grafana', 'Vault', 'CI/CD', 'Helm', 'Zero Trust'
  ],
  ai_systems: [
    'CUDA', 'Ray', 'vLLM', 'TensorRT-LLM', 'Triton Inference Server', 'Megatron-LM',
    'Distributed Training (FSDP / Megatron-LM)', 'MLOps', 'Weights & Biases', 'LLM Agent UX'
  ],
  databases: [
    'PostgreSQL', 'DynamoDB', 'MongoDB', 'Redis', 'MySQL', 'Vector DB (Qdrant/Pinecone)'
  ],
  architecture_product: [
    'System Architecture', 'Microservices', 'Disaster Recovery', 'Product Strategy',
    'A/B Testing', 'Product Analytics', 'User Research', 'Roadmapping', 'PRD Authoring', 'Agile'
  ]
};

// Semantic Synonym & Proximity Mapping (Concept Clusters)
const SYNONYM_CLUSTERS = [
  ['PostgreSQL', 'MySQL', 'Relational Databases', 'SQL', 'RDBMS'],
  ['FastAPI', 'Express', 'Django', 'Flask', 'REST API', 'RESTful API', 'Microservices'],
  ['vLLM', 'TensorRT-LLM', 'Triton Inference Server', 'Model Serving', 'Inference Optimization'],
  ['AWS', 'Google Cloud Platform (GCP)', 'Azure', 'Cloud Infrastructure'],
  ['Terraform', 'Terragrunt', 'Pulumi', 'Infrastructure as Code', 'IaC'],
  ['React', 'Next.js', 'Vue', 'Frontend Architecture'],
  ['Kubernetes', 'EKS', 'GKE', 'Container Orchestration', 'K8s'],
  ['Kafka', 'RabbitMQ', 'Event-Driven Architecture', 'Message Queue'],
  ['Prometheus', 'Grafana', 'Datadog', 'Observability', 'Telemetry'],
  ['Product Strategy', 'Roadmapping', 'Product Management', 'PRD Authoring']
];

// 12 Latent Dimension Keys for Two-Tower Embeddings
const LATENT_DIMENSIONS = [
  'ai_inference',
  'distributed_training',
  'cloud_infrastructure',
  'kubernetes_devops',
  'backend_microservices',
  'frontend_web',
  'database_systems',
  'system_architecture',
  'mlops_observability',
  'product_strategy',
  'data_experimentation',
  'security_governance'
];

/**
 * Maps a skill string to its normalized taxonomy representation
 */
export function normalizeSkill(skillName) {
  const clean = skillName.trim().toLowerCase();
  for (const [category, skillsList] of Object.entries(SKILLS_TAXONOMY)) {
    for (const validSkill of skillsList) {
      if (validSkill.toLowerCase() === clean) {
        return { name: validSkill, category };
      }
    }
  }
  return { name: skillName.trim(), category: 'other' };
}

/**
 * Checks if two skills are semantically adjacent in the concept graph
 */
export function areSkillsAdjacent(skillA, skillB) {
  if (skillA.toLowerCase() === skillB.toLowerCase()) return true;
  for (const cluster of SYNONYM_CLUSTERS) {
    const lowerCluster = cluster.map(s => s.toLowerCase());
    if (lowerCluster.includes(skillA.toLowerCase()) && lowerCluster.includes(skillB.toLowerCase())) {
      return true;
    }
  }
  return false;
}

/**
 * Computes a 12-dimensional latent embedding vector from a set of skills and experience
 */
export function generateLatentVector(skillsArray, experienceYears = 5) {
  const vector = new Array(LATENT_DIMENSIONS.length).fill(0.05);
  const normalized = skillsArray.map(s => s.toLowerCase());

  // AI & Inference
  if (normalized.some(s => s.includes('vllm') || s.includes('tensorrt') || s.includes('triton') || s.includes('cuda'))) {
    vector[0] += 0.85;
  }
  // Distributed Training
  if (normalized.some(s => s.includes('megatron') || s.includes('fsdp') || s.includes('ray') || s.includes('pytorch'))) {
    vector[1] += 0.88;
  }
  // Cloud Infrastructure
  if (normalized.some(s => s.includes('aws') || s.includes('gcp') || s.includes('terraform'))) {
    vector[2] += 0.82;
  }
  // Kubernetes & DevOps
  if (normalized.some(s => s.includes('kubernetes') || s.includes('docker') || s.includes('argocd') || s.includes('helm'))) {
    vector[3] += 0.84;
  }
  // Backend & Microservices
  if (normalized.some(s => s.includes('fastapi') || s.includes('node') || s.includes('express') || s.includes('go') || s.includes('python'))) {
    vector[4] += 0.80;
  }
  // Frontend Web
  if (normalized.some(s => s.includes('react') || s.includes('javascript') || s.includes('typescript') || s.includes('next.js') || s.includes('html'))) {
    vector[5] += 0.85;
  }
  // Database Systems
  if (normalized.some(s => s.includes('postgres') || s.includes('sql') || s.includes('mongodb') || s.includes('dynamodb') || s.includes('redis'))) {
    vector[6] += 0.78;
  }
  // System Architecture
  if (normalized.some(s => s.includes('system architecture') || s.includes('distributed') || s.includes('disaster recovery'))) {
    vector[7] += 0.90;
  }
  // MLOps & Observability
  if (normalized.some(s => s.includes('prometheus') || s.includes('grafana') || s.includes('mlops') || s.includes('weights & biases'))) {
    vector[8] += 0.75;
  }
  // Product Strategy
  if (normalized.some(s => s.includes('product strategy') || s.includes('roadmapping') || s.includes('prd') || s.includes('user research'))) {
    vector[9] += 0.92;
  }
  // Data Experimentation
  if (normalized.some(s => s.includes('a/b testing') || s.includes('analytics') || s.includes('mixpanel'))) {
    vector[10] += 0.80;
  }
  // Security & Governance
  if (normalized.some(s => s.includes('zero trust') || s.includes('vault') || s.includes('finops'))) {
    vector[11] += 0.76;
  }

  // Weight by seniority/experience factor
  const expWeight = Math.min(1.25, 0.7 + (experienceYears * 0.05));
  for (let i = 0; i < vector.length; i++) {
    vector[i] *= expWeight;
  }

  return normalizeVector(vector);
}

/**
 * Normalizes vector to unit Euclidean length
 */
function normalizeVector(vec) {
  let mag = 0;
  for (let val of vec) mag += val * val;
  mag = Math.sqrt(mag);
  if (mag === 0) return vec;
  return vec.map(v => v / mag);
}

/**
 * Computes Cosine Similarity between Candidate Vector and Job Vector
 */
export function computeCosineSimilarity(vecA, vecB) {
  if (vecA.length !== vecB.length) return 0;
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    magA += vecA[i] * vecA[i];
    magB += vecB[i] * vecB[i];
  }
  const denom = Math.sqrt(magA) * Math.sqrt(magB);
  if (denom === 0) return 0;
  return Math.min(1.0, Math.max(0.0, dot / denom));
}

/**
 * Evaluates candidate profile against a target job posting using Two-Tower algorithm
 */
export function evaluateJobMatch(candidateProfile, jobPosting) {
  const candidateVector = generateLatentVector(candidateProfile.skills, candidateProfile.experienceYears || 4);
  const allJobSkills = [...jobPosting.requiredSkills, ...jobPosting.preferredSkills];
  const jobVector = generateLatentVector(allJobSkills, jobPosting.experienceYears || 4);

  // Cosine Similarity base (0.0 to 1.0)
  const cosineSim = computeCosineSimilarity(candidateVector, jobVector);

  // Skill categorizations
  const matchedSkills = [];
  const adjacentSkills = [];
  const missingSkills = [];

  const candidateLower = candidateProfile.skills.map(s => s.toLowerCase());

  jobPosting.requiredSkills.forEach(reqSkill => {
    const isExact = candidateLower.includes(reqSkill.toLowerCase());
    if (isExact) {
      matchedSkills.push(reqSkill);
    } else {
      // Check if candidate has an adjacent transferable skill
      const foundAdjacent = candidateProfile.skills.find(candSkill => areSkillsAdjacent(candSkill, reqSkill));
      if (foundAdjacent) {
        adjacentSkills.push({ required: reqSkill, candidateHas: foundAdjacent });
      } else {
        missingSkills.push(reqSkill);
      }
    }
  });

  // Calculate final weighted score
  const requiredCount = jobPosting.requiredSkills.length;
  const exactRatio = matchedSkills.length / (requiredCount || 1);
  const adjacentRatio = adjacentSkills.length / (requiredCount || 1);

  // Score formula: 50% Cosine Vector Sim + 35% Exact Skill Ratio + 15% Adjacent Transfer Ratio
  let finalScore = Math.round((cosineSim * 50) + (exactRatio * 35) + (adjacentRatio * 15));
  finalScore = Math.min(99, Math.max(35, finalScore));

  return {
    jobId: jobPosting.id,
    jobRole: jobPosting.role,
    company: jobPosting.company,
    overallScore: finalScore,
    cosineSimilarity: Math.round(cosineSim * 100),
    matchedSkills,
    adjacentSkills,
    missingSkills,
    domain: jobPosting.domain,
    tier: jobPosting.tier,
    salary: jobPosting.salary,
    location: jobPosting.location
  };
}
