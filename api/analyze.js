const SKILL_ALIASES = {
  javascript: ['javascript', 'js', 'ecmascript'],
  typescript: ['typescript', 'ts'],
  react: ['react', 'reactjs', 'react.js'],
  angular: ['angular', 'angularjs'],

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

  python: ['python', 'python3'],
  java: ['java'],

  springboot: [
    'spring boot',
    'springboot'
  ],

  sql: [
    'sql',
    'structured query language'
  ],

  mysql: ['mysql'],

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

  supabase: ['supabase'],
  firebase: ['firebase'],

  restapi: [
    'rest api',
    'rest apis',
    'restful api',
    'restful apis',
    'rest api development',
    'restful services'
  ],

  api: [
    'api',
    'apis',
    'application programming interface',
    'application programming interfaces'
  ],

  git: [
    'git',
    'git scm',
    'git version control',
    'version control'
  ],

  github: [
    'github',
    'github actions',
    'github repository',
    'github repositories'
  ],

  html: [
    'html',
    'html5'
  ],

  css: [
    'css',
    'css3'
  ],

  bootstrap: ['bootstrap'],

  tailwind: [
    'tailwind',
    'tailwind css'
  ],

  docker: ['docker'],

  kubernetes: [
    'kubernetes',
    'k8s'
  ],

  cicd: [
    'ci/cd',
    'ci cd',
    'continuous integration',
    'continuous deployment',
    'continuous integration and continuous deployment',
    'github actions'
  ],

  aws: [
    'aws',
    'amazon web services'
  ],

  gcp: [
    'gcp',
    'google cloud',
    'google cloud platform'
  ],

  azure: ['azure'],

  vercel: ['vercel'],

  selenium: ['selenium'],
  postman: ['postman'],
  playwright: ['playwright'],
  junit: ['junit'],
  pytest: ['pytest'],

  oop: [
    'object oriented',
    'object-oriented',
    'object oriented programming',
    'object-oriented programming',
    'oop'
  ],

  dsa: [
    'data structures',
    'algorithms',
    'data structures and algorithms',
    'dsa'
  ],

  microservices: [
    'microservices',
    'microservice',
    'microservices architecture'
  ],

  ai: [
    'artificial intelligence',
    'ai'
  ],

  llm: [
    'llm',
    'llms',
    'large language model',
    'large language models'
  ],

  promptengineering: [
    'prompt engineering',
    'prompt engineer',
    'prompt engineering techniques',
    'prompt design'
  ],

  genai: [
    'generative ai',
    'genai',
    'generative artificial intelligence'
  ]
}

const DISPLAY_NAMES = {
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
  supabase: 'Supabase',
  firebase: 'Firebase',
  restapi: 'REST APIs',
  api: 'APIs',
  git: 'Git',
  github: 'GitHub',
  html: 'HTML',
  css: 'CSS',
  bootstrap: 'Bootstrap',
  tailwind: 'Tailwind CSS',
  docker: 'Docker',
  kubernetes: 'Kubernetes',
  cicd: 'CI/CD',
  aws: 'AWS',
  gcp: 'Google Cloud',
  azure: 'Azure',
  vercel: 'Vercel',
  selenium: 'Selenium',
  postman: 'Postman',
  playwright: 'Playwright',
  junit: 'JUnit',
  pytest: 'PyTest',
  oop: 'Object-Oriented Programming',
  dsa: 'Data Structures & Algorithms',
  microservices: 'Microservices',
  ai: 'Artificial Intelligence',
  llm: 'LLMs',
  promptengineering: 'Prompt Engineering',
  genai: 'Generative AI'
}

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^\w\s+#./-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function containsSkill(text, aliases) {
  const normalized = normalize(text)

  return aliases.some(alias => {
    const a = normalize(alias)

    if (!a) {
      return false
    }

    /*
     * Multi-word aliases are checked directly.
     */
    if (a.includes(' ')) {
      return normalized.includes(a)
    }

    /*
     * Single-word aliases use word boundaries.
     */
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
        containsSkill(
          jobDescription,
          aliases
        )
      )
      .map(([key]) => key)
  )
}

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

/*
 * -------------------------------------------------------
 * KEYWORD COVERAGE
 * -------------------------------------------------------
 *
 * Instead of comparing every word in the JD, we focus
 * on meaningful technical / professional terms.
 */

function calculateKeywordCoverage(
  resume,
  jobDescription
) {
  const resumeText = normalize(resume)
  const jdText = normalize(jobDescription)

  if (!resumeText || !jdText) {
    return 0
  }

  const jdImportantTerms = [
    'developer',
    'software',
    'engineer',
    'frontend',
    'backend',
    'full stack',
    'fullstack',
    'application',
    'web',
    'api',
    'apis',
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
    'problem solving'
  ]

  const relevantTerms =
    jdImportantTerms.filter(term =>
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

/*
 * -------------------------------------------------------
 * PROJECT / EXPERIENCE EVIDENCE
 * -------------------------------------------------------
 */

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
    'platform'
  ]

  const indicatorMatches =
    indicators.filter(
      indicator =>
        text.includes(indicator)
    ).length

  const skillEvidence =
    Math.min(
      matchingSkills.length * 10,
      60
    )

  const textEvidence =
    Math.min(
      indicatorMatches * 3,
      40
    )

  return Math.min(
    100,
    skillEvidence + textEvidence
  )
}

/*
 * -------------------------------------------------------
 * TOOL / TECHNOLOGY COVERAGE
 * -------------------------------------------------------
 */

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
    'cicd'
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

/*
 * -------------------------------------------------------
 * SCORE
 * -------------------------------------------------------
 */

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

  /*
   * Technical skill match.
   */
  const technical =
    Math.round(
      (matchingSkills.length /
        jdSkills.length) *
        100
    )

  /*
   * JD keyword coverage.
   */
  const keyword =
    calculateKeywordCoverage(
      resume,
      jobDescription
    )

  /*
   * Project / experience evidence.
   */
  const projects =
    calculateProjectEvidence(
      resume,
      matchingSkills
    )

  /*
   * Tools / technology coverage.
   */
  const tools =
    calculateToolCoverage(
      resumeSkills,
      jdSkills
    )

  /*
   * Requirements coverage.
   *
   * This is intentionally different from technical
   * skill matching so that relevant resume evidence
   * and keywords can contribute.
   */
  const requirements =
    Math.round(
      technical * 0.70 +
      keyword * 0.30
    )

  /*
   * Overall:
   *
   * 45% technical skills
   * 20% requirements coverage
   * 20% project / experience
   * 15% tools / technologies
   */
  const overall =
    Math.round(
      technical * 0.45 +
      requirements * 0.20 +
      projects * 0.20 +
      tools * 0.15
    )

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

/*
 * -------------------------------------------------------
 * PRIORITY
 * -------------------------------------------------------
 */

function priorityForSkill(skill) {
  const highPriority = [
    'react',
    'nodejs',
    'express',
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

/*
 * -------------------------------------------------------
 * SKILL GAPS
 * -------------------------------------------------------
 */

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

/*
 * -------------------------------------------------------
 * RECOMMENDATIONS
 * -------------------------------------------------------
 */

function buildRecommendations(
  matchingSkills,
  missingSkills,
  jobDescription
) {
  const recommendations = []

  if (missingSkills.length) {
    recommendations.push(
      `Add accurate evidence of ${displaySkills(
        missingSkills.slice(0, 6)
      ).join(', ')} through projects, coursework, certifications, or practical experience.`
    )
  }

  if (matchingSkills.length) {
    recommendations.push(
      `Move your strongest matching skills such as ${displaySkills(
        matchingSkills.slice(0, 6)
      ).join(', ')} closer to the top of your resume.`
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

  if (
    containsSkill(
      jobDescription,
      SKILL_ALIASES.python
    )
  ) {
    recommendations.push(
      'Include concrete Python projects, automation scripts, APIs, or data-processing work if applicable.'
    )
  }

  return unique(
    recommendations
  ).slice(0, 6)
}

/*
 * -------------------------------------------------------
 * INTERVIEW TOPICS
 * -------------------------------------------------------
 */

function buildInterviewTopics(
  jdSkills
) {
  const topicMap = {
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

    git:
      'Git workflows, branching and version control',

    github:
      'GitHub workflows, repositories and collaboration',

    html:
      'HTML fundamentals and semantic markup',

    css:
      'CSS fundamentals and responsive design',

    docker:
      'Docker fundamentals and containerization',

    cicd:
      'CI/CD pipelines and deployment automation',

    aws:
      'AWS fundamentals and cloud deployment',

    gcp:
      'Google Cloud fundamentals and deployment',

    azure:
      'Azure fundamentals and deployment',

    selenium:
      'Selenium automation and test design',

    postman:
      'API testing using Postman',

    oop:
      'Object-oriented programming principles',

    dsa:
      'Data structures, algorithms and problem solving',

    microservices:
      'Microservices architecture and communication',

    ai:
      'AI fundamentals and practical applications',

    llm:
      'LLM fundamentals and evaluation',

    promptengineering:
      'Prompt engineering and prompt evaluation',

    genai:
      'Generative AI concepts and practical implementation'
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
  ).slice(0, 8)
}

/*
 * -------------------------------------------------------
 * SUMMARY
 * -------------------------------------------------------
 */

function buildSummary(
  score,
  matchingSkills,
  missingSkills
) {
  if (score >= 80) {
    return `Strong match. Your resume demonstrates ${matchingSkills.length} relevant skills, with ${missingSkills.length} notable gaps.`
  }

  if (score >= 65) {
    return `Good match. Your resume demonstrates several relevant skills, with some requirements that could be strengthened.`
  }

  if (score >= 50) {
    return `Moderate match. Your resume contains relevant experience, but several job requirements should be addressed.`
  }

  if (score >= 30) {
    return `Partial match. Some relevant experience is present, but important technical requirements are missing or not clearly demonstrated.`
  }

  return `Low match. Several important requirements from the job description were not clearly detected in the resume.`
}

/*
 * -------------------------------------------------------
 * API HANDLER
 * -------------------------------------------------------
 */

export default async function handler(
  req,
  res
) {
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
        error:
          'Job description is required.'
      })
    }

    if (resume.length > 100000) {
      return res.status(413).json({
        error:
          'Resume text is too large.'
      })
    }

    if (jobDescription.length > 100000) {
      return res.status(413).json({
        error:
          'Job description is too large.'
      })
    }

    /*
     * Detect resume skills.
     */
    const resumeSkills =
      detectSkills(resume)

    /*
     * Detect JD requirements.
     */
    const jdSkills =
      extractRequirements(
        jobDescription
      )

    /*
     * Compare.
     */
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

    /*
     * Calculate score.
     */
    const score =
      calculateScore(
        resume,
        jobDescription,
        resumeSkills,
        jdSkills,
        matchingSkills
      )

    /*
     * Final response.
     */
    const result = {
      matchScore:
        score.overall,

      summary:
        buildSummary(
          score.overall,
          matchingSkills,
          missingSkills
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

        analyzer:
          'JobPilot Local Skills Analyzer v3'
      }
    }

    return res.status(200).json(
      result
    )

  } catch (error) {
    console.error(
      'Analyzer error:',
      error
    )

    return res.status(500).json({
      error:
        error.message ||
        'Local analysis failed.'
    })
  }
}