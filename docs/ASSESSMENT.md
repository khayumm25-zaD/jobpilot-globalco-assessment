# Globalco Software Engineer Assessment — JobPilot

## Problem

Candidates often track job applications across spreadsheets, emails and notes. This creates fragmented information and makes it difficult to understand pipeline health or whether a resume matches a role.

## Solution

JobPilot centralizes job applications and adds an AI matching workflow that compares a candidate resume with a job description.

## Business value

1. Reduces manual application tracking.
2. Gives candidates a single source of truth.
3. Identifies skill gaps before applying.
4. Produces actionable interview preparation topics.
5. Provides pipeline metrics.

## Technical decisions

### React + Vite

Chosen for a fast development cycle, component-based UI and straightforward Vercel deployment.

### Supabase

Provides PostgreSQL, authentication and Row Level Security without requiring a separate backend server for CRUD operations.

### Vercel serverless API

The AI endpoint runs server-side so the OpenAI secret is never exposed to the browser.

### GitHub Actions

Automates quality gates before production deployment.

## CI/CD

```text
Pull Request
    ↓
Install
    ↓
Test
    ↓
Build

main branch
    ↓
Install
    ↓
Test
    ↓
Build
    ↓
Vercel Production
```

## AI-assisted development

AI was used for:
- initial scaffolding
- implementation suggestions
- debugging
- test generation
- documentation assistance

All generated output should be reviewed, adapted and tested before submission.

## Evaluation-ready checklist

- [ ] Register/login works
- [ ] Application CRUD works
- [ ] Search/filter works
- [ ] Dashboard metrics work
- [ ] AI analysis works
- [ ] No secrets committed
- [ ] Tests pass
- [ ] Production build passes
- [ ] GitHub Actions passes
- [ ] Vercel production URL works
- [ ] README is complete
