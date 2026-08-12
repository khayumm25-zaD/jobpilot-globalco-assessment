# JobPilot — AI-Powered Job Application Tracker

JobPilot is a full-stack web application designed to help candidates manage job applications and evaluate their fit for roles using AI.

## Assessment coverage

- Business-value web application
- AI-assisted feature
- Git/GitHub source control
- Automated tests
- GitHub Actions CI/CD
- Vercel deployment
- Technical documentation

## Features

- Email/password authentication with Supabase
- Add, edit, delete and search job applications
- Application pipeline: Applied → Assessment → Interview → Offer/Rejected
- Dashboard metrics
- AI resume vs. job-description matching
- Missing-skill analysis
- Interview-topic recommendations
- Responsive UI

## Architecture

```text
React + Vite
     |
     +---- Supabase Auth
     |
     +---- Supabase PostgreSQL
     |
     +---- /api/analyze
                |
                +---- OpenAI API

GitHub
   |
GitHub Actions
   |
Test → Build → Vercel
```

## Local setup

### 1. Requirements

- Node.js 20+
- Git
- Supabase project
- OpenAI API key for AI analysis

### 2. Install

```bash
npm install
```

### 3. Environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Add your Supabase URL, Supabase anon key and OpenAI API key.

**Important:** `OPENAI_API_KEY` is server-side and must never be exposed as a `VITE_` variable.

### 4. Database

Open Supabase SQL Editor and run:

```text
supabase/schema.sql
```

### 5. Start

```bash
npm run dev
```

Open the local Vite URL shown in the terminal.

## Testing

```bash
npm test
```

## Build

```bash
npm run build
```

## CI/CD

The GitHub Actions workflow:

1. Checks out the repository.
2. Installs Node.js 20.
3. Runs `npm ci`.
4. Runs automated tests.
5. Builds the production bundle.
6. On `main`, deploys to Vercel.

Configure these GitHub repository secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Configure these Vercel environment variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`

## AI usage

AI tools can be used during development for scaffolding, debugging, test generation and documentation. Generated code should be reviewed and tested by the developer.

## Security notes

- The Supabase anonymous key is intended for browser use with Row Level Security enabled.
- The OpenAI API key is used only by the serverless function.
- Database policies restrict application records to the authenticated owner.
- Do not commit `.env.local`.

## Future improvements

- PDF/DOCX resume extraction
- Email integration for application updates
- Calendar integration
- Analytics by company/role/source
- Automated interview preparation
- Job-board integrations
- Role-specific application reminders
