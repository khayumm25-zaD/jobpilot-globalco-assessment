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

// Configure PDF.js worker for Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

// Extract readable text from a PDF
async function extractPdfText(file) {
  const arrayBuffer = await file.arrayBuffer()

  const pdf = await pdfjsLib.getDocument({
    data: arrayBuffer
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
      .map(item => item.str || '')
      .join(' ')

    pages.push(text)
  }

  return pages.join('\n\n').trim()
}

// Read supported resume files
async function readResumeFile(file) {
  if (!file) return ''

  const extension = file.name
    .split('.')
    .pop()
    ?.toLowerCase()

  if (extension === 'pdf') {
    return extractPdfText(file)
  }

  if (extension === 'txt' || extension === 'md') {
    return file.text()
  }

  throw new Error(
    'Unsupported file type. Please upload a PDF, TXT, or MD file.'
  )
}

export default function AIAnalyzer() {
  const [resume, setResume] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [fileName, setFileName] = useState('')
  const [result, setResult] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const readFile = async file => {
    if (!file) return

    try {
      setError('')
      setResult(null)
      setFileName(file.name)
      setResume('')

      const text = await readResumeFile(file)

      if (!text || !text.trim()) {
        throw new Error(
          'The uploaded file does not contain readable text.'
        )
      }

      setResume(text)
    } catch (err) {
      console.error('Resume reading error:', err)

      setResume('')

      setError(
        err.message ||
          'Unable to read the uploaded resume.'
      )
    }
  }

  const analyze = async () => {
    if (!resume.trim()) {
      setError('Please upload or paste your resume.')
      return
    }

    if (!jobDescription.trim()) {
      setError('Please enter the job description.')
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
          resume,
          jobDescription
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || 'Analysis failed.'
        )
      }

      setResult(data)
    } catch (err) {
      console.error('Analysis error:', err)

      setError(
        err.message ||
          'Unable to analyze the resume.'
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="ai-page">

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

      <div className="ai-grid">

        {/* Resume Panel */}
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
                onChange={e =>
                  readFile(
                    e.target.files?.[0]
                  )
                }
              />

            </label>

          </div>

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

            </div>
          )}

          <label>

            Resume

            <textarea
              rows="18"
              value={resume}
              onChange={e => {
                setResume(e.target.value)
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

        {/* Job Description Panel */}
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
              onChange={e => {
                setJobDescription(e.target.value)
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

      {/* Error */}
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

      {/* Results */}
      {result && (
        <AnalysisResult result={result} />
      )}

    </section>
  )
}

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
                result.breakdown.technicalSkills ?? 0
              }
            />

            <Breakdown
              label="Requirements coverage"
              value={
                result.breakdown
                  .requirementsCoverage ?? 0
              }
            />

            <Breakdown
              label="Project & experience"
              value={
                result.breakdown
                  .projectExperience ?? 0
              }
            />

            <Breakdown
              label="Tools & technologies"
              value={
                result.breakdown
                  .toolsTechnologies ?? 0
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
          icon={<CheckCircle2 size={19} />}
        />

        <ResultList
          title="Missing skills"
          items={result.missingSkills}
          icon={<CircleX size={19} />}
        />

        <SkillGapList
          items={result.skillGaps}
        />

        <ResultList
          title="Recommendations"
          items={result.recommendations}
          icon={<Lightbulb size={19} />}
        />

        <ResultList
          title="Interview topics"
          items={result.interviewTopics}
          icon={<MessageSquare size={19} />}
        />

      </div>

    </div>
  )
}

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

function ResultList({
  title,
  items = [],
  good = false,
  icon
}) {

  const safeItems = Array.isArray(items)
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

          {safeItems.map((item, index) => (

            <li
              className={good ? 'good' : ''}
              key={index}
            >
              {typeof item === 'string'
                ? item
                : item?.skill || String(item)}
            </li>

          ))}

        </ul>

      ) : (

        <p className="no-items">
          No items detected.
        </p>

      )}

    </div>
  )
}

function SkillGapList({ items = [] }) {

  const safeItems = Array.isArray(items)
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

          {safeItems.map((item, index) => (

            <div
              className="skill-gap"
              key={index}
            >

              <div className="skill-gap-heading">

                <strong>
                  {item?.skill || 'Unknown skill'}
                </strong>

                <span
                  className={
                    item?.priority === 'High'
                      ? 'priority high'
                      : 'priority medium'
                  }
                >
                  {item?.priority || 'Medium'} priority
                </span>

              </div>

              <p>
                {item?.reason ||
                  'This requirement was not clearly detected in the resume.'}
              </p>

            </div>

          ))}

        </div>

      ) : (

        <p className="no-items">
          No significant skill gaps detected.
        </p>

      )}

    </div>
  )
}