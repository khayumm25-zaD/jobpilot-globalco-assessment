# JobPilot — AI-Powered Job Application Tracker

JobPilot is a business-focused web application that helps candidates manage job applications and evaluate how well a resume matches a target job description. The project was built as a technical assessment with AI-assisted development, automated testing, GitHub Actions CI/CD, and production deployment on Vercel.

## Live Demo

**Production:** https://jobpilot-omega-bay.vercel.app/

**Repository:** https://github.com/khayumm25-zaD/jobpilot-globalco-assessment

## Assessment Coverage

This project addresses the requested technical assessment requirements:

- Business-value web application
- AI-assisted resume/JD analysis
- Git/GitHub source control
- Automated tests with Vitest
- GitHub Actions CI/CD pipeline
- Production deployment to Vercel
- Technical documentation

## Key Features

### Job Application Tracking
- Create, edit and delete job applications
- Search and manage applications
- Track application stages: Applied, Assessment, Interview, Offer and Rejected
- Dashboard-level application metrics

### AI Job Matching
- Compare resume content against a job description
- Detect relevant matching skills
- Identify missing skills from the target JD
- Calculate an overall match score
- Provide role-aware recommendations
- Generate interview topics based on detected JD requirements

### Authentication & Data
- Email/password authentication using Supabase Auth
- PostgreSQL persistence through Supabase
- User-specific application data protected by database policies

## Technology Stack

| Area | Technology |
|---|---|
| Frontend | React 18, Vite |
| Authentication | Supabase Auth |
| Database | Supabase PostgreSQL |
| AI Analysis | OpenAI API through a serverless API function |
| PDF Processing | pdfjs-dist |
| Testing | Vitest |
| CI/CD | GitHub Actions |
| Deployment | Vercel |
| Source Control | Git/GitHub |

## Architecture

```text
                         JobPilot
                            |
             +--------------+--------------+
             |                             |
        React + Vite                 Supabase
             |                       /          \
             |                Authentication   PostgreSQL
             |
             +------ /api/analyze
                         |
                    OpenAI API

Developer
   |
   v
GitHub main branch
   |
   v
GitHub Actions
   |
   +--> npm ci
   +--> npm test
   +--> npm run build
   |
   v
Vercel Production
```

## Local Setup

### Requirements

- Node.js 20+
- npm
- Git
- Supabase project
- OpenAI API key for AI analysis

### Install

```bash
npm install
```

### Environment Variables

Create `.env.local` from `.env.example` and configure:

```text
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

`OPENAI_API_KEY` is server-side and must never be exposed as a `VITE_` variable.

Never commit `.env.local` or other secrets to Git.

### Database

Open the Supabase SQL Editor and run:

```text
supabase/schema.sql
```

### Run Locally

```bash
npm run dev
```

Open the Vite URL shown in the terminal.

## Testing

The project includes automated tests using Vitest.

Run the test suite:

```bash
npm test
```

Run a production build:

```bash
npm run build
```

The current automated test suite validates shared formatting/status helpers and provides a baseline regression check for the application.

## CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment.

Workflow file:

```text
.github/workflows/ci.yml
```

Pipeline flow:

1. Trigger on pushes and pull requests targeting `main`.
2. Check out the repository.
3. Set up Node.js 22.
4. Install dependencies with `npm ci`.
5. Run automated tests with `npm test`.
6. Build the production application with `npm run build`.
7. After a successful build on `main`, install the Vercel CLI.
8. Deploy the production application to Vercel.

Required GitHub repository secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Required Vercel production environment variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`

## AI-Assisted Development

AI tools were used during development for tasks such as application scaffolding, debugging, test assistance, analysis logic refinement, and documentation. The resulting implementation was reviewed, executed locally, tested, and deployed through the CI/CD workflow.

## Security Notes

- `.env.local` is excluded from source control.
- Supabase browser credentials are configured through Vercel environment variables.
- Supabase Row Level Security should remain enabled for user-owned records.
- The OpenAI API key is kept server-side and is not exposed through `VITE_` variables.
- GitHub Actions uses repository secrets for Vercel deployment credentials.

## Deployment Verification

The production deployment has been successfully executed through GitHub Actions. The workflow includes separate `test-and-build` and `deploy` jobs, with deployment gated by successful completion of the preceding job.

## Future Improvements

- PDF/DOCX resume extraction improvements
- Email integration for application updates
- Calendar integration
- Analytics by company, role and application source
- Automated interview preparation
- Job-board integrations
- Role-specific application reminders
- Expanded unit and integration test coverage
