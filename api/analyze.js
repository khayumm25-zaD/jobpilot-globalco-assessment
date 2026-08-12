const SKILL_ALIASES = {
  // =========================
  // AI / PROMPT ENGINEERING
  // =========================

  openai: [
    'openai api',
    'openai apis',
    'openai'
  ],

  llm: [
    'llm',
    'llms',
    'large language model',
    'large language models'
  ],

  llmevaluation: [
    'llm evaluation',
    'llm evaluations',
    'llm testing',
    'language model evaluation',
    'model evaluation'
  ],

  promptengineering: [
    'prompt engineering',
    'prompt engineer',
    'prompt engineering techniques',
    'prompt design',
    'prompt optimization'
  ],

  prompttesting: [
    'prompt testing',
    'prompt test',
    'prompt evaluation',
    'prompt evaluations'
  ],

  structuredprompting: [
    'structured prompting',
    'structured prompt',
    'structured prompts'
  ],

  fewshot: [
    'few-shot prompting',
    'few shot prompting',
    'few-shot',
    'few shot'
  ],

  zeroshot: [
    'zero-shot prompting',
    'zero shot prompting',
    'zero-shot',
    'zero shot'
  ],

  rag: [
    'retrieval augmented generation',
    'retrieval-augmented generation',
    'rag'
  ],

  embeddings: [
    'embeddings',
    'embedding',
    'text embeddings'
  ],

  vectordatabase: [
    'vector databases',
    'vector database',
    'vector dbs',
    'vector db'
  ],

  genai: [
    'generative ai',
    'genai',
    'generative artificial intelligence'
  ],

  json: [
    'json',
    'javascript object notation'
  ],

  // =========================
  // PROGRAMMING
  // =========================

  javascript: [
    'javascript',
    'js',
    'ecmascript'
  ],

  typescript: [
    'typescript',
    'ts'
  ],

  react: [
    'react',
    'reactjs',
    'react.js'
  ],

  angular: [
    'angular',
    'angularjs'
  ],

  nodejs: [
    'node.js',
    'nodejs',
    'node js',
    'node'
  ],

  express: [
    'express',
    'express.js',
    'expressjs'
  ],

  python: [
    'python',
    'python3'
  ],

  java: [
    'java'
  ],

  springboot: [
    'spring boot',
    'springboot'
  ],

  // =========================
  // DATABASES
  // =========================

  sql: [
    'structured query language',
    'sql'
  ],

  mysql: [
    'mysql'
  ],

  postgresql: [
    'postgresql',
    'postgres',
    'postgres db'
  ],

  mongodb: [
    'mongodb',
    'mongo db',
    'mongo'
  ],

  // =========================
  // APIS / TOOLS
  // =========================

  restapi: [
    'rest api',
    'rest apis',
    'restful api',
    'restful apis',
    'rest api development',
    'restful services'
  ],

  api: [
    'application programming interface',
    'application programming interfaces',
    'apis',
    'api'
  ],

  postman: [
    'postman'
  ],

  automatedtesting: [
    'automated testing',
    'automation testing',
    'test automation',
    'automated tests'
  ],

  selenium: [
    'selenium'
  ],

  playwright: [
    'playwright'
  ],

  junit: [
    'junit'
  ],

  pytest: [
    'pytest'
  ],

  // =========================
  // VERSION CONTROL / CI/CD
  // =========================

  git: [
    'git scm',
    'git version control',
    'version control',
    'git'
  ],

  github: [
    'github actions',
    'github repository',
    'github repositories',
    'github'
  ],

  cicd: [
    'ci/cd',
    'ci cd',
    'continuous integration',
    'continuous deployment',
    'continuous integration and continuous deployment'
  ],

  // =========================
  // FRONTEND
  // =========================

  html: [
    'html5',
    'html'
  ],

  css: [
    'css3',
    'css'
  ],

  bootstrap: [
    'bootstrap'
  ],

  tailwind: [
    'tailwind css',
    'tailwind'
  ],

  // =========================
  // CLOUD / DEVOPS
  // =========================

  docker: [
    'docker'
  ],

  kubernetes: [
    'kubernetes',
    'k8s'
  ],

  aws: [
    'amazon web services',
    'aws'
  ],

  gcp: [
    'google cloud platform',
    'google cloud',
    'gcp'
  ],

  azure: [
    'azure'
  ],

  vercel: [
    'vercel'
  ],

  // =========================
  // CS FUNDAMENTALS
  // =========================

  oop: [
    'object oriented programming',
    'object-oriented programming',
    'object oriented',
    'object-oriented',
    'oop'
  ],

  dsa: [
    'data structures and algorithms',
    'data structures',
    'algorithms',
    'dsa'
  ],

  microservices: [
    'microservices architecture',
    'microservices',
    'microservice'
  ],

  ai: [
    'artificial intelligence',
    'ai'
  ]
}


// ======================================================
// DISPLAY NAMES
// ======================================================

const DISPLAY_NAMES = {
  openai: 'OpenAI API',
  llm: 'LLMs',
  llmevaluation: 'LLM Evaluation',
  promptengineering: 'Prompt Engineering',
  prompttesting: 'Prompt Testing',
  structuredprompting: 'Structured Prompting',
  fewshot: 'Few-shot Prompting',
  zeroshot: 'Zero-shot Prompting',
  rag: 'RAG',
  embeddings: 'Embeddings',
  vectordatabase: 'Vector Databases',
  genai: 'Generative AI',
  json: 'JSON',

  javascript: 'JavaScript',
  typescript: 'TypeScript',
  react: 'React',
  angular: 'Angular',
  nodejs: 'Node.js',
  express: 'Express.js',
  python: 'Python',
  java: 'Java',
  springboot: 'Spring Boot',

  sql: 'SQL',
  mysql: 'MySQL',
  postgresql: 'PostgreSQL',
  mongodb: 'MongoDB',

  restapi: 'REST APIs',
  api: 'APIs',
  postman: 'Postman',
  automatedtesting: 'Automated Testing',
  selenium: 'Selenium',
  playwright: 'Playwright',
  junit: 'JUnit',
  pytest: 'PyTest',

  git: 'Git',
  github: 'GitHub',
  cicd: 'CI/CD',

  html: 'HTML',
  css: 'CSS',
  bootstrap: 'Bootstrap',
  tailwind: 'Tailwind CSS',

  docker: 'Docker',
  kubernetes: 'Kubernetes',
  aws: 'AWS',
  gcp: 'Google Cloud',
  azure: 'Azure',
  vercel: 'Vercel',

  oop: 'Object-Oriented Programming',
  dsa: 'Data Structures & Algorithms',
  microservices: 'Microservices',
  ai: 'Artificial Intelligence'
}


// ======================================================
// SKILL WEIGHTS
// ======================================================
//
// AI-specific skills get higher weight when the JD
// contains them. This prevents generic skills such as
// HTML or Git from dominating an AI Prompt Engineer JD.
//

const SKILL_WEIGHTS = {
  openai: 5,
  llm: 5,
  llmevaluation: 5,
  promptengineering: 5,
  prompttesting: 5,
  structuredprompting: 4,
  fewshot: 4,
  zeroshot: 4,
  rag: 5,
  embeddings: 4,
  vectordatabase: 4,
  genai: 5,

  python: 4,
  restapi: 4,
  api: 2,
  json: 3,

  react: 3,
  nodejs: 3,
  javascript: 3,

  sql: 3,
  mysql: 2,
  postgresql: 2,
  mongodb: 2,

  postman: 2,
  automatedtesting: 3,
  selenium: 2,
  playwright: 2,

  git: 1,
  github: 1,
  cicd: 3,

  docker: 2,
  kubernetes: 2,
  aws: 2,
  gcp: 2,
  azure: 2,
  vercel: 1,

  html: 1,
  css: 1,
  bootstrap: 1,
  tailwind: 1,

  java: 2,
  springboot: 2,
  oop: 2,
  dsa: 2,
  microservices: 2,
  ai: 3
}


// ======================================================
// TEXT NORMALIZATION
// ======================================================

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^\w\s+#./-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}


// ======================================================
// SKILL DETECTION
// ======================================================

function containsSkill(text, aliases) {
  const normalized = normalize(text)

  return aliases.some(alias => {
    const a = normalize(alias)

    if (!a) {
      return false
    }

    if (a.includes(' ')) {
      return normalized.includes(a)
    }

    const escaped = a.replace(
      /[.*+?^${}()|[\]\\]/g,
      '\\$&'
    )

    return new RegExp(
      `\\b${escaped}\\b`,
      'i'
    ).test(normalized)
  })
}


function detectSkills(text) {
  const detected = []

  for (const [key, aliases] of Object.entries(
    SKILL_ALIASES
  )) {
    if (containsSkill(text, aliases)) {
      detected.push(key)
    }
  }

  return detected
}


function displaySkills(keys) {
  return keys.map(
    key => DISPLAY_NAMES[key] || key
  )
}


function unique(array) {
  return [...new Set(array)]
}


function extractRequirements(jobDescription) {
  return unique(
    Object.entries(SKILL_ALIASES)
      .filter(([key, aliases]) =>
        containsSkill(jobDescription, aliases)
      )
      .map(([key]) => key)
  )
}


// ======================================================
// MATCHING
// ======================================================

function getMatchingSkills(
  resumeSkills,
  jdSkills
) {
  return jdSkills.filter(skill =>
    resumeSkills.includes(skill)
  )
}


function getMissingSkills(
  resumeSkills,
  jdSkills
) {
  return jdSkills.filter(skill =>
    !resumeSkills.includes(skill)
  )
}


// ======================================================
// WEIGHTED TECHNICAL SCORE
// ======================================================

function calculateWeightedTechnicalScore(
  resumeSkills,
  jdSkills
) {
  if (!jdSkills.length) {
    return 0
  }

  let totalWeight = 0
  let matchedWeight = 0

  for (const skill of jdSkills) {
    const weight =
      SKILL_WEIGHTS[skill] || 1

    totalWeight += weight

    if (resumeSkills.includes(skill)) {
      matchedWeight += weight
    }
  }

  if (!totalWeight) {
    return 0
  }

  return Math.round(
    (matchedWeight / totalWeight) * 100
  )
}


// ======================================================
// AI ROLE DETECTION
// ======================================================

function isAIRole(jobDescription) {
  const text = normalize(jobDescription)

  const aiTerms = [
    'prompt engineer',
    'prompt engineering',
    'llm',
    'large language model',
    'generative ai',
    'genai',
    'openai',
    'rag',
    'retrieval augmented generation',
    'llm evaluation',
    'ai engineer',
    'ai intern',
    'artificial intelligence'
  ]

  return aiTerms.some(term =>
    text.includes(term)
  )
}


// ======================================================
// KEYWORD COVERAGE
// ======================================================

function calculateKeywordCoverage(
  resume,
  jobDescription
) {
  const resumeText = normalize(resume)
  const jdText = normalize(jobDescription)

  if (!resumeText || !jdText) {
    return 0
  }

  const importantTerms = [
    'developer',
    'software',
    'engineer',
    'frontend',
    'backend',
    'full stack',
    'application',
    'web',
    'api',
    'rest',
    'database',
    'sql',
    'cloud',
    'deployment',
    'testing',
    'development',
    'programming',
    'javascript',
    'python',
    'java',
    'react',
    'node',
    'git',
    'github',
    'aws',
    'gcp',
    'google cloud',
    'azure',
    'docker',
    'ci/cd',
    'communication',
    'problem solving',

    // AI terms
    'openai',
    'llm',
    'prompt engineering',
    'prompt testing',
    'structured prompting',
    'few-shot',
    'zero-shot',
    'rag',
    'embeddings',
    'vector database',
    'generative ai',
    'llm evaluation',
    'postman',
    'json'
  ]

  const relevantTerms =
    importantTerms.filter(term =>
      jdText.includes(term)
    )

  if (!relevantTerms.length) {
    return 50
  }

  const matches =
    relevantTerms.filter(term =>
      resumeText.includes(term)
    )

  return Math.round(
    (matches.length /
      relevantTerms.length) *
      100
  )
}


// ======================================================
// PROJECT / EXPERIENCE
// ======================================================

function calculateProjectEvidence(
  resume,
  matchingSkills
) {
  const text = normalize(resume)

  const indicators = [
    'project',
    'projects',
    'developed',
    'develop',
    'built',
    'implemented',
    'created',
    'designed',
    'application',
    'system',
    'framework',
    'api',
    'database',
    'deployment',
    'github',
    'vercel',
    'internship',
    'experience',
    'testing',
    'automation',
    'dashboard',
    'website',
    'platform',
    'evaluation',
    'prompt',
    'llm',
    'ai',
    'generative',
    'rag'
  ]

  const indicatorMatches =
    indicators.filter(
      indicator =>
        text.includes(indicator)
    ).length

  const skillEvidence =
    Math.min(
      matchingSkills.length * 6,
      60
    )

  const textEvidence =
    Math.min(
      indicatorMatches * 2,
      40
    )

  return Math.min(
    100,
    skillEvidence + textEvidence
  )
}


// ======================================================
// TOOLS / TECHNOLOGIES
// ======================================================

function calculateToolCoverage(
  resumeSkills,
  jdSkills
) {
  const toolSkills = [
    'github',
    'git',
    'docker',
    'kubernetes',
    'aws',
    'gcp',
    'azure',
    'vercel',
    'supabase',
    'firebase',
    'postman',
    'selenium',
    'playwright',
    'cicd',
    'openai',
    'json',
    'vectordatabase'
  ]

  const jdTools =
    jdSkills.filter(skill =>
      toolSkills.includes(skill)
    )

  if (!jdTools.length) {
    return 100
  }

  const matchedTools =
    jdTools.filter(tool =>
      resumeSkills.includes(tool)
    )

  return Math.round(
    (matchedTools.length /
      jdTools.length) *
      100
  )
}


// ======================================================
// REQUIREMENTS SCORE
// ======================================================

function calculateRequirementsScore(
  technical,
  keyword,
  projects,
  isAI
) {
  if (isAI) {
    return Math.round(
      technical * 0.65 +
      keyword * 0.25 +
      projects * 0.10
    )
  }

  return Math.round(
    technical * 0.70 +
    keyword * 0.30
  )
}


// ======================================================
// OVERALL SCORE
// ======================================================

function calculateScore(
  resume,
  jobDescription,
  resumeSkills,
  jdSkills,
  matchingSkills
) {
  if (!jdSkills.length) {
    return {
      overall: 0,
      technical: 0,
      requirements: 0,
      projects: 0,
      tools: 0
    }
  }

  const technical =
    calculateWeightedTechnicalScore(
      resumeSkills,
      jdSkills
    )

  const keyword =
    calculateKeywordCoverage(
      resume,
      jobDescription
    )

  const projects =
    calculateProjectEvidence(
      resume,
      matchingSkills
    )

  const tools =
    calculateToolCoverage(
      resumeSkills,
      jdSkills
    )

  const aiRole =
    isAIRole(jobDescription)

  const requirements =
    calculateRequirementsScore(
      technical,
      keyword,
      projects,
      aiRole
    )

  /*
   * AI roles:
   *
   * 50% weighted technical skills
   * 20% requirements
   * 15% projects
   * 15% tools
   *
   * Normal roles:
   *
   * 45% technical
   * 20% requirements
   * 20% projects
   * 15% tools
   */

  let overall

  if (aiRole) {
    overall = Math.round(
      technical * 0.50 +
      requirements * 0.20 +
      projects * 0.15 +
      tools * 0.15
    )
  } else {
    overall = Math.round(
      technical * 0.45 +
      requirements * 0.20 +
      projects * 0.20 +
      tools * 0.15
    )
  }

  return {
    overall: Math.max(
      0,
      Math.min(100, overall)
    ),

    technical: Math.max(
      0,
      Math.min(100, technical)
    ),

    requirements: Math.max(
      0,
      Math.min(100, requirements)
    ),

    projects: Math.max(
      0,
      Math.min(100, projects)
    ),

    tools: Math.max(
      0,
      Math.min(100, tools)
    )
  }
}


// ======================================================
// PRIORITY
// ======================================================

function priorityForSkill(skill) {
  const highPriority = [
    'openai',
    'llm',
    'llmevaluation',
    'promptengineering',
    'prompttesting',
    'structuredprompting',
    'fewshot',
    'zeroshot',
    'rag',
    'embeddings',
    'vectordatabase',
    'genai',

    'react',
    'nodejs',
    'python',
    'java',
    'springboot',
    'sql',
    'restapi',
    'cicd',
    'docker',
    'aws',
    'gcp',
    'azure',
    'postgresql',
    'mysql',
    'javascript'
  ]

  if (
    highPriority.includes(skill)
  ) {
    return 'High'
  }

  return 'Medium'
}


// ======================================================
// SKILL GAPS
// ======================================================

function buildSkillGaps(
  missingSkills
) {
  return missingSkills.map(skill => ({
    skill:
      DISPLAY_NAMES[skill] || skill,

    priority:
      priorityForSkill(skill),

    reason:
      `The job description mentions ${
        DISPLAY_NAMES[skill] || skill
      }, but this skill was not clearly detected in the resume.`
  }))
}


// ======================================================
// RECOMMENDATIONS
// ======================================================

function buildRecommendations(
  matchingSkills,
  missingSkills,
  jobDescription
) {
  const recommendations = []

  const aiRole =
    isAIRole(jobDescription)

  if (missingSkills.length) {
    recommendations.push(
      `Add accurate evidence of ${displaySkills(
        missingSkills.slice(0, 8)
      ).join(', ')} through projects, coursework, certifications, or practical experience.`
    )
  }

  if (matchingSkills.length) {
    recommendations.push(
      `Move your strongest matching skills such as ${displaySkills(
        matchingSkills.slice(0, 8)
      ).join(', ')} closer to the top of your resume.`
    )
  }

  if (aiRole) {
    recommendations.push(
      'Add concrete evidence of prompt engineering, LLM evaluation, prompt testing, and AI experimentation to your projects.'
    )

    recommendations.push(
      'Include specific OpenAI API, RAG, embeddings, vector database, or LLM application work where applicable.'
    )

    recommendations.push(
      'Show measurable LLM evaluation results such as accuracy, consistency, hallucination reduction, or evaluation coverage.'
    )
  }

  recommendations.push(
    'Add measurable outcomes to your strongest projects instead of only listing responsibilities.'
  )

  recommendations.push(
    'Use the exact terminology from the job description where it accurately describes your experience.'
  )

  if (
    containsSkill(
      jobDescription,
      SKILL_ALIASES.restapi
    ) ||
    containsSkill(
      jobDescription,
      SKILL_ALIASES.api
    )
  ) {
    recommendations.push(
      'Prepare examples covering API design, HTTP methods, authentication, validation, error handling, and status codes.'
    )
  }

  if (
    containsSkill(
      jobDescription,
      SKILL_ALIASES.cicd
    )
  ) {
    recommendations.push(
      'Demonstrate CI/CD using GitHub Actions and a deployed project.'
    )
  }

  return unique(
    recommendations
  ).slice(0, 8)
}


// ======================================================
// INTERVIEW TOPICS
// ======================================================

function buildInterviewTopics(
  jdSkills
) {
  const topicMap = {
    openai:
      'OpenAI API integration, authentication and API usage',

    llm:
      'LLM fundamentals, model behavior and limitations',

    llmevaluation:
      'LLM evaluation, benchmarking and response quality assessment',

    promptengineering:
      'Prompt engineering, prompt optimization and prompt design',

    prompttesting:
      'Prompt testing, test cases and evaluation methodology',

    structuredprompting:
      'Structured prompting and reliable output formatting',

    fewshot:
      'Few-shot prompting and example selection',

    zeroshot:
      'Zero-shot prompting and instruction design',

    rag:
      'RAG architecture, retrieval and context injection',

    embeddings:
      'Embeddings and semantic similarity',

    vectordatabase:
      'Vector databases, indexing and similarity search',

    genai:
      'Generative AI concepts and practical applications',

    json:
      'JSON structures and structured AI outputs',

    javascript:
      'JavaScript fundamentals and practical implementation',

    typescript:
      'TypeScript fundamentals and practical implementation',

    react:
      'React fundamentals, hooks and component architecture',

    nodejs:
      'Node.js fundamentals and backend implementation',

    express:
      'Express.js routing, middleware and API development',

    python:
      'Python fundamentals and practical implementation',

    java:
      'Java fundamentals and object-oriented programming',

    springboot:
      'Spring Boot and REST API development',

    sql:
      'SQL fundamentals, joins, queries and optimization',

    mysql:
      'MySQL database concepts and SQL queries',

    postgresql:
      'PostgreSQL database concepts and SQL queries',

    mongodb:
      'MongoDB and NoSQL database concepts',

    restapi:
      'REST API design, HTTP methods and status codes',

    api:
      'API design, authentication, validation and error handling',

    postman:
      'API testing using Postman',

    automatedtesting:
      'Automated testing strategies and test design',

    git:
      'Git workflows, branching and version control',

    github:
      'GitHub repositories, collaboration and GitHub Actions',

    cicd:
      'CI/CD pipelines and deployment automation',

    docker:
      'Docker fundamentals and containerization',

    aws:
      'AWS fundamentals and cloud deployment',

    gcp:
      'Google Cloud fundamentals and deployment',

    azure:
      'Azure fundamentals and deployment',

    selenium:
      'Selenium automation and test design',

    playwright:
      'Playwright automation and end-to-end testing',

    oop:
      'Object-oriented programming principles',

    dsa:
      'Data structures, algorithms and problem solving',

    microservices:
      'Microservices architecture and service communication'
  }

  const topics = []

  for (const skill of jdSkills) {
    if (topicMap[skill]) {
      topics.push(
        topicMap[skill]
      )
    }
  }

  return unique(
    topics
  ).slice(0, 10)
}


// ======================================================
// SUMMARY
// ======================================================

function buildSummary(
  score,
  matchingSkills,
  missingSkills,
  jobDescription
) {
  const aiRole =
    isAIRole(jobDescription)

  if (score >= 80) {
    return aiRole
      ? `Strong AI-role match. Your resume demonstrates ${matchingSkills.length} relevant skills, with ${missingSkills.length} notable gaps.`
      : `Strong match. Your resume demonstrates ${matchingSkills.length} relevant skills, with ${missingSkills.length} notable gaps.`
  }

  if (score >= 65) {
    return aiRole
      ? `Good AI-role match. Your resume demonstrates several relevant AI and technical skills, with some requirements that could be strengthened.`
      : `Good match. Your resume demonstrates several relevant skills, with some requirements that could be strengthened.`
  }

  if (score >= 50) {
    return aiRole
      ? `Moderate AI-role match. Your resume contains relevant technical experience, but several AI-specific requirements should be addressed.`
      : `Moderate match. Your resume contains relevant experience, but several job requirements should be addressed.`
  }

  if (score >= 30) {
    return `Partial match. Some relevant experience is present, but important technical requirements are missing or not clearly demonstrated.`
  }

  return `Low match. Several important requirements from the job description were not clearly detected in the resume.`
}


// ======================================================
// API HANDLER
// ======================================================

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    })
  }

  try {
    const {
      resume,
      jobDescription
    } = req.body || {}

    if (
      typeof resume !== 'string' ||
      !resume.trim()
    ) {
      return res.status(400).json({
        error: 'Resume is required.'
      })
    }

    if (
      typeof jobDescription !== 'string' ||
      !jobDescription.trim()
    ) {
      return res.status(400).json({
        error: 'Job description is required.'
      })
    }

    if (resume.length > 100000) {
      return res.status(413).json({
        error: 'Resume text is too large.'
      })
    }

    if (jobDescription.length > 100000) {
      return res.status(413).json({
        error:
          'Job description is too large.'
      })
    }

    const resumeSkills =
      detectSkills(resume)

    const jdSkills =
      extractRequirements(jobDescription)

    const matchingSkills =
      getMatchingSkills(
        resumeSkills,
        jdSkills
      )

    const missingSkills =
      getMissingSkills(
        resumeSkills,
        jdSkills
      )

    const score =
      calculateScore(
        resume,
        jobDescription,
        resumeSkills,
        jdSkills,
        matchingSkills
      )

    const aiRole =
      isAIRole(jobDescription)

    const result = {
      matchScore: score.overall,

      summary:
        buildSummary(
          score.overall,
          matchingSkills,
          missingSkills,
          jobDescription
        ),

      breakdown: {
        technicalSkills:
          score.technical,

        requirementsCoverage:
          score.requirements,

        projectExperience:
          score.projects,

        toolsTechnologies:
          score.tools
      },

      matchingSkills:
        displaySkills(
          matchingSkills
        ),

      missingSkills:
        displaySkills(
          missingSkills
        ),

      skillGaps:
        buildSkillGaps(
          missingSkills
        ),

      recommendations:
        buildRecommendations(
          matchingSkills,
          missingSkills,
          jobDescription
        ),

      interviewTopics:
        buildInterviewTopics(
          jdSkills
        ),

      metadata: {
        detectedResumeSkills:
          displaySkills(
            resumeSkills
          ),

        detectedJobSkills:
          displaySkills(
            jdSkills
          ),

        matchingSkillCount:
          matchingSkills.length,

        missingSkillCount:
          missingSkills.length,

        roleType:
          aiRole
            ? 'AI / Prompt Engineering'
            : 'Software / Technical',

        analyzer:
          'JobPilot Local Skills Analyzer v4'
      }
    }

    return res.status(200).json(result)

  } catch (error) {
    console.error(
      'Analyzer error:',
      error
    )

    return res.status(500).json({
      error:
        error?.message ||
        'Local analysis failed.'
    })
  }
}