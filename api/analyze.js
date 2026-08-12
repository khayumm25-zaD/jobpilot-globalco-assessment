const SKILL_ALIASES = {
  javascript: ['javascript', 'js', 'ecmascript'],
  typescript: ['typescript', 'ts'],
  react: ['react', 'reactjs', 'react.js'],
  angular: ['angular', 'angularjs'],
  nodejs: ['node.js', 'nodejs', 'node js'],
  java: ['java'],
  python: ['python'],
  springboot: ['spring boot', 'springboot'],
  sql: ['sql'],
  mysql: ['mysql'],
  postgresql: ['postgresql', 'postgres'],
  mongodb: ['mongodb', 'mongo db'],
  restapi: ['rest api', 'rest apis', 'restful api', 'restful apis'],
  git: ['git'],
  github: ['github'],
  html: ['html', 'html5'],
  css: ['css', 'css3'],
  bootstrap: ['bootstrap'],
  tailwind: ['tailwind', 'tailwind css'],
  docker: ['docker'],
  kubernetes: ['kubernetes', 'k8s'],
  cicd: ['ci/cd', 'ci cd', 'continuous integration', 'continuous deployment'],
  aws: ['aws', 'amazon web services'],
  gcp: ['gcp', 'google cloud', 'google cloud platform'],
  azure: ['azure'],
  selenium: ['selenium'],
  postman: ['postman'],
  junit: ['junit'],
  pytest: ['pytest'],
  playwright: ['playwright'],
  api: ['api', 'apis'],
  oop: ['object oriented', 'object-oriented', 'oop'],
  dsa: ['data structures', 'algorithms', 'dsa'],
  dockercompose: ['docker compose', 'docker-compose'],
  microservices: ['microservices', 'microservice'],
  mongodb: ['mongodb', 'mongo db']
}

const DISPLAY_NAMES = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  react: 'React',
  angular: 'Angular',
  nodejs: 'Node.js',
  java: 'Java',
  python: 'Python',
  springboot: 'Spring Boot',
  sql: 'SQL',
  mysql: 'MySQL',
  postgresql: 'PostgreSQL',
  mongodb: 'MongoDB',
  restapi: 'REST APIs',
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
  selenium: 'Selenium',
  postman: 'Postman',
  junit: 'JUnit',
  pytest: 'PyTest',
  playwright: 'Playwright',
  api: 'APIs',
  oop: 'Object-Oriented Programming',
  dsa: 'Data Structures & Algorithms',
  dockercompose: 'Docker Compose',
  microservices: 'Microservices'
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

    if (!a) return false

    if (a.includes(' ')) {
      return normalized.includes(a)
    }

    const escaped = a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return new RegExp(`\\b${escaped}\\b`, 'i').test(normalized)
  })
}

function detectSkills(text) {
  const detected = []

  for (const [key, aliases] of Object.entries(SKILL_ALIASES)) {
    if (containsSkill(text, aliases)) {
      detected.push(key)
    }
  }

  return detected
}

function displaySkills(keys) {
  return keys.map(key => DISPLAY_NAMES[key] || key)
}

function unique(array) {
  return [...new Set(array)]
}

function extractRequirements(jobDescription) {
  const text = normalize(jobDescription)

  const requirements = []

  for (const [key, aliases] of Object.entries(SKILL_ALIASES)) {
    if (containsSkill(text, aliases)) {
      requirements.push(key)
    }
  }

  return unique(requirements)
}

function calculateScore(resumeSkills, jdSkills, resume, jd) {
  if (!jdSkills.length) {
    return 0
  }

  const matched = jdSkills.filter(skill => resumeSkills.includes(skill))

  const skillScore = (matched.length / jdSkills.length) * 60

  const resumeWords = new Set(normalize(resume).split(' '))
  const jdWords = unique(normalize(jd).split(' '))

  let keywordMatches = 0

  for (const word of jdWords) {
    if (
      word.length > 3 &&
      resumeWords.has(word)
    ) {
      keywordMatches++
    }
  }

  const keywordScore =
    jdWords.length > 0
      ? Math.min((keywordMatches / jdWords.length) * 20, 20)
      : 0

  const projectWords = [
    'project',
    'developed',
    'built',
    'implemented',
    'application',
    'api',
    'system',
    'framework',
    'database',
    'deployment'
  ]

  const projectMatches = projectWords.filter(word =>
    normalize(resume).includes(word)
  ).length

  const projectScore = Math.min(
    (projectMatches / projectWords.length) * 20,
    20
  )

  return Math.round(
    Math.min(100, skillScore + keywordScore + projectScore)
  )
}

function priorityForSkill(skill) {
  const highPriority = [
    'react',
    'nodejs',
    'java',
    'python',
    'springboot',
    'restapi',
    'sql',
    'cicd',
    'docker',
    'aws',
    'gcp',
    'azure'
  ]

  if (highPriority.includes(skill)) {
    return 'High'
  }

  return 'Medium'
}

function buildSkillGaps(missingSkills) {
  return missingSkills.map(skill => ({
    skill: DISPLAY_NAMES[skill] || skill,
    priority: priorityForSkill(skill),
    reason: `The job description mentions ${
      DISPLAY_NAMES[skill] || skill
    }, but this skill was not clearly detected in the resume.`
  }))
}

function buildRecommendations(matchingSkills, missingSkills, jd) {
  const recommendations = []

  if (missingSkills.length) {
    recommendations.push(
      `Add accurate evidence of ${displaySkills(missingSkills.slice(0, 5)).join(', ')} through projects, coursework, certifications, or practical experience.`
    )
  }

  if (matchingSkills.length) {
    recommendations.push(
      `Move your strongest matching skills such as ${displaySkills(matchingSkills.slice(0, 5)).join(', ')} closer to the top of your resume.`
    )
  }

  recommendations.push(
    'Add measurable outcomes to your strongest projects instead of only listing responsibilities.'
  )

  recommendations.push(
    'Use the exact terminology from the job description where it accurately describes your experience.'
  )

  if (
    containsSkill(jd, SKILL_ALIASES.restapi) ||
    containsSkill(jd, SKILL_ALIASES.api)
  ) {
    recommendations.push(
      'Prepare examples covering API design, HTTP methods, authentication, validation, error handling, and status codes.'
    )
  }

  if (containsSkill(jd, SKILL_ALIASES.cicd)) {
    recommendations.push(
      'Add CI/CD pipeline experience or demonstrate it through a GitHub project.'
    )
  }

  return unique(recommendations).slice(0, 6)
}

function buildInterviewTopics(jdSkills) {
  const topics = []

  const topicMap = {
    javascript: 'JavaScript fundamentals and practical implementation',
    typescript: 'TypeScript fundamentals and practical implementation',
    react: 'React fundamentals and practical implementation',
    angular: 'Angular fundamentals and practical implementation',
    nodejs: 'Node.js fundamentals and backend implementation',
    java: 'Java fundamentals and practical implementation',
    python: 'Python fundamentals and practical implementation',
    springboot: 'Spring Boot and REST API development',
    sql: 'SQL fundamentals, joins, queries and optimization',
    mysql: 'MySQL database concepts and SQL queries',
    postgresql: 'PostgreSQL database concepts and SQL queries',
    mongodb: 'MongoDB and NoSQL database concepts',
    restapi: 'REST API design, HTTP methods and status codes',
    git: 'Git workflows, branching and version control',
    github: 'GitHub workflows and collaboration',
    html: 'HTML fundamentals and semantic markup',
    css: 'CSS fundamentals and responsive design',
    docker: 'Docker fundamentals and containerization',
    cicd: 'CI/CD pipelines and deployment automation',
    aws: 'AWS fundamentals and cloud deployment',
    gcp: 'Google Cloud fundamentals and deployment',
    azure: 'Azure fundamentals and deployment',
    selenium: 'Selenium automation and test design',
    postman: 'API testing using Postman',
    oop: 'Object-oriented programming principles',
    dsa: 'Data structures, algorithms and problem solving',
    microservices: 'Microservices architecture and communication'
  }

  for (const skill of jdSkills) {
    if (topicMap[skill]) {
      topics.push(topicMap[skill])
    }
  }

  return unique(topics).slice(0, 8)
}

function buildSummary(score, matchingSkills, missingSkills) {
  if (score >= 80) {
    return `Strong match. Your resume demonstrates ${matchingSkills.length} relevant skills, with only ${missingSkills.length} notable gaps.`
  }

  if (score >= 60) {
    return `Good potential match. You have several relevant skills, but there are some requirements that should be strengthened before applying or interviewing.`
  }

  if (score >= 40) {
    return `Moderate match. Your resume contains some relevant experience, but several job requirements should be addressed.`
  }

  return `Low match. Several important requirements from the job description were not clearly detected in the resume.`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    })
  }

  try {
    const { resume, jobDescription } = req.body || {}

    if (!resume || !jobDescription) {
      return res.status(400).json({
        error: 'Resume and job description are required.'
      })
    }

    const resumeSkills = detectSkills(resume)
    const jdSkills = extractRequirements(jobDescription)

    const matchingSkills = jdSkills.filter(skill =>
      resumeSkills.includes(skill)
    )

    const missingSkills = jdSkills.filter(skill =>
      !resumeSkills.includes(skill)
    )

    const matchScore = calculateScore(
      resumeSkills,
      jdSkills,
      resume,
      jobDescription
    )

    const technicalScore = jdSkills.length
      ? Math.round((matchingSkills.length / jdSkills.length) * 100)
      : 0

    const requirementsScore = Math.round(
      Math.min(100, technicalScore * 0.85)
    )

    const projectScore = normalize(resume).includes('project')
      ? 100
      : 50

    const toolsScore = technicalScore

    const result = {
      matchScore,

      summary: buildSummary(
        matchScore,
        matchingSkills,
        missingSkills
      ),

      breakdown: {
        technicalSkills: technicalScore,
        requirementsCoverage: requirementsScore,
        projectExperience: projectScore,
        toolsTechnologies: toolsScore
      },

      matchingSkills: displaySkills(matchingSkills),

      missingSkills: displaySkills(missingSkills),

      skillGaps: buildSkillGaps(missingSkills),

      recommendations: buildRecommendations(
        matchingSkills,
        missingSkills,
        jobDescription
      ),

      interviewTopics: buildInterviewTopics(jdSkills),

      metadata: {
        detectedResumeSkills: displaySkills(resumeSkills),
        detectedJobSkills: displaySkills(jdSkills),
        matchingSkillCount: matchingSkills.length,
        missingSkillCount: missingSkills.length,
        analyzer: 'Local JobPilot Analyzer'
      }
    }

    return res.status(200).json(result)
  } catch (error) {
    console.error('Local analyzer error:', error)

    return res.status(500).json({
      error: error.message || 'Local analysis failed.'
    })
  }
}