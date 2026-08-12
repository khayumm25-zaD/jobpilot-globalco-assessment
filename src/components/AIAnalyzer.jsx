import { useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist/build/pdf.mjs'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

import {
  Sparkles,
  Upload,
  FileText,
  CheckCircle2,
  CircleX,
  AlertTriangle,
  Lightbulb,
  MessageSquare
} from 'lucide-react'

// ---------------------------------------------------------
// PDF.js worker configuration for Vite
// ---------------------------------------------------------

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

// ---------------------------------------------------------
// Extract readable text from PDF
// ---------------------------------------------------------

async function extractPdfText(file) {
  if (!file) {
    throw new Error('No PDF file was selected.')
  }

  const arrayBuffer = await file.arrayBuffer()

  if (!arrayBuffer || arrayBuffer.byteLength === 0) {
    throw new Error('The uploaded PDF is empty.')
  }

  const pdf = await pdfjsLib.getDocument({
    data: new Uint8Array(arrayBuffer)
  }).promise

  const pages = []

  for (
    let pageNumber = 1;
    pageNumber <= pdf.numPages;
    pageNumber++
  ) {
    const page = await pdf.getPage(pageNumber)

    const content = await page.getTextContent()

    const text = content.items
      .map(item => {
        if (!item) return ''
        return typeof item.str === 'string' ? item.str : ''
      })
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()

    if (text) {
      pages.push(text)
    }
  }

  const extractedText = pages.join('\n\n').trim()

  if (!extractedText) {
    throw new Error(
      'No selectable text was found in this PDF. If this is a scanned/image-based resume, please use a text-based PDF or paste the resume text manually.'
    )
  }

  return extractedText
}

// ---------------------------------------------------------
// Read supported resume files
// ---------------------------------------------------------

async function readResumeFile(file) {
  if (!file) {
    throw new Error('No file selected.')
  }

  const extension = file.name
    .split('.')
    .pop()
    ?.toLowerCase()

  switch (extension) {
    case 'pdf':
      return extractPdfText(file)

    case 'txt':
    case 'md':
      return file.text()

    default:
      throw new Error(
        'Unsupported file type. Please upload a PDF, TXT, or MD file.'
      )
  }
}

// ---------------------------------------------------------
// Safely parse API response
// ---------------------------------------------------------

async function parseApiResponse(response) {
  const rawText = await response.text()

  if (!rawText || !rawText.trim()) {
    throw new Error(
      `The analysis API returned an empty response (HTTP ${response.status}).`
    )
  }

  let data

  try {
    data = JSON.parse(rawText)
  } catch {
    // Sometimes APIs return JSON wrapped inside Markdown fences.
    const cleaned = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim()

    try {
      data = JSON.parse(cleaned)
    } catch {
      console.error('Invalid API response:', rawText)

      throw new Error(
        'The analysis server returned an invalid response. Please check the API logs.'
      )
    }
  }

  if (!response.ok) {
    throw new Error(
      data?.error ||
      data?.message ||
      `Analysis failed with HTTP ${response.status}.`
    )
  }

  return data
}

// ---------------------------------------------------------
// Normalize analyzer response
// ---------------------------------------------------------

function normalizeResult(data) {
  const breakdown = data?.breakdown || {}

  return {
    matchScore: Number.isFinite(Number(data?.matchScore))
      ? Math.max(0, Math.min(100, Number(data.matchScore)))
      : 0,

    summary:
      data?.summary ||
      'No summary was returned by the analysis service.',

    breakdown: {
      technicalSkills: Number.isFinite(
        Number(breakdown.technicalSkills)
      )
        ? Math.max(
            0,
            Math.min(100, Number(breakdown.technicalSkills))
          )
        : 0,

      requirementsCoverage: Number.isFinite(
        Number(breakdown.requirementsCoverage)
      )
        ? Math.max(
            0,
            Math.min(
              100,
              Number(breakdown.requirementsCoverage)
            )
          )
        : 0,

      projectExperience: Number.isFinite(
        Number(breakdown.projectExperience)
      )
        ? Math.max(
            0,
            Math.min(100, Number(breakdown.projectExperience))
          )
        : 0,

      toolsTechnologies: Number.isFinite(
        Number(breakdown.toolsTechnologies)
      )
        ? Math.max(
            0,
            Math.min(100, Number(breakdown.toolsTechnologies))
          )
        : 0
    },

    matchingSkills: Array.isArray(data?.matchingSkills)
      ? data.matchingSkills
      : [],

    missingSkills: Array.isArray(data?.missingSkills)
      ? data.missingSkills
      : [],

    skillGaps: Array.isArray(data?.skillGaps)
      ? data.skillGaps
      : [],

    recommendations: Array.isArray(data?.recommendations)
      ? data.recommendations
      : [],

    interviewTopics: Array.isArray(data?.interviewTopics)
      ? data.interviewTopics
      : []
  }
}

// ---------------------------------------------------------
// Main component
// ---------------------------------------------------------

export default function AIAnalyzer() {
  const [resume, setResume] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [fileName, setFileName] = useState('')
  const [result, setResult] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  // -------------------------------------------------------
  // Upload resume
  // -------------------------------------------------------

  const readFile = async file => {
    if (!file) return

    try {
      setError('')
      setResult(null)
      setFileName(file.name)
      setResume('')

      const text = await readResumeFile(file)

      const cleanedText = text
        .replace(/\u0000/g, '')
        .replace(/\r\n/g, '\n')
        .replace(/[ \t]+/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim()

      if (!cleanedText) {
        throw new Error(
          'The uploaded file does not contain readable text.'
        )
      }

      setResume(cleanedText)
    } catch (err) {
      console.error('Resume reading error:', err)

      setResume('')

      setError(
        err?.message ||
        'Unable to read the uploaded resume.'
      )
    }
  }

  // -------------------------------------------------------
  // Analyze resume against JD
  // -------------------------------------------------------

  const analyze = async () => {
    if (!resume.trim()) {
      setError(
        'Please upload a resume or paste your resume text.'
      )
      return
    }

    if (!jobDescription.trim()) {
      setError(
        'Please enter the job description.'
      )
      return
    }

    setBusy(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          resume: resume.trim(),
          jobDescription: jobDescription.trim()
        })
      })

      const data = await parseApiResponse(response)

      const normalized = normalizeResult(data)

      setResult(normalized)
    } catch (err) {
      console.error('Analysis error:', err)

      setError(
        err?.message ||
        'Unable to analyze the resume. Please try again.'
      )
    } finally {
      setBusy(false)
    }
  }

  // -------------------------------------------------------
  // Clear resume
  // -------------------------------------------------------

  const clearResume = () => {
    setResume('')
    setFileName('')
    setResult(null)
    setError('')
  }

  // -------------------------------------------------------
  // UI
  // -------------------------------------------------------

  return (
    <section className="ai-page">

      {/* Page Header */}
      <div className="page-title">

        <div>
          <h1>AI Job Match</h1>

          <p>
            Compare your resume with a job description
            and identify skill gaps.
          </p>
        </div>

        <span className="ai-badge">
          <Sparkles size={16} />
          AI analyzer
        </span>

      </div>

      {/* Input Panels */}
      <div className="ai-grid">

        {/* -------------------------------------------------
             Resume Panel
        -------------------------------------------------- */}

        <div className="panel stack">

          <div className="panel-title">

            <div>
              <h2>Candidate profile</h2>

              <p>
                Upload your resume or paste the text.
              </p>
            </div>

            <label className="upload-btn">

              <Upload size={15} />

              Upload resume

              <input
                type="file"
                accept=".pdf,.txt,.md,application/pdf,text/plain,text/markdown"
                hidden
                onChange={event => {
                  const file =
                    event.target.files?.[0]

                  readFile(file)

                  // Allow selecting the same file again.
                  event.target.value = ''
                }}
              />

            </label>

          </div>

          {/* File Information */}

          {fileName && (

            <div className="file-info">

              <FileText size={17} />

              <strong>
                {fileName}
              </strong>

              <span>
                {resume
                  ? 'Ready'
                  : 'Reading...'}
              </span>

              {resume && (
                <button
                  type="button"
                  className="text-button"
                  onClick={clearResume}
                >
                  Clear
                </button>
              )}

            </div>

          )}

          {/* Resume Text */}

          <label>

            Resume

            <textarea
              rows="18"
              value={resume}
              onChange={event => {
                setResume(event.target.value)
                setResult(null)
                setError('')
              }}
              placeholder="Paste your resume text here..."
            />

          </label>

          <div className="character-count">
            {resume.length} characters
          </div>

        </div>

        {/* -------------------------------------------------
             Job Description Panel
        -------------------------------------------------- */}

        <div className="panel stack">

          <div className="panel-title">

            <div>

              <h2>Target opportunity</h2>

              <p>
                Paste the job description you want
                to evaluate.
              </p>

            </div>

          </div>

          <label>

            Job description

            <textarea
              rows="18"
              value={jobDescription}
              onChange={event => {
                setJobDescription(
                  event.target.value
                )

                setResult(null)
                setError('')
              }}
              placeholder="Paste the job description here..."
            />

          </label>

          <div className="character-count">
            {jobDescription.length} characters
          </div>

          <button
            type="button"
            className="primary"
            disabled={
              busy ||
              !resume.trim() ||
              !jobDescription.trim()
            }
            onClick={analyze}
          >

            <Sparkles size={17} />

            {busy
              ? 'Analyzing...'
              : 'Analyze match'}

          </button>

        </div>

      </div>

      {/* ---------------------------------------------------
          Error Message
      ---------------------------------------------------- */}

      {error && (

        <div className="alert">

          <strong>
            Analysis failed
          </strong>

          <span>
            {error}
          </span>

        </div>

      )}

      {/* ---------------------------------------------------
          Results
      ---------------------------------------------------- */}

      {result && (
        <AnalysisResult result={result} />
      )}

    </section>
  )
}

// ---------------------------------------------------------
// Analysis Result
// ---------------------------------------------------------

function AnalysisResult({ result }) {

  return (

    <div className="analysis-result">

      {/* Overall Score */}

      <div className="score-card">

        <span>
          Overall match
        </span>

        <strong>
          {result.matchScore}%
        </strong>

        <p>
          {result.summary}
        </p>

      </div>

      {/* Match Breakdown */}

      {result.breakdown && (

        <section className="match-breakdown">

          <h2>
            Match breakdown
          </h2>

          <p>
            How your profile aligns with this
            opportunity.
          </p>

          <div className="breakdown-grid">

            <Breakdown
              label="Technical skills"
              value={
                result.breakdown.technicalSkills
              }
            />

            <Breakdown
              label="Requirements coverage"
              value={
                result.breakdown
                  .requirementsCoverage
              }
            />

            <Breakdown
              label="Project & experience"
              value={
                result.breakdown
                  .projectExperience
              }
            />

            <Breakdown
              label="Tools & technologies"
              value={
                result.breakdown
                  .toolsTechnologies
              }
            />

          </div>

        </section>

      )}

      {/* Result Cards */}

      <div className="result-grid">

        <ResultList
          title="Matching skills"
          items={result.matchingSkills}
          good
          icon={
            <CheckCircle2 size={19} />
          }
        />

        <ResultList
          title="Missing skills"
          items={result.missingSkills}
          icon={
            <CircleX size={19} />
          }
        />

        <SkillGapList
          items={result.skillGaps}
        />

        <ResultList
          title="Recommendations"
          items={result.recommendations}
          icon={
            <Lightbulb size={19} />
          }
        />

        <ResultList
          title="Interview topics"
          items={result.interviewTopics}
          icon={
            <MessageSquare size={19} />
          }
        />

      </div>

    </div>
  )
}

// ---------------------------------------------------------
// Breakdown Card
// ---------------------------------------------------------

function Breakdown({ label, value }) {

  return (

    <div className="breakdown-item">

      <span>
        {label}
      </span>

      <strong>
        {value}%
      </strong>

    </div>

  )
}

// ---------------------------------------------------------
// Result List
// ---------------------------------------------------------

function ResultList({
  title,
  items = [],
  good = false,
  icon
}) {

  const safeItems =
    Array.isArray(items)
      ? items
      : []

  return (

    <div className="result-card">

      <div className="result-card-title">

        {icon}

        <h3>
          {title}
        </h3>

      </div>

      {safeItems.length ? (

        <ul>

          {safeItems.map(
            (item, index) => {

              let displayText = ''

              if (
                typeof item === 'string'
              ) {
                displayText = item
              } else if (
                item &&
                typeof item === 'object'
              ) {
                displayText =
                  item.skill ||
                  item.name ||
                  item.title ||
                  item.text ||
                  JSON.stringify(item)
              } else {
                displayText =
                  String(item)
              }

              return (
                <li
                  className={
                    good ? 'good' : ''
                  }
                  key={index}
                >
                  {displayText}
                </li>
              )
            }
          )}

        </ul>

      ) : (

        <p className="no-items">
          No items detected.
        </p>

      )}

    </div>

  )
}

// ---------------------------------------------------------
// Skill Gap List
// ---------------------------------------------------------

function SkillGapList({
  items = []
}) {

  const safeItems =
    Array.isArray(items)
      ? items
      : []

  return (

    <div className="result-card">

      <div className="result-card-title">

        <AlertTriangle size={19} />

        <h3>
          Skill gaps
        </h3>

      </div>

      <p className="result-subtitle">
        Requirements that were not clearly
        detected.
      </p>

      {safeItems.length ? (

        <div className="skill-gap-list">

          {safeItems.map(
            (item, index) => {

              const skill =
                typeof item === 'string'
                  ? item
                  : item?.skill ||
                    item?.name ||
                    'Unknown skill'

              const priority =
                typeof item === 'object' &&
                item?.priority
                  ? item.priority
                  : 'Medium'

              const reason =
                typeof item === 'object' &&
                item?.reason
                  ? item.reason
                  : 'This requirement was not clearly detected in the resume.'

              const priorityClass =
                priority.toLowerCase() ===
                'high'
                  ? 'priority high'
                  : priority.toLowerCase() ===
                    'low'
                  ? 'priority low'
                  : 'priority medium'

              return (

                <div
                  className="skill-gap"
                  key={index}
                >

                  <div className="skill-gap-heading">

                    <strong>
                      {skill}
                    </strong>

                    <span
                      className={
                        priorityClass
                      }
                    >
                      {priority} priority
                    </span>

                  </div>

                  <p>
                    {reason}
                  </p>

                </div>

              )
            }
          )}

        </div>

      ) : (

        <p className="no-items">
          No significant skill gaps detected.
        </p>

      )}

    </div>

  )
}