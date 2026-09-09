import { CareerRole, Industry, FutureTrend, SkillItem, JourneyStage, StudentInfo } from '../types';

export const STUDENT_INFO: StudentInfo = {
  name: 'Sachin Gupta',
  classDivision: 'First-Year Data Science',
  rollNo: '1063',
  subject: 'Data Science',
};

export const CORE_DEFINITION = {
  headline: 'Data Science turns scattered data into a coherent, actionable story.',
  description:
    'Data Science is an interdisciplinary field that uses statistics, mathematics, programming, machine learning, and artificial intelligence to collect, analyze, and interpret data.',
  triadForces: [
    {
      force: 'Rigor',
      name: 'Statistics & Math',
      detail: 'Hypothesis testing, probability models, and linear algebra foundation.',
    },
    {
      force: 'Scale',
      name: 'Programming & Systems',
      detail: 'Pipelines, algorithms, database query execution, and high-volume computation.',
    },
    {
      force: 'Relevance',
      name: 'Domain Knowledge',
      detail: 'Translating nuanced business, clinical, or scientific challenges into measurable variables.',
    },
  ],
};

export const IMPORTANCE_REASONS = [
  {
    number: '01',
    title: 'Enables data-driven decision making',
    description:
      'Replaces guesswork with evidence — decisions are grounded in what the data actually shows, not just intuition.',
    category: 'Decision Intelligence',
  },
  {
    number: '02',
    title: 'Identifies patterns and trends',
    description:
      'Surfaces relationships hidden inside large, messy datasets that would be invisible to manual review.',
    category: 'Exploration',
  },
  {
    number: '03',
    title: 'Predicts future outcomes',
    description:
      'Uses historical data to forecast what’s likely to happen next, from customer behavior to equipment failure.',
    category: 'Forecasting',
  },
  {
    number: '04',
    title: 'Improves products and services',
    description:
      'Feedback loops built from user data help teams refine features and fix what isn’t working.',
    category: 'Product Optimization',
  },
  {
    number: '05',
    title: 'Automates complex tasks',
    description:
      'Models take over repetitive analytical work, freeing people to focus on judgment and strategy.',
    category: 'Efficiency',
  },
  {
    number: '06',
    title: 'Drives innovation across industries',
    description:
      'New products, treatments, and business models increasingly start with a data insight, not just an idea.',
    category: 'Breakthroughs',
  },
];

export const CAREER_ROLES: CareerRole[] = [
  {
    id: 'data-scientist',
    number: '01',
    name: 'Data Scientist',
    oneliner: 'Analyzes data and builds predictive models.',
    description:
      'Combines statistics, programming, and domain expertise to explore data, build models that predict outcomes, and translate findings into recommendations decision-makers can act on.',
    keySkills: ['Predictive Modeling', 'Statistical Inference', 'Experimental Design', 'Feature Engineering'],
    typicalTools: ['Python', 'R', 'scikit-learn', 'Pandas', 'Jupyter', 'PostgreSQL'],
  },
  {
    id: 'data-analyst',
    number: '02',
    name: 'Data Analyst',
    oneliner: 'Finds insights and creates reports and dashboards.',
    description:
      'Works closely with business teams to answer specific questions — cleaning data, running analysis, and building dashboards that make performance and trends easy to track.',
    keySkills: ['EDA (Exploratory Data Analysis)', 'Business KPIs', 'Storytelling', 'Data Cleansing'],
    typicalTools: ['SQL', 'Power BI', 'Tableau', 'Excel', 'Python', 'Looker'],
  },
  {
    id: 'data-engineer',
    number: '03',
    name: 'Data Engineer',
    oneliner: 'Builds and maintains data pipelines and data infrastructure.',
    description:
      'Designs the systems that collect, move, and store data reliably at scale, so analysts and scientists always have clean, accessible data to work with.',
    keySkills: ['ETL / ELT Pipelines', 'Distributed Computing', 'Data Warehousing', 'Streaming Architectures'],
    typicalTools: ['Apache Spark', 'Kafka', 'Airflow', 'Snowflake', 'dbt', 'BigQuery'],
  },
  {
    id: 'ml-engineer',
    number: '04',
    name: 'Machine Learning Engineer',
    oneliner: 'Develops and deploys machine learning models.',
    description:
      'Takes models from research prototypes to production systems — optimizing performance, automating retraining, and ensuring models run reliably in real applications.',
    keySkills: ['Model Optimization', 'MLOps & CI/CD', 'API Serving', 'Model Monitoring'],
    typicalTools: ['PyTorch', 'TensorFlow', 'Docker', 'Kubernetes', 'MLflow', 'FastAPI'],
  },
  {
    id: 'ai-engineer',
    number: '05',
    name: 'AI Engineer',
    oneliner: 'Builds intelligent AI-powered applications and systems.',
    description:
      'Integrates large language models, computer vision, and other AI systems into real products, focusing on how AI capabilities are delivered to end users.',
    keySkills: ['LLM Orchestration', 'RAG Architectures', 'Computer Vision', 'Agentic Workflows'],
    typicalTools: ['LangChain', 'LlamaIndex', 'Hugging Face', 'Vector DBs', 'Python', 'vLLM'],
  },
  {
    id: 'bi-analyst',
    number: '06',
    name: 'Business Intelligence Analyst',
    oneliner: 'Converts business data into strategic business insights.',
    description:
      'Focuses on the "so what" of company data — building reporting systems that help leadership understand performance and make strategic calls.',
    keySkills: ['Executive Dashboards', 'Metric Governance', 'Cross-functional Strategy', 'Trend Analysis'],
    typicalTools: ['Tableau', 'Power BI', 'SQL Server', 'Alteryx', 'Google Sheets'],
  },
  {
    id: 'research-scientist',
    number: '07',
    name: 'Research Scientist',
    oneliner: 'Develops new AI, machine learning, and data science techniques.',
    description:
      'Pushes the boundaries of what’s algorithmically possible, publishing and prototyping new methods that eventually make their way into production tools.',
    keySkills: ['Algorithmic Innovation', 'Mathematical Proofs', 'Benchmarking', 'Academic Publishing'],
    typicalTools: ['JAX', 'PyTorch', 'CUDA', 'LaTeX', 'ArXiv', 'High Performance Clusters'],
  },
];

export const INDUSTRIES: Industry[] = [
  {
    id: 'tech',
    number: '01',
    title: 'Technology',
    description: 'Powers recommendation engines, search, and product personalization at scale.',
    exampleUseCases: ['Feed ranking algorithms', 'Search query auto-completion', 'User churn detection'],
  },
  {
    id: 'finance',
    number: '02',
    title: 'Finance',
    description: 'Detects fraud, assesses credit risk, and drives algorithmic trading decisions.',
    exampleUseCases: ['Real-time card fraud triage', 'Automated credit score modeling', 'High-frequency market signals'],
  },
  {
    id: 'healthcare',
    number: '03',
    title: 'Healthcare',
    description: 'Supports diagnosis, treatment planning, and drug discovery through predictive models.',
    exampleUseCases: ['Oncology image segmentation', 'EHR anomaly alerts', 'Molecular compound screening'],
  },
  {
    id: 'ecommerce',
    number: '04',
    title: 'E-commerce',
    description: 'Personalizes recommendations, forecasts demand, and optimizes pricing in real time.',
    exampleUseCases: ['Dynamic pricing matrix', 'Inventory restocking forecasts', 'Basket cross-selling'],
  },
  {
    id: 'banking',
    number: '05',
    title: 'Banking',
    description: 'Automates risk scoring, compliance monitoring, and customer segmentation.',
    exampleUseCases: ['Anti-money laundering (AML)', 'Loan default probability', 'Wealth management bots'],
  },
  {
    id: 'manufacturing',
    number: '06',
    title: 'Manufacturing',
    description: 'Predicts equipment failure and optimizes production lines through sensor data.',
    exampleUseCases: ['Predictive vibration diagnostics', 'Supply chain lead-time planning', 'Automated defect vision'],
  },
  {
    id: 'marketing',
    number: '07',
    title: 'Marketing',
    description: 'Targets campaigns, measures attribution, and predicts customer churn.',
    exampleUseCases: ['Multi-touch attribution', 'LTV (Lifetime value) clustering', 'Lookalike audience synthesis'],
  },
  {
    id: 'education',
    number: '08',
    title: 'Education',
    description: 'Personalizes learning paths and identifies students who need extra support.',
    exampleUseCases: ['Adaptive difficulty grading', 'Early drop-out intervention', 'Curriculum mastery telemetry'],
  },
  {
    id: 'automotive',
    number: '09',
    title: 'Automotive',
    description: 'Powers autonomous driving systems and predictive vehicle maintenance.',
    exampleUseCases: ['LiDAR sensor fusion', 'Telemetry fleet optimization', 'Battery degradation curves'],
  },
  {
    id: 'government',
    number: '10',
    title: 'Government',
    description: 'Informs public policy, resource allocation, and infrastructure planning.',
    exampleUseCases: ['Traffic corridor simulations', 'Emergency dispatch routing', 'Census demographic projections'],
  },
];

export const FUTURE_TRENDS: FutureTrend[] = [
  {
    id: 'genai',
    number: '01',
    title: 'Artificial Intelligence & Generative AI',
    description:
      'Growing use of AI assistants, content generation, and intelligent automation. Generative models are moving from novelty to core infrastructure across nearly every industry.',
    impactArea: 'Foundational Infrastructure',
  },
  {
    id: 'bigdata',
    number: '02',
    title: 'Big Data Analytics',
    description:
      'Organizations will process increasingly large and complex datasets. The volume, velocity, and variety of data continues to outpace traditional analysis methods, demanding new tools and techniques.',
    impactArea: 'Petabyte-scale Systems',
  },
  {
    id: 'iot',
    number: '03',
    title: 'Internet of Things (IoT)',
    description:
      'Connected devices will continuously generate data requiring analysis. Sensors embedded in everyday objects create a constant stream of real-time data ready to be turned into insight.',
    impactArea: 'Edge Telemetry',
  },
  {
    id: 'biotech',
    number: '04',
    title: 'Healthcare & Biotechnology',
    description:
      'Data science will support disease prediction, personalized medicine, and medical research. Genomic data and patient records are opening the door to treatment tailored to the individual.',
    impactArea: 'Precision Medicine',
  },
  {
    id: 'autonomous',
    number: '05',
    title: 'Autonomous Systems',
    description:
      'AI and data will power autonomous vehicles, robotics, and smart systems. Real-time sensor fusion and decision-making models are central to systems that operate without human input.',
    impactArea: 'Robotics & Mobility',
  },
  {
    id: 'cybersecurity',
    number: '06',
    title: 'Cybersecurity',
    description:
      'Machine learning will help detect fraud, attacks, and abnormal behavior. Pattern-recognition models can flag threats far faster than manual monitoring ever could.',
    impactArea: 'Zero-Trust Defense',
  },
  {
    id: 'smartcities',
    number: '07',
    title: 'Smart Businesses & Cities',
    description:
      'Data-driven systems will optimize transportation, energy, resources, and business operations. Urban infrastructure and enterprise operations alike are becoming responsive systems, not static plans.',
    impactArea: 'Urban Efficiency',
  },
];

export const SKILL_ITEMS: SkillItem[] = [
  {
    id: 'python',
    name: 'Python',
    description: 'The primary language for data manipulation, modeling, and automation.',
    category: 'technical',
  },
  {
    id: 'sql',
    name: 'SQL',
    description: 'Essential for querying and working with structured data at the source.',
    category: 'technical',
  },
  {
    id: 'statistics',
    name: 'Statistics',
    description: 'The mathematical foundation behind every reliable data-driven claim.',
    category: 'core',
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    description: 'Turns historical data into models that generalize to new situations.',
    category: 'technical',
  },
  {
    id: 'viz',
    name: 'Data Visualization',
    description: 'Makes complex findings understandable and persuasive to any audience.',
    category: 'core',
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    description: 'Broader systems-thinking beyond individual models — how AI capabilities combine.',
    category: 'technical',
  },
  {
    id: 'cloud',
    name: 'Cloud Computing',
    description: 'Where modern data infrastructure and models are built, trained, and deployed.',
    category: 'technical',
  },
  {
    id: 'communication',
    name: 'Communication',
    description: 'Insights only create value once someone else understands and acts on them.',
    category: 'soft',
  },
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    description: 'The core skill underneath all the tools — knowing what question to ask.',
    category: 'soft',
  },
];

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    step: '01',
    phase: 'Begin',
    title: 'Learn',
    description: 'Build a foundation in statistics, programming, and core data concepts.',
    milestone: 'Master Python, SQL, probability theory, and clean code hygiene.',
  },
  {
    step: '02',
    phase: 'Explore',
    title: 'Analyze',
    description: 'Practice exploring real datasets to find patterns and answer questions.',
    milestone: 'Perform exploratory data analysis, hypothesis testing, and insightful data dashboards.',
  },
  {
    step: '03',
    phase: 'Create',
    title: 'Build',
    description: 'Develop models and tools that turn analysis into working solutions.',
    milestone: 'Train, evaluate, and tune supervised and unsupervised learning algorithms.',
  },
  {
    step: '04',
    phase: 'Apply',
    title: 'Deploy',
    description: 'Ship those solutions into real systems where they can be used at scale.',
    milestone: 'Containerize, serve REST/gRPC endpoints, monitor model drift, and handle data pipelines.',
  },
  {
    step: '05',
    phase: 'Extend',
    title: 'Innovate',
    description: 'Push beyond existing methods to create new approaches and applications.',
    milestone: 'Design novel architectures, conduct domain-specific research, and guide high-stakes business strategy.',
  },
];
