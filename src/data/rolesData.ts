export interface Role {
  id: string;
  title: string; // shown in giant ghost text + info panel
  tagline: string; // one-line "what they do"
  skills: string[]; // 2–3 core skills, short labels
  tools: string[]; // 2–3 primary tools, short labels
  src: string; // character illustration asset
  bg: string; // background color
  panel: string; // panel color
  // Detailed metadata for deep role exploration
  salaryRange?: string;
  experienceLevel?: string;
  typicalTasks?: string[];
  growthRate?: string;
}

export const ROLES: Role[] = [
  {
    id: 'data-scientist',
    title: 'DATA SCIENTIST',
    tagline: 'Explores data, builds predictive models, and translates findings into recommendations.',
    skills: ['Statistics', 'Python', 'Communication'],
    tools: ['Python', 'scikit-learn', 'SQL'],
    src: '/assets/roles/data-scientist.png',
    bg: '#4F6FE0',
    panel: '#6E8AF0',
    salaryRange: '$125,000 - $185,000',
    experienceLevel: 'Mid to Senior Level',
    typicalTasks: [
      'Formulate analytical hypotheses and design rigorous experimental trials',
      'Engineer predictive feature pipelines and validate ML performance metrics',
      'Communicate actionable quantitative findings to cross-functional executive teams'
    ],
    growthRate: '+36% projected 10-year growth'
  },
  {
    id: 'data-analyst',
    title: 'DATA ANALYST',
    tagline: 'Answers specific business questions and builds dashboards.',
    skills: ['SQL', 'Spreadsheets', 'Visualization'],
    tools: ['SQL', 'Tableau', 'Power BI'],
    src: '/assets/roles/data-analyst.png',
    bg: '#3EA6A0',
    panel: '#58BFB8',
    salaryRange: '$85,000 - $130,000',
    experienceLevel: 'Entry to Mid Level',
    typicalTasks: [
      'Query relational databases and aggregate transactional activity',
      'Synthesize real-time operational performance metrics into executive dashboards',
      'Perform root-cause cohort analysis on customer retention and revenue metrics'
    ],
    growthRate: '+25% projected 10-year growth'
  },
  {
    id: 'data-engineer',
    title: 'DATA ENGINEER',
    tagline: 'Builds and maintains the pipelines that move and store data.',
    skills: ['Programming', 'Databases', 'Systems thinking'],
    tools: ['Python', 'SQL', 'Airflow'],
    src: '/assets/roles/data-engineer.png',
    bg: '#5C6470',
    panel: '#78818E',
    salaryRange: '$130,000 - $190,000',
    experienceLevel: 'Mid to Senior Level',
    typicalTasks: [
      'Architect fault-tolerant distributed ingestion architectures (Kafka, Spark)',
      'Design dimensional schemas and columnar data lakehouse repositories',
      'Optimize pipeline query latency, idempotency, and throughput SLAs'
    ],
    growthRate: '+33% projected 10-year growth'
  },
  {
    id: 'ml-engineer',
    title: 'MACHINE LEARNING ENGINEER',
    tagline: 'Takes models from prototype to production.',
    skills: ['Software engineering', 'ML fundamentals'],
    tools: ['Python', 'Docker', 'Cloud platforms'],
    src: '/assets/roles/ml-engineer.png',
    bg: '#7C5CFC',
    panel: '#9679FD',
    salaryRange: '$140,000 - $210,000',
    experienceLevel: 'Mid to Principal Level',
    typicalTasks: [
      'Containerize, package, and deploy inference microservices to Kubernetes',
      'Monitor model drift, latency spikes, and automated retraining triggers',
      'Accelerate tensor model graphs with TensorRT, ONNX, and GPU virtualization'
    ],
    growthRate: '+40% projected 10-year growth'
  },
  {
    id: 'ai-engineer',
    title: 'AI ENGINEER',
    tagline: 'Integrates AI systems into real applications.',
    skills: ['APIs', 'Systems design', 'Prompt/context design'],
    tools: ['Python', 'Cloud AI services'],
    src: '/assets/roles/ai-engineer.png',
    bg: '#9257E0',
    panel: '#A876EA',
    salaryRange: '$135,000 - $205,000',
    experienceLevel: 'Mid to Senior Level',
    typicalTasks: [
      'Design retrieval-augmented generation (RAG) and dense vector search topologies',
      'Implement multi-agent tool execution workflows and guardrail evaluation suites',
      'Fine-tune domain-specific foundational models for production software products'
    ],
    growthRate: '+48% projected 10-year growth'
  },
  {
    id: 'bi-analyst',
    title: 'BUSINESS INTELLIGENCE ANALYST',
    tagline: 'Builds reporting systems that inform leadership decisions.',
    skills: ['SQL', 'Storytelling', 'Business context'],
    tools: ['Power BI', 'Tableau', 'SQL'],
    src: '/assets/roles/bi-analyst.png',
    bg: '#E0A23D',
    panel: '#EDB962',
    salaryRange: '$95,000 - $145,000',
    experienceLevel: 'Mid Level',
    typicalTasks: [
      'Collaborate directly with department heads to formulate North Star KPIs',
      'Standardize semantic data layers and enterprise reporting catalogs',
      'Present strategic quarterly operational trends to executive leadership'
    ],
    growthRate: '+23% projected 10-year growth'
  },
  {
    id: 'research-scientist',
    title: 'RESEARCH SCIENTIST',
    tagline: 'Develops new methods and techniques in AI and ML.',
    skills: ['Mathematics', 'Experimentation', 'Writing'],
    tools: ['Python', 'Research tooling'],
    src: '/assets/roles/research-scientist.png',
    bg: '#2FAE8B',
    panel: '#4EC3A2',
    salaryRange: '$150,000 - $230,000',
    experienceLevel: 'Advanced / Ph.D. Level',
    typicalTasks: [
      'Derive novel theoretical formulations and architectural loss mechanics',
      'Author peer-reviewed publications and open-source benchmark suites',
      'Investigate fundamental frontiers in optimization, reasoning, and generalization'
    ],
    growthRate: '+31% projected 10-year growth'
  }
];
