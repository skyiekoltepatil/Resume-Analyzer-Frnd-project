export interface ResumeTemplate {
  id: string;
  name: string;
  targetRole: string;
  experienceLevel: string;
  category: 'Single-Column 100% ATS' | 'Two-Column Modern (Canva / Zety)' | 'Corporate Consulting (Deloitte / Big 4)' | "Reddit 'Sheets' Standard" | 'Creative & Product' | 'Students & Freshers';
  layoutType: 'single_column' | 'two_column' | 'corporate_header';
  atsScore: number;
  visualScore: number;
  inspiredBy: string;
  description: string;
  tags: string[];
  recommendedFor: string;
  sidebarContent?: {
    phone: string;
    email: string;
    location: string;
    links: { label: string; url: string }[];
    skills: string[];
    languages: string[];
    certifications: string[];
  };
  mainContent?: {
    name: string;
    title: string;
    summary: string;
    experience: { role: string; company: string; location: string; period: string; bullets: string[] }[];
    projects?: { name: string; tech: string; bullets: string[] }[];
    education: { degree: string; school: string; year: string; details?: string }[];
  };
  rawText: string;
  latexSnippet?: string;
}

export const FANG_TEMPLATES: ResumeTemplate[] = [
  // --------------------------------------------------------------------------
  // 1. Two-Column Modern Executive (Canva / Zety / Google Images Inspiration: Richard Sanchez & Ahmdd Saah)
  // --------------------------------------------------------------------------
  {
    id: 'canva-two-column-executive',
    name: 'Modern Two-Column Executive (Canva / Zety Style)',
    targetRole: 'Senior Full Stack / Platform Engineer',
    experienceLevel: 'Mid to Senior (4-8 Years)',
    category: 'Two-Column Modern (Canva / Zety)',
    layoutType: 'two_column',
    atsScore: 88,
    visualScore: 98,
    inspiredBy: 'Canva & Zety Executive Layouts (Richard Sanchez / Ahmdd Saah / Nick Koe)',
    description: 'The elegant two-column layout with a left sidebar for skills, contact info, and certifications, paired with a high-impact experience timeline. Extremely popular on Canva and Zety for direct recruiter outreach and hiring manager emails.',
    tags: ['Two-Column', 'Canva / Zety Style', 'Sidebar Taxonomy', 'Visual Impact', 'Recruiter Favorite'],
    recommendedFor: 'Networking on LinkedIn, direct email submissions to hiring managers, and portfolio-driven applications where visual punch creates instant rapport.',
    sidebarContent: {
      phone: '+1 (415) 555-0192',
      email: 'richard.sanchez@example.com',
      location: 'San Francisco, CA',
      links: [
        { label: 'linkedin.com/in/richardsanchez-tech', url: 'https://linkedin.com' },
        { label: 'github.com/richards-code', url: 'https://github.com' }
      ],
      skills: ['TypeScript', 'React / Next.js', 'Python / FastAPI', 'PostgreSQL', 'Docker', 'AWS Cloud', 'GraphQL', 'Tailwind CSS', 'Redis', 'CI/CD Pipelines'],
      languages: ['English (Native)', 'Spanish (Bilingual)'],
      certifications: ['AWS Certified Solutions Architect', 'Docker Certified Associate (DCA)']
    },
    mainContent: {
      name: 'RICHARD SANCHEZ',
      title: 'Senior Software Engineer | Cloud Platforms',
      summary: 'Results-driven Senior Software Engineer with 6+ years of experience engineering high-concurrency microservices and modern web platforms. Proven track record reducing API latency by 42%, architecting resilient cloud systems on AWS, and mentoring engineering teams.',
      experience: [
        {
          role: 'Senior Software Engineer, Core Platforms',
          company: 'CloudScale Technologies',
          location: 'San Francisco, CA',
          period: '2023 – Present',
          bullets: [
            'Architected distributed event ingestion pipelines using Python, FastAPI, and PostgreSQL, processing 18,000 telemetry events per second with zero message loss.',
            'Engineered Next.js customer analytics portal with server-side caching, cutting initial page load time from 3.2s to 640ms for 35,000 daily active users.',
            'Spearheaded automated CI/CD pipeline modernization using GitHub Actions and Docker, reducing build-to-deploy cycles by 65% with zero deployment downtime.',
            'Mentored 4 junior engineers on distributed systems best practices, clean code conventions, and rigorous test-driven development.'
          ]
        },
        {
          role: 'Software Engineer',
          company: 'Nexus Digital Systems',
          location: 'San Jose, CA',
          period: '2020 – 2023',
          bullets: [
            'Built multi-tenant REST APIs in TypeScript and Node.js serving 4.5M monthly requests with 99.98% operational uptime.',
            'Optimized relational database queries across 250M rows in PostgreSQL, eliminating query timeouts during seasonal traffic spikes.',
            'Designed and launched role-based access control (RBAC) microservice adhering to SOC2 and GDPR compliance standards.'
          ]
        }
      ],
      projects: [
        {
          name: 'Distributed Task Queue (Open Source)',
          tech: 'Go, Redis, Docker',
          bullets: [
            'Developed asynchronous job orchestrator with priority workers capable of scheduling 40,000 concurrent jobs with sub-10ms dispatch latency.'
          ]
        }
      ],
      education: [
        {
          degree: 'B.S. in Computer Science',
          school: 'University of California, Davis',
          year: '2016 – 2020',
          details: 'GPA: 3.84 / 4.00 • Magna Cum Laude'
        }
      ]
    },
    rawText: `RICHARD SANCHEZ
San Francisco, CA | (415) 555-0192 | richard.sanchez@example.com | linkedin.com/in/richardsanchez-tech | github.com/richards-code

PROFESSIONAL SUMMARY
Results-driven Senior Software Engineer with 6+ years of experience engineering high-concurrency microservices and modern web platforms. Proven track record reducing API latency by 42%, architecting resilient cloud systems on AWS, and mentoring engineering teams. Specialized in TypeScript, React, Next.js, Python, PostgreSQL, and Docker.

WORK EXPERIENCE
CLOUDSCALE TECHNOLOGIES — San Francisco, CA
Senior Software Engineer, Core Platforms | 2023 – Present
• Architected distributed event ingestion pipelines using Python, FastAPI, and PostgreSQL, processing 18,000 telemetry events per second with zero message loss.
• Engineered Next.js customer analytics portal with server-side caching, cutting initial page load time from 3.2s to 640ms for 35,000 daily active users.
• Spearheaded automated CI/CD pipeline modernization using GitHub Actions and Docker, reducing build-to-deploy cycles by 65% with zero deployment downtime.
• Mentored 4 junior engineers on distributed systems best practices, clean code conventions, and rigorous test-driven development.

NEXUS DIGITAL SYSTEMS — San Jose, CA
Software Engineer | 2020 – 2023
• Built multi-tenant REST APIs in TypeScript and Node.js serving 4.5M monthly requests with 99.98% operational uptime.
• Optimized relational database queries across 250M rows in PostgreSQL, eliminating query timeouts during seasonal traffic spikes.
• Designed and launched role-based access control (RBAC) microservice adhering to SOC2 and GDPR compliance standards.
• Authored comprehensive Jest integration test suite increasing code coverage from 55% to 89%.

KEY PROJECTS
Distributed Task Queue (Open Source) | github.com/richards-code/task-queue
• Developed asynchronous job orchestrator with priority workers capable of scheduling 40,000 concurrent jobs with sub-10ms dispatch latency in Go and Redis.

TECHNICAL SKILLS & COMPETENCIES
• Languages: TypeScript, JavaScript, Python, Go, SQL, HTML5/CSS3
• Frameworks & Web: React, Next.js, Node.js, Express, FastAPI, Tailwind CSS
• Cloud & DevOps: AWS (EC2, S3, RDS), Docker, GitHub Actions, CI/CD, Linux
• Databases: PostgreSQL, Redis, MongoDB

EDUCATION
UNIVERSITY OF CALIFORNIA, DAVIS — B.S. in Computer Science | 2016 – 2020 | GPA: 3.84`
  },

  // --------------------------------------------------------------------------
  // 2. Reddit Famous 'Sheets' Resume Standard (r/EngineeringResumes)
  // --------------------------------------------------------------------------
  {
    id: 'reddit-sheets-swe',
    name: "Reddit-Famous 'Sheets' Resume Standard",
    targetRole: 'Software Engineer (Generalist / Backend)',
    experienceLevel: 'Mid Level (2-6 Years)',
    category: "Reddit 'Sheets' Standard",
    layoutType: 'single_column',
    atsScore: 99,
    visualScore: 93,
    inspiredBy: "Reddit r/EngineeringResumes Community ('Sheets' Resume Builder)",
    description: "The widely praised single-column layout created by Reddit's r/EngineeringResumes community. Strict horizontal dividers, zero graphics, hyper-dense bullet points with zero wasted whitespace. Known as the highest-converting format for automated ATS systems.",
    tags: ['Reddit Famous', 'r/EngineeringResumes', '100% ATS Safe', 'Zero Graphics', 'Dense Bullets'],
    recommendedFor: 'Submitting cold applications to tech giants (Google, Meta, Amazon, Microsoft) and companies utilizing Greenhouse, Lever, Workday, or Taleo.',
    mainContent: {
      name: 'JOBBY McJOBFACE',
      title: 'Software Engineer',
      summary: 'Software Engineer with 4 years of industry experience specializing in scalable backend services, distributed data processing, and cloud deployment pipelines. Strong background in Python, Java, SQL, and Docker containerization.',
      experience: [
        {
          role: 'Software Engineer II',
          company: 'Acme Cloud Solutions',
          location: 'New York, NY',
          period: 'July 2022 – Present',
          bullets: [
            'Engineered automated reconciliation service in Python and PostgreSQL processing $12M in daily vendor invoices, eliminating 99.4% of manual accounting discrepancies.',
            'Refactored legacy monolith into 4 modular microservices deployed on Docker and AWS ECS, improving p95 response time by 38% across 1.8M daily API calls.',
            'Constructed automated synthetic monitoring probes with Datadog alerting, identifying memory leaks before reaching production and maintaining 99.99% uptime.'
          ]
        },
        {
          role: 'Associate Software Engineer',
          company: 'Metropolis Data Systems',
          location: 'Boston, MA',
          period: 'June 2020 – June 2022',
          bullets: [
            'Developed high-throughput data validation pipeline in Java and Apache Kafka handling 25,000 messages/sec with sub-5ms serialization latency.',
            'Authored SQL migration scripts and materialized views for PostgreSQL database containing 80M records, reducing analytical query duration from 45s to 1.8s.',
            'Collaborated with product designers to implement customer-facing React components with TypeScript, improving user accessibility scores to WCAG 2.1 AA.'
          ]
        }
      ],
      projects: [
        {
          name: 'Distributed Key-Value Store',
          tech: 'Go, Raft Consensus, gRPC',
          bullets: [
            'Implemented a fault-tolerant key-value store implementing Raft consensus protocol, surviving node partitions with zero data inconsistency during chaos simulations.'
          ]
        }
      ],
      education: [
        {
          degree: 'B.S. in Computer Science',
          school: 'State University',
          year: 'Graduated May 2020',
          details: 'Dean’s Honor List • Minor in Mathematics'
        }
      ]
    },
    rawText: `JOBBY McJOBFACE
New York, NY | (212) 555-0182 | jobby.mcjobface@email.com | linkedin.com/in/jobby-mcjobface | github.com/jobby-code

EDUCATION
State University — B.S. in Computer Science | Graduated May 2020
• Dean’s Honor List (All Semesters) • Minor in Applied Mathematics
• Relevant Coursework: Data Structures, Algorithms, Distributed Systems, Operating Systems, Database Systems

TECHNICAL SKILLS
• Languages: Python, Java, Go, TypeScript, JavaScript, SQL, C++
• Frameworks: Spring Boot, FastAPI, Node.js, React, Express, JUnit, PyTest
• Developer Tools & Cloud: AWS (ECS, RDS, S3), Docker, Git, Linux, GitHub Actions, Kafka, Datadog
• Databases: PostgreSQL, MySQL, Redis, MongoDB

EXPERIENCE
ACME CLOUD SOLUTIONS — New York, NY
Software Engineer II | July 2022 – Present
• Engineered automated reconciliation service in Python and PostgreSQL processing $12M in daily vendor invoices, eliminating 99.4% of manual accounting discrepancies.
• Refactored legacy monolith into 4 modular microservices deployed on Docker and AWS ECS, improving p95 response time by 38% across 1.8M daily API calls.
• Constructed automated synthetic monitoring probes with Datadog alerting, identifying memory leaks before reaching production and maintaining 99.99% uptime.
• Partnered with security team to remediate 28 SonarQube vulnerability findings, ensuring full SOC2 Type II audit certification.

METROPOLIS DATA SYSTEMS — Boston, MA
Associate Software Engineer | June 2020 – June 2022
• Developed high-throughput data validation pipeline in Java and Apache Kafka handling 25,000 messages/sec with sub-5ms serialization latency.
• Authored SQL migration scripts and materialized views for PostgreSQL database containing 80M records, reducing analytical query duration from 45s to 1.8s.
• Collaborated with product designers to implement customer-facing React components with TypeScript, improving user accessibility scores to WCAG 2.1 AA.
• Reduced continuous integration build duration from 22 minutes to 6 minutes by parallelizing test runners in Jenkins.

PROJECTS
Distributed Key-Value Store | Go, Raft, gRPC | github.com/jobby-code/distributed-kv
• Implemented a fault-tolerant key-value store implementing Raft consensus protocol, surviving node partitions with zero data inconsistency during chaos simulations.
• Benchmarked cluster throughput using custom load harness, achieving 14,000 writes/sec across 5 replicated nodes.`
  },

  // --------------------------------------------------------------------------
  // 3. Deloitte & Big 4 Corporate / Management Consulting (Marcus Halloran / Jessica Lewis style)
  // --------------------------------------------------------------------------
  {
    id: 'deloitte-corporate-consulting',
    name: 'Deloitte & Big 4 Technology Consulting Template',
    targetRole: 'Technology Consultant / Business & Cloud Architect',
    experienceLevel: 'Consultant to Senior Consultant (3-8 Years)',
    category: 'Corporate Consulting (Deloitte / Big 4)',
    layoutType: 'corporate_header',
    atsScore: 97,
    visualScore: 96,
    inspiredBy: 'Deloitte, PwC, Accenture & McKinsey Tech Advisory Standards (Marcus Halloran / Jessica Lewis)',
    description: 'Designed explicitly for technology consulting, enterprise systems integration (SAP, Salesforce, AWS, Oracle), and business transformation roles at Deloitte, Accenture, PwC, and EY. Emphasizes client deliverables, millions in financial ROI, and C-suite stakeholder alignment.',
    tags: ['Deloitte Standard', 'Big 4 Advisory', 'Financial ROI', 'Enterprise Cloud', 'Stakeholder Leadership'],
    recommendedFor: 'Consultants, Business Analysts, Solutions Architects, and Program Managers applying to Deloitte, Accenture, PwC, EY, KPMG, or Capgemini.',
    sidebarContent: {
      phone: '+1 (312) 555-0149',
      email: 'marcus.halloran@example.com',
      location: 'Chicago, IL',
      links: [
        { label: 'linkedin.com/in/marcushalloran-advisory', url: 'https://linkedin.com' }
      ],
      skills: ['Technology Strategy', 'Enterprise Cloud (AWS/Azure)', 'SAP S/4HANA Migration', 'Agile & Scrum Delivery', 'Business Process Optimization', 'Data Analytics (SQL/Tableau)', 'Executive Stakeholder Management', 'Risk & Compliance (SOX)'],
      languages: ['English (Native)', 'French (Professional)'],
      certifications: ['PMP (Project Management Professional)', 'AWS Certified Solutions Architect', 'Certified ScrumMaster (CSM)']
    },
    mainContent: {
      name: 'MARCUS HALLORAN',
      title: 'Senior Technology Consultant | Enterprise Transformation',
      summary: 'Dynamic Technology Consultant with 5+ years of experience leading cross-functional digital transformations, cloud migrations, and enterprise systems integration for Fortune 500 clients. Proven track record managing $4.2M engagement budgets, reducing client operational costs by $1.8M, and delivering C-level technology roadmaps.',
      experience: [
        {
          role: 'Technology Advisory Senior Consultant',
          company: 'Deloitte Consulting LLP',
          location: 'Chicago, IL',
          period: '2022 – Present',
          bullets: [
            'Led cloud migration readiness assessment for a Fortune 100 Financial Services client, evaluating 140 enterprise applications and delivering a 3-year modernization roadmap generating $2.4M in projected annual OPEX savings.',
            'Managed a blended onshore/offshore delivery team of 14 engineers and business analysts across a $3.8M SAP S/4HANA implementation, completing milestone deliverables 3 weeks ahead of schedule.',
            'Presented bi-weekly executive steering committee presentations to client CIO and VP stakeholders, resolving critical scope roadblocks with 100% sponsor sign-off.',
            'Standardized Agile delivery governance across 6 client workstreams, cutting sprint cycle cycle time by 28% and eliminating backlog bottlenecks.'
          ]
        },
        {
          role: 'Technology Analyst',
          company: 'Accenture Strategy & Consulting',
          location: 'Minneapolis, MN',
          period: '2020 – 2022',
          bullets: [
            'Conducted financial data model optimization for a Tier-1 retail bank utilizing SQL and Tableau, identifying $850K in recurring operational redundancies across branch operations.',
            'Designed enterprise business process flows (BPMN) for a CRM modernization program spanning 12,000 active service agents.',
            'Facilitated 25+ client discovery workshops to document functional requirements, architecture blueprints, and change management strategies.'
          ]
        }
      ],
      education: [
        {
          degree: 'B.B.A. in Management Information Systems & Finance',
          school: 'University of Notre Dame — Mendoza College of Business',
          year: '2016 – 2020',
          details: 'GPA: 3.88 / 4.00 • Beta Gamma Sigma Honor Society'
        }
      ]
    },
    rawText: `MARCUS HALLORAN
Chicago, IL | (312) 555-0149 | marcus.halloran@example.com | linkedin.com/in/marcushalloran-advisory

PROFESSIONAL SUMMARY
Dynamic Technology Consultant with 5+ years of experience leading cross-functional digital transformations, cloud migrations, and enterprise systems integration for Fortune 500 clients. Proven track record managing $4.2M engagement budgets, reducing client operational costs by $1.8M, and delivering C-level technology roadmaps across financial services and healthcare sectors.

WORK EXPERIENCE
DELOITTE CONSULTING LLP — Chicago, IL
Senior Technology Consultant, Cloud & Systems Strategy | 2022 – Present
• Led cloud migration readiness assessment for a Fortune 100 Financial Services client, evaluating 140 enterprise applications and delivering a 3-year modernization roadmap generating $2.4M in projected annual OPEX savings.
• Managed a blended onshore/offshore delivery team of 14 engineers and business analysts across a $3.8M SAP S/4HANA implementation, completing milestone deliverables 3 weeks ahead of schedule.
• Presented bi-weekly executive steering committee presentations to client CIO and VP stakeholders, resolving critical scope roadblocks with 100% sponsor sign-off.
• Standardized Agile delivery governance across 6 client workstreams, cutting sprint cycle cycle time by 28% and eliminating backlog bottlenecks.
• Co-authored internal Deloitte whitepaper on Generative AI enterprise governance, recognized with Firmwide Innovation Award.

ACCENTURE STRATEGY & CONSULTING — Minneapolis, MN
Technology Analyst, Enterprise Operations | 2020 – 2022
• Conducted financial data model optimization for a Tier-1 retail bank utilizing SQL and Tableau, identifying $850K in recurring operational redundancies across branch operations.
• Designed enterprise business process flows (BPMN) for a CRM modernization program spanning 12,000 active service agents.
• Facilitated 25+ client discovery workshops to document functional requirements, architecture blueprints, and change management strategies.
• Developed automated data reconciliation scripts reducing month-end audit close cycle from 5 days to 6 hours.

CORE COMPETENCIES & EXPERTISE
• Advisory & Strategy: IT Roadmap Design, Digital Transformation, Cloud Strategy, Business Process Reengineering (BPMN), Change Management
• Technical & Enterprise: AWS Cloud, Azure, SAP S/4HANA, Salesforce, SQL, Tableau, Python, JIRA, Confluence
• Frameworks & Certifications: Project Management Professional (PMP), AWS Certified Solutions Architect, Certified ScrumMaster (CSM)

EDUCATION
UNIVERSITY OF NOTRE DAME — Mendoza College of Business
B.B.A. in Management Information Systems & Finance | 2016 – 2020 | GPA: 3.88 / 4.00`
  },

  // --------------------------------------------------------------------------
  // 4. Classic Sebastian Bennett / Simple Resume Template (Google Images Inspiration)
  // --------------------------------------------------------------------------
  {
    id: 'classic-sebastian-clean',
    name: 'Sebastian Bennett Classic Minimalist (1-Column)',
    targetRole: 'Software Engineer / Technical Analyst',
    experienceLevel: 'Entry to Mid Level (1-4 Years)',
    category: 'Single-Column 100% ATS',
    layoutType: 'single_column',
    atsScore: 100,
    visualScore: 91,
    inspiredBy: "Google Images 'Sebastian Bennett' & 'Simple Resume Template' Clean Design",
    description: 'The timeless, hyper-clean minimalist resume layout. Zero visual distractions, pure typography, clear horizontal separators, and 100% ATS readability. The gold standard for applicant parsing algorithms across all corporate sectors.',
    tags: ['Sebastian Bennett Style', '100% ATS Parseable', 'Clean Typography', 'Universal Compatible'],
    recommendedFor: 'Job seekers applying across enterprise job boards, government portals, and companies with strict legacy parsers.',
    mainContent: {
      name: 'SEBASTIAN BENNETT',
      title: 'Full Stack Software Engineer',
      summary: 'Passionate and detail-oriented Software Engineer with 3+ years of experience developing robust web applications, RESTful microservices, and database solutions. Proven proficiency across JavaScript, TypeScript, React, Node.js, and SQL.',
      experience: [
        {
          role: 'Software Engineer',
          company: 'Horizon Web Systems',
          location: 'Austin, TX',
          period: '2022 – Present',
          bullets: [
            'Engineered full-stack customer portal using React, TypeScript, and Node.js serving 120,000 monthly active users.',
            'Integrated Stripe payment gateway and webhook reconciliation, processing $4.5M in annual transactions with 99.9% uptime.',
            'Improved database query speeds by 35% through SQL index optimization and Redis caching layer implementation.'
          ]
        },
        {
          role: 'Junior Web Developer',
          company: 'Apex Media Interactive',
          location: 'Dallas, TX',
          period: '2021 – 2022',
          bullets: [
            'Developed responsive web interfaces using modern CSS3, HTML5, and React, increasing mobile user engagement by 24%.',
            'Collaborated with senior engineers to implement automated unit tests with Jest, reducing production defect reports by 30%.'
          ]
        }
      ],
      education: [
        {
          degree: 'B.S. in Computer Science',
          school: 'University of Texas at Dallas',
          year: '2017 – 2021',
          details: 'GPA: 3.75 / 4.00'
        }
      ]
    },
    rawText: `SEBASTIAN BENNETT
Austin, TX | (512) 555-0199 | sebastian.bennett@example.com | linkedin.com/in/sebastianbennett-dev

PROFESSIONAL SUMMARY
Detail-oriented Software Engineer with 3+ years of experience developing robust web applications, RESTful microservices, and database solutions. Proven proficiency across JavaScript, TypeScript, React, Node.js, and SQL. Committed to writing clean, maintainable code and delivering scalable software on schedule.

WORK EXPERIENCE
HORIZON WEB SYSTEMS — Austin, TX
Software Engineer | 2022 – Present
• Engineered full-stack customer portal using React, TypeScript, and Node.js serving 120,000 monthly active users.
• Integrated Stripe payment gateway and webhook reconciliation, processing $4.5M in annual transactions with 99.9% uptime.
• Improved database query speeds by 35% through SQL index optimization and Redis caching layer implementation.
• Collaborated in cross-functional Agile team to deliver bi-weekly production releases with zero critical regressions.

APEX MEDIA INTERACTIVE — Dallas, TX
Junior Web Developer | 2021 – 2022
• Developed responsive web interfaces using modern CSS3, HTML5, and React, increasing mobile user engagement by 24%.
• Collaborated with senior engineers to implement automated unit tests with Jest, reducing production defect reports by 30%.
• Built internal content management dashboard using Express and PostgreSQL, saving marketing team 8 hours per week in manual updates.

TECHNICAL SKILLS
• Programming: JavaScript (ES6+), TypeScript, Python, SQL, HTML5, CSS3
• Frameworks: React, Next.js, Node.js, Express, Tailwind CSS, Jest
• Tools & Platforms: Git, GitHub, Docker, AWS (S3, EC2), PostgreSQL, Redis, Postman

EDUCATION
UNIVERSITY OF TEXAS AT DALLAS
B.S. in Computer Science | 2017 – 2021 | GPA: 3.75 / 4.00`
  },

  // --------------------------------------------------------------------------
  // 5. FAANG Classical Standard (1-Page High-Density - Google / Meta / Apple)
  // --------------------------------------------------------------------------
  {
    id: 'faang-classical-swe',
    name: 'FAANG Classical Standard (1-Page Google XYZ)',
    targetRole: 'Full Stack & Software Engineer',
    experienceLevel: 'Mid to Senior (3-7 Years)',
    category: 'Single-Column 100% ATS',
    layoutType: 'single_column',
    atsScore: 100,
    visualScore: 94,
    inspiredBy: 'Google, Meta, and Apple Internal Recruiter Standards (Work for FANG)',
    description: 'The proven single-column, high-density format preferred by Google, Meta, and Apple engineering screeners. 100% ATS-parseable with zero multi-column parsing traps and strict Google XYZ bullet structures.',
    tags: ['1-Page Strict', 'Google XYZ Standard', 'Action-Result Format', 'Top Recruiter Pick'],
    recommendedFor: 'Engineers applying via employee referrals at Meta, Google, Apple, Amazon, and high-growth tech startups.',
    mainContent: {
      name: 'ALEX RIVERA',
      title: 'Senior Software Engineer | Distributed Systems',
      summary: 'Senior Software Engineer with 5+ years of experience engineering high-throughput distributed microservices and modern web applications. Proven track record optimizing API latency, scaling PostgreSQL/Redis backends to 3M+ daily requests, and leading zero-downtime CI/CD deployments.',
      experience: [
        {
          role: 'Senior Software Engineer, Merchant Core Platform',
          company: 'Stripe',
          location: 'San Francisco, CA',
          period: '2023 – Present',
          bullets: [
            'Engineered distributed Redis caching architecture for 6 core ledger microservices, reducing p99 API latency by 42% across 2.4M daily payment transactions.',
            'Architected Next.js dashboard workflows with server-side streaming, reducing customer onboarding churn by 28% across 45,000 active merchant accounts.',
            'Spearheaded automated CI/CD pipeline using GitHub Actions and Docker, reducing deployment cycle times from 45 minutes to 7 minutes with zero downtime.',
            'Mentored 4 engineers and conducted 60+ technical interviews for backend and platform engineering roles.'
          ]
        },
        {
          role: 'Software Engineer, Distributed Systems',
          company: 'CloudLink Systems',
          location: 'San Jose, CA',
          period: '2021 – 2023',
          bullets: [
            'Built high-concurrency event ingestion pipelines using Python, FastAPI, and PostgreSQL, processing 15,000 telemetry events per second.',
            'Designed and executed database partitioning migration across 450M rows in PostgreSQL, eliminating query timeouts during peak traffic.',
            'Implemented automated integration test suite with PyTest and Docker, boosting test coverage from 62% to 91% and preventing 14 regression incidents.'
          ]
        }
      ],
      education: [
        {
          degree: 'B.S. in Computer Science',
          school: 'University of California, Berkeley',
          year: '2017 – 2021',
          details: 'GPA: 3.82 / 4.00'
        }
      ]
    },
    rawText: `ALEX RIVERA
San Francisco, CA | (415) 555-0192 | alex.rivera@example.com | linkedin.com/in/alexrivera-tech | github.com/alexrivera-dev

PROFESSIONAL SUMMARY
Senior Software Engineer with 5+ years of experience engineering high-throughput distributed microservices and modern web applications. Proven track record optimizing API latency, scaling PostgreSQL/Redis backends to 3M+ daily requests, and leading zero-downtime CI/CD deployments. Specialized in TypeScript, React, Next.js, Python, Docker, and AWS.

WORK EXPERIENCE
STRIPE — San Francisco, CA
Senior Software Engineer, Merchant Core Platform | 2023 – Present
• Engineered distributed Redis caching architecture for 6 core ledger microservices, reducing p99 API latency by 42% across 2.4M daily payment transactions.
• Architected Next.js dashboard workflows with server-side streaming, reducing customer onboarding churn by 28% across 45,000 active merchant accounts.
• Spearheaded automated CI/CD pipeline using GitHub Actions and Docker, reducing deployment cycle times from 45 minutes to 7 minutes with zero downtime.
• Mentored 4 engineers and conducted 60+ technical interviews for backend and platform engineering roles.

CLOUDLINK SYSTEMS — San Jose, CA
Software Engineer, Distributed Systems | 2021 – 2023
• Built high-concurrency event ingestion pipelines using Python, FastAPI, and PostgreSQL, processing 15,000 telemetry events per second.
• Designed and executed database partitioning migration across 450M rows in PostgreSQL, eliminating query timeouts during peak traffic.
• Implemented automated integration test suite with PyTest and Docker, boosting test coverage from 62% to 91% and preventing 14 regression incidents.
• Collaborated in cross-functional Agile team of 12 engineers, leading bi-weekly sprint planning and system architecture design reviews.

TECHNICAL PROJECTS
Distributed Task Queue Engine (Open Source) | github.com/alexrivera-dev/task-engine
• Built an in-memory asynchronous job scheduler in Go and Redis with priority queues, supporting 50,000 concurrently dispatched workers.
• Implemented raft-based leader election protocol ensuring zero message loss across node failover simulations.

TECHNICAL SKILLS
• Languages: TypeScript, JavaScript, Python, Go, SQL, HTML5/CSS3
• Frameworks & Libraries: React, Next.js, Node.js, Express, FastAPI, Tailwind CSS, Jest
• Cloud & DevOps: AWS (EC2, S3, RDS), Docker, Kubernetes, Terraform, GitHub Actions, CI/CD, Linux
• Databases & Storage: PostgreSQL, Redis, MongoDB, Elasticsearch

EDUCATION
UNIVERSITY OF CALIFORNIA, BERKELEY
B.S. in Computer Science | GPA: 3.82 | 2017 – 2021`
  },

  // --------------------------------------------------------------------------
  // 6. Fresher & Campus Graduate (Work for FANG Standard: Rohan Mehta)
  // --------------------------------------------------------------------------
  {
    id: 'fresher-student-swe',
    name: 'Campus Graduate & Fresher Template',
    targetRole: 'Junior / Graduate Software Engineer',
    experienceLevel: 'Entry Level (0-2 Years / Freshers)',
    category: 'Students & Freshers',
    layoutType: 'single_column',
    atsScore: 99,
    visualScore: 92,
    inspiredBy: 'University Campus Hiring & FAANG Entry-Level Referral Standards',
    description: 'Specifically engineered for university students, new grads, and career pivoters. Elevates technical capstone projects, open-source commits, and hackathons into rigorous Action-Result proof.',
    tags: ['Freshers & Students', 'Project Proof', 'Zero Fluff', 'Referral Ready'],
    recommendedFor: 'Students, freshers, and boot camp graduates seeking employee referrals for Graduate SWE and Associate roles at FAANG, Big 4, and MNCs.',
    mainContent: {
      name: 'ROHAN MEHTA',
      title: 'Graduate Software Engineer',
      summary: 'Recent Computer Science graduate with strong foundations in data structures, algorithms, and full-stack web engineering. Creator of 3 production web applications serving 10,000+ users. Proficient in Python, TypeScript, React, PostgreSQL, and Docker.',
      experience: [
        {
          role: 'Software Engineering Intern',
          company: 'Dell Technologies',
          location: 'Austin, TX',
          period: 'Summer 2023',
          bullets: [
            'Developed internal inventory management microservice using Python, FastAPI, and PostgreSQL, automating manual hardware tracking for 350+ engineers.',
            'Implemented automated email alerting service for supply chain anomalies, reducing hardware provisioning delays by 4 days per sprint.',
            'Wrote 45+ unit and integration tests with PyTest, achieving 88% test coverage and presenting final architecture demo to VP of Engineering.'
          ]
        }
      ],
      projects: [
        {
          name: 'DevCollab — Real-Time Collaborative Code Editor',
          tech: 'React, TypeScript, Node.js, WebSockets, Docker',
          bullets: [
            'Engineered collaborative web code editor supporting 50 simultaneous users with real-time cursor sync and sub-30ms latency.',
            'Containerized frontend and backend with Docker; deployed on AWS ECS with automated GitHub Actions CI/CD pipeline.'
          ]
        }
      ],
      education: [
        {
          degree: 'B.S. in Computer Science',
          school: 'University of Texas at Austin',
          year: 'Graduated May 2024',
          details: 'GPA: 3.86 / 4.00 • Dean’s Honor List'
        }
      ]
    },
    rawText: `ROHAN MEHTA
Austin, TX | (512) 555-0177 | rohan.mehta@example.com | linkedin.com/in/rohanmehta-dev | github.com/rohanm-code

OBJECTIVE & SUMMARY
Recent Computer Science graduate with strong foundations in data structures, algorithms, and full-stack web engineering. Creator of 3 production web applications serving 10,000+ users. Proficient in Python, TypeScript, React, PostgreSQL, and Docker. Seeking an Associate / Junior Software Engineer position through engineering referral.

EDUCATION
UNIVERSITY OF TEXAS AT AUSTIN
B.S. in Computer Science | GPA: 3.86 / 4.00 | Dean's Honor List (All Semesters) | Graduated May 2024
Relevant Coursework: Data Structures & Algorithms, Operating Systems, Database Management, Distributed Computing, Computer Networks

SOFTWARE ENGINEERING INTERNSHIPS
DELL TECHNOLOGIES — Austin, TX
Software Engineering Intern | Summer 2023
• Developed internal inventory management microservice using Python, FastAPI, and PostgreSQL, automating manual hardware tracking for 350+ engineers.
• Implemented automated email alerting service for supply chain anomalies, reducing hardware provisioning delays by 4 days per sprint.
• Wrote 45+ unit and integration tests with PyTest, achieving 88% test coverage and presenting final architecture demo to VP of Engineering.

TECHNICAL PROJECTS (Production Deployed)
DevCollab — Real-Time Collaborative Code Editor | github.com/rohanm-code/devcollab | devcollab.io
• Engineered collaborative web code editor supporting 50 simultaneous users with real-time cursor sync using React, TypeScript, Node.js, and WebSockets.
• Implemented Operational Transformation (OT) conflict resolution algorithm in TypeScript, preventing concurrent edit collisions with sub-30ms sync latency.
• Containerized frontend and backend using Docker; deployed on AWS ECS with automated GitHub Actions CI/CD pipeline.

Algorithmic Trading Backtester | github.com/rohanm-code/quant-backtest
• Built historical stock market backtesting engine in Python and Pandas simulating 10 years of S&P 500 tick data across 5 technical momentum strategies.
• Optimized vector calculation routines using NumPy, reducing backtesting execution time from 120 seconds to 3.4 seconds across 2M data points.

HONORS & ACHIEVEMENTS
• 1st Place Winner — HackTX 2023 (Built accessible speech-to-code IDE tool across 800+ participants)
• LeetCode: Top 4% globally (Knight badge, 450+ algorithmic problems solved in Python and C++)

TECHNICAL SKILLS
• Programming Languages: Python, Java, C++, TypeScript, JavaScript, SQL
• Frameworks & Tools: React, Node.js, FastAPI, Express, Docker, Git, Linux, PostgreSQL, MongoDB, Redis
• Foundational Concepts: Object-Oriented Programming (OOP), Data Structures, Algorithms, REST APIs, CI/CD`
  }
];

export const WORK_FOR_FANG_REFERRAL_GUIDE = {
  title: "The Work for FANG Referral Strategy ('The Anti-Website Rule')",
  subtitle: "Why cold website applications fail, and how to get real employees to submit your CV internally.",
  principles: [
    {
      number: "01",
      title: "The Anti-Website Rule",
      summary: "Never submit blindly to company career portals.",
      detail: "FAANG and Fortune 500 companies receive over 3,000,000 applications each year. Over 98% of cold applications on company portals are discarded by automated scanners or never opened by human recruiters. An internal employee referral bypasses the cold queue and places your CV directly on the hiring manager's internal dashboard."
    },
    {
      number: "02",
      title: "Why Employees WANT to Refer You",
      summary: "Understand the internal referral bonus incentive.",
      detail: "Top tech companies pay their employees between $2,000 and $10,000 for every candidate they refer who lands an offer. Employees are actively searching for strong, high-converting resumes. If your resume is crisp, 1-page, and metric-dense, referring you is a win-win."
    },
    {
      number: "03",
      title: "Single-Column vs Two-Column Layout Strategy",
      summary: "When to use which format for maximum conversion.",
      detail: "Use Single-Column (Sebastian Bennett / Reddit Sheets) for cold ATS portal submissions (Workday, Taleo, Greenhouse) so parsers never confuse column ordering. Use Two-Column (Canva / Zety style) when reaching out directly to hiring managers or alumni via LinkedIn/email, where human aesthetic impression dominates."
    },
    {
      number: "04",
      title: "The Action-Result Bullet Structure",
      summary: "Every bullet must follow: [Action Verb] + [What You Built] + [Measured Outcome].",
      detail: "Never write 'Responsible for developing APIs'. Write: 'Engineered REST APIs using Go and PostgreSQL, cutting response latency by 35% across 2M daily requests'."
    }
  ],
  outreachScripts: [
    {
      title: "Cold LinkedIn Reachout to a Tech / Big 4 Employee (Google, Deloitte, Meta)",
      context: "Send to a 2nd-degree connection or university alumni working on the team you want to join.",
      script: `Hi [Name],

I saw your work on [Team / Practice at Company] and was really impressed by [specific project or tech detail].

I'm a [Current Role / Recent Grad] specializing in [Tech Stack: e.g. Python, AWS, distributed systems / technology advisory]. I noticed an open [Specific Role Title, Job ID #12345] on your team.

I know company referral bonuses are in place, and I’ve tailored a clean 1-page CV demonstrating [key quantified metric, e.g. 40% latency reduction across 2M daily requests / $1.5M client cost optimization].

Would you be open to reviewing my 1-page CV to see if I’d be a strong referral for the role? No pressure at all either way!

Best,
[Your Name]`
    },
    {
      title: "Alumni / Warm Network Referral Ask",
      context: "Send to someone who attended your university or worked at a past company.",
      script: `Hi [Name],

Hope you're having a great week! I noticed you've been working at [Company] as a [Title] — hope you're enjoying the team.

I'm currently preparing an application for the [Job Title, Requisition #] opening in [Location / Remote]. 

I have a 1-page resume directly aligned with the role's requirements in [2-3 key technologies: e.g., TypeScript, Next.js, and AWS / Cloud Strategy]. Would you feel comfortable submitting me through the internal referral portal?

Happy to send over the PDF resume and the exact Job ID for your convenience!

Thanks so much,
[Your Name]`
    }
  ]
};
